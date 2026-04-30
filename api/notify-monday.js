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

  // Double-check it's Monday in Mexico City
  const now = new Date()
  const mxTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Mexico_City' }))
  if (mxTime.getDay() !== 1) {
    return res.status(200).json({ mensaje: 'No es lunes' })
  }

  const { data: subs } = await supabase.from('push_subscriptions').select('*')
  if (!subs?.length) return res.status(200).json({ mensaje: 'Sin suscripciones' })

  const payload = JSON.stringify({
    title: '🛒 Recordatorio de compras — lunes',
    body: '¿Hiciste la compra?\n✅ ¿Compraste la carne?\n✅ ¿Compraste el pollo?\n✅ ¿Compraste la verdura?',
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
