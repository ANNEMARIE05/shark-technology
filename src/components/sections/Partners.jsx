import { motion } from 'framer-motion'
import adviceLogo from '../../assets/img/partenaires/advice.png'
import burgeapLogo from '../../assets/img/partenaires/burgeap.png'
import gnaLogo from '../../assets/img/partenaires/gna.png'
import nidLogo from '../../assets/img/partenaires/nid.png'
import terraLogo from '../../assets/img/partenaires/terra.png'

const Partners = () => {
    const partners = [
        { name: "Advice", desc: "Partenaire", logo: adviceLogo },
        { name: "Burgeap", desc: "Partenaire", logo: burgeapLogo },
        { name: "GNA", desc: "Partenaire", logo: gnaLogo },
        { name: "NID", desc: "Partenaire", logo: nidLogo },
        { name: "Terra", desc: "Partenaire", logo: terraLogo },
    ]

    return (
        <section className="py-12 md:py-20 lg:py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-800/60 border-y border-slate-200 dark:border-slate-700">
            <div className="absolute inset-0 bg-gradient-to-r from-shark-accent/3 via-transparent to-premium-neon/3 pointer-events-none" />

            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 md:mb-16 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-shark-accent font-bold tracking-[0.25em] md:tracking-[0.3em] uppercase text-[9px] sm:text-[10px] mb-3 md:mb-4 block"
                >
                    Partenaires Technologiques
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl sm:text-3xl md:text-5xl font-black font-sora text-slate-900 dark:text-white"
                >
                    Une alliance <span className="fluid-text">Stratégique.</span>
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
    <div className="shrink-0 w-40 h-24 sm:w-48 sm:h-28 md:w-52 md:h-32 glass-card rounded-xl md:rounded-2xl border border-black/5 hover:border-shark-accent/30 transition-all duration-500 group flex flex-col items-center justify-center gap-1.5 sm:gap-2 md:gap-3 p-3 sm:p-4 md:p-6 cursor-pointer hover:-translate-y-1 mx-2 sm:mx-3">
        <div className="h-8 sm:h-9 md:h-10 flex items-center justify-center w-full">
            <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-8 sm:max-h-9 md:max-h-10 max-w-[90px] sm:max-w-[110px] md:max-w-[120px] object-contain opacity-40 group-hover:opacity-90 transition-all duration-500"
            />
        </div>
        <div className="text-center">
            <div className="text-[9px] sm:text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                {partner.name}
            </div>
            <div className="text-[8px] sm:text-[9px] text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors font-light">
                {partner.desc}
            </div>
        </div>
    </div>
)

export default Partners
