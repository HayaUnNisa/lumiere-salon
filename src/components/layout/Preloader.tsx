import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { brand } from '../../data/site'
import { ease, easeSoft } from '../../lib/motion'

/** The arch draws itself, the monogram settles in, the name is spelled out, then the veil lifts. */
export default function Preloader() {
  const [show, setShow] = useState(true)
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    const t = setTimeout(() => { setShow(false); document.documentElement.style.overflow = '' }, 2300)
    return () => clearTimeout(t)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] grid place-items-center bg-cream"
          exit={{ clipPath: 'ellipse(120% 0% at 50% 0%)' }}
          initial={{ clipPath: 'ellipse(120% 140% at 50% 0%)' }}
          transition={{ duration: 1.1, ease: easeSoft }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center">
            <div className="relative h-28 w-24">
              <svg viewBox="0 0 96 112" className="absolute inset-0 h-full w-full">
                <motion.path d="M8 110V48a40 40 0 0 1 80 0v62" fill="none" stroke="#B8956A" strokeWidth="1.2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease: 'easeInOut' }} />
              </svg>
              <motion.span
                className="absolute inset-x-0 bottom-5 text-center font-serif text-6xl italic text-cocoa"
                initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.1, ease, delay: 0.6 }}
              >
                {brand.monogram}
              </motion.span>
            </div>
            <p className="mt-6 flex font-serif text-3xl tracking-[0.3em] text-cocoa">
              {brand.name.toUpperCase().split('').map((c, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 1 + i * 0.06 }}>{c}</motion.span>
              ))}
            </p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }} className="label mt-3">{brand.tagline} · {brand.city}</motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Hero timings wait for the preloader on first load only. */
export const firstLoad = { done: false }
