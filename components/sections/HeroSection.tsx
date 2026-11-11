'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useLang } from '@/context/LanguageContext'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
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
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0a0a0a] pt-16"
    >
      {/* Very subtle amber glow — behind dumbbell side */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#F59E0B] opacity-[0.04] blur-[150px]" />
      </div>

      {/* Content grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-20">

        {/* ── Left: Text ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start"
        >
          <motion.h1
            variants={lineVariants}
            className="font-heading font-bold tracking-tight leading-[1.0] mb-6 text-left"
            style={{ fontSize: 'clamp(3.2rem, 7vw, 7rem)' }}
          >
            <span className="block text-white">{tr.hero.line1}</span>
            <span className="block text-[#F59E0B]">{tr.hero.line2}</span>
          </motion.h1>

          <motion.p
            variants={lineVariants}
            className="text-[#888888] text-lg md:text-xl mb-10 leading-relaxed font-body max-w-lg"
          >
            {tr.hero.body}
          </motion.p>

          <motion.div
            variants={lineVariants}
            className="flex flex-col sm:flex-row items-start gap-4"
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
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#F59E0B]/60 text-[#F59E0B] font-bold font-heading text-sm rounded-lg uppercase tracking-wide hover:bg-[#F59E0B]/10 hover:scale-105 transition-all duration-200"
            >
              {tr.hero.cta2}
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Right: Photo ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:flex items-end justify-end"
        >
          {/* Amber glow at the base of the photo */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[320px] h-[180px] rounded-full bg-[#F59E0B] opacity-[0.07] blur-[70px]" />

          {/* Photo — tall crop, fills the right column to full height */}
          <div className="relative w-full max-w-[420px] aspect-[3/4] rounded-2xl overflow-hidden">
            <Image
              src="/nick-pfp.png"
              alt="Nick Spartalis"
              fill
              className="object-cover object-top"
              priority
            />
            {/* Fade to black at the bottom so it bleeds into the next section */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" style={{ background: 'linear-gradient(to top, #0a0a0a 0%, transparent 50%)' }} />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#888888]/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          animate={prefersReduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
        <span className="text-[9px] uppercase tracking-widest">{tr.hero.scroll}</span>
      </motion.div>
    </section>
  )
}
