import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

const SCROLL_THRESHOLD = 120

function getScrollY() {
    if (typeof window === 'undefined') return 0
    return window.scrollY ?? document.documentElement.scrollTop ?? document.body.scrollTop ?? 0
}

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => setVisible(getScrollY() > SCROLL_THRESHOLD)
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    type="button"
                    aria-label="Remonter en haut"
                    onClick={scrollToTop}
                    initial={{ opacity: 0, y: 12, scale: 0.9 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                    }}
                    exit={{ opacity: 0, y: 12, scale: 0.9 }}
                    transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                    }}
                    whileHover={{
                        y: -3,
                        scale: 1.05,
                        transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="fixed right-6 sm:right-8 bottom-20 sm:bottom-24 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-shark-accent text-white shadow-lg shadow-shark-accent/30 hover:shadow-xl hover:shadow-shark-accent/40 flex items-center justify-center border border-white/20 dark:border-sky-400/30 focus:outline-none focus:ring-2 focus:ring-shark-accent focus:ring-offset-2 focus:ring-offset-shark-deep dark:focus:ring-offset-slate-900"
                >
                    <motion.span
                        animate={{ y: [0, -3, 0] }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="inline-flex"
                    >
                        <ChevronUp size={22} strokeWidth={2.5} className="sm:w-6 sm:h-6" aria-hidden />
                    </motion.span>
                </motion.button>
            )}
        </AnimatePresence>
    )
}
