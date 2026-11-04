import { supabase } from './_shared.js'

// Artículos marcados en la lista del súper, compartidos entre todos los teléfonos.
// Una fila por artículo marcado: marcar = insertar, desmarcar = borrar (así dos personas
// pueden marcar a la vez sin pisarse).
// GET ?lista=… → { items: [...] }   POST { lista, item, checked }   DELETE ?lista=… (reiniciar)
const LISTA = /^\d{4}-\d{2}-\d{2}:S[123]$/

export default async function handler(req, res) {
  const lista = req.method === 'POST' ? req.body?.lista : req.query?.lista
  if (!LISTA.test(lista || '')) return res.status(400).json({ error: 'Lista inválida' })

  let error
  if (req.method === 'GET') {
    const result = await supabase.from('super_checks').select('item').eq('lista', lista)
    if (!result.error) return res.status(200).json({ items: result.data.map(r => r.item) })
    error = result.error
  } else if (req.method === 'POST') {
    const { item, checked } = req.body
    if (typeof item !== 'string' || !item || item.length > 300) return res.status(400).json({ error: 'Artículo inválido' })
    ;({ error } = checked
      ? await supabase.from('super_checks').upsert({ lista, item })
      : await supabase.from('super_checks').delete().eq('lista', lista).eq('item', item))
  } else if (req.method === 'DELETE') {
    ;({ error } = await supabase.from('super_checks').delete().eq('lista', lista))
  } else {
    return res.status(405).end()
  }

  if (error) {
    console.error('[super]', error.message)
    return res.status(500).json({ error: 'Error interno', detalle: error.message })
  }
  return res.status(200).json({ ok: true })
}
