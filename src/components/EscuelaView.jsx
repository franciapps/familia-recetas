import { useState } from 'react'
import { Camera, Loader2 } from 'lucide-react'
import { MENUS, DIAS } from '../data/menus.js'
import { getCurrentWeekAndDay } from '../utils/dateUtils.js'
import { mondayOf, mxYMD, addDays } from '../utils/weekCalc.js'
import {
  PROTEINAS,
  loadEscuela,
  saveEscuela,
  leerMenuFoto,
  dayInfo,
  adviceForAdri,
} from '../utils/escuela.js'
import { saveEscuelaRemote } from '../utils/sync.js'

const ESTADO_STYLES = {
  ok: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  ajustar: 'bg-amber-50 border-amber-200 text-amber-800',
  cambiar: 'bg-rose-50 border-rose-200 text-rose-800',
  'sin-datos': 'bg-gray-50 border-gray-200 text-gray-500',
}

function formatFecha(ymd) {
  const [y, m, d] = ymd.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', timeZone: 'UTC' })
}

export default function EscuelaView() {
  const { week } = getCurrentWeekAndDay()
  const [semana, setSemana] = useState('esta') // 'esta' | 'proxima'
  const thisMonday = mondayOf(mxYMD())
  const monday = semana === 'esta' ? thisMonday : addDays(thisMonday, 7)
  const cicloWeek = week ? (semana === 'esta' ? week : (week % 3) + 1) : null

  const [data, setData] = useState(() => ({ [thisMonday]: loadEscuela(thisMonday) }))
  const escuela = data[monday] ?? loadEscuela(monday)
  const [leyendo, setLeyendo] = useState(false)
  const [error, setError] = useState(null)

  const update = (next) => {
    saveEscuela(monday, next)
    saveEscuelaRemote(monday, next)
    setData(prev => ({ ...prev, [monday]: next }))
  }

  const setCampo = (dia, campo, valor) => {
    // Al cambiar el texto se vuelve a detectar la proteína automáticamente
    const prev = escuela[dia] || {}
    const colacion = prev.colacion ?? ''
    const comida = prev.comida ?? prev.texto ?? ''
    update({ ...escuela, [dia]: { colacion, comida, [campo]: valor } })
  }

  const toggleProteina = (dia, p) => {
    const info = dayInfo(escuela[dia])
    if (!info) return
    const actuales = info.proteinas
    const proteinas = actuales.includes(p) ? actuales.filter(x => x !== p) : [...actuales, p]
    update({ ...escuela, [dia]: { ...escuela[dia], proteinas } })
  }

  const toggleVerdura = (dia) => {
    const info = dayInfo(escuela[dia])
    if (!info) return
    update({ ...escuela, [dia]: { ...escuela[dia], verdura: !info.verdura } })
  }

  const handleFoto = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setLeyendo(true)
    setError(null)
    try {
      const porDia = await leerMenuFoto(file)
      update({ ...escuela, ...porDia })
    } catch (err) {
      setError(err.message)
    }
    setLeyendo(false)
  }

  // Resumen de proteínas de la semana en la escuela
  const conteo = {}
  DIAS.forEach(d => dayInfo(escuela[d])?.proteinas.forEach(p => { conteo[p] = (conteo[p] || 0) + 1 }))

  return (
    <div className="pb-6">
      <div className="bg-emerald-600 text-white px-4 py-3">
        <p className="text-xs uppercase tracking-wider opacity-80">Comida de Adri en la escuela</p>
        <h1 className="text-lg font-bold">Semana del {formatFecha(monday)}</h1>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* Esta semana / próxima */}
        <div className="flex gap-2">
          {[['esta', 'Esta semana'], ['proxima', 'Próxima semana']].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setSemana(id)}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold border-2 transition-colors ${
                semana === id ? 'bg-emerald-600 text-white border-emerald-600' : 'border-gray-200 text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Foto del menú */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 space-y-2">
          <p className="text-sm font-semibold text-gray-800">Sube la foto del menú de la escuela</p>
          <p className="text-xs text-gray-500">
            Se leen solo la colación y la comida de cada día (el desayuno lo hace en casa). Luego puedes corregir el texto.
          </p>
          <label className={`w-full flex items-center justify-center gap-2 text-white text-sm font-semibold py-2.5 rounded-lg cursor-pointer ${leyendo ? 'bg-gray-400' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
            {leyendo ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
            {leyendo ? 'Leyendo el menú…' : 'Subir foto'}
            <input type="file" accept="image/*" className="hidden" onChange={handleFoto} disabled={leyendo} />
          </label>
          {error && <p className="text-xs text-red-700">No se pudo leer: {error}</p>}
        </div>

        {/* Resumen semanal */}
        {Object.keys(conteo).length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">En la escuela esta semana</p>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(conteo).map(([p, n]) => (
                <span key={p} className={`text-xs px-2 py-0.5 rounded-full ${p === 'res' && n > 1 ? 'bg-rose-100 text-rose-800' : 'bg-gray-100 text-gray-700'}`}>
                  {PROTEINAS[p].emoji} {PROTEINAS[p].label} ×{n}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Días */}
        {DIAS.map(dia => {
          const info = dayInfo(escuela[dia])
          const cena = cicloWeek ? MENUS[cicloWeek]?.[dia]?.cena : null
          const advice = cena ? adviceForAdri(escuela, dia, cena) : null
          return (
            <div key={dia} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                <span className="font-semibold text-sm text-gray-700">{dia}</span>
              </div>
              <div className="p-4 space-y-3">
                {[['colacion', 'Colación'], ['comida', 'Comida']].map(([campo, label]) => (
                  <div key={campo}>
                    <p className="text-xs text-gray-500 mb-1">{label}</p>
                    <textarea
                      value={escuela[dia]?.[campo] ?? (campo === 'comida' ? escuela[dia]?.texto || '' : '')}
                      onChange={e => setCampo(dia, campo, e.target.value)}
                      rows={campo === 'comida' ? 2 : 1}
                      className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    />
                  </div>
                ))}

                {info && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Proteína (toca para corregir):</p>
                    <div className="flex flex-wrap gap-1.5">
                      {Object.entries(PROTEINAS).map(([p, { label, emoji }]) => (
                        <button
                          key={p}
                          onClick={() => toggleProteina(dia, p)}
                          className={`text-xs px-2 py-0.5 rounded-full border ${
                            info.proteinas.includes(p)
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-white text-gray-500 border-gray-200'
                          }`}
                        >
                          {emoji} {label}
                        </button>
                      ))}
                      <button
                        onClick={() => toggleVerdura(dia)}
                        className={`text-xs px-2 py-0.5 rounded-full border ${
                          info.verdura ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-500 border-gray-200'
                        }`}
                      >
                        🥦 Verdura
                      </button>
                    </div>
                  </div>
                )}

                {cena && (
                  <div className={`border rounded-lg p-2.5 ${ESTADO_STYLES[advice.estado]}`}>
                    <p className="text-xs font-semibold mb-0.5">Cena en casa: {cena.nombre}</p>
                    {advice.mensajes.map((m, i) => (
                      <p key={i} className="text-xs">{m}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}

        <p className="text-xs text-gray-400 text-center">
          El menú de la escuela se comparte con todos los teléfonos de la familia.
        </p>
      </div>
    </div>
  )
}
