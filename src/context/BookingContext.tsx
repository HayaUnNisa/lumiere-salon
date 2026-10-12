import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

type Booking = {
  isOpen: boolean
  preset: { services: string[]; stylist: string | null }
  open: (opts?: { service?: string; stylist?: string }) => void
  close: () => void
}
const Ctx = createContext<Booking | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const [preset, setPreset] = useState<Booking['preset']>({ services: [], stylist: null })
  const open = useCallback((opts?: { service?: string; stylist?: string }) => {
    setPreset({ services: opts?.service ? [opts.service] : [], stylist: opts?.stylist ?? null })
    setOpen(true)
  }, [])
  const close = useCallback(() => setOpen(false), [])
  return <Ctx.Provider value={{ isOpen, preset, open, close }}>{children}</Ctx.Provider>
}

export function useBooking() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useBooking must be used inside BookingProvider')
  return v
}
