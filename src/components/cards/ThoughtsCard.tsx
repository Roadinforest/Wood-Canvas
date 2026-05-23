import { BentoCard } from '../BentoCard'
import { thought } from '@/data/siteContent'

export function ThoughtsCard() {
  return (
    <BentoCard size="md" rowSpan={2}>
      <h2 className="text-[20px] font-medium mb-3">Thoughts</h2>
      <p className="text-[15px] text-text-muted dark:text-text-muted-dark leading-relaxed">{thought}</p>
    </BentoCard>
  )
}
