'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Phone } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'

// TikTok icon (not in lucide-react)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9a8.16 8.16 0 004.86 1.56V7.11a4.85 4.85 0 01-1.09-.42z" />
    </svg>
  )
}

export default function Footer() {
  const { tr } = useLang()

  const footerNav = [
    { label: tr.nav.home,     href: '/'          },
    { label: tr.nav.about,    href: '/about'      },
    { label: tr.nav.programs, href: '/#programs'  },
    { label: tr.nav.contact,  href: '/#contact'   },
  ]

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">

          {/* Brand */}
          <div className="flex-1">
            <Link href="/" className="inline-flex">
              <Image src="/logo.png" alt="SPMethod" width={140} height={56} className="h-14 w-auto object-contain" />
            </Link>
            <p className="mt-3 text-[#888888] text-sm italic leading-relaxed max-w-xs">
              {tr.footer.tagline}
            </p>
          </div>

          {/* Nav */}
          <div className="flex-1">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">{tr.footer.nav}</p>
            <ul className="flex flex-col gap-3">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#888888] text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials + Contact */}
          <div className="flex-1">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">{tr.footer.follow}</p>
            <div className="flex items-center gap-4 mb-6">
              <a
                href="https://www.instagram.com/rly_nick/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 text-[#888888] hover:text-[#F59E0B] hover:border-[#F59E0B]/40 transition-all duration-200"
              >
                <Instagram size={18} />
              </a>
            </div>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{tr.footer.callUs}</p>
            <a
              href="tel:+436649463007"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] text-sm font-semibold hover:bg-[#F59E0B]/20 transition-all duration-200"
            >
              <Phone size={14} />
              +43 664 946 3007
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] text-center">
          <p className="text-[#888888]/60 text-xs">
            {tr.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}


