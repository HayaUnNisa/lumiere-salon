import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { ease } from '../../lib/motion'

/**
 * Letters rise one by one from behind a mask, with a slight italic skew settling upright.
 * Wrap a word in *asterisks* to set it in rose italic.
 */
export function Letters({ text, className = '', delay = 0, immediate, stagger = 0.025 }: { text: string; className?: string; delay?: number; immediate?: boolean; stagger?: number }) {
  const words = text.split(' ')
  let i = 0
  const trigger = immediate ? { initial: 'h', animate: 's' } : { initial: 'h', whileInView: 's', viewport: { once: true, amount: 0.6 } }
  return (
    <span className={className} aria-label={text.replace(/\*/g, '')} role="text">
      <motion.span {...trigger} aria-hidden="true" className="inline">
        {words.map((raw, wi) => {
          const accent = raw.startsWith('*')
          const w = raw.replace(/\*/g, '')
          return (
            <span key={wi} className={`inline-block whitespace-nowrap ${accent ? 'italic text-rose' : ''}`}>
              {w.split('').map((ch, ci) => {
                const n = i++
                return (
                  <span key={ci} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                    <motion.span
                      className="inline-block will-change-transform"
                      variants={{ h: { y: '110%', skewY: 8 }, s: { y: '0%', skewY: 0, transition: { duration: 1.1, ease, delay: delay + n * stagger } } }}
                    >
                      {ch}
                    </motion.span>
                  </span>
                )
              })}
              {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          )
        })}
      </motion.span>
    </span>
  )
}

export function FadeUp({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 1.1, ease, delay }}>
      {children}
    </motion.div>
  )
}

export function Kicker({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className={`flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.32em] ${light ? 'text-cream/70' : 'text-cocoa-mute'}`}
    >
      <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }} className={`block h-px w-10 origin-left ${light ? 'bg-gold-light' : 'bg-gold'}`} />
      {children}
    </motion.p>
  )
}
