import { MobileOverlay } from '@/components/MobileOverlay'
import { Canvas } from '@/components/Canvas'

export function CanvasPage() {
  return (
    <>
      <MobileOverlay />
      <div className="h-screen w-screen overflow-hidden bg-canvas-bg select-none">
        <Canvas />
      </div>
    </>
  )
}
