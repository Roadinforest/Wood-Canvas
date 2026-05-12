import { Canvas } from './components/Canvas'
import { Home } from 'lucide-react'
import { useCanvasStore } from './store/modalStore'

function CanvasApp() {
  const resetView = useCanvasStore((state) => state.resetView)

  return (
    <div className="w-screen h-screen overflow-hidden bg-canvas-bg">
      <Canvas />

      <button
        onClick={resetView}
        className="fixed bottom-8 right-8 bg-black text-white w-12 h-12 rounded-full shadow-lg hover:opacity-80 transition-opacity flex items-center justify-center"
      >
        <Home size={20} />
      </button>
    </div>
  )
}

export default CanvasApp
