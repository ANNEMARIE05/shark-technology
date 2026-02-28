import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getTestimonials, setTestimonials } from '../../data/testimonials'

const TestimonialCreate = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({ name: '', role: '', text: '', avatar: '', stars: 5 })
    const [errors, setErrors] = useState({})

    const validate = () => {
        const e = {}
        if (!form.name?.trim()) e.name = 'Le nom est requis'
        if (!form.text?.trim()) e.text = 'Le témoignage est requis'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return
        const list = getTestimonials()
        const newItem = {
            id: crypto.randomUUID(),
            name: form.name.trim(),
            role: form.role.trim() || '',
            text: form.text.trim(),
            avatar: form.avatar?.trim() || '',
            stars: Math.min(5, Math.max(1, Number(form.stars) || 5)),
        }
        setTestimonials([...list, newItem])
        navigate('/dashboard/temoignages', { replace: true })
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <Link
                    to="/dashboard/temoignages"
                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white font-sora">Nouveau témoignage</h1>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Renseignez les champs pour ajouter un témoignage.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 sm:p-8 md:p-10 border border-slate-200 dark:border-slate-700 space-y-6 max-w-4xl">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nom *</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="ex: Jean D."
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Fonction / Rôle</label>
                    <input
                        type="text"
                        value={form.role}
                        onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                        placeholder="ex: Responsable informatique"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Témoignage *</label>
                    <textarea
                        value={form.text}
                        onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                        placeholder="Texte du témoignage..."
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    {errors.text && <p className="text-red-500 text-sm mt-1">{errors.text}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">URL de l'avatar (image)</label>
                    <input
                        type="url"
                        value={form.avatar}
                        onChange={(e) => setForm((f) => ({ ...f, avatar: e.target.value }))}
                        placeholder="https://..."
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    {form.avatar && (
                        <div className="mt-2 flex items-center gap-3">
                            <span className="text-xs text-slate-500">Aperçu :</span>
                            <img src={form.avatar} alt="" className="w-14 h-14 rounded-full object-cover border border-slate-200 dark:border-slate-600" onError={(e) => { e.target.style.display = 'none' }} />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Étoiles (1 à 5)</label>
                    <select
                        value={form.stars}
                        onChange={(e) => setForm((f) => ({ ...f, stars: +e.target.value }))}
                        className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                        {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>{n} ★</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-200 dark:border-slate-700 mt-2">
                    <button type="submit" className="px-5 py-2.5 rounded-xl bg-shark-accent text-white font-medium hover:bg-shark-accent/90">
                        Créer le témoignage
                    </button>
                    <Link to="/dashboard/temoignages" className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium">
                        Annuler
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default TestimonialCreate
