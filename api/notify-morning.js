import { MENUS } from '../src/data/menus.js'
import { DAY_NAMES } from '../src/utils/weekCalc.js'
import { buildMorningMessage } from '../src/utils/menuUtils.js'
import { isCronAuthorized, todayMX, getCurrentWeek, sendToAll } from './_shared.js'

// Mañana (L–V): qué se cocina hoy y qué tienen que dejar listo Yola y Mari para la cena
export default async function handler(req, res) {
  if (!isCronAuthorized(req)) return res.status(401).json({ error: 'No autorizado' })

  const { dayIndex } = todayMX()
  if (dayIndex === 0 || dayIndex === 6) return res.status(200).json({ mensaje: 'Fin de semana' })

  const week = await getCurrentWeek('morning')
  if (!week) return res.status(200).json({ mensaje: 'Semana no configurada' })

  const menuDay = MENUS[week]?.[DAY_NAMES[dayIndex]]
  const body = buildMorningMessage(menuDay)
  if (!body) return res.status(200).json({ mensaje: 'Sin menú' })

  const result = await sendToAll('morning', {
    title: '¡Buenos días! Instrucciones para Yola y Mari 🔪',
    body,
  })
  return res.status(200).json({ ok: true, ...result })
}
