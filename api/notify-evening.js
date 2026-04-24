// Vercel cron function: send evening notification (legume soaking alert)
// Runs at 20:00 Mexico City time (02:00 UTC next day) Mon–Thu
// Triggered by Vercel cron as defined in vercel.json

import webpush from 'web-push'

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:familia@example.com'

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY)
}

export default async function handler(req, res) {
  const authHeader = req.headers.authorization
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'No autorizado' })
  }

  try {
    // TODO: load subscriptions from DB
    // const subscriptions = await db.subscriptions.findAll()
    const subscriptions = []

    const today = new Date()
    const dayIndex = today.getDay()
    // Only send Mon–Thu (tomorrow has a menu)
    if (dayIndex === 0 || dayIndex === 5 || dayIndex === 6) {
      return res.status(200).json({ mensaje: 'No aplica hoy' })
    }

    const payload = JSON.stringify({
      title: 'Buenas noches 🌙',
      body: 'Revisa si hay que poner a remojar legumbres para mañana.',
    })

    const results = await Promise.allSettled(
      subscriptions.map((sub) => webpush.sendNotification(sub, payload))
    )

    const sent = results.filter((r) => r.status === 'fulfilled').length
    return res.status(200).json({ ok: true, enviadas: sent })
  } catch (err) {
    console.error('Error en notify-evening:', err)
    return res.status(500).json({ error: 'Error interno' })
  }
}
