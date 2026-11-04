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

// Texto de un día: colación + comida (los datos antiguos solo tenían `texto`)
export function textoDia(entry) {
  if (!entry) return ''
  if (entry.texto !== undefined) return entry.texto
  return [entry.colacion, entry.comida].filter(Boolean).join('\n')
}

// Info de un día: texto + proteínas (las elegidas a mano mandan sobre las detectadas)
export function dayInfo(entry) {
  const texto = textoDia(entry)
  if (!texto.trim()) return null
  const proteinas = entry.proteinas ?? detectProteinas(texto)
  const verdura = entry.verdura ?? detectVerdura(texto)
  return { texto, proteinas, verdura }
}

// Reduce la foto antes de mandarla: Vercel acepta como máximo 4.5 MB por petición
export function resizeImage(file, maxSide = 1600) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, maxSide / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(img.src)
      resolve(canvas.toDataURL('image/jpeg', 0.85).split(',')[1])
    }
    img.onerror = () => reject(new Error('No se pudo abrir la imagen'))
    img.src = URL.createObjectURL(file)
  })
}

// Manda la foto a /api/leer-menu y devuelve { Lunes: { colacion, comida }, ... }
export async function leerMenuFoto(file) {
  const data = await resizeImage(file)
  const res = await fetch('/api/leer-menu', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data, mediaType: 'image/jpeg' }),
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(json.error || `Error ${res.status}`)
  return Object.fromEntries(json.dias.map(({ dia, colacion, comida }) => [dia, { colacion, comida }]))
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
