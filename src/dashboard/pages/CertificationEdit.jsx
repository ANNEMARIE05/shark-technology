import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { ArrowLeft, Cpu, Shield, Network, Server, Lock, Database, Plus, Trash2 } from 'lucide-react'
import { useDashboardStore } from '../store'

const ICON_OPTIONS = [
    { value: 'Cpu', label: 'Processeur (Cpu)', Icon: Cpu },
    { value: 'Shield', label: 'Bouclier (Sécurité)', Icon: Shield },
    { value: 'Network', label: 'Réseau', Icon: Network },
    { value: 'Server', label: 'Serveur', Icon: Server },
    { value: 'Lock', label: 'Cadenas', Icon: Lock },
    { value: 'Database', label: 'Base de données', Icon: Database },
]

const LEVEL_OPTIONS = [
    { value: 'Débutant', levelColor: 'bg-indigo-500/20 text-shark-fluid border-shark-fluid/30' },
    { value: 'Intermédiaire', levelColor: 'bg-blue-500/20 text-shark-accent border-shark-accent/30' },
    { value: 'Avancé', levelColor: 'bg-cyan-500/20 text-premium-neon border-premium-neon/30' },
    { value: 'Expert', levelColor: 'bg-red-500/20 text-red-600 border-red-500/30' },
]

function slugify(text) {
    return String(text)
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
}

const CertificationEdit = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const getStoredCertificationBySlug = useDashboardStore((s) => s.getStoredCertificationBySlug)
    const getCertificationBySlug = useDashboardStore((s) => s.getCertificationBySlug)
    const getIconKeyFromIcon = useDashboardStore((s) => s.getIconKeyFromIcon)
    const updateCertification = useDashboardStore((s) => s.updateCertification)
    const addCertification = useDashboardStore((s) => s.addCertification)
    const [form, setForm] = useState({
        id: '',
        slug: '',
        title: '',
        subtitle: '',
        description: '',
        image: '',
        iconKey: 'Cpu',
        iconImage: '',
        level: 'Intermédiaire',
        duration: '~40 heures',
        prerequis: '',
        objectives: [],
        programme: [],
    })
    const [errors, setErrors] = useState({})
    const [originalSlug, setOriginalSlug] = useState(null)
    const [loading, setLoading] = useState(true)

    const levelConfig = LEVEL_OPTIONS.find((o) => o.value === form.level) || LEVEL_OPTIONS[1]

    useEffect(() => {
        if (!slug) {
            navigate('/dashboard/certifications', { replace: true })
            return
        }
        const storedCert = getStoredCertificationBySlug(slug)
        if (storedCert) {
            setOriginalSlug(storedCert.slug)
            setForm({
                id: storedCert.id ?? '',
                slug: storedCert.slug ?? '',
                title: storedCert.title ?? '',
                subtitle: storedCert.subtitle ?? '',
                description: storedCert.description ?? '',
                image: storedCert.image ?? '',
                iconKey: storedCert.iconKey ?? 'Cpu',
                iconImage: storedCert.iconImage ?? '',
                level: storedCert.level ?? 'Intermédiaire',
                duration: storedCert.duration ?? '~40 heures',
                prerequis: storedCert.prerequis ?? '',
                objectives: Array.isArray(storedCert.objectives) ? [...storedCert.objectives] : [],
                programme: Array.isArray(storedCert.programme) ? [...storedCert.programme] : [],
            })
        } else {
            const baseCert = getCertificationBySlug(slug, 'fr')
            if (!baseCert) {
                navigate('/dashboard/certifications', { replace: true })
                return
            }
            setOriginalSlug(null)
            setForm({
                id: baseCert.id ?? '',
                slug: baseCert.slug ?? '',
                title: baseCert.title ?? '',
                subtitle: baseCert.subtitle ?? '',
                description: baseCert.description ?? '',
                image: baseCert.image ?? '',
                iconKey: baseCert.iconKey ?? getIconKeyFromIcon(baseCert.icon),
                iconImage: baseCert.iconImage ?? '',
                level: baseCert.level ?? 'Intermédiaire',
                duration: baseCert.duration ?? '~40 heures',
                prerequis: baseCert.prerequis ?? '',
                objectives: Array.isArray(baseCert.objectives) ? [...baseCert.objectives] : [],
                programme: Array.isArray(baseCert.programme) ? [...baseCert.programme] : [],
            })
        }
        setLoading(false)
    }, [slug, getStoredCertificationBySlug, getCertificationBySlug, getIconKeyFromIcon, navigate])

    const updateForm = (updates) => {
        setForm((prev) => ({ ...prev, ...updates }))
    }

    const validate = () => {
        const e = {}
        if (!form.title?.trim()) e.title = 'Le titre est requis'
        if (!form.subtitle?.trim()) e.subtitle = 'Le sous-titre est requis'
        if (!form.description?.trim()) e.description = 'La description est requise'
        if (!form.image?.trim()) e.image = "L'URL de l'image est requise"
        if (!form.id?.trim()) e.id = "L'identifiant certification est requis"
        if (!form.slug?.trim()) e.slug = 'Le slug est requis'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return
        const cert = {
            id: form.id.trim(),
            slug: form.slug.trim(),
            title: form.title.trim(),
            subtitle: form.subtitle.trim(),
            description: form.description.trim(),
            image: form.image.trim(),
            iconKey: form.iconImage?.trim() ? undefined : form.iconKey,
            iconImage: form.iconImage?.trim() || undefined,
            level: form.level,
            levelColor: levelConfig.levelColor,
            duration: form.duration?.trim() || '~40 heures',
            prerequis: form.prerequis?.trim() || 'À préciser.',
            aSavoir: '',
            debouches: [],
            modalite: '',
            stats: {},
            gallery: [],
            objectives: (form.objectives || []).map((s) => s?.trim()).filter(Boolean),
            programme: (form.programme || []).map((s) => s?.trim()).filter(Boolean),
        }
        if (originalSlug === null) {
            addCertification(cert)
        } else {
            updateCertification(originalSlug, cert)
        }
        navigate('/dashboard/certifications', { replace: true })
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
                    to="/dashboard/certifications"
                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white font-sora">Modifier la formation</h1>
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
                        placeholder="ex: Linux LPIC-1"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sous-titre *</label>
                    <input
                        type="text"
                        value={form.subtitle}
                        onChange={(e) => updateForm({ subtitle: e.target.value })}
                        placeholder="ex: Certification Linux Administrateur Système"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    {errors.subtitle && <p className="text-red-500 text-sm mt-1">{errors.subtitle}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description *</label>
                    <textarea
                        value={form.description}
                        onChange={(e) => updateForm({ description: e.target.value })}
                        placeholder="Courte description de la formation..."
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Identifiant certification *</label>
                        <input
                            type="text"
                            value={form.id}
                            onChange={(e) => updateForm({ id: e.target.value })}
                            placeholder="ex: CERT-07"
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                        {errors.id && <p className="text-red-500 text-sm mt-1">{errors.id}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Slug (URL) *</label>
                        <input
                            type="text"
                            value={form.slug}
                            onChange={(e) => updateForm({ slug: e.target.value })}
                            placeholder="ex: ma-formation"
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                        {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">URL de l'image *</label>
                    <input
                        type="url"
                        value={form.image}
                        onChange={(e) => updateForm({ image: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                    {form.image && (
                        <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 w-40 h-24">
                            <img src={form.image} alt="Aperçu" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none' }} />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Icône</label>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Choisir une icône prédéfinie ou ajouter une icône personnalisée (URL d’image).</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {ICON_OPTIONS.map(({ value, label, Icon }) => (
                            <button
                                key={value}
                                type="button"
                                onClick={() => updateForm({ iconKey: value, iconImage: '' })}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition ${
                                    !form.iconImage && form.iconKey === value
                                        ? 'border-shark-accent bg-shark-accent/15 text-shark-accent'
                                        : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-sm">{label.split(' ')[0]}</span>
                            </button>
                        ))}
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Ou icône personnalisée (URL)</label>
                        <input
                            type="url"
                            value={form.iconImage}
                            onChange={(e) => updateForm({ iconImage: e.target.value, iconKey: e.target.value?.trim() ? 'custom' : 'Cpu' })}
                            placeholder="https://exemple.com/mon-icone.png"
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                        />
                        {form.iconImage && (
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-xs text-slate-500">Aperçu :</span>
                                <div className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                                    <img src={form.iconImage} alt="" className="max-w-full max-h-full object-contain" onError={(e) => { e.target.style.display = 'none' }} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Objectifs</label>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Liste des objectifs pédagogiques (un par ligne).</p>
                    <div className="space-y-2">
                        {(form.objectives || []).map((item, i) => (
                            <div key={i} className="flex gap-2">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => {
                                        const next = [...(form.objectives || [])]
                                        next[i] = e.target.value
                                        updateForm({ objectives: next })
                                    }}
                                    placeholder={`Objectif ${i + 1}`}
                                    className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => updateForm({ objectives: (form.objectives || []).filter((_, j) => j !== i) })}
                                    className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-500/10 shrink-0"
                                    title="Supprimer"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => updateForm({ objectives: [...(form.objectives || []), ''] })}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-shark-accent hover:text-shark-accent text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Ajouter un objectif
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Programme</label>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Liste des points du programme (un par ligne).</p>
                    <div className="space-y-2">
                        {(form.programme || []).map((item, i) => (
                            <div key={i} className="flex gap-2">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => {
                                        const next = [...(form.programme || [])]
                                        next[i] = e.target.value
                                        updateForm({ programme: next })
                                    }}
                                    placeholder={`Point ${i + 1}`}
                                    className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => updateForm({ programme: (form.programme || []).filter((_, j) => j !== i) })}
                                    className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-500/10 shrink-0"
                                    title="Supprimer"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => updateForm({ programme: [...(form.programme || []), ''] })}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-shark-accent hover:text-shark-accent text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Ajouter un point au programme
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Niveau / Thème</label>
                    <div className="flex flex-wrap gap-2">
                        {LEVEL_OPTIONS.map(({ value, levelColor }) => (
                            <button
                                key={value}
                                type="button"
                                onClick={() => updateForm({ level: value })}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition ${form.level === value ? 'ring-2 ring-offset-2 ring-shark-accent ' : ''} ${levelColor}`}
                            >
                                {value}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Durée</label>
                        <input
                            type="text"
                            value={form.duration}
                            onChange={(e) => updateForm({ duration: e.target.value })}
                            placeholder="ex: ~40 heures"
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Prérequis</label>
                        <input
                            type="text"
                            value={form.prerequis}
                            onChange={(e) => updateForm({ prerequis: e.target.value })}
                            placeholder="ex: Aucun prérequis"
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-200 dark:border-slate-700 mt-2">
                    <button type="submit" className="px-5 py-2.5 rounded-xl bg-shark-accent text-white font-medium hover:bg-shark-accent/90">
                        Enregistrer
                    </button>
                    <Link to="/dashboard/certifications" className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium">
                        Annuler
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default CertificationEdit
