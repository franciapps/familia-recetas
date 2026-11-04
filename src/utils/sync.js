// Sincroniza con el servidor lo que comparte toda la familia: la semana del ciclo y el menú de la escuela.
// El teléfono guarda una copia en localStorage para abrir rápido y funcionar sin conexión.
import { mondayOf, mxYMD, addDays } from './weekCalc.js'
import { saveEscuela, loadEscuela } from './escuela.js'

export const SYNC_EVENT = 'datosActualizados'

export async function syncFromServer() {
  const thisMonday = mondayOf(mxYMD())
  const mondays = [thisMonday, addDays(thisMonday, 7)]
  try {
    const [week, ...escuelas] = await Promise.all([
      fetch('/api/set-week').then(r => (r.ok ? r.json() : null)),
      ...mondays.map(m => fetch(`/api/escuela?monday=${m}`).then(r => (r.ok ? r.json() : null))),
    ])
    if (week?.week && week?.startDate) {
      localStorage.setItem('weekConfig', JSON.stringify({ week: week.week, startDate: week.startDate }))
    } else if (week && localStorage.getItem('weekConfig')) {
      // El servidor aún no tiene semana: le mandamos la de este teléfono
      const local = JSON.parse(localStorage.getItem('weekConfig'))
      fetch('/api/set-week', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(local),
      }).catch(() => {})
    }
    escuelas.forEach((res, i) => {
      if (!res?.data) return
      if (Object.keys(res.data).length > 0) {
        saveEscuela(mondays[i], res.data)
      } else if (Object.keys(loadEscuela(mondays[i])).length > 0) {
        // El servidor no tiene esta semana pero este teléfono sí (datos de antes): la subimos
        saveEscuelaRemote(mondays[i], loadEscuela(mondays[i]))
      }
    })
    window.dispatchEvent(new Event(SYNC_EVENT))
  } catch (err) {
    console.warn('No se pudo sincronizar con el servidor:', err)
  }
}

// Guarda en el servidor el menú de la escuela de una semana (espera a que se deje de escribir)
const timers = {}
export function saveEscuelaRemote(monday, data) {
  clearTimeout(timers[monday])
  timers[monday] = setTimeout(() => {
    fetch('/api/escuela', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monday, data }),
    }).catch(err => console.warn('No se pudo guardar el menú de la escuela:', err))
  }, 800)
}
