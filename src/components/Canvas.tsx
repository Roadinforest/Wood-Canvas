import { useState, useEffect, useRef } from 'react'
import ReactFlow, {
  useNodesState,
  Background,
  BackgroundVariant,
  Controls,
} from 'reactflow'
import 'reactflow/dist/style.css'

import { Home, Move } from 'lucide-react'
import { useCanvasStore } from '@/store/modalStore'
import { canvasData, convertToReactFlowNodes } from '@/data/canvasConfig'

import { BentoNode } from './nodes/BentoNode'
import { Modal } from './Modal'

const nodeTypes = {
  bento: BentoNode,
}

const initialNodes = convertToReactFlowNodes(canvasData)

export function Canvas() {
  const modifyMode = useCanvasStore((state) => state.modifyMode)
  const toggleModifyMode = useCanvasStore((state) => state.toggleModifyMode)
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [scaleDisplay, setScaleDisplay] = useState(100)

  const prevModifyModeRef = useRef(modifyMode)
  const isSavingRef = useRef(false)
  const saveTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (prevModifyModeRef.current === true && modifyMode === false) {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }

      saveTimeoutRef.current = window.setTimeout(() => {
        if (isSavingRef.current) return
        isSavingRef.current = true

        const positions = nodes.map((node) => ({
          id: node.id,
          x: Math.round(node.position.x),
          y: Math.round(node.position.y),
        }))

        fetch('/api/update-positions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(positions),
        })
          .then((res) => {
            if (!res.ok) console.error('Failed to save positions')
          })
          .finally(() => {
            isSavingRef.current = false
          })
      }, 500)
    }
    prevModifyModeRef.current = modifyMode
  }, [modifyMode, nodes])

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      <div className="w-screen h-screen relative overflow-hidden">
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          nodesDraggable={modifyMode}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag={true}
          zoomOnScroll={true}
          zoomOnPinch={true}
          fitView={false}
          minZoom={0.3}
          maxZoom={3}
          onMove={(_, viewport) => {
            setScaleDisplay(Math.round(viewport.zoom * 100))
          }}
          onNodeMouseEnter={(_, node) => {
            const el = document.querySelector(`[data-id="${node.id}"]`)
            if (el) el.classList.add('hovered')
          }}
          onNodeMouseLeave={(_, node) => {
            const el = document.querySelector(`[data-id="${node.id}"]`)
            if (el) el.classList.remove('hovered')
          }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={60}
            size={5}
            color="var(--dot-color)"
          />
          <Controls showInteractive={false} />
        </ReactFlow>

        <button
          onClick={() => {
            const flow = document.querySelector('.react-flow') as any
            if (flow?.flyTo) {
              flow.flyTo({ x: 0, y: 0, zoom: 1 })
            }
          }}
          className="fixed bottom-8 right-8 bg-black text-white w-12 h-12 rounded-full shadow-lg hover:opacity-80 transition-opacity flex items-center justify-center"
        >
          <Home size={20} />
        </button>

        <div className="fixed bottom-8 left-8 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-sm text-neutral-600 pointer-events-none font-mono">
          {scaleDisplay}%
        </div>

        {import.meta.env.DEV && (
          <>
            <button
              onClick={toggleModifyMode}
              className={`fixed top-8 right-8 px-4 py-2 rounded-full shadow-lg transition-opacity flex items-center gap-2 ${
                modifyMode ? 'bg-blue-500 text-white' : 'bg-black text-white hover:opacity-80'
              }`}
            >
              <Move size={16} />
              <span className="text-sm">{modifyMode ? 'Edit Mode' : 'Edit'}</span>
            </button>

            {modifyMode && (
              <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm shadow-lg">
                Modify Mode - Drag cards to reposition | Click outside to deselect
              </div>
            )}
          </>
        )}
      </div>
      <Modal />
    </>
  )
}