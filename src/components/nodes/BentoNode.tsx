import { NodeProps } from 'reactflow'
import { BentoNodeData } from '@/data/canvasConfig'
import { ProfileCard } from '@/components/cards/ProfileCard'
import { AboutCard } from '@/components/cards/AboutCard'
import { SocialCard } from '@/components/cards/SocialCard'
import { ProjectsCard } from '@/components/cards/ProjectsCard'
import { ThoughtsCard } from '@/components/cards/ThoughtsCard'
import { SecretCard } from '@/components/cards/SecretCard'
import { InternshipCard } from '@/components/cards/InternshipCard'

const internshipData = [
  { company: 'Company A', period: '2024.06 - 2024.09', role: 'Frontend Developer', description: 'Developed web applications using React and TypeScript.' },
  { company: 'Company B', period: '2024.01 - 2024.05', role: 'Backend Developer', description: 'Built REST APIs with Node.js and PostgreSQL.' },
]

export function BentoNode({ data, id }: NodeProps<BentoNodeData>) {
  const renderCard = () => {
    switch (data.cardType) {
      case 'Profile':
        return <ProfileCard />
      case 'About':
        return <AboutCard />
      case 'Social':
        return <SocialCard icon={id.includes('social-1') ? '𝕏' : 'GH'} />
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