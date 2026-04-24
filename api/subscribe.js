import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const sub = req.body
  if (!sub?.endpoint) return res.status(400).json({ error: 'Suscripción inválida' })

  const { error } = await supabase.from('push_subscriptions').upsert({
    endpoint: sub.endpoint,
    p256dh: sub.keys?.p256dh,
    auth: sub.keys?.auth,
  }, { onConflict: 'endpoint' })

  if (error) {
    console.error('Error al guardar suscripción:', error)
    return res.status(500).json({ error: 'Error interno' })
  }

  return res.status(201).json({ ok: true })
}
