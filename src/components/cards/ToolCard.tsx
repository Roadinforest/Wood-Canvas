import { BentoCard } from '../BentoCard'

const links = [
  { label: 'Markdown Previewer', url: '/preview/md' },
  { label: 'Mermaid Previewer', url: '/preview/mermaid' },
]

export function ToolCard() {
  return (
    <BentoCard size="sm" rowSpan={1} className="bg-black text-white">
      <h2 className="text-[20px] font-medium mb-3">Tools</h2>
      <div className="space-y-2">
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[13px] text-gray-300 hover:text-white transition-colors"
          >
            → {link.label}
          </a>
        ))}
      </div>
    </BentoCard>
  )
}