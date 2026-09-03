'use client'

import { useLang } from '@/context/LanguageContext'

export default function LanguageToggle() {
  const { lang, setLang } = useLang()
  const isGerman = lang === 'de'

  return (
    <button
      onClick={() => setLang(isGerman ? 'en' : 'de')}
      title={isGerman ? 'Switch to English' : 'Auf Deutsch wechseln'}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 text-sm font-bold font-heading tracking-wide transition-all duration-200 hover:border-[#F59E0B] hover:text-[#F59E0B]"
    >
      <span className="text-base leading-none">{isGerman ? '🇬🇧' : '🇩🇪'}</span>
      <span className={isGerman ? 'text-[#F59E0B]' : 'text-[#888888]'}>
        {isGerman ? 'EN' : 'DE'}
      </span>
    </button>
  )
}
