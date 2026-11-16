'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useReducedMotion, easeOut, MotionValue } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { bfPhase, useNow } from '@/lib/blackFriday'

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

  // The bar passes in front of the plate face and into the hole. A window over the face moves with
  // the plate while the bar inside it is shifted back, so only transforms change (no repaints on phones).
  const faceW = (IMG_W - IMG_HUB_X) * s + 2
  const windowLeft = side === 'left' ? hub : hub - faceW
  const counterX = useTransform(x, v => -v)

  return (
    <>
      <motion.img
        src={`/hero/plate-${p.key}${side === 'right' ? '-r' : ''}.webp`}
        alt=""
        style={{ x, opacity, left: hub - hubOffset, top: BAR_Y - p.h / 2, width: IMG_W * s, height: p.h }}
        className="absolute max-w-none will-change-transform"
      />
      <motion.div style={{ x, left: windowLeft, width: faceW }}
        className="absolute top-[129px] h-[63px] overflow-hidden will-change-transform">
        <motion.img src="/hero/barbell.webp" alt="" style={{ x: counterX, left: BAR_LEFT - windowLeft }}
          className="absolute top-0 w-[860px] h-[63px] max-w-none will-change-transform" />
      </motion.div>
    </>
  )
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { tr } = useLang()
  const now = useNow(60_000)
  const bfLive = now ? bfPhase(now) === 'live' : false
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

  return (
    <div id="home" ref={ref} className="relative h-[220vh] bg-[#0a0a0a]">
      <section className="sticky top-0 h-screen supports-[height:100svh]:h-[100svh] overflow-hidden flex flex-col items-center justify-center gap-4 md:gap-5 px-6 pt-16 md:pb-24">
        <motion.div
          style={{ opacity: glow, background: 'radial-gradient(closest-side, #F59E0B, transparent)' }}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[520px] will-change-[opacity]"
          aria-hidden="true"
        />

        {bfLive && (
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 15, delay: 0.3 }}
            className="relative z-10 -mb-1"
          >
            <Link
              href="/#programs"
              className="bf-shine relative overflow-hidden inline-flex items-center gap-2.5 rounded-full bg-white pl-1.5 pr-4 py-1.5 text-black font-body text-sm font-semibold hover:-translate-y-0.5 transition-transform"
            >
              <span className="rounded-full bg-black px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">{tr.pricing.bfBadge}</span>
              {tr.pricing.bfHeroPill}
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        )}
        <motion.h1
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 'clamp(2.6rem, 7vw, 6rem)' }}
          className="relative z-10 font-heading font-bold tracking-tight leading-none text-center"
        >
          <span className="text-white">{tr.hero.line1} </span>
          <span className="text-[#F59E0B]">{tr.hero.line2}</span>
        </motion.h1>

        {/* Barbell: fixed 900×320 drawing, scaled down on small screens */}
        <div className="relative z-10 h-[150px] sm:h-[240px] md:h-[300px] [@media(min-width:768px)_and_(max-height:880px)]:h-[200px] flex items-center justify-center" aria-hidden="true">
          <div className="relative w-[900px] h-[320px] flex-shrink-0 scale-[0.4] sm:scale-[0.68] md:scale-95 [@media(min-width:768px)_and_(max-height:880px)]:scale-[0.66]">
          <motion.div style={{ y: dip }} className="absolute inset-0">
            {/* Back to front: whole bar, then plates outer-to-inner, each followed by the bar segment that passes in front of its face */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero/barbell.webp" alt="" className="absolute left-[20px] top-[129px] w-[860px] h-[63px] max-w-none" />

            {(['left', 'right'] as const).map(side =>
              [2, 1, 0].map(i => <Plate key={`${side}-${i}`} progress={progress} index={i} side={side} />))}
            <div className="absolute left-1/2 -translate-x-1/2 top-[296px] w-[780px] h-[26px]" style={{ background: 'radial-gradient(closest-side, rgba(0,0,0,0.7), transparent)' }} />
          </motion.div>
          </div>
        </div>

        <motion.span className="relative z-10 -mt-2 font-heading font-bold text-sm tracking-[0.3em] text-white/40 tabular-nums">
          {kg}
        </motion.span>

        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          <p className="text-[#a3a3a3] text-sm md:text-lg mb-5 md:mb-6 leading-relaxed font-body max-w-lg">
            {tr.hero.body}
          </p>
          <div className="flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-4">
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#F59E0B] text-black font-bold font-heading text-sm rounded-lg uppercase tracking-wide hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(245,158,11,0.45)] transition-all duration-200"
            >
              {tr.hero.cta1}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/#programs"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 border border-[#F59E0B]/60 text-[#F59E0B] font-bold font-heading text-sm rounded-lg uppercase tracking-wide hover:bg-[#F59E0B]/10 hover:-translate-y-0.5 transition-all duration-200"
            >
              {tr.hero.cta2}
            </Link>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#888888]/70"
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
