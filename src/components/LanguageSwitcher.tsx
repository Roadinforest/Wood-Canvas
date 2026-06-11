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
          'inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/72 p-1 text-xs shadow-sm backdrop-blur-xl',
          className,
        )}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <Languages className="h-3.5 w-3.5" />
        </span>
        {SUPPORTED_LOCALES.map((locale: Locale) => {
          const active = language === locale
          return (
            <button
              key={locale}
              onClick={() => setLanguage(locale)}
              className={cn(
                'rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all',
                active
                  ? 'bg-slate-950 text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)]'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
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
