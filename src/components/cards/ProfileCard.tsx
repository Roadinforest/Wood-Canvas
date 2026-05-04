import { BentoCard } from '../BentoCard'

interface ProfileCardProps {
  data: {
    name: string
    title: string
    avatar?: string
  }
}

export function ProfileCard({ data }: ProfileCardProps) {
  return (
    <BentoCard className="col-span-2 row-span-2 justify-end">
      <img src="/header.png" alt="avatar" className="w-20 h-20 rounded-full mb-auto object-cover" />
      <h1 className="text-[32px] font-semibold tracking-tight mb-2">{data.name}</h1>
      <p className="text-[15px] text-text-muted leading-relaxed whitespace-pre-line">{data.title}</p>
    </BentoCard>
  )
}