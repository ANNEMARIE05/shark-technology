import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { getPartners, setPartners } from '../../data/partners'
import Pagination from '../../components/ui/Pagination'

const PER_PAGE = 9

const PartnersManage = () => {
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState({ name: '', desc: 'Partenaire', logo: '' })

    const load = () => setList(getPartners().map((p) => ({ ...p, id: p.id || crypto.randomUUID() })))

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        window.addEventListener('shark-dashboard-update', load)
        return () => window.removeEventListener('shark-dashboard-update', load)
    }, [])

    const openNew = () => {
        setEditing('new')
        setForm({ name: '', desc: 'Partenaire', logo: '' })
    }

    const openEdit = (p) => {
        setEditing(p.id)
        setForm({ name: p.name, desc: p.desc || 'Partenaire', logo: typeof p.logo === 'string' ? p.logo : (p.logo?.src ?? '') })
    }

    const save = () => {
        if (editing === 'new') {
            const newItem = { ...form, id: crypto.randomUUID() }
            setPartners([...list, newItem])
            setList([...list, newItem])
        } else {
            const next = list.map((p) => (p.id === editing ? { ...p, ...form } : { ...p, logo: typeof p.logo === 'string' ? p.logo : p.logo?.src ?? '' }))
            setPartners(next.map((p) => ({ id: p.id, name: p.name, desc: p.desc || 'Partenaire', logo: typeof p.logo === 'string' ? p.logo : (p.logo?.src ?? '') })))
            setList(getPartners().map((p) => ({ ...p, id: p.id || crypto.randomUUID() })))
        }
        setEditing(null)
    }

    const remove = (id) => {
        if (!confirm('Supprimer ce partenaire ?')) return
        const next = list.filter((p) => p.id !== id)
        setPartners(next.map((p) => ({ id: p.id, name: p.name, desc: p.desc || 'Partenaire', logo: typeof p.logo === 'string' ? p.logo : (p.logo?.src ?? '') })))
        setList(next)
        if (editing === id) setEditing(null)
    }

    const logoUrl = (p) => (typeof p.logo === 'string' ? p.logo : p.logo?.src ?? '')
    const totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE))
    const paginatedList = list.slice((page - 1) * PER_PAGE, page * PER_PAGE)

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white font-sora">Partenaires</h1>
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
                    <h2 className="font-semibold text-slate-900 dark:text-white">{editing === 'new' ? 'Nouveau partenaire' : 'Modifier'}</h2>
                    <input
                        type="text"
                        placeholder="Nom"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <input
                        type="text"
                        placeholder="Description (ex: Partenaire)"
                        value={form.desc}
                        onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <input
                        type="url"
                        placeholder="URL du logo (ou laisser vide si partenaire par défaut)"
                        value={form.logo}
                        onChange={(e) => setForm((f) => ({ ...f, logo: e.target.value }))}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <div className="flex gap-2">
                        <button type="button" onClick={save} className="px-4 py-2 rounded-lg bg-shark-accent text-white font-medium">Enregistrer</button>
                        <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300">Annuler</button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedList.map((p) => (
                    <div
                        key={p.id}
                        className="glass-card rounded-xl p-4 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4"
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            {logoUrl(p) && (
                                <img src={logoUrl(p)} alt="" className="w-12 h-12 object-contain shrink-0" />
                            )}
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white">{p.name}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{p.desc}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <button type="button" onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400">
                                <Pencil className="w-5 h-5" />
                            </button>
                            <button type="button" onClick={() => remove(p.id)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
    )
}

export default PartnersManage
