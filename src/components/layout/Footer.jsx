import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import logoPrincipal from '../../assets/img/logo principale.png'

const Footer = () => {
    const { t } = useTranslation()
    const year = new Date().getFullYear()
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 pt-10 sm:pt-14 md:pt-20 pb-8 md:pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 min-w-0">
                <div className="col-span-1 md:col-span-1">
                    <div className="mb-4 sm:mb-6">
                        <img src={logoPrincipal} alt="Shark Technology" className="h-9 sm:h-10 md:h-12 w-auto object-contain" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 break-words">
                        {t('footer.description')}
                    </p>
                </div>

                <div className="min-w-0">
                    <h4 className="text-slate-900 dark:text-white font-bold mb-4 sm:mb-6 font-sora uppercase tracking-tighter text-sm sm:text-base">{t('footer.usefulLinks')}</h4>
                    <ul className="space-y-2.5 sm:space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        <li><Link to="/contact" className="hover:text-shark-accent dark:hover:text-sky-400 transition-colors">{t('footer.contacts')}</Link></li>
                        <li><Link to="/formations" className="hover:text-shark-accent dark:hover:text-sky-400 transition-colors">{t('footer.formations')}</Link></li>
                        <li><Link to="/reservation-entretien" className="hover:text-shark-accent dark:hover:text-sky-400 transition-colors">{t('common.bookInterview')}</Link></li>
                        <li><Link to="/assistance" className="hover:text-shark-accent dark:hover:text-sky-400 transition-colors">{t('footer.assistance')}</Link></li>
                        <li><Link to="/blog" className="hover:text-shark-accent dark:hover:text-sky-400 transition-colors">{t('footer.publications')}</Link></li>
                        <li><Link to="/" className="hover:text-shark-accent dark:hover:text-sky-400 transition-colors">{t('footer.informations')}</Link></li>
                    </ul>
                </div>

                <div className="min-w-0">
                    <h4 className="text-slate-900 dark:text-white font-bold mb-4 sm:mb-6 font-sora uppercase tracking-tighter text-sm sm:text-base">{t('footer.contactUs')}</h4>
                    <ul className="space-y-2.5 sm:space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        <li className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <Phone size={14} className="text-shark-accent shrink-0" />
                            <span className="break-all">+225 07 12 62 44 37</span>
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <Mail size={14} className="text-shark-accent shrink-0" />
                            <span className="break-all">infos@sharktechnologys.ci</span>
                        </li>
                    </ul>
                </div>

                <div className="min-w-0">
                    <h4 className="text-slate-900 dark:text-white font-bold mb-4 sm:mb-6 font-sora uppercase tracking-tighter text-sm sm:text-base">{t('footer.location')}</h4>
                    <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        <MapPin size={16} className="text-shark-accent shrink-0 mt-0.5" />
                        <p className="whitespace-pre-line break-words">{t('footer.address')}</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 sm:mt-14 md:mt-20 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 text-center md:text-left">
                <p>{t('footer.copyright', { year })}</p>
                <div className="flex gap-6">
                    <Link to="/contact" className="hover:text-shark-accent dark:hover:text-sky-400 transition-colors">{t('footer.privacy')}</Link>
                    <Link to="/contact" className="hover:text-shark-accent dark:hover:text-sky-400 transition-colors">{t('footer.legal')}</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
