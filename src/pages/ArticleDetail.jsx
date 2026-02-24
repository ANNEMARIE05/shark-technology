import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Calendar, User, ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button'
import { getArticleBySlug, articles } from '../data/articles'

const SAFE_SLUG_REGEX = /^[a-z0-9-]+$/

const ArticleDetail = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const safeSlug = typeof slug === 'string' && SAFE_SLUG_REGEX.test(slug) ? slug : null
    const article = safeSlug ? getArticleBySlug(safeSlug) : null

    if (!article) {
        return (
            <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <h1 className="text-2xl font-bold text-slate-800 mb-4">Article introuvable</h1>
                <Button onClick={() => navigate('/blog')}>Retour au blog</Button>
            </div>
        )
    }

    const others = articles.filter((a) => a.slug !== article.slug).slice(0, 3)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-28 pb-24 bg-slate-50 min-h-screen"
        >
            <article className="max-w-3xl mx-auto px-6">
                {/* Retour */}
                <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/blog')}
                    className="flex items-center gap-2 text-slate-600 hover:text-shark-accent font-medium mb-8 transition-colors"
                >
                    <ChevronLeft size={20} />
                    Retour au blog
                </motion.button>

                {/* En-tête */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-10"
                >
                    <span className="inline-block bg-shark-accent text-white px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest font-outfit mb-4">
                        {article.category}
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-sora text-slate-900 leading-tight mb-4">
                        {article.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm">
                        <span className="flex items-center gap-1.5">
                            <Calendar size={16} /> {article.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <User size={16} /> {article.author}
                        </span>
                    </div>
                </motion.header>

                {/* Image principale */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="rounded-2xl overflow-hidden border border-slate-200 mb-10 shadow-lg"
                >
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-64 sm:h-80 object-cover hover:scale-105 transition-transform duration-700"
                    />
                </motion.div>

                {/* Corps */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-slate prose-lg max-w-none font-outfit text-slate-700 leading-relaxed whitespace-pre-line"
                >
                    {article.content}
                </motion.div>

                {/* Encadré + image secondaire */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div className="p-6 rounded-2xl bg-shark-accent/5 border border-shark-accent/20">
                        <p className="text-xs font-bold uppercase tracking-wider text-shark-accent font-sora mb-2">Point clé</p>
                        <p className="text-slate-700 text-sm leading-relaxed">Retrouvez chaque semaine de nouveaux contenus sur le blog Shark pour rester à jour sur la cybersécurité et les réseaux.</p>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-slate-200">
                        <img
                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600"
                            alt="Shark Technology"
                            className="w-full h-40 object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </motion.div>

                {/* CTA + autres articles */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 pt-12 border-t border-slate-200"
                >
                    <Button
                        variant="outline"
                        onClick={() => navigate('/blog')}
                        className="mb-10"
                    >
                        <span className="flex items-center gap-2">
                            <ArrowLeft size={18} /> Tous les articles
                        </span>
                    </Button>
                    {others.length > 0 && (
                        <div>
                            <h2 className="text-lg font-bold font-sora text-slate-900 mb-4">Autres articles</h2>
                            <ul className="space-y-2">
                                {others.map((a, i) => (
                                    <motion.li
                                        key={a.slug}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08 }}
                                    >
                                        <button
                                            onClick={() => navigate(`/blog/${a.slug}`)}
                                            className="text-slate-600 hover:text-shark-accent font-medium text-left transition-colors"
                                        >
                                            {a.title}
                                        </button>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    )}
                </motion.div>
            </article>
        </motion.div>
    )
}

export default ArticleDetail
