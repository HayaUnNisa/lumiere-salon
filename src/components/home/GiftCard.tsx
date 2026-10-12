import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { brand } from '../../data/site'
import { openWhatsApp } from '../../lib/whatsapp'
import Button from '../ui/Button'
import { FadeUp, Kicker, Letters } from '../ui/Reveal'

/** A gift card that tilts toward the cursor with a moving satin sheen. */
export default function GiftCard() {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [12, -12]), { stiffness: 150, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-16, 16]), { stiffness: 150, damping: 18 })
  const sx = useTransform(mx, (v) => `${v * 100}%`)
  const sy = useTransform(my, (v) => `${v * 100}%`)
  const sheen = useMotionTemplate`radial-gradient(circle at ${sx} ${sy}, rgba(255,255,255,.55), rgba(255,255,255,0) 45%)`

  return (
    <section className="wrap grid items-center gap-16 py-24 sm:py-32 lg:grid-cols-2">
      <div
        className="order-2 flex justify-center [perspective:1200px] lg:order-1"
        onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width); my.set((e.clientY - r.top) / r.height) }}
        onPointerLeave={() => { mx.set(0.5); my.set(0.5) }}
      >
        <motion.div
          style={{ rotateX: rx, rotateY: ry }}
          initial={{ opacity: 0, rotateZ: -8, y: 40 }} whileInView={{ opacity: 1, rotateZ: -4, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[1.6/1] w-full max-w-[460px] overflow-hidden rounded-[22px] bg-gradient-to-br from-blush via-blush-light to-gold-light p-7 shadow-[0_40px_80px_-30px_rgba(46,33,29,.45)] sm:p-9"
        >
          <motion.div className="pointer-events-none absolute inset-0" style={{ background: sheen }} />
          <svg className="absolute -right-10 -top-10 h-56 w-56 opacity-40" viewBox="0 0 100 100" aria-hidden="true"><path d="M10 100V45a40 40 0 0 1 80 0v55" fill="none" stroke="#B8956A" strokeWidth=".6" /><path d="M22 100V47a28 28 0 0 1 56 0v53" fill="none" stroke="#B8956A" strokeWidth=".6" /></svg>
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="font-serif text-3xl">{brand.name}</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-cocoa-soft">Gift card</span>
            </div>
            <div>
              <p className="font-serif text-sm italic text-cocoa-soft">A gift of</p>
              <p className="font-serif text-4xl font-light sm:text-5xl">An hour for you</p>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="order-1 lg:order-2">
        <Kicker>The perfect gift</Kicker>
        <h2 className="display mt-6 text-[clamp(2.8rem,5.5vw,4.8rem)]"><Letters text="Give her" /><br /><Letters text="a *moment*" delay={0.2} /></h2>
        <FadeUp delay={0.2}>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-cocoa-soft">Gift cards in any amount or for a chosen treatment, beautifully wrapped and ready the same day. Perfect for Eid, birthdays and brides-to-be.</p>
          <div className="mt-9"><Button onClick={() => openWhatsApp(`Hello ${brand.name}, I'd like to order a gift card.`)}>Order a gift card</Button></div>
        </FadeUp>
      </div>
    </section>
  )
}
