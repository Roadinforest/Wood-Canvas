import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { BentoCluster as ClusterType, CardItem } from '@/data/canvasConfig'
import { ProfileCard } from './cards/ProfileCard'
import { AboutCard } from './cards/AboutCard'
import { SocialCard } from './cards/SocialCard'
import { ProjectsCard } from './cards/ProjectsCard'
import { ThoughtsCard } from './cards/ThoughtsCard'
import { SecretCard } from './cards/SecretCard'
import { InternshipCard } from './cards/InternshipCard'

interface CanvasPosition {
  x: number
  y: number
}

interface BentoClusterProps {
  cluster: ClusterType
  modifyMode?: boolean
  cardPositions?: Record<string, CanvasPosition>
  updateCardPosition?: (cardId: string, x: number, y: number) => void
  onDragStart?: () => void
  onDragEnd?: () => void
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
      return <ProjectsCard data={item.data as { title: string; projects: { name: string; description: string }[] }} />
    case 'Thoughts':
      return <ThoughtsCard data={item.data as { title: string; content: string }} />
    case 'Secret':
      return <SecretCard data={item.data as { title: string; content: string }} />
    case 'Internship':
      return <InternshipCard data={item.data as { company: string; period: string; role: string; description: string }} />
    default:
      return null
  }
}

export function BentoCluster({
  cluster,
  modifyMode = false,
  cardPositions = {},
  updateCardPosition,
  onDragStart,
  onDragEnd,
}: BentoClusterProps) {
  const [isDragging, setIsDragging] = useState(false)
  const dragStartPosRef = useRef({ x: 0, y: 0 })

  const currentX = cardPositions[cluster.id]?.x ?? cluster.x
  const currentY = cardPositions[cluster.id]?.y ?? cluster.y

  return (
    <motion.div
      className={`absolute ${modifyMode ? 'cursor-move' : ''}`}
      style={{
        left: currentX,
        top: currentY,
        transform: 'translate(-50%, -50%)',
        display: 'grid',
        gridTemplateColumns: cluster.columnsTemplate || `repeat(${cluster.columns}, 160px)`,
        gridAutoRows: '160px',
        gap: 'var(--gap)',
      }}
      animate={isDragging ? { scale: 1.02 } : { scale: 1 }}
      drag={modifyMode}
      onDragStart={() => {
        console.log('[DragStart]', cluster.id, 'currentX:', currentX, 'currentY:', currentY)
        setIsDragging(true)
        dragStartPosRef.current = { x: currentX, y: currentY }
        onDragStart?.()
      }}
      onDragEnd={(_, info) => {
        console.log('[DragEnd]', cluster.id, 'offset:', info.offset, 'startPos:', dragStartPosRef.current)
        setIsDragging(false)
        onDragEnd?.()
        if (modifyMode && updateCardPosition) {
          const newX = dragStartPosRef.current.x + info.offset.x
          const newY = dragStartPosRef.current.y + info.offset.y
          console.log('[DragEnd] newX:', newX, 'newY:', newY)
          updateCardPosition(cluster.id, newX, newY)
        }
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
    </motion.div>
  )
}