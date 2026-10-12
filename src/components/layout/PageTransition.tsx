import { motion } from 'framer-motion'
import { createContext, useContext, type ReactNode } from 'react'
import { easeSoft } from '../../lib/motion'
import { Monogram } from '../ui/Logo'

/**
 * "Arch veil": a blush panel with arched top and bottom edges glides up over the page,
 * shows the monogram and the next page's name, then continues upward to reveal it.
 */
/** Name of the page being navigated TO, so the veil can announce it while the old page leaves. */
export const NextLabel = createContext('')

export default function PageTransition({ children }: { children: ReactNode }) {
  const label = useContext(NextLabel)
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.45 } }}
        exit={{ opacity: 0.4, y: -40, scale: 0.98, transition: { duration: 0.8, ease: easeSoft } }}
      >
        {children}
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-[-10vw] top-0 z-[90] flex h-[140vh] w-[120vw] items-center justify-center bg-blush"
        style={{ borderRadius: '50% 50% 50% 50% / 14vh 14vh 14vh 14vh' }}
        initial={{ y: '-20vh' }}
        animate={{ y: '-165vh', transition: { duration: 1.05, ease: easeSoft, delay: 0.15 } }}
        exit={{ y: ['105vh', '-20vh'], transition: { duration: 0.85, ease: easeSoft } }}
      >
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, transition: { duration: 0.3 } }}
          exit={{ opacity: [0, 1], transition: { duration: 0.4, delay: 0.45 } }}
        >
          <Monogram className="h-16 w-16 text-[26px]" />
          <span className="mt-4 font-serif text-3xl italic text-cocoa">{label}</span>
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-[-10vw] top-0 z-[89] h-[140vh] w-[120vw] bg-gold-light/70"
        style={{ borderRadius: '50% 50% 50% 50% / 14vh 14vh 14vh 14vh' }}
        initial={{ y: '-20vh' }}
        animate={{ y: '-165vh', transition: { duration: 1.05, ease: easeSoft, delay: 0.25 } }}
        exit={{ y: ['105vh', '-20vh'], transition: { duration: 0.85, ease: easeSoft, delay: 0.06 } }}
      />
    </>
  )
}
