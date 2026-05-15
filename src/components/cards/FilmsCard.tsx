import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useFilmsDrawerStore } from "@/store/filmsDrawerStore";

export default function FilmsCard() {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleWheel = (e: WheelEvent) => {
      const isUpScroll = e.deltaY < 0;
      const currentState = useFilmsDrawerStore.getState();

      if (currentState.isOpen) {
        if (isUpScroll) {
          useFilmsDrawerStore.setState({ isOpen: false });
        }
      } else if (isHovered && !isUpScroll) {
        useFilmsDrawerStore.setState({ isOpen: true });
      }

      e.stopPropagation();
      e.preventDefault();
    };

    document.addEventListener("wheel", handleWheel as EventListener, { passive: false, capture: true } as AddEventListenerOptions);
    return () => document.removeEventListener("wheel", handleWheel as EventListener, { passive: false, capture: true } as AddEventListenerOptions);
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      className="bg-white/30 backdrop-blur-sm rounded-3xl p-5 border-2 border-dashed border-zinc-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="text-base font-semibold text-zinc-800">Films</h3>

      <div className="flex justify-center mt-4">
        <motion.div
          animate={{ y: isHovered ? -4 : 4 }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <svg
            className="w-6 h-6 text-zinc-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}