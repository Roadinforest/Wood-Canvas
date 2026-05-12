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
    (set) => ({
      resetView: () => resetViewFn(),
      setResetView: (fn) => { resetViewFn = fn },
      modifyMode: false,
      toggleModifyMode: () => set((state) => ({ modifyMode: !state.modifyMode })),
      cardPositions: {},
      updateCardPosition: (cardId, x, y) => {
        console.log('[Store] updateCardPosition:', cardId, 'x:', x, 'y:', y)
        set((state) => ({
          cardPositions: { ...state.cardPositions, [cardId]: { x, y } }
        }))
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