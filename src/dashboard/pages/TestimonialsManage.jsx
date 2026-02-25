import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { getTestimonials, setTestimonials } from '../../data/testimonials'
import Pagination from '../../components/ui/Pagination'

const PER_PAGE = 8

const TestimonialsManage = () => {
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState({ name: '', role: '', text: '', avatar: '', stars: 5 })

    useEffect(() => {
        setList(getTestimonials().map((t) => ({ ...t, id: t.id || crypto.randomUUID() })))
    }, [])

    useEffect(() => {
        const onUpdate = () => setList(getTestimonials().map((t) => ({ ...t, id: t.id || crypto.randomUUID() })))
        window.addEventListener('shark-dashboard-update', onUpdate)
        return () => window.removeEventListener('shark-dashboard-update', onUpdate)
    }, [])

    const openNew = () => {
        setEditing('new')
        setForm({ name: '', role: '', text: '', avatar: '', stars: 5 })
    }

    const openEdit = (t) => {
        setEditing(t.id)
        setForm({ name: t.name, role: t.role, text: t.text, avatar: t.avatar || '', stars: t.stars ?? 5 })
    }

    const save = () => {
        if (editing === 'new') {
            const newItem = { ...form, id: crypto.randomUUID() }
            setTestimonials([...list, newItem])
            setList([...list, newItem])
        } else {
            const next = list.map((t) => (t.id === editing ? { ...t, ...form } : t))
            setTestimonials(next)
            setList(next)
        }
        setEditing(null)
    }

    const remove = (id) => {
        if (!confirm('Supprimer ce témoignage ?')) return
        const next = list.filter((t) => t.id !== id)
        setTestimonials(next)
        setList(next)
        if (editing === id) setEditing(null)
    }

    const totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE))
    const paginatedList = list.slice((page - 1) * PER_PAGE, page * PER_PAGE)

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white font-sora">Témoignages</h1>
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
                <div className="glass-card rounded-xl p-6 mb-6 border border-slate-200 dark:border-slate-700 space-y-4">
                    <h2 className="font-semibold text-slate-900 dark:text-white">{editing === 'new' ? 'Nouveau témoignage' : 'Modifier'}</h2>
                    <input
                        type="text"
                        placeholder="Nom"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <input
                        type="text"
                        placeholder="Fonction / rôle"
                        value={form.role}
                        onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <textarea
                        placeholder="Témoignage"
                        value={form.text}
                        onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <input
                        type="url"
                        placeholder="URL de l'avatar (image)"
                        value={form.avatar}
                        onChange={(e) => setForm((f) => ({ ...f, avatar: e.target.value }))}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <div className="flex gap-2">
                        <label className="text-slate-600 dark:text-slate-400">Étoiles :</label>
                        <select
                            value={form.stars}
                            onChange={(e) => setForm((f) => ({ ...f, stars: +e.target.value }))}
                            className="px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        >
                            {[1, 2, 3, 4, 5].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button type="button" onClick={save} className="px-4 py-2 rounded-lg bg-shark-accent text-white font-medium">Enregistrer</button>
                        <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300">Annuler</button>
                    </div>
                </div>
            )}

            <div className="space-y-3">
                {paginatedList.map((t) => (
                    <div
                        key={t.id}
                        className="glass-card rounded-xl p-4 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-4"
                    >
                        <div className="flex gap-4 min-w-0">
                            {t.avatar && (
                                <img src={t.avatar} alt="" className="w-12 h-12 rounded-full object-cover shrink-0" />
                            )}
                            <div className="min-w-0">
                                <p className="font-semibold text-slate-900 dark:text-white">{t.name}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{t.role}</p>
                                <p className="text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">{t.text}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <button type="button" onClick={() => openEdit(t)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400">
                                <Pencil className="w-4 h-4" />
                            </button>
                            <button type="button" onClick={() => remove(t.id)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600">
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

export default TestimonialsManage
