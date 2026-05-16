import { cn } from '@/lib/utils'
import { useCanvasStore } from '@/store/modalStore'

type CardSize = 'sm' | 'md' | 'lg' | 'custom'

interface BentoCardProps {
  className?: string
  colSpan?: number
  rowSpan?: number
  size?: CardSize
  borderColor?: string
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

export function BentoCard({ className, colSpan = 1, rowSpan = 1, size = 'custom', borderColor, onClick, onMouseEnter, onMouseLeave, children }: BentoCardProps) {
  const theme = useCanvasStore((s) => s.theme)
  const glassBgClass = theme === 'dark' ? 'bg-black/40 backdrop-blur-md' : 'bg-card-bg'

  return (
    <div
      className={cn(
        'rounded-bento p-7 shadow-bento transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-bento-hover border-2 border-dashed',
        glassBgClass,
        sizeClasses[size],
        onClick ? 'cursor-pointer' : 'cursor-default',
        className
      )}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
        borderColor: borderColor || undefined,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}