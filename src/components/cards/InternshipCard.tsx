import { BentoCard } from '../BentoCard'
import REDNoteSvg from '/public/REDNote.svg'
import CapcutSvg from '/public/Capcut.svg'

interface InternshipCardProps {
  company: string
  period: string
  role: string
  description: string
  icon?: 'rednote' | 'capcut'
}

const icons = {
  rednote: REDNoteSvg,
  capcut: CapcutSvg,
}

export function InternshipCard({ company, period, role, description, icon }: InternshipCardProps) {
  const IconSrc = icon ? icons[icon] : null

  return (
    <BentoCard size="md" className="row-span-1">
      <div className="flex items-center gap-2 mb-1">
        {IconSrc && <img src={IconSrc} alt={company} className="w-5 h-5" />}
        <h3 className="text-[14px] font-semibold text-neutral-900">{company}</h3>
      </div>
      <p className="text-[12px] text-text-muted mb-2">{period}</p>
      <p className="text-[13px] font-medium text-neutral-700 mb-2">{role}</p>
      <p className="text-[12px] text-text-muted leading-relaxed">{description}</p>
    </BentoCard>
  )
}