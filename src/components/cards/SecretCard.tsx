import { BentoCard } from '../BentoCard'
import { useTranslation } from '@/hooks/useTranslation'

// Keep these as proper nouns / brand names — not localized.
const links = [
  { label: 'Capcut Visual Studio', url: 'https://www.capcut.com/ai-creator/start' },
  { label: 'Mini Store (Vercel)', url: 'https://mini-store-ten-hazel.vercel.app/' },
]

export function SecretCard() {
  const { t } = useTranslation()
  return (
    <BentoCard size="sm" rowSpan={1} className="bg-black text-white">
      <h2 className="text-[20px] font-medium mb-3">{t.cards.secret.title}</h2>
      <div className="space-y-2">
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[13px] text-gray-300 hover:text-white transition-colors"
          >
            → {link.label}
          </a>
        ))}
      </div>
    </BentoCard>
  )
}
