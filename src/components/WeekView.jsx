import { MENUS } from '../data/menus.js'
import { getCurrentWeekAndDay } from '../utils/dateUtils.js'

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
const DAY_INDEX_MAP = { Lunes: 1, Martes: 2, 'Miércoles': 3, Jueves: 4, Viernes: 5 }

export default function WeekView() {
  const { week, dayIndex } = getCurrentWeekAndDay()

  if (!week) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 p-6 text-center">
        <div className="text-4xl mb-4">📅</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Configura la semana
        </h2>
        <p className="text-gray-500 text-sm">
          Ve a Ajustes para indicar en qué semana estás (1, 2 o 3).
        </p>
      </div>
    )
  }

  const weekMenu = MENUS[week] || {}

  return (
    <div className="pb-6">
      <div className="bg-emerald-600 text-white px-4 py-3">
        <p className="text-xs uppercase tracking-wider opacity-80">Vista semanal</p>
        <h1 className="text-lg font-bold">Semana {week}</h1>
      </div>

      <div className="px-4 mt-4 space-y-3">
        {DIAS.map((dia) => {
          const diaMenu = weekMenu[dia]
          const isToday = DAY_INDEX_MAP[dia] === dayIndex

          return (
            <div
              key={dia}
              className={`rounded-xl border overflow-hidden shadow-sm ${
                isToday
                  ? 'border-emerald-400 ring-2 ring-emerald-300'
                  : 'border-gray-200'
              }`}
            >
              {/* Day header */}
              <div
                className={`px-4 py-2 flex items-center justify-between ${
                  isToday ? 'bg-emerald-600 text-white' : 'bg-gray-50 text-gray-700'
                }`}
              >
                <span className="font-semibold text-sm">{dia}</span>
                {isToday && (
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    Hoy
                  </span>
                )}
              </div>

              {diaMenu ? (
                <div className="bg-white divide-y divide-gray-100">
                  {/* Comida */}
                  <div className="px-4 py-3">
                    <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-0.5">
                      Comida
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {diaMenu.comida?.nombre || '—'}
                    </p>
                    {diaMenu.comida?.proteina && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        Proteína: {diaMenu.comida.proteina}
                      </p>
                    )}
                  </div>
                  {/* Cena */}
                  <div className="px-4 py-3">
                    <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-0.5">
                      Cena
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {diaMenu.cena?.nombre || '—'}
                    </p>
                    {diaMenu.cena?.proteina && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        Proteína: {diaMenu.cena.proteina}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white px-4 py-3">
                  <p className="text-sm text-gray-400 italic">Sin menú</p>
                </div>
              )}
            </div>
          )
        })}

        {/* Weekend note */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Finde de semana
          </p>
          <p className="text-sm text-gray-500">
            Sábado y domingo sin menú fijo — cocina libre.
          </p>
        </div>
      </div>
    </div>
  )
}
