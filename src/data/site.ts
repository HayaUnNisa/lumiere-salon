import { img } from './images'

/** Salon details — edit here and they update across the whole site. */
export const brand = {
  name: 'Lumière',
  tagline: 'Beauty Atelier',
  monogram: 'L',
  city: 'Riyadh',
  address: 'Al Olaya District, Riyadh, Saudi Arabia',
  phone: '+966 50 000 0000',
  /** WhatsApp number, international format, digits only. Bookings and messages are sent here. */
  whatsapp: '966500000000',
  email: 'hello@lumiere-salon.com',
  /** Paste a Google Maps embed URL to show a live map on the Contact page. */
  mapEmbedUrl: '',
  instagram: 'https://instagram.com/',
  tiktok: 'https://tiktok.com/',
  snapchat: 'https://snapchat.com/',
  /** Opening hours. day: 0 = Sunday … 6 = Saturday. Times are 24h, Riyadh time. */
  hours: [
    { day: 6, label: 'Saturday', open: '10:00', close: '22:00' },
    { day: 0, label: 'Sunday', open: '10:00', close: '22:00' },
    { day: 1, label: 'Monday', open: '10:00', close: '22:00' },
    { day: 2, label: 'Tuesday', open: '10:00', close: '22:00' },
    { day: 3, label: 'Wednesday', open: '10:00', close: '22:00' },
    { day: 4, label: 'Thursday', open: '10:00', close: '23:00' },
    { day: 5, label: 'Friday', open: '16:00', close: '23:00' },
  ],
}

export const nav = [
  { label: 'Services', to: '/services' },
  { label: 'Our Team', to: '/team' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export type Service = { id: string; name: string; duration: number; price: number; from?: boolean; note?: string }
export type Category = { id: string; title: string; kicker: string; blurb: string; image: string; services: Service[] }

export const categories: Category[] = [
  {
    id: 'hair', title: 'Hair', kicker: 'Cut · Colour · Care', image: img('svc-hair'),
    blurb: 'Precision cuts, lived-in colour and treatments that leave hair healthier than it arrived.',
    services: [
      { id: 'h1', name: 'Signature Cut & Blow-dry', duration: 75, price: 280 },
      { id: 'h2', name: 'Blow-dry & Styling', duration: 45, price: 160 },
      { id: 'h3', name: 'Root Colour', duration: 90, price: 350 },
      { id: 'h4', name: 'Balayage', duration: 180, price: 950, from: true, note: 'Price depends on length' },
      { id: 'h5', name: 'Keratin Smoothing', duration: 150, price: 1200, from: true },
      { id: 'h6', name: 'Deep Repair Treatment', duration: 45, price: 220 },
    ],
  },
  {
    id: 'nails', title: 'Nails', kicker: 'Manicure · Pedicure · Art', image: img('svc-nails'),
    blurb: 'Meticulous nail care in a calm, hygienic space, from a quick polish to detailed art.',
    services: [
      { id: 'n1', name: 'Classic Manicure', duration: 40, price: 120 },
      { id: 'n2', name: 'Gel Manicure', duration: 60, price: 180 },
      { id: 'n3', name: 'Spa Pedicure', duration: 60, price: 200 },
      { id: 'n4', name: 'Gel Extensions', duration: 90, price: 320 },
      { id: 'n5', name: 'Nail Art (per set)', duration: 30, price: 90, from: true },
    ],
  },
  {
    id: 'makeup', title: 'Makeup', kicker: 'Soft glam · Evening · Lessons', image: img('svc-makeup'),
    blurb: 'Skin-first makeup that looks like you on your best day, made to last through the night.',
    services: [
      { id: 'm1', name: 'Soft Glam', duration: 60, price: 450 },
      { id: 'm2', name: 'Evening Makeup', duration: 75, price: 550 },
      { id: 'm3', name: 'Lash Application', duration: 20, price: 80 },
      { id: 'm4', name: 'Private Makeup Lesson', duration: 90, price: 600 },
    ],
  },
  {
    id: 'skin', title: 'Skin', kicker: 'Facials · Brows · Glow', image: img('svc-skin'),
    blurb: 'Results-led facials and brow work tailored to your skin, with no hard sell.',
    services: [
      { id: 's1', name: 'Hydrating Glow Facial', duration: 60, price: 380 },
      { id: 's2', name: 'Deep Cleansing Facial', duration: 75, price: 420 },
      { id: 's3', name: 'Brow Shape & Tint', duration: 30, price: 120 },
      { id: 's4', name: 'Lash Lift & Tint', duration: 50, price: 250 },
    ],
  },
  {
    id: 'bridal', title: 'Bridal', kicker: 'Brides · Mothers · Guests', image: img('svc-bridal'),
    blurb: 'Calm, unhurried bridal preparation, with a trial session so the day itself holds no surprises.',
    services: [
      { id: 'b1', name: 'Bridal Hair & Makeup', duration: 210, price: 2800, from: true },
      { id: 'b2', name: 'Bridal Trial', duration: 120, price: 900 },
      { id: 'b3', name: 'Mother of the Bride', duration: 120, price: 1100 },
      { id: 'b4', name: 'Bridal Party (per guest)', duration: 90, price: 650, from: true },
    ],
  },
]

export const allServices = categories.flatMap((c) => c.services.map((s) => ({ ...s, category: c.title })))

export type Stylist = { id: string; name: string; role: string; image: string; years: number; bio: string; specialties: string[] }
export const team: Stylist[] = [
  { id: 't1', name: 'Noura', role: 'Hair Director', image: img('team-1'), years: 12, bio: 'Known for soft, lived-in colour and cuts that grow out beautifully.', specialties: ['Balayage', 'Precision cuts', 'Colour correction'] },
  { id: 't2', name: 'Layan', role: 'Lead Makeup Artist', image: img('team-2'), years: 9, bio: 'Skin-first makeup with a light hand. Our bridal favourite.', specialties: ['Bridal', 'Soft glam', 'Lessons'] },
  { id: 't3', name: 'Reem', role: 'Nail Artist', image: img('team-3'), years: 7, bio: 'Clean, detailed work, from a perfect nude to hand-painted art.', specialties: ['Gel extensions', 'Nail art', 'Russian manicure'] },
  { id: 't4', name: 'Dana', role: 'Skin Therapist', image: img('team-4'), years: 10, bio: 'Builds treatment plans around your skin, not a product list.', specialties: ['Facials', 'Brows', 'Lash lift'] },
]

export const looks = [
  { title: 'Soft Waves', by: 'Noura', image: img('look-1') },
  { title: 'Honey Balayage', by: 'Noura', image: img('look-2') },
  { title: 'Bridal Glow', by: 'Layan', image: img('look-3') },
  { title: 'Pearl Nails', by: 'Reem', image: img('look-4') },
  { title: 'Glass Skin', by: 'Dana', image: img('look-5') },
  { title: 'Sleek Chignon', by: 'Noura', image: img('look-6') },
]

export const testimonials = [
  { name: 'Sara A.', service: 'Balayage', text: 'I have never left a salon this happy with my colour. Noura listened properly and the result looks expensive, in the best way.' },
  { name: 'Hessa M.', service: 'Bridal', text: 'Layan made my wedding morning feel calm. My makeup lasted until the very last dance and looked natural in every photo.' },
  { name: 'Lama K.', service: 'Gel Manicure', text: 'Spotless, quiet and so detailed. My nails lasted three full weeks without a single chip.' },
  { name: 'Joud F.', service: 'Glow Facial', text: 'Dana explained everything and never pushed products. My skin was glowing for days.' },
  { name: 'Maha R.', service: 'Cut & Blow-dry', text: 'The best haircut I have had in Riyadh. It still looks good weeks later.' },
]

export type GalleryItem = { src: string; alt: string; tag: 'Hair' | 'Nails' | 'Makeup' | 'Space' }
export const gallery: GalleryItem[] = [
  { src: img('gallery-1'), alt: 'The salon space', tag: 'Space' },
  { src: img('gallery-2'), alt: 'Glossy blow-dry', tag: 'Hair' },
  { src: img('gallery-3'), alt: 'Nude gel manicure', tag: 'Nails' },
  { src: img('gallery-4'), alt: 'Soft glam makeup', tag: 'Makeup' },
  { src: img('gallery-5'), alt: 'Treatment room', tag: 'Space' },
  { src: img('gallery-6'), alt: 'Bridal look', tag: 'Makeup' },
  { src: img('gallery-7'), alt: 'Hair finish', tag: 'Hair' },
  { src: img('gallery-8'), alt: 'Reception', tag: 'Space' },
  { src: img('look-4'), alt: 'Pearl nail art', tag: 'Nails' },
  { src: img('look-2'), alt: 'Honey balayage', tag: 'Hair' },
]

export const faqs = [
  { q: 'Is the salon for women only?', a: 'Yes. Lumière is a women-only salon with an all-female team, and the space is fully private.' },
  { q: 'Do I need to book in advance?', a: 'We recommend booking, especially for colour and bridal. Walk-ins are welcome when a chair is free.' },
  { q: 'How does online booking work?', a: 'Choose your services, specialist and time, and your request is sent to us on WhatsApp. We confirm within the hour during opening times.' },
  { q: 'What is your cancellation policy?', a: 'Please give us 24 hours’ notice to change or cancel. Bridal bookings have their own terms, which we share at the trial.' },
  { q: 'Do you offer gift cards?', a: 'Yes, in any amount or for a specific service. Message us and we will prepare one beautifully wrapped.' },
]

export const sar = (n: number) => `SAR ${n.toLocaleString('en-US')}`
export const mins = (m: number) => (m >= 60 ? `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}m` : ''}` : `${m}m`)
