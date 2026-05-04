import { BentoCard } from '../BentoCard'
import { useModalStore } from '@/store/modalStore'

interface AboutCardProps {
  data: {
    title: string
    content: string
  }
}

export function AboutCard({ data }: AboutCardProps) {
  const openModal = useModalStore((state) => state.openModal)

  return (
    <BentoCard
      className="col-span-2 row-span-1"
      onClick={() => openModal({ title: data.title, content: data.content, type: 'about' })}
    >
      <h2 className="text-[20px] font-medium mb-3">{data.title}</h2>
      <p className="text-[15px] text-text-muted leading-relaxed">{data.content}</p>
    </BentoCard>
  )
}