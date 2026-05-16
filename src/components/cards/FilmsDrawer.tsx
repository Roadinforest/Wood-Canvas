import { motion, AnimatePresence } from "framer-motion";
import { useFilmsDrawerStore } from "@/store/filmsDrawerStore";
import { useState, useEffect, useRef } from "react";

interface MediaItem {
  id: string;
  title: string;
  image: string;
}

const filmsList: MediaItem[] = [
  {
    id: "castle-in-the-sky",
    title: "Castle in the Sky",
    image: "https://media.themoviedb.org/t/p/w300_and_h450_face/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg",
  },
  {
    id: "my-neighbor-totoro",
    title: "My Neighbor Totoro",
    image: "https://media.themoviedb.org/t/p/w300_and_h450_face/cMYCDADoLKLbB83g4WnJegaZimC.jpg",
  },
  {
    id: "princess-mononoke",
    title: "Princess Mononoke",
    image: "https://media.themoviedb.org/t/p/w300_and_h450_face/41XxSsJc5OrulP0m7TrrUeO2hoz.jpg",
  },
  {
    id: "the-social-network",
    title: "The Social Network",
    image: "https://media.themoviedb.org/t/p/w300_and_h450_face/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg",
  },
  {
    id: "the-great-gatsby",
    title: "The Great Gatsby",
    image: "https://media.themoviedb.org/t/p/w300_and_h450_face/tyxfCBQv6Ap74jcu3xd7aBiaa29.jpg",
  },
  {
    id: "a-beautiful-mind",
    title: "A Beautiful Mind",
    image: "https://media.themoviedb.org/t/p/w300_and_h450_face/rEIg5yJdNOt9fmX4P8gU9LeNoTQ.jpg",
  },
  {
    id: "green-book",
    title: "Green Book",
    image: "https://media.themoviedb.org/t/p/w300_and_h450_face/7BsvSuDQuoqhWmU2fL7W2GOcZHU.jpg",
  },
  {
    id: "infernal-affairs",
    title: "Infernal Affairs",
    image: "https://media.themoviedb.org/t/p/w300_and_h450_face/exbyTbrvRUDKN2mcNEuVor4VFQW.jpg",
  },
  {
    id: "zootopia",
    title: "Zootopia",
    image: "https://media.themoviedb.org/t/p/w300_and_h450_face/hlK0e0wAQ3VLuJcsfIYPvb4JVud.jpg",
  },
  {
    id: "kung-fu-hustle",
    title: "Kung Fu Hustle",
    image: "https://media.themoviedb.org/t/p/w300_and_h450_face/hjS9mH8KvRiGHgjk6VUZH7OT0Ng.jpg",
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
                  className="p-2 hover:bg-zinc-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {isOpen && (
                <div
                  ref={scrollRef}
                  className="max-h-[300px] overflow-y-auto"
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {filmsList.map((film) => (
                      <motion.div
                        key={film.id}
                        className="relative h-32 overflow-visible cursor-pointer bg-cover bg-center rounded-md"
                        style={{ backgroundImage: `url(${film.image})` }}
                        onMouseEnter={() => setActiveId(film.id)}
                        onMouseLeave={() => setActiveId(null)}
                      >
                        <div
                          className="absolute inset-0 transition-opacity duration-300 rounded-md"
                          style={{
                            backgroundImage: `url(${film.image})`,
                            filter: activeId === film.id ? "grayscale(0%)" : "grayscale(80%)",
                            opacity: activeId === film.id ? 0.3 : 0.6,
                          }}
                        />
                        <div className="relative z-10 h-full flex flex-col justify-between p-2 rounded-md">
                          <div className="flex justify-end" />
                          <span className="text-sm text-white font-medium drop-shadow-md">
                            {film.title}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
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