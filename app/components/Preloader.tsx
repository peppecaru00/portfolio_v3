"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Track loading progress
    let loadedCount = 0;
    const totalAssets = document.querySelectorAll('img, video').length || 1;
    
    const updateProgress = () => {
      loadedCount++;
      const percent = Math.min((loadedCount / totalAssets) * 100, 100);
      setProgress(percent);
    };

    // Listen for image/video loads
    const mediaElements = document.querySelectorAll('img, video');
    mediaElements.forEach((el) => {
      if ((el as HTMLImageElement).complete || (el as HTMLVideoElement).readyState >= 3) {
        updateProgress();
      } else {
        el.addEventListener('load', updateProgress);
        el.addEventListener('error', updateProgress); // Count errors as loaded
      }
    });

    // Minimum display time (prevents flash)
    const minTime = new Promise(resolve => setTimeout(resolve, 1500));

    // Wait for window load + min time
    const handleLoad = async () => {
      await Promise.all([
        minTime,
        new Promise(resolve => {
          if (document.readyState === 'complete') resolve(null);
          else window.addEventListener('load', () => resolve(null));
        })
      ]);
      
      setProgress(100);
      setTimeout(() => setIsLoading(false), 400); // Exit animation time
    };

    handleLoad();

    return () => {
      mediaElements.forEach((el) => {
        el.removeEventListener('load', updateProgress);
        el.removeEventListener('error', updateProgress);
      });
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          >
            {/* Logo or Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white text-2xl font-bold tracking-tighter mb-8"
            >
              Hi! Just a sec...
            </motion.div>

            {/* Progress Bar */}
            <div className="w-48 h-[2px] bg-neutral-800 overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Percentage */}
            <motion.span
              className="mt-4 text-neutral-500 text-sm font-mono tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {Math.round(progress)}%
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
}