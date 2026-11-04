// Configuración de semana: guardada en localStorage como { week: 1|2|3, startDate: 'YYYY-MM-DD' }
// (las versiones anteriores guardaban un ISO con hora: se sigue aceptando).
// El ciclo de 3 semanas cambia siempre en lunes: ver weekCalc.js.

import { DAY_NAMES, cycleWeek, mxDayIndex, mxYMD, toYMD } from './weekCalc.js'

function readConfig() {
  try {
    return JSON.parse(localStorage.getItem('weekConfig') || 'null')
  } catch {
    return null
  }
}

export function getCurrentWeekAndDay() {
  const dayIndex = mxDayIndex()
  const dayName = DAY_NAMES[dayIndex]
  const config = readConfig()
  if (!config) return { week: null, dayName, dayIndex }

  const week = cycleWeek(config.week, toYMD(config.startDate), mxYMD())
  return { week, dayName, dayIndex }
}

// Guarda la semana elegida y devuelve la fecha de inicio para sincronizarla con el servidor
export function setWeekConfig(weekNumber) {
  const startDate = mxYMD()
  try {
    localStorage.setItem('weekConfig', JSON.stringify({ week: weekNumber, startDate }))
  } catch {
    // sin almacenamiento: la app sigue funcionando, solo no recuerda la semana
  }
  return startDate
}

export function isFriday() {
  return mxDayIndex() === 5
}

export function isMonday() {
  return mxDayIndex() === 1
}

export function getTodayDateString() {
  return new Date().toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Mexico_City',
  })
}

// Devuelve la semana de la lista del súper: si es viernes, muestra la siguiente semana
export function getShoppingWeek(currentWeek) {
  if (isFriday()) {
    return (currentWeek % 3) + 1
  }
  return currentWeek
}
