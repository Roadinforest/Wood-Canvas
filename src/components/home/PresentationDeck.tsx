import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export interface PresentationSlide {
  id: string
  label: string
  title: string
  summary: string
  points: string[]
  keywords: string[]
}

interface PresentationDeckProps {
  slides: PresentationSlide[]
  continueHint: string
  enterHint: string
  onFinish: () => void
}

export function PresentationDeck({
  slides,
  continueHint,
  enterHint,
  onFinish,
}: PresentationDeckProps) {
  const [slideIndex, setSlideIndex] = useState(0)
  const lastNavigationAtRef = useRef(0)
  const touchStartYRef = useRef<number | null>(null)
  const activeSlide = slides[slideIndex]
  const isLastSlide = slideIndex === slides.length - 1

  const moveNext = () => {
    const now = window.performance.now()
    if (now - lastNavigationAtRef.current < 650) return
    lastNavigationAtRef.current = now

    if (isLastSlide) {
      onFinish()
      return
    }

    setSlideIndex((current) => Math.min(current + 1, slides.length - 1))
  }

  const movePrevious = () => {
    const now = window.performance.now()
    if (now - lastNavigationAtRef.current < 650) return
    lastNavigationAtRef.current = now
    setSlideIndex((current) => Math.max(current - 1, 0))
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault()
        moveNext()
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault()
        movePrevious()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isLastSlide, onFinish])

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-[#f5f7fb] text-slate-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.985, filter: 'blur(10px)' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onWheel={(event) => {
        event.preventDefault()
        event.stopPropagation()
        if (Math.abs(event.deltaY) < 24) return
        if (event.deltaY > 0) moveNext()
        if (event.deltaY < 0) movePrevious()
      }}
      onTouchStart={(event) => {
        touchStartYRef.current = event.touches[0]?.clientY ?? null
      }}
      onTouchEnd={(event) => {
        const startY = touchStartYRef.current
        const endY = event.changedTouches[0]?.clientY
        touchStartYRef.current = null
        if (startY === null || endY === undefined) return
        if (startY - endY > 48) moveNext()
        if (endY - startY > 48) movePrevious()
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(239,246,255,0.86)_44%,rgba(245,247,251,0.96))]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,1),rgba(255,255,255,0)_68%)]" />
        <motion.div
          aria-hidden="true"
          className="absolute bottom-[-16rem] right-[-12rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.16),rgba(14,165,233,0)_70%)] blur-3xl"
          animate={{ x: [0, -24, 18, 0], y: [0, 18, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative mx-auto grid h-full w-full max-w-7xl grid-rows-[auto_1fr_auto] px-5 py-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 rounded-full border border-white/70 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-xl">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
              R
            </span>
            <span className="text-sm font-semibold text-slate-700">Rif</span>
          </div>
          <div className="rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-500 shadow-sm backdrop-blur-xl">
            {slideIndex + 1} / {slides.length}
          </div>
        </div>

        <div className="grid min-h-0 items-center py-8">
          <AnimatePresence mode="wait">
            <motion.section
              key={activeSlide.id}
              className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end"
              initial={{ opacity: 0, y: 34, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -26, filter: 'blur(10px)' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="space-y-7">
                <div className="inline-flex rounded-full bg-white/76 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-sm ring-1 ring-slate-200/70 backdrop-blur-xl">
                  {activeSlide.label}
                </div>
                <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] text-slate-950 sm:text-6xl lg:text-7xl">
                  {activeSlide.title}
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
                  {activeSlide.summary}
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/70 bg-white/72 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.1)] backdrop-blur-2xl">
                <ul className="grid gap-3">
                  {activeSlide.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-6 text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {activeSlide.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-slate-200/70 bg-white/86 px-3 py-1.5 text-xs font-semibold text-slate-600"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </motion.section>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setSlideIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === slideIndex ? 'w-12 bg-slate-950' : 'w-6 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === slideIndex}
            />
          ))}
          <div className="ml-auto text-sm font-medium text-slate-400">
            {isLastSlide ? enterHint : continueHint}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
