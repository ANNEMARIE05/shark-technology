import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useDashboardStore } from '../store'
import Pagination from '../../components/ui/Pagination'

const PER_PAGE = 8

const BlogsManage = () => {
    const getArticles = useDashboardStore((s) => s.getArticles)
    const setArticles = useDashboardStore((s) => s.setArticles)
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState({
        slug: '', title: '', category: '', date: '', image: '', excerpt: '', featured: false, author: 'Shark Tech', content: '',
    })

    const load = () => setList(getArticles().map((a, i) => ({ ...a, _id: a._id ?? a.slug ?? String(i) })))

    useEffect(() => {
        load()
    }, [getArticles])

    useEffect(() => {
        window.addEventListener('shark-dashboard-update', load)
        return () => window.removeEventListener('shark-dashboard-update', load)
    }, [getArticles])

    const openNew = () => {
        setEditing('new')
        setForm({
            slug: '', title: '', category: '', date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }), image: '', excerpt: '', featured: false, author: 'Shark Tech', content: '',
        })
    }

    const openEdit = (a) => {
        setEditing(a._id ?? a.slug)
        setForm({
            slug: a.slug ?? '',
            title: a.title ?? '',
            category: a.category ?? '',
            date: a.date ?? '',
            image: a.image ?? '',
            excerpt: a.excerpt ?? '',
            featured: !!a.featured,
            author: a.author ?? 'Shark Tech',
            content: a.content ?? '',
        })
    }

    const save = () => {
        const item = {
            slug: form.slug || form.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || crypto.randomUUID(),
            title: form.title,
            category: form.category,
            date: form.date,
            image: form.image,
            excerpt: form.excerpt,
            featured: form.featured,
            author: form.author,
            content: form.content?.trim() ?? '',
        }
        if (editing === 'new') {
            const newList = [...list, { ...item, _id: item.slug }]
            setArticles(newList)
            setList(newList)
        } else {
            const next = list.map((a) => (a._id === editing || a.slug === editing ? { ...a, ...item, _id: item.slug } : a))
            setArticles(next)
            setList(next)
        }
        setEditing(null)
    }

    const remove = (id) => {
        if (!confirm('Supprimer cet article ?')) return
        const next = list.filter((a) => (a._id ?? a.slug) !== id)
        setArticles(next)
        setList(next)
        if (editing === id) setEditing(null)
    }

    const totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE))
    const paginatedList = list.slice((page - 1) * PER_PAGE, page * PER_PAGE)

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white font-sora">Articles blog</h1>
                <button
                    type="button"
                    onClick={openNew}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-shark-accent text-white font-medium hover:bg-shark-accent/90"
                >
                    <Plus className="w-5 h-5" />
                    Ajouter
                </button>
            </div>

            {editing && (
                <div className="glass-card rounded-xl p-6 mb-6 border border-slate-200 dark:border-slate-700 space-y-4 max-h-[70vh] overflow-y-auto">
                    <h2 className="font-semibold text-slate-900 dark:text-white">{editing === 'new' ? 'Nouvel article' : 'Modifier'}</h2>
                    <input type="text" placeholder="Slug (URL)" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                    <input type="text" placeholder="Titre" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                    <input type="text" placeholder="Catégorie" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                    <input type="text" placeholder="Date (ex: 24 Fév 2026)" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                    <input type="url" placeholder="URL image" value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                    <input type="text" placeholder="Extrait" value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                    <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} className="rounded" />
                        À la une
                    </label>
                    <textarea placeholder="Contenu (markdown ou texte)" value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} rows={6} className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                    <div className="flex gap-2">
                        <button type="button" onClick={save} className="px-4 py-2 rounded-lg bg-shark-accent text-white font-medium">Enregistrer</button>
                        <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300">Annuler</button>
                    </div>
                </div>
            )}

            <div className="space-y-3">
                {paginatedList.map((a) => (
                    <div key={a._id ?? a.slug} className="glass-card rounded-xl p-4 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
                        <div className="flex gap-4 min-w-0">
                            {a.image && <img src={a.image} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />}
                            <div className="min-w-0">
                                <p className="font-semibold text-slate-900 dark:text-white">{a.title}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{a.category} • {a.date}</p>
                                <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-1">{a.excerpt}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <button type="button" onClick={() => openEdit(a)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400">
                                <Pencil className="w-4 h-4" />
                            </button>
                            <button type="button" onClick={() => remove(a._id ?? a.slug)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
    )
}

export default BlogsManage
