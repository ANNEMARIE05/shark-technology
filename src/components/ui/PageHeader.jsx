import { motion } from 'framer-motion'

const PageHeader = ({ title, subtitle, tag, image }) => {
    return (
        <div className="relative mb-6 sm:mb-8 md:mb-12 lg:mb-16 pt-0 md:pt-2 min-w-0">
            <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 md:gap-12">
                <div className="flex-grow w-full min-w-0">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 sm:gap-3 md:gap-4 text-shark-accent mb-3 sm:mb-4 md:mb-6"
                    >
                        <span className="h-px w-6 sm:w-8 md:w-12 bg-shark-accent shrink-0" />
                        <span className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] font-outfit truncate">{tag}</span>
                    </motion.div>

                    <div className="relative min-w-0">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-black font-sora leading-tight text-slate-900 dark:text-white break-words"
                        >
                            {title} <br />
                            <span className="fluid-text">{subtitle}</span>
                        </motion.h1>

                        <div className="absolute -top-4 -left-2 sm:-top-6 sm:-left-4 md:-top-10 md:-left-10 text-[50px] sm:text-[70px] md:text-[100px] lg:text-[130px] xl:text-[150px] font-black text-slate-300/40 pointer-events-none select-none whitespace-nowrap -z-10 uppercase overflow-hidden max-w-full">
                            {tag}
                        </div>
                    </div>
                </div>

                {image && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        className="relative hidden lg:block w-[450px] h-[300px]"
                    >
                        {/* Carte décorative : bordure bleue plus épaisse + inclinaison + animation légère */}
                        <motion.div
                            className="absolute inset-0 rounded-2xl border-4 border-shark-accent bg-transparent shadow-[0_0_24px_rgba(37,99,235,0.12)] -rotate-12"
                            aria-hidden
                            animate={{
                                boxShadow: [
                                    '0 0 24px rgba(37,99,235,0.12)',
                                    '0 0 32px rgba(37,99,235,0.18)',
                                    '0 0 24px rgba(37,99,235,0.12)',
                                ],
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        />

                        {/* Carte image : pas de bordure, plus penchée */}
                        <motion.div
                            className="absolute inset-0 rotate-[5deg] group/card"
                            whileHover={{ rotate: 7, scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-xl page-header-image">
                                <img src={image} alt={title} className="w-full h-full object-cover group-hover/card:scale-105 transition-all duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/25 to-transparent" />
                            </div>
                        </motion.div>

                        {/* Decorative glow */}
                        <div className="absolute -inset-4 bg-shark-accent/5 blur-3xl -z-10" />
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default PageHeader
