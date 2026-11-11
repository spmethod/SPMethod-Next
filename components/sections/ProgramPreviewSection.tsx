'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Lock } from 'lucide-react'

const DAYS = ['Day 1A', 'Day 1B', 'Day 2A', 'Day 2B', 'Day 3A', 'Day 3B', 'Deload', 'Diet Plan']

// Fake exercise rows — widths vary to look realistic when redacted
const ROWS = [
  { barW: 'w-[72%]', target: '3×6-8 / 10-12', w1: '46 / 10', w2: '48 / 10', vol: '1 448' },
  { barW: 'w-[58%]', target: '3×8-12',         w1: '105 / 12', w2: '105 / 12', vol: '3 780' },
  { barW: 'w-[80%]', target: '3×10-15',         w1: '30 / 12', w2: '32 / 12', vol: '1 152' },
  { barW: 'w-[65%]', target: '3×10-12',         w1: '18 / 12', w2: '18 / 13', vol: '702' },
  { barW: 'w-[52%]', target: '3×12-15',         w1: '55 / 12', w2: '60 / 12', vol: '2 160' },
  { barW: 'w-[75%]', target: '3×10-12',         w1: '40 / 13', w2: '42 / 12', vol: '1 512' },
]

const FEATURES = [
  '10 weeks of programming',
  '6 training days / week',
  'Deload week included',
  'Personalised diet plan',
  'Week-by-week strength tracking',
  'Volume per session logged',
]

export default function ProgramPreviewSection() {
  return (
    <section className="relative bg-[#111111] py-28 overflow-hidden">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#F59E0B] opacity-[0.03] blur-[100px]" aria-hidden="true" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3 font-body">Program Preview</p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight mb-4">
            What You Actually Get
          </h2>
          <p className="text-[#888888] font-body text-sm max-w-md mx-auto leading-relaxed">
            Every session planned. Every set tracked. Week by week, your numbers move.
          </p>
        </motion.div>

        {/* Day tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-2 overflow-x-auto pb-3 mb-0 scrollbar-hide"
        >
          {DAYS.map((day, i) => (
            <div
              key={day}
              className={`flex-shrink-0 px-4 py-2 rounded-t-lg text-xs font-semibold font-body whitespace-nowrap transition-colors ${
                i === 0
                  ? 'bg-[#F59E0B] text-black'
                  : 'bg-[#1a1a1a] text-[#666666] border border-white/[0.06]'
              }`}
            >
              {day}
            </div>
          ))}
        </motion.div>

        {/* Table mockup */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative rounded-b-xl rounded-tr-xl overflow-hidden border border-white/[0.08]"
        >
          {/* Spreadsheet branding bar */}
          <div className="bg-[#0d0d0d] border-b border-white/[0.06] px-5 py-2.5 flex items-center justify-between">
            <span className="text-[#444] font-body text-[10px] tracking-widest uppercase">my 12 week tracker</span>
            <span className="text-[#333] font-heading font-bold text-[11px] tracking-[0.18em] uppercase">STAY RELENTLESS · SPMETHOD est. 2022</span>
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] bg-[#141414] border-b border-white/[0.06] px-5 py-2.5 gap-4">
            <span className="text-[#555] font-body text-[10px] font-semibold uppercase tracking-wider">Exercise</span>
            <span className="text-[#555] font-body text-[10px] font-semibold uppercase tracking-wider">Target</span>
            <span className="text-[#F59E0B] font-body text-[10px] font-semibold uppercase tracking-wider">Week 1</span>
            <span className="text-[#F59E0B] font-body text-[10px] font-semibold uppercase tracking-wider">Week 2</span>
            <span className="text-[#555] font-body text-[10px] font-semibold uppercase tracking-wider">Volume</span>
          </div>

          {/* Exercise rows */}
          {ROWS.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-5 py-3.5 gap-4 items-center border-b border-white/[0.04] ${
                i % 2 === 0 ? 'bg-[#111111]' : 'bg-[#0e0e0e]'
              }`}
            >
              {/* Exercise name — redacted bar */}
              <div className={`h-3 ${row.barW} rounded-sm bg-[#242424]`} />

              {/* Target — visible (shows the structure) */}
              <span className="text-[#666] font-body text-xs">{row.target}</span>

              {/* Week data — blurred */}
              <span className="text-[#F59E0B] font-body text-xs blur-[4px] select-none">{row.w1}</span>
              <span className="text-[#F59E0B] font-body text-xs blur-[4px] select-none">{row.w2}</span>
              <span className="text-[#444] font-body text-xs blur-[4px] select-none">{row.vol}</span>
            </div>
          ))}

          {/* More rows indicator */}
          <div className="bg-[#0d0d0d] px-5 py-3 flex items-center gap-3 border-b border-white/[0.04]">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-2.5 rounded-sm bg-[#1a1a1a]" style={{ width: `${[55,42,67][i]}%` }} />
            ))}
          </div>
          <div className="bg-[#0d0d0d] px-5 py-3 flex items-center gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-2.5 rounded-sm bg-[#171717]" style={{ width: `${[70,38,55][i]}%` }} />
            ))}
          </div>

          {/* Fade overlay + lock */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% via-[#111111]/60 to-[#111111] pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 flex flex-col items-center justify-end pb-7 gap-2">
            <div className="flex items-center gap-2 text-[#888888]">
              <Lock size={13} className="text-[#F59E0B]" />
              <span className="font-body text-xs tracking-wide">Full program included in your 6 or 8-week package</span>
            </div>
          </div>
        </motion.div>

        {/* Feature chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-2.5 mt-10 mb-10"
        >
          {FEATURES.map((f) => (
            <span
              key={f}
              className="px-4 py-2 rounded-full bg-[#1a1a1a] border border-white/[0.08] text-[#999] font-body text-xs"
            >
              {f}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#F59E0B] text-black font-bold font-heading text-sm rounded-lg uppercase tracking-wide hover:scale-105 hover:shadow-[0_0_24px_rgba(245,158,11,0.45)] transition-all duration-200"
          >
            Get the Program
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
