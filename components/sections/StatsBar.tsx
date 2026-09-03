'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface Stat {
  value: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  { value: 9,   suffix: '+', label: 'Years Training'       },
  { value: 2,   suffix: '',  label: 'Specialties'          },
  { value: 100, suffix: '%', label: 'Personalised'         },
  { value: 2,   suffix: '',  label: 'Vienna & Worldwide'   },
]

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (!active || prefersReduced) {
      setCount(target)
      return
    }
    const duration = 1600
    const steps = 40
    const increment = target / steps
    const interval = duration / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, interval)
    return () => clearInterval(timer)
  }, [active, target, prefersReduced])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="border-t-2 border-[#F59E0B] bg-[#111111]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="flex flex-col items-center justify-center py-10 px-4 text-center"
            >
              <span className="font-heading font-bold text-4xl md:text-5xl text-[#F59E0B] leading-none tracking-tight">
                <CountUp target={stat.value} suffix={stat.suffix} active={inView} />
              </span>
              <span className="mt-2 text-[#888888] text-sm font-body tracking-wide">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


