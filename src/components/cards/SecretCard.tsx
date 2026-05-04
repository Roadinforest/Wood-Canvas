import { BentoCard } from '../BentoCard'
import { useModalStore } from '@/store/modalStore'

interface SecretCardProps {
  data: {
    title: string
    content: string
  }
}

export function SecretCard({ data }: SecretCardProps) {
  const openModal = useModalStore((state) => state.openModal)

  return (
    <BentoCard
      className="col-span-1 row-span-1 bg-black text-white"
      onClick={() => openModal({ title: data.title, content: data.content, type: 'secret' })}
    >
      <h2 className="text-[20px] font-medium mb-3">{data.title}</h2>
      <p className="text-[15px] text-gray-300 leading-relaxed">{data.content}</p>
    </BentoCard>
  )
}