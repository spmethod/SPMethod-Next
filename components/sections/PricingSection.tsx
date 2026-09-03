'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Check, MapPin, Monitor, CreditCard, Star } from 'lucide-react'
import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'

type Format = 'online' | 'inperson'

export default function PricingSection() {
  const [format, setFormat] = useState<Format>('online')
  const prefersReduced = useReducedMotion()
  const { tr } = useLang()
  const p = tr.pricing

  return (
    <section id="programs" className="relative overflow-hidden bg-[#111111] py-28">
      {/* Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#F59E0B] opacity-[0.03] blur-[100px]" aria-hidden="true" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3 font-body">{p.label}</p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight mb-4">
            {p.heading}
          </h2>
          <p className="text-[#888888] max-w-lg mx-auto font-body text-sm leading-relaxed">
            {p.body}
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-[#1a1a1a] rounded-xl p-1 border border-white/[0.08]">
            {(['online', 'inperson'] as Format[]).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`relative px-6 py-2.5 rounded-lg text-sm font-semibold font-body transition-colors duration-200 ${
                  format === f ? 'text-black' : 'text-[#888888] hover:text-white'
                }`}
              >
                {format === f && (
                  <motion.div
                    layoutId="pricing-pill"
                    className="absolute inset-0 bg-[#F59E0B] rounded-lg"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {f === 'online' ? <Monitor size={14} /> : <MapPin size={14} />}
                  {f === 'online' ? p.toggleOnline : p.toggleInperson}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">

          {/* -- ONLINE -- */}
          {format === 'online' && (
            <motion.div
              key="online"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {/* Subscription card */}
              <div className="relative rounded-2xl bg-gradient-to-br from-[#1c1a14] to-[#1a1a1a] border border-[#F59E0B]/40 shadow-[0_0_60px_rgba(245,158,11,0.08)] p-8 md:p-12">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F59E0B]/60 to-transparent rounded-t-2xl" />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
                  {/* Left */}
                  <div className="flex-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] text-xs font-bold font-body tracking-wide border border-[#F59E0B]/25 mb-4">
                      <Monitor size={11} /> {p.onlineBadge}
                    </span>
                    <h3 className="font-heading font-bold text-2xl text-white mb-2 tracking-tight">
                      {p.onlineTitle}
                    </h3>
                    <p className="text-[#888888] font-body text-sm mb-6 leading-relaxed">
                      {p.onlineBody}
                    </p>

                    <ul className="flex flex-col gap-3 mb-6">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm font-body text-[#888888]">
                          <Check size={14} className="flex-shrink-0 text-[#F59E0B]" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <p className="text-[#888888]/50 text-xs font-body">
                      {p.cancel}
                    </p>
                  </div>

                  {/* Right  -  price + CTA */}
                  <div className="flex flex-col items-center md:items-end gap-5 md:min-w-[180px]">
                    <div className="text-center md:text-right">
                      <p className="font-heading font-bold text-6xl text-white leading-none">€300</p>
                      <p className="text-[#888888] font-body text-sm mt-2">{p.perMonth}</p>
                    </div>
                    <Link
                      href="/#contact"
                      className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-[#F59E0B] text-black font-bold font-heading text-sm rounded-lg uppercase tracking-wide hover:scale-105 hover:shadow-[0_0_24px_rgba(245,158,11,0.45)] transition-all duration-200 whitespace-nowrap"
                    >
                      {p.getStarted}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* -- IN-PERSON -- */}
          {format === 'inperson' && (
            <motion.div
              key="inperson"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-8"
            >
              {/* Location bar */}
              <div className="flex items-center justify-center gap-2 text-[#888888] text-sm font-body">
                <MapPin size={14} className="text-[#F59E0B]" />
                {p.locationBar}
              </div>

              {/* Single session */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="px-8 py-5 rounded-xl bg-[#1a1a1a] border border-white/[0.08] flex items-center gap-6">
                  <div>
                    <p className="text-[#888888] font-body text-xs uppercase tracking-widest mb-1">{p.singleSession}</p>
                    <p className="text-white font-body text-sm">{p.oneHour}</p>
                  </div>
                  <p className="font-heading font-bold text-4xl text-white">€70</p>
                </div>
              </div>

              {/* Packages */}
              <div>
                <p className="text-[#888888] text-xs font-semibold uppercase tracking-widest mb-4 font-body text-center">{p.packagesLabel}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { hours: 5,  price: '€340',   perHour: '€68/h' },
                    { hours: 10, price: '€670',   perHour: '€67/h' },
                    { hours: 25, price: '€1,625', perHour: '€65/h', popular: true },
                    { hours: 50, price: '€3,150', perHour: '€63/h' },
                  ].map((pkg, i) => (
                    <motion.div
                      key={pkg.hours}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      className={`relative flex flex-col items-center text-center p-6 rounded-xl border transition-all duration-300 ${
                        pkg.popular
                          ? 'bg-[#211d10] border-[#F59E0B]/40 shadow-[0_0_30px_rgba(245,158,11,0.08)]'
                          : 'bg-[#1a1a1a] border-white/[0.08] hover:border-white/20'
                      }`}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#F59E0B] text-black text-[10px] font-bold font-body tracking-wide">
                            <Star size={8} fill="black" /> {p.bestValue}
                          </span>
                        </div>
                      )}
                      <p className="text-[#888888] font-body text-xs uppercase tracking-widest mb-2">{pkg.hours}h</p>
                      <p className="font-heading font-bold text-3xl text-white mb-1">{pkg.price}</p>
                      <p className="text-[#F59E0B] font-body text-xs">{pkg.perHour}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex justify-center">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-10 py-4 bg-[#F59E0B] text-black font-bold font-heading text-sm rounded-lg uppercase tracking-wide hover:scale-105 hover:shadow-[0_0_24px_rgba(245,158,11,0.45)] transition-all duration-200"
                >
                  {p.bookSession}
                </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Payment methods */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-2 text-[#888888]/50 text-xs font-body"
        >
          <CreditCard size={13} className="text-[#888888]/40" />
          <span>{p.paymentVia}</span>
          <span className="text-[#888888]/70">{p.bankTransfer}</span>
          <span>·</span>
          <span className="text-[#888888]/70">PayPal</span>
          <span>·</span>
          <span className="text-[#888888]/70">{p.cash}</span>
        </motion.div>

      </div>
    </section>
  )
}



