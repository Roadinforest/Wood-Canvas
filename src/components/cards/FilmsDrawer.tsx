import { motion, AnimatePresence } from "framer-motion";
import { useFilmsDrawerStore } from "@/store/filmsDrawerStore";
import { useState, useEffect, useRef } from "react";

interface MediaItem {
  id: string;
  title: string;
  image: string;
  rating?: number;
}

const filmsList: MediaItem[] = [
  {
    id: "inception",
    title: "Inception",
    image: "https://image.tmdb.org/t/p/w200/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    rating: 9,
  },
  {
    id: "interstellar",
    title: "Interstellar",
    image: "https://image.tmdb.org/t/p/w200/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 9,
  },
  {
    id: "dune",
    title: "Dune",
    image: "https://image.tmdb.org/t/p/w200/jYjYxPEjoeL8JAMP8wMunw7Rq5r.jpg",
    rating: 8,
  },
  {
    id: "matrix",
    title: "The Matrix",
    image: "https://image.tmdb.org/t/p/w200/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    rating: 8,
  },
  {
    id: "bladerunner",
    title: "Blade Runner 2049",
    image: "https://image.tmdb.org/t/p/w200/gajJ2bHf8JCdR5l63CEKP3p5aT.jpg",
    rating: 8,
  },
  {
    id: "matrix",
    title: "The Matrix",
    image: "https://image.tmdb.org/t/p/w200/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    rating: 8,
  },
  {
    id: "bladerunner",
    title: "Blade Runner 2049",
    image: "https://image.tmdb.org/t/p/w200/gajJ2bHf8JCdR5l63CEKP3p5aT.jpg",
    rating: 8,
  },
  {
    id: "matrix",
    title: "The Matrix",
    image: "https://image.tmdb.org/t/p/w200/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    rating: 8,
  },
  {
    id: "bladerunner",
    title: "Blade Runner 2049",
    image: "https://image.tmdb.org/t/p/w200/gajJ2bHf8JCdR5l63CEKP3p5aT.jpg",
    rating: 8,
  },
  {
    id: "matrix",
    title: "The Matrix",
    image: "https://image.tmdb.org/t/p/w200/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    rating: 8,
  },
  {
    id: "bladerunner",
    title: "Blade Runner 2049",
    image: "https://image.tmdb.org/t/p/w200/gajJ2bHf8JCdR5l63CEKP3p5aT.jpg",
    rating: 8,
  },
];

export default function FilmsDrawer() {
  const isOpen = useFilmsDrawerStore((s) => s.isOpen);
  const isHovered = useFilmsDrawerStore((s) => s.isHovered);
  const closeDrawer = useFilmsDrawerStore((s) => s.closeDrawer);
  const [activeId, setActiveId] = useState<string | null>(null);

  const peek = isHovered && !isOpen;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handler = (e: WheelEvent) => e.stopPropagation();
    el.addEventListener("wheel", handler, { capture: true });
    return () => el.removeEventListener("wheel", handler, { capture: true });
  }, []);

  return (
    <AnimatePresence>
      {(isOpen || peek) && (
        <>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
            />
          )}
          <motion.div
            data-films-drawer
            className="fixed left-1/2 -translate-x-1/2 w-[500px] max-w-[90vw] z-50"
            style={{ bottom: 0, height: peek ? "5vh" : "auto" }}
            initial={{ y: "100%" }}
            animate={{ y: peek ? "calc(100% - 5vh)" : 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="bg-white/80 backdrop-blur-md rounded-t-3xl border-2 border-dashed border-zinc-300 p-5 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-zinc-800">Films</h3>
                <button
                  onClick={closeDrawer}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {isOpen && (
                <div
                  ref={scrollRef}
                  className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto"
                >
                  {filmsList.map((film) => (
                    <motion.div
                      key={film.id}
                      className="relative h-32 rounded-xl overflow-hidden cursor-pointer bg-cover bg-center"
                      style={{ backgroundImage: `url(${film.image})` }}
                      onMouseEnter={() => setActiveId(film.id)}
                      onMouseLeave={() => setActiveId(null)}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className="absolute inset-0 transition-opacity duration-300"
                        style={{
                          backgroundImage: `url(${film.image})`,
                          filter: activeId === film.id ? "grayscale(0%)" : "grayscale(80%)",
                          opacity: activeId === film.id ? 0.3 : 0.6,
                        }}
                      />
                      <div className="relative z-10 h-full flex flex-col justify-between p-2">
                        <div className="flex justify-end">
                          <span className="bg-yellow-400 text-xs font-bold px-2 py-0.5 rounded-full">
                            {film.rating}
                          </span>
                        </div>
                        <span className="text-sm text-white font-medium drop-shadow-md">
                          {film.title}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              {peek && (
                <p className="text-center text-sm text-zinc-400 py-2">scroll up to open</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}