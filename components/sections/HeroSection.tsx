'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import DumbbellExplosion from '@/components/DumbbellExplosion'
import { useLang } from '@/context/LanguageContext'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
}
const lineVariants = {
  hidden:  { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

export default function HeroSection() {
  const prefersReduced = useReducedMotion()
  const { tr } = useLang()

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] pt-16"
    >
      {/* Sunset glow — orange top, blue bottom */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[#F97316] opacity-[0.07] blur-[130px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#0EA5E9] opacity-[0.06] blur-[120px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,158,11,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* â”€â”€ DUMBBELL EXPLOSION CANVAS â”€â”€ */}
      <DumbbellExplosion />

      {/* Main text content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">

          <motion.div variants={lineVariants} className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F59E0B]/25 bg-[#F59E0B]/[0.07] text-[#F59E0B] text-xs font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
              {tr.hero.badge}
            </span>
          </motion.div>

          <motion.h1
            variants={lineVariants}
            className="font-heading font-bold tracking-tight leading-[1.02] mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            <span className="block text-white">{tr.hero.line1}</span>
            <span className="block text-[#F59E0B]">{tr.hero.line2}</span>
          </motion.h1>

          <motion.p
            variants={lineVariants}
            className="text-[#888888] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-body"
          >
            {tr.hero.body}
          </motion.p>

          <motion.div
            variants={lineVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[#F59E0B] text-black font-bold font-heading text-sm rounded-lg uppercase tracking-wide hover:scale-105 hover:shadow-[0_0_30px_rgba(245,158,11,0.45)] transition-all duration-200"
            >
              {tr.hero.cta1}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/#programs"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#F59E0B] text-[#F59E0B] font-bold font-heading text-sm rounded-lg uppercase tracking-wide hover:bg-[#F59E0B]/10 hover:scale-105 transition-all duration-200"
            >
              {tr.hero.cta2}
            </Link>
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#888888]/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          animate={prefersReduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
        <span className="text-[10px] uppercase tracking-widest">{tr.hero.scroll}</span>
      </motion.div>
    </section>
  )
}



