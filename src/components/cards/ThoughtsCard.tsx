import { BentoCard } from '../BentoCard'

export function ThoughtsCard() {
  return (
    <BentoCard size="md" rowSpan={2}>
      <h2 className="text-[20px] font-medium mb-3">Thoughts</h2>
      <p className="text-[15px] text-text-muted leading-relaxed">Everyone should find a way out here🫨</p>
    </BentoCard>
  )
}