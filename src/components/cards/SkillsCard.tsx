import { BentoCard } from '../BentoCard'
import { useTranslation } from '@/hooks/useTranslation'

const skills = [
  'Python', 'Hermes', 'Docker', 'Node.js', 'C++', 'Golang', 'Unity', 'Claudecode', 'Godot'
]

export function SkillsCard() {
  const { t } = useTranslation()
  return (
    <BentoCard size="lg" rowSpan={1}>
      <h2 className="text-[20px] font-medium mb-4">{t.cards.skills.title}</h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <img
            key={skill}
            src={`/skills/${skill}.svg`}
            alt={skill}
            className="w-8 h-8 object-contain"
          />
        ))}
      </div>
    </BentoCard>
  )
}
