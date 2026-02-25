import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, ChevronLeft, Award, Users, BookOpen, Briefcase } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import Pagination from '../components/ui/Pagination'
import { certifications } from '../data/certifications.jsx'
import formationImg from '../assets/img/formation.jpeg'

const FORMATIONS_PER_PAGE = 6

const Courses = () => {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)

    const whyUs = [
        { icon: <Award className="text-shark-accent" size={28} />, title: "Certifications reconnues", desc: "Préparation aux certifications internationales (CompTIA, Cisco, Linux, Fortinet) reconnues par les employeurs." },
        { icon: <Users className="text-shark-accent" size={28} />, title: "Formateurs experts", desc: "Des professionnels en activité qui partagent leur expérience terrain et les bonnes pratiques du secteur." },
        { icon: <BookOpen className="text-shark-accent" size={28} />, title: "Pédagogie pratique", desc: "Théorie et travaux pratiques en lab pour maîtriser les outils et les environnements réels." },
        { icon: <Briefcase className="text-shark-accent" size={28} />, title: "Accompagnement carrière", desc: "Conseils et suivi pour valoriser vos compétences et viser les postes qui recrutent." },
    ]

    const keyFigures = [
        { value: "6+", label: "Certifications proposées" },
        { value: "95%", label: "Taux de satisfaction" },
        { value: "30+", label: "Partenaires technologiques" },
    ]

    const formations = certifications
    const totalPages = Math.max(1, Math.ceil(formations.length / FORMATIONS_PER_PAGE))
    const paginatedFormations = formations.slice((page - 1) * FORMATIONS_PER_PAGE, page * FORMATIONS_PER_PAGE)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-20 sm:pt-24 md:pt-28 pb-16 md:pb-24 bg-shark-deep dark:bg-slate-900 min-h-screen"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <PageHeader
                    tag="Nos Formations"
                    title="Forgez votre"
                    subtitle="Expertise."
                    image={formationImg}
                />

                {/* Intro */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-3xl mb-8 md:mb-16"
                >
                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-xl leading-relaxed">
                        Des formations intensives en cybersécurité, réseaux et systèmes pour tous les niveaux. 
                        Débutant ou déjà en poste, nos parcours certifiants vous permettent d'acquérir les compétences recherchées par les entreprises et d'évoluer dans l'IT.
                    </p>
                </motion.div>

                {/* Chiffres clés */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-10 md:mb-20"
                >
                    {keyFigures.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -4 }}
                            className="text-center p-3 sm:p-4 md:p-6 rounded-xl md:rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:border-shark-accent/30 dark:hover:border-sky-400/50 transition-colors"
                        >
                            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black font-sora text-shark-accent dark:text-sky-400 mb-0.5 md:mb-1">{item.value}</div>
                            <div className="text-[10px] sm:text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300 leading-tight">{item.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Pourquoi nos formations - section avec image */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 md:mb-24"
                >
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black font-sora text-slate-900 dark:text-white mb-3 md:mb-4">Pourquoi choisir nos formations ?</h2>
                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mb-8 md:mb-12 max-w-2xl">Une approche centrée sur la pratique et la certification pour une montée en compétences rapide et reconnue.</p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className="rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
                            <img
                                src={formationImg}
                                alt="Formations Shark Technologys - Cybersécurité et certifications"
                                className="w-full h-56 sm:h-72 md:h-80 object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            {whyUs.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                    className="p-4 sm:p-5 rounded-xl md:rounded-2xl bg-white border border-slate-200 hover:border-shark-accent/30 transition-colors"
                                >
                                    <div className="mb-2 md:mb-3">{item.icon}</div>
                                    <h3 className="font-bold font-sora text-slate-900 text-sm sm:text-base mb-1 md:mb-2">{item.title}</h3>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-black font-sora text-slate-900 dark:text-white mb-4 md:mb-8">Nos certifications</h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mb-6 md:mb-10 max-w-2xl">Parcourez les formations disponibles et trouvez celle qui correspond à votre niveau et à vos objectifs.</p>

                <div className="relative group/carousel">
                    <motion.div
                        className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-14 md:pb-20 no-scrollbar cursor-grab active:cursor-grabbing"
                        drag="x"
                        dragConstraints={{ right: 0, left: -1000 }}
                    >
                        {paginatedFormations.map((course, index) => {
                            const Icon = course.icon
                            return (
                                <motion.div
                                    key={course.slug}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => navigate(`/formations/${course.slug}`)}
                                    onKeyDown={(e) => e.key === 'Enter' && navigate(`/formations/${course.slug}`)}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -6, scale: 1.02 }}
                                    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="glass-card rounded-2xl md:rounded-[30px] overflow-hidden shrink-0 w-[260px] sm:w-[280px] md:w-[300px] group border border-slate-200 dark:border-slate-600 hover:border-shark-accent/30 dark:hover:border-sky-400/50 transition-all duration-500 cursor-pointer"
                                >
                                    {/* Image compacte */}
                                    <div className="h-36 sm:h-40 md:h-44 overflow-hidden relative">
                                        <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute top-4 left-4 flex items-center gap-2">
                                            <div className="w-8 h-8 bg-white/90 backdrop-blur-md rounded-lg flex items-center justify-center border border-slate-200">
                                                <Icon className="text-shark-accent" size={24} />
                                            </div>
                                            <span className="bg-white/90 backdrop-blur-md text-shark-accent px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-200">
                                                {course.level}
                                            </span>
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full border border-slate-200">
                                                {course.id}
                                            </span>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent" />
                                    </div>

                                    {/* Contenu compact */}
                                    <div className="p-4 sm:p-5 md:p-6">
                                        <h3 className="text-sm sm:text-base font-bold font-sora mb-1 md:mb-2 leading-snug text-slate-900 dark:text-white group-hover:text-shark-accent dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                                            {course.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-300 text-[11px] sm:text-xs font-light mb-3 md:mb-5 line-clamp-2">
                                            {course.subtitle}
                                        </p>
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-shark-accent dark:group-hover:text-sky-400 transition-colors flex items-center gap-2">
                                            Consulter <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>

                    {/* Navigation Hints : flèches pour indiquer le défilement */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 text-slate-500 dark:text-slate-400 pointer-events-none">
                        <motion.div
                            animate={{ x: [-4, 0, -4] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <ChevronLeft size={18} className="text-shark-accent" />
                        </motion.div>
                        <span className="text-[10px] uppercase tracking-widest font-bold">Glissez pour explorer</span>
                        <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <ChevronRight size={18} className="text-shark-accent" />
                        </motion.div>
                    </div>
                </div>

                    {totalPages > 1 && (
                        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                    )}

                {/* CTA Section */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 md:mt-24 lg:mt-32 glass-card p-6 sm:p-8 md:p-12 lg:p-20 rounded-2xl md:rounded-3xl lg:rounded-[60px] text-center border border-slate-200 dark:border-slate-600 border-shark-accent/20 dark:border-sky-400/20 bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-800/80 dark:to-slate-900/80 overflow-hidden relative"
                >
                    <div className="absolute inset-0 opacity-[0.06] -z-10">
                        <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200" alt="Cohort" className="w-full h-full object-cover" />
                    </div>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-black font-sora mb-4 md:mb-8 leading-tight text-slate-900 dark:text-white">
                            Prêt à rejoindre la prochaine <span className="fluid-text">Cohorte ?</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg mb-8 md:mb-12 font-light">
                            Nos sessions débutent chaque mois avec un nombre limité de places pour garantir un accompagnement personnalisé et une immersion totale.
                        </p>
                        <Button onClick={() => navigate('/reservation-entretien')}>Réserver un entretien</Button>
                    </div>
                </motion.div>
            </div>
        </motion.div >
    )
}

export default Courses
