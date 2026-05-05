import { BentoCard } from '../BentoCard'

const skills = [
  'Python', 'Hermes', 'Docker', 'Node.js', 'C++', 'Golang', 'Unity', 'Claudecode', 'Godot'
]

export function SkillsCard() {
  return (
    <BentoCard size="lg" rowSpan={1}>
      <h2 className="text-[20px] font-medium mb-4">Skills</h2>
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