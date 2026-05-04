import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useModalStore } from '@/store/modalStore'

export function Modal() {
  const { isOpen, data, closeModal } = useModalStore()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [closeModal])

  return (
    <AnimatePresence>
      {isOpen && data && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
            onClick={closeModal}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
            className="relative rounded-[32px] shadow-2xl border border-white/20 w-full max-w-[80vw] max-h-[80vh] flex flex-col"
          >
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center z-10"
              style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
            >
              <X size={18} className="text-neutral-700" />
            </button>
            <div className="p-10 overflow-y-auto flex-1">
              <h2 className="text-[26px] font-semibold text-neutral-900 mb-4">{data.title}</h2>
              <p className="text-[16px] text-neutral-600 leading-relaxed whitespace-pre-wrap">{data.content}</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}