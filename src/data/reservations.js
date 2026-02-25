const STORAGE_KEY = 'shark_reservations'

function getStored() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
            const data = JSON.parse(raw)
            if (Array.isArray(data)) return data
        }
    } catch (_) {}
    return []
}

export function getReservations() {
    return getStored()
}

export function setReservations(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    window.dispatchEvent(new Event('shark-dashboard-update'))
}

export function addReservation(reservation) {
    const list = getStored()
    const item = {
        id: crypto.randomUUID(),
        ...reservation,
        status: 'en_attente',
        createdAt: new Date().toISOString(),
    }
    list.unshift(item)
    setReservations(list)
    return item
}
