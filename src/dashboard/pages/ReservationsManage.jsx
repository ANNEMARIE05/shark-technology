import { useState, useEffect, useMemo, Fragment } from 'react'
import { Trash2, User, Search, Eye, Pencil } from 'lucide-react'
import { getReservations, setReservations } from '../../data/reservations'
import Pagination from '../../components/ui/Pagination'

const PER_PAGE = 8
const STATUS_LABELS = {
    en_attente: 'En attente',
    confirme: 'Confirmé',
    annule: 'Annulé',
}

const searchIn = (q, ...strs) => {
    const lower = (q || '').toLowerCase().trim()
    if (!lower) return true
    return strs.some((s) => (s != null && String(s).toLowerCase().includes(lower)))
}

const ReservationsManage = () => {
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [expandedId, setExpandedId] = useState(null)
    const [replyDraft, setReplyDraft] = useState({})

    const load = () => setList(getReservations().map((r) => ({ ...r, id: r.id || crypto.randomUUID() })))

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        const onUpdate = () => load()
        window.addEventListener('shark-dashboard-update', onUpdate)
        return () => window.removeEventListener('shark-dashboard-update', onUpdate)
    }, [])

    const filteredList = useMemo(() => {
        return list.filter((r) =>
            searchIn(search, r.name, r.email, r.phone, r.formation, r.message, STATUS_LABELS[r.status], r.status)
        )
    }, [list, search])

    useEffect(() => setPage(1), [search])

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

    const saveReponse = (id, reponse, dateProposee) => {
        const next = list.map((r) =>
            r.id === id
                ? {
                      ...r,
                      adminReponse: reponse || '',
                      dateProposee: dateProposee || undefined,
                      reponseLe: new Date().toISOString(),
                  }
                : r
        )
        setReservations(next)
        setList(next)
        setReplyDraft((d) => {
            const nextDraft = { ...d }
            delete nextDraft[id]
            return nextDraft
        })
    }

    const cancelReponse = (id) => {
        if (!confirm('Annuler cette réponse ? Elle sera supprimée.')) return
        const next = list.map((r) =>
            r.id === id ? { ...r, adminReponse: '', dateProposee: undefined, reponseLe: undefined } : r
        )
        setReservations(next)
        setList(next)
        setReplyDraft((d) => {
            const nextDraft = { ...d }
            delete nextDraft[id]
            return nextDraft
        })
    }

    const totalPages = Math.max(1, Math.ceil(filteredList.length / PER_PAGE))
    const paginatedList = filteredList.slice((page - 1) * PER_PAGE, page * PER_PAGE)

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white font-sora">Réservations d&apos;entretien</h1>
            </div>

            <p className="text-slate-600 dark:text-slate-400 mb-4">
                Liste des demandes de réservation d&apos;entretien envoyées depuis la page « Réserver un entretien ».
            </p>

            <div className="relative mb-4 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-slate-400" />
                <input
                    type="search"
                    placeholder="Rechercher (nom, email, statut…)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-shark-accent focus:border-transparent"
                />
            </div>

            <div className="glass-card rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden overflow-x-auto">
                <table className="w-full min-w-[640px]">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Nom</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Email</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Statut</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Date souhaitée</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Demandé le</th>
                            <th className="w-28 py-3 px-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="py-12 text-center text-slate-500 dark:text-slate-400">
                                    Aucune réservation pour le moment.
                                </td>
                            </tr>
                        ) : paginatedList.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="py-12 text-center text-slate-500 dark:text-slate-400">
                                    Aucun résultat pour « {search} ».
                                </td>
                            </tr>
                        ) : paginatedList.map((r) => (
                                    <Fragment key={r.id}>
                                        <tr
                                            className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50/70 dark:hover:bg-slate-700/10 transition-colors duration-100"
                                        >
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <User className="w-5 h-5 text-slate-500 dark:text-slate-400 shrink-0" />
                                                    <span className="font-medium text-slate-900 dark:text-white">{r.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{r.email}</td>
                                            <td className="py-3 px-4">
                                                <select
                                                    value={r.status}
                                                    onChange={(e) => updateStatus(r.id, e.target.value)}
                                                    className="text-sm px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-shark-accent min-w-[7rem]"
                                                >
                                                    {Object.entries(STATUS_LABELS).map(([value, label]) => (
                                                        <option key={value} value={value}>{label}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                                                {r.dateSouhaitee
                                                    ? new Date(r.dateSouhaitee).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
                                                    : '—'}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-slate-500 dark:text-slate-400">
                                                {r.createdAt
                                                    ? new Date(r.createdAt).toLocaleString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                                                    : '—'}
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => setExpandedId((prev) => (prev === r.id ? null : r.id))}
                                                    className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-500/10 dark:hover:bg-blue-400/20"
                                                    title={expandedId === r.id ? 'Fermer' : 'Voir / Répondre'}
                                                >
                                                    <Eye className="!w-5 !h-5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setExpandedId((prev) => (prev === r.id ? null : r.id))}
                                                    className="p-2 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-500/10 dark:hover:bg-amber-400/20"
                                                    title="Modifier la réponse"
                                                >
                                                    <Pencil className="!w-5 !h-5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => remove(r.id)}
                                                    className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-500/10 dark:hover:bg-red-400/20"
                                                    title="Supprimer"
                                                >
                                                    <Trash2 className="!w-5 !h-5" />
                                                </button>
                                            </div>
                                            </td>
                                        </tr>
                                        {expandedId === r.id && (
                                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                                <td colSpan={6} className="py-4 px-4 text-sm">
                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <p className="font-medium text-slate-700 dark:text-slate-300">Coordonnées & demande</p>
                                                            {r.phone && <p><span className="text-slate-500 dark:text-slate-400">Téléphone :</span> {r.phone}</p>}
                                                            {r.formation && <p><span className="text-slate-500 dark:text-slate-400">Formation :</span> {r.formation}</p>}
                                                            {r.message && <p><span className="text-slate-500 dark:text-slate-400">Message :</span> {r.message}</p>}
                                                        </div>

                                                        <div className="border-t border-slate-200 dark:border-slate-600 pt-4">
                                                            <p className="font-medium text-slate-700 dark:text-slate-300 mb-2">Réponse (si la date ne convient pas, proposez une autre date)</p>
                                                            {r.adminReponse && replyDraft[r.id] === undefined ? (
                                                                <div className="rounded-lg bg-white dark:bg-slate-800/50 p-3 border border-slate-200 dark:border-slate-600 space-y-1">
                                                                    <p className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap">{r.adminReponse}</p>
                                                                    {r.dateProposee && (
                                                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                                                            Date proposée : {typeof r.dateProposee === 'string' && r.dateProposee.length === 10
                                                                                ? new Date(r.dateProposee + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                                                                                : r.dateProposee}
                                                                        </p>
                                                                    )}
                                                                    {r.reponseLe && (
                                                                        <p className="text-xs text-slate-400">Réponse enregistrée le {new Date(r.reponseLe).toLocaleString('fr-FR')}</p>
                                                                    )}
                                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => setReplyDraft((d) => ({ ...d, [r.id]: { reponse: r.adminReponse || '', dateProposee: r.dateProposee || '' } }))}
                                                                            className="text-sm text-shark-accent hover:underline"
                                                                        >
                                                                            Modifier la réponse
                                                                        </button>
                                                                        <span className="text-slate-300 dark:text-slate-600">|</span>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => cancelReponse(r.id)}
                                                                            className="text-sm text-red-600 dark:text-red-400 hover:underline"
                                                                        >
                                                                            Annuler la réponse
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="space-y-2 mt-2">
                                                                    <textarea
                                                                        placeholder="Ex. : La date demandée ne nous convient pas. Seriez-vous disponible à une autre date ? Nous vous proposons le…"
                                                                        value={replyDraft[r.id]?.reponse ?? r.adminReponse ?? ''}
                                                                        onChange={(e) => setReplyDraft((d) => ({ ...d, [r.id]: { ...(d[r.id] || { reponse: '', dateProposee: '' }), reponse: e.target.value } }))}
                                                                        rows={3}
                                                                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm"
                                                                    />
                                                                    <div className="flex flex-wrap items-center gap-2">
                                                                        <label className="text-slate-600 dark:text-slate-400 text-sm">Date proposée :</label>
                                                                        <input
                                                                            type="date"
                                                                            value={replyDraft[r.id]?.dateProposee ?? r.dateProposee ?? ''}
                                                                            onChange={(e) => setReplyDraft((d) => ({ ...d, [r.id]: { ...(d[r.id] || { reponse: '', dateProposee: '' }), dateProposee: e.target.value } }))}
                                                                            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => saveReponse(r.id, replyDraft[r.id]?.reponse ?? '', replyDraft[r.id]?.dateProposee || undefined)}
                                                                            className="px-4 py-1.5 rounded-lg bg-shark-accent text-white text-sm font-medium hover:bg-shark-accent/90"
                                                                        >
                                                                            Enregistrer la réponse
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setReplyDraft((d) => {
                                                                                    const next = { ...d }
                                                                                    delete next[r.id]
                                                                                    return next
                                                                                })
                                                                                if (!r.adminReponse) setExpandedId(null)
                                                                            }}
                                                                            className="px-4 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700"
                                                                        >
                                                                            Annuler
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>
                                ))}
                    </tbody>
                </table>
            </div>

            {filteredList.length > 0 && (
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            )}
        </div>
    )
}

export default ReservationsManage
