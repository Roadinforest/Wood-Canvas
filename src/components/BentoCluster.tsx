import { BentoCluster as ClusterType, CardItem } from '@/data/canvasConfig'
import { ProfileCard } from './cards/ProfileCard'
import { AboutCard } from './cards/AboutCard'
import { SocialCard } from './cards/SocialCard'
import { ProjectsCard } from './cards/ProjectsCard'
import { ThoughtsCard } from './cards/ThoughtsCard'
import { SecretCard } from './cards/SecretCard'

interface BentoClusterProps {
  cluster: ClusterType
}

function renderCard(item: CardItem) {
  switch (item.type) {
    case 'Profile':
      return <ProfileCard data={item.data as { name: string; title: string; avatar?: string }} />
    case 'About':
      return <AboutCard data={item.data as { title: string; content: string }} />
    case 'Social':
      return <SocialCard data={item.data as { platform: string; icon: string }} />
    case 'Projects':
      return <ProjectsCard data={item.data as { title: string; projects: string[] }} />
    case 'Thoughts':
      return <ThoughtsCard data={item.data as { title: string; content: string }} />
    case 'Secret':
      return <SecretCard data={item.data as { title: string; content: string }} />
    default:
      return null
  }
}

export function BentoCluster({ cluster }: BentoClusterProps) {
  return (
    <div
      className="absolute"
      style={{
        left: cluster.x,
        top: cluster.y,
        transform: 'translate(-50%, -50%)',
        display: 'grid',
        gridTemplateColumns: cluster.columnsTemplate || `repeat(${cluster.columns}, 160px)`,
        gridAutoRows: '160px',
        gap: 'var(--gap)',
      }}
    >
      {cluster.items.map((item) => (
        <div
          key={item.id}
          style={{
            gridColumn: `span ${item.colSpan}`,
            gridRow: `span ${item.rowSpan}`,
          }}
        >
          {renderCard(item)}
        </div>
      ))}
    </div>
  )
}