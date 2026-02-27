import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { getPartners } from '../../data/partners'
import logoPrincipal from '../../assets/img/logo principale.png'

const Partners = () => {
    const { t } = useTranslation()
    const partners = getPartners()

    return (
        <section className="py-8 sm:py-12 md:py-20 lg:py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-800/60 border-y border-slate-200 dark:border-slate-700">
            <div className="absolute inset-0 bg-gradient-to-r from-shark-accent/3 via-transparent to-premium-neon/3 pointer-events-none" />

            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 md:mb-16 text-center min-w-0">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mb-3 sm:mb-4 md:mb-6"
                >
                    <img
                        src={logoPrincipal}
                        alt="Shark Technology"
                        className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                    />
                </motion.div>
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-shark-accent font-bold tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase text-[8px] sm:text-[9px] md:text-[10px] mb-2 sm:mb-3 md:mb-4 block"
                >
                    {t('partners.techPartners')}
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black font-sora text-slate-900 dark:text-white break-words px-1"
                >
                    {t('partners.alliance')} <span className="fluid-text">{t('partners.strategic')}</span>
                </motion.h2>
            </div>

            {/* CSS Infinite Marquee */}
            <div className="relative flex overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}>
                <style>{`
                    @keyframes marquee-scroll {
                        0%   { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .marquee-track {
                        display: flex;
                        width: max-content;
                        animation: marquee-scroll 30s linear infinite;
                    }
                    .marquee-track:hover {
                        animation-play-state: paused;
                    }
                `}</style>

                <div className="marquee-track flex" style={{ gap: 'clamp(0.75rem, 4vw, 1.5rem)' }}>
                    {/* First copy */}
                    {partners.map((partner, index) => (
                        <PartnerCard key={`a-${index}`} partner={partner} />
                    ))}
                    {/* Second copy — seamless loop */}
                    {partners.map((partner, index) => (
                        <PartnerCard key={`b-${index}`} partner={partner} />
                    ))}
                </div>
            </div>
        </section>
    )
}

const PartnerCard = ({ partner }) => (
    <div className="shrink-0 w-32 h-20 sm:w-40 sm:h-24 md:w-48 md:h-28 lg:w-52 lg:h-32 glass-card rounded-lg sm:rounded-xl md:rounded-2xl border border-black/5 hover:border-shark-accent/30 transition-all duration-500 group flex flex-col items-center justify-center gap-1 sm:gap-1.5 md:gap-3 p-2 sm:p-3 md:p-6 cursor-pointer hover:-translate-y-1 mx-1.5 sm:mx-2 md:mx-3 min-w-0">
        <div className="h-6 sm:h-8 md:h-10 flex items-center justify-center w-full">
            <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-6 sm:max-h-8 md:max-h-10 max-w-[70px] sm:max-w-[90px] md:max-w-[120px] object-contain opacity-40 group-hover:opacity-90 transition-all duration-500"
            />
        </div>
        <div className="text-center min-w-0 px-0.5">
            <div className="text-[8px] sm:text-[9px] md:text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors truncate max-w-full">
                {partner.name}
            </div>
            <div className="text-[7px] sm:text-[8px] md:text-[9px] text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors font-light line-clamp-2 break-words">
                {partner.desc}
            </div>
        </div>
    </div>
)

export default Partners
