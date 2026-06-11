// Translation dictionary shape — every locale must export the same structure.
// Use plain `string` here to keep nested templates flexible.

export interface TranslationDictionary {
  common: {
    edit: string
    editMode: string
    copied: string
    inProgress: string
    done: string
    idea: string
    enterCanvas: string
    visitProject: string
    visitWebsite: string
    techStack: string
    keyContributions: string
    goToProfile: string
    modifyModeHint: string
    periodPresent: string
  }
  homepage: {
    headerLabel: string
    introBadge: string
    welcomeLine1: string
    welcomeLine2: string
    profileSubtitle: string
    sideTagline: string
    thoughtLabel: string
    section1Title: string
    section1Badge: string
    section2Title: string
    section2Badge: string
    section3Title: string
    section3Badge: string
    section4Title: string
    section4Badge: string
    timelineTitle: string
    timelineBadge: string
    presentationReplayLabel: string
    presentationContinueHint: string
    presentationEnterHint: string
    nowBuilding: string
    experience: string
    blogLabel: string
    blogName: string
    friendLinkLabel: string
    friendLinkName: string
    aboutNowTitle: string
    aboutNowBadge: string
    aboutNowLead: string
    aboutNowParagraphs: string[]
    aboutNowFocus: string[]
    aboutNowCta: string
    timelineItems: Array<{
      year: string
      title: string
      points: string[]
      keywords: string[]
    }>
  }
  cards: {
    about: {
      title: string
      body: string
    }
    skills: {
      title: string
    }
    thoughts: {
      title: string
    }
    projects: {
      title: string
    }
    tool: {
      title: string
    }
    secret: {
      title: string
    }
    creation: {
      title: string
    }
    todo: {
      title: string
    }
    films: {
      title: string
    }
  }
  profile: {
    roles: string[]
    intro: string
  }
  thought: string
  projects: Array<{
    name: string
    description: string
    role: string
    period: string
    techStack: string
    highlights: string[]
  }>
  internships: Array<{
    role: string
    description: string
  }>
  skillGroups: Array<{
    title: string
    description: string
  }>
  creationIdeas: Array<{
    name: string
    description: string
  }>
  toolLinks: Array<{
    label: string
  }>
  todos: string[]
  films: {
    scrollHint: string
  }
  mobile: {
    pleaseUsePc: string
  }
}
