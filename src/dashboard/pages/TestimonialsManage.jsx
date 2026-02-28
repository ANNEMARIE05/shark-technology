import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { getTestimonials, setTestimonials } from '../../data/testimonials'
import Pagination from '../../components/ui/Pagination'

const PER_PAGE = 10

const searchIn = (q, ...strs) => {
    const lower = (q || '').toLowerCase().trim()
    if (!lower) return true
    return strs.some((s) => (s != null && String(s).toLowerCase().includes(lower)))
}

const TestimonialsManage = () => {
    const navigate = useNavigate()
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')

    const load = () => setList(getTestimonials().map((t) => ({ ...t, id: t.id || crypto.randomUUID() })))

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        const onUpdate = () => load()
        window.addEventListener('shark-dashboard-update', onUpdate)
        return () => window.removeEventListener('shark-dashboard-update', onUpdate)
    }, [])

    const filteredList = useMemo(() => {
        return list.filter((t) => searchIn(search, t.name, t.role, t.text))
    }, [list, search])

    useEffect(() => setPage(1), [search])

    const remove = (id) => {
        if (!confirm('Supprimer ce témoignage ?')) return
        const next = list.filter((t) => t.id !== id)
        setTestimonials(next)
        setList(next)
    }

    const totalPages = Math.max(1, Math.ceil(filteredList.length / PER_PAGE))
    const paginatedList = filteredList.slice((page - 1) * PER_PAGE, page * PER_PAGE)

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white font-sora">Témoignages</h1>
                <button
                    type="button"
                    onClick={() => navigate('/dashboard/temoignages/create')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-shark-accent text-white font-medium hover:bg-shark-accent/90"
                >
                    <Plus className="w-5 h-5" />
                    Ajouter
                </button>
            </div>

            <div className="relative mb-4 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    type="search"
                    placeholder="Rechercher (nom, rôle, texte…)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-shark-accent focus:border-transparent"
                />
            </div>

            <div className="glass-card rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden overflow-x-auto">
                <table className="w-full min-w-[640px]">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300 w-14">Avatar</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Nom</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Rôle</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300 max-w-[280px]">Témoignage</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300 w-16">Étoiles</th>
                            <th className="w-24 py-3 px-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="py-12 text-center text-slate-500 dark:text-slate-400">
                                    Aucun témoignage. Cliquez sur « Ajouter » pour en créer un.
                                </td>
                            </tr>
                        ) : paginatedList.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="py-12 text-center text-slate-500 dark:text-slate-400">
                                    Aucun résultat pour « {search} ».
                                </td>
                            </tr>
                        ) : paginatedList.map((t) => (
                            <tr key={t.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition">
                                <td className="py-3 px-4">
                                    {t.avatar ? (
                                        <img src={t.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                                    ) : (
                                        <span className="text-slate-400 text-xs">—</span>
                                    )}
                                </td>
                                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{t.name}</td>
                                <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{t.role || '—'}</td>
                                <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-300 max-w-[280px]">
                                    <div className="line-clamp-2 break-words" title={t.text || undefined}>
                                        {t.text || '—'}
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{t.stars ?? 5} ★</td>
                                <td className="py-3 px-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <button
                                            type="button"
                                            onClick={() => navigate(`/dashboard/temoignages/edit/${t.id}`)}
                                            className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-500/10 dark:hover:bg-blue-400/20"
                                            title="Modifier"
                                        >
                                            <Pencil className="w-5 h-5" />
                                        </button>
                                        <button type="button" onClick={() => remove(t.id)} className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-500/10 dark:hover:bg-red-400/20" title="Supprimer">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
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

export default TestimonialsManage
