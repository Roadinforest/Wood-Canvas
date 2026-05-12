import { useCallback } from 'react'

type CenterOptions = {
  zoom?: number
  duration?: number
}

export function useCenterOnNode(nodes: any[], rfiInstance: any | null) {
  return useCallback(
    async (nodeId: string, opts: CenterOptions = {}) => {
      const node = nodes.find((n) => n.id === nodeId)
      if (!node) {
        console.warn('[useCenterOnNode] node not found', nodeId)
        return
      }

      // allow DOM to settle
      await new Promise((res) => requestAnimationFrame(() => res(undefined)))

      const desiredZoom = opts.zoom ?? 1

      // prefer DOM measurement for accurate sizes
      const el = document.querySelector(`[data-id="${node.id}"]`) as HTMLElement | null
      const rect = el?.getBoundingClientRect()
      const nodeWidth = node.width ?? rect?.width ?? 400
      const nodeHeight = node.height ?? rect?.height ?? 200
      const nodeCenterX = (node.position?.x ?? 0) + nodeWidth / 2
      const nodeCenterY = (node.position?.y ?? 0) + nodeHeight / 2

      const container = document.querySelector('.react-flow') as HTMLElement | null
      const containerRect = container?.getBoundingClientRect() ?? { width: window.innerWidth, height: window.innerHeight }

      const targetX = containerRect.width / 2 - nodeCenterX * desiredZoom
      const targetY = containerRect.height / 2 - nodeCenterY * desiredZoom

      const instance = rfiInstance
      try {
        if (instance && typeof instance.setViewport === 'function') {
          instance.setViewport({ x: targetX, y: targetY, zoom: desiredZoom }, { duration: opts.duration ?? 0 })
          return
        }
        if (instance && typeof instance.setCenter === 'function') {
          instance.setCenter(nodeCenterX, nodeCenterY, { zoom: desiredZoom, duration: opts.duration ?? 0 })
          return
        }
        if (instance && typeof instance.flyTo === 'function') {
          instance.flyTo({ x: targetX, y: targetY, zoom: desiredZoom, duration: opts.duration ?? 0 })
          return
        }
      } catch (err) {
        console.warn('[useCenterOnNode] instance API call failed', err)
      }

      // fallback to DOM flyTo if available
      const flow = document.querySelector('.react-flow') as any
      if (flow?.flyTo) {
        flow.flyTo({ x: targetX, y: targetY, zoom: desiredZoom, duration: opts.duration ?? 0 })
      } else {
        console.error('[useCenterOnNode] No programmatic API available to move viewport')
      }
    },
    [nodes, rfiInstance]
  )
}

export default useCenterOnNode
