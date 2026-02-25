import { useState } from 'react'
import { certifications } from '../../data/certifications'
import { Award } from 'lucide-react'
import { Link } from 'react-router-dom'
import Pagination from '../../components/ui/Pagination'

const PER_PAGE = 6

const CertificationsManage = () => {
    const [page, setPage] = useState(1)
    const totalPages = Math.max(1, Math.ceil(certifications.length / PER_PAGE))
    const paginated = certifications.slice((page - 1) * PER_PAGE, page * PER_PAGE)

    return (
        <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white font-sora mb-2">Formations / Certifications</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
                Les certifications sont définies dans <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">src/data/certifications.jsx</code>.
                Consultez la liste ci-dessous et ouvrez chaque formation sur le site.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginated.map((c) => (
                    <div
                        key={c.id}
                        className="glass-card rounded-xl p-5 border border-slate-200 dark:border-slate-700 flex items-start gap-4"
                    >
                        <div className="w-12 h-12 rounded-xl bg-shark-accent/15 flex items-center justify-center shrink-0">
                            <Award className="w-6 h-6 text-shark-accent" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="font-bold text-slate-900 dark:text-white">{c.title}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{c.subtitle}</p>
                            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 line-clamp-2">{c.description}</p>
                            <Link
                                to={`/formations/${c.slug}`}
                                className="inline-block mt-2 text-sm font-medium text-shark-accent hover:underline"
                            >
                                Voir sur le site →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
    )
}

export default CertificationsManage
