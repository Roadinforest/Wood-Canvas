import { BentoCard } from '../BentoCard'
import { useModalStore } from '@/store/modalStore'

interface Project {
  name: string
  description: string
}

interface ProjectsCardProps {
  data: {
    title: string
    projects: Project[]
  }
}

export function ProjectsCard({ data }: ProjectsCardProps) {
  const openModal = useModalStore((state) => state.openModal)

  return (
    <BentoCard
      className="col-span-4 row-span-2"
      onClick={() => {
        const projectList = data.projects.map((p) => `${p.name}: ${p.description}`).join('\n\n')
        openModal({ title: data.title, content: projectList, type: 'projects' })
      }}
    >
      <h2 className="text-[20px] font-medium mb-4">{data.title}</h2>
      <div className="space-y-4 mt-4">
        {data.projects.map((project, index) => (
          <p key={index} className="text-[15px] text-text-muted leading-relaxed">
            + {project.name}
          </p>
        ))}
      </div>
    </BentoCard>
  )
}