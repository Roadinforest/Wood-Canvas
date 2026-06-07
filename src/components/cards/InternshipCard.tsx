import { BentoCard } from '../BentoCard'
import REDNoteSvg from '/REDNote.svg'
import CapcutSvg from '/Capcut.svg'
import { useTranslation } from '@/hooks/useTranslation'
import { internshipMetas } from '@/data/siteContent'

interface InternshipCardProps {
  index: number
}

const icons = {
  rednote: REDNoteSvg,
  capcut: CapcutSvg,
}

export function InternshipCard({ index }: InternshipCardProps) {
  const { t } = useTranslation()
  const meta = internshipMetas[index]
  const localized = t.internships[index]
  const role = localized?.role ?? ''
  const description = localized?.description ?? ''
  const IconSrc = meta.icon ? icons[meta.icon] : null

  return (
    <BentoCard size="md" className="row-span-1">
      <div className="flex items-center gap-2 mb-1">
        {IconSrc && <img src={IconSrc} alt={meta.company} className="w-5 h-5" />}
        <h3 className="text-[14px] font-semibold text-neutral-900">{meta.company}</h3>
      </div>
      <p className="text-[12px] text-text-muted dark:text-text-muted-dark mb-2">{meta.period}</p>
      <p className="text-[13px] font-medium text-neutral-700 mb-2">{role}</p>
      <p className="text-[12px] text-text-muted dark:text-text-muted-dark leading-relaxed">{description}</p>
    </BentoCard>
  )
}
