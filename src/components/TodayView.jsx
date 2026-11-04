import { Share2, ShoppingCart, MessageCircle, ExternalLink, ClipboardList, Moon, Scissors } from 'lucide-react'
import { MENUS } from '../data/menus.js'
import { SHOPPING } from '../data/shopping.js'
import { CB_WEEKEND } from '../data/cbRecipes.js'
import { LUNCH_PEOPLE, DINNER_ALWAYS } from '../data/people.js'
import { getTomorrow, nightBeforeTasks, buildEmpleadasMessage } from '../utils/menuUtils.js'
import { getCurrentWeekAndDay, getTodayDateString, isFriday, isMonday } from '../utils/dateUtils.js'
import { mondayOf, mxYMD } from '../utils/weekCalc.js'
import { loadEscuela, adviceForAdri } from '../utils/escuela.js'

const ADRI_STYLES = {
  ok: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  ajustar: 'bg-amber-50 border-amber-200 text-amber-800',
  cambiar: 'bg-rose-50 border-rose-200 text-rose-800',
  'sin-datos': 'bg-gray-50 border-gray-200 text-gray-500',
}

function PlatoBalance({ plato }) {
  if (!plato) return null
  const rows = [
    ['🍚', 'Carbohidrato', plato.carbo],
    ['💪', 'Proteína', plato.proteina],
    ['🥦', 'Verdura', plato.verdura],
  ]
  return (
    <div className="grid grid-cols-3 gap-1.5 mb-3">
      {rows.map(([emoji, label, value]) => (
        <div key={label} className="bg-gray-50 rounded-lg px-2 py-1.5">
          <p className="text-[10px] text-gray-400 uppercase tracking-wide">{emoji} {label}</p>
          <p className="text-xs text-gray-800 font-medium leading-tight">{value}</p>
        </div>
      ))}
    </div>
  )
}

function People({ label, people, color }) {
  return (
    <div className="mb-3">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <div className="flex flex-wrap gap-1">
        {people.map((p) => (
          <span key={p} className={`${color} text-xs px-2 py-0.5 rounded-full`}>{p}</span>
        ))}
      </div>
    </div>
  )
}

function NightTasks({ tareas }) {
  if (!tareas.length) return null
  return (
    <div className="bg-blue-50 border border-blue-300 rounded-xl p-3 flex items-start gap-2">
      <Moon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">Esta noche, para mañana</p>
        <ul className="text-sm text-blue-900 space-y-0.5">
          {tareas.map((t) => (
            <li key={t.texto + t.momento}>☐ {t.texto} <span className="text-blue-500">(para la {t.momento})</span></li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function WeekendView({ week, tareasNoche }) {
  const rec = week ? CB_WEEKEND[week] : null
  const nextWeek = week ? (week % 3) + 1 : 1
  return (
    <div className="pb-6">
      <div className="bg-emerald-600 text-white px-4 py-4">
        <h1 className="text-2xl font-bold capitalize">¡Fin de semana! 🌴</h1>
        <p className="text-sm opacity-80 capitalize mt-0.5">{getTodayDateString()}</p>
      </div>
      <div className="px-4 space-y-4 mt-4">
        <NightTasks tareas={tareasNoche} />
        <VerdurasBlock nextWeek={nextWeek} titulo="¿Olvidaste pedir las verduras? 🛒" />
        {rec && (
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide">
              ¿Qué cocinar este fin de semana? 🌿
            </p>
            <div className="flex items-start gap-2 mt-1">
              <span className="text-2xl">{rec.emoji}</span>
              <div>
                <p className="text-sm font-bold text-teal-900">{rec.nome}</p>
                <p className="text-xs text-teal-700 mt-0.5">{rec.descrizione}</p>
                <a href={rec.link} target="_blank" rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-emerald-700 text-xs font-medium hover:underline">
                  <ExternalLink className="w-3 h-3" />
                  Ver receta en Cucina Botanica →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function VerdurasBlock({ nextWeek, titulo }) {
  const verduras = (SHOPPING[nextWeek] || []).filter(i => i.categoria === 'Verduras')
  const lista = verduras.map(i => `• ${i.articulo} — ${i.cantidad}`).join('\n')
  const msg = `Buenas tardes, quería hacer un pedido a domicilio de esto:\n\n${lista}\n\n¿Me puede cotizar cuánto sería y mandarlo a mi dirección? Muchas gracias 🙏`
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-3">
        <ShoppingCart className="w-5 h-5 text-purple-600 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-purple-800">{titulo}</p>
          <p className="text-xs text-purple-600">Lista Semana {nextWeek} en la pestaña Súper.</p>
        </div>
      </div>
      <a href={`https://wa.me/?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors w-full">
        <MessageCircle className="w-4 h-4" />
        📲 Pedir verduras al mercado
      </a>
    </div>
  )
}

export default function TodayView() {
  const { week, dayName, dayIndex } = getCurrentWeekAndDay()

  if (!week) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 p-6 text-center">
        <div className="text-4xl mb-4">🍽️</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Configura la semana</h2>
        <p className="text-gray-500 text-sm">Ve a Ajustes para indicar en qué semana estás (1, 2 o 3).</p>
      </div>
    )
  }

  const todayMenu = MENUS[week]?.[dayName] || null
  const tomorrow = getTomorrow(week, dayIndex)
  const { descongelar, remojo } = nightBeforeTasks(tomorrow?.menu)
  const tareasNoche = [...descongelar, ...remojo]

  if (!todayMenu) {
    return <WeekendView week={week} tareasNoche={tareasNoche} />
  }

  const { comida, cena } = todayMenu
  const escuela = loadEscuela(mondayOf(mxYMD()))
  const adri = cena ? adviceForAdri(escuela, dayName, cena) : null
  const empleadasMsg = buildEmpleadasMessage(todayMenu, LUNCH_PEOPLE)

  return (
    <div className="pb-6">
      <div className="bg-emerald-600 text-white px-4 py-4">
        <h1 className="text-2xl font-bold capitalize">Semana {week} &bull; {dayName}</h1>
        <p className="text-sm opacity-80 capitalize mt-0.5">{getTodayDateString()}</p>
      </div>

      <div className="px-4 space-y-4 mt-4">
        <div className="bg-rose-50 border border-rose-300 rounded-xl p-3 flex items-center gap-2">
          <span className="text-lg">🧂</span>
          <p className="text-sm font-medium text-rose-700">
            Cocinar con <strong>poquita sal</strong>
          </p>
        </div>

        {isMonday() && (
          <div className="bg-sky-50 border border-sky-300 rounded-xl p-3 flex items-start gap-2">
            <ClipboardList className="w-4 h-4 text-sky-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-sky-700 uppercase tracking-wide mb-1">Tareas del lunes</p>
              <ul className="text-sm text-sky-900 space-y-0.5">
                <li>☐ Vaciar refri de arriba</li>
                <li>☐ Limpiar cocina de arriba</li>
              </ul>
            </div>
          </div>
        )}

        {isFriday() && (
          <div className="bg-teal-50 border border-teal-300 rounded-xl p-3 flex items-start gap-2">
            <ClipboardList className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-1">Llevar al refri de arriba</p>
              <p className="text-sm text-teal-900">1 leche · 1 yogurt · huevos · 1 aguacate</p>
            </div>
          </div>
        )}

        {/* Comida */}
        {comida && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-emerald-50 px-4 py-2 border-b border-gray-200">
              <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Comida · la cocina Yola</p>
            </div>
            <div className="p-4">
              <h2 className="text-base font-bold text-gray-900 mb-1">{comida.nombre}</h2>
              <p className="text-sm text-gray-600 mb-3">{comida.descripcion}</p>
              <PlatoBalance plato={comida.plato} />
              <People label="Comen hoy:" people={LUNCH_PEOPLE} color="bg-emerald-100 text-emerald-800" />
              {comida.paraAdri && (
                <p className="mb-3 text-sm bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-2">🎒 {comida.paraAdri}</p>
              )}
              {comida.receta && (
                <a href={comida.receta.link} target="_blank" rel="noopener noreferrer"
                  className="mb-3 flex items-center gap-2 text-emerald-700 text-sm font-medium hover:underline">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Receta: {comida.receta.nombre} →
                </a>
              )}
              <a href={`https://wa.me/?text=${encodeURIComponent(empleadasMsg)}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg w-full justify-center transition-colors">
                <Share2 className="w-4 h-4" />
                Mandar instrucciones a Yola
              </a>
            </div>
          </div>
        )}

        {/* Cena */}
        {cena && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-indigo-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
              <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wide">Cena</p>
              {cena.receta && (
                <span className="text-[10px] font-semibold bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                  {cena.receta.fuente === 'Bimby' ? '🤖 Bimby' : '🌿 Cucina Botanica'}
                </span>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-base font-bold text-gray-900 mb-1">{cena.nombre}</h2>
              <p className="text-sm text-gray-600 mb-3">{cena.descripcion}</p>
              <PlatoBalance plato={cena.plato} />

              {cena.receta && (
                <a href={cena.receta.link} target="_blank" rel="noopener noreferrer"
                  className="mb-3 flex items-center gap-2 text-indigo-700 text-sm font-medium hover:underline">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Receta: {cena.receta.nombre} →
                </a>
              )}

              {cena.prep?.length > 0 && (
                <div className="mb-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-1 flex items-center gap-1">
                    <Scissors className="w-3 h-3" /> Dejar listo en la mañana
                  </p>
                  <ul className="text-sm text-amber-900 space-y-0.5">
                    {cena.prep.map((p) => <li key={p}>☐ {p}</li>)}
                  </ul>
                </div>
              )}

              <People label="Cenan:" people={DINNER_ALWAYS} color="bg-indigo-100 text-indigo-800" />

              {adri && (
                <div className={`border rounded-lg p-3 ${ADRI_STYLES[adri.estado]}`}>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-1">🎒 Para Adri</p>
                  {cena.adri && <p className="text-sm font-medium mb-1">Cena: {cena.adri}</p>}
                  {adri.mensajes.map((m, i) => <p key={i} className="text-sm">{m}</p>)}
                </div>
              )}

              {cena.franci && (
                <p className="mt-2 text-xs text-gray-600 bg-gray-50 rounded-lg p-2">👶 Franci: {cena.franci}</p>
              )}
            </div>
          </div>
        )}

        <NightTasks tareas={tareasNoche} />

        {isFriday() && <VerdurasBlock nextWeek={(week % 3) + 1} titulo="Hoy es viernes — día de súper 🛒" />}
      </div>
    </div>
  )
}

