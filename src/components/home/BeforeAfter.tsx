import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { MoveHorizontal } from 'lucide-react'
import { useRef, useState } from 'react'
import { img } from '../../data/images'
import { ease } from '../../lib/motion'
import { FadeUp, Kicker, Letters } from '../ui/Reveal'

/** Drag (or use arrow keys on) the handle to compare before and after. */
export default function BeforeAfter() {
  const box = useRef<HTMLDivElement>(null)
  const raw = useMotionValue(50)
  const pos = useSpring(raw, { stiffness: 300, damping: 35 })
  const clip = useTransform(pos, (p) => `inset(0 ${100 - p}% 0 0)`)
  const left = useTransform(pos, (p) => `${p}%`)
  const [val, setVal] = useState(50)

  const setFrom = (clientX: number) => {
    const r = box.current!.getBoundingClientRect()
    const p = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100))
    raw.set(p); setVal(Math.round(p))
  }
  const onDown = (e: React.PointerEvent) => {
    setFrom(e.clientX)
    const move = (ev: PointerEvent) => setFrom(ev.clientX)
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up) }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  return (
    <section className="wrap grid items-center gap-14 py-24 sm:py-32 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <Kicker>The difference</Kicker>
        <h2 className="display mt-6 text-[clamp(2.8rem,5.5vw,4.8rem)]">
          <Letters text="Small details," /><br /><Letters text="*visible* results" delay={0.2} />
        </h2>
        <FadeUp delay={0.2}>
          <p className="mt-6 max-w-sm text-[16px] leading-relaxed text-cocoa-soft">A lived-in honey balayage with a deep-repair treatment. Slide to see the before and after from the same session.</p>
          <dl className="mt-8 grid max-w-sm grid-cols-2 gap-6 border-t border-cocoa/10 pt-6 text-sm">
            <div><dt className="label">Treatment</dt><dd className="mt-2 font-serif text-xl">Balayage + repair</dd></div>
            <div><dt className="label">Time</dt><dd className="mt-2 font-serif text-xl">3 hours</dd></div>
          </dl>
        </FadeUp>
      </div>

      <motion.div
        ref={box}
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.2, ease }}
        onPointerDown={onDown}
        className="relative aspect-[4/3] cursor-ew-resize select-none overflow-hidden rounded-[24px] bg-blush-light touch-pan-y"
      >
        <img src={img('after')} alt="After" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
        <motion.img src={img('before')} alt="Before" draggable={false} style={{ clipPath: clip }} className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute left-5 top-5 rounded-full bg-cream/85 px-3 py-1 text-[10px] uppercase tracking-[0.25em] backdrop-blur">Before</span>
        <span className="absolute right-5 top-5 rounded-full bg-cocoa/70 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-cream backdrop-blur">After</span>
        <motion.div style={{ left }} className="absolute inset-y-0 w-px -translate-x-1/2 bg-cream">
          <button
            role="slider" aria-label="Compare before and after" aria-valuemin={0} aria-valuemax={100} aria-valuenow={val}
            onKeyDown={(e) => {
              const d = e.key === 'ArrowLeft' ? -5 : e.key === 'ArrowRight' ? 5 : 0
              if (d) { const p = Math.max(0, Math.min(100, raw.get() + d)); raw.set(p); setVal(Math.round(p)) }
            }}
            className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cream text-cocoa shadow-xl"
          >
            <MoveHorizontal className="h-5 w-5" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}
