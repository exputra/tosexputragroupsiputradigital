"use client"

import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/lib/transition'
import { useLanguage } from '@/lib/language'

export default function Home() {
  const { t } = useLanguage()

  return (
    <section className="relative isolate flex min-h-[86.5vh] items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.08),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(0,0,0,0.06),_transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.04),_transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-foreground/5 to-transparent blur-3xl" />

      <div className="grid w-full max-w-6xl items-center gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
        <div className="space-y-6 text-center lg:text-left sm:space-y-8">
          <div className="inline-flex items-center rounded-full border bg-background/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground shadow-sm backdrop-blur">
            {t('officialInfo')}
          </div>

          <div className="space-y-4 sm:space-y-5">
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl lg:text-7xl">
              {t('heroTitle')}
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7 lg:mx-0 lg:text-lg">
              {t('heroDescription')}
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <Link
              href="/docs/terms-of-service"
              className={buttonVariants({ className: 'w-full px-6 sm:w-auto', size: 'lg' })}
            >
              {t('readPolicies')}
            </Link>
            <Link
              href="/docs/privacy-policy"
              className={buttonVariants({
                className: 'w-full px-6 sm:w-auto',
                size: 'lg',
                variant: 'outline',
              })}
            >
              {t('privacyPolicy')}
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:max-w-3xl">
            {[
                t('termsOfService'),
                t('privacyPolicy'),
                t('refundPolicy'),
                t('maintenanceSupportPolicy'),
                t('dmcaPolicy'),
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border bg-background/80 px-4 py-3 text-sm font-medium shadow-sm backdrop-blur"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto hidden w-full max-w-lg lg:block">
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border border-dashed border-foreground/15 bg-background/40" />
          <div className="relative rounded-[2rem] border bg-background/90 p-6 shadow-xl backdrop-blur sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {t('sidebarMenu')}
            </p>
            <div className="mt-3 space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight">{t('allPagesTitle')}</h2>
              <p className="text-sm leading-6 text-muted-foreground">{t('allPagesDescription')}</p>
            </div>

            <div className="mt-6 space-y-3">
              {[
                  t('termsOfService'),
                  t('privacyPolicy'),
                  t('refundPolicy'),
                  t('maintenanceSupportPolicy'),
                  t('dmcaPolicy'),
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl border px-4 py-3 text-sm"
                >
                  <span className="font-medium">{item}</span>
                  <span className="text-xs text-muted-foreground">0{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
