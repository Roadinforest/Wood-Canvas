import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

export const sectionViewport = { once: true, amount: 0.22 }

export function SectionTitle({
  title,
  icon: Icon,
}: {
  title: string
  icon: LucideIcon
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 text-slate-700 shadow-sm ring-1 ring-slate-200/70 backdrop-blur">
            <Icon className="h-5 w-5" />
          </span>
          {title}
        </h2>
      </div>
    </div>
  )
}

export function SoftCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      className={`rounded-[2rem] border border-white/70 bg-white/72 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl ${className}`}
    >
      {children}
    </motion.div>
  )
}
