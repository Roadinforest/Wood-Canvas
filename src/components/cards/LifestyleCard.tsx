import { useState } from "react";
import { motion } from "framer-motion";

interface MediaItem {
  id: string;
  title: string;
  image: string;
}

const movies: MediaItem[] = [
  {
    id: "inception",
    title: "Inception",
    image: "https://image.tmdb.org/t/p/w200/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
  },
  {
    id: "interstellar",
    title: "Interstellar",
    image: "https://image.tmdb.org/t/p/w200/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
];

const books: MediaItem[] = [
  {
    id: "1984",
    title: "1984",
    image: "https://covers.openlibrary.org/b/id/7222246-M.jpg",
  },
  {
    id: "sapiens",
    title: "Sapiens",
    image: "https://covers.openlibrary.org/b/id/8365844-M.jpg",
  },
  {
    id: "alchemist",
    title: "The Alchemist",
    image: "https://covers.openlibrary.org/b/id/8407496-M.jpg",
  },
];

interface MediaRowProps {
  item: MediaItem;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function MediaRow({ item, isActive, onHover, onLeave }: MediaRowProps) {
  return (
    <motion.div
      className="relative h-12 rounded-lg cursor-pointer overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${item.image})`,
        filter: isActive ? "grayscale(0%)" : "grayscale(100%)",
        transition: "filter 0.3s ease-in-out",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >

      {/* Frosted glass layer */}
      <div
        className="absolute inset-0 backdrop-blur-[2px] transition-opacity duration-300"
        style={{ opacity: isActive ? 0.15 : 0.25 }}
      />

      {/* Text content */}
      <div className="relative z-10 flex items-center h-full px-3">
        <span className="text-sm text-white font-medium drop-shadow-md">
          {item.title}
        </span>
      </div>
    </motion.div>
  );
}

export default function LifestyleCard() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-5 border-2 border-dashed border-zinc-300">
      <h3 className="text-base font-semibold text-zinc-800 mb-4">Lifestyle</h3>

      <div className="mb-4">
        <h4 className="text-xs uppercase tracking-wider text-zinc-400 mb-2">
          Movies
        </h4>
        <div className="space-y-2">
          {movies.map((movie) => (
            <MediaRow
              key={movie.id}
              item={movie}
              isActive={activeId === movie.id}
              onHover={() => setActiveId(movie.id)}
              onLeave={() => setActiveId(null)}
            />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs uppercase tracking-wider text-zinc-400 mb-2">
          Books
        </h4>
        <div className="space-y-2">
          {books.map((book) => (
            <MediaRow
              key={book.id}
              item={book}
              isActive={activeId === book.id}
              onHover={() => setActiveId(book.id)}
              onLeave={() => setActiveId(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
