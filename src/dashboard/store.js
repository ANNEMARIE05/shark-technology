import { useState, useEffect } from 'react'
import { Network, Server, Lock, Cpu, Database, Shield } from 'lucide-react'
import { getTestimonials, setTestimonials } from '../data/testimonials'
import { getPartners, setPartners } from '../data/partners'
import { articles as defaultArticles } from '../data/articles'
import { certifications } from '../data/certifications'
import { certificationsEn } from '../data/certificationsEn'

const ARTICLES_KEY = 'shark_articles'
const CERTIFICATIONS_KEY = 'shark_certifications'
const HIDDEN_CERTIFICATIONS_KEY = 'shark_hidden_cert_slugs'

const ICON_MAP = { Cpu, Shield, Network, Server, Lock, Database }

function getIconKeyFromIcon(IconComponent) {
    for (const [key, Icon] of Object.entries(ICON_MAP))
        if (Icon === IconComponent) return key
    return 'Cpu'
}

function getStoredCertifications() {
    try {
        const raw = localStorage.getItem(CERTIFICATIONS_KEY)
        if (raw) {
            const data = JSON.parse(raw)
            if (Array.isArray(data)) return data
        }
    } catch (_) {}
    return []
}

function resolveCert(c, fromStore = false) {
    if (c.icon && !c.iconKey && !c.iconImage) return fromStore ? { ...c, _fromStore: true } : c
    if (c.iconImage) return fromStore ? { ...c, icon: null, iconImage: c.iconImage, _fromStore: true } : { ...c, icon: null, iconImage: c.iconImage }
    const Icon = c.iconKey ? ICON_MAP[c.iconKey] : null
    const resolved = Icon ? { ...c, icon: Icon } : { ...c, icon: Cpu }
    return fromStore ? { ...resolved, _fromStore: true } : resolved
}

function getHiddenSlugs() {
    try {
        const raw = localStorage.getItem(HIDDEN_CERTIFICATIONS_KEY)
        if (raw) {
            const data = JSON.parse(raw)
            if (Array.isArray(data)) return data
        }
    } catch (_) {}
    return []
}

function setHiddenSlugs(list) {
    localStorage.setItem(HIDDEN_CERTIFICATIONS_KEY, JSON.stringify(list))
    window.dispatchEvent(new Event('shark-dashboard-update'))
}

function hideCertificationBySlug(slug) {
    const list = getHiddenSlugs()
    if (!list.includes(slug)) {
        list.push(slug)
        setHiddenSlugs(list)
    }
}

function getCertificationsList(lang = 'fr') {
    const base = lang === 'en' ? certificationsEn : certifications
    const stored = getStoredCertifications().map((c) => resolveCert(c, true))
    const storedSlugs = new Set(stored.map((c) => c.slug))
    const hidden = getHiddenSlugs()
    const baseFiltered = base.filter((c) => !storedSlugs.has(c.slug) && !hidden.includes(c.slug))
    const storedFiltered = stored.filter((c) => !hidden.includes(c.slug))
    return [...baseFiltered, ...storedFiltered]
}

function getCertificationBySlug(slug, lang = 'fr') {
    return getCertificationsList(lang).find((c) => c.slug === slug)
}

function getStoredCertificationBySlug(slug) {
    return getStoredCertifications().find((c) => c.slug === slug) ?? null
}

function setStoredCertifications(list) {
    localStorage.setItem(CERTIFICATIONS_KEY, JSON.stringify(list))
    window.dispatchEvent(new Event('shark-dashboard-update'))
}

function addCertification(cert) {
    const list = getStoredCertifications()
    list.push(cert)
    setStoredCertifications(list)
}

function removeCertificationBySlug(slug) {
    const list = getStoredCertifications().filter((c) => c.slug !== slug)
    setStoredCertifications(list)
}

function updateCertification(slug, data) {
    const list = getStoredCertifications().map((c) =>
        c.slug === slug ? { ...c, ...data, slug: data.slug ?? c.slug } : c
    )
    setStoredCertifications(list)
}

function getStoredArticles() {
    try {
        const raw = localStorage.getItem(ARTICLES_KEY)
        if (raw) {
            const data = JSON.parse(raw)
            if (Array.isArray(data) && data.length) return data
        }
    } catch (_) {}
    return null
}

function getArticlesList() {
    return getStoredArticles() ?? defaultArticles
}

function setArticlesList(list) {
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(list))
    window.dispatchEvent(new Event('shark-dashboard-update'))
}

export function useDashboardStore(selector) {
    const [tick, setTick] = useState(0)
    useEffect(() => {
        const onUpdate = () => setTick((t) => t + 1)
        window.addEventListener('shark-dashboard-update', onUpdate)
        return () => window.removeEventListener('shark-dashboard-update', onUpdate)
    }, [])
    return selector({
        getTestimonials,
        setTestimonials,
        getPartners,
        setPartners,
        getArticles: getArticlesList,
        setArticles: setArticlesList,
        getCertifications: getCertificationsList,
        getCertificationBySlug,
        getStoredCertificationBySlug,
        getIconKeyFromIcon,
        addCertification,
        updateCertification,
        removeCertificationBySlug,
        hideCertificationBySlug,
    })
}
