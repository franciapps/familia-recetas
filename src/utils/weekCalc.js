// Cálculo de la semana del ciclo (1, 2, 3), compartido entre la app y las notificaciones.
// Todo trabaja con fechas 'YYYY-MM-DD' en hora de Ciudad de México, sin horas ni zonas,
// y la semana cambia siempre en lunes (no el día en que se guardó la configuración).

export const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

const TZ = 'America/Mexico_City'

// Fecha de hoy (o de `date`) en CDMX como 'YYYY-MM-DD'
export function mxYMD(date = new Date()) {
  return date.toLocaleDateString('en-CA', { timeZone: TZ })
}

// Día de la semana en CDMX (0=Dom ... 6=Sáb)
export function mxDayIndex(date = new Date()) {
  const [y, m, d] = mxYMD(date).split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay()
}

// Acepta 'YYYY-MM-DD' o un ISO con hora (formato antiguo) y devuelve 'YYYY-MM-DD' en CDMX
export function toYMD(value) {
  if (!value) return null
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value
  return mxYMD(new Date(value))
}

function ymdToUTC(ymd) {
  const [y, m, d] = ymd.split('-').map(Number)
  return Date.UTC(y, m - 1, d)
}

// Lunes de la semana de `ymd`. El domingo cuenta como final de la semana (lunes anterior).
export function mondayOf(ymd) {
  const t = ymdToUTC(ymd)
  const dow = new Date(t).getUTCDay()
  const back = dow === 0 ? 6 : dow - 1
  return new Date(t - back * 86400000).toISOString().slice(0, 10)
}

// Suma días a 'YYYY-MM-DD'
export function addDays(ymd, days) {
  return new Date(ymdToUTC(ymd) + days * 86400000).toISOString().slice(0, 10)
}

// Semana del ciclo para `todayYMD`, sabiendo que la semana `baseWeek` incluía `startYMD`
export function cycleWeek(baseWeek, startYMD, todayYMD) {
  const diffDays = (ymdToUTC(mondayOf(todayYMD)) - ymdToUTC(mondayOf(startYMD))) / 86400000
  const diffWeeks = Math.round(diffDays / 7)
  return ((((baseWeek - 1 + diffWeeks) % 3) + 3) % 3) + 1
}
