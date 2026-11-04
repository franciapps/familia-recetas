import { supabase } from './_shared.js'

// Menú de la escuela de Adri, compartido entre todos los teléfonos de la familia.
// GET ?monday=YYYY-MM-DD → { data }   ·   POST { monday, data } → guarda la semana
const YMD = /^\d{4}-\d{2}-\d{2}$/

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const monday = req.query?.monday
    if (!YMD.test(monday || '')) return res.status(400).json({ error: 'Fecha inválida' })
    const { data, error } = await supabase.from('escuela_menu').select('data').eq('monday', monday).maybeSingle()
    if (error) {
      console.error('[escuela] leer:', error.message)
      return res.status(500).json({ error: 'Error interno', detalle: error.message })
    }
    return res.status(200).json({ data: data?.data || {} })
  }

  if (req.method === 'POST') {
    const { monday, data } = req.body || {}
    if (!YMD.test(monday || '') || typeof data !== 'object' || data === null) {
      return res.status(400).json({ error: 'Datos inválidos' })
    }
    const { error } = await supabase.from('escuela_menu').upsert({ monday, data, updated_at: new Date().toISOString() })
    if (error) {
      console.error('[escuela] guardar:', error.message)
      return res.status(500).json({ error: 'Error interno', detalle: error.message })
    }
    return res.status(200).json({ ok: true })
  }

  return res.status(405).end()
}
