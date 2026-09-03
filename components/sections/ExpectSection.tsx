'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Globe, Users, CheckSquare } from 'lucide-react'
import KettlebellIcon from '@/components/icons/KettlebellIcon'
import { useLang } from '@/context/LanguageContext'

export default function ExpectSection() {
  const prefersReduced = useReducedMotion()
  const { tr } = useLang()
  const icons = [
    <Globe key="g" size={28} className="text-[#F59E0B]" />,
    <Users key="u" size={28} className="text-[#F59E0B]" />,
    <CheckSquare key="c" size={28} className="text-[#F59E0B]" />,
  ]
  const cards = tr.expect.cards.map((c, i) => ({ ...c, icon: icons[i] }))

  return (
    <section className="relative bg-[#0a0a0a] py-28 overflow-hidden">
      {/* Floating kettlebell */}
      <div
        className="pointer-events-none absolute -bottom-10 -right-10 opacity-[0.055] text-white animate-float"
        style={{ animationPlayState: prefersReduced ? 'paused' : 'running' }}
        aria-hidden="true"
      >
        <KettlebellIcon className="w-[340px] h-auto" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3 font-body">
            {tr.expect.label}
          </p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight">
            {tr.expect.heading}{' '}
            <span className="text-[#F59E0B]">{tr.expect.headingHighlight}</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={prefersReduced ? {} : { y: -6 }}
              className="group relative flex flex-col p-8 rounded-xl bg-[#1a1a1a] border border-white/[0.08] backdrop-blur-sm transition-all duration-300 hover:border-[#F59E0B]/40 hover:shadow-[0_0_40px_rgba(245,158,11,0.08)]"
            >
              {/* Top shimmer line on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F59E0B]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" />

              <div className="mb-5 w-14 h-14 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#F59E0B]/15">
                {card.icon}
              </div>

              <h3 className="font-heading font-bold text-xl text-white mb-3 tracking-tight">
                {card.title}
              </h3>
              <p className="text-[#888888] text-sm font-body leading-relaxed">
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}



