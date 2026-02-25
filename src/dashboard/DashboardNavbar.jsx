import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User, Bell, Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const DashboardNavbar = ({ sidebarCollapsed = false }) => {
    const { theme, toggleTheme } = useTheme()
    const [notifOpen, setNotifOpen] = useState(false)
    const notifRef = useRef(null)
    const leftOffset = sidebarCollapsed ? '4.5rem' : '16rem'

    useEffect(() => {
        const close = (e) => {
            if (!notifRef.current?.contains(e.target)) setNotifOpen(false)
        }
        document.addEventListener('click', close)
        return () => document.removeEventListener('click', close)
    }, [])

    return (
        <header
            className="fixed top-0 right-0 z-20 h-14 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition-[left] duration-200 hidden lg:flex items-center"
            style={{ left: leftOffset }}
        >
            <div className="flex h-full items-center justify-end gap-2 px-4 sm:px-6 lg:px-8 w-full">
                <button
                    type="button"
                    onClick={toggleTheme}
                    className="p-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white transition"
                    aria-label={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
                    title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <div className="relative" ref={notifRef}>
                    <button
                        type="button"
                        onClick={() => setNotifOpen((o) => !o)}
                        className="p-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white transition"
                        aria-label="Notifications"
                    >
                        <Bell className="w-5 h-5" />
                    </button>
                    {notifOpen && (
                        <div className="absolute right-0 top-full mt-1 py-2 w-72 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg z-50">
                            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                                <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
                            </div>
                            <div className="p-4 text-sm text-slate-500 dark:text-slate-400 text-center">
                                Aucune nouvelle notification
                            </div>
                        </div>
                    )}
                </div>

                <Link
                    to="/dashboard/profil"
                    className="flex items-center gap-2 p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white transition"
                    aria-label="Profil"
                >
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center">
                        <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    </div>
                    <span className="hidden sm:inline font-medium text-slate-700 dark:text-slate-300">Profil</span>
                </Link>
            </div>
        </header>
    )
}

export default DashboardNavbar
