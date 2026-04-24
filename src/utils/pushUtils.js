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
    // Verificar si ya existe una suscripción
    const existing = await reg.pushManager.getSubscription()
    if (existing) return existing

    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    })
    await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sub),
    })
    return sub
  } catch (err) {
    console.error('Error al suscribirse a notificaciones:', err)
    return null
  }
}

export async function getNotificationStatus() {
  if (!('Notification' in window)) return 'no-soportado'
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
