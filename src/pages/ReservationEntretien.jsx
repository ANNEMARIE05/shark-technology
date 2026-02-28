import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Calendar,
    Send,
    User,
    Mail,
    MessageCircle,
    CheckCircle,
    Clock,
    Video,
    FileCheck,
    ArrowRight,
    Phone,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import { addReservation } from '../data/reservations'
import { useDashboardStore } from '../dashboard/store'

const ReservationEntretien = () => {
    const { t } = useTranslation()
    const certifications = useDashboardStore((s) => s.getCertifications('fr'))
    const [sent, setSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        formation: '',
        dateSouhaitee: '',
        message: '',
    })

    const benefits = [
        { icon: Clock, titleKey: 'reservation.response24', textKey: 'reservation.response24Desc' },
        { icon: Video, titleKey: 'reservation.inPersonOrRemote', textKey: 'reservation.inPersonOrRemoteDesc' },
        { icon: FileCheck, titleKey: 'reservation.personalizedAdvice', textKey: 'reservation.personalizedAdviceDesc' },
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            addReservation({
                name: form.name,
                email: form.email,
                phone: form.phone || undefined,
                formation: form.formation || undefined,
                dateSouhaitee: form.dateSouhaitee || undefined,
                message: form.message || undefined,
            })
            setSent(true)
            setLoading(false)
        }, 800)
    }

    if (sent) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-shark-deep dark:bg-slate-900"
            >
                <div className="max-w-7xl mx-auto px-6 pt-24 pb-20">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                        className="max-w-xl mx-auto text-center"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-8">
                            <CheckCircle className="text-green-600 dark:text-green-400" size={48} />
                        </div>
                        <h1 className="text-2xl md:text-4xl font-black font-sora text-slate-900 dark:text-white mb-4">
                            {t('reservation.successTitle')}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg mb-10 leading-relaxed">
                            {t('reservation.successDesc')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button onClick={() => setSent(false)} variant="outline" className="order-2 sm:order-1">
                                {t('reservation.bookAnother')}
                            </Button>
                            <Link to="/formations" className="order-1 sm:order-2">
                                <Button className="w-full sm:w-auto flex items-center justify-center gap-2">
                                    {t('common.viewCourses')} <ArrowRight size={18} />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-shark-deep dark:bg-slate-900"
        >
            {/* Hero dédié à la réservation */}
            <section className="relative overflow-hidden min-h-[38vh] md:min-h-[42vh] flex flex-col justify-end bg-slate-50 dark:bg-slate-800/80">
                <div className="absolute inset-0 opacity-[0.07] dark:opacity-[0.08]">
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 pb-14 md:pt-28 md:pb-20">
                    <motion.div
                        initial={{ y: 24, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-3xl"
                    >
                        <div className="inline-flex items-center gap-2 bg-shark-accent/10 dark:bg-shark-accent/20 text-shark-accent dark:text-sky-400 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] border border-shark-accent/20 dark:border-shark-accent/30 mb-6">
                            <Calendar size={14} className="opacity-90" />
                            {t('reservation.badge')}
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black font-sora text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-4">
                            {t('reservation.title')}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed">
                            {t('reservation.intro')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Avantages */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-20 min-w-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    {benefits.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ y: 24, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.12 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="group bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-7 border border-slate-200/80 dark:border-slate-700 shadow-lg hover:shadow-xl hover:border-shark-accent/25 dark:hover:border-shark-accent/30 transition-all duration-300 flex gap-3 sm:gap-5"
                        >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-shark-accent/20 to-shark-accent/10 flex items-center justify-center shrink-0 group-hover:from-shark-accent/25 group-hover:to-shark-accent/15 transition-colors duration-300">
                                <item.icon className="text-shark-accent dark:text-sky-400" size={22} />
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-bold font-sora text-slate-900 dark:text-white mb-1 sm:mb-1.5 text-base sm:text-lg break-words">{t(item.titleKey)}</h3>
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed break-words">{t(item.textKey)}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Formulaire dans une carte dédiée */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-24 min-w-0">
                <motion.div
                    initial={{ y: 32, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl md:rounded-[1.75rem] border border-slate-200 dark:border-slate-700 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden">
                        <div className="bg-gradient-to-r from-slate-50 to-slate-100/80 dark:from-slate-700/40 dark:to-slate-800/60 px-4 sm:px-6 py-4 sm:py-6 border-b border-slate-200 dark:border-slate-700">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-shark-accent/15 dark:bg-shark-accent/20 flex items-center justify-center shadow-sm shrink-0">
                                    <Calendar className="text-shark-accent dark:text-sky-400" size={20} />
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-base sm:text-xl font-bold font-sora text-slate-900 dark:text-white break-words">
                                        {t('reservation.formTitle')}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5 break-words">
                                        {t('reservation.formDesc')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit} noValidate>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="res-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        {t('reservation.fullName')}
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            id="res-name"
                                            type="text"
                                            required
                                            value={form.name}
                                            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                                            placeholder={t('reservation.fullNamePlaceholder')}
                                            className="w-full bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-600 rounded-xl pl-10 pr-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-shark-accent/40 focus:border-shark-accent transition-shadow"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="res-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        {t('reservation.email')}
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            id="res-email"
                                            type="email"
                                            required
                                            value={form.email}
                                            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                                            placeholder={t('reservation.emailPlaceholder')}
                                            className="w-full bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-600 rounded-xl pl-10 pr-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-shark-accent/40 focus:border-shark-accent transition-shadow"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="res-phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    {t('reservation.phone')}
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        id="res-phone"
                                        type="tel"
                                        value={form.phone}
                                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                                        placeholder={t('reservation.phonePlaceholder')}
                                        className="w-full bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-600 rounded-xl pl-10 pr-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-shark-accent/40 focus:border-shark-accent transition-shadow"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="res-formation" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    {t('reservation.formationLabel')}
                                </label>
                                <select
                                    id="res-formation"
                                    value={form.formation}
                                    onChange={(e) => setForm((f) => ({ ...f, formation: e.target.value }))}
                                    className="w-full bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-shark-accent/40 focus:border-shark-accent transition-shadow"
                                >
                                    <option value="">{t('reservation.chooseFormation')}</option>
                                    {certifications.map((c) => (
                                        <option key={c.id} value={c.title}>{c.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="res-date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    {t('reservation.desiredDate')}
                                </label>
                                <input
                                    id="res-date"
                                    type="date"
                                    value={form.dateSouhaitee}
                                    onChange={(e) => setForm((f) => ({ ...f, dateSouhaitee: e.target.value }))}
                                    min={new Date().toISOString().slice(0, 10)}
                                    className="w-full bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-shark-accent/40 focus:border-shark-accent transition-shadow"
                                />
                            </div>
                            <div>
                                <label htmlFor="res-message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    {t('reservation.message')}
                                </label>
                                <div className="relative">
                                    <MessageCircle className="absolute left-3 top-3 text-slate-400" size={18} />
                                    <textarea
                                        id="res-message"
                                        value={form.message}
                                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                                        rows={4}
                                        placeholder={t('reservation.messagePlaceholder')}
                                        className="w-full bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-600 rounded-xl pl-10 pr-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-shark-accent/40 focus:border-shark-accent resize-none transition-shadow"
                                    />
                                </div>
                            </div>
                            <div className="pt-2">
                                <Button type="submit" loading={loading} className="w-full sm:w-auto px-10 py-4 flex items-center justify-center gap-2 shadow-lg shadow-shark-accent/25 hover:shadow-xl hover:shadow-shark-accent/30 transition-shadow">
                                    {t('reservation.submit')} <Send size={18} />
                                </Button>
                            </div>
                        </form>
                    </div>

                    <p className="text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-8 max-w-md mx-auto leading-relaxed">
                        {t('reservation.disclaimer')}
                    </p>
                </motion.div>
            </section>
        </motion.div>
    )
}

export default ReservationEntretien
