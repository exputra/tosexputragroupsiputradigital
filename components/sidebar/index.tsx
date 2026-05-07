'use client'

import { LuAlignLeft } from 'react-icons/lu'
import { Logo } from '@/components/navigation/logo'
import { NavMenu } from '@/components/navigation/navbar'
import { PageMenu } from '@/components/sidebar/pagemenu'
import { Button } from '@/components/ui/button'
import { DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useLanguage } from '@/lib/language'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'

export function Sidebar() {
  const { t } = useLanguage()

  return (
    <aside
      className="sticky top-26 hidden h-screen min-w-64 flex-1 flex-col overflow-y-auto md:flex"
      aria-label="Page navigation"
    >
      <ScrollArea className="pr-2">
        <div className="rounded-2xl border bg-background/80 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/70">
          <div className="mb-4 space-y-1 border-b pb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {t('sidebarMenu')}
            </p>
            <h2 className="text-lg font-semibold text-foreground">{t('policies')}</h2>
            <p className="text-sm text-muted-foreground">{t('sidebarDescription')}</p>
          </div>
          <PageMenu />
        </div>
      </ScrollArea>
    </aside>
  )
}

export function SheetLeft() {
  const { t } = useLanguage()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" size="icon" className="flex cursor-pointer md:hidden">
          <LuAlignLeft className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full w-[88vw] max-w-sm flex-col gap-0 px-0" side="left">
        <DialogTitle className="sr-only">Menu</DialogTitle>
        <SheetHeader className="border-b px-5 py-4 text-left">
          <SheetClose asChild>
            <Logo />
          </SheetClose>
          <div className="mt-4 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {t('sidebarMenu')}
            </p>
            <p className="text-sm text-muted-foreground">{t('sidebarDescription')}</p>
          </div>
        </SheetHeader>
        <SheetDescription className="sr-only">Page navigation</SheetDescription>
        <ScrollArea className="flex h-full flex-col overflow-y-auto">
          <div className="mx-0 mt-3 flex flex-col gap-2.5 px-5 pb-6">
            <NavMenu isSheet />
            <Separator className="my-2" />
            <PageMenu isSheet />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
