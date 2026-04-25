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

function calcWeek(weekConfig) {
  const start = new Date(weekConfig.start_date)
  const today = new Date()
  start.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  const diffWeeks = Math.floor((today - start) / (1000 * 60 * 60 * 24 * 7))
  return ((weekConfig.week - 1 + diffWeeks) % 3) + 1
}

function proteinAlert(proteina, sobrante = false) {
  if (sobrante) return null
  if (proteina === 'pollo') return '🐔 Saca el pollo del congelador'
  if (proteina === 'pescado') return '🐟 Saca el pescado del congelador'
  if (proteina === 'res') return '🥩 Saca la carne de res del congelador'
  if (proteina === 'cerdo') return '🥩 Saca la carne de cerdo del congelador'
  return null
}

export default async function handler(req, res) {
  if (req.headers['authorization'] !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'No autorizado' })
  }

  // Use Mexico City time
  const now = new Date()
  const mxTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Mexico_City' }))
  const dayIndex = mxTime.getDay()

  if (dayIndex === 0 || dayIndex === 6) {
    return res.status(200).json({ mensaje: 'Fin de semana' })
  }

  const { data: wc } = await supabase.from('week_config').select('*').single()
  if (!wc?.start_date) return res.status(200).json({ mensaje: 'Semana no configurada' })

  const week = calcWeek(wc)
  const dayName = DAY_NAMES[dayIndex]
  const todayMenu = MENUS[week]?.[dayName]
  const comida = todayMenu?.comida
  const cena = todayMenu?.cena
  if (!comida) return res.status(200).json({ mensaje: 'Sin menú' })

  let body = `Hoy toca: *${comida.nombre}*`

  // Protein alert: skip if sobrante (leftovers, nothing to defrost)
  const comidaAlert = proteinAlert(comida.proteina, comida.sobrante)
  // Also check cena in case it has a different protein (e.g. pescado on Tue S1)
  const cenaAlert = !comidaAlert && cena ? proteinAlert(cena.proteina, cena.sobrante) : null
  const alert = comidaAlert || cenaAlert

  if (alert) body += `\n${alert}`
  if (comida.proteina === 'legumbres') body += '\n🫘 Usar olla express'

  const { data: subs } = await supabase.from('push_subscriptions').select('*')
  if (!subs?.length) return res.status(200).json({ mensaje: 'Sin suscripciones' })

  const payload = JSON.stringify({ title: '¡Buenos días! 🌅', body })

  const results = await Promise.allSettled(
    subs.map(s => webpush.sendNotification(
      { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
      payload
    ))
  )

  // Remove expired subscriptions
  const expired = subs.filter((_, i) => results[i].status === 'rejected')
  if (expired.length) {
    await supabase.from('push_subscriptions').delete()
      .in('endpoint', expired.map(s => s.endpoint))
  }

  return res.status(200).json({ ok: true, enviadas: results.filter(r => r.status === 'fulfilled').length })
}
