import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ease } from '../../lib/motion'

type Props = { src: string; alt: string; className?: string; shape?: 'arch' | 'pill' | 'circle' | 'rect'; parallax?: number; delay?: number; eager?: boolean }

const radius = { arch: '999px 999px 18px 18px', pill: '999px', circle: '50%', rect: '18px' }

/** Image that unveils inside an arch (clip rises from the bottom) and drifts gently on scroll. */
export default function ArchImage({ src, alt, className = '', shape = 'arch', parallax = 8, delay = 0, eager }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`])
  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden bg-blush-light ${className}`}
      style={{ borderRadius: radius[shape] }}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.5, ease, delay }}
    >
      <motion.div className="absolute inset-0" initial={{ scale: 1.3 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 2.2, ease, delay }}>
        <motion.img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          style={{ y, scale: 1 + parallax / 45 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>
    </motion.div>
  )
}
