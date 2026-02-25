import { createContext, useContext, useEffect, useState } from 'react'
import { getTranslation } from '../locales/translations'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'shark-language'

export function LanguageProvider({ children }) {
    const [language, setLanguageState] = useState(() => {
        if (typeof window === 'undefined') return 'fr'
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved === 'en' || saved === 'fr') return saved
        return 'fr'
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, language)
        document.documentElement.lang = language
    }, [language])

    const setLanguage = (lang) => {
        if (lang === 'fr' || lang === 'en') setLanguageState(lang)
    }

    const t = (key, params = {}) => {
        let value = getTranslation(language, key)
        Object.entries(params).forEach(([k, v]) => {
            value = value.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v))
        })
        return value
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const ctx = useContext(LanguageContext)
    if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
    return ctx
}
