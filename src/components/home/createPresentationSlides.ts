import type { TranslationDictionary } from '@/i18n/types'
import { internshipMetas, skillGroupMetas } from '@/data/siteContent'
import type { PresentationSlide } from './PresentationDeck'

type Project = TranslationDictionary['projects'][number]

export function createPresentationSlides(
  t: TranslationDictionary,
  primaryProject?: Project,
): PresentationSlide[] {
  return [
    {
      id: 'intro',
      label: t.homepage.headerLabel,
      title: `${t.homepage.welcomeLine1} ${t.homepage.welcomeLine2}`,
      summary: t.profile.intro,
      points: t.profile.roles,
      keywords: [t.homepage.introBadge, t.homepage.blogLabel, t.common.enterCanvas],
    },
    {
      id: 'project',
      label: t.homepage.section1Title,
      title: primaryProject?.name ?? t.homepage.section1Title,
      summary: primaryProject?.description ?? t.homepage.nowBuilding,
      points: primaryProject?.highlights.slice(0, 3) ?? [],
      keywords: primaryProject?.techStack.split(',').map((item) => item.trim()).slice(0, 6) ?? [],
    },
    {
      id: 'about-now',
      label: t.homepage.aboutNowBadge,
      title: t.homepage.aboutNowTitle,
      summary: t.homepage.aboutNowLead,
      points: t.homepage.aboutNowParagraphs,
      keywords: t.homepage.aboutNowFocus,
    },
    {
      id: 'experience',
      label: t.homepage.experience,
      title: t.homepage.experience,
      summary: t.homepage.aboutNowCta,
      points: internshipMetas.map((internship, index) => {
        const localized = t.internships[index]
        return `${internship.company} · ${localized?.role ?? ''} · ${internship.period}`
      }),
      keywords: internshipMetas.map((internship) => internship.company),
    },
    {
      id: 'tools',
      label: t.homepage.section3Title,
      title: t.homepage.section3Title,
      summary: t.cards.creation.title,
      points: [
        ...t.toolLinks.map((tool) => tool.label),
        ...t.creationIdeas.map((idea) => `${idea.name}: ${idea.description}`),
      ],
      keywords: [t.cards.creation.title, t.common.idea, t.common.inProgress],
    },
    {
      id: 'skills',
      label: t.homepage.section4Title,
      title: t.homepage.section4Title,
      summary: t.skillGroups.map((group) => group.title).join(' / '),
      points: t.skillGroups.map((group) => group.description),
      keywords: skillGroupMetas.flatMap((group) => group.skills.map((skill) => skill.name)).slice(0, 10),
    },
    {
      id: 'timeline',
      label: t.homepage.timelineTitle,
      title: t.homepage.timelineTitle,
      summary: t.homepage.timelineItems.map((item) => item.year).join(' / '),
      points: t.homepage.timelineItems.map((item) => `${item.year} · ${item.title}`),
      keywords: t.homepage.timelineItems.flatMap((item) => item.keywords).slice(0, 10),
    },
  ]
}
