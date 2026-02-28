import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useDashboardStore } from '../store'

const BlogEdit = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const getArticles = useDashboardStore((s) => s.getArticles)
    const setArticles = useDashboardStore((s) => s.setArticles)
    const [form, setForm] = useState({
        slug: '',
        title: '',
        category: '',
        date: '',
        image: '',
        excerpt: '',
        featured: false,
        author: 'Shark Tech',
        content: '',
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!slug) {
            navigate('/dashboard/blog', { replace: true })
            return
        }
        const list = getArticles()
        const article = list.find((a) => (a.slug || a._id) === slug)
        if (!article) {
            navigate('/dashboard/blog', { replace: true })
            return
        }
        setForm({
            slug: article.slug ?? article._id ?? '',
            title: article.title ?? '',
            category: article.category ?? '',
            date: article.date ?? '',
            image: article.image ?? '',
            excerpt: article.excerpt ?? '',
            featured: !!article.featured,
            author: article.author ?? 'Shark Tech',
            content: article.content ?? '',
        })
        setLoading(false)
    }, [slug, getArticles, navigate])

    const updateForm = (updates) => setForm((prev) => ({ ...prev, ...updates }))

    const validate = () => {
        const e = {}
        if (!form.title?.trim()) e.title = 'Le titre est requis'
        if (!form.slug?.trim()) e.slug = 'Le slug est requis'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate() || !slug) return
        const list = getArticles()
        const newSlug = form.slug.trim()
        const item = {
            slug: newSlug,
            _id: newSlug,
            title: form.title.trim(),
            category: form.category.trim() || '',
            date: form.date.trim() || '',
            image: form.image?.trim() || '',
            excerpt: form.excerpt?.trim() || '',
            featured: !!form.featured,
            author: form.author?.trim() || 'Shark Tech',
            content: form.content?.trim() ?? '',
        }
        const next = list.map((a) => ((a.slug || a._id) === slug ? item : a))
        setArticles(next)
        navigate('/dashboard/blog', { replace: true })
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <p className="text-slate-500 dark:text-slate-400">Chargement…</p>
            </div>
        )
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <Link
                    to="/dashboard/blog"
                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white font-sora">Modifier l'article</h1>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Modifiez les champs puis enregistrez.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 sm:p-8 md:p-10 border border-slate-200 dark:border-slate-700 space-y-6 max-w-4xl">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Titre *</label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => updateForm({ title: e.target.value })}
                        placeholder="Titre de l'article"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Slug (URL) *</label>
                    <input
                        type="text"
                        value={form.slug}
                        onChange={(e) => updateForm({ slug: e.target.value })}
                        placeholder="url-de-larticle"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm"
                    />
                    {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Catégorie</label>
                        <input
                            type="text"
                            value={form.category}
                            onChange={(e) => updateForm({ category: e.target.value })}
                            placeholder="ex: Technologie"
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
                        <input
                            type="text"
                            value={form.date}
                            onChange={(e) => updateForm({ date: e.target.value })}
                            placeholder="ex: 24 Fév 2026"
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">URL de l'image</label>
                    <input
                        type="url"
                        value={form.image}
                        onChange={(e) => updateForm({ image: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    {form.image && (
                        <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 w-40 h-24">
                            <img src={form.image} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none' }} />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Extrait</label>
                    <input
                        type="text"
                        value={form.excerpt}
                        onChange={(e) => updateForm({ excerpt: e.target.value })}
                        placeholder="Courte description pour la liste des articles"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Auteur</label>
                    <input
                        type="text"
                        value={form.author}
                        onChange={(e) => updateForm({ author: e.target.value })}
                        placeholder="Shark Tech"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white max-w-xs"
                    />
                </div>

                <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={(e) => updateForm({ featured: e.target.checked })}
                        className="rounded"
                    />
                    À la une
                </label>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contenu (markdown ou texte)</label>
                    <textarea
                        value={form.content}
                        onChange={(e) => updateForm({ content: e.target.value })}
                        placeholder="Contenu de l'article..."
                        rows={10}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm"
                    />
                </div>

                <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-200 dark:border-slate-700 mt-2">
                    <button type="submit" className="px-5 py-2.5 rounded-xl bg-shark-accent text-white font-medium hover:bg-shark-accent/90">
                        Enregistrer
                    </button>
                    <Link to="/dashboard/blog" className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium">
                        Annuler
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default BlogEdit
