import { zhCN } from './locales/zh-CN'
import { enUS } from './locales/en-US'
import type { TranslationDictionary } from './types'

export type Locale = 'zh-CN' | 'en-US'

export const SUPPORTED_LOCALES: Locale[] = ['zh-CN', 'en-US']

export const LOCALE_LABELS: Record<Locale, string> = {
  'zh-CN': '中文',
  'en-US': 'EN',
}

export const DEFAULT_LOCALE: Locale = 'zh-CN'

export const translations: Record<Locale, TranslationDictionary> = {
  'zh-CN': zhCN,
  'en-US': enUS,
}
