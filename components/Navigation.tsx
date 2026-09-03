'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import LanguageToggle from '@/components/LanguageToggle'
import { useLang } from '@/context/LanguageContext'

export default function Navigation() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { tr } = useLang()

  const navLinks = [
    { label: tr.nav.home,     href: '/#home'     },
    { label: tr.nav.about,    href: '/about'      },
    { label: tr.nav.programs, href: '/#programs'  },
    { label: tr.nav.contact,  href: '/#contact'   },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const handleAnchorClick = (href: string) => {
    setMobileOpen(false)
    if (href.startsWith('/#') && pathname === '/') {
      const id = href.replace('/#', '')
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 lg:h-18">
          <Link href="/" className="flex items-center select-none">
            <Image src="/logo.png" alt="SPMethod" width={160} height={64} className="h-16 w-auto object-contain" priority />
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => handleAnchorClick(link.href)}
                  className="text-sm font-medium text-[#888888] hover:text-white transition-colors duration-200 tracking-wide"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Link
              href="/#contact"
              onClick={() => handleAnchorClick('/#contact')}
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-[#F59E0B] text-black text-sm font-bold font-heading rounded-lg tracking-wide hover:scale-105 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-200"
            >
              {tr.nav.cta}
            </Link>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-x-0 top-16 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.06] md:hidden"
          >
            <ul className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => handleAnchorClick(link.href)}
                    className="text-lg font-medium text-white/80 hover:text-white block transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#contact"
                  onClick={() => handleAnchorClick('/#contact')}
                  className="inline-flex items-center justify-center w-full px-5 py-3 bg-[#F59E0B] text-black text-sm font-bold font-heading rounded-lg tracking-wide"
                >
                  {tr.nav.cta}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
