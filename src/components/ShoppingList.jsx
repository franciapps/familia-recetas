import { useState, useEffect } from 'react'
import { ShoppingCart, RotateCcw, MessageCircle } from 'lucide-react'
import { SHOPPING } from '../data/shopping.js'
import { groupByCategoria, calcTotal } from '../utils/menuUtils.js'
import { getCurrentWeekAndDay, getShoppingWeek } from '../utils/dateUtils.js'

const STORAGE_KEY = 'shoppingChecked'

export default function ShoppingList() {
  const { week } = getCurrentWeekAndDay()
  const shoppingWeek = week ? getShoppingWeek(week) : 1

  const items = SHOPPING[shoppingWeek] || []
  const groups = groupByCategoria(items)
  const total = calcTotal(items)

  // checked state: Set of "categoria|articulo"
  const [checked, setChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? new Set(JSON.parse(saved)) : new Set()
    } catch {
      return new Set()
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...checked]))
  }, [checked])

  const toggle = (key) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const reset = () => setChecked(new Set())

  const totalChecked = checked.size
  const totalItems = items.length

  // Category icon map
  const catIcon = {
    'Carne / Pescado': '🥩',
    'Huevos / Lácteos': '🥚',
    Verduras: '🥦',
    Fruta: '🍎',
    'Tortillas y Pan': '🫓',
  }

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="bg-emerald-600 text-white px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider opacity-80">
            Lista del súper
          </p>
          <h1 className="text-lg font-bold">Semana {shoppingWeek}</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-80">
            {totalChecked}/{totalItems}
          </span>
          <button
            onClick={reset}
            className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            title="Restablecer lista"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-200">
        <div
          className="h-1 bg-emerald-500 transition-all duration-300"
          style={{ width: `${totalItems ? (totalChecked / totalItems) * 100 : 0}%` }}
        />
      </div>

      <div className="px-4 mt-4 space-y-4">
        {!week && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            Configura la semana en Ajustes para ver la lista correcta.
          </div>
        )}

        {Object.entries(groups)
          .sort(([a], [b]) => {
            if (a === 'Verduras') return 1
            if (b === 'Verduras') return -1
            return 0
          })
          .map(([categoria, catItems]) => (
          <div key={categoria} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
              <span>{catIcon[categoria] || '🛒'}</span>
              <span className="text-sm font-semibold text-gray-700">
                {categoria}
              </span>
              <span className="ml-auto text-xs text-gray-400">
                {catItems.filter((i) => checked.has(`${i.categoria}|${i.articulo}`)).length}/
                {catItems.length}
              </span>
            </div>
            <ul className="divide-y divide-gray-100">
              {catItems.map((item) => {
                const key = `${item.categoria}|${item.articulo}`
                const isChecked = checked.has(key)
                return (
                  <li
                    key={key}
                    onClick={() => toggle(key)}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer active:bg-gray-50 transition-colors ${
                      isChecked ? 'opacity-50' : ''
                    }`}
                  >
                    <div
                      className={`w-5 h-5 flex-shrink-0 rounded border-2 transition-colors ${
                        isChecked
                          ? 'bg-emerald-500 border-emerald-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {isChecked && (
                        <svg
                          viewBox="0 0 20 20"
                          fill="white"
                          className="w-full h-full"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium ${
                          isChecked ? 'line-through text-gray-400' : 'text-gray-900'
                        }`}
                      >
                        {item.articulo}
                      </p>
                      <p className="text-xs text-gray-400">{item.cantidad}</p>
                    </div>
                    {item.precio > 0 && (
                      <p className="text-xs text-gray-400 flex-shrink-0">
                        ${item.precio}
                      </p>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}


        {/* Total */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-emerald-800 flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Total estimado
          </span>
          <span className="text-base font-bold text-emerald-900">${total} MXN</span>
        </div>
      </div>
    </div>
  )
}
