import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', loading = false, disabled, ...props }) => {
    const variants = {
        primary: 'bg-shark-accent text-white hover:bg-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.3)]',
        outline: 'border border-shark-accent text-shark-accent hover:bg-shark-accent/10 dark:border-sky-400/80 dark:text-sky-300 dark:hover:bg-sky-400/10',
        ghost: 'text-slate-700 hover:bg-black/5',
    }

    const isDisabled = disabled || loading

    return (
        <motion.button
            type={type}
            whileHover={isDisabled ? {} : { scale: 1.05, y: -2 }}
            whileTap={isDisabled ? {} : { scale: 0.95 }}
            onClick={onClick}
            disabled={isDisabled}
            className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold transition-all duration-300 font-sora disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base ${variants[variant]} ${className}`}
            {...props}
        >
            {loading ? (
                <>
                    <Loader2 size={20} className="animate-spin shrink-0" aria-hidden />
                    <span>{children}</span>
                </>
            ) : (
                children
            )}
        </motion.button>
    )
}

export default Button
