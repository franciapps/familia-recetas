// Detecta el tipo de proteína y devuelve el aviso de descongelar
// Si sobrante=true, no se necesita descongelar (son sobras de ayer)
export function getProteinAlert(proteina, sobrante = false) {
  if (sobrante) return null
  if (proteina === 'pollo') return '🐔 Saca el pollo del congelador'
  if (proteina === 'pescado') return '🐟 Saca el pescado del congelador'
  if (proteina === 'res') return '🥩 Saca la carne de res del congelador'
  if (proteina === 'cerdo') return '🥩 Saca la carne de cerdo del congelador'
  return null
}

// Verifica si la comida de mañana requiere remojar legumbres esta noche
export function needsLegumesSoaking(meal) {
  return meal?.proteina === 'legumbres'
}

// Devuelve el nombre bonito de la legumbre
export function getLegumbreName(legumbre) {
  const names = {
    lentejas: 'lentejas',
    frijoles: 'frijoles',
    garbanzos: 'garbanzos',
  }
  return names[legumbre] || legumbre
}

// Construye el mensaje de WhatsApp para compartir
export function buildShareMessage(meal, lunchPeople, dinnerPeople) {
  if (!meal) return ''
  const lunchList = lunchPeople.join(', ')
  const dinnerList = dinnerPeople.join(', ')
  return `¡Hola! ¿Me ayuda cocinando esto hoy? 🍳\n*${meal.nombre}*\n${meal.descripcion}\n\n👨‍👩‍👧‍👦 Para la comida: ${lunchList}\n🌙 Y que sobre para la cena: ${dinnerList}`
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
