import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const toggle = () => setVisible(window.scrollY > 300)
        window.addEventListener('scroll', toggle, { passive: true })
        return () => window.removeEventListener('scroll', toggle)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] flex items-center gap-2 pl-3 pr-4 py-3 rounded-full bg-shark-accent text-white shadow-xl shadow-shark-accent/35 hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-shark-accent focus:ring-offset-2 font-medium text-sm"
                    aria-label="Remonter en haut"
                >
                    <ArrowUp size={20} />
                    <span className="hidden sm:inline">Haut</span>
                </motion.button>
            )}
        </AnimatePresence>
    )
}

export default ScrollToTop
