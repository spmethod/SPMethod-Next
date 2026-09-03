'use client'

import { motion } from 'framer-motion'
import { MessageCircle, ShieldCheck, TrendingUp } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'

export default function CoachingStyleSection() {
  const { tr } = useLang()
  const icons = [
    <MessageCircle key="m" size={22} className="text-[#F59E0B]" />,
    <ShieldCheck   key="s" size={22} className="text-[#F59E0B]" />,
    <TrendingUp    key="t" size={22} className="text-[#F59E0B]" />,
  ]
  const pillars = tr.coaching.pillars.map((p, i) => ({ ...p, icon: icons[i] }))

  return (
    <section className="relative bg-[#111111] py-28 overflow-hidden">
      {/* Oversized quote mark */}
      <div
        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 font-heading font-bold text-[280px] leading-none text-[#F59E0B] opacity-[0.04] select-none"
        aria-hidden="true"
      >
        {'"'}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-white leading-snug tracking-tight italic mb-6">
            {tr.coaching.quote}
          </p>
          <footer className="text-[#F59E0B] font-semibold font-body text-sm tracking-widest uppercase">
            {tr.coaching.author}
          </footer>
        </motion.blockquote>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="my-14 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent origin-center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: 'easeOut' }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center mb-2">
                {p.icon}
              </div>
              <h3 className="font-heading font-bold text-white text-lg tracking-tight">
                {p.title}
              </h3>
              <p className="text-[#888888] text-sm font-body leading-relaxed max-w-xs">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
