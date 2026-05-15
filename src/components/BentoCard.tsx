import { cn } from '@/lib/utils'

type CardSize = 'sm' | 'md' | 'lg' | 'custom'

interface BentoCardProps {
  className?: string
  colSpan?: number
  rowSpan?: number
  size?: CardSize
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  children: React.ReactNode
}

const sizeClasses: Record<CardSize, string> = {
  sm: 'w-[280px]',
  md: 'w-[400px]',
  lg: 'w-[560px]',
  custom: '',
}

export function BentoCard({ className, colSpan = 1, rowSpan = 1, size = 'custom', onClick, onMouseEnter, onMouseLeave, children }: BentoCardProps) {
  return (
    <div
      className={cn(
        'bg-card-bg rounded-bento p-7 shadow-bento transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-bento-hover',
        sizeClasses[size],
        onClick ? 'cursor-pointer' : 'cursor-default',
        className
      )}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}