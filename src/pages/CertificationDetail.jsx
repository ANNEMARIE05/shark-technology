import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Clock, BookOpen, Target, ListChecks, Award } from 'lucide-react'
import Button from '../components/ui/Button'
import { getCertificationBySlug, certifications } from '../data/certifications'

const CertificationDetail = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const cert = getCertificationBySlug(slug)

    if (!cert) {
        return (
            <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <h1 className="text-2xl font-bold text-slate-800 mb-4">Certification introuvable</h1>
                <Button onClick={() => navigate('/formations')}>Retour aux formations</Button>
            </div>
        )
    }

    const Icon = cert.icon

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-0 pb-24 bg-slate-50 min-h-screen"
        >
            {/* Header grand : hero pleine hauteur, disposition soignée */}
            <motion.header
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative min-h-[85vh] flex flex-col justify-between overflow-hidden"
            >
                {/* Fond image + overlays (opacité forte pour lisibilité, comme header accueil) */}
                <div className="absolute inset-0">
                    <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover object-center scale-105"
                    />
                    {/* Couche sombre uniforme : assombrit l'image partout pour que le texte reste lisible */}
                    <div className="absolute inset-0 bg-slate-900/75" />
                    {/* Dégradé renforcé vers le bas pour zone texte encore plus lisible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/98 via-slate-900/88 to-slate-900/70" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(37,99,235,0.08),transparent_50%)]" />
                </div>

                {/* Zone haute : fil d'Ariane — fond légèrement opaque pour lisibilité */}
                <div className="relative z-10 flex justify-between items-center max-w-5xl mx-auto w-full px-6 pt-28 pb-4">
                    <motion.button
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                        onClick={() => navigate('/formations')}
                        className="inline-flex items-center gap-2 text-white font-medium text-sm transition-colors [text-shadow:0_1px_4px_rgba(0,0,0,0.8)]"
                    >
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/50 transition-colors">
                            <ChevronLeft size={16} />
                        </span>
                        <span className="hidden sm:inline">Retour aux formations</span>
                    </motion.button>
                    <span className="text-white/90 text-xs font-mono tracking-wider [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">{cert.id}</span>
                </div>

                {/* Zone basse : titre, sous-titre, icône — textes avec ombre pour contraste */}
                <div className="relative z-10 max-w-5xl mx-auto w-full px-6 pb-20 md:pb-28 pt-8">
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col md:flex-row md:items-end md:justify-between md:gap-12 gap-10"
                    >
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
                                <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border backdrop-blur-sm ${cert.levelColor}`}>
                                    {cert.level}
                                </span>
                                <span className="h-1 w-8 rounded-full bg-white/40 hidden sm:block" />
                                <span className="text-white/90 text-xs font-mono sm:hidden [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">{cert.id}</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-sora text-white leading-[1.08] tracking-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.7),0_0_40px_rgba(0,0,0,0.3)]">
                                {cert.title}
                            </h1>
                            <p className="text-slate-200 text-base sm:text-lg md:text-xl mt-5 md:mt-6 max-w-xl leading-relaxed [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]">
                                {cert.subtitle}
                            </p>
                            <p className="text-white text-sm sm:text-base mt-4 max-w-2xl leading-relaxed [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]">
                                {cert.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 mt-6 [text-shadow:0_1px_4px_rgba(0,0,0,0.8)]">
                                <span className="inline-flex items-center gap-2 text-white text-sm">
                                    <Clock size={18} className="text-white shrink-0" />
                                    <strong>Durée</strong> {cert.duration}
                                </span>
                                <span className="inline-flex items-center gap-2 text-white text-sm">
                                    <BookOpen size={18} className="text-white shrink-0" />
                                    <strong>Prérequis</strong> {cert.prerequis}
                                </span>
                            </div>
                        </div>
                        <div className="shrink-0 flex md:flex-col items-center gap-4 md:pb-1">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/25 shadow-xl">
                                <Icon className="text-white shrink-0" size={40} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.header>

            <div className="max-w-5xl mx-auto px-6 mt-12 md:mt-16 pt-8 md:pt-12 relative z-20">

                {/* Objectifs */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-16 mt-8 md:mt-12"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Target className="text-shark-accent" size={28} />
                        <h2 className="text-2xl font-black font-sora text-slate-900">Objectifs</h2>
                    </div>
                    <ul className="space-y-3">
                        {cert.objectives.map((obj, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.35 + i * 0.06 }}
                                className="flex items-start gap-3 text-slate-600"
                            >
                                <span className="w-2 h-2 rounded-full bg-shark-accent mt-2 shrink-0" />
                                <span>{obj}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.section>

                {/* Bloc images + infos */}
                <motion.section
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600"
                                alt="Formation pratique"
                                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                            />
                            <p className="p-4 text-sm text-slate-600 bg-white">Travaux pratiques en conditions réelles</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600"
                                alt="Travail en groupe"
                                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                            />
                            <p className="p-4 text-sm text-slate-600 bg-white">Échanges et entraide en groupe</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-br from-shark-accent/5 to-blue-50 p-6 flex flex-col justify-center"
                        >
                            <p className="text-4xl font-black font-sora text-shark-accent mb-1">180+</p>
                            <p className="text-slate-600 text-sm font-medium">pays reconnaissent cette certification</p>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Programme */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <ListChecks className="text-shark-accent" size={28} />
                        <h2 className="text-2xl font-black font-sora text-slate-900">Programme</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cert.programme.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ x: 4 }}
                                className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:border-shark-accent/30 transition-colors"
                            >
                                <span className="w-8 h-8 rounded-lg bg-shark-accent/10 text-shark-accent font-bold text-sm flex items-center justify-center">
                                    {i + 1}
                                </span>
                                <span className="text-slate-700 font-medium">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* À savoir */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 p-5 rounded-2xl bg-slate-100 border border-slate-200 flex items-start gap-4"
                >
                    <span className="text-2xl">💡</span>
                    <div>
                        <p className="font-bold font-sora text-slate-900 mb-1">À savoir</p>
                        <p className="text-slate-600 text-sm">Les sessions sont limitées en nombre de places pour garantir un suivi personnalisé. Inscription possible tout au long de l'année.</p>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-[40px] p-10 md:p-14 bg-gradient-to-br from-shark-accent to-blue-700 text-white text-center border border-shark-accent/20 shadow-xl"
                >
                    <Award className="mx-auto mb-4 text-white/90" size={48} />
                    <h2 className="text-2xl md:text-3xl font-black font-sora mb-3">
                        Prêt à passer cette certification ?
                    </h2>
                    <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                        Réservez un entretien pour discuter de votre projet et rejoindre la prochaine cohorte.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button
                            onClick={() => navigate('/contact')}
                            className="!bg-white !text-shark-accent hover:!bg-slate-100"
                        >
                            Réserver un entretien
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => navigate('/formations')}
                            className="!border-white !text-white hover:!bg-white/10"
                        >
                            Voir les autres formations
                        </Button>
                    </div>
                </motion.section>

                {/* Autres certifications */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20"
                >
                    <h2 className="text-xl font-bold font-sora text-slate-900 mb-4">Autres certifications</h2>
                    <div className="flex flex-wrap gap-3">
                        {certifications
                            .filter((c) => c.slug !== cert.slug)
                            .map((c, i) => (
                                <motion.button
                                    key={c.slug}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate(`/formations/${c.slug}`)}
                                    className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:border-shark-accent hover:text-shark-accent transition-colors"
                                >
                                    {c.title}
                                </motion.button>
                            ))}
                    </div>
                </motion.section>
            </div>
        </motion.div>
    )
}

export default CertificationDetail
