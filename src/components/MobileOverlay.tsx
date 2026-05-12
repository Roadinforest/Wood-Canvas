import { useEffect, useState, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import { motion, AnimatePresence } from 'framer-motion';

export function MobileOverlay() {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dismissedRef = useRef(false);

  useEffect(() => {
    if (isMobile && !dismissedRef.current) {
      setVisible(true);
      timerRef.current = setTimeout(() => {
        setVisible(false);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    dismissedRef.current = true;
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleClick}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer"
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <div className="text-center space-y-8">
            <svg
              className="w-20 h-20 mx-auto text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
              />
            </svg>
            <p className="text-xl font-medium text-zinc-600">
              Please view on PC for better experience
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
