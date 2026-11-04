// Lógica del menú compartida entre la app y las notificaciones (sin APIs del navegador).
import { MENUS } from '../data/menus.js'
import { DAY_NAMES } from './weekCalc.js'

const FREEZER_NAMES = {
  pollo: 'el pollo',
  pescado: 'el salmón',
  res: 'la carne de res',
}

const LEGUMBRE_NAMES = {
  frijoles: 'los frijoles negros',
  lentejas: 'las lentejas',
  garbanzos: 'los garbanzos',
}

// El menú del día siguiente con menú. El domingo devuelve el lunes de la semana siguiente del ciclo.
// Viernes y sábado devuelven null (el aviso del lunes llega el domingo).
export function getTomorrow(week, dayIndex) {
  if (!week || dayIndex === 5 || dayIndex === 6) return null
  const tomorrowIndex = dayIndex + 1
  const tomorrowWeek = dayIndex === 0 ? (week % 3) + 1 : week
  const dayName = DAY_NAMES[tomorrowIndex]
  const menu = MENUS[tomorrowWeek]?.[dayName]
  return menu ? { week: tomorrowWeek, dayName, menu } : null
}

// Lo que hay que hacer la noche anterior: descongelar proteínas y poner legumbres en remojo
export function nightBeforeTasks(menuDay) {
  const descongelar = []
  const remojo = []
  for (const momento of ['comida', 'cena']) {
    const meal = menuDay?.[momento]
    if (!meal) continue
    if (FREEZER_NAMES[meal.proteina] && !meal.sobrante) {
      descongelar.push({ texto: `Saca ${FREEZER_NAMES[meal.proteina]} del congelador`, momento, plato: meal.nombre })
    }
    if (meal.remojo) {
      const nombre = LEGUMBRE_NAMES[meal.legumbre] || 'las legumbres'
      remojo.push({ texto: `Pon ${nombre} en remojo`, momento, plato: meal.nombre })
    }
  }
  return { descongelar, remojo }
}

export function buildNightMessage(menuDay) {
  const { descongelar, remojo } = nightBeforeTasks(menuDay)
  const lines = [...descongelar, ...remojo].map(t => `• ${t.texto} (para la ${t.momento})`)
  return lines.length ? lines.join('\n') : null
}

// Mensaje de la mañana: qué se cocina hoy y qué dejar listo para la cena
export function buildMorningMessage(menuDay) {
  if (!menuDay) return null
  const { comida, cena } = menuDay
  const lines = []
  if (comida) lines.push(`Comida: ${comida.nombre}`)
  if (cena) lines.push(`Cena: ${cena.nombre}${cena.receta ? ` (${cena.receta.fuente})` : ''}`)
  if (comida?.paraAdri) lines.push(`🎒 ${comida.paraAdri}`)
  if (cena?.prep?.length) {
    lines.push('Dejar listo para la cena:')
    cena.prep.forEach(p => lines.push(`• ${p}`))
  }
  return lines.join('\n')
}

// Mensaje de WhatsApp para Yola (la que cocina): comida del día + preparación de la cena
export function buildEmpleadasMessage(menuDay, lunchPeople) {
  if (!menuDay) return ''
  const { comida, cena } = menuDay
  const parts = ['¡Buenos días! 🌞']
  if (comida) {
    parts.push(`*Comida de hoy:* ${comida.nombre}\n${comida.descripcion}`)
    parts.push(`Comen: ${lunchPeople.join(', ')}`)
    if (comida.paraAdri) parts.push(`🎒 *Para Adri:* ${comida.paraAdri}`)
  }
  if (cena?.prep?.length) {
    parts.push(`*Para la cena, por favor dejar listo (lavado, cortado y tapado en el refri):*\n${cena.prep.map(p => `• ${p}`).join('\n')}`)
  }
  parts.push('Cocinar con poquita sal. ¡Gracias! 🙏')
  return parts.join('\n\n')
}

// Agrupa los artículos de la lista por categoría
export function groupByCategoria(items) {
  const groups = {}
  items.forEach(item => {
    if (!groups[item.categoria]) groups[item.categoria] = []
    groups[item.categoria].push(item)
  })
  return groups
}

// Calcula el total de una lista
export function calcTotal(items) {
  return items.reduce((sum, item) => sum + (item.precio || 0), 0)
}
