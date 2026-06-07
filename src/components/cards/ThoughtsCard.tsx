import { BentoCard } from '../BentoCard'
import { useTranslation } from '@/hooks/useTranslation'

export function ThoughtsCard() {
  const { t } = useTranslation()
  return (
    <BentoCard size="md" rowSpan={2}>
      <h2 className="text-[20px] font-medium mb-3">{t.cards.thoughts.title}</h2>
      <p className="text-[15px] text-text-muted dark:text-text-muted-dark leading-relaxed">{t.thought}</p>
    </BentoCard>
  )
}
