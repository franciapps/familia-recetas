const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || ''

export async function requestNotificationPermission() {
  if (!('Notification' in window)) return false
  const permission = await Notification.requestPermission()
  return permission === 'granted'
}

function sameKey(buffer, key) {
  if (!buffer) return false
  const a = new Uint8Array(buffer)
  return a.length === key.length && a.every((v, i) => v === key[i])
}

// Se asegura de que este teléfono tenga una suscripción válida y de que el servidor la tenga guardada.
// Lanza un error con el motivo si algo falla.
async function ensureSubscription() {
  if (!('serviceWorker' in navigator)) throw new Error('Este navegador no tiene service worker')
  if (!VAPID_PUBLIC_KEY) throw new Error('Falta la clave VAPID en la app')
  const key = urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
  const reg = await navigator.serviceWorker.ready

  let sub = await reg.pushManager.getSubscription()
  // Una suscripción hecha con otra clave no recibe nada: se borra y se hace de nuevo
  if (sub && !sameKey(sub.options?.applicationServerKey, key)) {
    await sub.unsubscribe()
    sub = null
  }
  if (!sub) {
    sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: key })
  }

  // Mandarla siempre al servidor: si el servidor la había perdido, así se recupera
  const res = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sub),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(`El servidor no guardó la suscripción (${res.status}${data.detalle ? `: ${data.detalle}` : ''})`)
  }
  return sub
}

export async function subscribeToPush() {
  try {
    return await ensureSubscription()
  } catch (err) {
    console.error('Error al suscribirse a notificaciones:', err)
    return null
  }
}

// Manda una notificación de prueba a este teléfono. Devuelve { ok, error }
export async function sendTestPush() {
  let sub
  try {
    sub = await ensureSubscription()
  } catch (err) {
    return { ok: false, error: err.message || String(err) }
  }
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
