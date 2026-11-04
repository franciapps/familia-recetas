import webpush from 'web-push'
import './_shared.js'

// Botón "Probar notificación" en Ajustes: manda una notificación solo a la suscripción de quien la pide
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const sub = req.body
  if (!sub?.endpoint) return res.status(400).json({ error: 'Suscripción inválida' })
  try {
    await webpush.sendNotification(sub, JSON.stringify({
      title: 'Familia Recetas ✅',
      body: '¡Las notificaciones funcionan!',
    }))
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[test-push]', err?.statusCode, err?.body || err?.message)
    return res.status(500).json({ error: 'No se pudo enviar', code: err?.statusCode, detalle: err?.body || err?.message })
  }
}
