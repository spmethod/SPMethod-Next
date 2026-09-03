'use client'

import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { User } from 'lucide-react'

const transformations = [
  { metric: '−14 kg', duration: '12 Week Transformation',  format: 'Online Coaching' },
  { metric: '+22 kg squat', duration: '8 Week Strength Program', format: 'In-Person · Vienna' },
  { metric: '−9 kg fat', duration: '16 Week Recomposition', format: 'Online Coaching' },
  { metric: '+18 kg bench', duration: '10 Week Power Block',   format: 'In-Person · Vienna' },
  { metric: '−11 kg', duration: '14 Week Body Transformation', format: 'Online Coaching' },
  { metric: 'Full recomp', duration: '20 Week Elite Program',   format: 'In-Person · Vienna' },
]

function TransformCard({ item }: { item: (typeof transformations)[0] }) {
  return (
    <div className="flex-shrink-0 w-[300px] md:w-[340px] rounded-xl overflow-hidden border border-white/[0.08] bg-[#1a1a1a] group hover:border-[#F59E0B]/30 transition-all duration-300">
      {/* Split before/after */}
      <div className="flex h-[320px] relative">
        {/* Before */}
        <div className="flex-1 flex flex-col items-center justify-center bg-[#141414] relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
            <User size={100} className="text-white" />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-2">
            <span className="px-3 py-1 rounded-full border border-white/20 text-white/40 text-xs font-semibold font-body tracking-widest uppercase">
              Before
            </span>
          </div>
        </div>

        {/* Divider with arrow */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 z-10 flex items-center">
          <div className="h-full w-px bg-gradient-to-b from-transparent via-[#F59E0B] to-transparent" />
          <div className="absolute w-7 h-7 rounded-full bg-[#F59E0B] flex items-center justify-center shadow-[0_0_16px_rgba(245,158,11,0.6)]">
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-black">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* After */}
        <div className="flex-1 flex flex-col items-center justify-center bg-[#10100c] relative border-l border-[#F59E0B]/10">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
            <User size={100} className="text-[#F59E0B]" />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-2">
            <span className="px-3 py-1 rounded-full border border-[#F59E0B]/40 text-[#F59E0B] text-xs font-semibold font-body tracking-widest uppercase">
              After
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/[0.06]">
        <p className="font-heading font-bold text-[#F59E0B] text-lg tracking-tight">
          {item.metric}
        </p>
        <p className="text-white/80 text-sm font-body mt-0.5">{item.duration}</p>
        <p className="text-[#888888] text-xs font-body mt-1">{item.format}</p>
      </div>
    </div>
  )
}

export default function ShowcaseSection() {
  const prefersReduced = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)

  return (
    <section id="results" className="relative bg-[#0a0a0a] py-28 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#F59E0B] opacity-[0.03] blur-[100px]" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12"
        >
          <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3 font-body">
            Transformations
          </p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight mb-3">
            The SPMethod Effect
          </h2>
          <p className="text-[#888888] font-body text-base">
            Real programming. Real commitment. Real results.
          </p>
        </motion.div>

        {/* Scrollable gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {transformations.map((item, i) => (
              <motion.div
                key={i}
                className="snap-start"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <TransformCard item={item} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-[#888888]/50 text-xs font-body text-center"
        >
          Transformations shown are AI-generated examples for illustration purposes only.
        </motion.p>
      </div>
    </section>
  )
}



