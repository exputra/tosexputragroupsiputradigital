'use client'

import Image from 'next/image'
import { useLanguage } from '@/lib/language'

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage()
  const nextLang = lang === 'en' ? 'id' : 'en'

  return (
    <button
      type="button"
      onClick={toggleLang}
      className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border bg-background px-2 text-xs font-semibold text-foreground shadow-sm transition hover:bg-muted sm:h-10 sm:gap-2 sm:px-2.5"
      aria-label={nextLang === 'id' ? 'Switch to Indonesian' : 'Switch to English'}
      title={nextLang === 'id' ? 'Switch to Indonesian' : 'Switch to English'}
    >
      <Image
        src={nextLang === 'id' ? '/indonesia.png' : '/united-kingdom.png'}
        alt={nextLang === 'id' ? 'Indonesian flag' : 'English flag'}
        width={24}
        height={18}
        className="h-3.5 w-5 rounded-[3px] object-cover sm:h-4 sm:w-6"
      />
      <span className="hidden sm:inline-flex">{nextLang.toUpperCase()}</span>
    </button>
  )
}
