import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../contexts/ThemeContext'
import logoImg from '../../assets/img/logo.png'

const LANGUAGES = [
    { code: 'en', label: 'Anglais', flagImage: 'https://flagcdn.com/w40/gb.png' },
    { code: 'fr', label: 'Français', flagImage: 'https://flagcdn.com/w40/fr.png' },
]

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [langMenuOpen, setLangMenuOpen] = useState(false)
    const location = useLocation()
    const { theme, toggleTheme } = useTheme()
    const { t, i18n } = useTranslation()
    const language = i18n.language || 'fr'
    const setLanguage = (lng) => { if (lng === 'fr' || lng === 'en') i18n.changeLanguage(lng) }

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { nameKey: 'nav.home', path: '/' },
        { nameKey: 'nav.formations', path: '/formations' },
        { nameKey: 'nav.blog', path: '/blog' },
        { nameKey: 'nav.contact', path: '/contact' },
    ]

    return (
        <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 py-4 backdrop-blur-md border-b ${scrolled ? 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-700/80 shadow-md' : 'bg-transparent border-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3 group">
                    <motion.div
                        className="w-10 h-10 bg-gradient-to-tr from-shark-accent to-premium-neon rounded-xl flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <img
                            src={logoImg}
                            alt="SHARK TECHNOLOGYS"
                            className="h-8 w-auto object-contain"
                        />
                    </motion.div>
                    <span className="text-xl font-black tracking-tighter font-sora text-slate-900 dark:text-white group-hover:text-shark-accent transition-colors">
                        SHARK <span className="font-light text-shark-silver dark:text-slate-400">TECHNOLOGYS</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-sm font-semibold uppercase tracking-widest hover:text-shark-accent dark:hover:text-sky-400 transition-all relative group ${location.pathname === link.path ? 'text-shark-accent dark:text-sky-400' : 'text-slate-500 dark:text-slate-400'}`}
                        >
                            {t(link.nameKey)}
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-shark-accent transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`} />
                        </Link>
                    ))}
                    <div className="flex items-center gap-2 ml-4">
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setLangMenuOpen((o) => !o)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-600 min-w-[100px] justify-between"
                                title={t('common.language')}
                                aria-label={t('common.language')}
                                aria-expanded={langMenuOpen}
                            >
                                <span className="flex items-center gap-2">
                                    <img
                                        src={LANGUAGES.find((l) => l.code === language)?.flagImage ?? LANGUAGES[1].flagImage}
                                        alt=""
                                        className="w-6 h-4 object-cover rounded-sm shrink-0"
                                        role="presentation"
                                    />
                                    <span className="text-sm font-medium capitalize">
                                        {language === 'fr' ? 'Français' : 'Anglais'}
                                    </span>
                                </span>
                                <ChevronDown size={16} className={`text-slate-500 dark:text-slate-400 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {langMenuOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" aria-hidden="true" onClick={() => setLangMenuOpen(false)} />
                                        <motion.div
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            className="absolute right-0 top-full mt-2 py-1.5 min-w-[140px] rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 shadow-xl z-50"
                                        >
                                            {LANGUAGES.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    type="button"
                                                    onClick={() => {
                                                        setLanguage(lang.code)
                                                        setLangMenuOpen(false)
                                                    }}
                                                    className={`flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${language === lang.code ? 'text-shark-accent bg-shark-accent/10 dark:bg-shark-accent/20' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/80'}`}
                                                >
                                                    <img
                                                        src={lang.flagImage}
                                                        alt=""
                                                        className="w-6 h-4 object-cover rounded-sm shrink-0"
                                                        role="presentation"
                                                    />
                                                    {lang.label}
                                                </button>
                                            ))}
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-slate-500 dark:text-amber-200/90 hover:text-shark-accent dark:hover:text-amber-100 hover:bg-shark-accent/10 dark:hover:bg-white/10 transition-colors"
                            title={theme === 'dark' ? t('nav.themeDay') : t('nav.themeNight')}
                            aria-label={theme === 'dark' ? t('nav.themeDayAria') : t('nav.themeNightAria')}
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <a href="tel:+2250712624437" className="px-4 py-2 border border-shark-accent/30 rounded-full text-xs font-bold text-shark-accent hover:bg-shark-accent hover:text-white transition-all">
                            +225 07 12 62 44 37
                        </a>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-2">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-slate-600 dark:text-amber-200/90 hover:text-shark-accent dark:hover:text-amber-100 transition-colors"
                        aria-label={theme === 'dark' ? 'Mode jour' : 'Mode nuit'}
                    >
                        {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
                    </button>
                    <button className="text-slate-800 dark:text-slate-200" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-slate-900 border-b border-black/5 dark:border-slate-700/50 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            <div className="flex items-center gap-2 pb-4 border-b border-slate-200 dark:border-slate-700">
                                <span className="text-sm text-slate-500 dark:text-slate-400">{t('common.language')}</span>
                                {LANGUAGES.map((lang) => (
                                    <button
                                        key={lang.code}
                                        type="button"
                                        onClick={() => setLanguage(lang.code)}
                                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium ${language === lang.code ? 'bg-shark-accent/20 text-shark-accent' : 'text-slate-600 dark:text-slate-300'}`}
                                    >
                                        <img
                                            src={lang.flagImage}
                                            alt=""
                                            className="w-5 h-[14px] object-cover rounded-sm shrink-0"
                                            role="presentation"
                                        />
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-lg font-bold ${location.pathname === link.path ? 'text-shark-accent' : 'text-slate-600 dark:text-slate-300'}`}
                                >
                                    {t(link.nameKey)}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar
