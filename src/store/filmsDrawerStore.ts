import { create } from 'zustand'

interface FilmsDrawerStore {
  isOpen: boolean
  isHovered: boolean
  openDrawer: () => void
  closeDrawer: () => void
  setHovered: (value: boolean) => void
}

export const useFilmsDrawerStore = create<FilmsDrawerStore>((set, get) => ({
  isOpen: false,
  isHovered: false,
  openDrawer: () => set({ isOpen: true }),
  closeDrawer: () => set({ isOpen: false }),
  setHovered: (value: boolean) => set({ isHovered: value }),
  isDrawerOpen: () => get().isOpen,
}))