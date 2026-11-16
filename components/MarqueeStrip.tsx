'use client'

import { bfPhase, useNow } from '@/lib/blackFriday'
import { useLang } from '@/context/LanguageContext'

export default function MarqueeStrip() {
  const now = useNow(60_000)
  const { tr } = useLang()
  const phase = now ? bfPhase(now) : 'over'
  const bf = phase !== 'over'

  const text = phase === 'pre'
    ? tr.pricing.bfMarqueePre
    : phase === 'live'
      ? tr.pricing.bfMarqueeLive
      : 'SPMETHOD  ·  PERSONAL TRAINING  ·  VIENNA  ·  WORLDWIDE  ·  STRENGTH  ·  RESULTS  ·  '

  const bg = bf ? '#0a0a0a' : '#F59E0B'

  return (
    <div
      className={`relative overflow-hidden py-3.5 select-none mt-16 ${bf ? 'bg-[#0a0a0a] border-y border-[#F59E0B]/50' : 'bg-[#F59E0B]'}`}
      aria-hidden="true"
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10" style={{ background: `linear-gradient(to right, ${bg}, transparent)` }} />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10" style={{ background: `linear-gradient(to left, ${bg}, transparent)` }} />

      <div className="animate-marquee">
        {/* Two identical copies for seamless loop */}
        {[0, 1].map((n) => (
          <span
            key={n}
            className={`font-heading font-bold text-[11px] tracking-[0.22em] uppercase whitespace-pre ${bf ? 'text-[#F59E0B]' : 'text-black'}`}
          >
            {text.repeat(6)}
          </span>
        ))}
      </div>
    </div>
  )
}
