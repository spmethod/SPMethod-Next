'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { TrendingDown, Dumbbell } from 'lucide-react'
import BarbellIcon from '@/components/icons/BarbellIcon'
import { useScrollDrift } from '@/hooks/useScrollRotation'

const specialties = [
  {
    icon: <TrendingDown size={32} className="text-[#F59E0B]" />,
    title: 'Weight Loss & Body Transformation',
    description:
      'Science-backed nutrition and training to permanently reshape your body. No crash diets, no unsustainable gimmicks  -  just a proven system that creates a caloric deficit while protecting your hard-earned muscle.',
    tags: ['Fat Loss', 'Nutrition', 'Recomposition'],
  },
  {
    icon: <Dumbbell size={32} className="text-[#F59E0B]" />,
    title: 'Strength & Muscle Building',
    description:
      'Progressive overload programming built around your body and goals. Every session is designed to drive adaptation, build real strength, and develop the physique you are working toward  -  safely and sustainably.',
    tags: ['Hypertrophy', 'Strength', 'Periodisation'],
  },
]

export default function SpecialtiesSection() {
  const prefersReduced = useReducedMotion()
  const barbellX = useScrollDrift([400, 3000], [-120, 80])

  return (
    <section id="specialties" className="relative overflow-hidden bg-[#0a0a0a] py-28">
      {/* Drifting barbell background */}
      <motion.div
        className="pointer-events-none absolute top-1/2 -left-20 -translate-y-1/2 opacity-[0.06] text-white"
        style={{ x: prefersReduced ? 0 : barbellX }}
        aria-hidden="true"
      >
        <BarbellIcon className="w-[700px] h-auto" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3 font-body">What I Do</p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight">
            What I{' '}
            <span className="relative inline-block">
              Specialize In
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#F59E0B] to-transparent rounded-full" />
            </span>
          </h2>
        </motion.div>

        {/* Two-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {specialties.map((spec, i) => (
            <motion.div
              key={spec.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.65, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              whileHover={prefersReduced ? {} : { y: -6, scale: 1.01 }}
              className="group relative flex flex-col p-8 rounded-xl bg-[#1a1a1a] border border-white/[0.08] backdrop-blur-sm transition-all duration-300 hover:border-[#F59E0B]/40 hover:shadow-[0_0_40px_rgba(245,158,11,0.08)]"
            >
              {/* Top shimmer line on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F59E0B]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" />

              {/* Icon */}
              <div className="mb-6 w-14 h-14 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center group-hover:bg-[#F59E0B]/15 transition-colors duration-300">
                {spec.icon}
              </div>

              <h3 className="font-heading font-bold text-xl text-white mb-3 tracking-tight">{spec.title}</h3>
              <p className="text-[#888888] text-sm leading-relaxed font-body mb-6 flex-1">{spec.description}</p>

              <div className="flex flex-wrap gap-2">
                {spec.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-semibold font-body bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}



