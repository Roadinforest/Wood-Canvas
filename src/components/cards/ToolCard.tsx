import { Link } from 'react-router-dom'
import { BentoCard } from '../BentoCard'
import { toolLinks } from '@/data/siteContent'

export function ToolCard() {
  return (
    <BentoCard size="sm" rowSpan={1} className="bg-black text-white">
      <h2 className="text-[20px] font-medium mb-3">Tools</h2>
      <div className="space-y-2">
        {toolLinks.map((link) => (
          <div key={link.url} className="flex items-center justify-between gap-3">
            {link.kind === 'anchor' ? (
              <a
                href={link.url}
                className="block text-[13px] text-gray-300 hover:text-white transition-colors"
              >
                → {link.label}
              </a>
            ) : link.kind === 'external' ? (
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="block text-[13px] text-gray-300 hover:text-white transition-colors"
              >
                → {link.label}
              </a>
            ) : (
              <Link
                to={link.url}
                className="block text-[13px] text-gray-300 hover:text-white transition-colors"
              >
                → {link.label}
              </Link>
            )}
            {link.status === 'in-progress' ? (
              <span className="border border-emerald-400/60 bg-emerald-500/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-emerald-300">
                in-progress
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </BentoCard>
  )
}
