import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { testimonials } from '../../data/site'
import { ease } from '../../lib/motion'
import { Kicker, Letters } from '../ui/Reveal'

const tilt = [-4, 3, -2, 5, -3]

function TopCard({ t, onSwipe }: { t: (typeof testimonials)[number]; onSwipe: (dir: 1 | -1) => void }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-300, 300], [-14, 14])
  return (
    <motion.figure
      style={{ x, rotate }}
      drag="x"
      dragSnapToOrigin
      onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 110) onSwipe(info.offset.x > 0 ? 1 : -1) }}
      initial={{ scale: 0.92, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
      exit={{ x: 420, opacity: 0, rotate: 18, transition: { duration: 0.5, ease } }}
      transition={{ duration: 0.6, ease }}
      className="absolute inset-0 z-10 flex cursor-grab flex-col justify-between rounded-[28px] bg-cream p-8 shadow-[0_30px_80px_-30px_rgba(46,33,29,.35)] active:cursor-grabbing sm:p-11"
    >
      <span className="font-serif text-8xl leading-none text-blush-deep">“</span>
      <blockquote className="-mt-6 font-serif text-[clamp(1.5rem,2.6vw,2.1rem)] font-light leading-[1.3] text-cocoa">{t.text}</blockquote>
      <figcaption className="mt-6 flex items-center justify-between border-t border-cocoa/10 pt-5">
        <span className="font-serif text-xl italic">{t.name}</span>
        <span className="label">{t.service}</span>
      </figcaption>
    </motion.figure>
  )
}

/** A stack of handwritten-style cards. Drag the top one away, or use the arrows. */
export default function Testimonials() {
  const [i, setI] = useState(0)
  const n = testimonials.length
  const next = () => setI((v) => (v + 1) % n)
  const prev = () => setI((v) => (v - 1 + n) % n)
  return (
    <section className="overflow-hidden bg-blush-light py-24 sm:py-32">
      <div className="wrap grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Kicker>Kind words</Kicker>
          <h2 className="display mt-6 text-[clamp(2.8rem,5.5vw,4.8rem)]"><Letters text="Notes from" /><br /><Letters text="our *guests*" delay={0.2} /></h2>
          <div className="mt-10 flex items-center gap-6">
            <button onClick={prev} aria-label="Previous review" className="grid h-12 w-12 place-items-center rounded-full border border-cocoa/20 transition hover:border-cocoa hover:bg-cocoa hover:text-cream"><ArrowLeft className="h-4 w-4" /></button>
            <span className="font-serif text-2xl tabular-nums">{String(i + 1).padStart(2, '0')}<span className="text-cocoa-mute"> / {String(n).padStart(2, '0')}</span></span>
            <button onClick={next} aria-label="Next review" className="grid h-12 w-12 place-items-center rounded-full border border-cocoa/20 transition hover:border-cocoa hover:bg-cocoa hover:text-cream"><ArrowRight className="h-4 w-4" /></button>
          </div>
          <p className="mt-6 text-sm italic text-cocoa-mute">Drag the card aside to read the next.</p>
        </div>

        <div className="relative mx-auto h-[440px] w-full max-w-[540px] sm:h-[420px]">
          {[2, 1].map((d) => (
            <motion.div key={d} animate={{ rotate: tilt[(i + d) % tilt.length], y: d * 14, scale: 1 - d * 0.04 }} transition={{ duration: 0.7, ease }} className="absolute inset-0 rounded-[28px] bg-cream/70 shadow-[0_20px_50px_-30px_rgba(46,33,29,.3)]" />
          ))}
          <AnimatePresence initial={false}>
            <TopCard key={i} t={testimonials[i]} onSwipe={next} />
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
