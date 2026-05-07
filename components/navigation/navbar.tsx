'use client'

import Anchor from '@/components/anchor'
import { Logo } from '@/components/navigation/logo'
import { LanguageToggle } from '@/components/language-toggle'
import { SheetLeft } from '@/components/sidebar'
import { ModeToggle } from '@/components/theme-toggle'
import { SheetClose } from '@/components/ui/sheet'
import { useLanguage } from '@/lib/language'
import { Navigations } from '@/settings/navigation'

export function Navbar() {
  return (
    <nav className="bg-opacity-5 sticky top-0 z-50 mx-auto flex h-12 w-full items-center justify-between border-b px-2 backdrop-blur-xl backdrop-filter sm:h-16 sm:px-4 md:gap-2 md:px-4">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
        <SheetLeft />
        <Logo />
        <div className="hidden items-center gap-4 text-sm font-medium text-muted-foreground xl:flex lg:gap-5">
          <NavMenu />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <LanguageToggle />
        <ModeToggle />
      </div>
    </nav>
  )
}

export function NavMenu({ isSheet = false }) {
  const { t } = useLanguage()

  return (
    <>
      {Navigations.map((item) => {
        const title = item.title === 'Policies' ? t('policies') : item.title
        const Comp = (
          <Anchor
            key={item.title + item.href}
            absolute
            activeClassName="font-bold text-primary"
            className="flex items-center gap-1 text-sm whitespace-nowrap"
            href={item.href}
          >
            {title}
          </Anchor>
        )
        return isSheet ? (
          <SheetClose key={item.title + item.href} asChild>
            {Comp}
          </SheetClose>
        ) : (
          Comp
        )
      })}
    </>
  )
}
