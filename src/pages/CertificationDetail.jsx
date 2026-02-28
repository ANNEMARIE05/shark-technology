import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Clock, BookOpen, Target, ListChecks, Award, Briefcase, FileCheck, Globe, TrendingUp, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import { useDashboardStore } from '../dashboard/store'

const SAFE_SLUG_REGEX = /^[a-z0-9-]+$/

const CertificationDetail = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()
    const getCertificationBySlug = useDashboardStore((s) => s.getCertificationBySlug)
    const lang = i18n.language === 'en' ? 'en' : 'fr'
    const safeSlug = typeof slug === 'string' && SAFE_SLUG_REGEX.test(slug) ? slug : null
    const cert = safeSlug ? getCertificationBySlug(safeSlug, lang) : null
    const certsList = useDashboardStore((s) => s.getCertifications(lang))

    if (!cert) {
        return (
            <div className="pt-28 pb-24 min-h-screen flex flex-col items-center justify-center bg-shark-deep dark:bg-slate-900">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">{t('certDetail.notFound')}</h1>
                <Button onClick={() => navigate('/formations')}>{t('certDetail.backToFormations')}</Button>
            </div>
        )
    }

    const Icon = cert.icon
    const hasCustomIcon = cert.iconImage
    const gallery = cert.gallery || []
    const stats = cert.stats || {}
    const aSavoir = cert.aSavoir || t('certDetail.defaultSavoir')
    const debouches = cert.debouches || []
    const modalite = cert.modalite || t('certDetail.defaultModalite')
    const [lightboxIndex, setLightboxIndex] = useState(null)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-0 pb-24 bg-shark-deep dark:bg-slate-900 min-h-screen"
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
                <div className="relative z-10 flex justify-between items-center max-w-5xl mx-auto w-full px-4 sm:px-6 pt-20 sm:pt-24 pb-4 min-w-0">
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
                        <span className="hidden sm:inline">{t('certDetail.backToFormations')}</span>
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
                                    <strong>{t('certDetail.duration')}</strong> {cert.duration}
                                </span>
                                <span className="inline-flex items-center gap-2 text-white text-sm">
                                    <BookOpen size={18} className="text-white shrink-0" />
                                    <strong>{t('certDetail.prerequisites')}</strong> {cert.prerequis}
                                </span>
                            </div>
                        </div>
                        <div className="shrink-0 flex md:flex-col items-center gap-4 md:pb-1">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/25 shadow-xl overflow-hidden">
                                {hasCustomIcon ? (
                                    <img src={cert.iconImage} alt="" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain" />
                                ) : (
                                    <Icon className="text-white shrink-0" size={40} />
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.header>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 md:mt-16 pt-6 md:pt-12 relative z-20">

                {/* Objectifs */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-10 md:mb-16 mt-6 md:mt-12"
                >
                    <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                        <Target className="text-shark-accent dark:text-sky-400" size={24} />
                        <h2 className="text-xl sm:text-2xl font-black font-sora text-slate-900 dark:text-white">{t('certDetail.objectives')}</h2>
                    </div>
                    <ul className="space-y-2 md:space-y-3">
                        {cert.objectives.map((obj, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.35 + i * 0.06 }}
                                className="flex items-start gap-2 md:gap-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base"
                            >
                                <span className="w-2 h-2 rounded-full bg-shark-accent mt-2 shrink-0" />
                                <span>{obj}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.section>

                {/* Stats rapides */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 md:mb-16"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                        {typeof stats.paysReconnus === 'number' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="rounded-xl md:rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 p-4 md:p-6 flex items-center gap-3 md:gap-4 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-shark-accent/10 dark:bg-sky-400/20 flex items-center justify-center shrink-0">
                                    <Globe className="text-shark-accent dark:text-sky-400" size={20} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-lg md:text-2xl font-black font-sora text-slate-900 dark:text-white">{stats.paysReconnus}+</p>
                                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">{t('certDetail.countriesRecognize')}</p>
                                </div>
                            </motion.div>
                        )}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.05 }}
                            className="rounded-xl md:rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 p-4 md:p-6 flex items-center gap-3 md:gap-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                                <TrendingUp className="text-emerald-600 dark:text-emerald-400" size={20} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-lg md:text-2xl font-black font-sora text-slate-900 dark:text-white">{stats.tauxReussite}</p>
                                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">{t('certDetail.successRate')}</p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="rounded-xl md:rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 p-4 md:p-6 flex items-center gap-3 md:gap-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                                <FileCheck className="text-amber-600 dark:text-amber-400" size={20} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-base md:text-lg font-black font-sora text-slate-900 dark:text-white">{stats.anneesValide}</p>
                                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">{t('certDetail.validity')}</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Galerie d'images */}
                {gallery.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5 }}
                        className="mb-10 md:mb-16"
                    >
                        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-shark-accent/10 dark:bg-sky-400/20 flex items-center justify-center">
                                <Target className="text-shark-accent dark:text-sky-400" size={18} />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-black font-sora text-slate-900 dark:text-white">{t('certDetail.inPictures')}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            {gallery.map((img, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-600 shadow-sm cursor-pointer"
                                    onClick={() => setLightboxIndex(i)}
                                >
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img
                                            src={img.src}
                                            alt={img.alt}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <p className="p-3 md:p-4 text-xs md:text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 font-medium">{img.caption}</p>
                                </motion.div>
                            ))}
                        </div>
                        {/* Lightbox */}
                        <AnimatePresence>
                            {lightboxIndex !== null && gallery[lightboxIndex] && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
                                    onClick={() => setLightboxIndex(null)}
                                >
                                    <button
                                        type="button"
                                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                                        onClick={() => setLightboxIndex(null)}
                                        aria-label={t('certDetail.close')}
                                    >
                                        <X size={24} />
                                    </button>
                                    <motion.img
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.9, opacity: 0 }}
                                        src={gallery[lightboxIndex].src}
                                        alt={gallery[lightboxIndex].alt}
                                        className="max-w-full max-h-[85vh] object-contain rounded-lg"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/90 text-sm">{gallery[lightboxIndex].caption}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.section>
                )}

                {/* Modalités */}
                <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="rounded-xl md:rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-600 p-4 md:p-6 flex items-start gap-3 md:gap-4">
                        <FileCheck className="text-shark-accent dark:text-sky-400 shrink-0 mt-0.5" size={20} />
                        <div className="min-w-0">
                            <h3 className="font-bold font-sora text-slate-900 dark:text-white text-sm md:text-base mb-1 md:mb-2">{t('certDetail.modalities')}</h3>
                            <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed">{modalite}</p>
                        </div>
                    </div>
                </motion.section>

                {/* Programme */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                        <ListChecks className="text-shark-accent dark:text-sky-400" size={24} />
                        <h2 className="text-xl sm:text-2xl font-black font-sora text-slate-900 dark:text-white">{t('certDetail.programme')}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {cert.programme.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ x: 4 }}
                                className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg md:rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:border-shark-accent/30 dark:hover:border-sky-400/50 transition-colors"
                            >
                                <span className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-shark-accent/10 dark:bg-sky-400/20 text-shark-accent dark:text-sky-400 font-bold text-xs md:text-sm flex items-center justify-center shrink-0">
                                    {i + 1}
                                </span>
                                <span className="text-slate-700 dark:text-slate-200 font-medium text-sm md:text-base">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Débouchés */}
                {debouches.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Briefcase className="text-shark-accent dark:text-sky-400" size={28} />
                            <h2 className="text-2xl font-black font-sora text-slate-900 dark:text-white">{t('certDetail.careerOutcomes')}</h2>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {debouches.map((job, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-medium text-sm shadow-sm hover:border-shark-accent/40 dark:hover:border-sky-400/40 hover:shadow-md transition-all"
                                >
                                    <span className="w-2 h-2 rounded-full bg-shark-accent dark:bg-sky-400" />
                                    {job}
                                </motion.span>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* À savoir */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 p-5 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 flex items-start gap-4"
                >
                    <span className="text-2xl shrink-0">💡</span>
                    <div>
                        <p className="font-bold font-sora text-slate-900 dark:text-white mb-1">{t('certDetail.keyTakeaway')}</p>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{aSavoir}</p>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-[40px] p-10 md:p-14 text-white text-center border border-shark-accent/20 shadow-xl overflow-hidden"
                >
                    {/* Image de fond Unsplash */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"
                            alt=""
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-shark-accent/95 via-blue-700/90 to-blue-800/95" />
                    </div>
                    <div className="relative z-10">
                        <Award className="mx-auto mb-4 text-white/90" size={48} />
                        <h2 className="text-2xl md:text-3xl font-black font-sora mb-3">
                            {t('certDetail.ctaTitle')}
                        </h2>
                        <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                            {t('certDetail.ctaDesc')}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                onClick={() => navigate('/reservation-entretien')}
                                className="!bg-white !text-shark-accent hover:!bg-slate-100"
                            >
                                {t('certDetail.ctaBook')}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate('/formations')}
                                className="!border-white !text-white hover:!bg-white/10"
                            >
                                {t('certDetail.ctaViewOther')}
                            </Button>
                        </div>
                    </div>
                </motion.section>

                {/* Autres certifications */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20"
                >
                    <h2 className="text-xl font-bold font-sora text-slate-900 dark:text-white mb-4">{t('certDetail.otherCerts')}</h2>
                    <div className="flex flex-wrap gap-3">
                        {certsList
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
