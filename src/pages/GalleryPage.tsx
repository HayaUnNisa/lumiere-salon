import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useLenis } from 'lenis/react'
import PageHeader from '../components/ui/PageHeader'
import { img } from '../data/images'
import { gallery } from '../data/site'
import { ease, easeSoft } from '../lib/motion'

const tags = ['All', 'Hair', 'Nails', 'Makeup', 'Space'] as const

export default function GalleryPage() {
  const [tag, setTag] = useState<(typeof tags)[number]>('All')
  const [idx, setIdx] = useState<number | null>(null)
  const lenis = useLenis()
  const items = useMemo(() => (tag === 'All' ? gallery : gallery.filter((g) => g.tag === tag)), [tag])
  const go = (d: number) => setIdx((i) => (i === null ? i : (i + d + items.length) % items.length))

  useEffect(() => {
    if (idx === null) return
    lenis?.stop()
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setIdx(null); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    document.addEventListener('keydown', k)
    return () => { lenis?.start(); document.removeEventListener('keydown', k) }
  }, [idx, lenis]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <PageHeader kicker="Gallery" line1="Inside the" line2="*atelier*" image={img('gallery-1')} text="Recent work from our chairs, and a look around the space where it happens." />
      <section className="wrap pb-28">
        <div role="tablist" aria-label="Filter photos" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          {tags.map((t) => (
            <button key={t} role="tab" aria-selected={tag === t} onClick={() => setTag(t)} className={`relative shrink-0 rounded-full border px-5 py-2 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors ${tag === t ? 'border-cocoa text-cream' : 'border-cocoa/15 text-cocoa-soft hover:border-cocoa/40'}`}>
              {tag === t && <motion.span layoutId="g-tag" className="absolute inset-0 rounded-full bg-cocoa" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-12 columns-2 gap-4 lg:columns-3 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {items.map((g, i) => (
              <motion.button
                layout
                key={g.src + g.alt}
                onClick={() => setIdx(i)}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease, delay: (i % 6) * 0.05 }}
                className={`group relative mb-4 block w-full break-inside-avoid overflow-hidden bg-blush-light lg:mb-6 ${i % 3 === 0 ? 'rounded-[999px_999px_18px_18px]' : 'rounded-[18px]'}`}
                aria-label={`Open photo: ${g.alt}`}
              >
                <img src={g.src} alt={g.alt} loading="lazy" className="w-full transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-end justify-between bg-gradient-to-t from-cocoa/70 to-transparent p-5 pt-12 text-left text-cream transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0">
                  <span className="font-serif text-xl italic">{g.alt}</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-cream/70">{g.tag}</span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <AnimatePresence>
        {idx !== null && items[idx] && (
          <motion.div className="fixed inset-0 z-[110] flex flex-col bg-cocoa/95" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Photo viewer" data-lenis-prevent>
            <div className="flex items-center justify-between p-5 text-cream" style={{ paddingTop: 'max(1.25rem, env(safe-area-inset-top))' }}>
              <span className="font-serif text-xl tabular-nums">{String(idx + 1).padStart(2, '0')} <span className="text-cream/40">/ {String(items.length).padStart(2, '0')}</span></span>
              <button onClick={() => setIdx(null)} aria-label="Close" className="grid h-11 w-11 place-items-center rounded-full border border-cream/25 transition hover:rotate-90 hover:bg-cream hover:text-cocoa"><X className="h-5 w-5" /></button>
            </div>
            <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={items[idx].src + idx}
                  src={items[idx].src} alt={items[idx].alt}
                  initial={{ clipPath: 'inset(100% 0 0 0 round 999px 999px 18px 18px)', opacity: 1 }}
                  animate={{ clipPath: 'inset(0% 0 0 0 round 999px 999px 18px 18px)' }}
                  exit={{ clipPath: 'inset(0 0 100% 0 round 999px 999px 18px 18px)' }}
                  transition={{ duration: 0.8, ease: easeSoft }}
                  drag="x" dragSnapToOrigin
                  onDragEnd={(_, info) => { if (info.offset.x < -80) go(1); else if (info.offset.x > 80) go(-1) }}
                  className="max-h-[74vh] max-w-full cursor-grab object-contain active:cursor-grabbing"
                />
              </AnimatePresence>
              <button onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-5 hidden h-12 w-12 place-items-center rounded-full border border-cream/25 text-cream transition hover:bg-cream hover:text-cocoa sm:grid"><ArrowLeft className="h-5 w-5" /></button>
              <button onClick={() => go(1)} aria-label="Next photo" className="absolute right-5 hidden h-12 w-12 place-items-center rounded-full border border-cream/25 text-cream transition hover:bg-cream hover:text-cocoa sm:grid"><ArrowRight className="h-5 w-5" /></button>
            </div>
            <p className="p-6 text-center font-serif text-2xl italic text-cream" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>{items[idx].alt}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
