import { BentoCard } from '../BentoCard'

interface SocialCardProps {
  icon: string
}

export function SocialCard({ icon }: SocialCardProps) {
  return (
    <BentoCard className="col-span-1 row-span-1 justify-center items-center">
      <span className="text-[32px] font-bold">{icon}</span>
    </BentoCard>
  )
}