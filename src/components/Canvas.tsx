import { useState, useEffect, useRef, useCallback } from 'react'
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
} from 'reactflow'
import 'reactflow/dist/style.css'

import { Home, Move } from 'lucide-react'
import { useCanvasStore } from '@/store/modalStore'
import { canvasData, canvasEdges, convertToReactFlowNodes, convertToReactFlowEdges } from '@/data/canvasConfig'

import { BentoNode } from './nodes/BentoNode'
import { Modal } from './Modal'
import FilmsDrawer from './cards/FilmsDrawer'
import useCenterOnNode from '@/hooks/useCenterOnNode'

const nodeTypes = {
  bento: BentoNode,
}

const initialNodes = convertToReactFlowNodes(canvasData)
const initialEdges = convertToReactFlowEdges(canvasEdges)

export function Canvas() {
  const modifyMode = useCanvasStore((state) => state.modifyMode)
  const toggleModifyMode = useCanvasStore((state) => state.toggleModifyMode)
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [scaleDisplay, setScaleDisplay] = useState(100)

  const prevModifyModeRef = useRef(modifyMode)
  const isSavingRef = useRef(false)
  const saveTimeoutRef = useRef<number | null>(null)
  const rfInstanceRef = useRef<any | null>(null)
  const [rfiInstance, setRfiInstance] = useState<any | null>(null)
  const hasInitializedRef = useRef(false)

  const centerOnNode = useCenterOnNode(nodes, rfiInstance)

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

        const edgeData = edges.map((e) => ({
          id: e.id,
          source: e.source,
          sourceHandle: e.sourceHandle,
          target: e.target,
          targetHandle: e.targetHandle,
        }))

        fetch('/api/update-positions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ positions, edges: edgeData }),
        })
          .then((res) => {
            if (!res.ok) console.error('Failed to save')
          })
          .finally(() => {
            isSavingRef.current = false
          })
      }, 500)
    }
    prevModifyModeRef.current = modifyMode
  }, [modifyMode, nodes, edges])

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [])

  // 页面加载时飞转到 profile 卡片，与 Home 按钮逻辑一致
  useEffect(() => {
    if (hasInitializedRef.current) return
    if (!rfiInstance) return

    let canceled = false

    const init = async () => {
      await centerOnNode('profile', { zoom: 0.77, duration: 0 })
      if (!canceled) hasInitializedRef.current = true
    }

    init()

    return () => {
      canceled = true
    }
  }, [nodes, rfiInstance])

  return (
    <>
      <div className="w-screen h-screen relative overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={useCallback((params: Connection) => {
            setEdges((eds) => addEdge({ ...params, animated: true }, eds))
          }, [setEdges])}
          nodeTypes={nodeTypes}
          nodesDraggable={modifyMode}
          nodesConnectable={modifyMode}
          elementsSelectable={false}
          panOnDrag={true}
          zoomOnScroll={true}
          zoomOnPinch={true}
          fitView={false}
          minZoom={0.5}
          maxZoom={1.5}
          onMove={(_, viewport) => {
            setScaleDisplay(Math.round(viewport.zoom * 100))
          }}
          onNodeMouseEnter={(_, node) => {
            const el = document.querySelector(`[data-id="${node.id}"]`)
            if (el) el.classList.add('hovered')
          }}
          onInit={(rfi) => {
            rfInstanceRef.current = rfi
            setRfiInstance(rfi)
          }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={60}
            size={5}
            color="var(--dot-color)"
          />
          {/* <Controls showInteractive={false} /> */}
        </ReactFlow>

        <button
          onClick={() => {
            centerOnNode('profile', { zoom: 0.77, duration: 1000 })
          }}
          aria-label="Go to profile"
          className="fixed bottom-8 right-8 z-50 bg-black text-white w-12 h-12 rounded-full shadow-lg hover:opacity-80 transition-opacity flex items-center justify-center pointer-events-auto"
        >
          <Home size={20} />
        </button>

        <div className="fixed bottom-8 left-8 w-[4.5rem] rounded-full bg-white/80 px-4 py-2 text-center font-mono text-sm text-neutral-600 shadow-lg backdrop-blur-sm pointer-events-none tabular-nums">
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
                Modify Mode - Drag cards to reposition | Drag from edge to connect cards
              </div>
            )}
          </>
        )}
      </div>
      <Modal />
      <FilmsDrawer />
    </>
  )
}