import { AnimatePresence, motion } from 'framer-motion'
import { Check, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import ArchImage from '../components/ui/ArchImage'
import PageHeader from '../components/ui/PageHeader'
import { FadeUp, Kicker } from '../components/ui/Reveal'
import { useBooking } from '../context/BookingContext'
import { img } from '../data/images'
import { brand } from '../data/site'
import { fmt12, openStatus } from '../lib/hours'
import { ease } from '../lib/motion'
import { openWhatsApp } from '../lib/whatsapp'

const topics = ['Appointment', 'Bridal', 'Gift card', 'Something else']

export default function Contact() {
  const { open } = useBooking()
  const status = openStatus()
  const [f, setF] = useState({ name: '', phone: '', topic: topics[0], message: '' })
  const [err, setErr] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const x: Record<string, string> = {}
    if (f.name.trim().length < 2) x.name = 'Please enter your name.'
    if (!/^(\+?966|0)?5\d{8}$/.test(f.phone.replace(/[\s-]/g, ''))) x.phone = 'Enter a Saudi mobile number, e.g. 05X XXX XXXX.'
    if (f.message.trim().length < 4) x.message = 'Tell us a little more.'
    setErr(x)
    if (Object.keys(x).length) return
    openWhatsApp(`Hello ${brand.name},\n\nTopic: ${f.topic}\nName: ${f.name}\nMobile: ${f.phone}\n\n${f.message}`)
    setSent(true)
  }
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setF((p) => ({ ...p, [k]: e.target.value })); setErr((p) => ({ ...p, [k]: '' })) }

  const cards = [
    { icon: MapPin, label: 'Address', value: brand.address },
    { icon: Phone, label: 'Phone', value: brand.phone, href: `tel:${brand.phone.replace(/\s/g, '')}` },
    { icon: Mail, label: 'Email', value: brand.email, href: `mailto:${brand.email}` },
    { icon: Clock, label: 'Today', value: status.text },
  ]

  return (
    <>
      <PageHeader kicker="Visit us" line1="Come" line2="*say hello*" image={img('contact')} text="Book online, send us a message, or simply drop by. We’d love to welcome you." />

      <section className="wrap pb-24">
        <div className="grid gap-px overflow-hidden rounded-[22px] border border-cocoa/10 bg-cocoa/10 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => {
            const body = (
              <>
                <c.icon className="h-5 w-5 text-rose" strokeWidth={1.5} />
                <p className="label mt-6">{c.label}</p>
                <p className="mt-2 font-serif text-xl leading-snug">{c.value}</p>
              </>
            )
            return (
              <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease, delay: i * 0.08 }} className="bg-cream">
                {c.href ? <a href={c.href} className="block h-full p-7 transition-colors hover:bg-blush-light">{body}</a> : <div className="h-full p-7">{body}</div>}
              </motion.div>
            )
          })}
        </div>

        <div className="mt-24 grid gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <Kicker>Send a message</Kicker>
            <h2 className="display mt-6 text-[clamp(2.6rem,5vw,4.2rem)]">We reply <em className="text-rose">within the hour</em></h2>
            <p className="mt-4 max-w-sm text-cocoa-soft">During opening hours. Your message opens in WhatsApp, ready to send.</p>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="ok" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-12 rounded-[22px] bg-blush-light p-10 text-center">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-cream text-rose"><Check className="h-6 w-6" /></span>
                  <p className="mt-6 font-serif text-3xl">Thank you, {f.name.split(' ')[0]}</p>
                  <p className="mt-2 text-sm text-cocoa-soft">Press send in WhatsApp and we’ll be in touch shortly.</p>
                  <button onClick={() => setSent(false)} className="btn btn-line mt-8">Write another</button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="mt-12 space-y-8">
                  <div>
                    <p className="label">I’m asking about</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {topics.map((t) => (
                        <button type="button" key={t} onClick={() => setF((p) => ({ ...p, topic: t }))} className={`rounded-full border px-4 py-2 text-[13px] transition ${f.topic === t ? 'border-cocoa bg-cocoa text-cream' : 'border-cocoa/15 hover:border-cocoa/40'}`}>{t}</button>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-8 sm:grid-cols-2">
                    <label className="block"><span className="label">Name</span><input className="field" value={f.name} onChange={set('name')} autoComplete="name" />{err.name && <span className="mt-2 block text-xs text-rose-dark">{err.name}</span>}</label>
                    <label className="block"><span className="label">Mobile</span><input className="field" value={f.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" placeholder="05X XXX XXXX" />{err.phone && <span className="mt-2 block text-xs text-rose-dark">{err.phone}</span>}</label>
                  </div>
                  <label className="block"><span className="label">Message</span><textarea rows={4} className="field resize-none" value={f.message} onChange={set('message')} />{err.message && <span className="mt-2 block text-xs text-rose-dark">{err.message}</span>}</label>
                  <div className="flex flex-wrap gap-3">
                    <button type="submit" className="btn btn-fill btn-dark"><span>Send on WhatsApp</span></button>
                    <button type="button" onClick={() => open()} className="btn btn-line hover:bg-cocoa hover:text-cream">Book instead</button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div>
            {brand.mapEmbedUrl ? (
              <iframe src={brand.mapEmbedUrl} title={`${brand.name} location`} loading="lazy" className="aspect-[4/5] w-full rounded-[999px_999px_22px_22px] border-0 grayscale-[.4] sepia-[.2]" />
            ) : (
              <ArchImage src={img('contact')} alt={`${brand.name} entrance`} className="aspect-[4/5] w-full" />
            )}
            <FadeUp>
              <ul className="mt-10 divide-y divide-cocoa/10 border-y border-cocoa/10">
                {brand.hours.map((h) => (
                  <li key={h.day} className={`flex justify-between py-3 text-[15px] ${h.day === status.today ? 'font-medium text-rose' : 'text-cocoa-soft'}`}>
                    <span className="font-serif text-lg">{h.label}{h.day === status.today && <span className="ml-2 text-[10px] uppercase tracking-[0.2em]">today</span>}</span>
                    <span>{fmt12(h.open)} – {fmt12(h.close)}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  )
}
