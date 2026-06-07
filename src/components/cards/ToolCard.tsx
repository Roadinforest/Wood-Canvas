import { Link } from 'react-router-dom'
import { BentoCard } from '../BentoCard'
import { toolLinkMetas } from '@/data/siteContent'
import { useTranslation } from '@/hooks/useTranslation'

export function ToolCard() {
  const { t } = useTranslation()
  return (
    <BentoCard size="sm" rowSpan={1} className="bg-black text-white">
      <h2 className="text-[20px] font-medium mb-3">{t.cards.tool.title}</h2>
      <div className="space-y-2">
        {toolLinkMetas.map((link, index) => {
          const label = t.toolLinks[index]?.label ?? ''
          return (
            <div key={link.url} className="flex items-center justify-between gap-3">
              {link.kind === 'anchor' ? (
                <a
                  href={link.url}
                  className="block text-[13px] text-gray-300 hover:text-white transition-colors"
                >
                  → {label}
                </a>
              ) : link.kind === 'external' ? (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-[13px] text-gray-300 hover:text-white transition-colors"
                >
                  → {label}
                </a>
              ) : (
                <Link
                  to={link.url}
                  className="block text-[13px] text-gray-300 hover:text-white transition-colors"
                >
                  → {label}
                </Link>
              )}
              {link.status === 'in-progress' ? (
                <span className="border border-emerald-400/60 bg-emerald-500/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-emerald-300">
                  {t.common.inProgress}
                </span>
              ) : null}
            </div>
          )
        })}
      </div>
    </BentoCard>
  )
}
