import { Link } from '@/lib/transition'

import { Settings } from '@/types/settings'

export const Logo = () => {
  return (
    <Link
      href="/"
      title={`${Settings.title} main logo`}
      aria-label={`${Settings.title} main logo`}
      className="inline-flex shrink-0 items-center"
    >
      <img
        src={Settings.siteicon}
        alt={`${Settings.title} main logo`}
        title={`${Settings.title} main logo`}
        aria-label={`${Settings.title} main logo`}
        className="block h-auto w-[96px] max-w-none shrink-0 object-contain sm:w-[140px] lg:w-[220px]"
      />
    </Link>
  )
}
