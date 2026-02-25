import { useState, useEffect } from 'react'
import { MessageCircle, Users, FileText, Award, CalendarCheck, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDashboardStore } from './store'
import { getReservations } from '../data/reservations'

const cards = [
    { to: '/dashboard/temoignages', icon: MessageCircle, label: 'Témoignages', key: 'testimonials' },
    { to: '/dashboard/partenaires', icon: Users, label: 'Partenaires', key: 'partners' },
    { to: '/dashboard/blog', icon: FileText, label: 'Articles blog', key: 'articles' },
    { to: '/dashboard/certifications', icon: Award, label: 'Certifications', key: 'certifications' },
]

const STATUS_LABELS = { en_attente: 'En attente', confirme: 'Confirmé', annule: 'Annulé' }
const STATUS_COLORS = {
    en_attente: 'bg-amber-500',
    confirme: 'bg-emerald-500',
    annule: 'bg-slate-400 dark:bg-slate-500',
}

const DashboardHome = () => {
    const counts = useDashboardStore((s) => ({
        testimonials: s.getTestimonials().length,
        partners: s.getPartners().length,
        articles: s.getArticles().length,
        certifications: s.getCertifications().length,
    }))
    const [reservations, setReservations] = useState([])

    useEffect(() => {
        const load = () => setReservations(getReservations())
        load()
        window.addEventListener('shark-dashboard-update', load)
        return () => window.removeEventListener('shark-dashboard-update', load)
    }, [])

    const getCount = (key) => counts[key] ?? 0
    const totalResas = reservations.length
    const byStatus = reservations.reduce((acc, r) => {
        const s = r.status || 'en_attente'
        acc[s] = (acc[s] || 0) + 1
        return acc
    }, {})
    const maxStatusCount = Math.max(1, ...Object.values(byStatus))
    const contentTotal = getCount('testimonials') + getCount('partners') + getCount('articles') + getCount('certifications')
    const contentMax = Math.max(1, ...Object.values(counts))

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white font-sora mb-2">
                    Tableau de bord
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Vue d’ensemble et indicateurs clés.
                </p>
            </div>

            {/* KPIs principaux */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                    to="/dashboard/reservations"
                    className="rounded-xl p-5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-shark-accent/30 transition flex items-center gap-4 shadow-sm"
                >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <CalendarCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Réservations</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">{totalResas}</p>
                    </div>
                </Link>
                {cards.map(({ to, icon: Icon, label, key }) => (
                    <Link
                        key={to}
                        to={to}
                        className="rounded-xl p-5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-shark-accent/30 transition flex items-center gap-4 shadow-sm"
                    >
                        <div className="w-12 h-12 rounded-xl bg-shark-accent/15 flex items-center justify-center text-shark-accent">
                            <Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
                            <p className="text-2xl font-black text-slate-900 dark:text-white">{getCount(key)}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Graphiques */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Réservations par statut */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                    <h2 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-shark-accent" />
                        Réservations par statut
                    </h2>
                    <div className="space-y-4">
                        {['en_attente', 'confirme', 'annule'].map((status) => {
                            const n = byStatus[status] || 0
                            const barW = maxStatusCount ? (n / maxStatusCount) * 100 : 0
                            return (
                                <div key={status}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-600 dark:text-slate-400">{STATUS_LABELS[status]}</span>
                                        <span className="font-semibold text-slate-900 dark:text-white">{n}</span>
                                    </div>
                                    <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${STATUS_COLORS[status]} transition-all duration-500`}
                                            style={{ width: `${barW}%` }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {totalResas === 0 && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Aucune réservation pour l’instant.</p>
                    )}
                </div>

                {/* Contenu du site */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                    <h2 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-shark-accent" />
                        Contenu publié
                    </h2>
                    <div className="space-y-4">
                        {cards.map(({ key, label }) => {
                            const n = getCount(key)
                            const barW = contentMax ? (n / contentMax) * 100 : 0
                            return (
                                <div key={key}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-600 dark:text-slate-400">{label}</span>
                                        <span className="font-semibold text-slate-900 dark:text-white">{n}</span>
                                    </div>
                                    <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-shark-accent dark:bg-premium-neon/80 transition-all duration-500"
                                            style={{ width: `${barW}%` }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
                        Total : <span className="font-semibold text-slate-700 dark:text-slate-300">{contentTotal}</span> éléments
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DashboardHome
