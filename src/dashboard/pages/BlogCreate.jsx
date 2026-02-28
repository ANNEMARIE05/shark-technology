import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useDashboardStore } from '../store'

function slugFromTitle(title) {
    return String(title || '').toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || ''
}

const BlogCreate = () => {
    const navigate = useNavigate()
    const getArticles = useDashboardStore((s) => s.getArticles)
    const setArticles = useDashboardStore((s) => s.setArticles)
    const [form, setForm] = useState({
        slug: '',
        title: '',
        category: '',
        date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
        image: '',
        excerpt: '',
        featured: false,
        author: 'Shark Tech',
        content: '',
    })
    const [errors, setErrors] = useState({})

    const updateForm = (updates) => {
        setForm((prev) => {
            const next = { ...prev, ...updates }
            if (updates.title !== undefined && !form.slug) next.slug = slugFromTitle(next.title)
            return next
        })
    }

    const validate = () => {
        const e = {}
        if (!form.title?.trim()) e.title = 'Le titre est requis'
        if (!form.slug?.trim()) e.slug = 'Le slug est requis'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return
        const list = getArticles()
        const slug = form.slug.trim() || slugFromTitle(form.title)
        const item = {
            slug,
            _id: slug,
            title: form.title.trim(),
            category: form.category.trim() || '',
            date: form.date.trim() || new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
            image: form.image?.trim() || '',
            excerpt: form.excerpt?.trim() || '',
            featured: !!form.featured,
            author: form.author?.trim() || 'Shark Tech',
            content: form.content?.trim() ?? '',
        }
        setArticles([...list, item])
        navigate('/dashboard/blog', { replace: true })
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <Link to="/dashboard/blog" className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white font-sora">Nouvel article</h1>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Renseignez les champs pour publier un article sur le blog.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 sm:p-8 md:p-10 border border-slate-200 dark:border-slate-700 space-y-6 max-w-4xl">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Titre *</label>
                    <input type="text" value={form.title} onChange={(e) => updateForm({ title: e.target.value })} placeholder="Titre de l'article" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Slug (URL) *</label>
                    <input type="text" value={form.slug} onChange={(e) => updateForm({ slug: e.target.value })} placeholder="url-de-larticle" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm" />
                    {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Catégorie</label>
                        <input type="text" value={form.category} onChange={(e) => updateForm({ category: e.target.value })} placeholder="ex: Technologie" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
                        <input type="text" value={form.date} onChange={(e) => updateForm({ date: e.target.value })} placeholder="ex: 24 Fév 2026" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">URL de l'image</label>
                    <input type="url" value={form.image} onChange={(e) => updateForm({ image: e.target.value })} placeholder="https://..." className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                    {form.image && <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 w-40 h-24"><img src={form.image} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none' }} /></div>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Extrait</label>
                    <input type="text" value={form.excerpt} onChange={(e) => updateForm({ excerpt: e.target.value })} placeholder="Courte description pour la liste" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Auteur</label>
                    <input type="text" value={form.author} onChange={(e) => updateForm({ author: e.target.value })} placeholder="Shark Tech" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white max-w-xs" />
                </div>
                <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input type="checkbox" checked={form.featured} onChange={(e) => updateForm({ featured: e.target.checked })} className="rounded" />
                    À la une
                </label>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contenu (markdown ou texte)</label>
                    <textarea value={form.content} onChange={(e) => updateForm({ content: e.target.value })} placeholder="Contenu de l'article..." rows={10} className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm" />
                </div>
                <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-200 dark:border-slate-700 mt-2">
                    <button type="submit" className="px-5 py-2.5 rounded-xl bg-shark-accent text-white font-medium hover:bg-shark-accent/90">Créer l'article</button>
                    <Link to="/dashboard/blog" className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium">Annuler</Link>
                </div>
            </form>
        </div>
    )
}

export default BlogCreate
