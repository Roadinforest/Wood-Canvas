import { BentoCard } from '../BentoCard'
import { useModalStore } from '@/store/modalStore'

interface SocialCardProps {
  data: {
    platform: string
    icon: string
  }
}

export function SocialCard({ data }: SocialCardProps) {
  const openModal = useModalStore((state) => state.openModal)

  return (
    <BentoCard
      className="col-span-1 row-span-1 justify-center items-center"
      onClick={() => openModal({ title: data.platform, content: `Visit my ${data.platform} profile`, type: 'social' })}
    >
      <span className="text-[32px] font-bold">{data.icon}</span>
    </BentoCard>
  )
}