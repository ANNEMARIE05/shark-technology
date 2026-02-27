import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MapPin, Phone, Mail, MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'

const Contact = () => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => setLoading(false), 1500)
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
                    tag={t('contact.tag')}
                    title={t('contact.title')}
                    subtitle={t('contact.subtitle')}
                    image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 sm:pb-16 min-w-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-shark-accent/10 flex items-center justify-center">
                                <MessageCircle className="text-shark-accent" size={22} />
                            </div>
                            <h2 className="text-xl font-bold font-sora text-slate-900 dark:text-white">{t('contact.sendMessage')}</h2>
                        </div>
                        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('contact.fullName')}</label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        name="name"
                                        autoComplete="name"
                                        placeholder={t('contact.fullNamePlaceholder')}
                                        maxLength={200}
                                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-shark-accent/30 focus:border-shark-accent transition-all"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('contact.email')}</label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        placeholder={t('contact.emailPlaceholder')}
                                        maxLength={254}
                                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-shark-accent/30 focus:border-shark-accent transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('contact.message')}</label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    rows={4}
                                    placeholder={t('contact.messagePlaceholder')}
                                    maxLength={5000}
                                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-shark-accent/30 focus:border-shark-accent transition-all resize-none"
                                />
                            </div>
                            <Button type="submit" loading={loading} className="px-10 py-4 flex items-center gap-2">
                                {t('common.send')} <Send size={18} />
                            </Button>
                        </form>
                    </motion.div>

                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative hidden lg:block min-w-0"
                    >
                        <div className="sticky top-24 lg:top-28 rounded-2xl lg:rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-600 shadow-lg shadow-slate-200/50">
                            <img
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800"
                                alt="Shark Technologys - Contact"
                                className="w-full h-[320px] lg:h-[420px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />
                        </div>
                    </motion.div>
                </div>
            </div>

            <section className="relative w-full min-h-[55vh] lg:min-h-[60vh]">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600"
                        alt="Abidjan - Shark Technologys"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/5 pointer-events-none" />
                </div>

                <p className="absolute bottom-4 left-4 z-10 text-xs text-slate-600 dark:text-slate-400 bg-white/90 dark:bg-slate-800/90 backdrop-blur px-3 py-2 rounded-lg shadow-sm hidden sm:block">
                    {t('contact.mapHint')}
                </p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-4 right-4 left-4 sm:left-auto sm:right-6 lg:bottom-10 lg:right-10 z-20 w-full max-w-sm min-w-0"
                >
                    <div className="bg-slate-900 text-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-700/50 overflow-hidden">
                        <div className="p-4 sm:p-5 lg:p-8">
                            <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 sm:mb-4">{t('contact.address')}</h3>
                            <p className="text-white font-medium mb-0.5 sm:mb-1 text-sm sm:text-base break-words">Cocody Riviera 2, Rue D108</p>
                            <p className="text-slate-300 text-xs sm:text-sm break-words">Abidjan, Côte d'Ivoire</p>

                            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-700">
                                <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 sm:mb-4">{t('contact.contacts')}</h3>
                                <ul className="space-y-2 sm:space-y-3">
                                    <li className="flex items-center gap-2 sm:gap-3 min-w-0">
                                        <Phone size={16} className="text-shark-accent shrink-0" />
                                        <a href="tel:+2250712624437" className="text-white hover:text-shark-accent transition-colors text-sm sm:text-base break-all">+225 07 12 62 44 37</a>
                                    </li>
                                    <li className="flex items-center gap-2 sm:gap-3 min-w-0">
                                        <Mail size={16} className="text-shark-accent shrink-0" />
                                        <a href="mailto:infos@sharktechnologys.ci" className="text-white hover:text-shark-accent transition-colors text-xs sm:text-sm break-all">infos@sharktechnologys.ci</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2">
                                <a
                                    href="https://www.google.com/maps/search/Cocody+Riviera+2+Rue+D108+Abidjan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                                >
                                    {t('common.expandMap')}
                                </a>
                                <span className="text-slate-600">|</span>
                                <a
                                    href="https://www.google.com/maps/dir//Cocody+Riviera+2+Rue+D108+Abidjan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                                >
                                    {t('common.directions')}
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </motion.div>
    )
}

export default Contact
