import { BentoCard } from '../BentoCard'
import { useModalStore } from '@/store/modalStore'
import { useTranslation } from '@/hooks/useTranslation'

export function ProjectsCard() {
  const { t } = useTranslation()
  const openModal = useModalStore((state) => state.openModal)

  return (
    <BentoCard
      size="lg" rowSpan={2}
      onClick={() => {
        const projectList = t.projects.map((p) =>
          `${p.name}\n${p.role}\n${p.period}\n\n${p.description}\n\n${t.common.techStack}: ${p.techStack}\n\n${t.common.keyContributions}:\n${p.highlights.map((h) => `• ${h}`).join('\n\n')}`
        ).join('\n\n---\n\n')
        const firstProject = t.projects[0]
        openModal({ title: t.cards.projects.title, content: projectList, type: 'projects', link: 'https://mini-store-ten-hazel.vercel.app/', linkLabel: `Visit ${firstProject.name} →` })
      }}
    >
      <h2 className="text-[20px] font-medium mb-4">{t.cards.projects.title}</h2>
      <div className="space-y-4 mt-4">
        {t.projects.map((project, index) => (
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
