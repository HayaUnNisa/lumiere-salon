import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useBooking } from '../../context/BookingContext'
import { brand, nav } from '../../data/site'
import { openStatus } from '../../lib/hours'
import { ease, easeSoft } from '../../lib/motion'
import Logo from '../ui/Logo'

function Item({ to, label }: { to: string; label: string }) {
  return (
    <NavLink to={to} className="group relative py-2 text-[12px] font-medium uppercase tracking-[0.22em] text-cocoa">
      {({ isActive }) => (
        <>
          {/* text rolls up to a rose italic copy on hover */}
          <span className="relative block overflow-hidden">
            <span className="block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">{label}</span>
            <span className="absolute inset-0 block translate-y-full font-serif text-[15px] normal-case italic tracking-normal text-rose transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0">{label}</span>
          </span>
          {isActive && <motion.span layoutId="nav-dot" className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-rose" />}
        </>
      )}
    </NavLink>
  )
}

export default function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { open: book } = useBooking()
  const { pathname } = useLocation()
  const status = openStatus()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40))
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => { document.documentElement.style.overflow = open ? 'hidden' : '' }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className={`transition-all duration-700 ${scrolled ? 'bg-cream/85 shadow-[0_1px_0_rgba(46,33,29,.08)] backdrop-blur-md' : ''}`}>
          <div className={`wrap grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center transition-[height] duration-700 ${scrolled ? 'h-[72px]' : 'h-24'}`}>
            <nav aria-label="Main left" className="hidden items-center gap-9 lg:flex">
              {nav.slice(0, 3).map((n) => <Item key={n.to} {...n} />)}
            </nav>
            <button onClick={() => setOpen(true)} className="flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.22em] lg:hidden" aria-label="Open menu" aria-expanded={open}>
              <span className="flex w-6 flex-col gap-[5px]"><span className="h-px w-6 bg-cocoa" /><span className="h-px w-4 bg-cocoa" /></span>
              <span className="hidden sm:inline">Menu</span>
            </button>
            <Logo />
            <div className="flex items-center justify-end gap-9">
              <nav aria-label="Main right" className="hidden items-center gap-9 lg:flex">
                {nav.slice(3).map((n) => <Item key={n.to} {...n} />)}
              </nav>
              <button onClick={() => book()} className="btn btn-fill btn-dark hidden !px-6 !py-3 sm:inline-flex">
                <span>Book</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-blush lg:hidden"
            initial={{ clipPath: 'ellipse(150% 0% at 50% 0%)' }}
            animate={{ clipPath: 'ellipse(150% 140% at 50% 0%)' }}
            exit={{ clipPath: 'ellipse(150% 0% at 50% 0%)' }}
            transition={{ duration: 0.9, ease: easeSoft }}
            style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div className="wrap grid h-24 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center">
              <button onClick={() => setOpen(false)} className="justify-self-start text-[12px] font-medium uppercase tracking-[0.22em]" aria-label="Close menu">Close</button>
              <Logo onClick={() => setOpen(false)} />
            </div>
            <nav aria-label="Mobile" className="wrap flex flex-1 flex-col justify-center">
              {[{ label: 'Home', to: '/' }, ...nav].map((n, i) => (
                <div key={n.to} className="overflow-hidden">
                  <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ duration: 0.8, ease, delay: 0.25 + i * 0.06 }}>
                    <NavLink to={n.to} end={n.to === '/'} className={({ isActive }) => `flex items-baseline gap-4 py-1.5 font-serif text-[2.9rem] font-light leading-tight ${isActive ? 'italic text-rose' : 'text-cocoa'}`}>
                      <span className="font-sans text-[11px] tracking-[0.2em] text-cocoa-mute">0{i + 1}</span>
                      {n.label}
                    </NavLink>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="wrap space-y-5 pb-8">
              <p className="flex items-center gap-2 text-sm text-cocoa-soft">
                <span className={`h-2 w-2 rounded-full ${status.open ? 'bg-emerald-600' : 'bg-cocoa-mute'}`} /> {status.text}
              </p>
              <button onClick={() => { setOpen(false); book() }} className="btn btn-dark w-full">Book an appointment</button>
              <p className="text-center text-xs text-cocoa-mute">{brand.address}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
