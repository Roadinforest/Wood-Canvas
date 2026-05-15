import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type CardSize = 'sm' | 'md' | 'lg' | 'custom'

interface ListCardProps {
  title: string
  icon?: React.ReactNode
  className?: string
  colSpan?: number
  rowSpan?: number
  size?: CardSize
  items: Array<{
    id: string
    text: string
    description?: string
    done?: boolean
  }>
  renderItem?: (item: { id: string; text: string; description?: string; done?: boolean }, index: number) => React.ReactNode
}

const sizeClasses: Record<CardSize, string> = {
  sm: 'w-[280px]',
  md: 'w-[400px]',
  lg: 'w-[560px]',
  custom: '',
}

export function ListCard({ title, icon, className, colSpan = 1, rowSpan = 1, size = 'sm', items, renderItem }: ListCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={cn(
        'bg-card-bg rounded-bento p-7 shadow-bento transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-bento-hover',
        sizeClasses[size],
        'cursor-pointer',
        className
      )}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-[20px] font-medium">{title}</h2>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="mt-4 space-y-3">
            {items.map((item, index) =>
              renderItem ? renderItem(item, index) : (
                <div key={item.id} className="text-[14px] text-neutral-700">
                  {item.text}
                </div>
              )
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}