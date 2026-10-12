import { brand } from '../data/site'
export function openWhatsApp(message: string) {
  window.open(`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
}
