import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = { children: ReactNode; to?: string; onClick?: () => void; variant?: 'dark' | 'line' | 'light'; className?: string; arrow?: boolean; type?: 'button' | 'submit' }

/** Pill button; a rose wash rises from the bottom on hover and the arrow swaps out. */
export default function Button({ children, to, onClick, variant = 'dark', className = '', arrow = true, type = 'button' }: Props) {
  const cls = `btn btn-fill btn-${variant} group ${variant === 'line' ? 'hover:text-cream' : ''} ${className}`
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className="relative h-4 w-4 overflow-hidden">
          <ArrowUpRight className="absolute inset-0 h-4 w-4 transition-transform duration-500 group-hover:-translate-y-4 group-hover:translate-x-4" />
          <ArrowUpRight className="absolute inset-0 h-4 w-4 -translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </>
  )
  return to ? <Link to={to} className={cls}>{inner}</Link> : <button type={type} onClick={onClick} className={cls}>{inner}</button>
}
