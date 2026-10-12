import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Instagram from '../ui/InstagramIcon'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useBooking } from '../../context/BookingContext'
import { img } from '../../data/images'
import { brand, nav } from '../../data/site'
import { fmt12, openStatus } from '../../lib/hours'
import { ease } from '../../lib/motion'
import ArchImage from '../ui/ArchImage'
import Logo from '../ui/Logo'
import { Letters } from '../ui/Reveal'

export default function Footer() {
  const { open: book } = useBooking()
  const status = openStatus()
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  return (
    <footer className="grain overflow-hidden bg-cocoa text-cream">
      {/* closing invitation */}
      <div className="wrap grid items-center gap-14 py-24 lg:grid-cols-[1.2fr_1fr] lg:py-32">
        <div>
          <p className="label !text-cream/60">Your chair is waiting</p>
          <h2 className="display mt-6 text-[clamp(3rem,7vw,6.2rem)]">
            <Letters text="Take an hour" /><br />
            <Letters text="just for *you.*" delay={0.3} />
          </h2>
          <div className="mt-10 flex flex-wrap gap-4">
            <button onClick={() => book()} className="btn btn-fill btn-light group">
              <span>Book an appointment</span>
            </button>
            <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn border border-cream/30 text-cream transition hover:border-cream">
              <span>WhatsApp us</span>
            </a>
          </div>
        </div>
        <ArchImage src={img('footer')} alt="" className="mx-auto aspect-[4/5] w-full max-w-sm lg:ml-auto" />
      </div>

      <div className="wrap grid gap-12 border-t border-cream/10 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/60">A women-only beauty atelier in {brand.city} for hair, nails, makeup, skin and bridal.</p>
          <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm text-cream/80 hover:text-cream">
            <Instagram className="h-4 w-4" /> <span className="underline-draw">Follow on Instagram</span>
          </a>
        </div>
        <div>
          <p className="label !text-cream/50">Explore</p>
          <ul className="mt-5 space-y-3">
            {nav.map((n) => (
              <li key={n.to}><Link to={n.to} className="font-serif text-xl text-cream/85 transition hover:italic hover:text-blush">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label !text-cream/50">Hours</p>
          <p className="mt-5 flex items-center gap-2 text-sm">
            <span className={`h-2 w-2 rounded-full ${status.open ? 'bg-emerald-400' : 'bg-cream/40'}`} /> {status.text}
          </p>
          <ul className="mt-4 space-y-1.5 text-sm">
            {brand.hours.map((h) => (
              <li key={h.day} className={`flex justify-between gap-4 ${h.day === status.today ? 'text-blush' : 'text-cream/55'}`}>
                <span>{h.label}</span><span>{fmt12(h.open)} – {fmt12(h.close)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label !text-cream/50">Visit</p>
          <p className="mt-5 text-sm leading-relaxed text-cream/70">{brand.address}</p>
          <p className="mt-3 text-sm"><a href={`tel:${brand.phone.replace(/\s/g, '')}`} className="underline-draw text-cream/80">{brand.phone}</a></p>
          <p className="mt-1 text-sm"><a href={`mailto:${brand.email}`} className="underline-draw text-cream/80">{brand.email}</a></p>
          <p className="label mt-8 !text-cream/50">Offers & new services</p>
          {joined ? (
            <p className="mt-4 font-serif text-lg italic text-blush">Thank you, we’ll be in touch.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (/\S+@\S+\.\S+/.test(email)) setJoined(true) }} className="mt-3 flex items-center border-b border-cream/25 focus-within:border-blush">
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email" aria-label="Email address" className="w-full bg-transparent py-3 text-sm text-cream placeholder:text-cream/40 outline-none" />
              <button aria-label="Subscribe" className="p-2 text-cream/70 transition hover:translate-x-1 hover:text-cream"><ArrowRight className="h-4 w-4" /></button>
            </form>
          )}
        </div>
      </div>

      {/* oversized wordmark */}
      <div className="overflow-hidden">
        <motion.p
          initial={{ y: '40%', opacity: 0 }}
          whileInView={{ y: '18%', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease }}
          className="select-none text-center font-serif text-[22vw] font-light italic leading-[0.8] text-cream/[0.07]"
          aria-hidden="true"
        >
          {brand.name}
        </motion.p>
      </div>
      <div className="wrap flex flex-col gap-2 border-t border-cream/10 py-6 text-xs text-cream/45 sm:flex-row sm:justify-between" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
        <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
        <p>Women-only salon · {brand.city}</p>
      </div>
    </footer>
  )
}
