'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { bfPhase, useNow } from '@/lib/blackFriday'

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const prefersReduced = useReducedMotion()
  const { tr } = useLang()
  const now = useNow(60_000)
  const bfLive = now ? bfPhase(now) === 'live' : false
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', progress => {
    const video = videoRef.current
    if (prefersReduced || !video || video.readyState < 1 || !Number.isFinite(video.duration)) return

    const nextTime = Math.max(0, Math.min(1, progress)) * video.duration
    if (Math.abs(video.currentTime - nextTime) > 0.04) video.currentTime = nextTime
  })

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

        {/* Video background is pure black like the page, so no blending is needed; the glow sits on top (z-5), text above that */}
        <div className="relative z-0 h-[clamp(170px,34vh,360px)] w-full max-w-[900px] flex items-center justify-center" aria-hidden="true">
          <video
            ref={videoRef}
            className="h-full w-full object-contain"
            muted
            playsInline
            preload="auto"
            poster="/hero/chrome-sphere-poster.webp"
            tabIndex={-1}
            onLoadedMetadata={event => {
              const video = event.currentTarget
              if (!prefersReduced && Number.isFinite(video.duration)) {
                video.currentTime = scrollYProgress.get() * video.duration
              }
            }}
          >
            <source src="/hero/chrome-sphere.mp4" type="video/mp4" />
          </video>
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
