import { useState, useEffect } from 'react'
import { Bell, BellOff, CheckCircle } from 'lucide-react'
import { setWeekConfig, getCurrentWeekAndDay } from '../utils/dateUtils.js'
import {
  requestNotificationPermission,
  subscribeToPush,
  getNotificationStatus,
} from '../utils/pushUtils.js'

export default function Settings() {
  const { week: currentWeek } = getCurrentWeekAndDay()
  const [selectedWeek, setSelectedWeek] = useState(currentWeek || 1)
  const [saved, setSaved] = useState(false)
  const [notifStatus, setNotifStatus] = useState('cargando')

  useEffect(() => {
    getNotificationStatus().then(setNotifStatus)
  }, [])

  const handleSaveWeek = async () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const startDate = today.toISOString()
    setWeekConfig(selectedWeek)
    // Also save to Supabase for server-side notifications
    try {
      await fetch('/api/set-week', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ week: selectedWeek, startDate }),
      })
    } catch (e) {
      console.warn('No se pudo sincronizar semana con servidor:', e)
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    window.dispatchEvent(new Event('weekConfigChanged'))
  }

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission()
    if (granted) {
      await subscribeToPush()
    }
    const status = await getNotificationStatus()
    setNotifStatus(status)
  }

  const statusLabels = {
    activo: 'Notificaciones activas',
    'permiso-sin-suscripcion': 'Permiso concedido, suscripción pendiente',
    denied: 'Notificaciones bloqueadas',
    default: 'Sin configurar',
    'no-soportado': 'No compatible con este dispositivo',
    cargando: 'Cargando...',
  }

  const statusColors = {
    activo: 'text-green-700 bg-green-50 border-green-200',
    'permiso-sin-suscripcion': 'text-amber-700 bg-amber-50 border-amber-200',
    denied: 'text-red-700 bg-red-50 border-red-200',
    default: 'text-gray-700 bg-gray-50 border-gray-200',
    'no-soportado': 'text-gray-500 bg-gray-50 border-gray-200',
    cargando: 'text-gray-500 bg-gray-50 border-gray-200',
  }

  return (
    <div className="pb-6">
      <div className="bg-emerald-600 text-white px-4 py-3">
        <p className="text-xs uppercase tracking-wider opacity-80">Configuración</p>
        <h1 className="text-lg font-bold">Ajustes</h1>
      </div>

      <div className="px-4 mt-6 space-y-6">
        {/* Week selector */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-700">
              Semana del ciclo
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              El menú rota en ciclos de 3 semanas. Indica en cuál estás.
            </p>
          </div>
          <div className="p-4">
            <div className="flex gap-3 mb-4">
              {[1, 2, 3].map((w) => (
                <button
                  key={w}
                  onClick={() => setSelectedWeek(w)}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-colors ${
                    selectedWeek === w
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'border-gray-200 text-gray-700 hover:border-emerald-300'
                  }`}
                >
                  Semana {w}
                </button>
              ))}
            </div>
            <button
              onClick={handleSaveWeek}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                saved
                  ? 'bg-green-500 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {saved ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  ¡Guardado!
                </>
              ) : (
                'Guardar semana'
              )}
            </button>
          </div>
        </div>

        {/* Push notifications */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-700">
              Notificaciones
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Recibe avisos de descongelar y de remojar legumbres.
            </p>
          </div>
          <div className="p-4 space-y-3">
            <div
              className={`border rounded-lg px-3 py-2 text-xs font-medium ${
                statusColors[notifStatus] || statusColors.default
              }`}
            >
              {statusLabels[notifStatus] || notifStatus}
            </div>

            {(notifStatus === 'default' || notifStatus === 'permiso-sin-suscripcion') && (
              <button
                onClick={handleEnableNotifications}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
              >
                <Bell className="w-4 h-4" />
                Activar notificaciones
              </button>
            )}

            {notifStatus === 'denied' && (
              <p className="text-xs text-gray-500">
                Las notificaciones están bloqueadas en tu navegador. Ve a Configuración del sitio para habilitarlas.
              </p>
            )}
          </div>
        </div>

        {/* Family info */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-700">Familia</h2>
          </div>
          <div className="p-4 space-y-2">
            {[
              { nombre: 'Francesca', rol: 'Mamá' },
              { nombre: 'David', rol: 'Papá' },
              { nombre: 'Franci', rol: 'Bebé (7m)' },
              { nombre: 'Adri', rol: 'Niño (2.5a)' },
              { nombre: 'Sandy', rol: 'Empleada (L–V)' },
              { nombre: 'Yola', rol: 'Empleada (L, Mi, J)' },
            ].map(({ nombre, rol }) => (
              <div key={nombre} className="flex justify-between items-center text-sm">
                <span className="font-medium text-gray-900">{nombre}</span>
                <span className="text-gray-400 text-xs">{rol}</span>
              </div>
            ))}
          </div>
        </div>

        {/* App version */}
        <p className="text-center text-xs text-gray-400">
          Familia Recetas · v1.0
        </p>
      </div>
    </div>
  )
}
