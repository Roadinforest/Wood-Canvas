import { useRef, useState, useEffect } from 'react'
import { useMotionValue, animate, motion } from 'framer-motion'
import { useGesture } from '@use-gesture/react'
import { Home } from 'lucide-react'
import { BentoCluster } from './BentoCluster'
import { Modal } from './Modal'
import { canvasData } from '@/data/canvasConfig'
import { useCanvasStore } from '@/store/modalStore'

const initialX = window.innerWidth / 2
const initialY = window.innerHeight / 2

export function Canvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const setResetView = useCanvasStore((state) => state.setResetView)

  const x = useMotionValue(initialX)
  const y = useMotionValue(initialY)
  const scale = useMotionValue(1)
  const [scaleDisplay, setScaleDisplay] = useState(100)

  useEffect(() => {
    const unsubscribe = scale.onChange((v) => setScaleDisplay(Math.round(v * 100)))
    return unsubscribe
  }, [scale])

  const resetView = () => {
    animate(x, initialX, { type: 'spring', stiffness: 300, damping: 30 })
    animate(y, initialY, { type: 'spring', stiffness: 300, damping: 30 })
    animate(scale, 1, { type: 'spring', stiffness: 300, damping: 30 })
  }

  setResetView(resetView)

  useGesture(
    {
      onDrag: ({ offset: [dx, dy] }) => {
        x.set(dx)
        y.set(dy)
      },
      onWheel: ({ delta: [, dy], event }) => {
        event.preventDefault()
        const zoomSensitivity = 0.002
        const oldScale = scale.get()
        const newScale = Math.max(0.5, Math.min(1.5, oldScale * (1 - dy * zoomSensitivity)))

        const mouseX = event.clientX
        const mouseY = event.clientY

        const newX = mouseX - (mouseX - x.get()) * (newScale / oldScale)
        const newY = mouseY - (mouseY - y.get()) * (newScale / oldScale)

        x.set(newX)
        y.set(newY)
        scale.set(newScale)
      },
    },
    {
      target: containerRef,
      drag: { from: () => [x.get(), y.get()] },
      wheel: { eventOptions: { passive: false } },
    }
  )

  return (
    <>
      <div
        ref={containerRef}
        className="w-screen h-screen relative overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
      >
        <motion.div
          className="absolute"
          style={{
            x,
            y,
            scale,
            originX: '50%',
            originY: '50%',
          }}
        >
          <div
            className="absolute -left-[50000px] -top-[50000px] w-[100000px] h-[100000px] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(var(--dot-color) 1.5px, transparent 0)',
              backgroundSize: '40px 40px',
              zIndex: -1,
            }}
          />

          {canvasData.map((cluster) => (
            <BentoCluster key={cluster.id} cluster={cluster} />
          ))}
        </motion.div>

        <button
          onClick={resetView}
          className="fixed bottom-8 right-8 bg-black text-white w-12 h-12 rounded-full shadow-lg hover:opacity-80 transition-opacity flex items-center justify-center"
        >
          <Home size={20} />
        </button>

        <motion.div
          className="fixed bottom-8 left-8 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-sm text-neutral-600 pointer-events-none font-mono"
        >
          {scaleDisplay}%
        </motion.div>
      </div>
      <Modal />
    </>
  )
}