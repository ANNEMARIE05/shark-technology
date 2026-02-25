import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, CreditCard, Award, HelpCircle, ChevronDown, MessageCircle, Headphones } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import { faqCategories } from '../data/faq'

const iconMap = {
    BookOpen,
    CreditCard,
    Award,
    HelpCircle,
}

const AccordionItem = ({ question, answer, isOpen, onToggle }) => (
    <motion.div
        initial={false}
        className="border border-slate-200 dark:border-slate-600 rounded-xl overflow-hidden bg-white dark:bg-slate-800/50"
    >
        <button
            type="button"
            onClick={onToggle}
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-sora font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-shark-accent/30"
            aria-expanded={isOpen}
        >
            <span className="pr-4">{question}</span>
            <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="shrink-0 w-8 h-8 rounded-lg bg-shark-accent/10 dark:bg-sky-400/20 flex items-center justify-center text-shark-accent dark:text-sky-400"
            >
                <ChevronDown size={18} />
            </motion.span>
        </button>
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                >
                    <div className="px-5 pb-4 pt-0">
                        <div className="pl-0 border-l-2 border-shark-accent/30 dark:border-sky-400/30 pl-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                            {answer}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
)

const Assistance = () => {
    const [openId, setOpenId] = useState(null)

    const toggle = (id) => {
        setOpenId((prev) => (prev === id ? null : id))
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-shark-deep dark:bg-slate-900"
        >
            <div className="max-w-7xl mx-auto px-6 pt-28 pb-12">
                <PageHeader
                    tag="Assistance"
                    title="FAQ &"
                    subtitle="Aide."
                    image="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800"
                />
            </div>

            <div className="max-w-4xl mx-auto px-6 pb-24">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-slate-600 dark:text-slate-400 text-center text-lg mb-14"
                >
                    Retrouvez les réponses aux questions les plus fréquentes. Vous ne trouvez pas ce que vous cherchez ?{' '}
                    <Link to="/contact" className="text-shark-accent dark:text-sky-400 font-semibold hover:underline">
                        Contactez-nous
                    </Link>
                    .
                </motion.p>

                {faqCategories.map((category, catIndex) => {
                    const Icon = iconMap[category.icon] || HelpCircle
                    return (
                        <motion.section
                            key={category.id}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + catIndex * 0.06 }}
                            className="mb-12"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 rounded-xl bg-shark-accent/10 dark:bg-sky-400/20 flex items-center justify-center text-shark-accent dark:text-sky-400">
                                    <Icon size={22} />
                                </div>
                                <h2 className="text-xl font-black font-sora text-slate-900 dark:text-white uppercase tracking-tight">
                                    {category.label}
                                </h2>
                            </div>
                            <div className="space-y-3">
                                {category.questions.map((item) => (
                                    <AccordionItem
                                        key={item.id}
                                        question={item.question}
                                        answer={item.answer}
                                        isOpen={openId === item.id}
                                        onToggle={() => toggle(item.id)}
                                    />
                                ))}
                            </div>
                        </motion.section>
                    )
                })}

                {/* CTA bloc chic */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 rounded-[28px] overflow-hidden border border-slate-200 dark:border-slate-600 shadow-xl"
                >
                    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 p-10 md:p-14">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(37,99,235,0.15),transparent_60%)]" />
                        <div className="absolute top-0 right-0 w-64 h-64 bg-shark-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                                    <Headphones className="text-white" size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black font-sora text-white mb-1">Besoin d'aide personnalisée ?</h3>
                                    <p className="text-slate-300 text-sm">
                                        Notre équipe est là pour répondre à vos questions et vous accompagner dans votre projet de formation.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-center gap-3 shrink-0">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center px-6 py-3 rounded-full font-bold bg-white text-slate-900 hover:bg-slate-100 transition-colors font-sora"
                                >
                                    <MessageCircle size={18} className="mr-2" />
                                    Nous contacter
                                </Link>
                                <a
                                    href="tel:+2250712624437"
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
                                >
                                    +225 07 12 62 44 37
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </motion.div>
    )
}

export default Assistance
