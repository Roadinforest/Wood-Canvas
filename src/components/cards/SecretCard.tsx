import { BentoCard } from '../BentoCard'

export function SecretCard() {
  return (
    <BentoCard className="col-span-1 row-span-1 bg-black text-white">
      <h2 className="text-[20px] font-medium mb-3">Secret</h2>
      <p className="text-[15px] text-gray-300 leading-relaxed">Keep exploring.</p>
    </BentoCard>
  )
}