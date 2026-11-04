import { isCronAuthorized, todayMX, sendToAll } from './_shared.js'

export default async function handler(req, res) {
  if (!isCronAuthorized(req)) return res.status(401).json({ error: 'No autorizado' })
  if (todayMX().dayIndex !== 5) return res.status(200).json({ mensaje: 'No es viernes' })

  const result = await sendToAll('friday', {
    title: '🛒 ¡Hoy es viernes — día de súper!',
    body: 'No olvides hacer el pedido de verduras al mercado y revisar la lista de la semana que viene.',
  })
  return res.status(200).json({ ok: true, ...result })
}
