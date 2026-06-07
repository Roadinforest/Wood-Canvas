import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_LOCALE, type Locale, translations } from '@/i18n'
import type { TranslationDictionary } from '@/i18n/types'

export type { TranslationDictionary }

interface I18nState {
  language: Locale
  setLanguage: (language: Locale) => void
}

// Persisted so the user's choice survives reloads. Default is Chinese.
export const useI18nStore = create<I18nState>()(
  persist(
    (set) => ({
      language: DEFAULT_LOCALE,
      setLanguage: (language) => set({ language }),
    }),
    { name: 'i18n-language' },
  ),
)

// Read-only accessor for non-React code paths (e.g. inside modal content builders).
export function getTranslation(language: Locale = DEFAULT_LOCALE): TranslationDictionary {
  return translations[language] ?? translations[DEFAULT_LOCALE]
}
