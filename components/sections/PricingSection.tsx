'use client'

import { motion } from 'framer-motion'
import { CreditCard, Info } from 'lucide-react'
import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'

export default function PricingSection() {
  const { tr } = useLang()
  const p = tr.pricing

  const rows = [
    {
      label: p.planLabel,
      freq: p.planFreq,
      price: p.planPrice,
      highlight: false,
      badge: null,
    },
    {
      label: p.sessionLabel,
      freq: p.sessionFreq,
      price: p.sessionPrice,
      highlight: false,
      badge: null,
    },
    {
      label: p.week6Label,
      freq: p.programFreq1x,
      price: p.programPrice75,
      highlight: true,
      badge: p.allInclusive,
    },
    {
      label: p.week8Label,
      freq: p.programFreq1x,
      price: p.programPrice75,
      highlight: true,
      badge: p.allInclusive,
    },
    {
      label: p.extraLabel,
      freq: p.programFreq2x,
      price: p.programPrice70,
      highlight: true,
      badge: p.allInclusive,
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
          <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3 font-body">{p.label}</p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight mb-4">
            {p.heading}
          </h2>
          <p className="text-[#888888] max-w-md mx-auto font-body text-sm leading-relaxed">
            {p.body}
          </p>
        </motion.div>

        {/* Pricing rows */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="rounded-2xl border border-white/[0.08] overflow-hidden mb-8"
        >
          {rows.map((row, i) => (
            <div
              key={i}
              className={`flex items-center justify-between gap-4 px-6 py-5 ${
                i !== rows.length - 1 ? 'border-b border-white/[0.06]' : ''
              } ${row.highlight ? 'bg-[#141410]' : 'bg-[#141414]'}`}
            >
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-body font-medium text-white text-sm">{row.label}</span>
                  {row.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] text-[10px] font-semibold font-body border border-[#F59E0B]/20 uppercase tracking-wide">
                      {row.badge}
                    </span>
                  )}
                </div>
                <span className="text-[#666666] font-body text-xs">{row.freq}</span>
              </div>
              <span className={`font-heading font-bold text-xl whitespace-nowrap flex-shrink-0 ${row.highlight ? 'text-[#F59E0B]' : 'text-white'}`}>
                {row.price}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Info boxes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-3 mb-10"
        >
          <div className="flex gap-3 p-4 rounded-xl bg-[#1a1a1a] border border-white/[0.06]">
            <Info size={15} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-body text-xs font-semibold mb-1">{p.allInclusiveTitle}</p>
              <p className="text-[#888888] font-body text-xs leading-relaxed">{p.allInclusiveBody}</p>
            </div>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-[#1a1a1a] border border-white/[0.06]">
            <Info size={15} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
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
            <span className="text-[#888888]/70">{p.bankTransfer}</span>
            <span>·</span>
            <span className="text-[#888888]/70">PayPal</span>
            <span>·</span>
            <span className="text-[#888888]/70">{p.cash}</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
