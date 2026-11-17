import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/context/LanguageContext'

/* ---- Fonts ---- */
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

/* ---- Metadata ---- */
export const metadata: Metadata = {
  title: {
    default: 'SPMethod | Personal Training Vienna & Online',
    template: '%s | SPMethod',
  },
  description:
    'SPMethod by Nick Spartalis — science-backed personal training for weight loss and strength & muscle building. In-person in Vienna, Austria, and online worldwide.',
  keywords: [
    'personal trainer Vienna',
    'online personal training',
    'weight loss coach',
    'muscle building programme',
    'body recomposition',
    'SPMethod',
    'Nick Spartalis',
  ],
  authors: [{ name: 'Nick Spartalis' }],
  creator: 'Nick Spartalis',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://spmethod.com',
    siteName: 'SPMethod',
    title: 'SPMethod | Personal Training Vienna & Online',
    description:
      'Science-backed personal training for weight loss and strength & muscle building. Available in Vienna and worldwide.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SPMethod | Personal Training Vienna & Online',
    description:
      'Science-backed personal training for weight loss and strength & muscle building.',
  },
  // Hidden from search engines for now; flip back to true to be listed again
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
}

/* ---- Root Layout ---- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="bg-[#0a0a0a] text-white antialiased">
        <LanguageProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
