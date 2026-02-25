import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import logoImg from '../../assets/img/logo.png'

const Footer = () => {
    const { t } = useLanguage()
    const year = new Date().getFullYear()
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-6">
                        <img src={logoImg} alt="" className="h-8 w-8 object-contain" />
                        <span className="text-xl font-black font-sora text-slate-900 dark:text-white">
                            SHARK <span className="font-light">TECH</span>
                        </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                        {t('footer.description')}
                    </p>
                </div>

                <div>
                    <h4 className="text-slate-900 dark:text-white font-bold mb-6 font-sora uppercase tracking-tighter">{t('footer.usefulLinks')}</h4>
                    <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                        <li><Link to="/contact" className="hover:text-shark-accent dark:hover:text-sky-400 transition-colors">{t('footer.contacts')}</Link></li>
                        <li><Link to="/formations" className="hover:text-shark-accent dark:hover:text-sky-400 transition-colors">{t('footer.formations')}</Link></li>
                        <li><Link to="/assistance" className="hover:text-shark-accent dark:hover:text-sky-400 transition-colors">{t('footer.assistance')}</Link></li>
                        <li><Link to="/blog" className="hover:text-shark-accent dark:hover:text-sky-400 transition-colors">{t('footer.publications')}</Link></li>
                        <li><Link to="/" className="hover:text-shark-accent dark:hover:text-sky-400 transition-colors">{t('footer.informations')}</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-slate-900 dark:text-white font-bold mb-6 font-sora uppercase tracking-tighter">{t('footer.contactUs')}</h4>
                    <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                        <li className="flex items-center gap-3">
                            <Phone size={16} className="text-shark-accent" />
                            <span>+225 07 12 62 44 37</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail size={16} className="text-shark-accent" />
                            <span>infos@sharktechnologys.ci</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-slate-900 dark:text-white font-bold mb-6 font-sora uppercase tracking-tighter">{t('footer.location')}</h4>
                    <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <MapPin size={18} className="text-shark-accent shrink-0" />
                        <p className="whitespace-pre-line">{t('footer.address')}</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
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
