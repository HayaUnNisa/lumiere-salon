import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { useBooking } from '../../context/BookingContext'
import { img } from '../../data/images'
import { brand, categories } from '../../data/site'
import { openStatus } from '../../lib/hours'
import { ease } from '../../lib/motion'
import { bootDelay } from '../ui/boot'
import Button from '../ui/Button'
import { Letters } from '../ui/Reveal'

function RotatingBadge() {
  const text = 'Book your ritual · Book your ritual · '
  return (
    <div className="relative grid h-32 w-32 place-items-center rounded-full bg-cream shadow-[0_20px_50px_-20px_rgba(46,33,29,.35)]">
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
        <defs><path id="circ" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" /></defs>
        <text className="fill-cocoa font-sans text-[9.5px] uppercase tracking-[0.32em]"><textPath href="#circ">{text}</textPath></text>
      </svg>
      <span className="font-serif text-3xl italic text-rose">{brand.monogram}</span>
    </div>
  )
}

export default function Hero() {
  const [D] = useState(bootDelay)
  const { open } = useBooking()
  const ref = useRef<HTMLElement>(null)
  const status = openStatus()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // the arch "opens" into a softer frame as you scroll away
  const radius = useTransform(scrollYProgress, [0, 0.7], ['999px 999px 24px 24px', '48px 48px 24px 24px'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1])
  const lift = useTransform(scrollYProgress, [0, 1], [0, -120])
  const lift2 = useTransform(scrollYProgress, [0, 1], [0, -220])

  return (
    <section ref={ref} className="relative overflow-hidden pt-28 sm:pt-32">
      {/* soft blush wash */}
      <div className="pointer-events-none absolute -right-40 top-0 h-[700px] w-[700px] rounded-full bg-blush/60 blur-[120px]" />
      <div className="wrap relative grid items-center gap-14 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-24">
        <div className="relative z-10">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: D }} className="label flex items-center gap-4">
            <span className="h-px w-10 bg-gold" /> Women-only beauty atelier · {brand.city}
          </motion.p>
          <h1 className="display mt-8 text-[clamp(3.2rem,7vw,6.3rem)] text-cocoa">
            <Letters text="Where beauty" immediate delay={D + 0.1} />
            <br />
            <Letters text="becomes *ritual.*" immediate delay={D + 0.4} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease, delay: D + 0.9 }} className="mt-8 max-w-md text-[17px] leading-relaxed text-cocoa-soft">
            Hair, nails, makeup, skin and bridal, done slowly and beautifully by an all-female team in a calm, private space.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease, delay: D + 1.05 }} className="mt-10 flex flex-wrap gap-3">
            <Button onClick={() => open()}>Book an appointment</Button>
            <Button to="/services" variant="line" arrow={false}>View the menu</Button>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: D + 1.3 }} className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-cocoa/10 bg-cream/70 px-4 py-2 text-[13px] text-cocoa-soft backdrop-blur">
            <span className="relative flex h-2 w-2">
              {status.open && <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />}
              <span className={`relative h-2 w-2 rounded-full ${status.open ? 'bg-emerald-600' : 'bg-cocoa-mute'}`} />
            </span>
            {status.text}
          </motion.p>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] lg:mr-0">
          <motion.div
            style={{ borderRadius: radius, y: lift }}
            initial={{ clipPath: 'inset(100% 0% 0% 0% round 999px 999px 24px 24px)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 999px 999px 24px 24px)' }}
            transition={{ duration: 1.8, ease, delay: D + 0.2 }}
            className="relative aspect-[5/7] overflow-hidden bg-blush-light"
          >
            <motion.img src={img('hero')} alt="Styled hair at the salon" style={{ scale: imgScale }} initial={{ scale: 1.4 }} animate={{ scale: 1.12 }} transition={{ duration: 2.6, ease, delay: D + 0.2 }} className="h-full w-full object-cover" />
          </motion.div>
          {/* overlapping detail circle */}
          <motion.div style={{ y: lift2 }} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, ease, delay: D + 0.9 }} className="absolute -bottom-8 -left-4 h-40 w-40 overflow-hidden rounded-full border-[6px] border-cream sm:-left-14 sm:h-48 sm:w-48">
            <img src={img('hero-detail')} alt="" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, rotate: -40, scale: 0.6 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} transition={{ duration: 1.4, ease, delay: D + 1.1 }} className="absolute -right-2 top-[18%] sm:-right-10">
            <button onClick={() => open()} aria-label="Book your ritual" className="transition-transform duration-500 hover:scale-105"><RotatingBadge /></button>
          </motion.div>
        </div>
      </div>

      {/* service marquee */}
      <div className="relative border-y border-cocoa/10 py-5">
        <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
          {[0, 1].map((k) => (
            <div key={k} aria-hidden={k === 1} className="flex shrink-0 items-center">
              {[...categories, ...categories].map((c, i) => (
                <span key={i} className="flex items-center">
                  <span className="px-8 font-serif text-3xl font-light italic text-cocoa sm:text-4xl">{c.title}</span>
                  <span className="text-gold">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
