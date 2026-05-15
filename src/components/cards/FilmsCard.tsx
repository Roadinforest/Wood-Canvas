import { useEffect, useState } from "react";
import FlipCard from "@/components/ui/flip-card";
import { useFilmsDrawerStore } from "@/store/filmsDrawerStore";

export default function FilmsCard() {
  const [isHovered, setIsHovered] = useState(false);
  const isOpen = useFilmsDrawerStore((s) => s.isOpen);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const isUpScroll = e.deltaY < 0;
      const currentState = useFilmsDrawerStore.getState();

      if (currentState.isOpen && isUpScroll) {
        useFilmsDrawerStore.setState({ isOpen: false });
      } else if (!currentState.isOpen && !isUpScroll) {
        useFilmsDrawerStore.setState({ isOpen: true });
      }

      e.stopPropagation();
      e.preventDefault();
    };

    document.addEventListener("wheel", handleWheel as EventListener, {
      passive: false,
      capture: true,
    } as AddEventListenerOptions);
    return () =>
      document.removeEventListener("wheel", handleWheel as EventListener, {
        passive: false,
        capture: true,
      } as AddEventListenerOptions);
  }, []);

  const flipped = isHovered || isOpen;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FlipCard
        rotate="y"
        className="h-72 w-56"
        flipped={flipped}
        back={
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="animate-bounce">
              <svg
                className="w-8 h-8 text-zinc-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </div>
            <span className="text-sm text-zinc-400">scroll to open</span>
          </div>
        }
      >
        <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-5 h-full flex flex-col items-center justify-center">
          <h3 className="text-base font-semibold text-zinc-800">Films</h3>
        </div>
      </FlipCard>
    </div>
  );
}