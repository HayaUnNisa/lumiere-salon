import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, sar } from '../../data/site'
import { ease } from '../../lib/motion'
import { Kicker, Letters } from '../ui/Reveal'

/** Five tall panels; the hovered (or tapped) one widens and tells its story. */
export default function ServicePanels() {
  const [active, setActive] = useState(0)
  return (
    <section className="bg-cream-2 py-24 sm:py-32">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Kicker>The menu</Kicker>
            <h2 className="display mt-6 text-[clamp(2.8rem,6vw,5.2rem)]">
              <Letters text="Five ways to" /><br /><Letters text="*feel* like yourself" delay={0.2} />
            </h2>
          </div>
          <Link to="/services" className="group flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.22em]">
            <span className="underline-draw pb-1">Full menu & prices</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* desktop: expanding panels */}
        <div className="mt-16 hidden h-[600px] gap-3 lg:flex">
          {categories.map((c, i) => {
            const on = active === i
            const from = Math.min(...c.services.map((s) => s.price))
            return (
              <motion.div
                key={c.id}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                animate={{ flexGrow: on ? 5 : 1 }}
                transition={{ duration: 0.9, ease }}
                className="relative basis-0 overflow-hidden rounded-[999px_999px_20px_20px] bg-blush-light"
              >
                <Link to={`/services#${c.id}`} className="absolute inset-0" aria-label={`${c.title} services`}>
                  <motion.img src={c.image} alt="" animate={{ scale: on ? 1 : 1.25 }} transition={{ duration: 1.2, ease }} className="absolute inset-0 h-full w-full object-cover" />
                  <motion.div animate={{ opacity: on ? 1 : 0.55 }} className="absolute inset-0 bg-gradient-to-t from-cocoa/80 via-cocoa/15 to-transparent" />
                  {/* collapsed label */}
                  <motion.span animate={{ opacity: on ? 0 : 1 }} transition={{ duration: 0.4 }} className="absolute bottom-10 left-1/2 origin-center -translate-x-1/2 -rotate-90 whitespace-nowrap font-serif text-4xl italic text-cream">
                    {c.title}
                  </motion.span>
                  <AnimatePresence>
                    {on && (
                      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.7, ease, delay: 0.25 }} className="absolute inset-x-0 bottom-0 p-9 text-cream">
                        <p className="text-[11px] uppercase tracking-[0.3em] text-cream/70">0{i + 1} · {c.kicker}</p>
                        <h3 className="mt-3 text-6xl font-light">{c.title}</h3>
                        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-cream/80">{c.blurb}</p>
                        <p className="mt-5 inline-flex items-center gap-2 border-b border-cream/40 pb-1 text-[12px] uppercase tracking-[0.2em]">From {sar(from)} <ArrowUpRight className="h-4 w-4" /></p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* mobile: stacked cards */}
        <div className="mt-12 grid gap-4 lg:hidden">
          {categories.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, ease }}>
              <Link to={`/services#${c.id}`} className="relative block h-72 overflow-hidden rounded-[160px_160px_18px_18px]">
                <img src={c.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-cream/70">0{i + 1} · {c.kicker}</p>
                  <h3 className="mt-1 text-4xl">{c.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
