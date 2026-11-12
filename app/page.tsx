import HeroSection          from '@/components/sections/HeroSection'
import MarqueeStrip         from '@/components/MarqueeStrip'
import SpecialtiesSection   from '@/components/sections/SpecialtiesSection'
import ProgressSection      from '@/components/sections/ProgressSection'
import PricingSection       from '@/components/sections/PricingSection'
import ProgramPreviewSection from '@/components/sections/ProgramPreviewSection'
import CoachingStyleSection from '@/components/sections/CoachingStyleSection'
import BookingSection       from '@/components/sections/BookingSection'

export default function HomePage() {
  return (
    <>
      <MarqueeStrip />
      <HeroSection />
      <SpecialtiesSection />
      <ProgressSection />
      <PricingSection />
      <ProgramPreviewSection />
      <CoachingStyleSection />
      <BookingSection />
    </>
  )
}
