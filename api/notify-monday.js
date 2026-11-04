import { isCronAuthorized, todayMX, sendToAll } from './_shared.js'

export default async function handler(req, res) {
  if (!isCronAuthorized(req)) return res.status(401).json({ error: 'No autorizado' })
  if (todayMX().dayIndex !== 1) return res.status(200).json({ mensaje: 'No es lunes' })

  const result = await sendToAll('monday', {
    title: '🛒 Recordatorio de compras — lunes',
    body: '¿Hiciste la compra?\n✅ ¿Compraste la carne?\n✅ ¿Compraste el pollo?\n✅ ¿Compraste la verdura?',
  })
  return res.status(200).json({ ok: true, ...result })
}
