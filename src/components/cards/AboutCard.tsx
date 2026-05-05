import { BentoCard } from '../BentoCard'

export function AboutCard() {
  return (
    <BentoCard className="col-span-2 row-span-1">
      <h2 className="text-[20px] font-medium mb-3">About</h2>
      <p className="text-[15px] text-text-muted leading-relaxed">Everyone will find its own way to explore the world.</p>
    </BentoCard>
  )
}