import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useSpring, useInView, useTransform } from 'framer-motion'
import { Shield, Cloud, Code, Users, Award, Zap, CheckCircle, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Partners from '../components/sections/Partners'
import { useLanguage } from '../contexts/LanguageContext'
import quiSommeNousImg from '../assets/img/qui somme nous.jpeg'

// Composant compteur animé chic
const AnimatedStat = ({ value, suffix }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const spring = useSpring(0, { stiffness: 60, damping: 20, mass: 1 })
    const display = useTransform(spring, (v) => Math.floor(v).toLocaleString())

    useEffect(() => {
        if (isInView) spring.set(value)
    }, [isInView, value, spring])

    return (
        <span ref={ref}>
            <motion.span>{display}</motion.span>{suffix}
        </span>
    )
}

const Home = () => {
    const navigate = useNavigate()
    const { t } = useLanguage()
    const [activeTestimonial, setActiveTestimonial] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))
        }, 6000)
        return () => clearInterval(interval)
    }, [])

    const testimonials = [
        {
            name: "ADAMA K.",
            role: "Responsable informatique",
            text: "Je cherchais une formation sérieuse en protection des infrastructures réseau. La formation proposée par Shark Technology m’a permis de comprendre les vulnérabilités, les techniques d’attaque et surtout comment y répondre efficacement.",
            avatar: "https://images.unsplash.com/photo-1542903660-f655848bb09a?auto=format&fit=crop&q=80&w=200",
            stars: 5
        },
        {
            name: "SYLVIA N.",
            role: "Administratrice Systèmes",
            text: "J’avais déjà un bagage en informatique, mais je voulais passer au niveau supérieur en hacking éthique. Le cursus 'Ethical Hacking' de Shark m’a donné les outils et la confiance nécessaires. Le suivi est rigoureux, le support toujours disponible — je recommande à tous ceux qui veulent faire carrière dans la cyber.",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
            stars: 5
        },
        {
            name: "MICHEL D.",
            role: "Ingénieur Réseau",
            text: "J’ai suivi la formation de sécurité cloud et aujourd’hui je suis expert cloud security certifié.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
            stars: 5
        }
    ]

    const expertises = [
        {
            id: "01",
            titleKey: "home.networkSecurity",
            descKey: "home.networkSecurityDesc",
            icon: <Shield className="text-shark-accent" size={32} />,
            image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "02",
            titleKey: "home.cloudSecurity",
            descKey: "home.cloudSecurityDesc",
            icon: <Cloud className="text-shark-accent" size={32} />,
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "03",
            titleKey: "home.appDev",
            descKey: "home.appDevDesc",
            icon: <Code className="text-shark-accent" size={32} />,
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
        }
    ]

    const stats = [
        { labelKey: "home.statsClients", value: 30, suffix: "" },
        { labelKey: "home.statsCerts", value: 30, suffix: "" },
        { labelKey: "home.statsExperts", value: 30, suffix: "+" },
        { labelKey: "home.statsProjects", value: 30, suffix: "" },
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
        >
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000"
                        alt="Cyber Background"
                        className="w-full h-full object-cover opacity-45 grayscale-[0.15]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/45 to-white/55 dark:from-slate-900/75 dark:via-slate-900/65 dark:to-slate-900/80" />
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-shark-accent/5 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-premium-neon/5 rounded-full blur-[120px] animate-pulse delay-700" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <span className="inline-block py-1 px-4 rounded-full bg-white/90 border border-slate-200/80 text-shark-accent text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                            {t('home.heroBadge')}
                        </span>
                        <h1 className="text-3xl sm:text-5xl md:text-8xl font-black font-sora mb-4 md:mb-8 leading-tight text-slate-900 drop-shadow-sm">
                            {t('home.heroTitle')} <span className="fluid-text">{t('home.heroTitleExpert')}</span> <br />
                            {t('home.heroTitleEnd')}
                        </h1>
                        <p className="text-slate-700 text-sm sm:text-base md:text-xl max-w-2xl mx-auto mb-6 md:mb-10 leading-relaxed font-light drop-shadow-sm">
                            {t('home.heroSubtitle')}
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <Button onClick={() => navigate('/formations')}>{t('home.ourFormations')}</Button>
                            <Button variant="outline" onClick={() => navigate('/contact')}>{t('home.contactUs')}</Button>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400"
                >
                    <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center pt-2">
                        <div className="w-1 h-2 bg-shark-accent rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* Expertise Section */}
            <section className="py-12 md:py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-shark-accent/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="max-w-7xl mx-auto px-6 relative">
                    <motion.h2
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="text-2xl sm:text-3xl md:text-4xl font-black font-sora text-slate-900 dark:text-white mb-3 md:mb-4 text-center md:text-left"
                    >
                        {t('home.ourExpertise')}
                    </motion.h2>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mb-8 md:mb-14 text-center md:text-left"
                    >
                        {t('home.expertiseSubtitle')}
                    </motion.p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                        {expertises.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                                className="glass-card rounded-2xl group hover:border-shark-accent/50 transition-all duration-500 overflow-hidden flex flex-col h-full relative cursor-pointer"
                            >
                                {/* Figures chics */}
                                <div className="absolute top-0 right-0 w-28 h-28 border-r-2 border-t-2 border-shark-accent/20 rounded-tr-2xl group-hover:border-shark-accent/50 transition-colors duration-500" />
                                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-premium-neon/20 rounded-bl-2xl group-hover:border-premium-neon/40 transition-colors duration-500" />
                                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-premium-neon/5 rounded-full blur-2xl group-hover:bg-shark-accent/10 transition-colors" />

                                <div className="h-36 sm:h-48 overflow-hidden relative shrink-0">
                                    <img src={item.image} alt={t(item.titleKey)} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent dark:from-slate-900/50 dark:to-transparent" />
                                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-3xl sm:text-5xl font-black font-sora text-slate-200 dark:text-slate-500 pointer-events-none group-hover:text-shark-accent/20 dark:group-hover:text-sky-400/40 transition-colors">
                                        {item.id}
                                    </div>
                                </div>
                                <div className="p-5 sm:p-6 md:p-8 flex-grow relative z-10">
                                    <div className="mb-4 md:mb-6 bg-shark-accent/10 dark:bg-shark-accent/20 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center group-hover:bg-shark-accent/20 dark:group-hover:bg-shark-accent/30 transition-all duration-500 text-shark-accent dark:text-sky-400 shadow-lg border border-slate-200 dark:border-slate-600 group-hover:scale-110 transform">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold font-sora mb-2 md:mb-3 text-slate-900 dark:text-white group-hover:text-shark-accent dark:group-hover:text-sky-400 transition-colors uppercase tracking-widest">{t(item.titleKey)}</h3>
                                    <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed text-xs sm:text-sm group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors">{t(item.descKey)}</p>

                                    {/* Line Figure */}
                                    <div className="mt-5 md:mt-8 h-0.5 w-12 bg-slate-200 dark:bg-slate-600 group-hover:w-full transition-all duration-700 bg-gradient-to-r from-shark-accent to-transparent dark:from-sky-400 dark:to-transparent" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Partners />

            {/* About Section — Design alternatif : image à gauche, contenu éditorial à droite */}
            <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-white dark:bg-slate-900">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,_#f8fafc_0%,_transparent_50%,_#f1f5f9_100%)] dark:bg-[linear-gradient(135deg,_#0f172a_0%,_#1e293b_50%,_#0f172a_100%)]" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-shark-accent/[0.04] dark:bg-shark-accent/[0.08] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-premium-neon/[0.04] dark:bg-premium-neon/[0.06] rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center relative">
                    {/* Colonne gauche : image */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-br from-shark-accent/10 to-premium-neon/10 rounded-[2rem] rotate-2" />
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/80 dark:shadow-black/30">
                                <img
                                    src={quiSommeNousImg}
                                    alt="Shark Technologys - Qui sommes nous"
                                    className="w-full aspect-[4/5] object-cover grayscale-[0.3] hover:grayscale-0 hover:scale-[1.02] transition-all duration-700 dark:brightness-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="absolute -right-4 lg:-right-6 bottom-1/4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl dark:shadow-xl dark:shadow-black/20 border border-slate-200/80 dark:border-slate-600 p-5 flex items-center gap-4"
                            >
                                <div className="w-14 h-14 rounded-xl bg-shark-accent/10 dark:bg-shark-accent/20 flex items-center justify-center shrink-0">
                                    <Zap className="text-shark-accent" size={28} />
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">{t('home.expertiseLabel')}</span>
                                    <span className="text-slate-900 dark:text-white font-bold font-sora">{t('home.fieldTraining')}</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Colonne droite : contenu */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="order-1 lg:order-2"
                    >
                        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.35em] text-shark-accent dark:text-sky-400 mb-4 md:mb-6">
                            {t('home.ourDna')}
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-[3.25rem] font-black font-sora leading-[1.1] text-slate-900 dark:text-white mb-5 md:mb-8">
                            {t('home.whoWeAre')}
                        </h2>
                        <p className="text-base sm:text-lg md:text-2xl font-bold text-shark-accent dark:text-sky-300 mb-8 md:mb-12 max-w-lg">
                            {t('home.becomeExpert')}
                        </p>

                        <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
                            <motion.div
                                whileHover={{ x: 4 }}
                                className="group flex gap-3 sm:gap-5 p-4 sm:p-6 rounded-2xl bg-slate-50/80 dark:bg-slate-800/90 border-l-4 border-shark-accent dark:border-sky-500/80 hover:bg-slate-100/80 dark:hover:bg-slate-700/90 hover:border-shark-accent dark:hover:border-sky-400 transition-all duration-300"
                            >
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 flex items-center justify-center shrink-0 group-hover:bg-shark-accent/10 dark:group-hover:bg-shark-accent/20 group-hover:border-shark-accent/30 dark:group-hover:border-shark-accent/40 transition-colors">
                                    <Award className="text-shark-accent" size={22} />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-base sm:text-lg font-bold font-sora text-slate-900 dark:text-white mb-0.5 md:mb-1">{t('home.qualityTrainers')}</h4>
                                    <p className="text-slate-600 dark:text-slate-300 font-light text-xs sm:text-sm leading-relaxed">
                                        {t('home.qualityTrainersDesc')}
                                    </p>
                                </div>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 4 }}
                                className="group flex gap-3 sm:gap-5 p-4 sm:p-6 rounded-2xl bg-slate-50/80 dark:bg-slate-800/90 border-l-4 border-premium-neon dark:border-cyan-400/80 hover:bg-slate-100/80 dark:hover:bg-slate-700/90 hover:border-premium-neon dark:hover:border-cyan-400 transition-all duration-300"
                            >
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 flex items-center justify-center shrink-0 group-hover:bg-premium-neon/10 dark:group-hover:bg-premium-neon/20 group-hover:border-premium-neon/30 dark:group-hover:border-cyan-400/40 transition-colors">
                                    <Users className="text-premium-neon" size={22} />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-base sm:text-lg font-bold font-sora text-slate-900 dark:text-white mb-0.5 md:mb-1">{t('home.engagedTrainers')}</h4>
                                    <p className="text-slate-600 dark:text-slate-300 font-light text-xs sm:text-sm leading-relaxed">
                                        {t('home.engagedTrainersDesc')}
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        <Button variant="outline" className="flex items-center gap-2 group" onClick={() => navigate('/contact')}>
                            {t('home.learnMore')} <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 md:py-24 border-y border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-shark-accent/5 via-transparent to-premium-neon/5 dark:from-shark-accent/10 dark:to-premium-neon/10 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                                className="text-center group relative"
                            >
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.12 + 0.2 }}
                                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-px bg-shark-accent origin-center"
                                />
                                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black font-sora text-slate-900 dark:text-white mb-2 md:mb-4 group-hover:text-shark-accent transition-colors duration-500 tabular-nums">
                                    <AnimatedStat value={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-slate-500 dark:text-slate-300 uppercase tracking-widest text-[9px] sm:text-[10px] font-bold font-outfit">
                                    {t(stat.labelKey)}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials XXL Section */}
            <section className="py-16 md:py-24 lg:py-40 relative overflow-hidden bg-white dark:bg-slate-900">
                {/* Background Geometric Figures */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-shark-accent/5 rounded-full blur-[120px] -mr-96 -mt-96" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-premium-neon/5 rounded-full blur-[100px] -ml-48 -mb-48" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-24 gap-6 md:gap-10">
                        <div className="max-w-2xl text-left">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="text-shark-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-3 md:mb-6 block"
                            >
                                {t('home.testimonialsLabel')}
                            </motion.span>
                            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black font-sora leading-tight text-slate-900">
                                {t('home.testimonialsTitle')} <br />
                                <span className="fluid-text text-xl sm:text-3xl md:text-5xl uppercase opacity-90">{t('home.testimonialsSubtitle')}</span>
                            </h2>
                        </div>
                        <div className="flex gap-3 md:gap-4">
                            <button
                                onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                                className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all group text-slate-700"
                            >
                                <ChevronRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                                className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-shark-accent text-white flex items-center justify-center hover:scale-105 transition-all shadow-xl shadow-shark-accent/20 group"
                            >
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile : 1 témoignage à la fois | Desktop : 2 côte à côte */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 h-full">
                        <AnimatePresence mode="wait">
                            {[0, 1].map((offset) => {
                                const index = (activeTestimonial + offset) % testimonials.length;
                                const item = testimonials[index];
                                return (
                                    <motion.div
                                        key={`${index}-${offset}`}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -30 }}
                                        transition={{ duration: 0.6, delay: offset * 0.1 }}
                                        className={`glass-card p-5 sm:p-6 md:p-12 rounded-2xl md:rounded-3xl relative overflow-hidden flex flex-col h-full border border-slate-200 hover:border-shark-accent/30 transition-all duration-500 group ${offset === 1 ? 'hidden lg:flex' : ''}`}
                                    >
                                        {/* Figure chic - barre verticale accent */}
                                        <div className="absolute left-0 top-8 bottom-8 md:top-12 md:bottom-12 w-1 bg-gradient-to-b from-transparent via-shark-accent/40 to-transparent rounded-r group-hover:via-shark-accent/70 transition-colors duration-500" />
                                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-shark-accent/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                                        <div className="flex gap-1 mb-4 md:mb-8">
                                            {[...Array(item.stars)].map((_, i) => (
                                                <span key={i} className="text-shark-accent text-sm md:text-lg">⭐</span>
                                            ))}
                                        </div>

                                        <p className="text-sm sm:text-base md:text-xl lg:text-2xl font-light italic leading-relaxed mb-6 md:mb-12 text-slate-700 flex-grow relative z-10">
                                            "{item.text}"
                                        </p>

                                        <div className="flex items-center gap-4 md:gap-6 border-t border-slate-200 pt-5 md:pt-8 mt-auto">
                                            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl overflow-hidden border border-slate-200 p-1 bg-slate-50 relative z-10 shrink-0">
                                                <img src={item.avatar} alt={item.name} className="w-full h-full object-cover rounded-lg md:rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="font-bold text-lg sm:text-xl md:text-2xl font-sora text-slate-900">{item.name}</div>
                                                <div className="text-shark-accent text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-black">{item.role}</div>
                                            </div>
                                        </div>

                                        {/* Floating Quotes Icon */}
                                        <div className="absolute top-10 right-10 text-8xl font-serif text-slate-200 pointer-events-none select-none">“</div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>


                </div>
            </section>
        </motion.div>
    )
}

export default Home
