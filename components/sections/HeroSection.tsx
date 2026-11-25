'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { bfPhase, useNow } from '@/lib/blackFriday'

const FRAME_COUNT = 192
const FRAME_W = 960
const FRAME_H = 432
const frameSrc = (i: number) => `/hero/sphere/f_${String(i).padStart(3, '0')}.webp`

// Coarse-to-fine load order so the whole scroll range is usable early, then fills in
function loadOrder() {
  const order: number[] = []
  const seen = new Set<number>()
  for (const step of [32, 16, 8, 4, 2, 1]) {
    for (let i = 0; i < FRAME_COUNT; i += step) if (!seen.has(i)) { seen.add(i); order.push(i) }
  }
  return order
}

// Pre-decoded image frames drawn to a canvas. Unlike seeking a <video>, this works on phones
// (no play gesture needed) and each frame is instant; easing toward the scroll target keeps it smooth.
function SphereSequence({ progress, still }: { progress: MotionValue<number>; still: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const frames: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null)
    const target = () => (still ? 0 : Math.max(0, Math.min(1, progress.get())) * (FRAME_COUNT - 1))
    let current = target()
    let drawn = -1
    let raf = 0
    let alive = true

    const draw = (i: number) => {
      let j = i
      while (j >= 0 && !frames[j]) j--
      if (j < 0) { j = i; while (j < FRAME_COUNT && !frames[j]) j++ }
      const img = frames[j]
      if (!img || j === drawn) return
      ctx.drawImage(img, 0, 0, FRAME_W, FRAME_H)
      drawn = j
    }

    for (const i of loadOrder()) {
      const img = new Image()
      img.src = frameSrc(i)
      img.decode().catch(() => {}).finally(() => { if (alive) frames[i] = img })
    }

    const tick = () => {
      const t = target()
      current += (t - current) * 0.18
      if (Math.abs(t - current) < 0.05) current = t
      draw(Math.round(current))
      raf = requestAnimationFrame(tick)
    }

    // Only run the loop while the hero is on screen
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf)
      if (entry.isIntersecting) raf = requestAnimationFrame(tick)
    })
    io.observe(canvas)

    return () => {
      alive = false
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [progress, still])

  return <canvas ref={canvasRef} width={FRAME_W} height={FRAME_H} className="h-full w-full object-contain" />
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { tr } = useLang()
  const now = useNow(60_000)
  const bfLive = now ? bfPhase(now) === 'live' : false
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const glow = useTransform(scrollYProgress, [0, 0.7], [0.02, 0.09])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])

  return (
    <div id="home" ref={ref} className="relative h-[220vh] bg-black">
      <section className="sticky top-0 h-screen supports-[height:100svh]:h-[100svh] overflow-hidden flex flex-col items-center justify-center gap-4 md:gap-5 px-6 pt-16 md:pb-24">
        <motion.div
          style={{ opacity: glow, background: 'radial-gradient(closest-side, #F59E0B, transparent)' }}
          className="pointer-events-none absolute z-[5] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[520px] will-change-[opacity]"
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

        {/* Frames have a pure-black background like the page; the glow sits on top (z-5), text above that */}
        <div className="relative z-0 h-[clamp(140px,28vh,290px)] w-full max-w-[900px] flex items-center justify-center" aria-hidden="true">
          <SphereSequence progress={scrollYProgress} still={!!prefersReduced} />
        </div>

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
