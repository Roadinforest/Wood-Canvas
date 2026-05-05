import { BentoCard } from '../BentoCard'

export function ProfileCard() {
  return (
    <BentoCard className="col-span-2 row-span-2 justify-end">
      <img src="/header.png" alt="avatar" className="w-20 h-20 rounded-full mb-auto object-cover" />
      <h1 className="text-[32px] font-semibold tracking-tight mb-2">Roadinforest</h1>
      <p className="text-[15px] text-text-muted leading-relaxed whitespace-pre-line">Full Stack Developer
 Agent Developer</p>
    </BentoCard>
  )
}