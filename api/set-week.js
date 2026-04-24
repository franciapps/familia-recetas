import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { week, startDate } = req.body
  if (!week || !startDate) return res.status(400).json({ error: 'Faltan datos' })

  const { error } = await supabase.from('week_config').upsert({
    id: 1,
    week,
    start_date: startDate,
  })

  if (error) {
    console.error('Error al guardar semana:', error)
    return res.status(500).json({ error: 'Error interno' })
  }

  return res.status(200).json({ ok: true })
}
