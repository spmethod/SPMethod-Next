'use client'

import { motion, useReducedMotion } from 'framer-motion'
import BarbellIcon from '@/components/icons/BarbellIcon'
import { useScrollDrift } from '@/hooks/useScrollRotation'
import { useLang } from '@/context/LanguageContext'

export default function StorySection() {
  const prefersReduced = useReducedMotion()
  const barbellX = useScrollDrift([600, 4000], [-100, 60])
  const { tr } = useLang()
  const s = tr.story

  return (
    <section id="story" className="relative bg-[#111111] py-28 overflow-hidden">
      {/* Barbell background */}
      <motion.div
        className="pointer-events-none absolute top-1/2 -left-24 -translate-y-1/2 opacity-[0.05] text-white"
        style={{ x: prefersReduced ? 0 : barbellX }}
        aria-hidden="true"
      >
        <BarbellIcon className="w-[700px] h-auto" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-start">

          {/* Text column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3 font-body">
                {s.label}
              </p>
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight">
                {s.heading}{' '}
                <span className="text-[#F59E0B]">{s.headingHighlight}</span>
              </h2>
            </motion.div>

            <div className="space-y-5">
              {s.paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.58, delay: i * 0.08, ease: 'easeOut' }}
                  className="text-[#888888] font-body leading-relaxed text-base"
                >
                  {/* Highlight first paragraph */}
                  {i === 0 ? (
                    <span className="text-white/85">{para}</span>
                  ) : (
                    para
                  )}
                </motion.p>
              ))}
            </div>

            {/* Pull quote  -  breaks out of column */}
            <motion.blockquote
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 pl-6 border-l-4 border-[#F59E0B]"
            >
              <p className="font-heading font-bold text-xl md:text-2xl text-[#F59E0B] italic leading-snug tracking-tight">
                {s.pullQuote}
              </p>
            </motion.blockquote>
          </div>

          {/* Visual column */}
          <div className="lg:sticky lg:top-28 space-y-5">
            {/* Big "9" decorative */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl bg-[#1a1a1a] border border-white/[0.08] overflow-hidden h-64 flex items-center justify-center"
            >
              <span
                className="font-heading font-bold text-[180px] leading-none text-[#F59E0B] opacity-[0.12] select-none"
                aria-hidden="true"
              >
                9
              </span>
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <span className="font-heading font-bold text-4xl text-white">9+</span>
                <span className="text-[#888888] text-sm font-body mt-1 uppercase tracking-widest">
                  {s.yearsTraining}
                </span>
              </div>
            </motion.div>

            {/* Stat cards */}
            {s.stats.map(({ n, lbl }, i) => (
              <motion.div
                key={lbl}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl bg-[#1a1a1a] border border-white/[0.08] p-6 flex items-center gap-5"
              >
                <span className="font-heading font-bold text-4xl text-[#F59E0B] leading-none">
                  {n}
                </span>
                <span className="text-[#888888] font-body text-sm">{lbl}</span>
              </motion.div>
            ))}

            {/* Green neon lines decoration */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/[0.03] p-6 space-y-2"
              aria-hidden="true"
            >
              {[100, 70, 85, 55, 90].map((w, i) => (
                <div
                  key={i}
                  className="h-0.5 rounded-full bg-gradient-to-r from-[#F59E0B] to-transparent"
                  style={{ width: `${w}%`, opacity: 0.4 + i * 0.08 }}
                />
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}



