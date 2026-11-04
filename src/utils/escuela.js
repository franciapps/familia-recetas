// Menú de la escuela de Adri: se guarda en este teléfono por semana (lunes 'YYYY-MM-DD')
// y sirve para equilibrar su cena con lo que ya comió a mediodía.
import { DIAS } from '../data/menus.js'

const KEY = (monday) => `escuela:${monday}`

export const PROTEINAS = {
  pollo: { label: 'Pollo', emoji: '🐔' },
  res: { label: 'Carne roja', emoji: '🥩' },
  pescado: { label: 'Pescado', emoji: '🐟' },
  legumbres: { label: 'Legumbres', emoji: '🫘' },
  huevo: { label: 'Huevo', emoji: '🥚' },
  queso: { label: 'Queso/lácteo', emoji: '🧀' },
}

// Palabras clave para reconocer la proteína en el texto del menú
const KEYWORDS = {
  pollo: ['pollo', 'pechuga', 'pavo', 'nugget', 'milanesa de pollo'],
  res: ['res', 'carne', 'bistec', 'bisteck', 'albóndiga', 'albondiga', 'picadillo', 'hamburguesa', 'cerdo', 'puerco', 'jamón', 'jamon', 'salchicha', 'chorizo', 'arrachera', 'ternera'],
  pescado: ['pescado', 'atún', 'atun', 'salmón', 'salmon', 'tilapia', 'merluza', 'filete de pescado', 'camarón', 'camaron', 'basa'],
  legumbres: ['frijol', 'lenteja', 'garbanzo', 'haba', 'alubia', 'soya', 'soja'],
  huevo: ['huevo', 'omelette', 'tortilla española', 'frittata'],
  queso: ['queso', 'quesadilla', 'yogurt', 'yogur'],
}

const VERDURAS = ['verdura', 'ensalada', 'brócoli', 'brocoli', 'calabaza', 'calabacita', 'zanahoria', 'espinaca', 'chayote', 'ejote', 'nopal', 'jitomate', 'tomate', 'pepino', 'lechuga', 'chícharo', 'chicharo', 'coliflor', 'betabel', 'acelga', 'elote', 'champiñón', 'champiñon', 'pimiento', 'crema de', 'sopa de verdura', 'jícama', 'jicama']

function norm(s) {
  return (s || '').toLowerCase()
}

export function detectProteinas(texto) {
  const t = norm(texto)
  // "milanesa de pollo" no es carne roja: quitamos el pollo antes de buscar "carne/res"
  return Object.keys(KEYWORDS).filter(p => {
    if (p === 'res' && /carne de pollo|milanesa de pollo/.test(t) && !/\bres\b|bistec|cerdo|puerco/.test(t)) return false
    return KEYWORDS[p].some(k => p === 'res' && k === 'res' ? /\bres\b/.test(t) : t.includes(k))
  })
}

export function detectVerdura(texto) {
  const t = norm(texto)
  return VERDURAS.some(v => t.includes(v))
}

export function loadEscuela(monday) {
  try {
    return JSON.parse(localStorage.getItem(KEY(monday)) || 'null') || {}
  } catch {
    return {}
  }
}

export function saveEscuela(monday, data) {
  try {
    localStorage.setItem(KEY(monday), JSON.stringify(data))
  } catch {
    // sin almacenamiento disponible
  }
}

// Info de un día: texto + proteínas (las elegidas a mano mandan sobre las detectadas)
export function dayInfo(entry) {
  if (!entry?.texto?.trim()) return null
  const proteinas = entry.proteinas ?? detectProteinas(entry.texto)
  const verdura = entry.verdura ?? detectVerdura(entry.texto)
  return { texto: entry.texto, proteinas, verdura }
}

// Reparte un menú pegado entero ("Lunes: ... Martes: ...") por día
export function splitByDay(texto) {
  const result = {}
  const re = /(lunes|martes|mi[eé]rcoles|jueves|viernes)\s*[:\-–]?/gi
  const matches = [...texto.matchAll(re)]
  matches.forEach((m, i) => {
    const start = m.index + m[0].length
    const end = i + 1 < matches.length ? matches[i + 1].index : texto.length
    const raw = m[1].toLowerCase().replace('miercoles', 'miércoles')
    const dia = DIAS.find(d => d.toLowerCase() === raw)
    const contenido = texto.slice(start, end).trim()
    if (dia && contenido) result[dia] = (result[dia] ? result[dia] + '\n' : '') + contenido
  })
  return result
}

// Alternativa para Adri si en la escuela ya comió la misma proteína que la cena
const ALTERNATIVA = {
  pollo: 'frijoles o lentejas que hayan sobrado de la comida, o queso panela',
  legumbres: 'un poco de pollo deshebrado o queso panela',
  pescado: 'pollo deshebrado o frijoles',
  res: 'pollo o lentejas',
  queso: 'pollo deshebrado o frijoles',
}

// Consejos para la cena de Adri según lo que comió en la escuela
export function adviceForAdri(escuelaSemana, dia, cena) {
  const hoy = dayInfo(escuelaSemana?.[dia])
  if (!hoy) return { estado: 'sin-datos', mensajes: ['Aún no hay menú de la escuela para este día (pestaña Escuela).'] }

  const mensajes = []
  // Algunas cenas ligeras tienen una proteína distinta para Adri (p. ej. pollo sin salsa del mediodía)
  const proteinaAdri = cena?.proteinaAdri || cena?.proteina
  const mismaProteina = proteinaAdri && hoy.proteinas.includes(proteinaAdri)
  if (mismaProteina) {
    mensajes.push(`Ya comió ${PROTEINAS[proteinaAdri].label.toLowerCase()} en la escuela: para él, cambia la proteína por ${ALTERNATIVA[proteinaAdri]}.`)
  }

  // La carne roja de la semana la pone la escuela: en casa Adri no cena carne roja
  const resSemana = DIAS.filter(d => dayInfo(escuelaSemana?.[d])?.proteinas.includes('res')).length
  if (proteinaAdri === 'res' && resSemana > 0) {
    mensajes.push('Esta semana ya comió carne roja en la escuela: hoy para él, pollo o lentejas.')
  }

  if (!hoy.verdura) {
    mensajes.push('No vemos verdura en su comida de hoy: sírvele doble porción de verdura en la cena.')
  }
  if (hoy.proteinas.length === 0) {
    mensajes.push('Su comida no tenía una proteína clara: dale una porción generosa de proteína en la cena.')
  }

  if (mensajes.length === 0) {
    return { estado: 'ok', mensajes: ['Su comida en la escuela fue completa y distinta a la cena: come la cena normal. ✓'] }
  }
  return { estado: mismaProteina || (proteinaAdri === 'res' && resSemana > 0) ? 'cambiar' : 'ajustar', mensajes }
}
