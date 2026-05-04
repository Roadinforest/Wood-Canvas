import { Canvas } from './components/Canvas'

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-canvas-bg">
      <Canvas />

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl px-6 py-3 rounded-full shadow-lg flex gap-5 text-sm text-text-muted pointer-events-none">
        <span>🖱️ 拖拽以漫游画布</span>
        <span>↕️ 滚轮以缩放视图</span>
      </div>

      <button className="fixed bottom-8 right-8 bg-black text-white px-5 py-3 rounded-full text-sm shadow-lg hover:opacity-80 transition-opacity">
        回到中心
      </button>
    </div>
  )
}

export default App