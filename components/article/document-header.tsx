'use client'

import { Separator } from '@/components/ui/separator'
import { useLanguage } from '@/lib/language'

interface DocumentHeaderProps {
  title: string
  description: string
}

export function DocumentHeader({ title, description }: DocumentHeaderProps) {
  const { t } = useLanguage()

  return (
    <div className="mb-8 rounded-2xl border bg-background/80 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/70 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {t('policyDocument')}
      </p>
      <div className="mt-3 space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>
      </div>
      <Separator className="mt-5" />
    </div>
  )
}
