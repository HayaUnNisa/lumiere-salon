import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { looks } from '../../data/site'
import { Kicker } from '../ui/Reveal'

const heights = ['h-[62vh]', 'h-[52vh]', 'h-[66vh]', 'h-[50vh]', 'h-[60vh]', 'h-[54vh]']

/**
 * Pinned "lookbook": the section holds still while vertical scrolling slides the looks sideways.
 * Each card tilts slightly according to scroll speed.
 */
export default function Looks() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  useEffect(() => {
    const measure = () => { if (track.current) setDistance(track.current.scrollWidth - window.innerWidth) }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -distance]), { stiffness: 120, damping: 30, mass: 0.4 })
  const velocity = useVelocity(scrollYProgress)
  const skew = useSpring(useTransform(velocity, [-0.6, 0, 0.6], [5, 0, -5], { clamp: true }), { stiffness: 200, damping: 30 })
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={section} className="relative bg-cocoa text-cream" style={{ height: `calc(100vh + ${Math.max(distance, 0)}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="wrap flex items-end justify-between gap-6">
          <div>
            <Kicker light>Lookbook</Kicker>
            <h2 className="display mt-5 text-[clamp(2.6rem,5vw,4.4rem)]">Signature <em className="text-blush">looks</em></h2>
          </div>
          <div className="hidden w-48 sm:block">
            <div className="h-px w-full bg-cream/15"><motion.div style={{ width: bar }} className="h-px bg-blush" /></div>
            <p className="mt-3 text-right text-[11px] uppercase tracking-[0.25em] text-cream/50">Scroll to browse</p>
          </div>
        </div>
        <motion.div ref={track} style={{ x }} className="mt-12 flex w-max items-end gap-8 pl-5 pr-[10vw] sm:pl-8 lg:pl-[max(3rem,calc((100vw-1280px)/2+3rem))]">
          {looks.map((l, i) => (
            <motion.figure key={l.title} style={{ skewX: skew }} className="group w-[68vw] shrink-0 sm:w-[34vw] lg:w-[24vw]">
              <div className={`relative overflow-hidden ${heights[i % heights.length]} ${i % 2 ? 'rounded-[24px]' : 'rounded-[999px_999px_24px_24px]'}`}>
                <img src={l.image} alt={l.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
              </div>
              <figcaption className="mt-5 flex items-baseline justify-between gap-4">
                <span className="font-serif text-3xl font-light">{l.title}</span>
                <span className="text-[11px] uppercase tracking-[0.25em] text-cream/50">by {l.by}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
