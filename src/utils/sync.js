// Sincroniza con el servidor lo que comparte toda la familia: la semana del ciclo y el menú de la escuela.
// El teléfono guarda una copia en localStorage para abrir rápido y funcionar sin conexión.
import { mondayOf, mxYMD, addDays } from './weekCalc.js'
import { saveEscuela, loadEscuela } from './escuela.js'

export const SYNC_EVENT = 'datosActualizados'

// Guarda en el servidor el menú de la escuela de una semana (espera a que se deje de escribir)
const timers = {}
export function saveEscuelaRemote(monday, data) {
  clearTimeout(timers[monday])
  timers[monday] = setTimeout(() => {
    delete timers[monday]
    fetch('/api/escuela', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monday, data }),
    }).catch(err => console.warn('No se pudo guardar el menú de la escuela:', err))
  }, 800)
}

export async function syncFromServer() {
  const thisMonday = mondayOf(mxYMD())
  const mondays = [thisMonday, addDays(thisMonday, 7)]
  let cambio = false
  try {
    const [week, ...escuelas] = await Promise.all([
      fetch('/api/set-week').then(r => (r.ok ? r.json() : null)),
      ...mondays.map(m => fetch(`/api/escuela?monday=${m}`).then(r => (r.ok ? r.json() : null))),
    ])

    const localWeek = localStorage.getItem('weekConfig')
    if (week?.week && week?.startDate) {
      const remota = JSON.stringify({ week: week.week, startDate: week.startDate })
      if (remota !== localWeek) {
        localStorage.setItem('weekConfig', remota)
        cambio = true
      }
    } else if (week && localWeek) {
      // El servidor aún no tiene semana: le mandamos la de este teléfono
      fetch('/api/set-week', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: localWeek,
      }).catch(() => {})
    }

    escuelas.forEach((res, i) => {
      const monday = mondays[i]
      if (!res?.data || timers[monday]) return // se está escribiendo en este teléfono: no pisar
      const local = loadEscuela(monday)
      if (Object.keys(res.data).length > 0) {
        if (JSON.stringify(res.data) !== JSON.stringify(local)) {
          saveEscuela(monday, res.data)
          cambio = true
        }
      } else if (Object.keys(local).length > 0) {
        // El servidor no tiene esta semana pero este teléfono sí (datos de antes): la subimos
        saveEscuelaRemote(monday, local)
      }
    })

    if (cambio) window.dispatchEvent(new Event(SYNC_EVENT))
  } catch (err) {
    console.warn('No se pudo sincronizar con el servidor:', err)
  }
}

// Si hay una versión nueva de la app publicada, recarga la página (para quien nunca cierra la app)
function scriptActual(html) {
  return html.match(/\/assets\/index-[^"]+\.js/)?.[0] || null
}
export async function checkNewVersion() {
  try {
    const actual = scriptActual(document.documentElement.outerHTML)
    if (!actual) return // en desarrollo no hay assets con hash
    const html = await fetch('/', { cache: 'no-store' }).then(r => r.text())
    const nueva = scriptActual(html)
    const escribiendo = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)
    if (nueva && nueva !== actual && !escribiendo) window.location.reload()
  } catch {
    // sin conexión
  }
}
