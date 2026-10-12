import { Link } from 'react-router-dom'
import { brand } from '../../data/site'

export function Monogram({ className = 'h-10 w-10', light }: { className?: string; light?: boolean }) {
  return (
    <span className={`relative grid shrink-0 place-items-center ${className}`} aria-hidden="true">
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full">
        <path d="M6 44V22a18 18 0 0 1 36 0v22" fill="none" stroke={light ? '#F6E9E4' : '#B8956A'} strokeWidth="1.2" />
      </svg>
      <span className={`relative mt-2 font-serif text-[1.55em] italic leading-none ${light ? 'text-cream' : 'text-cocoa'}`}>{brand.monogram}</span>
    </span>
  )
}

export default function Logo({ light, onClick }: { light?: boolean; onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} aria-label={`${brand.name} home`} className="group inline-flex items-center gap-3">
      <Monogram light={light} className="h-10 w-10 text-[15px] transition-transform duration-700 group-hover:-translate-y-0.5" />
      <span className="leading-none">
        <span className={`block font-serif text-[1.6rem] font-normal tracking-[0.02em] ${light ? 'text-cream' : 'text-cocoa'}`}>{brand.name}</span>
        <span className={`mt-1 block text-[9px] font-medium uppercase tracking-[0.45em] ${light ? 'text-cream/60' : 'text-cocoa-mute'}`}>{brand.tagline}</span>
      </span>
    </Link>
  )
}
