import { NodeProps } from 'reactflow'
import { BentoNodeData } from '@/data/canvasConfig'
import { ProfileCard } from '@/components/cards/ProfileCard'
import { AboutCard } from '@/components/cards/AboutCard'
import { ProjectsCard } from '@/components/cards/ProjectsCard'
import { ThoughtsCard } from '@/components/cards/ThoughtsCard'
import { SecretCard } from '@/components/cards/SecretCard'
import { InternshipCard } from '@/components/cards/InternshipCard'
import { SkillsCard } from '@/components/cards/SkillsCard'

const internshipData = [
  { company: 'REDNote', period: '2025.10 - 2026.04', role: 'AI Engineer', description: 'Developing an AI troubleshooting system to streamline the resolution of live UI bugs.', icon: 'rednote' as const },
  { company: 'Capcut ByteDance', period: '2026.04 - Present', role: 'AI Cross-platform Engineer', description: 'Help building Capcut Visual Studio', icon: 'capcut' as const },
]

export function BentoNode({ data, id }: NodeProps<BentoNodeData>) {
  const renderCard = () => {
    switch (data.cardType) {
      case 'Profile':
        return <ProfileCard />
      case 'About':
        return <AboutCard />
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