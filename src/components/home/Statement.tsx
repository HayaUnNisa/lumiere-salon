import { motion } from 'framer-motion'
import { img } from '../../data/images'
import { ease } from '../../lib/motion'
import { FadeUp, Kicker } from '../ui/Reveal'

/** Inline pill images open up between the words as the line comes into view. */
function InlineImg({ src, w, delay, round }: { src: string; w: string; delay: number; round?: boolean }) {
  return (
    <motion.span
      className={`relative mx-2 inline-block h-[0.82em] overflow-hidden align-[-0.06em] ${round ? 'rounded-full' : 'rounded-full'}`}
      initial={{ width: 0 }}
      whileInView={{ width: w }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1.4, ease, delay }}
    >
      <img src={src} alt="" className="absolute inset-0 h-full w-[3em] max-w-none object-cover" style={{ width: w }} />
    </motion.span>
  )
}

const points = [
  ['Women-only', 'A fully private space with an all-female team.'],
  ['Unhurried', 'Appointments are timed so nobody is ever rushed.'],
  ['Considered', 'Professional products chosen for results, not hype.'],
]

export default function Statement() {
  return (
    <section className="wrap py-28 sm:py-40">
      <Kicker>Our philosophy</Kicker>
      <FadeUp>
        <p className="display mt-10 max-w-6xl text-[clamp(2.2rem,5.2vw,4.8rem)] leading-[1.08] text-cocoa">
          We believe beauty should feel <em className="text-rose">calm</em>
          <InlineImg src={img('intro-1')} w="1.9em" delay={0.2} />
          personal, and never rushed. Every visit is a small
          <InlineImg src={img('intro-2')} w="1.4em" delay={0.4} round />
          <em className="text-rose">ritual</em> made just for you.
        </p>
      </FadeUp>
      <div className="mt-20 grid gap-10 border-t border-cocoa/10 pt-10 sm:grid-cols-3">
        {points.map(([t, d], i) => (
          <FadeUp key={t} delay={i * 0.12}>
            <p className="font-serif text-sm italic text-gold">0{i + 1}</p>
            <h3 className="mt-2 text-3xl">{t}</h3>
            <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-cocoa-soft">{d}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
