'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'

export default function AboutCTA() {
  const { tr } = useLang()
  const cta = tr.aboutCta
  return (
    <section className="relative bg-[#0a0a0a] py-28 overflow-hidden">
      {/* Radial neon glow */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="w-[700px] h-[700px] rounded-full bg-[#F59E0B] opacity-[0.05] blur-[130px]" />
      </div>

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,158,11,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,1) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 10%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 70% at 50% 50%, black 10%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-4 font-body">
            {cta.label}
          </p>

          <h2
            className="font-heading font-bold text-white tracking-tight leading-[1.04] mb-5"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)' }}
          >
            {cta.heading}{' '}
            <span className="text-[#F59E0B]">{cta.headingHighlight}</span>{' '}
            {cta.headingEnd}
          </h2>

          <p className="text-[#888888] font-body text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            {cta.body}
          </p>

          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2.5 px-10 py-4 bg-[#F59E0B] text-black font-bold font-heading text-base rounded-xl uppercase tracking-wide hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.50)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
          >
            {cta.cta}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-[#888888]/50 text-sm font-body"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse mr-2 align-middle" />
            {cta.spots}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}



