import { motion } from 'framer-motion'

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
    const variants = {
        primary: 'bg-shark-accent text-white hover:bg-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.3)]',
        outline: 'border border-shark-accent text-shark-accent hover:bg-shark-accent/10',
        ghost: 'text-slate-700 hover:bg-black/5',
    }

    return (
        <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 font-sora ${variants[variant]} ${className}`}
        >
            {children}
        </motion.button>
    )
}

export default Button
