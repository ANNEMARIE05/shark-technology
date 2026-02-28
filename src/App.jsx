import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Preloader from './components/ui/Preloader'
import ScrollToTop from './components/ui/ScrollToTop'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CertificationDetail from './pages/CertificationDetail'
import Blog from './pages/Blog'
import ArticleDetail from './pages/ArticleDetail'
import Contact from './pages/Contact'
import ReservationEntretien from './pages/ReservationEntretien'
import Assistance from './pages/Assistance'
import Login from './dashboard/Login'
import DashboardLayout from './dashboard/DashboardLayout'
import DashboardHome from './dashboard/DashboardHome'
import TestimonialsManage from './dashboard/pages/TestimonialsManage'
import TestimonialCreate from './dashboard/pages/TestimonialCreate'
import TestimonialEdit from './dashboard/pages/TestimonialEdit'
import PartnersManage from './dashboard/pages/PartnersManage'
import BlogsManage from './dashboard/pages/BlogsManage'
import BlogCreate from './dashboard/pages/BlogCreate'
import BlogEdit from './dashboard/pages/BlogEdit'
import CertificationsManage from './dashboard/pages/CertificationsManage'
import CertificationCreate from './dashboard/pages/CertificationCreate'
import CertificationEdit from './dashboard/pages/CertificationEdit'
import CertificationDetailDashboard from './dashboard/pages/CertificationDetailDashboard'
import ReservationsManage from './dashboard/pages/ReservationsManage'
import ProfilePage from './dashboard/pages/ProfilePage'

function SiteLayout() {
    const location = useLocation()
    const [isLoaded, setIsLoaded] = useState(false)
    const [isInitialLoad, setIsInitialLoad] = useState(true)

    useEffect(() => {
        if (!isInitialLoad) {
            setIsLoaded(false)
            window.scrollTo(0, 0)
        }
    }, [location.pathname])

    const handleLoadingComplete = () => {
        setIsLoaded(true)
        setIsInitialLoad(false)
    }

    return (
        <div className="min-h-screen flex flex-col selection:bg-shark-accent selection:text-white bg-shark-deep dark:bg-slate-900">
            <AnimatePresence>{isLoaded && <Navbar />}</AnimatePresence>
            <AnimatePresence mode="wait">
                {!isLoaded && <Preloader key="preloader" onComplete={handleLoadingComplete} />}
            </AnimatePresence>
            <AnimatePresence mode="wait">
                {isLoaded && (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(10px)' }}
                        transition={{ duration: 0.5 }}
                        className="flex-grow flex flex-col"
                    >
                        <main className="flex-grow">
                            <Outlet />
                        </main>
                        <Footer />
                    </motion.div>
                )}
            </AnimatePresence>
            {isLoaded && <ScrollToTop />}
        </div>
    )
}

function App() {
    const location = useLocation()

    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                <Route index element={<DashboardHome />} />
                <Route path="temoignages" element={<TestimonialsManage />} />
                <Route path="temoignages/create" element={<TestimonialCreate />} />
                <Route path="temoignages/edit/:id" element={<TestimonialEdit />} />
                <Route path="partenaires" element={<PartnersManage />} />
                <Route path="blog" element={<BlogsManage />} />
                <Route path="blog/create" element={<BlogCreate />} />
                <Route path="blog/edit/:slug" element={<BlogEdit />} />
                <Route path="certifications" element={<CertificationsManage />} />
                <Route path="certifications/create" element={<CertificationCreate />} />
                <Route path="certifications/edit/:slug" element={<CertificationEdit />} />
                <Route path="certifications/:slug" element={<CertificationDetailDashboard />} />
                <Route path="reservations" element={<ReservationsManage />} />
                <Route path="profil" element={<ProfilePage />} />
            </Route>
            <Route path="/" element={<SiteLayout />}>
                <Route index element={<Home />} />
                <Route path="formations" element={<Courses />} />
                <Route path="formations/:slug" element={<CertificationDetail />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:slug" element={<ArticleDetail />} />
                <Route path="contact" element={<Contact />} />
                <Route path="reservation-entretien" element={<ReservationEntretien />} />
                <Route path="assistance" element={<Assistance />} />
            </Route>
        </Routes>
    )
}

export default App
