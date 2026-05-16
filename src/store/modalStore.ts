import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ModalData {
  title: string
  content: string
  type: string
  link?: string
  linkLabel?: string
}

interface CanvasPosition {
  x: number
  y: number
}

interface CanvasState {
  resetView: () => void
  setResetView: (fn: () => void) => void
  modifyMode: boolean
  toggleModifyMode: () => void
  cardPositions: Record<string, CanvasPosition>
  updateCardPosition: (cardId: string, x: number, y: number) => void
  edges: CanvasEdge[]
  updateEdges: (edges: CanvasEdge[]) => void
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

interface CanvasEdge {
  id: string
  source: string
  target: string
}

interface ModalStore {
  isOpen: boolean
  data: ModalData | null
  openModal: (data: ModalData) => void
  closeModal: () => void
}

let resetViewFn: () => void = () => {}

export const useCanvasStore = create<CanvasState>()(
  persist(
    (set, get) => ({
      resetView: () => resetViewFn(),
      setResetView: (fn) => { resetViewFn = fn },
      modifyMode: false,
      toggleModifyMode: () => set((state) => ({ modifyMode: !state.modifyMode })),
      theme: 'light',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      cardPositions: {},
      updateCardPosition: (cardId, x, y) => {
        console.log('[Store] updateCardPosition:', cardId, 'x:', x, 'y:', y)
        set((state) => ({
          cardPositions: { ...state.cardPositions, [cardId]: { x, y } }
        }))
      },
      edges: [],
      updateEdges: (edges) => set({ edges }),
      saveEdgesToStorage: () => {
        const { edges } = get()
        localStorage.setItem('canvas-edges', JSON.stringify(edges))
      },
    }),
    { name: 'canvas-store' }
  )
)

export const useModalStore = create<ModalStore>()((set) => ({
  isOpen: false,
  data: null,
  openModal: (data) => set({ isOpen: true, data }),
  closeModal: () => set({ isOpen: false, data: null }),
}))