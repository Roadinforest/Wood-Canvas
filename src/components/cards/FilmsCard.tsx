import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useFilmsDrawerStore } from "@/store/filmsDrawerStore";

export default function FilmsCard() {
  const [isHovered, setIsHovered] = useState(false);
  const openDrawer = useFilmsDrawerStore((s) => s.openDrawer);
  const closeDrawer = useFilmsDrawerStore((s) => s.closeDrawer);
  const isDrawerOpen = useFilmsDrawerStore((s) => s.isOpen);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isHovered) return;

      e.stopPropagation();
      e.preventDefault();

      if (isDrawerOpen && e.deltaY > 0) {
        closeDrawer();
        return;
      }

      if (!isDrawerOpen && e.deltaY < 0) {
        openDrawer();
      }
    };

    card.addEventListener("wheel", handleWheel, { passive: false });
    return () => card.removeEventListener("wheel", handleWheel);
  }, [isHovered, openDrawer, closeDrawer, isDrawerOpen]);

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