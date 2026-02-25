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
            <div className="pt-28 pb-20 min-h-screen flex flex-col items-center justify-center bg-shark-deep dark:bg-slate-900">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Article introuvable</h1>
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
            className="pt-24 pb-20 md:pt-28 md:pb-24 bg-shark-deep dark:bg-slate-900 min-h-screen"
        >
            <article className="w-full max-w-6xl xl:max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
                {/* Barre supérieure : Retour + métadonnées */}
                <motion.header
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 }}
                    className="mb-6"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <motion.button
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => navigate('/blog')}
                            className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-shark-accent font-medium transition-colors text-sm w-fit"
                        >
                            <ChevronLeft size={18} />
                            Retour au blog
                        </motion.button>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                            <span className="bg-shark-accent text-white px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest font-outfit">
                                {article.category}
                            </span>
                            <span className="hidden sm:inline text-slate-300 dark:text-slate-600">|</span>
                            <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                <Calendar size={15} className="shrink-0 opacity-80" />
                                {article.date}
                            </span>
                            <span className="text-slate-300 dark:text-slate-600">|</span>
                            <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                <User size={15} className="shrink-0 opacity-80" />
                                {article.author}
                            </span>
                        </div>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-sora text-slate-900 dark:text-white leading-[1.2] tracking-tight mt-5">
                        {article.title}
                    </h1>
                </motion.header>

                {/* Image principale */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 }}
                    className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-8 shadow-xl"
                >
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-72 sm:h-96 md:h-[28rem] object-cover hover:scale-[1.02] transition-transform duration-500"
                    />
                </motion.div>

                {/* Corps */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16 }}
                    className="prose prose-slate dark:prose-invert prose-lg md:prose-xl max-w-none font-outfit text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line prose-headings:font-sora prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:leading-[1.75] prose-p:my-4"
                >
                    {article.content}
                </motion.div>

                {/* Encadré + image secondaire */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div className="p-6 rounded-2xl bg-shark-accent/5 dark:bg-shark-accent/10 border border-shark-accent/20 dark:border-shark-accent/30 shadow-sm">
                        <p className="text-xs font-bold uppercase tracking-wider text-shark-accent font-sora mb-3">Point clé</p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">Retrouvez chaque semaine de nouveaux contenus sur le blog Shark pour rester à jour sur la cybersécurité et les réseaux.</p>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
                        <img
                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600"
                            alt="Shark Technology"
                            className="w-full h-44 md:h-52 object-cover hover:scale-[1.02] transition-transform duration-500"
                        />
                    </div>
                </motion.div>

                {/* CTA + autres articles */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-700"
                >
                    <Button
                        variant="outline"
                        onClick={() => navigate('/blog')}
                        className="mb-8"
                    >
                        <span className="flex items-center gap-2">
                            <ArrowLeft size={20} /> Tous les articles
                        </span>
                    </Button>
                    {others.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold font-sora text-slate-900 dark:text-white mb-5">Autres articles</h2>
                            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {others.map((a, i) => (
                                    <motion.li
                                        key={a.slug}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08 }}
                                    >
                                        <button
                                            onClick={() => navigate(`/blog/${a.slug}`)}
                                            className="w-full text-left p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-shark-accent/40 hover:bg-shark-accent/5 dark:hover:bg-shark-accent/10 transition-all duration-200 group"
                                        >
                                            <span className="text-slate-700 dark:text-slate-300 group-hover:text-shark-accent font-medium line-clamp-2 transition-colors">
                                                {a.title}
                                            </span>
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
