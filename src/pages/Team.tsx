import TeamFlip from '../components/home/TeamFlip'
import Testimonials from '../components/home/Testimonials'
import PageHeader from '../components/ui/PageHeader'
import { FadeUp } from '../components/ui/Reveal'
import { img } from '../data/images'
import { brand, team } from '../data/site'

export default function Team() {
  return (
    <>
      <PageHeader kicker="The atelier" line1="Meet the" line2="*hands*" image={img('team-2')} text="A small, all-female team of specialists. Each one has her own craft, and all of us share the same calm, careful way of working." />
      <section className="wrap pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((s, i) => <TeamFlip key={s.id} s={s} i={i} />)}
        </div>
        <FadeUp className="mx-auto mt-24 max-w-2xl text-center">
          <p className="font-serif text-3xl italic leading-snug text-cocoa">“We would rather see fewer guests and give each one our full attention.”</p>
          <p className="label mt-5">The {brand.name} team</p>
        </FadeUp>
      </section>
      <Testimonials />
    </>
  )
}
