import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Check, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useLenis } from 'lenis/react'
import { useBooking } from '../../context/BookingContext'
import { allServices, brand, categories, mins, sar, team } from '../../data/site'
import { fmt12, riyadhNow } from '../../lib/hours'
import { ease, easeSoft } from '../../lib/motion'
import { openWhatsApp } from '../../lib/whatsapp'

const steps = ['Services', 'Specialist', 'Date & time', 'Your details']

function nextDays(n: number) {
  const out: Date[] = []
  const d = new Date()
  for (let i = 0; i < n; i++) out.push(new Date(d.getFullYear(), d.getMonth(), d.getDate() + i))
  return out
}
const toMin = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m }
const toTime = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`

export default function BookingDrawer() {
  const { isOpen, preset, close } = useBooking()
  const lenis = useLenis()
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [cat, setCat] = useState(categories[0].id)
  const [picked, setPicked] = useState<string[]>([])
  const [stylist, setStylist] = useState<string>('any')
  const [dayIdx, setDayIdx] = useState(0)
  const [time, setTime] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [err, setErr] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    setPicked(preset.services); setStylist(preset.stylist ?? 'any'); setSent(false); setErr(null); setTime(null)
    const first = allServices.find((s) => s.id === preset.services[0])
    if (first) setCat(categories.find((c) => c.title === first.category)!.id)
    setStep(preset.services.length ? (preset.stylist ? 2 : 1) : 0)
  }, [isOpen, preset])

  useEffect(() => {
    if (isOpen) { lenis?.stop(); document.documentElement.style.overflow = 'hidden' }
    else { lenis?.start(); document.documentElement.style.overflow = '' }
    const k = (e: KeyboardEvent) => e.key === 'Escape' && close()
    if (isOpen) document.addEventListener('keydown', k)
    return () => document.removeEventListener('keydown', k)
  }, [isOpen, lenis, close])

  const chosen = allServices.filter((s) => picked.includes(s.id))
  const total = chosen.reduce((a, s) => a + s.price, 0)
  const duration = chosen.reduce((a, s) => a + s.duration, 0)
  const anyFrom = chosen.some((s) => s.from)
  const days = useMemo(() => nextDays(14), [])
  const day = days[dayIdx]
  const hours = brand.hours.find((h) => h.day === day.getDay())

  const slots = useMemo(() => {
    if (!hours) return []
    const out: string[] = []
    const end = toMin(hours.close) - Math.max(30, Math.min(duration, 120))
    const now = riyadhNow()
    for (let m = toMin(hours.open); m <= end; m += 30) {
      if (dayIdx === 0 && m <= now.minutes + 30) continue
      out.push(toTime(m))
    }
    return out
  }, [hours, duration, dayIdx])

  const go = (n: number) => {
    setErr(null)
    if (n > step) {
      if (step === 0 && !picked.length) return setErr('Choose at least one service.')
      if (step === 2 && !time) return setErr('Choose a time.')
    }
    setDir(n > step ? 1 : -1); setStep(n)
  }

  const submit = () => {
    if (name.trim().length < 2) return setErr('Please enter your name.')
    if (!/^(\+?966|0)?5\d{8}$/.test(phone.replace(/[\s-]/g, ''))) return setErr('Enter a Saudi mobile number, e.g. 05X XXX XXXX.')
    const who = stylist === 'any' ? 'First available' : team.find((t) => t.id === stylist)?.name
    openWhatsApp(
      `Hello ${brand.name}, I'd like to book:\n\n${chosen.map((s) => `• ${s.name} (${mins(s.duration)}, ${s.from ? 'from ' : ''}${sar(s.price)})`).join('\n')}\n\nSpecialist: ${who}\nDate: ${day.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}\nTime: ${fmt12(time!)}\n\nName: ${name}\nMobile: ${phone}${notes ? `\nNotes: ${notes}` : ''}`,
    )
    setSent(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Book an appointment">
          <motion.div className="absolute inset-0 bg-cocoa/40 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
          <motion.aside
            data-lenis-prevent
            initial={{ x: '100%', borderTopLeftRadius: '50vw', borderBottomLeftRadius: '50vw' }}
            animate={{ x: 0, borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}
            exit={{ x: '100%', borderTopLeftRadius: '50vw', borderBottomLeftRadius: '50vw' }}
            transition={{ duration: 0.8, ease: easeSoft }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[540px] flex-col overflow-hidden bg-cream"
            style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <header className="flex items-center justify-between px-6 pt-6 sm:px-9">
              {step > 0 && !sent ? (
                <button onClick={() => go(step - 1)} className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-cocoa-soft hover:text-cocoa"><ArrowLeft className="h-4 w-4" /> Back</button>
              ) : <span className="label">Reservation</span>}
              <button onClick={close} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full border border-cocoa/15 transition hover:rotate-90 hover:border-cocoa"><X className="h-4 w-4" /></button>
            </header>

            {sent ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="flex flex-1 flex-col items-center justify-center px-9 text-center">
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.2 }} className="grid h-20 w-20 place-items-center rounded-full bg-blush">
                  <Check className="h-8 w-8 text-rose" />
                </motion.span>
                <h2 className="display mt-8 text-5xl">Almost <em className="text-rose">there</em></h2>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-cocoa-soft">Your request is ready in WhatsApp. Press send and we’ll confirm your appointment shortly.</p>
                <div className="mt-10 flex gap-3">
                  <button onClick={submit} className="btn btn-line">Open again</button>
                  <button onClick={close} className="btn btn-dark">Done</button>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="px-6 pt-8 sm:px-9">
                  <p className="label">Step {step + 1} of 4</p>
                  <h2 className="display mt-3 text-[2.6rem]">{['Choose your *treatments*', 'Who would you *like*?', 'Pick a *moment*', 'Almost *done*'][step].split('*').map((p, i) => i % 2 ? <em key={i} className="text-rose">{p}</em> : p)}</h2>
                  <div className="mt-6 flex gap-1.5">
                    {steps.map((s, i) => (
                      <div key={s} className="h-[2px] flex-1 overflow-hidden rounded bg-cocoa/10">
                        <motion.div className="h-full bg-rose" initial={false} animate={{ width: i <= step ? '100%' : '0%' }} transition={{ duration: 0.6, ease }} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative flex-1 overflow-y-auto px-6 py-7 sm:px-9">
                  <AnimatePresence mode="wait" custom={dir} initial={false}>
                    <motion.div
                      key={step}
                      custom={dir}
                      variants={{ in: (d: number) => ({ opacity: 0, x: d * 40 }), c: { opacity: 1, x: 0 }, out: (d: number) => ({ opacity: 0, x: d * -40 }) }}
                      initial="in" animate="c" exit="out"
                      transition={{ duration: 0.45, ease }}
                    >
                      {step === 0 && (
                        <>
                          <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 sm:-mx-9 sm:px-9">
                            {categories.map((c) => (
                              <button key={c.id} onClick={() => setCat(c.id)} className={`relative shrink-0 rounded-full px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em] transition-colors ${cat === c.id ? 'text-cream' : 'text-cocoa-soft hover:text-cocoa'}`}>
                                {cat === c.id && <motion.span layoutId="bk-cat" className="absolute inset-0 rounded-full bg-cocoa" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                                <span className="relative">{c.title}</span>
                              </button>
                            ))}
                          </div>
                          <ul className="mt-5 divide-y divide-cocoa/10">
                            {categories.find((c) => c.id === cat)!.services.map((s) => {
                              const on = picked.includes(s.id)
                              return (
                                <li key={s.id}>
                                  <button onClick={() => setPicked((p) => (on ? p.filter((x) => x !== s.id) : [...p, s.id]))} className="group flex w-full items-center gap-4 py-4 text-left" aria-pressed={on}>
                                    <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all ${on ? 'border-rose bg-rose text-cream' : 'border-cocoa/25 group-hover:border-cocoa'}`}>
                                      <AnimatePresence>{on && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check className="h-3.5 w-3.5" /></motion.span>}</AnimatePresence>
                                    </span>
                                    <span className="flex-1">
                                      <span className="block font-serif text-xl leading-tight">{s.name}</span>
                                      <span className="text-xs text-cocoa-mute">{mins(s.duration)}{s.note ? ` · ${s.note}` : ''}</span>
                                    </span>
                                    <span className="text-sm text-cocoa-soft">{s.from && <span className="text-[10px] uppercase tracking-wider text-cocoa-mute">from </span>}{sar(s.price)}</span>
                                  </button>
                                </li>
                              )
                            })}
                          </ul>
                        </>
                      )}

                      {step === 1 && (
                        <div className="grid grid-cols-2 gap-3">
                          {[{ id: 'any', name: 'First available', role: 'Any specialist', image: '' }, ...team].map((t) => {
                            const on = stylist === t.id
                            return (
                              <button key={t.id} onClick={() => setStylist(t.id)} className={`group relative overflow-hidden rounded-[999px_999px_14px_14px] border text-left transition ${on ? 'border-rose' : 'border-cocoa/10 hover:border-cocoa/30'}`}>
                                <div className="aspect-[4/5] overflow-hidden bg-blush-light">
                                  {t.image ? <img src={t.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /> : <div className="grid h-full place-items-center font-serif text-5xl italic text-rose">any</div>}
                                </div>
                                <div className="p-3">
                                  <p className="font-serif text-lg leading-tight">{t.name}</p>
                                  <p className="text-[11px] text-cocoa-mute">{t.role}</p>
                                </div>
                                {on && <motion.span layoutId="bk-sty" className="absolute right-3 top-[45%] grid h-7 w-7 place-items-center rounded-full bg-rose text-cream"><Check className="h-4 w-4" /></motion.span>}
                              </button>
                            )
                          })}
                        </div>
                      )}

                      {step === 2 && (
                        <>
                          <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 sm:-mx-9 sm:px-9">
                            {days.map((d, i) => {
                              const on = i === dayIdx
                              return (
                                <button key={i} onClick={() => { setDayIdx(i); setTime(null) }} className={`relative flex h-[84px] w-16 shrink-0 flex-col items-center justify-center rounded-full transition-colors ${on ? 'text-cream' : 'text-cocoa hover:bg-blush-light'}`}>
                                  {on && <motion.span layoutId="bk-day" className="absolute inset-0 rounded-full bg-cocoa" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                                  <span className="relative text-[10px] uppercase tracking-[0.18em] opacity-70">{i === 0 ? 'Today' : d.toLocaleDateString('en-GB', { weekday: 'short' })}</span>
                                  <span className="relative font-serif text-2xl">{d.getDate()}</span>
                                  <span className="relative text-[10px] opacity-60">{d.toLocaleDateString('en-GB', { month: 'short' })}</span>
                                </button>
                              )
                            })}
                          </div>
                          <p className="label mt-7">{hours ? `${fmt12(hours.open)} – ${fmt12(hours.close)}` : 'Closed'}</p>
                          {slots.length ? (
                            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                              {slots.map((t, i) => (
                                <motion.button
                                  key={t + dayIdx}
                                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.015 }}
                                  onClick={() => setTime(t)}
                                  className={`rounded-full border py-2.5 text-sm transition ${time === t ? 'border-rose bg-rose text-cream' : 'border-cocoa/15 hover:border-cocoa'}`}
                                >
                                  {fmt12(t)}
                                </motion.button>
                              ))}
                            </div>
                          ) : <p className="mt-4 text-sm text-cocoa-soft">No times left today. Please choose another day.</p>}
                          <p className="mt-6 text-xs text-cocoa-mute">Times are requests. We confirm availability on WhatsApp.</p>
                        </>
                      )}

                      {step === 3 && (
                        <div className="space-y-6">
                          <label className="block"><span className="label">Full name</span><input className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
                          <label className="block"><span className="label">Mobile number</span><input className="field" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" placeholder="05X XXX XXXX" /></label>
                          <label className="block"><span className="label">Notes (optional)</span><textarea rows={2} className="field resize-none" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Hair length, allergies, inspiration…" /></label>
                          <div className="rounded-[20px] bg-blush-light p-5 text-sm">
                            <p className="font-serif text-xl">{day.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })} · {time && fmt12(time)}</p>
                            <p className="mt-1 text-cocoa-soft">with {stylist === 'any' ? 'first available specialist' : team.find((t) => t.id === stylist)?.name}</p>
                            <ul className="mt-3 space-y-1 text-cocoa-soft">{chosen.map((s) => <li key={s.id}>{s.name}</li>)}</ul>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <footer className="border-t border-cocoa/10 px-6 py-5 sm:px-9">
                  <AnimatePresence>{err && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-3 text-sm text-rose-dark">{err}</motion.p>}</AnimatePresence>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-cocoa-mute">{chosen.length ? `${chosen.length} treatment${chosen.length > 1 ? 's' : ''} · ${mins(duration)}` : 'Nothing selected yet'}</p>
                      <p className="font-serif text-2xl">{anyFrom && <span className="text-sm">from </span>}{sar(total)}</p>
                    </div>
                    {step < 3 ? (
                      <button onClick={() => go(step + 1)} className="btn btn-fill btn-dark"><span>Continue</span></button>
                    ) : (
                      <button onClick={submit} className="btn btn-fill btn-dark"><span>Request booking</span></button>
                    )}
                  </div>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
