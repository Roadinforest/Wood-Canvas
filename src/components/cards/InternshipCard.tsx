import { BentoCard } from '../BentoCard'

interface InternshipCardProps {
  company: string
  period: string
  role: string
  description: string
}

export function InternshipCard({ company, period, role, description }: InternshipCardProps) {
  return (
    <BentoCard className="col-span-1 row-span-1">
      <h3 className="text-[14px] font-semibold text-neutral-900 mb-1">{company}</h3>
      <p className="text-[12px] text-text-muted mb-2">{period}</p>
      <p className="text-[13px] font-medium text-neutral-700 mb-2">{role}</p>
      <p className="text-[12px] text-text-muted leading-relaxed">{description}</p>
    </BentoCard>
  )
}