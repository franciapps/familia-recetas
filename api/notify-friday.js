import webpush from 'web-push'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

webpush.setVapidDetails(
  `mailto:${process.env.VAPID_EMAIL}`,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
)

export default async function handler(req, res) {
  if (req.headers['authorization'] !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'No autorizado' })
  }

  // Only fire on Friday (double-check)
  const now = new Date()
  const mxTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Mexico_City' }))
  if (mxTime.getDay() !== 5) {
    return res.status(200).json({ mensaje: 'No es viernes' })
  }

  const { data: subs } = await supabase.from('push_subscriptions').select('*')
  if (!subs?.length) return res.status(200).json({ mensaje: 'Sin suscripciones' })

  const payload = JSON.stringify({
    title: '🛒 ¡Hoy es viernes — día de súper!',
    body: 'No olvides hacer el pedido de verduras al mercado y revisar la lista de la semana que viene.',
  })

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
