import { create } from 'zustand'

interface ModalData {
  title: string
  content: string
  type: string
}

interface CanvasState {
  resetView: () => void
  setResetView: (fn: () => void) => void
}

interface ModalStore {
  isOpen: boolean
  data: ModalData | null
  openModal: (data: ModalData) => void
  closeModal: () => void
}

let resetViewFn: () => void = () => {}

export const useCanvasStore = create<CanvasState>()((set) => ({
  resetView: () => resetViewFn(),
  setResetView: (fn) => { resetViewFn = fn },
}))

export const useModalStore = create<ModalStore>()((set) => ({
  isOpen: false,
  data: null,
  openModal: (data) => set({ isOpen: true, data }),
  closeModal: () => set({ isOpen: false, data: null }),
}))