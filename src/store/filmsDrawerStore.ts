import { create } from 'zustand'

interface FilmsDrawerStore {
  isOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
}

export const useFilmsDrawerStore = create<FilmsDrawerStore>((set, get) => ({
  isOpen: false,
  openDrawer: () => set({ isOpen: true }),
  closeDrawer: () => set({ isOpen: false }),
  isDrawerOpen: () => get().isOpen,
}))