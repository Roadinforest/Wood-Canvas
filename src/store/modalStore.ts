import { create } from 'zustand'

interface ModalData {
  title: string
  content: string
  type: string
}

interface ModalStore {
  isOpen: boolean
  data: ModalData | null
  openModal: (data: ModalData) => void
  closeModal: () => void
}

export const useModalStore = create<ModalStore>()((set) => ({
  isOpen: false,
  data: null,
  openModal: (data) => set({ isOpen: true, data }),
  closeModal: () => set({ isOpen: false, data: null }),
}))