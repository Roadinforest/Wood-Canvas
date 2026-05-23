import { BentoCard } from '../BentoCard'
import { useModalStore } from '@/store/modalStore'
import { projects } from '@/data/siteContent'

export function ProjectsCard() {
  const openModal = useModalStore((state) => state.openModal)

  return (
    <BentoCard
      size="lg" rowSpan={2}
      onClick={() => {
        const projectList = projects.map((p) =>
          `${p.name}\n${p.role}\n${p.period}\n\n${p.description}\n\nTech Stack: ${p.techStack}\n\nKey Contributions:\n${p.highlights.map((h) => `• ${h}`).join('\n\n')}`
        ).join('\n\n---\n\n')
        openModal({ title: 'My Projects', content: projectList, type: 'projects', link: projects[0].link, linkLabel: 'Visit E-Com Pilot →' })
      }}
    >
      <h2 className="text-[20px] font-medium mb-4">My Projects</h2>
      <div className="space-y-4 mt-4">
        {projects.map((project, index) => (
          <div key={index} className="space-y-1">
            <p className="text-[15px] text-text-muted dark:text-text-muted-dark leading-relaxed">
              + {project.name}
            </p>
            <p className="text-[13px] text-text-muted/70 dark:text-text-muted-dark/70 pl-4">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </BentoCard>
  )
}
