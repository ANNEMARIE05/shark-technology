import adviceLogo from '../assets/img/partenaires/advice.png'
import burgeapLogo from '../assets/img/partenaires/burgeap.png'
import gnaLogo from '../assets/img/partenaires/gna.png'
import nidLogo from '../assets/img/partenaires/nid.png'
import terraLogo from '../assets/img/partenaires/terra.png'

export const defaultPartners = [
    { id: '1', name: 'Advice', desc: 'Partenaire', logo: adviceLogo },
    { id: '2', name: 'Burgeap', desc: 'Partenaire', logo: burgeapLogo },
    { id: '3', name: 'GNA', desc: 'Partenaire', logo: gnaLogo },
    { id: '4', name: 'NID', desc: 'Partenaire', logo: nidLogo },
    { id: '5', name: 'Terra', desc: 'Partenaire', logo: terraLogo },
]

const KEY = 'shark_partners'

export function getStoredPartners() {
    try {
        const raw = localStorage.getItem(KEY)
        if (raw) {
            const data = JSON.parse(raw)
            if (Array.isArray(data) && data.length) return data
        }
    } catch (_) {}
    return null
}

export function getPartners() {
    return getStoredPartners() ?? defaultPartners
}

export function setPartners(list) {
    const toStore = list.map((p) => ({ id: p.id, name: p.name, desc: p.desc || 'Partenaire', logo: p.logo || '' }))
    localStorage.setItem(KEY, JSON.stringify(toStore))
    window.dispatchEvent(new Event('shark-dashboard-update'))
}
