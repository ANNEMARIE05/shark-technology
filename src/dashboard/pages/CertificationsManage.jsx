import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDashboardStore } from '../store'
import { Award, Search, Plus, Pencil, Trash2, Eye } from 'lucide-react'
import Pagination from '../../components/ui/Pagination'

const PER_PAGE = 10

const searchIn = (q, ...strs) => {
    const lower = (q || '').toLowerCase().trim()
    if (!lower) return true
    return strs.some((s) => (s != null && String(s).toLowerCase().includes(lower)))
}

const CertificationsManage = () => {
    const navigate = useNavigate()
    const getCertifications = useDashboardStore((s) => s.getCertifications)
    const removeCertificationBySlug = useDashboardStore((s) => s.removeCertificationBySlug)
    const hideCertificationBySlug = useDashboardStore((s) => s.hideCertificationBySlug)
    const [certs, setCerts] = useState([])
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')

    const load = () => setCerts(getCertifications('fr'))

    useEffect(() => {
        load()
    }, [getCertifications])

    useEffect(() => {
        window.addEventListener('shark-dashboard-update', load)
        return () => window.removeEventListener('shark-dashboard-update', load)
    }, [getCertifications])

    const filteredList = useMemo(() => {
        return certs.filter((c) =>
            searchIn(search, c.title, c.subtitle, c.description, c.slug, c.level)
        )
    }, [certs, search])

    useEffect(() => setPage(1), [search])

    const totalPages = Math.max(1, Math.ceil(filteredList.length / PER_PAGE))
    const paginatedList = filteredList.slice((page - 1) * PER_PAGE, page * PER_PAGE)

    const handleDelete = (c) => {
        if (!confirm(`Supprimer la formation « ${c.title} » ?`)) return
        if (c._fromStore) removeCertificationBySlug(c.slug)
        else hideCertificationBySlug(c.slug)
        load()
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white font-sora mb-2">Formations / Certifications</h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Consultez la liste, créez ou modifiez les formations. Elles s'affichent sur la page Formations du site.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => navigate('/dashboard/certifications/create')}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-shark-accent text-white font-medium hover:bg-shark-accent/90 shrink-0"
                >
                    <Plus className="w-5 h-5" />
                    Créer une formation
                </button>
            </div>

            <div className="relative mb-4 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    type="search"
                    placeholder="Rechercher (titre, sous-titre, niveau…)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-shark-accent focus:border-transparent"
                />
            </div>

            <div className="glass-card rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden overflow-x-auto">
                <table className="w-full min-w-[720px]">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300 w-10"></th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300 w-20">Image</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Titre</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Sous-titre</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Niveau</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Slug</th>
                            <th className="w-36 py-3 px-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedList.map((c) => (
                            <tr
                                key={c.id ?? c.slug}
                                className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition"
                            >
                                <td className="py-3 px-4">
                                    <div className="w-10 h-10 rounded-xl bg-shark-accent/15 flex items-center justify-center">
                                        <Award className="w-5 h-5 text-shark-accent" />
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    {c.image ? (
                                        <div className="w-14 h-10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-700">
                                            <img src={c.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <span className="text-slate-400 text-xs">—</span>
                                    )}
                                </td>
                                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{c.title}</td>
                                <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{c.subtitle}</td>
                                <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{c.level ?? '—'}</td>
                                <td className="py-3 px-4 text-sm text-slate-500 dark:text-slate-400 font-mono">{c.slug}</td>
                                <td className="py-3 px-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <button
                                            type="button"
                                            onClick={() => navigate(`/dashboard/certifications/${c.slug}`)}
                                            className="p-2 rounded-lg text-slate-500 hover:text-shark-accent hover:bg-shark-accent/10 dark:hover:bg-shark-accent/20"
                                            title="Voir les détails"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => navigate(`/dashboard/certifications/edit/${c.slug}`)}
                                            className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-500/10 dark:hover:bg-blue-400/20"
                                            title="Modifier"
                                        >
                                            <Pencil className="w-5 h-5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(c)}
                                            className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-500/10 dark:hover:bg-red-400/20"
                                            title="Supprimer"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredList.length === 0 && (
                <p className="text-center text-slate-500 dark:text-slate-400 py-6">Aucun résultat pour « {search} ».</p>
            )}

            {filteredList.length > 0 && (
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            )}
        </div>
    )
}

export default CertificationsManage
