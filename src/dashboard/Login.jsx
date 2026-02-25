import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Mail, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import logoPrincipale from '../assets/img/logo principale.png'

// Motif hexagones cybersécurité (SVG)
const HexagonPattern = () => (
    <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="hexagons" width="56" height="50" patternUnits="userSpaceOnUse" patternTransform="scale(1.2)">
                <path d="M28 0L56 14v28L28 56 0 42V14L28 0z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
    </svg>
)

// Grille subtile
const GridPattern = () => (
    <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
            backgroundImage: `
                linear-gradient(to right, rgb(6 182 212) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(6 182 212) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
        }}
    />
)

// Lignes type circuit / données
const CircuitPattern = () => (
    <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="circuit" width="120" height="120" patternUnits="userSpaceOnUse">
                <path d="M0 60h40v20H0zM60 0v40h20V0zM60 80v40h20V80zM80 60h40v20H80z" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-cyan-400" />
                <circle cx="60" cy="60" r="3" fill="currentColor" className="text-cyan-400" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
)

const Login = () => {
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    if (isAuthenticated) return <Navigate to="/dashboard" replace />

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        if (login(email, password)) {
            navigate('/dashboard', { replace: true })
        } else {
            setError(t('login.errorInvalidCredentials'))
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950 px-4">
            {/* Arrière-plan : dégradé + motifs */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/95 to-slate-900" />
            <HexagonPattern />
            <GridPattern />
            <CircuitPattern />
            {/* Lueur d'accent discrète */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[300px] bg-shark-accent/5 rounded-full blur-3xl pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[420px] relative z-10"
            >
                <div className="relative rounded-2xl border border-slate-700/80 bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-black/40 p-8 md:p-10">
                    {/* Bordure lumineuse subtile en haut */}
                    <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

                    <div className="text-center mb-8">
                        <motion.img
                            src={logoPrincipale}
                            alt="Shark Technologys"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.15, duration: 0.4 }}
                            className="h-14 w-auto object-contain mx-auto mb-5"
                        />
                        <h1 className="text-xl md:text-2xl font-bold text-white font-sora tracking-tight">
                            {t('login.title')}
                        </h1>
                        <p className="text-slate-400 mt-2 text-sm">
                            {t('login.subtitle')}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                            >
                                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                                {error}
                            </motion.div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                {t('login.email')}
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-600 bg-slate-800/50 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-400/50 outline-none transition"
                                    placeholder="admin@shark.tech"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                {t('login.password')}
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-600 bg-slate-800/50 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-400/50 outline-none transition"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-semibold transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                        >
                            {t('login.submit')}
                            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                        </motion.button>
                    </form>

                    <p className="mt-6 text-center text-xs text-slate-500">
                        {t('login.footer')}
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default Login
