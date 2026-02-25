import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { translations } from './locales/translations'

const STORAGE_KEY = 'shark-language'

const savedLang = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
const initialLang = savedLang === 'en' || savedLang === 'fr' ? savedLang : 'fr'

i18n
    .use(initReactI18next)
    .init({
        resources: {
            fr: { translation: translations.fr },
            en: { translation: translations.en },
        },
        lng: initialLang,
        fallbackLng: 'fr',
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    })

i18n.on('languageChanged', (lng) => {
    if (typeof document !== 'undefined') {
        document.documentElement.lang = lng
        document.documentElement.setAttribute('lang', lng)
    }
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, lng)
    }
})

// Appliquer la langue au chargement
if (typeof document !== 'undefined') {
    document.documentElement.lang = initialLang
}

export default i18n
