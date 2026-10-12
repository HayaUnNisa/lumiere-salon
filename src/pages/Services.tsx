import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import PageHeader from '../components/ui/PageHeader'
import { FadeUp, Kicker } from '../components/ui/Reveal'
import { useBooking } from '../context/BookingContext'
import { img } from '../data/images'
import { categories, faqs, mins, sar } from '../data/site'
import { ease } from '../lib/motion'

export default function Services() {
  const { open } = useBooking()
  const lenis = useLenis()
  const { hash } = useLocation()
  const [active, setActive] = useState(categories[0].id)
  const [faq, setFaq] = useState<number | null>(0)

  // highlight the category currently in view
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    categories.forEach((c) => { const el = document.getElementById(c.id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  const jump = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -110, duration: 1.4 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => { if (hash) { const t = setTimeout(() => jump(hash.slice(1)), 1300); return () => clearTimeout(t) } }, [hash]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <PageHeader kicker="Services & prices" line1="The" line2="*menu*" image={img('svc-hair')} text="Every treatment includes a consultation, so we understand what you want before we begin. Prices are in Saudi riyals." />

      <section className="wrap grid gap-12 pb-24 lg:grid-cols-[220px_1fr] lg:gap-20">
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <nav aria-label="Service categories" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:gap-1 lg:px-0">
            {categories.map((c, i) => (
              <button key={c.id} onClick={() => jump(c.id)} className={`relative flex shrink-0 items-baseline gap-3 rounded-full px-4 py-2 text-left transition-colors lg:rounded-none lg:px-0 lg:py-2 ${active === c.id ? 'text-cocoa' : 'text-cocoa-mute hover:text-cocoa'}`}>
                <span className="hidden font-serif text-sm italic lg:inline">0{i + 1}</span>
                <span className={`font-serif text-2xl transition-all duration-500 lg:text-3xl ${active === c.id ? 'italic text-rose lg:translate-x-2' : ''}`}>{c.title}</span>
                {active === c.id && <motion.span layoutId="svc-mark" className="absolute inset-0 -z-10 rounded-full bg-blush lg:hidden" />}
              </button>
            ))}
          </nav>
          <button onClick={() => open()} className="btn btn-fill btn-dark mt-10 hidden lg:inline-flex"><span>Book now</span></button>
        </aside>

        <div className="space-y-24">
          {categories.map((c) => (
            <section key={c.id} id={c.id} className="scroll-mt-32">
              <div className="grid items-end gap-8 sm:grid-cols-[1fr_180px]">
                <FadeUp>
                  <p className="label">{c.kicker}</p>
                  <h2 className="display mt-3 text-6xl">{c.title}</h2>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-cocoa-soft">{c.blurb}</p>
                </FadeUp>
                <motion.div initial={{ clipPath: 'inset(100% 0 0 0 round 999px 999px 0 0)' }} whileInView={{ clipPath: 'inset(0% 0 0 0 round 999px 999px 0 0)' }} viewport={{ once: true }} transition={{ duration: 1.3, ease }} className="hidden aspect-[3/4] overflow-hidden sm:block">
                  <img src={c.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                </motion.div>
              </div>
              <ul className="mt-10 border-t border-cocoa/15">
                {c.services.map((s, i) => (
                  <motion.li key={s.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.8, ease, delay: i * 0.05 }} className="group border-b border-cocoa/15">
                    <button onClick={() => open({ service: s.id })} className="flex w-full items-center gap-4 py-5 text-left">
                      <span className="flex-1">
                        <span className="flex items-baseline">
                          <span className="font-serif text-[1.55rem] leading-tight transition-all duration-500 group-hover:translate-x-2 group-hover:italic group-hover:text-rose">{s.name}</span>
                          <span className="leader hidden sm:block" />
                          <span className="ml-auto shrink-0 pl-4 text-[15px] text-cocoa sm:ml-0 sm:pl-0">{s.from && <span className="mr-1 text-[10px] uppercase tracking-wider text-cocoa-mute">from</span>}{sar(s.price)}</span>
                        </span>
                        <span className="mt-1 block text-xs text-cocoa-mute">{mins(s.duration)}{s.note ? ` · ${s.note}` : ''}</span>
                      </span>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cocoa/15 transition-all duration-500 group-hover:rotate-90 group-hover:border-rose group-hover:bg-rose group-hover:text-cream" aria-hidden="true"><Plus className="h-4 w-4" /></span>
                      <span className="sr-only">Book {s.name}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="bg-cream-2 py-24 sm:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Kicker>Good to know</Kicker>
            <h2 className="display mt-6 text-[clamp(2.6rem,5vw,4.4rem)]">Questions, <em className="text-rose">answered</em></h2>
          </div>
          <div className="border-t border-cocoa/15">
            {faqs.map((f, i) => {
              const on = faq === i
              return (
                <div key={f.q} className="border-b border-cocoa/15">
                  <button onClick={() => setFaq(on ? null : i)} aria-expanded={on} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                    <span className={`font-serif text-2xl transition-colors ${on ? 'italic text-rose' : ''}`}>{f.q}</span>
                    <motion.span animate={{ rotate: on ? 45 : 0 }} className="shrink-0"><Plus className="h-5 w-5" /></motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease }} className="overflow-hidden">
                        <p className="max-w-xl pb-6 text-[15px] leading-relaxed text-cocoa-soft">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
