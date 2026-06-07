import { useI18nStore } from '@/store/i18nStore'
import { translations, DEFAULT_LOCALE, type Locale } from '@/i18n'

/**
 * useTranslation — returns the current language dictionary.
 *
 * Components read fields directly (e.g. `t.profile.intro`, `t.cards.about.title`)
 * so TypeScript catches missing keys. The dictionary object reference changes
 * when the user switches languages, so any consumer re-renders automatically.
 */
export function useTranslation() {
  const language = useI18nStore((state) => state.language)
  const setLanguage = useI18nStore((state) => state.setLanguage)
  const dict = translations[language] ?? translations[DEFAULT_LOCALE]

  return { t: dict, language, setLanguage } as const
}

export type { Locale }
