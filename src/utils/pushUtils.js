const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || ''

export async function requestNotificationPermission() {
  if (!('Notification' in window)) return false
  const permission = await Notification.requestPermission()
  return permission === 'granted'
}

export async function subscribeToPush() {
  if (!('serviceWorker' in navigator) || !VAPID_PUBLIC_KEY) return null
  try {
    const reg = await navigator.serviceWorker.ready
    const sub = (await reg.pushManager.getSubscription()) || await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    })
    // Mandarla siempre al servidor: si el servidor la había perdido, así se recupera
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sub),
    })
    if (!res.ok) throw new Error(`El servidor no guardó la suscripción (${res.status})`)
    return sub
  } catch (err) {
    console.error('Error al suscribirse a notificaciones:', err)
    return null
  }
}

// Manda una notificación de prueba a este teléfono. Devuelve { ok, error }
export async function sendTestPush() {
  const sub = await subscribeToPush()
  if (!sub) return { ok: false, error: 'No hay suscripción en este teléfono' }
  const res = await fetch('/api/test-push', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sub),
  })
  if (res.ok) return { ok: true }
  const data = await res.json().catch(() => ({}))
  return { ok: false, error: data.detalle || data.error || `Error ${res.status}` }
}

export async function getNotificationStatus() {
  if (!('Notification' in window) || !('serviceWorker' in navigator) || !('PushManager' in window)) return 'no-soportado'
  if (Notification.permission === 'granted') {
    const reg = await navigator.serviceWorker.ready
    const sub = await reg.pushManager.getSubscription()
    return sub ? 'activo' : 'permiso-sin-suscripcion'
  }
  return Notification.permission // 'denied' | 'default'
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)))
}
