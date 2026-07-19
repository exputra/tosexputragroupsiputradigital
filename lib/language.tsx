'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Language = 'en' | 'id'

type Translations = Record<string, string>

const translations: Record<Language, Translations> = {
  en: {
    policies: 'Policies',
    sidebarMenu: 'Sidebar Menu',
    sidebarDescription: 'Terms, privacy, refunds, maintenance, and copyright information.',
    officialInfo: 'Exputra Digital Official Information',
    heroTitle: 'Terms & Policies',
    heroDescription: 'Service terms, policies, and official information of Exputra Digital.',
    readPolicies: 'Read Policies',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    refundPolicy: 'Refund Policy',
    maintenanceSupportPolicy: 'Maintenance & Support Policy',
    dmcaPolicy: 'DMCA Policy',
    allPagesTitle: 'All policy pages in one place',
    allPagesDescription:
      'A clean central hub for legal, support, and service information related to Exputra Digital.',
    policyDocument: 'Policy Document',
  },
  id: {
    policies: 'Kebijakan',
    sidebarMenu: 'Menu Samping',
    sidebarDescription: 'Informasi syarat, privasi, refund, maintenance, dan hak cipta.',
    officialInfo: 'Informasi Resmi Exputra Digital',
    heroTitle: 'Syarat & Kebijakan',
    heroDescription: 'Syarat layanan, kebijakan, dan informasi resmi Exputra Digital.',
    readPolicies: 'Baca Kebijakan',
    privacyPolicy: 'Kebijakan Privasi',
    termsOfService: 'Syarat Layanan',
    refundPolicy: 'Kebijakan Refund',
    maintenanceSupportPolicy: 'Kebijakan Maintenance & Support',
    dmcaPolicy: 'Kebijakan DMCA',
    allPagesTitle: 'Semua halaman kebijakan dalam satu tempat',
    allPagesDescription:
      'Pusat informasi yang rapi untuk layanan hukum, dukungan, dan informasi resmi Exputra Digital.',
    policyDocument: 'Dokumen Kebijakan',
  },
}

interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  toggleLang: () => void
  t: (key: keyof Translations) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en')

  useEffect(() => {
    const savedLocal = window.localStorage.getItem('site-language')
    const savedCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('site-language='))
      ?.split('=')[1]

    const saved = savedLocal === 'id' || savedLocal === 'en' ? savedLocal : savedCookie

    if (saved === 'en' || saved === 'id') {
      setLangState(saved)
      document.documentElement.lang = saved
      return
    }

    document.documentElement.lang = 'en'
  }, [])

  useEffect(() => {
    window.localStorage.setItem('site-language', lang)
    document.cookie = `site-language=${lang}; path=/; max-age=31536000`
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: setLangState,
        toggleLang: () => {
          const next = lang === 'en' ? 'id' : 'en'
          setLangState(next)
          window.localStorage.setItem('site-language', next)
          document.cookie = `site-language=${next}; path=/; max-age=31536000`
          document.documentElement.lang = next
          window.location.reload()
        },
      t: (key) => translations[lang][key] ?? translations.en[key] ?? String(key),
    }),
    [lang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
