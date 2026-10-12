import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import { Letters } from '../components/ui/Reveal'
import { ease } from '../lib/motion'

export default function NotFound() {
  return (
    <section className="wrap grid min-h-[90vh] place-items-center pt-24 text-center">
      <div>
        <motion.div initial={{ clipPath: 'inset(100% 0 0 0 round 999px 999px 0 0)' }} animate={{ clipPath: 'inset(0% 0 0 0 round 999px 999px 0 0)' }} transition={{ duration: 1.4, ease, delay: 0.6 }} className="mx-auto grid h-56 w-44 place-items-center bg-blush">
          <span className="font-serif text-7xl font-light italic text-rose">404</span>
        </motion.div>
        <h1 className="display mt-10 text-[clamp(2.6rem,6vw,4.6rem)]"><Letters text="This page took" immediate delay={0.7} /><br /><Letters text="a *day off*" immediate delay={0.9} /></h1>
        <p className="mx-auto mt-6 max-w-sm text-cocoa-soft">The page you’re looking for doesn’t exist or has moved.</p>
        <div className="mt-10"><Button to="/">Back to home</Button></div>
      </div>
    </section>
  )
}
