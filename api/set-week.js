import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export default async function handler(req, res) {
  // GET: la semana guardada, para que todos los teléfonos usen la misma
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('week_config').select('week, start_date').eq('id', 1).maybeSingle()
    if (error) return res.status(500).json({ error: 'Error interno', detalle: error.message })
    return res.status(200).json(data ? { week: data.week, startDate: data.start_date } : {})
  }
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
