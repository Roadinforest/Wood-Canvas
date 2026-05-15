import { ReactNode } from "react";

interface FlipCardProps {
  rotate?: "x" | "y";
  className?: string;
  children: ReactNode;
  back: ReactNode;
  flipped?: boolean;
}

export default function FlipCard({
  rotate = "y",
  className = "",
  children,
  back,
  flipped = false,
}: FlipCardProps) {
  const rotationClass = flipped
    ? { x: "[transform:rotateX(180deg)]", y: "[transform:rotateY(180deg)]" }
    : { x: "", y: "" };

  const backRotationClass = {
    x: "[transform:rotateX(180deg)]",
    y: "[transform:rotateY(180deg)]",
  };

  return (
    <div
      className={`group h-72 w-56 [perspective:1000px] ${className}`}
    >
      <div
        className={`relative h-full w-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d] ${rotationClass[rotate]}`}
      >
        {/* Front */}
        <div className="absolute size-full overflow-hidden rounded-2xl border [backface-visibility:hidden]">
          {children}
        </div>

        {/* Back */}
        <div
          className={`absolute h-full w-full overflow-hidden rounded-2xl border bg-black/80 p-4 text-slate-200 [backface-visibility:hidden] ${backRotationClass[rotate]}`}
        >
          {back}
        </div>
      </div>
    </div>
  );
}