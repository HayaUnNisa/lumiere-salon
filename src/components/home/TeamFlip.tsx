import { motion } from 'framer-motion'
import { useState } from 'react'
import { useBooking } from '../../context/BookingContext'
import type { Stylist } from '../../data/site'
import { ease } from '../../lib/motion'

/** Portrait on the front; hover (or tap) turns the card to reveal her story. */
export default function TeamFlip({ s, i }: { s: Stylist; i: number }) {
  const [flipped, setFlipped] = useState(false)
  const { open } = useBooking()
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.1, ease, delay: i * 0.1 }}
      className={`[perspective:1400px] ${i % 2 ? 'lg:mt-16' : ''}`}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setFlipped(true)} onPointerLeave={(e) => e.pointerType === 'mouse' && setFlipped(false)}
    >
      <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 1, ease }} className="relative aspect-[3/4] [transform-style:preserve-3d]">
        <button onClick={() => setFlipped((f) => !f)} aria-label={`About ${s.name}`} className="absolute inset-0 overflow-hidden rounded-[999px_999px_20px_20px] bg-blush-light [backface-visibility:hidden]">
          <img src={s.image} alt={s.name} loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa/70 to-transparent p-6 pt-16 text-left text-cream">
            <p className="font-serif text-3xl">{s.name}</p>
            <p className="text-[11px] uppercase tracking-[0.25em] text-cream/75">{s.role}</p>
          </div>
        </button>
        <div className="absolute inset-0 flex flex-col justify-between rounded-[999px_999px_20px_20px] bg-blush px-7 pb-7 pt-24 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="text-center">
            <p className="font-serif text-sm italic text-rose">{s.years} years</p>
            <p className="mt-1 font-serif text-4xl">{s.name}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-cocoa-soft">{s.bio}</p>
            <ul className="mt-5 flex flex-wrap justify-center gap-2">
              {s.specialties.map((x) => <li key={x} className="rounded-full border border-cocoa/15 px-3 py-1 text-[11px] text-cocoa-soft">{x}</li>)}
            </ul>
          </div>
          <button onClick={() => open({ stylist: s.id })} className="btn btn-fill btn-dark w-full"><span>Book with {s.name}</span></button>
        </div>
      </motion.div>
    </motion.div>
  )
}
