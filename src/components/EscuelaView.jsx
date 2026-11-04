import { useState } from 'react'
import { ClipboardPaste, Check } from 'lucide-react'
import { MENUS, DIAS } from '../data/menus.js'
import { getCurrentWeekAndDay } from '../utils/dateUtils.js'
import { mondayOf, mxYMD, addDays } from '../utils/weekCalc.js'
import {
  PROTEINAS,
  loadEscuela,
  saveEscuela,
  splitByDay,
  dayInfo,
  adviceForAdri,
} from '../utils/escuela.js'

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
  const [pegado, setPegado] = useState('')
  const [repartido, setRepartido] = useState(false)

  const update = (next) => {
    saveEscuela(monday, next)
    setData(prev => ({ ...prev, [monday]: next }))
  }

  const setTexto = (dia, texto) => {
    // Al cambiar el texto se vuelve a detectar la proteína automáticamente
    update({ ...escuela, [dia]: { texto } })
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

  const handleRepartir = () => {
    const porDia = splitByDay(pegado)
    if (Object.keys(porDia).length === 0) return
    const next = { ...escuela }
    Object.entries(porDia).forEach(([dia, texto]) => { next[dia] = { texto } })
    update(next)
    setPegado('')
    setRepartido(true)
    setTimeout(() => setRepartido(false), 2000)
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

        {/* Pegar menú completo */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 space-y-2">
          <p className="text-sm font-semibold text-gray-800">Pega el menú de la escuela</p>
          <p className="text-xs text-gray-500">
            Copia el menú (del PDF, WhatsApp o correo) y pégalo aquí. Se reparte solo por día si dice "Lunes", "Martes"...
          </p>
          <textarea
            value={pegado}
            onChange={e => setPegado(e.target.value)}
            rows={4}
            placeholder={'Lunes: Sopa de verduras, pollo con arroz\nMartes: ...'}
            className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
          <button
            onClick={handleRepartir}
            disabled={!pegado.trim()}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 disabled:bg-gray-300 text-white text-sm font-semibold py-2 rounded-lg"
          >
            {repartido ? <Check className="w-4 h-4" /> : <ClipboardPaste className="w-4 h-4" />}
            {repartido ? '¡Listo!' : 'Repartir por día'}
          </button>
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
                <textarea
                  value={escuela[dia]?.texto || ''}
                  onChange={e => setTexto(dia, e.target.value)}
                  rows={2}
                  placeholder="¿Qué come Adri en la escuela?"
                  className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />

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
          El menú de la escuela se guarda en este teléfono.
        </p>
      </div>
    </div>
  )
}
