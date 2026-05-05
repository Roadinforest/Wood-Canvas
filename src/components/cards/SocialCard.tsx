import { BentoCard } from '../BentoCard'

interface SocialCardProps {
  icon: string
}

export function SocialCard({ icon }: SocialCardProps) {
  return (
    <BentoCard size="sm" rowSpan={1} className="justify-center items-center">
      <span className="text-[32px] font-bold">{icon}</span>
    </BentoCard>
  )
}