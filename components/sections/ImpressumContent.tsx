'use client'

import { useLang } from '@/context/LanguageContext'

/* ------------------------------------------------------------------
   EDIT THESE before going live.
   - LEGAL_NAME: your full legal name as on your ID.
   - ADDRESS: a full street address that can receive official mail
     (no P.O. box). Must be filled in — the Impressum is not valid without it.
   Once you register your trade (Gewerbe), add: trade authority
   (Gewerbebehörde, e.g. "Magistratisches Bezirksamt …"), WKO membership
   and, if applicable, your UID number.
------------------------------------------------------------------- */
const LEGAL_NAME = 'Nikolaus Spartalis'
const ADDRESS_LINES = ['Hafnersteig 2-4', '1010 Wien, Österreich']
const EMAIL = 'SPMethod22@gmail.com'
const PHONE = '+43 664 946 3007'
const PHONE_HREF = 'tel:+436649463007'

export default function ImpressumContent() {
  const { tr } = useLang()
  const i = tr.impressum

  return (
    <section className="bg-[#0a0a0a] pt-36 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-[#0ea5c9] text-xs font-semibold uppercase tracking-widest mb-3">{i.label}</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">{i.heading}</h1>
        <p className="text-[#888888] text-sm leading-relaxed mb-12">{i.intro}</p>

        <dl className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          <Row title={i.ownerTitle}>
            <p className="text-white">{LEGAL_NAME}</p>
            <p>SPMethod</p>
            {ADDRESS_LINES.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </Row>

          <Row title={i.contactTitle}>
            <p>
              {i.emailLabel}:{' '}
              <a href={`mailto:${EMAIL}`} className="text-[#F59E0B] hover:underline underline-offset-4">{EMAIL}</a>
            </p>
            <p>
              {i.phoneLabel}:{' '}
              <a href={PHONE_HREF} className="text-[#F59E0B] hover:underline underline-offset-4">{PHONE}</a>
            </p>
          </Row>

          <Row title={i.activityTitle}>
            <p>{i.activity}</p>
          </Row>

          <Row title={i.purposeTitle}>
            <p>{i.purpose}</p>
          </Row>
        </dl>
      </div>
    </section>
  )
}

function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-[220px_1fr] gap-2 md:gap-8 py-6">
      <dt className="text-white/40 text-xs font-semibold uppercase tracking-widest pt-1">{title}</dt>
      <dd className="text-[#bbbbbb] text-sm leading-relaxed space-y-1">{children}</dd>
    </div>
  )
}
