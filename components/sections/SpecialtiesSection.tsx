'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/context/LanguageContext'

const tagsByItem = [
  ['Fat Loss', 'Nutrition', 'Recomposition'],
  ['Hypertrophy', 'Strength', 'Periodisation'],
]

export default function SpecialtiesSection() {
  const { tr } = useLang()
  const s = tr.specialties

  return (
    <section id="specialties" className="relative overflow-hidden bg-[#0a0a0a] py-28">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#0ea5c9] text-xs font-semibold uppercase tracking-widest mb-3 font-body">{s.label}</p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight">
            {s.heading.split(' ').slice(0, -2).join(' ')}{' '}
            <span className="relative inline-block">
              {s.heading.split(' ').slice(-2).join(' ')}
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#F59E0B] to-transparent rounded-full" />
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {s.items.map((spec, i) => (
            <motion.div
              key={spec.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.65, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col p-8 rounded-xl bg-[#1a1a1a] border border-white/[0.08] transition-all duration-300 hover:border-white/[0.14]"
            >
              <h3 className="font-heading font-bold text-xl text-white mb-3 tracking-tight">{spec.title}</h3>
              <p className="text-[#888888] text-sm leading-relaxed font-body mb-6 flex-1">{spec.body}</p>
              <div className="flex flex-wrap gap-2">
                {tagsByItem[i].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-semibold font-body bg-[#0ea5c9]/10 text-[#0ea5c9] border border-[#0ea5c9]/20"
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
