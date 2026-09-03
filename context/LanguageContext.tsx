'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { t, Lang } from '@/lib/translations'

interface LanguageContextType {
  lang: Lang
  setLang: (l: Lang) => void
  tr: typeof t['en']
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  tr: t.en,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  return (
    <LanguageContext.Provider value={{ lang, setLang, tr: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
