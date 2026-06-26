// Language-independent static content: URLs, icons, image refs, color tokens, skill tech names.
// All user-facing text strings live in src/i18n/locales/* — see useTranslation().

export interface SocialLink {
  id: string
  icon: string
  link?: string
  value?: string
}

export interface InternshipMeta {
  company: string
  period: string
  icon?: 'rednote' | 'capcut'
}

export interface SkillItem {
  name: string
  svg: string
}

// Index-matched with t.skillGroups / t.internships / t.creationIdeas / t.toolLinks from the i18n dictionary.
export interface SkillGroupMeta {
  description: string
  borderColor: string
  skills: SkillItem[]
}

export interface ToolLinkMeta {
  url: string
  kind?: 'internal' | 'external' | 'anchor'
  status?: 'in-progress' | 'ready'
}

export interface CreationIdeaMeta {
  id: string
  done: boolean
}

export interface ProjectMeta {
  url: string
}

// Stable, language-independent profile fields (avatar + name don't translate).
export const profileMeta = {
  name: 'Rif',
  avatar: '/header.png',
}

export const socials: SocialLink[] = [
  { id: 'github', icon: '/GitHub.svg', link: 'https://github.com/Roadinforest' },
  { id: 'email', icon: '/email.svg', value: 'whuforest@outlook.com' },
  { id: 'phone', icon: '/phone.svg', value: '15019734683' },
]

// Project metadata — order matches t.projects in the active locale.
export const projectMetas: ProjectMeta[] = [
  { url: 'https://mini-store-ten-hazel.vercel.app/' },
  { url: 'https://mini-store-go-web.vercel.app/' },
  { url: 'https://rhymer-navy.vercel.app/' },
]

// Internship metadata — order matches t.internships in the active locale.
export const internshipMetas: InternshipMeta[] = [
  {
    company: 'REDNote',
    period: '2025.10 - 2026.04',
    icon: 'rednote',
  },
  {
    company: 'Capcut ByteDance',
    period: '2026.04 - Present',
    icon: 'capcut',
  },
]

export const skillGroupMetas: SkillGroupMeta[] = [
  {
    description: '',
    borderColor: '#FDE047',
    skills: [
      { name: 'Next.js', svg: 'Next-js' },
      { name: 'React', svg: 'React' },
      { name: 'Tailwind', svg: 'Tailwind' },
      { name: 'SCSS', svg: 'Scss' },
    ],
  },
  {
    description: '',
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
    description: '',
    borderColor: '#E9D5FF',
    skills: [
      { name: 'LangChain', svg: 'Langchain' },
      { name: 'Ollama', svg: 'Ollama' },
      { name: 'ClaudeCode', svg: 'Claudecode' },
    ],
  },
  {
    description: '',
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

export const creationIdeaMetas: CreationIdeaMeta[] = [
  { id: '1', done: false },
  { id: '2', done: false },
]

export const toolLinkMetas: ToolLinkMeta[] = [
  { url: 'https://rhymer-navy.vercel.app/', kind: 'external', status: 'ready' },
  { url: 'https://mini-store-go-web.vercel.app/', kind: 'external', status: 'ready' },
  { url: 'https://pdf-outline-builder-web.vercel.app/', kind: 'external', status: 'ready' },
  { url: '/preview/mermaid', kind: 'internal', status: 'ready' },
  { url: '/preview/md', kind: 'internal', status: 'ready' },
]
