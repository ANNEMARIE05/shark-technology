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

/** Une réservation exemple pour voir le fonctionnement du tableau (utilisée au premier chargement si aucune donnée). */
function getDefaultReservations() {
    return [
        {
            id: crypto.randomUUID(),
            name: 'Jean Dupont',
            email: 'jean.dupont@exemple.com',
            phone: '+225 07 00 00 00 00',
            formation: 'CompTIA Security+',
            dateSouhaitee: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
            message: 'Je souhaite un entretien pour discuter des prérequis et du planning.',
            status: 'en_attente',
            createdAt: new Date().toISOString(),
        },
    ]
}

export function getReservations() {
    const stored = getStored()
    if (stored.length === 0) {
        const defaultList = getDefaultReservations()
        setReservations(defaultList)
        return defaultList
    }
    return stored
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
