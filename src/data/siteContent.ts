export interface SocialLink {
  id: string
  label: string
  icon: string
  link?: string
  value?: string
}

export interface Project {
  name: string
  description: string
  role: string
  period: string
  link: string
  techStack: string
  highlights: string[]
}

export interface Internship {
  company: string
  period: string
  role: string
  description: string
  icon?: 'rednote' | 'capcut'
}

export interface SkillItem {
  name: string
  svg: string
}

export interface SkillGroup {
  title: string
  description: string
  borderColor: string
  skills: SkillItem[]
}

export interface CreationIdea {
  id: string
  name: string
  description: string
  done: boolean
}

export interface ToolLink {
  label: string
  url: string
}

export const profile = {
  name: 'Roadinforest',
  avatar: '/header.png',
  roles: ['Full Stack Developer', 'Agent Developer', 'Creator (ON the way...)'],
  intro:
    '我喜欢把产品想法、工程实现和 AI 能力揉在一起，做成既能跑起来，也能真正帮到人的东西。',
}

export const socials: SocialLink[] = [
  { id: 'github', icon: '/GitHub.svg', label: 'Github', link: 'https://github.com/Roadinforest' },
  { id: 'email', icon: '/email.svg', label: 'Email', value: 'whuforest@outlook.com' },
  { id: 'phone', icon: '/phone.svg', label: 'Phone', value: '15019734683' },
]

export const thought = 'Everyone should find a way out here.'

export const projects: Project[] = [
  {
    name: 'E-Com Pilot',
    description: 'Intelligent E-commerce Guided Shopping Platform',
    role: 'Full Stack Development',
    period: '2025.08 - Present',
    link: 'https://mini-store-ten-hazel.vercel.app/',
    techStack: 'Next.js, Vercel, RAG, Redis, Prisma, PostgreSQL, NextAuth.js, Zod',
    highlights: [
      'Built a hybrid SSR/SSG commerce architecture with Next.js v15 App Router and Vercel Serverless, keeping first-screen load under 1.5 seconds while improving SEO.',
      'Implemented Redis plus Lua atomic pre-deduction and payment-stage reconciliation to avoid overselling under high concurrency.',
      'Combined PostgreSQL structured filtering with Pinecone semantic retrieval and a rerank model to improve long-tail product discovery.',
      'Built an intent router and tool-calling backend that can switch between chat, order lookup, and product search flows.',
    ],
  },
]

export const internships: Internship[] = [
  {
    company: 'REDNote',
    period: '2025.10 - 2026.04',
    role: 'AI Engineer',
    description: 'Developing an AI troubleshooting system to streamline the resolution of live UI bugs.',
    icon: 'rednote',
  },
  {
    company: 'Capcut ByteDance',
    period: '2026.04 - Present',
    role: 'AI Cross-platform Engineer',
    description: 'Help building Capcut Visual Studio',
    icon: 'capcut',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'User Interface',
    description: 'Frontend ecosystem, Full-stack frameworks & Styling',
    borderColor: '#FDE047',
    skills: [
      { name: 'Next.js', svg: 'Next-js' },
      { name: 'React', svg: 'React' },
      { name: 'Tailwind', svg: 'Tailwind' },
      { name: 'SCSS', svg: 'Scss' },
    ],
  },
  {
    title: 'Business Logic',
    description: 'Backend services & RESTful APIs',
    borderColor: '#86EFAC',
    skills: [
      { name: 'C++', svg: 'C++' },
      { name: 'Go', svg: 'Golang' },
      { name: 'Gin', svg: 'Gin' },
      { name: 'Node.js', svg: 'Node.js' },
      { name: 'Hono', svg: 'Hono' },
      { name: 'Express.js', svg: 'Express' },
    ],
  },
  {
    title: 'Intelligence & AI',
    description: 'LLM integrations, AI Agents & Code assistants',
    borderColor: '#E9D5FF',
    skills: [
      { name: 'LangChain', svg: 'Langchain' },
      { name: 'Ollama', svg: 'Ollama' },
      { name: 'ClaudeCode', svg: 'Claudecode' },
    ],
  },
  {
    title: 'Infrastructure',
    description: 'Databases, Containers & Cloud deployment',
    borderColor: '#BFDBFE',
    skills: [
      { name: 'MySQL', svg: 'MySQL' },
      { name: 'Redis', svg: 'Redis' },
      { name: 'Docker', svg: 'Docker' },
      { name: 'Aliyun', svg: 'Aliyun' },
      { name: 'Vercel', svg: 'Vercel' },
    ],
  },
]

export const creationIdeas: CreationIdea[] = [
  { id: '1', name: 'PDF Headings Builder', description: 'Help build the headings for your PDF documents', done: false },
  { id: '2', name: 'SketchSnap', description: 'Take a photo, highlight the objects you want, and instantly turn them into clean illustrated artwork ready for social sharing.', done: false },
]

export const toolLinks: ToolLink[] = [
  { label: 'Markdown Previewer', url: '/preview/md' },
  { label: 'Mermaid Previewer', url: '/preview/mermaid' },
]
