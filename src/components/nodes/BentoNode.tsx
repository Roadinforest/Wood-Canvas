import { NodeProps } from 'reactflow'
import { BentoNodeData, CELL_SIZE, GAP } from '@/data/canvasConfig'
import { ProfileCard } from '@/components/cards/ProfileCard'
import { AboutCard } from '@/components/cards/AboutCard'
import { SocialCard } from '@/components/cards/SocialCard'
import { ProjectsCard } from '@/components/cards/ProjectsCard'
import { ThoughtsCard } from '@/components/cards/ThoughtsCard'
import { SecretCard } from '@/components/cards/SecretCard'
import { InternshipCard } from '@/components/cards/InternshipCard'

export function BentoNode({ data }: NodeProps<BentoNodeData>) {
  const width = data.colSpan * CELL_SIZE + (data.colSpan - 1) * GAP
  const height = data.rowSpan * CELL_SIZE + (data.rowSpan - 1) * GAP

  const renderCard = () => {
    switch (data.cardType) {
      case 'Profile':
        return (
          <ProfileCard
            data={{
              name: data.name as string,
              title: data.title as string,
              avatar: data.avatar as string | undefined,
            }}
          />
        )
      case 'About':
        return (
          <AboutCard
            data={{
              title: data.title as string,
              content: data.content as string,
            }}
          />
        )
      case 'Social':
        return (
          <SocialCard
            data={{
              platform: data.platform as string,
              icon: data.icon as string,
            }}
          />
        )
      case 'Projects':
        return (
          <ProjectsCard
            data={{
              title: data.title as string,
              projects: data.projects as { name: string; description: string }[],
            }}
          />
        )
      case 'Thoughts':
        return (
          <ThoughtsCard
            data={{
              title: data.title as string,
              content: data.content as string,
            }}
          />
        )
      case 'Secret':
        return (
          <SecretCard
            data={{
              title: data.title as string,
              content: data.content as string,
            }}
          />
        )
      case 'Internship':
        return (
          <InternshipCard
            data={{
              company: data.company as string,
              period: data.period as string,
              role: data.role as string,
              description: data.description as string,
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div
      className="bg-white/20 border-2 border-dashed border-neutral-300 rounded-bento transition-all duration-300 ease-out"
      style={{ width, height }}
    >
      {renderCard()}
    </div>
  )
}