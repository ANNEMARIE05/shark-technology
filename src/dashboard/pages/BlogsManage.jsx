import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { useDashboardStore } from '../store'
import Pagination from '../../components/ui/Pagination'

const PER_PAGE = 10

const searchIn = (q, ...strs) => {
    const lower = (q || '').toLowerCase().trim()
    if (!lower) return true
    return strs.some((s) => (s != null && String(s).toLowerCase().includes(lower)))
}

const BlogsManage = () => {
    const navigate = useNavigate()
    const getArticles = useDashboardStore((s) => s.getArticles)
    const setArticles = useDashboardStore((s) => s.setArticles)
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')

    const load = () => setList(getArticles().map((a, i) => ({ ...a, _id: a._id ?? a.slug ?? String(i) })))

    useEffect(() => {
        load()
    }, [getArticles])

    useEffect(() => {
        window.addEventListener('shark-dashboard-update', load)
        return () => window.removeEventListener('shark-dashboard-update', load)
    }, [getArticles])

    const filteredList = useMemo(() => {
        return list.filter((a) =>
            searchIn(search, a.title, a.slug, a.category, a.excerpt, a.author, a.content)
        )
    }, [list, search])

    useEffect(() => setPage(1), [search])

    const remove = (id) => {
        if (!confirm('Supprimer cet article ?')) return
        const next = list.filter((a) => (a._id ?? a.slug) !== id)
        setArticles(next)
        setList(next)
    }

    const totalPages = Math.max(1, Math.ceil(filteredList.length / PER_PAGE))
    const paginatedList = filteredList.slice((page - 1) * PER_PAGE, page * PER_PAGE)

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white font-sora">Articles blog</h1>
                <button
                    type="button"
                    onClick={() => navigate('/dashboard/blog/create')}
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
                    placeholder="Rechercher (titre, catégorie, auteur…)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-shark-accent focus:border-transparent"
                />
            </div>

            <div className="glass-card rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden overflow-x-auto">
                <table className="w-full min-w-[640px]">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300 w-14">Image</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Titre</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Catégorie</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Date</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300 max-w-[200px]">Extrait</th>
                            <th className="w-24 py-3 px-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="py-12 text-center text-slate-500 dark:text-slate-400">
                                    Aucun article. Cliquez sur « Ajouter » pour en créer un.
                                </td>
                            </tr>
                        ) : paginatedList.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="py-12 text-center text-slate-500 dark:text-slate-400">
                                    Aucun résultat pour « {search} ».
                                </td>
                            </tr>
                        ) : paginatedList.map((a) => (
                            <tr key={a._id ?? a.slug} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition">
                                <td className="py-3 px-4">
                                    {a.image ? (
                                        <img src={a.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                                    ) : (
                                        <span className="text-slate-400 text-xs">—</span>
                                    )}
                                </td>
                                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{a.title}</td>
                                <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{a.category || '—'}</td>
                                <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{a.date || '—'}</td>
                                <td className="py-3 px-4 text-sm text-slate-500 dark:text-slate-400 max-w-[200px] truncate">{a.excerpt || '—'}</td>
                                <td className="py-3 px-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <button
                                            type="button"
                                            onClick={() => navigate(`/dashboard/blog/edit/${a.slug || a._id}`)}
                                            className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-500/10 dark:hover:bg-blue-400/20"
                                            title="Modifier"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button type="button" onClick={() => remove(a._id ?? a.slug)} className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-500/10 dark:hover:bg-red-400/20" title="Supprimer">
                                            <Trash2 className="w-4 h-4" />
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

export default BlogsManage
