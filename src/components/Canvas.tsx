import { useRef } from 'react'
import { useGesture } from '@use-gesture/react'
import { motion, useMotionValue } from 'framer-motion'
import { BentoCluster } from './BentoCluster'
import { Modal } from './Modal'
import { canvasData } from '@/data/canvasConfig'

export function Canvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(window.innerWidth / 2)
  const y = useMotionValue(window.innerHeight / 2)
  const scale = useMotionValue(1)

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
      </div>
      <Modal />
    </>
  )
}