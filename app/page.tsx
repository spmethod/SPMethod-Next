import HeroSection          from '@/components/sections/HeroSection'
import StatsBar             from '@/components/sections/StatsBar'
import SpecialtiesSection   from '@/components/sections/SpecialtiesSection'
import ProgressSection      from '@/components/sections/ProgressSection'
import PricingSection       from '@/components/sections/PricingSection'
import CoachingStyleSection from '@/components/sections/CoachingStyleSection'
import BookingSection       from '@/components/sections/BookingSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <SpecialtiesSection />
      <ProgressSection />
      <PricingSection />
      <CoachingStyleSection />
      <BookingSection />
    </>
  )
}
