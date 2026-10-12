import { animate, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import BeforeAfter from '../components/home/BeforeAfter'
import ArchImage from '../components/ui/ArchImage'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import { FadeUp, Kicker, Letters } from '../components/ui/Reveal'
import { img } from '../data/images'
import { brand, categories, team } from '../data/site'
import { ease } from '../lib/motion'

function Count({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => { if (!inView) return; const c = animate(0, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: (x) => setV(Math.round(x)) }); return () => c.stop() }, [inView, to])
  return <span ref={ref}>{v}</span>
}

const values = [
  ['Listen first', 'Every appointment starts with a proper conversation about what you want, and what suits you.'],
  ['Take our time', 'We book generously, so your treatment is never squeezed between two others.'],
  ['Keep it honest', 'If something won’t work for your hair or skin, we’ll tell you, and suggest what will.'],
  ['Care for every detail', 'Clean tools, fresh towels, a quiet room and a cup of something warm.'],
]

export default function About() {
  const [hover, setHover] = useState(0)
  return (
    <>
      <PageHeader kicker="Our story" line1="Made for" line2="*women*" image={img('about')} text={`${brand.name} began with a simple idea: a salon in ${brand.city} that feels as calm and considered as the results it creates.`} />

      <section className="wrap grid items-center gap-16 py-20 lg:grid-cols-2">
        <div className="relative h-[560px]">
          <ArchImage src={img('intro-1')} alt="" className="absolute left-0 top-0 h-[78%] w-[62%]" />
          <ArchImage src={img('intro-2')} alt="" shape="rect" className="absolute bottom-0 right-0 h-[56%] w-[52%] border-[6px] border-cream" delay={0.3} />
        </div>
        <div>
          <Kicker>How it started</Kicker>
          <h2 className="display mt-6 text-[clamp(2.6rem,5vw,4.4rem)]"><Letters text="A quieter kind" /><br /><Letters text="of *salon*" delay={0.2} /></h2>
          <FadeUp delay={0.2}>
            <p className="mt-6 text-[16px] leading-relaxed text-cocoa-soft">Our founder spent years in busy salons where appointments ran over and guests felt rushed. {brand.name} was built to do the opposite: fewer chairs, more time, and a team chosen for their care as much as their skill.</p>
            <p className="mt-4 text-[16px] leading-relaxed text-cocoa-soft">Today we look after hair, nails, makeup, skin and brides from across {brand.city}, in a private, women-only space.</p>
          </FadeUp>
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-cocoa/10 pt-8">
            {[[team.length, 'Specialists'], [categories.length, 'Disciplines'], [categories.reduce((a, c) => a + c.services.length, 0), 'Treatments']].map(([n, l]) => (
              <div key={l as string}><dt className="label">{l}</dt><dd className="mt-2 font-serif text-5xl font-light"><Count to={n as number} /></dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-cocoa py-24 text-cream sm:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Kicker light>What we promise</Kicker>
            <h2 className="display mt-6 text-[clamp(2.6rem,5vw,4.4rem)]">Our <em className="text-blush">values</em></h2>
            <p className="mt-6 max-w-sm text-cream/65">Four promises every member of the team makes to every guest.</p>
          </div>
          <ol className="border-t border-cream/15">
            {values.map(([t, d], i) => (
              <li key={t} onMouseEnter={() => setHover(i)} className="border-b border-cream/15">
                <button onClick={() => setHover(i)} className="flex w-full items-baseline gap-6 py-6 text-left" aria-expanded={hover === i}>
                  <span className="font-serif text-sm italic text-gold-light">0{i + 1}</span>
                  <span className="flex-1">
                    <span className={`block font-serif text-3xl transition-all duration-500 sm:text-4xl ${hover === i ? 'italic text-blush' : 'text-cream/60'}`}>{t}</span>
                    <motion.span initial={false} animate={{ height: hover === i ? 'auto' : 0, opacity: hover === i ? 1 : 0 }} transition={{ duration: 0.6, ease }} className="block overflow-hidden">
                      <span className="block pt-3 text-[15px] leading-relaxed text-cream/70">{d}</span>
                    </motion.span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <BeforeAfter />

      <section className="wrap pb-28 text-center">
        <FadeUp>
          <p className="display text-[clamp(2.4rem,5vw,4.2rem)]">Come and see <em className="text-rose">for yourself.</em></p>
          <div className="mt-10 flex justify-center gap-3">
            <Button to="/contact" variant="line" arrow={false}>Plan your visit</Button>
            <Button to="/services">See the menu</Button>
          </div>
        </FadeUp>
      </section>
    </>
  )
}
