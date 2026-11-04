// Utilidades comunes de las notificaciones. Los archivos que empiezan con "_" no son endpoints en Vercel.
import webpush from 'web-push'
import { createClient } from '@supabase/supabase-js'
import { cycleWeek, mxYMD, mxDayIndex, toYMD } from '../src/utils/weekCalc.js'

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

webpush.setVapidDetails(
  `mailto:${process.env.VAPID_EMAIL}`,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
)

// Vercel manda "Authorization: Bearer <CRON_SECRET>" solo si CRON_SECRET existe.
// Sin CRON_SECRET aceptamos las llamadas del cron de Vercel (antes se rechazaba todo).
export function isCronAuthorized(req) {
  const secret = process.env.CRON_SECRET
  if (secret) return req.headers['authorization'] === `Bearer ${secret}`
  return (req.headers['user-agent'] || '').includes('vercel-cron')
}

export function todayMX() {
  return { ymd: mxYMD(), dayIndex: mxDayIndex() }
}

// Semana del ciclo según lo guardado en Ajustes
export async function getCurrentWeek(tag) {
  const { data: wc, error } = await supabase.from('week_config').select('*').single()
  if (error) console.error(`[${tag}] week_config:`, error.message)
  if (!wc?.start_date || !wc?.week) return null
  return cycleWeek(wc.week, toYMD(wc.start_date), mxYMD())
}

// Envía a todas las suscripciones. Solo borra las que el servicio de push da por muertas (404/410):
// antes se borraban con cualquier error y las notificaciones dejaban de llegar para siempre.
export async function sendToAll(tag, notification) {
  const { data: subs, error } = await supabase.from('push_subscriptions').select('*')
  if (error) console.error(`[${tag}] push_subscriptions:`, error.message)
  if (!subs?.length) return { enviadas: 0, mensaje: 'Sin suscripciones', error: error?.message }

  const payload = JSON.stringify(notification)
  const results = await Promise.allSettled(
    subs.map(s => webpush.sendNotification(
      { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
      payload
    ))
  )

  const muertas = []
  const errores = []
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') return
    const code = r.reason?.statusCode
    // 403 VapidPkHashMismatch: la suscripción se hizo con otra clave VAPID y no podrá recibir nunca
    const otraClave = code === 403 && /VapidPkHashMismatch/i.test(r.reason?.body || '')
    if (code === 404 || code === 410 || otraClave) muertas.push(subs[i].endpoint)
    else errores.push({ code, body: r.reason?.body || r.reason?.message })
  })
  if (errores.length) console.error(`[${tag}] errores de envío:`, JSON.stringify(errores))
  if (muertas.length) {
    await supabase.from('push_subscriptions').delete().in('endpoint', muertas)
  }

  return {
    enviadas: results.filter(r => r.status === 'fulfilled').length,
    borradas: muertas.length,
    errores,
  }
}
