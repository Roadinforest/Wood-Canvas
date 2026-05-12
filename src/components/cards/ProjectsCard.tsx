import { BentoCard } from '../BentoCard'
import { useModalStore } from '@/store/modalStore'

const projects = [
  {
    name: 'E-Com Pilot',
    description: 'Intelligent E-commerce Guided Shopping Platform',
    role: 'Full Stack Development',
    period: '2025.08 - Present',
    link: 'https://mini-store-ten-hazel.vercel.app/',
    techStack: 'Next.js, Vercel, RAG, Redis, Prisma, PostgreSQL, NextAuth.js, Zod',
    highlights: [
      'High-performance e-commerce architecture: Built with Next.js v15 App Router + Vercel Serverless for SSR/SSG hybrid rendering, achieving sub-1.5s first-screen load and improved SEO; WebSocket-wrapped Neon + Prisma reduced cold start time by 60%.',
      'High-concurrency inventory control: Redis + Lua atomic pre-deduction, order status cache cleanup, and conditional database deduction at payment stage with exception recovery, effectively eliminating overselling.',
      'Hybrid Search: Combining PostgreSQL structured filtering (price/brand) with Pinecone vector semantic search (reviews/descriptions), introducing Qwen Rerank model to solve low recall rate issues for long-tail queries, achieving 85% Top-3 recommendation accuracy.',
      'Agent decision-making and tool calling: Built Reasoning Backend with Intent Router for automatic intent recognition (chatting, order lookup, product search), dynamically calling inventory API via Tool Calling with metadata.',
    ],
  },
]

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
            <p className="text-[15px] text-text-muted leading-relaxed">
              + {project.name}
            </p>
            <p className="text-[13px] text-text-muted/70 pl-4">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </BentoCard>
  )
}