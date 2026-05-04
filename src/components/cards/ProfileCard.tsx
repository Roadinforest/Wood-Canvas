import { BentoCard } from '../BentoCard'
import { useModalStore } from '@/store/modalStore'

interface ProfileCardProps {
  data: {
    name: string
    title: string
    avatar?: string
  }
}

export function ProfileCard({ data }: ProfileCardProps) {
  const openModal = useModalStore((state) => state.openModal)

  return (
    <BentoCard
      className="col-span-2 row-span-2 justify-end"
      onClick={() => openModal({ title: data.name, content: data.title, type: 'profile' })}
    >
      <div className="w-20 h-20 bg-black rounded-full mb-auto" />
      <h1 className="text-[32px] font-semibold tracking-tight mb-2">{data.name}</h1>
      <p className="text-[15px] text-text-muted leading-relaxed">{data.title}</p>
    </BentoCard>
  )
}