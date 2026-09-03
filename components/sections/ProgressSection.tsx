'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

// Data points simulating a client's fitness progress over weeks
const progressPoints = [
  { week: 'W1',  weight: 88, strength: 20  },
  { week: 'W2',  weight: 86, strength: 28  },
  { week: 'W3',  weight: 85, strength: 35  },
  { week: 'W4',  weight: 83, strength: 45  },
  { week: 'W6',  weight: 81, strength: 58  },
  { week: 'W8',  weight: 79, strength: 68  },
  { week: 'W10', weight: 77, strength: 78  },
  { week: 'W12', weight: 75, strength: 90  },
]

const W = 560
const H = 180
const PAD = { top: 20, right: 20, bottom: 36, left: 36 }
const chartW = W - PAD.left - PAD.right
const chartH = H - PAD.top - PAD.bottom

function toSVGCoords(
  points: { week: string; value: number }[],
  min: number,
  max: number,
) {
  return points.map((p, i) => {
    const x = PAD.left + (i / (points.length - 1)) * chartW
    const y = PAD.top + chartH - ((p.value - min) / (max - min)) * chartH
    return { x, y, label: p.week }
  })
}

function buildPath(coords: { x: number; y: number }[]) {
  if (coords.length === 0) return ''
  let d = `M ${coords[0].x} ${coords[0].y}`
  for (let i = 1; i < coords.length; i++) {
    const cp1x = (coords[i - 1].x + coords[i].x) / 2
    d += ` C ${cp1x} ${coords[i - 1].y}, ${cp1x} ${coords[i].y}, ${coords[i].x} ${coords[i].y}`
  }
  return d
}

function AnimatedPath({
  d,
  color,
  delay,
  active,
}: {
  d: string
  color: string
  delay: number
  active: boolean
}) {
  const pathRef = useRef<SVGPathElement>(null)
  const [length, setLength] = useState(0)

  useEffect(() => {
    if (pathRef.current) setLength(pathRef.current.getTotalLength())
  }, [d])

  return (
    <motion.path
      ref={pathRef}
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        strokeDasharray: length,
        strokeDashoffset: length,
      }}
      animate={active && length > 0 ? { strokeDashoffset: 0 } : {}}
      transition={{ duration: 1.8, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  )
}

export default function ProgressSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  const weightCoords   = toSVGCoords(progressPoints.map(p => ({ week: p.week, value: p.weight })),   70, 92)
  const strengthCoords = toSVGCoords(progressPoints.map(p => ({ week: p.week, value: p.strength })), 10, 100)

  const weightPath   = buildPath(weightCoords)
  const strengthPath = buildPath(strengthCoords)
  const active = prefersReduced ? true : inView

  return (
    <section className="relative bg-[#0a0a0a] py-20 overflow-hidden border-t border-white/[0.05]">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="w-[500px] h-[300px] rounded-full bg-[#F59E0B] opacity-[0.03] blur-[100px]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3 font-body">Typical Client Journey</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white tracking-tight">
            Progress That You Can <span className="text-[#F59E0B]">See</span>
          </h2>
          <p className="mt-3 text-[#888888] font-body text-sm max-w-md mx-auto leading-relaxed">
            A real-world snapshot  -  weight dropping, strength climbing. Week by week.
          </p>
        </motion.div>

        {/* Chart card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="relative rounded-2xl bg-[#111111] border border-white/[0.08] p-6 md:p-10"
        >
          {/* Legend */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#F59E0B] rounded-full block" />
              <span className="text-[#888888] text-xs font-body uppercase tracking-widest">Strength</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#ff6b6b] rounded-full block" />
              <span className="text-[#888888] text-xs font-body uppercase tracking-widest">Body Weight (kg)</span>
            </div>
          </div>

          {/* SVG chart */}
          <div className="w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full min-w-[320px]"
              aria-label="Progress chart showing strength increase and weight decrease over 12 weeks"
            >
              {/* Horizontal grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((t) => (
                <line
                  key={t}
                  x1={PAD.left}
                  x2={W - PAD.right}
                  y1={PAD.top + t * chartH}
                  y2={PAD.top + t * chartH}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
              ))}

              {/* X-axis labels */}
              {weightCoords.map((c) => (
                <text
                  key={c.label}
                  x={c.x}
                  y={H - 6}
                  textAnchor="middle"
                  fill="#555"
                  fontSize="9"
                  fontFamily="var(--font-inter, sans-serif)"
                >
                  {c.label}
                </text>
              ))}

              {/* Strength area fill (subtle) */}
              <motion.path
                d={`${strengthPath} L ${strengthCoords[strengthCoords.length - 1].x} ${PAD.top + chartH} L ${strengthCoords[0].x} ${PAD.top + chartH} Z`}
                fill="rgba(245,158,11,0.04)"
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.6 }}
              />

              {/* Weight area fill */}
              <motion.path
                d={`${weightPath} L ${weightCoords[weightCoords.length - 1].x} ${PAD.top + chartH} L ${weightCoords[0].x} ${PAD.top + chartH} Z`}
                fill="rgba(255,107,107,0.04)"
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.4 }}
              />

              {/* Animated lines */}
              <AnimatedPath d={weightPath}   color="#ff6b6b" delay={0.2} active={active} />
              <AnimatedPath d={strengthPath} color="#F59E0B" delay={0.5} active={active} />

              {/* Dots on strength line */}
              {strengthCoords.map((c, i) => (
                <motion.circle
                  key={i}
                  cx={c.x}
                  cy={c.y}
                  r="3.5"
                  fill="#F59E0B"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={active ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + (i / strengthCoords.length) * 1.3 }}
                />
              ))}

              {/* Dots on weight line */}
              {weightCoords.map((c, i) => (
                <motion.circle
                  key={i}
                  cx={c.x}
                  cy={c.y}
                  r="3.5"
                  fill="#ff6b6b"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={active ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.2 + (i / weightCoords.length) * 1.3 }}
                />
              ))}
            </svg>
          </div>

          {/* Bottom label */}
          <p className="mt-4 text-center text-[#888888]/40 text-[10px] font-body uppercase tracking-widest">
            Example 12-week transformation · Individual results vary
          </p>
        </motion.div>

        {/* Stat callouts */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '−13 kg', label: 'Average weight lost' },
            { value: '+68%',   label: 'Strength increase'   },
            { value: '12 wk',  label: 'Program duration'    },
            { value: '100%',   label: 'Personalised plan'   },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center text-center p-4 rounded-xl bg-[#111111] border border-white/[0.06]"
            >
              <span className="font-heading font-bold text-2xl text-[#F59E0B]">{stat.value}</span>
              <span className="mt-1 text-[#888888] text-xs font-body">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}



