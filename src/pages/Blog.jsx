import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Calendar, User, ArrowUpRight, Search, BookOpen, Minus } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import { articles } from '../data/articles'

const Blog = () => {
    const navigate = useNavigate()

    const categories = ["Tous", "Technologie", "Carrière", "Cloud", "Sécurité"]
    const featured = articles.find((a) => a.featured)
    const rest = articles.filter((a) => !a.featured)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-20 sm:pt-28 md:pt-32 pb-16 md:pb-28 bg-shark-deep dark:bg-slate-900 min-h-screen"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <PageHeader
                    tag="Le Mag Shark"
                    title="Journal d'un"
                    subtitle="Initié."
                    image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
                />

                {/* Intro chic : ligne + texte */}
                <motion.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8 mb-8 md:mb-16"
                >
                    <div className="flex items-center gap-4 md:gap-6">
                        <Minus className="text-shark-accent shrink-0" strokeWidth={2} size={24} />
                        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
                            Actualités, tutoriels et retours d'expérience sur la cybersécurité, les réseaux et l'IT.
                        </p>
                    </div>
                    <div className="md:ml-auto flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-full pl-12 pr-5 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-shark-accent/20 focus:border-shark-accent transition-all font-outfit"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all font-outfit ${cat === "Tous" ? "bg-shark-accent text-white shadow-[0_4px_14px_rgba(37,99,235,0.35)]" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-shark-accent/40 hover:text-shark-accent"}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Article à la une : bloc chic pleine largeur */}
                {featured && (
                    <motion.section
                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-12 md:mb-24"
                    >
                        <article
                            role="button"
                            tabIndex={0}
                            onClick={() => navigate(`/blog/${featured.slug}`)}
                            onKeyDown={(e) => e.key === 'Enter' && navigate(`/blog/${featured.slug}`)}
                            className="group relative rounded-[32px] overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-500 cursor-pointer"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[320px] sm:min-h-[380px] lg:min-h-[480px]">
                                <div className="relative h-56 sm:h-72 lg:h-full min-h-[240px] sm:min-h-[320px] overflow-hidden">
                                    <img
                                        src={featured.image}
                                        alt={featured.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-transparent to-transparent lg:from-transparent" />
                                    <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                                        <span className="bg-shark-accent text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] font-outfit">
                                            {featured.category}
                                        </span>
                                        <span className="text-white/90 text-xs flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                            <Calendar size={14} /> {featured.date}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center p-5 sm:p-8 md:p-10 lg:p-14">
                                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black font-sora text-slate-900 dark:text-white mb-3 md:mb-4 leading-tight">
                                        {featured.title}
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-5 md:mb-8">
                                        {featured.excerpt}
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-shark-accent font-bold text-sm uppercase tracking-wider group-hover:gap-3 transition-all font-outfit">
                                        Lire l'article <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </span>
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 w-24 h-24 border-t-2 border-l-2 border-shark-accent/10 rounded-tl-3xl pointer-events-none" />
                        </article>
                    </motion.section>
                )}

                {/* Séparateur élégant */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 md:gap-6 mb-8 md:mb-14"
                >
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-600 to-transparent" />
                    <div className="flex items-center gap-2 text-slate-400">
                        <BookOpen size={18} className="text-shark-accent shrink-0" />
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] font-outfit">Dernières publications</span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-600 to-transparent" />
                </motion.div>

                {/* Grille articles : cartes chic */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                    {rest.map((post, i) => (
                        <motion.article
                            key={post.slug}
                            role="button"
                            tabIndex={0}
                            onClick={() => navigate(`/blog/${post.slug}`)}
                            onKeyDown={(e) => e.key === 'Enter' && navigate(`/blog/${post.slug}`)}
                            initial={{ y: 35, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className="group group/card h-full flex flex-col bg-white dark:bg-slate-800 rounded-2xl md:rounded-[24px] overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-shark-accent/25 dark:hover:border-shark-accent/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-400 cursor-pointer"
                        >
                            <div className="relative h-44 sm:h-52 md:h-56 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-600 group-hover/card:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-400" />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-shark-accent text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest font-outfit shadow-md">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col flex-grow">
                                <div className="flex items-center gap-3 md:gap-4 text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs mb-2 md:mb-4 font-outfit">
                                    <span className="flex items-center gap-1.5"><Calendar size={11} /> {post.date}</span>
                                    <span className="flex items-center gap-1.5"><User size={11} /> Shark Tech</span>
                                </div>
                                <h3 className="text-base sm:text-lg md:text-xl font-bold font-sora text-slate-900 dark:text-white mb-2 md:mb-3 leading-snug group-hover/card:text-shark-accent transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-3 md:mb-5 line-clamp-2 flex-grow">
                                    {post.excerpt}
                                </p>
                                <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-shark-accent group-hover/card:gap-3 transition-all font-outfit mt-auto">
                                    Lire <ArrowUpRight size={14} className="group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform" />
                                </span>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Bas de page : invitation */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 md:mt-24 pt-10 md:pt-16 border-t border-slate-200 dark:border-slate-700 text-center"
                >
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-outfit max-w-lg mx-auto">
                        Restez à jour avec les derniers articles de l'équipe Shark. Nouveaux contenus chaque semaine.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Blog
