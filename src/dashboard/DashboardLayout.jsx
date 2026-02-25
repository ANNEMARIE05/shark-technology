import { useState } from 'react'
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom'
import { LayoutDashboard, MessageCircle, Users, FileText, User, CalendarCheck, BookOpen, LogOut, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import DashboardNavbar from './DashboardNavbar'
import logoImg from '../assets/img/logo.png'
import { motion } from 'framer-motion'

const nav = [
    { to: '/dashboard', end: true, icon: LayoutDashboard, label: 'Tableau de bord' },
    { to: '/dashboard/reservations', end: false, icon: CalendarCheck, label: 'Réservations d\'entretien' },
    { to: '/dashboard/certifications', end: false, icon: BookOpen, label: 'Formations' },
    { to: '/dashboard/temoignages', end: false, icon: MessageCircle, label: 'Témoignages' },
    { to: '/dashboard/partenaires', end: false, icon: Users, label: 'Partenaires' },
    { to: '/dashboard/blog', end: false, icon: FileText, label: 'Articles blog' },
    { to: '/dashboard/profil', end: true, icon: User, label: 'Profil' },
]

const DashboardLayout = () => {
    const { logout, user } = useAuth()
    const navigate = useNavigate()
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    const handleLogout = () => {
        logout()
        navigate('/login', { replace: true })
    }

    const sidebarWidth = sidebarCollapsed ? '4.5rem' : '16rem'

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
            {/* Sidebar à gauche - fixe, pliable */}
            <aside
                className={`fixed left-0 top-0 bottom-0 z-30 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col hidden lg:flex transition-[width] duration-200 ${
                    sidebarCollapsed ? 'w-[4.5rem]' : 'w-64'
                }`}
            >
                <div className={`h-14 shrink-0 border-b border-slate-200 dark:border-slate-700 flex items-center ${sidebarCollapsed ? 'px-2 justify-center' : 'px-4 gap-3'}`}>
                    <Link to="/dashboard" className="flex items-center gap-3 min-w-0">
                        <motion.div
                            className="w-10 h-10 bg-gradient-to-tr from-shark-accent to-premium-neon rounded-xl flex items-center justify-center shadow-lg"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <img
                                src={logoImg}
                                alt="SHARK TECHNOLOGYS"
                                className="h-8 w-auto object-contain"
                            />
                        </motion.div>
                        {!sidebarCollapsed && (
                            <span className="font-black text-slate-900 dark:text-white font-sora text-lg truncate">Shark Admin</span>
                        )}
                    </Link>
                    <button
                        type="button"
                        onClick={() => setSidebarCollapsed((c) => !c)}
                        className="ml-auto p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-700 dark:hover:text-slate-200 transition shrink-0"
                        aria-label={sidebarCollapsed ? 'Déplier la barre latérale' : 'Replier la barre latérale'}
                    >
                        {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    </button>
                </div>
                <nav className="flex-1 p-3 space-y-0.5 overflow-hidden">
                    {nav.map(({ to, end, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            title={sidebarCollapsed ? label : undefined}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                                    isActive
                                        ? 'bg-shark-accent/15 text-shark-accent dark:text-premium-neon'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                                } ${sidebarCollapsed ? 'justify-center' : ''}`
                            }
                        >
                            <Icon className="w-5 h-5 shrink-0" />
                            {!sidebarCollapsed && <span className="truncate">{label}</span>}
                        </NavLink>
                    ))}
                </nav>
                <div className={`p-3 border-t border-slate-200 dark:border-slate-700 ${sidebarCollapsed ? 'flex flex-col items-center gap-0.5' : ''}`}>
                    <Link
                        to="/"
                        className={`flex items-center rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition ${sidebarCollapsed ? 'p-2.5 justify-center' : 'gap-3 px-3 py-2.5'}`}
                        title={sidebarCollapsed ? 'Voir le site' : undefined}
                    >
                        {sidebarCollapsed ? <ExternalLink className="w-5 h-5 shrink-0" /> : 'Voir le site'}
                    </Link>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className={`w-full flex items-center rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition ${sidebarCollapsed ? 'p-2.5 justify-center' : 'gap-3 px-3 py-2.5'}`}
                        title={sidebarCollapsed ? 'Déconnexion' : undefined}
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        {!sidebarCollapsed && <span>Déconnexion</span>}
                    </button>
                </div>
            </aside>
            {/* Navbar fixe + zone contenu (marge gauche = largeur sidebar) */}
            <DashboardNavbar sidebarCollapsed={sidebarCollapsed} />
            <main
                className="min-h-screen overflow-auto pt-14 transition-[margin] duration-200"
                style={{ marginLeft: sidebarWidth }}
            >
                <div className="p-6 md:p-8 max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default DashboardLayout
