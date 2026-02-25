import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../contexts/AuthContext'
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react'

const errorKeys = {
    session_expired: 'login.errorSessionExpired',
    invalid_session: 'login.errorInvalidSession',
    not_connected: 'login.errorNotConnected',
    wrong_password: 'login.errorWrongPassword',
}

const ProfilePage = () => {
    const { t } = useTranslation()
    const { user, updateProfile } = useAuth()
    const [email, setEmail] = useState(user?.email ?? '')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage({ type: '', text: '' })
        if (newPassword && newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: t('profile.passwordsMismatch') })
            return
        }
        if (newPassword && newPassword.length < 6) {
            setMessage({ type: 'error', text: t('profile.passwordMinLength') })
            return
        }
        setLoading(true)
        const result = updateProfile({
            email: email.trim() || undefined,
            newPassword: newPassword || undefined,
            currentPassword: newPassword ? currentPassword : undefined,
        })
        setLoading(false)
        if (result.ok) {
            setMessage({ type: 'success', text: t('profile.updated') })
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
        } else {
            const errorKey = errorKeys[result.error]
            setMessage({ type: 'error', text: errorKey ? t(errorKey) : t('login.errorUpdate') })
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white font-sora mb-6">{t('profile.title')}</h1>
            <form onSubmit={handleSubmit} className="max-w-md space-y-5">
                {message.text && (
                    <div
                        className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'}`}
                    >
                        {message.text}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        {t('profile.email')}
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-shark-accent focus:border-transparent"
                            placeholder="admin@shark.tech"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        {t('profile.currentPassword')}
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type={showCurrent ? 'text' : 'password'}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full pl-10 pr-12 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-shark-accent focus:border-transparent"
                            placeholder="••••••••"
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrent((s) => !s)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        >
                            {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        {t('profile.newPassword')}
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type={showNew ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full pl-10 pr-12 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-shark-accent focus:border-transparent"
                            placeholder={t('profile.placeholderNewPassword')}
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNew((s) => !s)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        >
                            {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        {t('profile.confirmNewPassword')}
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-shark-accent focus:border-transparent"
                            placeholder="••••••••"
                            autoComplete="new-password"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-shark-accent text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                    <User className="w-4 h-4" />
                    {loading ? t('profile.saving') : t('profile.saveChanges')}
                </button>
            </form>
        </div>
    )
}

export default ProfilePage
