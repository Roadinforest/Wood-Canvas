import { BentoCard } from '../BentoCard'

interface SocialCardProps {
  data: {
    platform: string
    icon: string
  }
}

export function SocialCard({ data }: SocialCardProps) {
  return (
    <BentoCard className="col-span-1 row-span-1 justify-center items-center">
      <span className="text-[32px] font-bold">{data.icon}</span>
    </BentoCard>
  )
}