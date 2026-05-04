import { BentoCard } from '../BentoCard'

interface ThoughtsCardProps {
  data: {
    title: string
    content: string
  }
}

export function ThoughtsCard({ data }: ThoughtsCardProps) {
  return (
    <BentoCard className="col-span-2 row-span-2">
      <h2 className="text-[20px] font-medium mb-3">{data.title}</h2>
      <p className="text-[15px] text-text-muted leading-relaxed">{data.content}</p>
    </BentoCard>
  )
}