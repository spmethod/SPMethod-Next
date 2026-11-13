'use client'

import { motion } from 'framer-motion'
import { CreditCard, Info, Gift } from 'lucide-react'
import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'

function isBlackFriday(): boolean {
  const now = new Date()
  const start = new Date('2026-11-27T00:00:00+01:00')
  const end   = new Date('2026-12-07T23:59:59+01:00')
  return now >= start && now <= end
}

function isPreBlackFriday(): boolean {
  const now = new Date()
  const start = new Date('2026-11-27T00:00:00+01:00')
  return now < start
}

function WaveText({ text }: { text: string }) {
  return (
    <span className="bf-wave">
      {text.split('').map((ch, i) => (
        <span key={i}>{ch === ' ' ? ' ' : ch}</span>
      ))}
    </span>
  )
}

export default function PricingSection() {
  const { tr } = useLang()
  const p = tr.pricing
  const bf = isBlackFriday()
  const preBf = isPreBlackFriday()

  type Row = {
    label: string; desc?: string; freq: string
    price: string; originalPrice?: string
    unit: string | null; highlight: boolean; badge: string | null
  }

  const groups: { title: string; rows: Row[] }[] = [
    {
      title: p.groupTraining,
      rows: [
        {
          label: p.program1xLabel,
          desc: p.programDesc,
          freq: bf ? p.bfTotals1x : p.program1xTotals,
          price: bf ? p.bfPrice1x : p.programPrice1x,
          originalPrice: bf ? p.programPrice1x : undefined,
          unit: p.perWeek, highlight: true, badge: p.allInclusive,
        },
        {
          label: p.program2xLabel,
          desc: p.programDesc,
          freq: bf ? p.bfTotals2x : p.program2xTotals,
          price: bf ? p.bfPrice2x : p.programPrice2x,
          originalPrice: bf ? p.programPrice2x : undefined,
          unit: p.perWeek, highlight: true, badge: p.allInclusive,
        },
        {
          label: p.sessionLabel,
          freq: p.sessionFreq,
          price: bf ? p.bfSessionPrice : p.sessionPrice,
          originalPrice: bf ? p.sessionPrice : undefined,
          unit: null, highlight: false, badge: null,
        },
        {
          label: p.planLabel,
          freq: p.planFreq,
          price: bf ? p.bfPlanPrice : p.planPrice,
          originalPrice: bf ? p.planPrice : undefined,
          unit: null, highlight: false, badge: null,
        },
      ],
    },
    {
      title: p.groupNutrition,
      rows: [
        { label: p.nutritionAddonLabel, freq: p.nutritionAddonFreq, price: p.nutritionAddonPrice, unit: p.perWeek, highlight: true,  badge: null },
        { label: p.nutritionOnlyLabel,  freq: p.nutritionOnlyFreq,  price: p.nutritionOnlyPrice,  unit: p.perWeek, highlight: false, badge: null },
      ],
    },
  ]

  return (
    <section id="programs" className="relative overflow-hidden bg-[#111111] py-28">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#F59E0B] opacity-[0.03] blur-[100px]" aria-hidden="true" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[#0ea5c9] text-xs font-semibold uppercase tracking-widest mb-3 font-body">{p.label}</p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight mb-4">
            {p.heading}
          </h2>
          <p className="text-[#888888] max-w-md mx-auto font-body text-sm leading-relaxed">
            {p.body}
          </p>
        </motion.div>

        {/* Pre-Black Friday teaser */}
        {preBf && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 overflow-hidden rounded-xl"
          >
            <div className="caution-stripe h-[3px] opacity-40" />
            <div className="bg-[#141414] border-x border-white/[0.06] px-5 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="price-blink font-heading font-bold text-sm">27.11</span>
                <span className="text-white/20 text-xs">—</span>
                <span className="text-white font-body text-sm">Black Friday deals incoming.</span>
              </div>
              <span className="text-[#666] font-body text-xs uppercase tracking-widest hidden sm:block">Up to −25%</span>
            </div>
            <div className="caution-stripe h-[3px] opacity-40" />
          </motion.div>
        )}

        {/* Black Friday banner */}
        {bf && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 rounded-2xl bg-white text-black px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-black text-white text-[10px] font-bold font-body uppercase tracking-wider">
                {p.bfBadge}
              </span>
              <span className="font-heading font-bold text-lg">{p.bfDiscount}</span>
            </div>
            <span className="font-body text-xs font-semibold text-black/50 uppercase tracking-widest">{p.bfUntil}</span>
          </motion.div>
        )}

        {/* Featured bundle */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className={`relative rounded-2xl border bg-gradient-to-br from-[#1c1608] to-[#141410] p-6 md:p-7 mb-6 ${preBf ? 'border-pulse-bf' : 'border-[#F59E0B]/40 shadow-[0_0_40px_rgba(245,158,11,0.08)]'}`}
        >
          <span className="inline-block mb-3 px-2.5 py-1 rounded-full bg-[#F59E0B] text-black text-[10px] font-bold font-body uppercase tracking-wider">
            {p.featuredBadge}
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-heading font-bold text-2xl text-white mb-1.5">{p.featuredLabel}</h3>
              <p className="text-[#a3a3a3] font-body text-sm leading-relaxed max-w-sm">{p.featuredDesc}</p>
            </div>
            <div className="sm:text-right flex-shrink-0">
              <p className={`font-heading font-bold whitespace-nowrap flex items-baseline gap-2 sm:justify-end ${preBf ? 'price-blink' : 'text-[#F59E0B]'}`}>
                {bf && (
                  <span className="text-lg text-white/30 line-through font-normal">{p.featuredPrice}</span>
                )}
                <span className="text-4xl">{bf ? p.bfFeaturedPrice : p.featuredPrice}</span>
                <span className="text-base opacity-70">{p.perWeek}</span>
              </p>
              <p className="text-[#888888] font-body text-xs mt-1">
                {bf ? p.bfFeaturedTotals : p.featuredTotals}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pricing groups */}
        {groups.map((group, g) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.1 + g * 0.05 }}
            className="mb-6"
          >
            <p className="text-[#666666] text-[11px] font-semibold uppercase tracking-widest mb-2.5 px-1 font-body">{group.title}</p>
            <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
              {group.rows.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between gap-4 px-5 sm:px-6 py-5 ${
                    i !== group.rows.length - 1 ? 'border-b border-white/[0.06]' : ''
                  } ${row.highlight ? 'bg-[#141410]' : 'bg-[#141414]'}`}
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-body font-medium text-white text-sm">{row.label}</span>
                      {row.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-[#0ea5c9]/10 text-[#0ea5c9] text-[10px] font-semibold font-body border border-[#0ea5c9]/20 uppercase tracking-wide">
                          {row.badge}
                        </span>
                      )}
                    </div>
                    {row.desc && <span className="text-[#a3a3a3] font-body text-xs">{row.desc}</span>}
                    <span className="text-[#666666] font-body text-xs">{row.freq}</span>
                  </div>
                  <div className={`font-heading font-bold whitespace-nowrap flex-shrink-0 text-right ${row.highlight ? (preBf ? 'price-blink' : 'text-[#F59E0B]') : 'text-white'}`}>
                    {row.originalPrice && (
                      <span className="text-sm text-white/30 line-through font-normal mr-1.5">{row.originalPrice}</span>
                    )}
                    <span className="text-xl">{row.price}</span>
                    {row.unit && <span className="text-xs opacity-60">{row.unit}</span>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
        <div className="mb-2" />

        {/* Gift voucher note (Black Friday only) */}
        {bf && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] mb-6"
          >
            <Gift size={15} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
            <p className="text-[#aaaaaa] font-body text-xs leading-relaxed">{p.bfGiftNote}</p>
          </motion.div>
        )}

        {/* Info boxes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-3 mb-10"
        >
          <div className="flex gap-3 p-4 rounded-xl bg-[#1a1a1a] border border-white/[0.06]">
            <Info size={15} className="text-[#0ea5c9] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-body text-xs font-semibold mb-1">{p.allInclusiveTitle}</p>
              <p className="text-[#888888] font-body text-xs leading-relaxed">{p.allInclusiveBody}</p>
            </div>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-[#1a1a1a] border border-white/[0.06]">
            <Info size={15} className="text-[#0ea5c9] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-body text-xs font-semibold mb-1">{p.nutritionInfoTitle}</p>
              <p className="text-[#888888] font-body text-xs leading-relaxed">{p.nutritionInfoBody}</p>
            </div>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-[#1a1a1a] border border-white/[0.06]">
            <Info size={15} className="text-[#0ea5c9] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-body text-xs font-semibold mb-1">{p.whyWeeklyTitle}</p>
              <p className="text-[#888888] font-body text-xs leading-relaxed">{p.whyWeeklyBody}</p>
            </div>
          </div>
          <p className="text-[#555555] font-body text-xs text-center leading-relaxed px-2">
            {p.programNote}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="flex flex-col items-center gap-5"
        >
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#F59E0B] text-black font-bold font-heading text-sm rounded-lg uppercase tracking-wide hover:scale-105 hover:shadow-[0_0_24px_rgba(245,158,11,0.45)] transition-all duration-200"
          >
            {p.bookSession}
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[#888888]/50 text-xs font-body">
            <CreditCard size={13} className="text-[#888888]/40" />
            <span>{p.paymentVia}</span>
            <span className="text-[#888888]/70">PayPal</span>
            <span>·</span>
            <span className="text-[#888888]/70">{p.cash}</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
