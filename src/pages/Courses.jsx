import { motion } from 'framer-motion'
import { Shield, Network, Server, Lock, Cpu, Database, ChevronRight, Award, Users, BookOpen, Briefcase } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'

const Courses = () => {
    const navigate = useNavigate()

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

    const formations = [
        {
            id: "CERT-01",
            title: "Linux LPIC-1",
            subtitle: "Certification Linux Administrateur Système",
            icon: <Cpu className="text-shark-accent" />,
            color: "from-blue-500/20 to-shark-accent/20",
            level: "Intermédiaire",
            image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "CERT-02",
            title: "CompTIA Security+ SYO-601",
            subtitle: "La référence mondiale en cybersécurité",
            icon: <Shield className="text-premium-neon" />,
            color: "from-cyan-500/20 to-premium-neon/20",
            level: "Avancé",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "CERT-03",
            title: "CCNA",
            subtitle: "Cisco Certified Network Associate",
            icon: <Network className="text-shark-accent" />,
            color: "from-blue-600/20 to-shark-fluid/20",
            level: "Intermédiaire",
            image: "https://images.unsplash.com/photo-1551708501-137bc3947477?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "CERT-04",
            title: "Sécurité réseaux N+",
            subtitle: "Fondamentaux des réseaux et cybersécurité",
            icon: <Server className="text-shark-fluid" />,
            color: "from-indigo-500/20 to-shark-light/20",
            level: "Débutant",
            image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "CERT-05",
            title: "Ethical Hacking",
            subtitle: "Maîtrisez les techniques d'intrusion (Pentest)",
            icon: <Lock className="text-red-500" />,
            color: "from-red-500/10 to-transparent",
            level: "Expert",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "CERT-06",
            title: "Fortinet NSE 4",
            subtitle: "Sécurisation des périmètres avec Fortigate",
            icon: <Database className="text-orange-400" />,
            color: "from-orange-500/20 to-shark-dark/20",
            level: "Avancé",
            image: "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&q=80&w=800"
        }
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 pb-24 bg-slate-50 min-h-screen"
        >
            <div className="max-w-7xl mx-auto px-6">
                <PageHeader
                    tag="Nos Formations"
                    title="Forgez votre"
                    subtitle="Expertise."
                    image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
                />

                {/* Intro */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-3xl mb-16"
                >
                    <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
                        Des formations intensives en cybersécurité, réseaux et systèmes pour tous les niveaux. 
                        Débutant ou déjà en poste, nos parcours certifiants vous permettent d’acquérir les compétences recherchées par les entreprises et d’évoluer dans l’IT.
                    </p>
                </motion.div>

                {/* Chiffres clés */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-3 gap-6 mb-20"
                >
                    {keyFigures.map((item, i) => (
                        <div key={i} className="text-center p-6 rounded-2xl bg-white border border-slate-200">
                            <div className="text-3xl md:text-4xl font-black font-sora text-shark-accent mb-1">{item.value}</div>
                            <div className="text-sm font-medium text-slate-600">{item.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Pourquoi nos formations - section avec image */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <h2 className="text-2xl md:text-3xl font-black font-sora text-slate-900 mb-4">Pourquoi choisir nos formations ?</h2>
                    <p className="text-slate-600 mb-12 max-w-2xl">Une approche centrée sur la pratique et la certification pour une montée en compétences rapide et reconnue.</p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                                alt="Formation en groupe"
                                className="w-full h-72 md:h-80 object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {whyUs.map((item, i) => (
                                <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-shark-accent/30 transition-colors">
                                    <div className="mb-3">{item.icon}</div>
                                    <h3 className="font-bold font-sora text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                <h2 className="text-2xl md:text-3xl font-black font-sora text-slate-900 mb-8">Nos certifications</h2>
                <p className="text-slate-600 mb-10 max-w-2xl">Parcourez les formations disponibles et trouvez celle qui correspond à votre niveau et à vos objectifs.</p>

                <div className="relative group/carousel">
                    <motion.div
                        className="flex gap-8 overflow-x-auto pb-20 no-scrollbar cursor-grab active:cursor-grabbing"
                        drag="x"
                        dragConstraints={{ right: 0, left: -1000 }} // Ajuster selon le nombre d'items
                    >
                        {formations.map((course, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="glass-card rounded-[30px] overflow-hidden shrink-0 w-[300px] group border border-slate-200 hover:border-shark-accent/30 transition-all duration-500 cursor-pointer"
                            >
                                {/* Image compacte */}
                                <div className="h-44 overflow-hidden relative">
                                    <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute top-4 left-4 flex items-center gap-2">
                                        <div className="w-8 h-8 bg-white/90 backdrop-blur-md rounded-lg flex items-center justify-center border border-slate-200">
                                            {course.icon}
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
                                <div className="p-6">
                                    <h3 className="text-base font-bold font-sora mb-2 leading-snug text-slate-900 group-hover:text-shark-accent transition-colors line-clamp-2">
                                        {course.title}
                                    </h3>
                                    <p className="text-slate-600 text-xs font-light mb-5 line-clamp-2">
                                        {course.subtitle}
                                    </p>
                                    <button className="text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-shark-accent transition-colors flex items-center gap-2">
                                        Consulter <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Navigation Hints */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 text-slate-500 pointer-events-none">
                        <span className="text-[10px] uppercase tracking-widest font-bold">Glissez pour explorer</span>
                        <div className="w-12 h-px bg-slate-300" />
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <ChevronRight size={16} />
                        </motion.div>
                    </div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 glass-card p-12 md:p-20 rounded-[60px] text-center border border-slate-200 border-shark-accent/20 bg-gradient-to-b from-white to-slate-50/50 overflow-hidden relative"
                >
                    <div className="absolute inset-0 opacity-[0.06] -z-10">
                        <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200" alt="Cohort" className="w-full h-full object-cover" />
                    </div>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-black font-sora mb-8 leading-tight text-slate-900">
                            Prêt à rejoindre la prochaine <span className="fluid-text">Cohorte ?</span>
                        </h2>
                        <p className="text-slate-600 text-lg mb-12 font-light">
                            Nos sessions débutent chaque mois avec un nombre limité de places pour garantir un accompagnement personnalisé et une immersion totale.
                        </p>
                        <Button onClick={() => navigate('/contact')}>Réserver un entretien</Button>
                    </div>
                </motion.div>
            </div>
        </motion.div >
    )
}

export default Courses
