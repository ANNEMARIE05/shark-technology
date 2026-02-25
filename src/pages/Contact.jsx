import { motion } from 'framer-motion'
import { Send, MapPin, Phone, Mail, MessageCircle } from 'lucide-react'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'

const Contact = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-shark-deep dark:bg-slate-900"
        >
            {/* Header avec image comme les autres pages */}
            <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
                <PageHeader
                    tag="Entrons en contact"
                    title="Parlons de votre"
                    subtitle="Avenir."
                    image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                />
            </div>

            {/* Formulaire + Image en face */}
            <div className="max-w-7xl mx-auto px-6 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-shark-accent/10 flex items-center justify-center">
                                <MessageCircle className="text-shark-accent" size={22} />
                            </div>
                            <h2 className="text-xl font-bold font-sora text-slate-900">Envoyez-nous un message</h2>
                        </div>
                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()} noValidate>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 mb-2">Nom complet</label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        name="name"
                                        autoComplete="name"
                                        placeholder="Votre nom"
                                        maxLength={200}
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-shark-accent/30 focus:border-shark-accent transition-all"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        placeholder="votre@email.com"
                                        maxLength={254}
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-shark-accent/30 focus:border-shark-accent transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    rows={4}
                                    placeholder="Décrivez votre besoin ou posez votre question..."
                                    maxLength={5000}
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-shark-accent/30 focus:border-shark-accent transition-all resize-none"
                                />
                            </div>
                            <Button className="px-10 py-4 flex items-center gap-2">
                                Envoyer <Send size={18} />
                            </Button>
                        </form>
                    </motion.div>

                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="sticky top-28 rounded-3xl overflow-hidden border border-slate-200 shadow-lg shadow-slate-200/50">
                            <img
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800"
                                alt="Équipe Shark Technologys - Contact"
                                className="w-full h-[420px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Zone carte pleine largeur avec carte contact bien en bas à droite */}
            <section className="relative w-full min-h-[55vh] lg:min-h-[60vh]">
                {/* Carte en fond */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600"
                        alt="Carte Abidjan - Localisation Shark Technologys"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/5 pointer-events-none" />
                </div>

                {/* Indication zoom (optionnel, en bas à gauche) */}
                <p className="absolute bottom-4 left-4 z-10 text-xs text-slate-600 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-sm hidden sm:block">
                    Vous pouvez zoomer sur la carte à l'aide de Ctrl + molette.
                </p>

                {/* Carte d'information contact - bien en bas à droite */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 z-20 w-full max-w-sm"
                >
                    <div className="bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-700/50 overflow-hidden">
                        <div className="p-6 lg:p-8">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Adresse</h3>
                            <p className="text-white font-medium mb-1">Cocody Riviera 2, Rue D108</p>
                            <p className="text-slate-300 text-sm">Abidjan, Côte d'Ivoire</p>

                            <div className="mt-6 pt-6 border-t border-slate-700">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Contacts</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                        <Phone size={18} className="text-shark-accent shrink-0" />
                                        <a href="tel:+2250712624437" className="text-white hover:text-shark-accent transition-colors">+225 07 12 62 44 37</a>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Mail size={18} className="text-shark-accent shrink-0" />
                                        <a href="mailto:infos@sharktechnologys.ci" className="text-white hover:text-shark-accent transition-colors">infos@sharktechnologys.ci</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-6 flex gap-2">
                                <a
                                    href="https://www.google.com/maps/search/Cocody+Riviera+2+Rue+D108+Abidjan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                                >
                                    Agrandir le plan
                                </a>
                                <span className="text-slate-600">|</span>
                                <a
                                    href="https://www.google.com/maps/dir//Cocody+Riviera+2+Rue+D108+Abidjan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                                >
                                    Itinéraires
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </motion.div>
    )
}

export default Contact
