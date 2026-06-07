import { Languages } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { LOCALE_LABELS, SUPPORTED_LOCALES, type Locale } from '@/i18n'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  className?: string
  // 'pill' — round dark capsule matching the Canvas action buttons
  // 'inline' — light pill with text buttons for the HomePage
  variant?: 'pill' | 'inline'
}

export function LanguageSwitcher({ className, variant = 'pill' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useTranslation()

  if (variant === 'inline') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1 border-2 border-stone-950 bg-[#f8f5ee] px-2 py-1 text-xs uppercase tracking-[0.16em]',
          className,
        )}
      >
        <Languages className="h-3.5 w-3.5 mr-1" />
        {SUPPORTED_LOCALES.map((locale: Locale) => {
          const active = language === locale
          return (
            <button
              key={locale}
              onClick={() => setLanguage(locale)}
              className={cn(
                'px-2 py-1 transition-colors',
                active ? 'bg-stone-950 text-[#f8f5ee]' : 'text-stone-700 hover:bg-stone-200',
              )}
              aria-pressed={active}
            >
              {LOCALE_LABELS[locale]}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-black px-3 py-2 text-white shadow-lg',
        className,
      )}
    >
      <Languages size={14} />
      {SUPPORTED_LOCALES.map((locale: Locale) => {
        const active = language === locale
        return (
          <button
            key={locale}
            onClick={() => setLanguage(locale)}
            className={cn(
              'rounded-full px-2 py-0.5 text-xs font-medium transition-colors',
              active ? 'bg-white text-black' : 'text-white/70 hover:text-white',
            )}
            aria-pressed={active}
            aria-label={`Switch language to ${LOCALE_LABELS[locale]}`}
          >
            {LOCALE_LABELS[locale]}
          </button>
        )
      })}
    </div>
  )
}
