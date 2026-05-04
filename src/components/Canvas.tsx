import { createContext, useContext, useRef } from 'react'
import { useMotionValue, animate, motion } from 'framer-motion'
import { useGesture } from '@use-gesture/react'
import { Home } from 'lucide-react'
import { BentoCluster } from './BentoCluster'
import { Modal } from './Modal'
import { canvasData } from '@/data/canvasConfig'

const initialX = window.innerWidth / 2
const initialY = window.innerHeight / 2

const CanvasContext = createContext<{
  resetView: () => void
}>({ resetView: () => { console.log('resetView called'); } })

export function Canvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(initialX)
  const y = useMotionValue(initialY)
  const scale = useMotionValue(1)

  const resetView = () => {
    console.log('resetView triggered', { x: x.get(), y: y.get(), scale: scale.get() })
    animate(x, initialX, { type: 'spring', stiffness: 300, damping: 30 })
    animate(y, initialY, { type: 'spring', stiffness: 300, damping: 30 })
    animate(scale, 1, { type: 'spring', stiffness: 300, damping: 30 })
  }

  useGesture(
    {
      onDrag: ({ offset: [dx, dy] }) => {
        x.set(dx)
        y.set(dy)
      },
      onWheel: ({ delta: [, dy], event }) => {
        event.preventDefault()
        const zoomSensitivity = 0.002
        const newScale = Math.max(0.3, Math.min(3, scale.get() * (1 - dy * zoomSensitivity)))
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
    <CanvasContext.Provider value={{ resetView }}>
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
      </div>
      <Modal />
    </CanvasContext.Provider>
  )
}