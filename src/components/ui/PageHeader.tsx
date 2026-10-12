import { motion } from 'framer-motion'
import { ease } from '../../lib/motion'
import { bootDelay } from './boot'
import ArchImage from './ArchImage'
import { Letters } from './Reveal'
import { useState } from 'react'

type Props = { kicker: string; line1: string; line2: string; text: string; image?: string }

export default function PageHeader({ kicker, line1, line2, text, image }: Props) {
  const [D] = useState(() => bootDelay() + 0.15)
  return (
    <section className="wrap grid items-end gap-12 pb-16 pt-36 sm:pt-44 lg:grid-cols-[1.4fr_1fr] lg:pb-24">
      <div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: D }} className="label flex items-center gap-4">
          <span className="h-px w-10 bg-gold" /> {kicker}
        </motion.p>
        <h1 className="display mt-8 text-[clamp(3.2rem,8vw,7rem)]">
          <Letters text={line1} immediate delay={D} /><br />
          <Letters text={line2} immediate delay={D + 0.25} />
        </h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease, delay: D + 0.6 }} className="mt-8 max-w-lg text-[17px] leading-relaxed text-cocoa-soft">{text}</motion.p>
      </div>
      {image && <ArchImage src={image} alt="" eager className="mx-auto aspect-[4/5] w-full max-w-[340px] lg:ml-auto" delay={D + 0.2} />}
    </section>
  )
}
