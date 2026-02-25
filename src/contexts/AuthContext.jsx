import { createContext, useContext, useState, useEffect } from 'react'

const AUTH_KEY = 'shark_admin_auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)

    const saveAuth = (userData, password, expiresAt) => {
        const toStore = { user: userData, expiresAt }
        if (password != null) toStore.password = password
        localStorage.setItem(AUTH_KEY, JSON.stringify(toStore))
        setUser(userData)
    }

    useEffect(() => {
        const stored = localStorage.getItem(AUTH_KEY)
        if (stored) {
            try {
                const data = JSON.parse(stored)
                if (data?.user && data?.expiresAt > Date.now()) setUser(data.user)
                else localStorage.removeItem(AUTH_KEY)
            } catch (_) {
                localStorage.removeItem(AUTH_KEY)
            }
        }
        setReady(true)
    }, [])

    const login = (email, password) => {
        const stored = localStorage.getItem(AUTH_KEY)
        let storedData = null
        if (stored) {
            try {
                storedData = JSON.parse(stored)
            } catch (_) {}
        }
        const storedEmail = storedData?.user?.email
        const storedPassword = storedData?.password
        const defaultOk = email === 'admin@shark.tech' && password === 'admin123'
        const storedOk = storedEmail && storedPassword && email === storedEmail && password === storedPassword
        if (defaultOk || storedOk) {
            const userData = { email, name: 'Admin' }
            const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 jours
            saveAuth(userData, password, expiresAt)
            return true
        }
        return false
    }

    const logout = () => {
        localStorage.removeItem(AUTH_KEY)
        setUser(null)
    }

    const updateProfile = ({ email, newPassword, currentPassword }) => {
        const stored = localStorage.getItem(AUTH_KEY)
        if (!stored || !user) return { ok: false, error: 'not_connected' }
        let data
        try {
            data = JSON.parse(stored)
        } catch (_) {
            return { ok: false, error: 'invalid_session' }
        }
        if (!data?.user || data?.expiresAt <= Date.now()) return { ok: false, error: 'session_expired' }
        const currentStoredPassword = data.password ?? 'admin123'
        if (currentPassword !== undefined && currentPassword !== currentStoredPassword) {
            return { ok: false, error: 'wrong_password' }
        }
        const newUser = { ...data.user }
        if (email != null && email.trim()) newUser.email = email.trim()
        const newPass = newPassword != null && newPassword !== '' ? newPassword : (data.password ?? currentStoredPassword)
        const expiresAt = data.expiresAt
        saveAuth(newUser, newPass, expiresAt)
        return { ok: true }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, updateProfile, ready, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}
