import { useState, useEffect } from 'react'
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom'
import { LayoutDashboard, MessageCircle, Users, FileText, User, CalendarCheck, BookOpen, LogOut, ChevronLeft, ChevronRight, ExternalLink, Menu, X } from 'lucide-react'
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

const NavContent = ({ sidebarCollapsed, onNavClick, onLogout, showLabels = true }) => (
    <>
        <nav className="flex-1 p-2 sm:p-3 space-y-0.5 overflow-y-auto">
            {nav.map(({ to, end, icon: Icon, label }) => (
                <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={onNavClick}
                    title={!showLabels ? label : undefined}
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                            isActive
                                ? 'bg-shark-accent/15 text-shark-accent dark:text-premium-neon'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                        } ${!showLabels ? 'justify-center' : ''}`
                    }
                >
                    <Icon className="w-5 h-5 shrink-0" />
                    {showLabels && <span className="truncate">{label}</span>}
                </NavLink>
            ))}
        </nav>
        <div className={`p-2 sm:p-3 border-t border-slate-200 dark:border-slate-700 ${!showLabels ? 'flex flex-col items-center gap-0.5' : ''}`}>
            <Link
                to="/"
                onClick={onNavClick}
                className={`flex items-center rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition ${!showLabels ? 'p-2.5 justify-center' : 'gap-3 px-3 py-2.5'}`}
                title={!showLabels ? 'Voir le site' : undefined}
            >
                {!showLabels ? <ExternalLink className="w-5 h-5 shrink-0" /> : 'Voir le site'}
            </Link>
            <button
                type="button"
                onClick={() => { onNavClick?.(); onLogout?.(); }}
                aria-label="Déconnexion"
                className={`w-full flex items-center rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition ${!showLabels ? 'p-2.5 justify-center' : 'gap-3 px-3 py-2.5'}`}
                title={!showLabels ? 'Déconnexion' : undefined}
            >
                <LogOut className="w-5 h-5 shrink-0" />
                {showLabels && <span>Déconnexion</span>}
            </button>
        </div>
    </>
)

const DashboardLayout = () => {
    const { logout, user } = useAuth()
    const navigate = useNavigate()
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        navigate('/login', { replace: true })
    }

    const closeMobileMenu = () => setMobileMenuOpen(false)

    useEffect(() => {
        const handleResize = () => { if (window.innerWidth >= 1024) setMobileMenuOpen(false) }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const sidebarWidth = sidebarCollapsed ? '4.5rem' : '16rem'

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
            {/* Barre mobile : logo + menu + profil */}
            <header className="fixed top-0 left-0 right-0 z-20 h-12 lg:hidden border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-between px-3 sm:px-4">
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen((o) => !o)}
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                    aria-label="Menu"
                >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
                <Link to="/dashboard" className="flex items-center gap-2" onClick={closeMobileMenu}>
                    <img src={logoImg} alt="Shark" className="h-7 w-auto object-contain" />
                    <span className="font-bold text-slate-900 dark:text-white font-sora text-sm hidden sm:inline">Shark Admin</span>
                </Link>
                <Link to="/dashboard/profil" className="p-2 rounded-lg text-slate-600 dark:text-slate-400" onClick={closeMobileMenu} aria-label="Profil">
                    <User className="w-5 h-5" />
                </Link>
            </header>

            {/* Overlay mobile */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={closeMobileMenu}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar desktop + drawer mobile */}
            <aside
                className={`fixed left-0 top-0 bottom-0 z-40 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col transition-all duration-200 ease-out ${
                    mobileMenuOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0'
                } ${sidebarCollapsed && !mobileMenuOpen ? 'lg:w-[4.5rem]' : 'lg:w-64'}`}
            >
                <div className={`h-12 lg:h-14 shrink-0 border-b border-slate-200 dark:border-slate-700 flex items-center ${sidebarCollapsed && !mobileMenuOpen ? 'px-2 justify-center' : 'px-3 sm:px-4 gap-3'}`}>
                    <Link to="/dashboard" className="flex items-center gap-3 min-w-0" onClick={closeMobileMenu}>
                        <motion.div
                            className="w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-tr from-shark-accent to-premium-neon rounded-lg flex items-center justify-center shadow-md"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <img src={logoImg} alt="SHARK" className="h-6 lg:h-8 w-auto object-contain" />
                        </motion.div>
                        {(!sidebarCollapsed || mobileMenuOpen) && (
                            <span className="font-black text-slate-900 dark:text-white font-sora text-base lg:text-lg truncate">Shark Admin</span>
                        )}
                    </Link>
                    <button
                        type="button"
                        onClick={() => setSidebarCollapsed((c) => !c)}
                        className="ml-auto p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hidden lg:block shrink-0"
                        aria-label={sidebarCollapsed ? 'Déplier la barre latérale' : 'Replier la barre latérale'}
                    >
                        {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    </button>
                </div>
                <NavContent
                    sidebarCollapsed={sidebarCollapsed}
                    showLabels={!sidebarCollapsed || mobileMenuOpen}
                    onNavClick={closeMobileMenu}
                    onLogout={handleLogout}
                />
            </aside>

            <DashboardNavbar sidebarCollapsed={sidebarCollapsed} />
            <main
                className={`min-h-screen overflow-auto transition-[margin] duration-200 pt-12 lg:pt-14 ${sidebarCollapsed ? 'lg:ml-[4.5rem]' : 'lg:ml-64'}`}
            >
                <div className="px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6 max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default DashboardLayout
