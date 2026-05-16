import { useEffect, useRef } from "react";
import FlipCard from "@/components/ui/flip-card";
import { useFilmsDrawerStore } from "@/store/filmsDrawerStore";

export default function FilmsCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const isOpen = useFilmsDrawerStore((s) => s.isOpen);
  const isHovered = useFilmsDrawerStore((s) => s.isHovered);
  const setIsHovered = useFilmsDrawerStore((s) => s.setHovered);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // 忽略 FilmsDrawer 内部的滚动，让 Drawer 自己处理
      const drawer = document.querySelector('[data-films-drawer]');
      if (drawer && drawer.contains(e.target as Node)) return;

      const isUpScroll = e.deltaY > 0;
      const isPhysicsHovered = cardRef.current?.matches(":hover");
      if (!isPhysicsHovered && !isOpen) {
        return;
      }

      // 上滑打开抽屉，只有当鼠标悬停在卡片上且抽屉未打开时才触发
      if (isPhysicsHovered && isUpScroll && !isOpen) {
        useFilmsDrawerStore.setState({ isOpen: true });
      }
      // 下滑关闭抽屉，只有当抽屉打开时才触发
      else if (!isUpScroll && isOpen) {
        useFilmsDrawerStore.setState({ isOpen: false });
        if (isPhysicsHovered) {
          setIsHovered(true);
        }
      }
      e.stopPropagation();
      e.preventDefault();
    };

    document.addEventListener(
      "wheel",
      handleWheel as EventListener,
      {
        capture: true,
      } as AddEventListenerOptions,
    );

    return () =>
      document.removeEventListener(
        "wheel",
        handleWheel as EventListener,
        {
          capture: true,
        } as AddEventListenerOptions,
      );
  }, [isOpen, isHovered]);


  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FlipCard
        rotate="y"
        className="h-16 w-56"
        flipped={isOpen || isHovered}
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
            {/* <span className="text-sm text-zinc-400">scroll to open</span> */}
          </div>
        }
      >
        <div className="bg-white/30 backdrop-blur-sm p-5 h-full flex flex-col items-center justify-center">
          <h3 className="text-base font-semibold text-zinc-800">Films</h3>
        </div>
      </FlipCard>
    </div>
  );
}