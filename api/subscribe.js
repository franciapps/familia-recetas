// Vercel serverless function: save push subscription
// POST /api/subscribe
// Body: PushSubscription JSON

// In production, store subscriptions in a DB (e.g. Vercel KV, Upstash, PlanetScale)
// For now, we accept and acknowledge the subscription

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  try {
    const subscription = req.body

    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ error: 'Suscripción inválida' })
    }

    // TODO: persist subscription to database
    // await db.subscriptions.upsert({ endpoint: subscription.endpoint, data: subscription })
    console.log('Nueva suscripción registrada:', subscription.endpoint)

    return res.status(201).json({ ok: true, mensaje: 'Suscripción registrada' })
  } catch (err) {
    console.error('Error al registrar suscripción:', err)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}
