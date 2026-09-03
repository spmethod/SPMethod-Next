'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { User } from 'lucide-react'
import DumbbellIcon from '@/components/icons/DumbbellIcon'
import { useScrollRotation } from '@/hooks/useScrollRotation'
import Link from 'next/link'
import { useRef } from 'react'
import { useLang } from '@/context/LanguageContext'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
}
const item = {
  hidden:   { opacity: 0, y: 44 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
}

// Weight plate SVG with hub, spokes, and rim
function WeightPlate({
  size = 320,
  opacity = 0.07,
}: {
  size?: number
  opacity?: number
}) {
  const r  = size / 2
  const r1 = r * 0.92
  const r2 = r * 0.78
  const r3 = r * 0.20
  const r4 = r * 0.09

  const spokeHoles = Array.from({ length: 6 }, (_, i) => {
    const angle = (i / 6) * Math.PI * 2
    const holeR = r * 0.52
    return {
      cx: r + Math.cos(angle) * holeR,
      cy: r + Math.sin(angle) * holeR,
    }
  })

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      aria-hidden="true"
    >
      <circle cx={r} cy={r} r={r1} fill="currentColor" />
      <circle cx={r} cy={r} r={r2} fill="#0a0a0a" />
      <circle cx={r} cy={r} r={r2 * 0.98} fill="currentColor" />
      {spokeHoles.map((h, i) => (
        <circle key={i} cx={h.cx} cy={h.cy} r={r * 0.09} fill="#0a0a0a" />
      ))}
      <circle cx={r} cy={r} r={r3} fill="#0a0a0a" />
      <circle cx={r} cy={r} r={r3 * 0.7} fill="currentColor" />
      <circle cx={r} cy={r} r={r4} fill="#0a0a0a" />
    </svg>
  )
}

export default function AboutHero() {
  const prefersReduced = useReducedMotion()
  const rotation = useScrollRotation([0, 2400], [0, 360])
  const sectionRef = useRef<HTMLElement>(null)

  const { tr } = useLang()
  const { scrollY } = useScroll()
  const plateRotation  = useTransform(scrollY, [0, 2000], [0,  720])
  const plate2Rotation = useTransform(scrollY, [0, 2000], [0, -480])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-[#0a0a0a] overflow-hidden pt-16"
    >
      {/* Glow top-right */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-end" aria-hidden="true">
        <div className="w-[600px] h-[600px] rounded-full bg-[#F59E0B] opacity-[0.04] blur-[120px] -translate-y-1/4 translate-x-1/4" />
      </div>

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,158,11,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 70% 50%, black 10%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 70% 50%, black 10%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Spinning weight plates */}
      <motion.div
        className="pointer-events-none absolute -bottom-24 -left-24 text-white"
        style={{ rotate: prefersReduced ? 0 : plateRotation }}
        aria-hidden="true"
      >
        <WeightPlate size={340} opacity={0.05} />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute -top-16 -right-16 text-white"
        style={{ rotate: prefersReduced ? 0 : plate2Rotation }}
        aria-hidden="true"
      >
        <WeightPlate size={240} opacity={0.04} />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute top-1/2 -right-8 -translate-y-1/2 text-white hidden lg:block"
        style={{ rotate: prefersReduced ? 0 : plateRotation }}
        aria-hidden="true"
      >
        <WeightPlate size={140} opacity={0.035} />
      </motion.div>

      {/* Rotating dumbbell */}
      <motion.div
        className="pointer-events-none absolute right-[5%] top-1/2 -translate-y-1/2 opacity-[0.07] text-white hidden lg:block"
        style={{ rotate: prefersReduced ? 0 : rotation }}
        aria-hidden="true"
      >
        <DumbbellIcon className="w-[420px] h-auto" />
      </motion.div>

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

        {/* Photo placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="absolute -left-4 top-8 bottom-8 w-0.5 bg-gradient-to-b from-transparent via-[#F59E0B] to-transparent rounded-full" />
          <div className="relative aspect-[3/4] max-w-md mx-auto lg:ml-auto rounded-2xl overflow-hidden border border-white/[0.08] bg-gradient-to-br from-[#1a1a1a] to-[#111111]">
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#F59E0B] rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#F59E0B] rounded-bl-lg" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-24 h-24 rounded-full bg-white/[0.06] flex items-center justify-center">
                <User size={48} className="text-white/20" />
              </div>
              <p className="text-white/20 text-xs font-body tracking-widest uppercase">Nick Spartalis</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#F59E0B]/[0.06] via-transparent to-transparent pointer-events-none" />
          </div>
          <div className="absolute -bottom-4 right-0 bg-[#F59E0B] text-black rounded-xl px-4 py-2.5 shadow-[0_0_30px_rgba(245,158,11,0.45)]">
            <p className="font-heading font-bold text-xs uppercase tracking-wide">{tr.aboutHero.certBadge}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
