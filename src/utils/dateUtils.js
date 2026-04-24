// Configuración de semana: guardada en localStorage como { week: 1|2|3, startDate: ISO string }
// startDate = lunes de la semana en que el usuario seleccionó "semana N"
// A partir de startDate + fecha actual se calcula la semana actual (1, 2, 3 rotando) y el día

export function getCurrentWeekAndDay() {
  const config = JSON.parse(localStorage.getItem('weekConfig') || 'null')
  if (!config) return { week: null, dayName: null, dayIndex: null }

  const start = new Date(config.startDate)
  const today = new Date()
  // Normalizar a medianoche para evitar diferencias de hora
  start.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24))
  const diffWeeks = Math.floor(diffDays / 7)
  // Ciclo de 3 semanas
  const week = ((config.week - 1 + diffWeeks) % 3) + 1

  const dayIndex = new Date().getDay() // 0=Dom, 1=Lun...
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  return { week, dayName: dayNames[dayIndex], dayIndex }
}

export function setWeekConfig(weekNumber) {
  // Usar hoy como startDate
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  localStorage.setItem('weekConfig', JSON.stringify({
    week: weekNumber,
    startDate: today.toISOString(),
  }))
}

export function isFriday() {
  return new Date().getDay() === 5
}

export function getTodayDateString() {
  const today = new Date()
  return today.toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Devuelve la comida del día siguiente
// Maneja el cambio de semana (Dom → Lunes de la siguiente semana con semana +1 rotada)
export function getTomorrowMeal(menus, week, dayIndex) {
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  const tomorrowIndex = (dayIndex + 1) % 7
  const tomorrowName = dayNames[tomorrowIndex]

  let tomorrowWeek = week
  // Si mañana es lunes (cambia de semana)
  if (tomorrowIndex === 1 && dayIndex === 0) {
    tomorrowWeek = (week % 3) + 1
  }
  // Si es domingo no hay comida programada
  if (tomorrowIndex === 0) return null
  // Solo hay menú Lun-Vie
  if (tomorrowIndex === 6) return null

  return menus[tomorrowWeek]?.[tomorrowName]?.comida || null
}

// Devuelve la semana de la lista del súper: si es viernes, muestra la siguiente semana
export function getShoppingWeek(currentWeek) {
  if (isFriday()) {
    return (currentWeek % 3) + 1
  }
  return currentWeek
}
