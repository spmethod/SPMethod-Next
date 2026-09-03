import type { Metadata } from 'next'
import AboutHero      from '@/components/sections/AboutHero'
import StorySection   from '@/components/sections/StorySection'
import ExpectSection  from '@/components/sections/ExpectSection'
import CredentialsBar from '@/components/sections/CredentialsBar'
import AboutCTA       from '@/components/sections/AboutCTA'

export const metadata: Metadata = {
  title: 'About Nick | SPMethod',
  description:
    'Meet Nick Spartalis — the certified personal trainer behind SPMethod. 22 years old, 9 years of training, and a coaching philosophy built on setbacks, self-education, and real results.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StorySection />
      <ExpectSection />
      <CredentialsBar />
      <AboutCTA />
    </>
  )
}
