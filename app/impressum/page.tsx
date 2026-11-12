import type { Metadata } from 'next'
import ImpressumContent from '@/components/sections/ImpressumContent'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum and legal disclosure for SPMethod by Nick Spartalis.',
  robots: { index: true, follow: true },
}

export default function ImpressumPage() {
  return <ImpressumContent />
}
