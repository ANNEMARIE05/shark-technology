import { motion } from 'framer-motion'
import { Calendar, User, ArrowUpRight, Search, BookOpen } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'

const Blog = () => {
    const articles = [
        {
            title: "L'IA dans la Cybersécurité : Allié ou Menace ?",
            category: "Technologie",
            date: "24 Fév 2026",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
            excerpt: "Exploration des usages de l'intelligence artificielle pour renforcer la sécurité des systèmes.",
            featured: true
        },
        {
            title: "Top 5 des certifications IT en 2026",
            category: "Carrière",
            date: "20 Fév 2026",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600",
            excerpt: "Les certifications les plus demandées pour booster votre carrière.",
            featured: false
        },
        {
            title: "Sécuriser son Cloud : Les bonnes pratiques",
            category: "Cloud",
            date: "15 Fév 2026",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
            excerpt: "Checklist et recommandations pour un déploiement cloud sécurisé.",
            featured: false
        },
        {
            title: "Le guide du Pentesting pour débutants",
            category: "Sécurité",
            date: "10 Fév 2026",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600",
            excerpt: "Premiers pas en test d'intrusion : méthodologie et outils.",
            featured: false
        }
    ]

    const categories = ["Tous", "Technologie", "Carrière", "Cloud", "Sécurité"]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 pb-24 bg-slate-50 min-h-screen"
        >
            <div className="max-w-7xl mx-auto px-6">
                <PageHeader
                    tag="Le Mag Shark"
                    title="Journal d'un"
                    subtitle="Initié."
                    image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
                />

                {/* Intro + Recherche + Filtres */}
                <motion.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="mb-14"
                >
                    <p className="text-slate-600 text-lg max-w-2xl mb-8">
                        Actualités, tutoriels et retours d'expérience sur la cybersécurité, les réseaux et l'IT. 
                        Restez à jour avec les derniers articles de l'équipe Shark.
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Rechercher un article..."
                                className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-shark-accent/30 focus:border-shark-accent transition-all"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${cat === "Tous" ? "bg-shark-accent text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-shark-accent/50 hover:text-shark-accent"}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Article à la une */}
                <div className="mb-20">
                    {articles.filter(a => a.featured).map((post, i) => (
                        <motion.article
                            key={i}
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ scale: 1.005 }}
                            className="relative h-[400px] md:h-[440px] rounded-3xl overflow-hidden group border border-slate-200 shadow-lg shadow-slate-200/30 cursor-pointer"
                        >
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 max-w-3xl">
                                <div className="flex flex-wrap gap-3 mb-3">
                                    <span className="bg-shark-accent text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{post.category}</span>
                                    <span className="text-white/90 text-xs flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                                </div>
                                <h2 className="text-2xl md:text-4xl font-black font-sora mb-3 leading-tight text-white drop-shadow-lg [text-shadow:_0_2px_8px_rgba(0,0,0,0.5)]">
                                    {post.title}
                                </h2>
                                <p className="text-white/95 text-sm md:text-base mb-6 line-clamp-2 drop-shadow-md [text-shadow:_0_1px_4px_rgba(0,0,0,0.4)]">
                                    {post.excerpt}
                                </p>
                                <span className="inline-flex items-center gap-2 font-semibold text-sm text-white hover:text-shark-accent transition-colors group/btn drop-shadow [text-shadow:_0_1px_3px_rgba(0,0,0,0.5)]">
                                    Lire l'article <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </span>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Titre section */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-10"
                >
                    <BookOpen className="text-shark-accent" size={24} />
                    <h2 className="text-2xl font-black font-sora text-slate-900">Dernières publications</h2>
                </motion.div>

                {/* Grid articles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articles.filter(a => !a.featured).map((post, i) => (
                        <motion.article
                            key={i}
                            initial={{ y: 35, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, amount: 0.15 }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-shark-accent/30 hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 cursor-pointer relative"
                        >
                            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-shark-accent/10 rounded-tr-2xl group-hover:border-shark-accent/30 transition-colors z-10" />
                            <div className="h-52 overflow-hidden relative">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/95 text-shark-accent px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">{post.category}</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-4 mb-3 text-slate-500 text-xs">
                                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                                    <span className="flex items-center gap-1.5"><User size={12} /> Shark Tech</span>
                                </div>
                                <h3 className="text-lg font-bold font-sora mb-2 leading-snug text-slate-900 group-hover:text-shark-accent transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-shark-accent group-hover:gap-2 transition-all">
                                    Lire <ArrowUpRight size={14} />
                                </span>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default Blog
