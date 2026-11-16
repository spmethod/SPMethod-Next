'use client'

import { BF_START, BF_END, bfPhase, useNow } from '@/lib/blackFriday'
import { useLang } from '@/context/LanguageContext'

const pad = (n: number) => String(n).padStart(2, '0')

/** Live countdown: to the start of Black Friday, then to its end. */
export default function BfCountdown({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const now = useNow()
  const { tr } = useLang()
  const u = tr.pricing.bfUnits
  if (!now) return <span className="inline-block h-8" aria-hidden="true" />

  const phase = bfPhase(now)
  if (phase === 'over') return null
  const target = phase === 'pre' ? BF_START : BF_END
  let s = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000))
  const d = Math.floor(s / 86400); s -= d * 86400
  const h = Math.floor(s / 3600);  s -= h * 3600
  const m = Math.floor(s / 60);    s -= m * 60

  const cells: [string, string][] = [[String(d), u.d], [pad(h), u.h], [pad(m), u.m], [pad(s), u.s]]
  const box = size === 'sm'
    ? 'min-w-[2.6rem] px-1.5 py-1 text-base'
    : 'min-w-[3.4rem] px-2 py-1.5 text-2xl'

  return (
    <span className="inline-flex items-center gap-1.5" role="timer" aria-live="off">
      {cells.map(([v, label]) => (
        <span key={label} className={`flex flex-col items-center rounded-md bg-black border border-white/10 ${box}`}>
          <span className="font-heading font-bold tabular-nums leading-none text-white">{v}</span>
          <span className="mt-1 text-[9px] font-body font-semibold uppercase tracking-widest text-white/50">{label}</span>
        </span>
      ))}
    </span>
  )
}
