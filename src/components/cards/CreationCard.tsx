import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { BentoCard } from '../BentoCard'
import checkedIcon from '../../../public/checkbox.svg'

interface CreationItem {
  name: string
  description: string
  done: boolean
}

const creationIdeas: CreationItem[] = [
  { name: 'PDF Headings Builder', description: 'Help build the headings for your PDF documents', done: false },
  { name: 'SketchSnap', description: 'Take a photo, highlight the objects you want, and instantly turn them into clean illustrated artwork ready for social sharing.', done: false },
]

export function CreationCard() {
  const [expanded, setExpanded] = useState(false)

  return (
    <BentoCard size="sm" rowSpan={1} onClick={() => setExpanded(!expanded)} className="bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] font-medium">Creation Ideas</h2>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-3">
              {creationIdeas.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <img src={checkedIcon} className={`w-4 h-4 mt-[2px] ${item.done ? '' : 'grayscale'}`} alt="done" />
                  <div className="min-w-0">
                    <div className={`text-[14px] font-medium ${item.done ? 'text-green-600' : 'text-neutral-800'}`}>
                      {item.name}
                    </div>
                    <div className="text-[12px] text-neutral-500">
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </BentoCard>
  )
}