import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Pencil, Trash2, Clock, BookOpen, Award } from 'lucide-react'
import { useDashboardStore } from '../store'

const CertificationDetailDashboard = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const getCertificationBySlug = useDashboardStore((s) => s.getCertificationBySlug)
    const removeCertificationBySlug = useDashboardStore((s) => s.removeCertificationBySlug)
    const hideCertificationBySlug = useDashboardStore((s) => s.hideCertificationBySlug)
    const cert = slug ? getCertificationBySlug(slug, 'fr') : null

    const handleDelete = () => {
        if (!cert || !confirm(`Supprimer la formation « ${cert.title} » ?`)) return
        if (cert._fromStore) removeCertificationBySlug(cert.slug)
        else hideCertificationBySlug(cert.slug)
        navigate('/dashboard/certifications', { replace: true })
    }

    if (!cert) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <p className="text-slate-500 dark:text-slate-400 mb-4">Formation introuvable.</p>
                <Link to="/dashboard/certifications" className="text-shark-accent font-medium hover:underline">
                    Retour à la liste
                </Link>
            </div>
        )
    }

    return (
        <div>
            <div className="flex flex-wrap items-center gap-3 mb-6">
                <Link
                    to="/dashboard/certifications"
                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white font-sora truncate">{cert.title}</h1>
                    <p className="text-slate-600 dark:text-slate-400 text-sm truncate">{cert.subtitle}</p>
                </div>
                <button
                    type="button"
                    onClick={() => navigate(`/dashboard/certifications/edit/${cert.slug}`)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-shark-accent text-shark-accent font-medium hover:bg-shark-accent/10"
                >
                    <Pencil className="w-4 h-4" />
                    Modifier
                </button>
                <button
                    type="button"
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/50 text-red-600 dark:text-red-400 font-medium hover:bg-red-500/10"
                >
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                </button>
            </div>

            <div className="glass-card rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                {cert.image && (
                    <div className="h-48 sm:h-64 bg-slate-100 dark:bg-slate-800">
                        <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                    </div>
                )}
                <div className="p-6 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase ${cert.levelColor ?? 'bg-slate-200 dark:bg-slate-600'}`}>
                            {cert.level ?? '—'}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-mono">{cert.id}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-mono">{cert.slug}</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                        {cert.duration && (
                            <span className="flex items-center gap-1.5 text-sm">
                                <Clock className="w-4 h-4" />
                                {cert.duration}
                            </span>
                        )}
                        {cert.prerequis && (
                            <span className="flex items-center gap-1.5 text-sm">
                                <BookOpen className="w-4 h-4" />
                                {cert.prerequis}
                            </span>
                        )}
                    </div>

                    {cert.description && (
                        <div>
                            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2">
                                <Award className="w-4 h-4" />
                                Description
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{cert.description}</p>
                        </div>
                    )}

                    {cert.objectives?.length > 0 && (
                        <div>
                            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Objectifs</h2>
                            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 text-sm space-y-1">
                                {cert.objectives.map((obj, i) => (
                                    <li key={i}>{obj}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {cert.programme?.length > 0 && (
                        <div>
                            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Programme</h2>
                            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 text-sm space-y-1">
                                {cert.programme.map((p, i) => (
                                    <li key={i}>{p}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CertificationDetailDashboard
