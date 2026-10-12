import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { useBooking } from '../../context/BookingContext'
import { brand } from '../../data/site'
import { ease } from '../../lib/motion'

/** Floating booking pill on phones once the visitor scrolls past the hero. */
export default function MobileBookBar() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  const { open, isOpen } = useBooking()
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > 500))
  return (
    <AnimatePresence>
      {show && !isOpen && (
        <motion.div
          initial={{ y: 120 }} animate={{ y: 0 }} exit={{ y: 120 }} transition={{ duration: 0.6, ease }}
          className="fixed inset-x-4 bottom-4 z-40 flex gap-2 sm:hidden"
          style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
        >
          <button onClick={() => open()} className="btn btn-dark flex-1 shadow-xl shadow-cocoa/20">Book appointment</button>
          <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-[50px] w-[50px] place-items-center rounded-full bg-blush text-cocoa shadow-xl shadow-cocoa/10">
            <MessageCircle className="h-5 w-5" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
