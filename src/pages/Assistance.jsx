import { useState, useMemo, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, CreditCard, Award, HelpCircle, ChevronDown, MessageCircle, Headphones, Search, ArrowUp, FileQuestion } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import PageHeader from '../components/ui/PageHeader'
import { faqCategories } from '../data/faq'
import { faqCategoriesEn } from '../data/faqEn'

const iconMap = {
    BookOpen,
    CreditCard,
    Award,
    HelpCircle,
}


const AccordionItem = ({ question, answer, isOpen, onToggle }) => (
    <motion.div
        initial={false}
        className="border border-slate-200 dark:border-slate-600 rounded-xl overflow-hidden bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-md hover:border-shark-accent/20 dark:hover:border-sky-400/20 transition-all duration-200"
    >
        <button
            type="button"
            onClick={onToggle}
            className="w-full flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 text-left font-sora font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-shark-accent/30 rounded-xl text-sm sm:text-base"
            aria-expanded={isOpen}
        >
            <span className="pr-2 sm:pr-4 break-words text-left flex-1 min-w-0">{question}</span>
            <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="shrink-0 w-8 h-8 rounded-lg bg-shark-accent/10 dark:bg-sky-400/20 flex items-center justify-center text-shark-accent dark:text-sky-400"
            >
                <ChevronDown size={18} />
            </motion.span>
        </button>
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                >
                    <div className="px-4 sm:px-5 pb-4 pt-0">
                        <div className="pl-0 border-l-2 border-shark-accent/30 dark:border-sky-400/30 pl-3 sm:pl-4 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed break-words">
                            {answer}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
)

const normalize = (s) => (s || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')

const Assistance = () => {
    const { t, i18n } = useTranslation()
    const [openId, setOpenId] = useState(null)
    const [search, setSearch] = useState('')
    const [showBackTop, setShowBackTop] = useState(false)
    const categoryRefs = useRef({})

    const faqCategoriesCurrent = i18n.language === 'en' ? faqCategoriesEn : faqCategories
    const totalQuestions = faqCategoriesCurrent.reduce((acc, cat) => acc + cat.questions.length, 0)

    const filteredCategories = useMemo(() => {
        const q = normalize(search).trim()
        if (!q) return faqCategoriesCurrent
        return faqCategoriesCurrent
            .map((cat) => ({
                ...cat,
                questions: cat.questions.filter(
                    (item) =>
                        normalize(item.question).includes(q) || normalize(item.answer).includes(q)
                ),
            }))
            .filter((cat) => cat.questions.length > 0)
    }, [search, faqCategoriesCurrent])

    const toggle = (id) => {
        setOpenId((prev) => (prev === id ? null : id))
    }

    useEffect(() => {
        const onScroll = () => setShowBackTop(window.scrollY > 400)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollToCategory = (id) => {
        const el = categoryRefs.current[id]
        if (el) el.scrollIntoView({ block: 'start' })
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0 })
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-shark-deep dark:bg-slate-900"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12 min-w-0">
                <PageHeader
                    tag={t('assistance.tag')}
                    title={t('assistance.title')}
                    subtitle={t('assistance.subtitle')}
                    image="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800"
                />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24 min-w-0">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-center mb-6"
                >
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        {t('assistance.intro')}{' '}
                        <Link to="/contact" className="text-shark-accent dark:text-sky-400 font-semibold hover:underline">
                            {t('common.contactUs')}
                        </Link>
                        .
                    </p>
                    <p className="text-slate-500 dark:text-slate-500 text-sm mt-1">
                        {t('assistance.responseTime', { count: totalQuestions })}
                    </p>
                </motion.div>

                {/* Barre de recherche */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative mb-8"
                >
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none"
                        aria-hidden
                    />
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t('assistance.searchPlaceholder')}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-shark-accent/40 focus:border-shark-accent dark:focus:ring-sky-400/40 font-sora text-sm transition-shadow"
                        aria-label={t('assistance.searchAria')}
                    />
                    {search && (
                        <button
                            type="button"
                            onClick={() => setSearch('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-sm font-medium"
                            aria-label={t('assistance.clearSearchAria')}
                        >
                            {t('common.clear')}
                        </button>
                    )}
                </motion.div>

                {/* Navigation rapide par catégories */}
                {!search && filteredCategories.length > 1 && (
                    <motion.nav
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        className="flex flex-wrap justify-center gap-2 mb-12"
                        aria-label={t('assistance.faqCategoriesAria')}
                    >
                        {faqCategoriesCurrent.map((cat) => {
                            const Icon = iconMap[cat.icon] || HelpCircle
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => scrollToCategory(cat.id)}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sora font-semibold bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-shark-accent/10 hover:border-shark-accent/30 hover:text-shark-accent dark:hover:text-sky-400 dark:hover:border-sky-400/30 transition-colors"
                                >
                                    <Icon size={16} />
                                    {cat.label}
                                </button>
                            )
                        })}
                    </motion.nav>
                )}

                {/* Compteur quand recherche active */}
                {search && (() => {
                    const count = filteredCategories.reduce((a, c) => a + c.questions.length, 0)
                    return (
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center">
                            {t('common.resultsCount', { count })}
                        </p>
                    )
                })()}

                {/* Liste FAQ */}
                {filteredCategories.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-16 px-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800/30"
                    >
                        <FileQuestion className="w-14 h-14 text-slate-400 dark:text-slate-500 mb-4" />
                        <h3 className="text-lg font-bold font-sora text-slate-800 dark:text-slate-200 mb-2">
                            {t('common.noResults', { query: search })}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm text-center max-w-sm mb-6">
                            {t('common.tryKeywords')}
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sora font-semibold bg-shark-accent text-white hover:bg-shark-accent/90 transition-colors"
                        >
                            <MessageCircle size={18} />
                            {t('common.contactUs')}
                        </Link>
                    </motion.div>
                ) : (
                    filteredCategories.map((category, catIndex) => {
                        const Icon = iconMap[category.icon] || HelpCircle
                        return (
                            <motion.section
                                key={category.id}
                                ref={(el) => (categoryRefs.current[category.id] = el)}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 + catIndex * 0.04 }}
                                className="mb-12 scroll-mt-28"
                            >
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-shark-accent/10 dark:bg-sky-400/20 flex items-center justify-center text-shark-accent dark:text-sky-400">
                                        <Icon size={22} />
                                    </div>
                                    <h2 className="text-xl font-black font-sora text-slate-900 dark:text-white uppercase tracking-tight">
                                        {category.label}
                                    </h2>
                                    <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
                                        {category.questions.length} {category.questions.length > 1 ? t('assistance.questions') : t('assistance.question')}
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    {category.questions.map((item) => (
                                        <AccordionItem
                                            key={item.id}
                                            question={item.question}
                                            answer={item.answer}
                                            isOpen={openId === item.id}
                                            onToggle={() => toggle(item.id)}
                                        />
                                    ))}
                                </div>
                            </motion.section>
                        )
                    })
                )}

                {/* Retour en haut */}
                <AnimatePresence>
                    {showBackTop && (
                        <motion.button
                            type="button"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={scrollToTop}
                            className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-shark-accent text-white shadow-lg hover:bg-shark-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-shark-accent flex items-center justify-center"
                            aria-label={t('assistance.backToTopAria')}
                        >
                            <ArrowUp size={20} />
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* CTA bloc chic */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-10 sm:mt-16 rounded-xl sm:rounded-2xl md:rounded-[28px] overflow-hidden border border-slate-200 dark:border-slate-600 shadow-xl min-w-0"
                >
                    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 p-6 sm:p-8 md:p-14">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(37,99,235,0.15),transparent_60%)]" />
                        <div className="absolute top-0 right-0 w-64 h-64 bg-shark-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8">
                            <div className="flex items-center gap-3 sm:gap-4 text-center md:text-left min-w-0">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center shrink-0">
                                    <Headphones className="text-white" size={24} />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-base sm:text-xl font-black font-sora text-white mb-0.5 sm:mb-1 break-words">{t('assistance.needHelp')}</h3>
                                    <p className="text-slate-300 text-xs sm:text-sm break-words">
                                        {t('assistance.needHelpDesc')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 shrink-0">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center px-6 py-3 rounded-full font-bold bg-white text-slate-900 hover:bg-slate-100 transition-colors font-sora"
                                >
                                    <MessageCircle size={18} className="mr-2" />
                                    {t('common.contactUs')}
                                </Link>
                                <a
                                    href="tel:+2250712624437"
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
                                >
                                    +225 07 12 62 44 37
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </motion.div>
    )
}

export default Assistance
