'use client';

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxPhoto {
  id: string;
  src: string;
  title?: string;
  type: 'image' | 'video';
  width: number;
  height: number;
}

interface LightboxProps {
  photos: LightboxPhoto[];
  initialIndex: number;
  onClose: () => void;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 60 : -60,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function Lightbox({ photos, initialIndex, onClose }: LightboxProps) {
  const [[page, direction], setPage] = useState([initialIndex, 0]);
  const [isZoomed, setIsZoomed] = useState(false);

  // Wrap index to ensure it loops properly
  const imageIndex = ((page % photos.length) + photos.length) % photos.length;
  const current = photos[imageIndex];

  const paginate = useCallback((newDirection: number) => {
    if (isZoomed) return;
    setPage([page + newDirection, newDirection]);
  }, [page, isZoomed]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') paginate(-1);
    if (e.key === 'ArrowRight') paginate(1);
  }, [onClose, paginate]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  // Reset zoom on image change
  useEffect(() => {
    setIsZoomed(false);
  }, [imageIndex]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-sm transition-all duration-200 hover:scale-110"
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm text-sm text-white/70 font-medium tabular-nums">
        {imageIndex + 1} / {photos.length}
      </div>

      {/* Zoom button (images only) */}
      {current.type === 'image' && (
        <button
          onClick={() => setIsZoomed(z => !z)}
          className="absolute bottom-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-sm transition-all duration-200 hover:scale-110"
          aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
        >
          {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
        </button>
      )}

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          paginate(-1);
        }}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-sm transition-all duration-200 hover:scale-110"
        aria-label="Previous photo"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          paginate(1);
        }}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-sm transition-all duration-200 hover:scale-110"
        aria-label="Next photo"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main media area */}
      <div className="relative flex items-center justify-center w-full h-full px-14 md:px-24 pt-16 pb-24 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag={isZoomed ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute flex items-center justify-center w-full h-full p-4 md:p-12"
          >
            {current.type === 'video' ? (
              <video
                src={current.src}
                autoPlay
                controls
                loop
                playsInline
                className="max-w-full max-h-full rounded-lg shadow-2xl"
                style={{ background: '#000' }}
              />
            ) : (
              <div
                className="relative cursor-zoom-in transition-transform duration-300 ease-in-out rounded-lg overflow-hidden shadow-2xl"
                style={{
                  cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                  transform: isZoomed ? 'scale(1.7)' : 'scale(1)',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(z => !z);
                }}
              >
                <Image
                  src={current.src}
                  alt={current.title || `Photo ${imageIndex + 1}`}
                  width={current.width}
                  height={current.height}
                  className="max-w-[85vw] max-h-[85vh] w-auto h-auto object-contain pointer-events-none"
                  priority
                  draggable={false}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Caption */}
      {current.title && (
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm text-sm text-white/70 max-w-xs truncate text-center">
          {current.title}
        </div>
      )}

      {/* Dot indicators */}
      {photos.length <= 20 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                if (i !== imageIndex) {
                  const dir = i > imageIndex ? 1 : -1;
                  setPage([i, dir]);
                }
              }}
              className={`rounded-full transition-all duration-200 ${
                i === imageIndex
                  ? 'bg-white w-4 h-1.5'
                  : 'bg-white/30 hover:bg-white/60 w-1.5 h-1.5'
              }`}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
