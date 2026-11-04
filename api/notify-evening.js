import { buildNightMessage, getTomorrow } from '../src/utils/menuUtils.js'
import { isCronAuthorized, todayMX, getCurrentWeek, sendToAll } from './_shared.js'

// Noche anterior (Dom–Jue): descongelar proteínas y poner legumbres en remojo para mañana
export default async function handler(req, res) {
  if (!isCronAuthorized(req)) return res.status(401).json({ error: 'No autorizado' })

  const { dayIndex } = todayMX()
  const week = await getCurrentWeek('evening')
  if (!week) return res.status(200).json({ mensaje: 'Semana no configurada' })

  const tomorrow = getTomorrow(week, dayIndex)
  if (!tomorrow) return res.status(200).json({ mensaje: 'Mañana no hay menú' })

  const body = buildNightMessage(tomorrow.menu)
  if (!body) return res.status(200).json({ mensaje: 'Mañana no hay nada que descongelar ni remojar' })

  const result = await sendToAll('evening', {
    title: `🌙 Para mañana ${tomorrow.dayName.toLowerCase()}`,
    body,
  })
  return res.status(200).json({ ok: true, ...result })
}
