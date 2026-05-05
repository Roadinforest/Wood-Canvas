import { BentoCard } from '../BentoCard'
import { useModalStore } from '@/store/modalStore'

const projects = [
  { name: 'Project Alpha', description: 'A cutting-edge web application built with React and TypeScript, featuring real-time collaboration and advanced state management.' },
  { name: 'Project Beta', description: 'An innovative mobile-first platform focusing on accessibility and performance optimization.' },
  { name: 'Project Gamma', description: 'A creative tool for designers that enables rapid prototyping and iteration.' },
]

export function ProjectsCard() {
  const openModal = useModalStore((state) => state.openModal)

  return (
    <BentoCard
      size="lg" rowSpan={2}
      onClick={() => {
        const projectList = projects.map((p) => `${p.name}: ${p.description}`).join('\n\n')
        openModal({ title: 'Selected Work', content: projectList, type: 'projects' })
      }}
    >
      <h2 className="text-[20px] font-medium mb-4">Selected Work</h2>
      <div className="space-y-4 mt-4">
        {projects.map((project, index) => (
          <p key={index} className="text-[15px] text-text-muted leading-relaxed">
            + {project.name}
          </p>
        ))}
      </div>
    </BentoCard>
  )
}