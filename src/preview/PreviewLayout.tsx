import { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

interface PreviewLayoutProps {
  children: ReactNode
  title: string
}

export function PreviewLayout({ children, title }: PreviewLayoutProps) {
  return (
    <div className="w-screen h-screen overflow-hidden relative" style={{ backgroundColor: 'var(--bg-color)' }}>
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--dot-color) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-zinc-200/50 px-6 py-4">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back to Canvas</span>
          </Link>
          <div className="h-4 w-px bg-zinc-300" />
          <h1 className="text-lg font-semibold text-zinc-900">{title}</h1>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 h-[calc(100vh-73px)] overflow-auto">
        {children}
      </main>
    </div>
  )
}
