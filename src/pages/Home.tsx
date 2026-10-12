import BeforeAfter from '../components/home/BeforeAfter'
import GiftCard from '../components/home/GiftCard'
import Hero from '../components/home/Hero'
import Looks from '../components/home/Looks'
import ServicePanels from '../components/home/ServicePanels'
import Statement from '../components/home/Statement'
import TeamSection from '../components/home/TeamSection'
import Testimonials from '../components/home/Testimonials'

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <ServicePanels />
      <BeforeAfter />
      <Looks />
      <TeamSection />
      <Testimonials />
      <GiftCard />
    </>
  )
}
