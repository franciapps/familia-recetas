import { useState, useEffect, useRef } from 'react'
import { ShoppingCart, RotateCcw, MessageCircle } from 'lucide-react'
import { SHOPPING } from '../data/shopping.js'
import { groupByCategoria, calcTotal } from '../utils/menuUtils.js'
import { getCurrentWeekAndDay, getShoppingWeek } from '../utils/dateUtils.js'
import { mondayOf, mxYMD } from '../utils/weekCalc.js'

// Pollo que David pide consolidado (vale 2–3 semanas)
const POLLO_ORDER = [
  '• 1 pollo entero para asar (1.5–2 kg)',
  '• 1 kg de pierna y muslo',
  '• 1 kg de pechuga entera',
].join('\n')
const POLLO_MSG = `Hola! Necesito hacer un pedido de pollo para las próximas semanas:\n\n${POLLO_ORDER}\n\n¿Me puede cotizar y confirmar disponibilidad? Gracias 🙏`

const STORAGE_KEY = 'shoppingChecked'

export default function ShoppingList() {
  const { week } = getCurrentWeekAndDay()
  const shoppingWeek = week ? getShoppingWeek(week) : 1

  const items = SHOPPING[shoppingWeek] || []
  const groups = groupByCategoria(items)
  const total = calcTotal(items)

  // Lista compartida: se identifica por el lunes de esta semana + la semana del ciclo,
  // así cada semana empieza vacía sola
  const lista = `${mondayOf(mxYMD())}:S${shoppingWeek}`
  const storageKey = `${STORAGE_KEY}:${lista}`

  // checked state: Set of "categoria|articulo" (copia local para abrir rápido)
  const [checked, setChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      return saved ? new Set(JSON.parse(saved)) : new Set()
    } catch {
      return new Set()
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify([...checked]))
    } catch {
      // sin almacenamiento disponible
    }
  }, [checked, storageKey])

  // Momento del último toque en este teléfono: un poco después se ignora el servidor, que aún no lo tiene
  const ultimoToque = useRef(0)

  // Trae del servidor lo que marcaron los demás, y lo repite cada 5 segundos mientras la lista está abierta
  useEffect(() => {
    let cancelado = false
    const cargar = async () => {
      try {
        const res = await fetch(`/api/super?lista=${encodeURIComponent(lista)}`)
        if (!res.ok || cancelado) return
        const { items } = await res.json()
        if (!cancelado && Date.now() - ultimoToque.current > 3000) setChecked(new Set(items))
      } catch {
        // sin conexión: se queda la copia local
      }
    }
    cargar()
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') cargar()
    }, 5000)
    return () => {
      cancelado = true
      clearInterval(timer)
    }
  }, [lista])

  const toggle = (key) => {
    const marcar = !checked.has(key)
    ultimoToque.current = Date.now()
    setChecked((prev) => {
      const next = new Set(prev)
      if (marcar) next.add(key)
      else next.delete(key)
      return next
    })
    fetch('/api/super', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lista, item: key, checked: marcar }),
    }).catch(() => {})
  }

  const reset = () => {
    if (!window.confirm('¿Desmarcar toda la lista para todos?')) return
    setChecked(new Set())
    fetch(`/api/super?lista=${encodeURIComponent(lista)}`, { method: 'DELETE' }).catch(() => {})
  }

  const totalChecked = checked.size
  const totalItems = items.length

  // Category icon map
  const catIcon = {
    'Carne / Pescado': '🥩',
    'Huevos / Lácteos': '🥚',
    Cereales: '🌾',
    Legumbres: '🫘',
    Verduras: '🥦',
    Fruta: '🍎',
    'Tortillas y Pan': '🫓',
    'Despensa (cada 3 sem)': '📦',
    'Despensa (cada mes)': '🗓️',
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

        {/* David pedir pollo */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(POLLO_MSG)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm py-3 rounded-xl transition-colors w-full"
        >
          <MessageCircle className="w-4 h-4" />
          🐔 David — pedir pollo (2–3 semanas)
        </a>

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
