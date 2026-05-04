import { cn } from '@/lib/utils'

interface BentoCardProps {
  className?: string
  colSpan?: number
  rowSpan?: number
  onClick?: () => void
  children: React.ReactNode
}

export function BentoCard({ className, colSpan = 1, rowSpan = 1, onClick, children }: BentoCardProps) {
  return (
    <div
      className={cn(
        'bg-card-bg rounded-bento p-8 shadow-bento transition-all duration-300 ease-out',
        'hover:-translate-y-1 hover:shadow-bento-hover',
        className
      )}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}