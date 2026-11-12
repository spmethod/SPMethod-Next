'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useReducedMotion, easeOut, MotionValue } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'

const PLATES = [
  { key: 'strength',   kg: 25, h: 260, fall: [0.06, 0.22] },
  { key: 'weightloss', kg: 20, h: 230, fall: [0.28, 0.44] },
  { key: 'discipline', kg: 15, h: 200, fall: [0.50, 0.66] },
] as const

const BAR_KG = 20
const LANDINGS = PLATES.map(p => p.fall[1])

// Drawing coordinates (900×320): bar centre line and each collar's outer face
const BAR_Y = 160
const COLLAR_L = 170
const COLLAR_R = 729
const GAP = 1
const BAR_LEFT = 20
const BAR_RIGHT = 880
const BAR_MID = 450

// Plate photo geometry (366×703 px): hub hole x, and front-face-to-back-face depth
const IMG_W = 366
const IMG_H = 703
const IMG_HUB_X = 248
const IMG_DEPTH = 131

const scaleOf = (i: number) => PLATES[i].h / IMG_H

// Where the bar passes through plate i's hub: against the collar, or against the previous plate
function hubX(index: number, side: 'left' | 'right') {
  const offset = PLATES.slice(0, index).reduce((s, _, j) => s + IMG_DEPTH * scaleOf(j) + GAP, 0)
  return side === 'left' ? COLLAR_L - offset : COLLAR_R + offset
}

function Plate({ progress, index, side }: { progress: MotionValue<number>; index: number; side: 'left' | 'right' }) {
  const p = PLATES[index]
  const s = scaleOf(index)
  const hub = hubX(index, side)
  const x = useTransform(progress, [p.fall[0], p.fall[1]], [side === 'left' ? -800 : 800, 0], { ease: easeOut })
  const opacity = useTransform(progress, [p.fall[0], p.fall[0] + 0.04], [0, 1])
  const hubOffset = (side === 'left' ? IMG_HUB_X : IMG_W - IMG_HUB_X) * s

  // The bar from this plate's hub toward the centre passes in front of the plate face and into the hole
  const barClip = useTransform(x, v => {
    const now = hub + v
    return side === 'left'
      ? `inset(0 ${BAR_RIGHT - BAR_MID}px 0 ${Math.max(0, now - BAR_LEFT)}px)`
      : `inset(0 ${Math.max(0, BAR_RIGHT - now)}px 0 ${BAR_MID - BAR_LEFT}px)`
  })

  return (
    <>
      <motion.img
        src={`/hero/plate-${p.key}${side === 'right' ? '-r' : ''}.webp`}
        alt=""
        style={{ x, opacity, left: hub - hubOffset, top: BAR_Y - p.h / 2, width: IMG_W * s, height: p.h }}
        className="absolute max-w-none"
      />
      <motion.img src="/hero/barbell.webp" alt="" style={{ clipPath: barClip }}
        className="absolute left-[20px] top-[129px] w-[860px] h-[63px] max-w-none" />
    </>
  )
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { tr } = useLang()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const loaded = useMotionValue(1)
  const progress = prefersReduced ? loaded : scrollYProgress

  const dipIn = [0, ...LANDINGS.flatMap(e => [e, e + 0.02, e + 0.05])]
  const dipOut = [0, ...LANDINGS.flatMap(() => [0, 3, 0])]
  const dip = useTransform(progress, dipIn, dipOut)

  const kg = useTransform(progress, v =>
    `${BAR_KG + PLATES.reduce((sum, p) => (v >= p.fall[1] ? sum + p.kg * 2 : sum), 0)} kg`)

  const glow = useTransform(progress, [0, 0.7], [0.02, 0.09])
  const hintOpacity = useTransform(progress, [0, 0.05], [1, 0])
  const headOpacity = useTransform(progress, [0.70, 0.80], [0, 1])
  const headY = useTransform(progress, [0.70, 0.80], [24, 0])
  const restOpacity = useTransform(progress, [0.76, 0.88], [0, 1])
  const restY = useTransform(progress, [0.76, 0.88], [24, 0])
  const restVisibility = useTransform(progress, v => (v > 0.74 ? 'visible' : 'hidden'))

  return (
    <div id="home" ref={ref} className="relative h-[260vh] bg-[#0a0a0a]">
      <section className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center gap-4 md:gap-6 px-6 pt-16">
        <motion.div
          style={{ opacity: glow }}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#F59E0B] blur-[120px]"
          aria-hidden="true"
        />

        <motion.h1
          style={{ opacity: headOpacity, y: headY, fontSize: 'clamp(2.6rem, 7vw, 6rem)' }}
          className="relative z-10 font-heading font-bold tracking-tight leading-none text-center"
        >
          <span className="text-white">{tr.hero.line1} </span>
          <span className="text-[#F59E0B]">{tr.hero.line2}</span>
        </motion.h1>

        {/* Barbell: fixed 900×320 drawing, scaled down on small screens */}
        <div className="relative z-10 h-[200px] sm:h-[260px] md:h-[320px] flex items-center justify-center" aria-hidden="true">
          <div className="relative w-[900px] h-[320px] flex-shrink-0 scale-[0.42] sm:scale-[0.7] md:scale-100">
          <motion.div style={{ y: dip }} className="absolute inset-0">
            {/* Back to front: whole bar, then plates outer-to-inner, each followed by the bar segment that passes in front of its face */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero/barbell.webp" alt="" className="absolute left-[20px] top-[129px] w-[860px] h-[63px] max-w-none" />

            {(['left', 'right'] as const).map(side =>
              [2, 1, 0].map(i => <Plate key={`${side}-${i}`} progress={progress} index={i} side={side} />))}
            <div className="absolute left-1/2 -translate-x-1/2 top-[300px] w-[760px] h-[18px] rounded-[50%] bg-black/70 blur-md" />
          </motion.div>
          </div>
        </div>

        <motion.span className="relative z-10 -mt-2 font-heading font-bold text-sm tracking-[0.3em] text-white/40 tabular-nums">
          {kg}
        </motion.span>

        <motion.div
          style={{ opacity: restOpacity, y: restY, visibility: restVisibility }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          <p className="text-[#888888] text-base md:text-lg mb-6 leading-relaxed font-body max-w-lg">
            {tr.hero.body}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
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
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#888888]/70"
          aria-hidden="true"
        >
          <motion.div
            animate={prefersReduced ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} />
          </motion.div>
          <span className="text-[10px] uppercase tracking-widest">{tr.hero.scroll}</span>
        </motion.div>
      </section>
    </div>
  )
}
