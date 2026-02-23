import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const toggle = () => setVisible(window.scrollY > 400)
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
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-shark-accent text-white shadow-lg shadow-shark-accent/30 hover:bg-blue-600 hover:scale-110 active:scale-95 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-shark-accent focus:ring-offset-2"
                    aria-label="Remonter en haut"
                >
                    <ArrowUp size={22} />
                </motion.button>
            )}
        </AnimatePresence>
    )
}

export default ScrollToTop
