'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
}
const item = {
  hidden:   { opacity: 0, y: 44 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
}

export default function AboutHero() {
  const { tr } = useLang()

  return (
    <section
      className="relative min-h-screen flex items-center bg-[#0a0a0a] overflow-hidden pt-16"
    >
      {/* Subtle glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#F59E0B] opacity-[0.03] blur-[140px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.div variants={item} className="mb-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F59E0B]/25 bg-[#F59E0B]/[0.07] text-[#F59E0B] text-xs font-semibold tracking-widest uppercase font-body">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
              {tr.aboutHero.badge}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-heading font-bold leading-[1.03] tracking-tight mb-6 text-white"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)' }}
          >
            {tr.aboutHero.heading} <span className="text-[#F59E0B]">{tr.aboutHero.headingHighlight}</span>
          </motion.h1>

          <motion.p variants={item} className="text-[#888888] font-body text-lg leading-relaxed mb-10 max-w-lg">
            {tr.aboutHero.body}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <Link
              href="#story"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#F59E0B] text-black font-bold font-heading text-sm rounded-lg uppercase tracking-wide hover:scale-105 hover:shadow-[0_0_24px_rgba(245,158,11,0.45)] transition-all duration-200"
            >
              {tr.aboutHero.cta1}
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#F59E0B]/50 text-[#F59E0B] font-bold font-heading text-sm rounded-lg uppercase tracking-wide hover:bg-[#F59E0B]/10 hover:scale-105 transition-all duration-200"
            >
              {tr.aboutHero.cta2}
            </Link>
          </motion.div>
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="relative aspect-[3/4] max-w-md mx-auto lg:ml-auto rounded-2xl overflow-hidden border border-white/[0.10]">
            <Image
              src="/nick-pfp.png"
              alt="Nick Spartalis"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
          <div className="absolute -bottom-4 right-0 bg-[#F59E0B] text-black rounded-xl px-4 py-2.5">
            <p className="font-heading font-bold text-xs uppercase tracking-wide">{tr.aboutHero.certBadge}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
