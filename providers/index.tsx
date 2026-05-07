import { ViewTransitions } from '@/lib/transition'
import { LanguageProvider } from '@/lib/language'
import { ThemeProvider } from '@/providers/theme'

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <ViewTransitions>{children}</ViewTransitions>
      </LanguageProvider>
    </ThemeProvider>
  )
}
