import { AnimatePresence, MotionConfig } from 'framer-motion'
import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import BookingDrawer from './components/booking/BookingDrawer'
import Footer from './components/layout/Footer'
import MobileBookBar from './components/layout/MobileBookBar'
import Navbar from './components/layout/Navbar'
import PageTransition, { NextLabel } from './components/layout/PageTransition'
import Preloader from './components/layout/Preloader'
import { BookingProvider } from './context/BookingContext'
import { brand } from './data/site'
import About from './pages/About'
import Contact from './pages/Contact'
import GalleryPage from './pages/GalleryPage'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Services from './pages/Services'
import Team from './pages/Team'

const pages = [
  { path: '/', label: 'Welcome', title: `${brand.name} — Beauty Atelier in ${brand.city}`, el: <Home /> },
  { path: '/services', label: 'Services', title: `Services & prices — ${brand.name}`, el: <Services /> },
  { path: '/team', label: 'Our team', title: `Our team — ${brand.name}`, el: <Team /> },
  { path: '/gallery', label: 'Gallery', title: `Gallery — ${brand.name}`, el: <GalleryPage /> },
  { path: '/about', label: 'Our story', title: `About — ${brand.name}`, el: <About /> },
  { path: '/contact', label: 'Visit us', title: `Contact & visit — ${brand.name}`, el: <Contact /> },
  { path: '*', label: 'Lost', title: `Page not found — ${brand.name}`, el: <NotFound /> },
]

function Routes() {
  const location = useLocation()
  const lenis = useLenis()
  const routes = pages.map((p) => ({ path: p.path, element: <PageTransition>{p.el}</PageTransition> }))
  const element = useRoutes(routes, location)
  useEffect(() => {
    document.title = (pages.find((p) => p.path === location.pathname) ?? pages[pages.length - 1]).title
  }, [location.pathname])
  const current = pages.find((p) => p.path === location.pathname) ?? pages[pages.length - 1]
  return (
    <NextLabel.Provider value={current.label}>
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => (lenis ? lenis.scrollTo(0, { immediate: true, force: true }) : window.scrollTo(0, 0))}>
      {element && <div key={location.pathname}>{element}</div>}
    </AnimatePresence>
    </NextLabel.Provider>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ lerp: 0.085 }}>
        <BookingProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-cocoa focus:px-4 focus:py-2 focus:text-cream">Skip to content</a>
          <Preloader />
          <Navbar />
          <main id="main">
            <Routes />
          </main>
          <Footer />
          <MobileBookBar />
          <BookingDrawer />
        </BookingProvider>
      </ReactLenis>
    </MotionConfig>
  )
}
