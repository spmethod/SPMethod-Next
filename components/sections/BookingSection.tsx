'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Send } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface FormData {
  name: string
  email: string
  phone: string
  goal: string
  format: string
}

const WEB3FORMS_KEY = '96720e6c-ce5c-47d4-9441-b1e9216cb489'

export default function BookingSection() {
  const { tr } = useLang()
  const b = tr.booking
  const [formState, setFormState] = useState<FormState>('idle')
  const [data, setData] = useState<FormData>({
    name: '', email: '', phone: '', goal: '', format: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: data.name,
          email: data.email,
          phone: data.phone,
          goal: data.goal,
          format: data.format,
          subject: 'New Coaching Request - SPMethod',
        }),
      })

      if (res.ok) {
        setFormState('success')
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  const inputBase =
    'w-full bg-[#111111] border border-white/[0.10] rounded-lg px-4 py-3 text-white text-sm font-body placeholder-[#888888]/60 transition-all duration-200 focus:outline-none focus:border-[#F59E0B] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.12)] focus:bg-[#1a1500]'

  return (
    <section id="contact" className="relative overflow-hidden bg-[#0a0a0a] py-28">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="w-[800px] h-[800px] rounded-full bg-[#F59E0B] opacity-[0.05] blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3 font-body">
            {b.label}
          </p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight mb-4">
            {b.heading} <span className="text-[#F59E0B]">{b.headingHighlight}</span>
          </h2>
          <p className="text-[#888888] font-body text-base leading-relaxed">
            {b.body}
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#1a1a1a] rounded-2xl border border-white/[0.08] p-8 md:p-10"
        >
          <AnimatePresence mode="wait">
            {formState === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center py-12 text-center gap-5"
              >
                <div className="w-16 h-16 rounded-full bg-[#F59E0B]/15 flex items-center justify-center">
                  <CheckCircle size={36} className="text-[#F59E0B]" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-white">
                  {b.successTitle}
                </h3>
                <p className="text-[#888888] font-body text-sm max-w-xs leading-relaxed">
                  {b.successBody}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold font-body uppercase tracking-widest text-[#888888] mb-2">
                      {b.nameLabel}
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={data.name}
                      onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                      placeholder={b.namePlaceholder}
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold font-body uppercase tracking-widest text-[#888888] mb-2">
                      {b.emailLabel}
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={data.email}
                      onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
                      placeholder={b.emailPlaceholder}
                      className={inputBase}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold font-body uppercase tracking-widest text-[#888888] mb-2">
                    {b.phoneLabel} <span className="normal-case text-[#888888]/50">{b.phoneOptional}</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))}
                    placeholder={b.phonePlaceholder}
                    className={inputBase}
                  />
                </div>

                {/* Goal */}
                <div>
                  <label htmlFor="goal" className="block text-xs font-semibold font-body uppercase tracking-widest text-[#888888] mb-2">
                    {b.goalLabel}
                  </label>
                  <select
                    id="goal"
                    required
                    value={data.goal}
                    onChange={(e) => setData((d) => ({ ...d, goal: e.target.value }))}
                    className={`${inputBase} appearance-none`}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                  >
                    <option value="" disabled>{b.goalPlaceholder}</option>
                    {b.goals.map((g) => (
                      <option key={g} value={g} className="bg-[#1a1a1a]">{g}</option>
                    ))}
                  </select>
                </div>

                {/* Format */}
                <div>
                  <p className="block text-xs font-semibold font-body uppercase tracking-widest text-[#888888] mb-3">
                    {b.formatLabel}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: 'inperson', label: b.formatInperson },
                      { value: 'online',   label: b.formatOnline   },
                    ].map(({ value, label }) => (
                      <label
                        key={value}
                        className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                          data.format === value
                            ? 'border-[#F59E0B] bg-[#F59E0B]/10 text-[#F59E0B]'
                            : 'border-white/[0.10] text-[#888888] hover:border-white/20'
                        }`}
                      >
                        <input
                          type="radio"
                          name="format"
                          value={value}
                          checked={data.format === value}
                          onChange={(e) => setData((d) => ({ ...d, format: e.target.value }))}
                          className="sr-only"
                        />
                        <span
                          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all ${
                            data.format === value
                              ? 'border-[#F59E0B] bg-[#F59E0B] shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                              : 'border-white/30'
                          }`}
                        />
                        <span className="text-sm font-medium font-body">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Error message */}
                {formState === 'error' && (
                  <p className="text-red-400 text-sm font-body text-center">
                    {b.errorMsg}
                  </p>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={formState === 'submitting'}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(245,158,11,0.45)' }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 w-full flex items-center justify-center gap-2 py-4 px-8 bg-[#F59E0B] text-black font-bold font-heading text-sm uppercase tracking-wide rounded-xl transition-opacity disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
                >
                  {formState === 'submitting' ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {b.sending}
                    </>
                  ) : (
                    <>
                      {b.submit}
                      <Send size={15} />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
