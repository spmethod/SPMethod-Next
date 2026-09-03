'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Award, Dumbbell, Zap, ShieldCheck, MapPin, Globe } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'

const icons = [
  <Award key="a" size={15} />,
  <Dumbbell key="d" size={15} />,
  <Zap key="z" size={15} />,
  <ShieldCheck key="s" size={15} />,
  <MapPin key="m" size={15} />,
  <Globe key="g" size={15} />,
]

export default function CredentialsBar() {
  const prefersReduced = useReducedMotion()
  const { tr } = useLang()
  const credentials = tr.credentials.map((label, i) => ({ icon: icons[i], label }))
  const doubled = [...credentials, ...credentials]

  return (
    <section className="relative bg-[#111111] border-y border-white/[0.06] py-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Track */}
        <div
          className="group flex gap-5 w-max"
          style={{
            animation: prefersReduced ? 'none' : 'marquee 28s linear infinite',
          }}
          onMouseEnter={(e) => {
            if (!prefersReduced) {
              (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused'
            }
          }}
          onMouseLeave={(e) => {
            if (!prefersReduced) {
              (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running'
            }
          }}
        >
          {doubled.map((cred, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#F59E0B]/25 bg-[#F59E0B]/[0.06] text-white/70 hover:text-[#F59E0B] hover:border-[#F59E0B]/50 transition-colors duration-200 cursor-default"
            >
              <span className="text-[#F59E0B]">{cred.icon}</span>
              <span className="text-xs font-semibold font-body uppercase tracking-widest whitespace-nowrap">
                {cred.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}


