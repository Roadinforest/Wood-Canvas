import { NodeProps, Handle, Position } from 'reactflow'
import { BentoNodeData } from '@/data/canvasConfig'
import { useCanvasStore } from '@/store/modalStore'
import { ProfileCard } from '@/components/cards/ProfileCard'
import { ProjectsCard } from '@/components/cards/ProjectsCard'
import { ThoughtsCard } from '@/components/cards/ThoughtsCard'
import { SecretCard } from '@/components/cards/SecretCard'
import { ToolCard } from '@/components/cards/ToolCard'
import { InternshipCard } from '@/components/cards/InternshipCard'
import { SkillsCard } from '@/components/cards/SkillsCard'
import { CreationCard } from '@/components/cards/CreationCard'
import { TodoCard } from '@/components/cards/TodoCard'
import FilmsCard from '@/components/cards/FilmsCard'
import { UISkillCard } from '@/components/cards/UISkillCard'
import { LogicSkillCard } from '@/components/cards/LogicSkillCard'
import { AISkillCard } from '@/components/cards/AISkillCard'
import { InfraSkillCard } from '@/components/cards/InfraSkillCard'

const internshipData = [
  { company: 'REDNote', period: '2025.10 - 2026.04', role: 'AI Engineer', description: 'Developing an AI troubleshooting system to streamline the resolution of live UI bugs.', icon: 'rednote' as const },
  { company: 'Capcut ByteDance', period: '2026.04 - Present', role: 'AI Cross-platform Engineer', description: 'Help building Capcut Visual Studio', icon: 'capcut' as const },
]

export function BentoNode({ data, id }: NodeProps<BentoNodeData>) {
  const modifyMode = useCanvasStore((s) => s.modifyMode)
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
      case 'Films':
        return <FilmsCard />
      case 'UISkill':
        return <UISkillCard />
      case 'LogicSkill':
        return <LogicSkillCard />
      case 'AISkill':
        return <AISkillCard />
      case 'InfraSkill':
        return <InfraSkillCard />
      default:
        return null
    }
  }

  return (
    <div className="bg-white/60 border-2 border-dashed border-warm-yellow rounded-bento backdrop-blur-sm cursor-grab active:cursor-grabbing transition-all duration-200 ease-out [&.hovered]:scale-[1.03] [&.hovered]:shadow-bento-hover relative">
      <Handle type="target" position={Position.Top} id="top" className={modifyMode ? '!w-3 !h-3 !bg-blue-400 !border-2 !border-white' : '!w-0 !h-0 !bg-transparent !border-0'} />
      <Handle type="target" position={Position.Right} id="right" className={modifyMode ? '!w-3 !h-3 !bg-blue-400 !border-2 !border-white' : '!w-0 !h-0 !bg-transparent !border-0'} />
      <Handle type="target" position={Position.Bottom} id="bottom" className={modifyMode ? '!w-3 !h-3 !bg-blue-400 !border-2 !border-white' : '!w-0 !h-0 !bg-transparent !border-0'} />
      <Handle type="target" position={Position.Left} id="left" className={modifyMode ? '!w-3 !h-3 !bg-blue-400 !border-2 !border-white' : '!w-0 !h-0 !bg-transparent !border-0'} />

      <Handle type="source" position={Position.Top} id="top-source" className={modifyMode ? '!w-3 !h-3 !bg-green-400 !border-2 !border-white' : '!w-0 !h-0 !bg-transparent !border-0'} />
      <Handle type="source" position={Position.Right} id="right-source" className={modifyMode ? '!w-3 !h-3 !bg-green-400 !border-2 !border-white' : '!w-0 !h-0 !bg-transparent !border-0'} />
      <Handle type="source" position={Position.Bottom} id="bottom-source" className={modifyMode ? '!w-3 !h-3 !bg-green-400 !border-2 !border-white' : '!w-0 !h-0 !bg-transparent !border-0'} />
      <Handle type="source" position={Position.Left} id="left-source" className={modifyMode ? '!w-3 !h-3 !bg-green-400 !border-2 !border-white' : '!w-0 !h-0 !bg-transparent !border-0'} />
      {renderCard()}
    </div>
  )
}