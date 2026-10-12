import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { team } from '../../data/site'
import { Kicker, Letters } from '../ui/Reveal'
import TeamFlip from './TeamFlip'

export default function TeamSection() {
  return (
    <section className="wrap py-24 sm:py-32">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <Kicker>The atelier</Kicker>
          <h2 className="display mt-6 text-[clamp(2.8rem,6vw,5.2rem)]"><Letters text="Hands you can" /><br /><Letters text="*trust*" delay={0.2} /></h2>
        </div>
        <Link to="/team" className="group flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.22em]">
          <span className="underline-draw pb-1">Meet everyone</span><ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </Link>
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((s, i) => <TeamFlip key={s.id} s={s} i={i} />)}
      </div>
      <p className="mt-8 text-center text-sm italic text-cocoa-mute">Hover a portrait, or tap it on your phone, to read her story.</p>
    </section>
  )
}
