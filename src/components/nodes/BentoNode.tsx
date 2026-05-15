import { NodeProps } from 'reactflow'
import { BentoNodeData } from '@/data/canvasConfig'
import { ProfileCard } from '@/components/cards/ProfileCard'
import { ProjectsCard } from '@/components/cards/ProjectsCard'
import { ThoughtsCard } from '@/components/cards/ThoughtsCard'
import { SecretCard } from '@/components/cards/SecretCard'
import { ToolCard } from '@/components/cards/ToolCard'
import { InternshipCard } from '@/components/cards/InternshipCard'
import { SkillsCard } from '@/components/cards/SkillsCard'
import { CreationCard } from '@/components/cards/CreationCard'
import { TodoCard } from '@/components/cards/TodoCard'

const internshipData = [
  { company: 'REDNote', period: '2025.10 - 2026.04', role: 'AI Engineer', description: 'Developing an AI troubleshooting system to streamline the resolution of live UI bugs.', icon: 'rednote' as const },
  { company: 'Capcut ByteDance', period: '2026.04 - Present', role: 'AI Cross-platform Engineer', description: 'Help building Capcut Visual Studio', icon: 'capcut' as const },
]

export function BentoNode({ data, id }: NodeProps<BentoNodeData>) {
  const renderCard = () => {
    switch (data.cardType) {
      case 'Profile':
        return <ProfileCard />
      case 'Projects':
        return <ProjectsCard />
      case 'Thoughts':
        return <ThoughtsCard />
      case 'Secret':
        return <SecretCard />
      case 'Internship':
        const index = id === 'internship-1' ? 0 : 1
        const internship = internshipData[index]
        return <InternshipCard {...internship} />
      case 'Skills':
        return <SkillsCard />
      case 'Tool':
        return <ToolCard />
      case 'Creation':
        return <CreationCard />
      case 'Todo':
        return <TodoCard />
      default:
        return null
    }
  }

  return (
    <div className="bg-white/60 border-2 border-dashed border-warm-yellow rounded-bento backdrop-blur-sm cursor-grab active:cursor-grabbing transition-all duration-200 ease-out [&.hovered]:scale-[1.03] [&.hovered]:shadow-bento-hover">
      {renderCard()}
    </div>
  )
}