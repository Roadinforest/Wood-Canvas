import type { TranslationDictionary } from '../types'

export const enUS: TranslationDictionary = {
  common: {
    edit: 'Edit',
    editMode: 'Edit Mode',
    copied: 'copied!',
    inProgress: 'in-progress',
    done: 'Done',
    idea: 'Idea',
    enterCanvas: 'Enter Canvas',
    visitProject: 'Visit project',
    visitWebsite: 'Visit website',
    techStack: 'Tech Stack',
    keyContributions: 'Key Contributions',
    goToProfile: 'Go to profile',
    modifyModeHint: 'Modify Mode - Drag cards to reposition | Drag from edge to connect cards',
    periodPresent: 'Present',
  },
  homepage: {
    headerLabel: 'Rif / Bauhaus Index',
    introBadge: 'Full Stack x Agent x Creation',
    welcomeLine1: 'Welcome',
    welcomeLine2: 'to my website',
    profileSubtitle: 'Building software, agents and side ideas.',
    sideTagline: 'Geek x Open Source\nPoster Order\nLab Smell',
    thoughtLabel: 'Thought',
    section1Title: 'Now Building',
    section1Badge: '01',
    section2Title: 'Thoughts',
    section2Badge: '02',
    section3Title: 'My Tools',
    section3Badge: '03',
    section4Title: 'Skill Map',
    section4Badge: '04',
    nowBuilding: 'Now Building',
    experience: 'Experience',
    friendLinkLabel: 'Friend Link',
    friendLinkName: 'Guan Sheng Ju',
  },
  cards: {
    about: {
      title: 'About',
      body: 'Everyone will find its own way to explore the world.',
    },
    skills: {
      title: 'Skills',
    },
    thoughts: {
      title: 'Thoughts',
    },
    projects: {
      title: 'My Projects',
    },
    tool: {
      title: 'Tools',
    },
    secret: {
      title: 'Secret',
    },
    creation: {
      title: 'Creation Ideas',
    },
    todo: {
      title: 'Todo',
    },
    films: {
      title: 'Films',
    },
  },
  profile: {
    roles: ['Full Stack Developer', 'Agent Developer', 'Creator (ON the way...)'],
    intro:
      'I like to mix product thinking, engineering, and AI capabilities into things that not only run, but actually help people.',
  },
  thought: 'Everyone should find a way out here.',
  projects: [
    {
      name: 'E-Com Pilot',
      description: 'Intelligent E-commerce Guided Shopping Platform',
      role: 'Full Stack Development',
      period: '2025.08 - Present',
      techStack: 'Next.js, Vercel, RAG, Redis, Prisma, PostgreSQL, NextAuth.js, Zod',
      highlights: [
        'Built a hybrid SSR/SSG commerce architecture with Next.js v15 App Router and Vercel Serverless, keeping first-screen load under 1.5 seconds while improving SEO.',
        'Implemented Redis plus Lua atomic pre-deduction and payment-stage reconciliation to avoid overselling under high concurrency.',
        'Combined PostgreSQL structured filtering with Pinecone semantic retrieval and a rerank model to improve long-tail product discovery.',
        'Built an intent router and tool-calling backend that can switch between chat, order lookup, and product search flows.',
      ],
    },
  ],
  internships: [
    {
      role: 'AI Engineer',
      description: 'Developing an AI troubleshooting system to streamline the resolution of live UI bugs.',
    },
    {
      role: 'AI Cross-platform Engineer',
      description: 'Help building Capcut Visual Studio',
    },
  ],
  skillGroups: [
    {
      title: 'User Interface',
      description: 'Frontend ecosystem, Full-stack frameworks & Styling',
    },
    {
      title: 'Business Logic',
      description: 'Backend services & RESTful APIs',
    },
    {
      title: 'Intelligence & AI',
      description: 'LLM integrations, AI Agents & Code assistants',
    },
    {
      title: 'Infrastructure',
      description: 'Databases, Containers & Cloud deployment',
    },
  ],
  creationIdeas: [
    {
      name: 'PDF Headings Builder',
      description: 'Help build the headings for your PDF documents',
    },
    {
      name: 'SketchSnap',
      description: 'Take a photo, highlight the objects you want, and instantly turn them into clean illustrated artwork ready for social sharing.',
    },
  ],
  toolLinks: [
    { label: 'Markdown Previewer' },
    { label: 'Mermaid Previewer' },
    { label: 'PDF Headings Builder' },
  ],
  todos: [
    'Pick up a strangely shaped stone on a riverside walk',
    'Learn to cook a new home-style dish you\'ve never tried',
    'Explore an unfamiliar coffee shop on a weekend afternoon',
    'Stroll in the rain with an umbrella, going nowhere specific',
    'Write a "Stop Doing" list — things you\'re done tolerating',
    'Learn to make homemade soda — lemon + mint flavor',
  ],
  films: {
    scrollHint: 'scroll up to open',
  },
  mobile: {
    pleaseUsePc: 'Please view on PC for better experience',
  },
}
