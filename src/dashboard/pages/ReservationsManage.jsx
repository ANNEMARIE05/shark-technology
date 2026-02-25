import { useState, useEffect } from 'react'
import { Trash2, Calendar, Mail, User, ChevronDown } from 'lucide-react'
import { getReservations, setReservations } from '../../data/reservations'
import Pagination from '../../components/ui/Pagination'

const PER_PAGE = 8
const STATUS_LABELS = {
    en_attente: 'En attente',
    confirme: 'Confirmé',
    annule: 'Annulé',
}

const ReservationsManage = () => {
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [expandedId, setExpandedId] = useState(null)

    const load = () => setList(getReservations().map((r) => ({ ...r, id: r.id || crypto.randomUUID() })))

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        const onUpdate = () => load()
        window.addEventListener('shark-dashboard-update', onUpdate)
        return () => window.removeEventListener('shark-dashboard-update', onUpdate)
    }, [])

    const updateStatus = (id, status) => {
        const next = list.map((r) => (r.id === id ? { ...r, status } : r))
        setReservations(next)
        setList(next)
    }

    const remove = (id) => {
        if (!confirm('Supprimer cette réservation ?')) return
        const next = list.filter((r) => r.id !== id)
        setReservations(next)
        setList(next)
        if (expandedId === id) setExpandedId(null)
    }

    const totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE))
    const paginatedList = list.slice((page - 1) * PER_PAGE, page * PER_PAGE)

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white font-sora">Réservations d&apos;entretien</h1>
            </div>

            <p className="text-slate-600 dark:text-slate-400 mb-6">
                Liste des demandes de réservation d&apos;entretien envoyées depuis la page « Réserver un entretien ».
            </p>

            {list.length === 0 ? (
                <div className="glass-card rounded-xl p-12 border border-slate-200 dark:border-slate-700 text-center text-slate-500 dark:text-slate-400">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Aucune réservation pour le moment.</p>
                </div>
            ) : (
                <>
                    <div className="space-y-3">
                        {paginatedList.map((r) => (
                            <div
                                key={r.id}
                                className="glass-card rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                            >
                                <button
                                    type="button"
                                    onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                                    className="w-full p-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/30 transition"
                                >
                                    <div className="flex flex-wrap items-center gap-3 min-w-0">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <User className="w-4 h-4 text-slate-400 shrink-0" />
                                            <span className="font-semibold text-slate-900 dark:text-white truncate">{r.name}</span>
                                        </div>
                                        <span className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 truncate">
                                            <Mail className="w-4 h-4 shrink-0" />
                                            {r.email}
                                        </span>
                                        <span
                                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                                                r.status === 'confirme'
                                                    ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                                                    : r.status === 'annule'
                                                    ? 'bg-red-500/20 text-red-600 dark:text-red-400'
                                                    : 'bg-amber-500/20 text-amber-700 dark:text-amber-400'
                                            }`}
                                        >
                                            {STATUS_LABELS[r.status] || r.status}
                                        </span>
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${expandedId === r.id ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {expandedId === r.id && (
                                    <div className="px-4 pb-4 pt-0 border-t border-slate-200 dark:border-slate-700">
                                        <div className="pt-4 space-y-2 text-sm">
                                            {r.phone && (
                                                <p>
                                                    <span className="text-slate-500 dark:text-slate-400">Téléphone :</span>{' '}
                                                    {r.phone}
                                                </p>
                                            )}
                                            {r.formation && (
                                                <p>
                                                    <span className="text-slate-500 dark:text-slate-400">Formation :</span>{' '}
                                                    {r.formation}
                                                </p>
                                            )}
                                            {r.dateSouhaitee && (
                                                <p>
                                                    <span className="text-slate-500 dark:text-slate-400">Date souhaitée :</span>{' '}
                                                    {new Date(r.dateSouhaitee).toLocaleDateString('fr-FR', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    })}
                                                </p>
                                            )}
                                            {r.message && (
                                                <p>
                                                    <span className="text-slate-500 dark:text-slate-400">Message :</span>{' '}
                                                    {r.message}
                                                </p>
                                            )}
                                            <p className="text-xs text-slate-400 dark:text-slate-500 pt-1">
                                                Demandé le{' '}
                                                {r.createdAt
                                                    ? new Date(r.createdAt).toLocaleString('fr-FR', {
                                                          day: 'numeric',
                                                          month: 'short',
                                                          year: 'numeric',
                                                          hour: '2-digit',
                                                          minute: '2-digit',
                                                      })
                                                    : '—'}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 mt-4">
                                            <select
                                                value={r.status}
                                                onChange={(e) => updateStatus(r.id, e.target.value)}
                                                className="text-sm px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                                            >
                                                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                                                    <option key={value} value={value}>
                                                        {label}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => remove(r.id)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </>
            )}
        </div>
    )
}

export default ReservationsManage
