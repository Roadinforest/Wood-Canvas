import { BentoCard } from '../BentoCard'
import { skillGroupMetas } from '@/data/siteContent'
import { useTranslation } from '@/hooks/useTranslation'

export function UISkillCard() {
  const { t } = useTranslation()
  const meta = skillGroupMetas[0]
  const localized = t.skillGroups[0]

  return (
    <BentoCard size="md" rowSpan={1} borderColor={meta.borderColor}>
      <h3 className="text-[20px] font-medium mb-1" style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.5px' }}>
        {localized.title}
      </h3>
      <p className="text-[13px] text-text-muted dark:text-text-muted-dark mb-4">{localized.description}</p>
      <div className="flex flex-wrap gap-3">
        {meta.skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-[10px] text-[13px] font-medium text-[#404040] border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          >
            <img src={`/skills/${skill.svg}.svg`} alt={skill.name} className="w-4 h-4 object-contain" />
            {skill.name}
          </div>
        ))}
      </div>
    </BentoCard>
  )
}
