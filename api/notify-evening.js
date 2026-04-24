import webpush from 'web-push'
import { createClient } from '@supabase/supabase-js'
import { MENUS } from '../src/data/menus.js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

webpush.setVapidDetails(
  `mailto:${process.env.VAPID_EMAIL}`,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
)

const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

const LEGUMBRE_NAMES = {
  frijoles: 'los frijoles',
  lentejas: 'las lentejas',
  garbanzos: 'los garbanzos',
}

function calcWeek(weekConfig) {
  const start = new Date(weekConfig.start_date)
  const today = new Date()
  start.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  const diffWeeks = Math.floor((today - start) / (1000 * 60 * 60 * 24 * 7))
  return ((weekConfig.week - 1 + diffWeeks) % 3) + 1
}

export default async function handler(req, res) {
  if (req.headers['authorization'] !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'No autorizado' })
  }

  // Use Mexico City time
  const now = new Date()
  const mxTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Mexico_City' }))
  const todayIndex = mxTime.getDay()

  // No evening notification on Friday or Saturday (no menu next day)
  if (todayIndex === 5 || todayIndex === 6 || todayIndex === 0) {
    return res.status(200).json({ mensaje: 'No aplica hoy' })
  }

  const { data: wc } = await supabase.from('week_config').select('*').single()
  if (!wc?.start_date) return res.status(200).json({ mensaje: 'Semana no configurada' })

  const week = calcWeek(wc)

  // Get TOMORROW's menu
  const tomorrowIndex = todayIndex + 1
  let tomorrowWeek = week
  // If tomorrow is Monday (new week)
  if (tomorrowIndex === 1) tomorrowWeek = (week % 3) + 1

  const tomorrowName = DAY_NAMES[tomorrowIndex]
  const tomorrow = MENUS[tomorrowWeek]?.[tomorrowName]?.comida

  if (!tomorrow || tomorrow.proteina !== 'legumbres' || tomorrow.remojo === false) {
    return res.status(200).json({ mensaje: 'Mañana no hay legumbres que remojar' })
  }

  const legumbreName = LEGUMBRE_NAMES[tomorrow.legumbre] || 'las legumbres'
  const body = `Mañana toca: ${tomorrow.nombre}\nPon ${legumbreName} en remojo esta noche 💧\n(para la olla express)`

  const { data: subs } = await supabase.from('push_subscriptions').select('*')
  if (!subs?.length) return res.status(200).json({ mensaje: 'Sin suscripciones' })

  const payload = JSON.stringify({ title: '¡Para mañana! 🌙', body })

  const results = await Promise.allSettled(
    subs.map(s => webpush.sendNotification(
      { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
      payload
    ))
  )

  const expired = subs.filter((_, i) => results[i].status === 'rejected')
  if (expired.length) {
    await supabase.from('push_subscriptions').delete()
      .in('endpoint', expired.map(s => s.endpoint))
  }

  return res.status(200).json({ ok: true, enviadas: results.filter(r => r.status === 'fulfilled').length })
}
