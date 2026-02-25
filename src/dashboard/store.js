import { useState, useEffect } from 'react'
import { getTestimonials, setTestimonials } from '../data/testimonials'
import { getPartners, setPartners } from '../data/partners'
import { articles as defaultArticles } from '../data/articles'
import { certifications } from '../data/certifications'

const ARTICLES_KEY = 'shark_articles'

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
        getCertifications: () => certifications,
    })
}
