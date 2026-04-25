import { useState, useEffect } from 'react'
import { Share2, ShoppingCart, Bell, ChevronDown, ChevronUp, MessageCircle, ExternalLink } from 'lucide-react'
import { MENUS } from '../data/menus.js'
import { SHOPPING } from '../data/shopping.js'
import { CB_WEEKEND } from '../data/cbRecipes.js'
import { LUNCH_SCHEDULE, DINNER_ALWAYS } from '../data/people.js'
import {
  getProteinAlert,
  needsLegumesSoaking,
  getLegumbreName,
  buildShareMessage,
} from '../utils/menuUtils.js'
import {
  getCurrentWeekAndDay,
  getTodayDateString,
  isFriday,
  getTomorrowMeal,
} from '../utils/dateUtils.js'

function isWeekend() {
  const d = new Date().getDay()
  return d === 0 || d === 6 // 0=Dom, 6=Sáb
}

export default function TodayView() {
  const [expanded, setExpanded] = useState(false)
  const { week, dayName, dayIndex } = getCurrentWeekAndDay()

  const todayMenu = week && dayName ? MENUS[week]?.[dayName] : null
  const comida = todayMenu?.comida || null
  const cena = todayMenu?.cena || null
  const desayuno = todayMenu?.desayuno || null

  const lunchPeople = LUNCH_SCHEDULE[dayIndex] || []
  const dinnerPeople = DINNER_ALWAYS

  // Alert for protein defrost (skip if sobrante — leftover, no freezer needed)
  // Also check cena (e.g. pescado on Fridays when comida is leftover chicken)
  const proteinAlert = comida ? getProteinAlert(comida.proteina, comida.sobrante) : null
  const cenaProteinAlert = (!proteinAlert && cena) ? getProteinAlert(cena.proteina, cena.sobrante) : null

  // Alert for legumes tomorrow
  const tomorrowMeal = week ? getTomorrowMeal(MENUS, week, dayIndex) : null
  const legumeAlert =
    tomorrowMeal && needsLegumesSoaking(tomorrowMeal)
      ? `Pon a remojar ${getLegumbreName(tomorrowMeal.legumbre)} esta noche para mañana`
      : null

  const shareText = comida
    ? buildShareMessage(comida, lunchPeople, dinnerPeople)
    : ''

  const handleShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`
    window.open(url, '_blank')
  }

  if (!week) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 p-6 text-center">
        <div className="text-4xl mb-4">🍽️</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Configura la semana
        </h2>
        <p className="text-gray-500 text-sm">
          Ve a Ajustes para indicar en qué semana estás (1, 2 o 3).
        </p>
      </div>
    )
  }

  if (!todayMenu) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 p-6 text-center">
        <div className="text-4xl mb-4">🌴</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          ¡Hoy no hay menú programado!
        </h2>
        <p className="text-gray-500 text-sm">
          El menú cubre de lunes a viernes.
        </p>
      </div>
    )
  }

  return (
    <div className="pb-6">
      {/* Date header */}
      <div className="bg-emerald-600 text-white px-4 py-4">
        <h1 className="text-2xl font-bold capitalize">
          Semana {week} &bull; {getCurrentWeekAndDay().dayName}
        </h1>
        <p className="text-sm opacity-80 capitalize mt-0.5">{getTodayDateString()}</p>
      </div>

      <div className="px-4 space-y-4 mt-4">
        {/* Sin sal banner */}
        <div className="bg-rose-50 border border-rose-300 rounded-xl p-3 flex items-center gap-2">
          <span className="text-lg">🧂</span>
          <p className="text-sm font-medium text-rose-700">
            Cocinar <strong>sin sal</strong> — agregar al plato individualmente (Franci no come sal)
          </p>
        </div>

        {/* Alerts */}
        {(proteinAlert || cenaProteinAlert) && (
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 flex items-start gap-2">
            <Bell className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                Alerta proteína
              </p>
              <p className="text-sm text-amber-800">{proteinAlert || cenaProteinAlert}</p>
            </div>
          </div>
        )}

        {legumeAlert && (
          <div className="bg-blue-50 border border-blue-300 rounded-xl p-3 flex items-start gap-2">
            <Bell className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                Remojo para mañana
              </p>
              <p className="text-sm text-blue-800">{legumeAlert}</p>
            </div>
          </div>
        )}

        {/* Desayuno */}
        {desayuno && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-1">
              Desayuno
            </p>
            <p className="text-sm text-gray-700">{desayuno}</p>
          </div>
        )}

        {/* Comida */}
        {comida && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-emerald-50 px-4 py-2 border-b border-gray-200">
              <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                Comida
              </p>
            </div>
            <div className="p-4">
              <h2 className="text-base font-bold text-gray-900 mb-1">
                {comida.nombre}
              </h2>
              <p className="text-sm text-gray-600 mb-3">{comida.descripcion}</p>

              {/* Attendees */}
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Comen hoy:</p>
                <div className="flex flex-wrap gap-1">
                  {lunchPeople.map((p) => (
                    <span
                      key={p}
                      className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes toggle */}
              {comida.notas && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                >
                  {expanded ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                  {expanded ? 'Ocultar notas' : 'Ver notas de preparación'}
                </button>
              )}
              {expanded && comida.notas && (
                <p className="mt-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                  {comida.notas}
                </p>
              )}

              {/* WhatsApp share */}
              {shareText && (
                <button
                  onClick={handleShare}
                  className="mt-3 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg w-full justify-center transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Compartir por WhatsApp
                </button>
              )}
            </div>
          </div>
        )}

        {/* Cena */}
        {cena && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-indigo-50 px-4 py-2 border-b border-gray-200">
              <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                Cena
              </p>
            </div>
            <div className="p-4">
              <h2 className="text-base font-bold text-gray-900 mb-1">
                {cena.nombre}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{cena.descripcion}</p>
              <div>
                <p className="text-xs text-gray-500 mb-1">Cenan:</p>
                <div className="flex flex-wrap gap-1">
                  {dinnerPeople.map((p) => (
                    <span
                      key={p}
                      className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              {cena.notas && (
                <p className="mt-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                  {cena.notas}
                </p>
              )}
              {cena.cbLink && (
                <a
                  href={cena.cbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-2 text-emerald-700 text-sm font-medium hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  🌿 Ver receta en Cucina Botanica →
                </a>
              )}
            </div>
          </div>
        )}

        {/* Weekend CB suggestion box */}
        {isWeekend() && week && CB_WEEKEND[week] && (() => {
          const rec = CB_WEEKEND[week]
          return (
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 space-y-2">
              <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide">
                ¿Qué cocinar este fin de semana? 🌿
              </p>
              <p className="text-sm text-teal-800 italic">
                "¿Por qué no cocinas una bella zuppa, lasagna o un ragú este domingo?"
              </p>
              <div className="flex items-start gap-2 mt-1">
                <span className="text-2xl">{rec.emoji}</span>
                <div>
                  <p className="text-sm font-bold text-teal-900">{rec.nome}</p>
                  <p className="text-xs text-teal-700 mt-0.5">{rec.descrizione}</p>
                  <a
                    href={rec.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-emerald-700 text-xs font-medium hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Ver receta en Cucina Botanica →
                  </a>
                </div>
              </div>
            </div>
          )
        })()}

        {/* Friday shopping block */}
        {isFriday() && (() => {
          const nextWeek = week ? (week % 3) + 1 : 1
          const verduras = (SHOPPING[nextWeek] || []).filter(i => i.categoria === 'Verduras')
          const lista = verduras.map(i => `• ${i.articulo} — ${i.cantidad}`).join('\n')
          const msg = `Buenas tardes, quería hacer un pedido a domicilio de esto:\n\n${lista}\n\n¿Me puede cotizar cuánto sería y mandarlo a mi dirección? Muchas gracias 🙏`
          const waUrl = `https://wa.me/?text=${encodeURIComponent(msg)}`
          return (
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-purple-800">
                    Hoy es viernes — día de súper 🛒
                  </p>
                  <p className="text-xs text-purple-600">
                    Lista Semana {nextWeek} lista en la pestaña Súper.
                  </p>
                </div>
              </div>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors w-full"
              >
                <MessageCircle className="w-4 h-4" />
                📲 Pedir verduras al mercado
              </a>
            </div>
          )
        })()}
      </div>
    </div>
  )
}
