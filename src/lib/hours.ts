import { brand } from '../data/site'

/** Current time in Riyadh, regardless of the visitor's own timezone. */
export function riyadhNow() {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Riyadh', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date())
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  const minutes = (parseInt(get('hour'), 10) % 24) * 60 + parseInt(get('minute'), 10)
  return { day, minutes }
}

const toMin = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m }
export const fmt12 = (t: string) => { const [h, m] = t.split(':').map(Number); const ap = h >= 12 ? 'pm' : 'am'; return `${((h + 11) % 12) + 1}${m ? `:${String(m).padStart(2, '0')}` : ''}${ap}` }

export function openStatus() {
  const { day, minutes } = riyadhNow()
  const today = brand.hours.find((h) => h.day === day)
  if (today && minutes >= toMin(today.open) && minutes < toMin(today.close))
    return { open: true, text: `Open now · until ${fmt12(today.close)}`, today: day }
  if (today && minutes < toMin(today.open)) return { open: false, text: `Opens today at ${fmt12(today.open)}`, today: day }
  const next = brand.hours.find((h) => h.day === (day + 1) % 7)
  return { open: false, text: next ? `Closed · opens ${next.label} ${fmt12(next.open)}` : 'Closed', today: day }
}
