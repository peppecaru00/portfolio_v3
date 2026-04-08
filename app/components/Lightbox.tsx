'use client';

import { useEffect, useCallback, useState, useRef } from 'react';
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

const slideVariants = {
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
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

const MIN_SCALE = 1;
const MAX_SCALE = 5;

function getDistance(t1: React.Touch, t2: React.Touch) {
  const dx = t1.clientX - t2.clientX;
  const dy = t1.clientY - t2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

function getMidpoint(t1: React.Touch, t2: React.Touch) {
  return {
    x: (t1.clientX + t2.clientX) / 2,
    y: (t1.clientY + t2.clientY) / 2,
  };
}

export default function Lightbox({ photos, initialIndex, onClose }: LightboxProps) {
  const [[page, direction], setPage] = useState([initialIndex, 0]);

  // Zoom / pan state
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isZoomed = scale > 1.05;

  // Refs for gesture tracking (avoid stale closures)
  const scaleRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  const lastPinchDistRef = useRef<number | null>(null);
  const lastPinchMidRef = useRef<{ x: number; y: number } | null>(null);
  const singleTouchStartRef = useRef<{ x: number; y: number } | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const imageIndex = ((page % photos.length) + photos.length) % photos.length;
  const current = photos[imageIndex];

  const resetZoom = useCallback(() => {
    scaleRef.current = 1;
    panRef.current = { x: 0, y: 0 };
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const paginate = useCallback((newDirection: number) => {
    if (scaleRef.current > 1.05) {
      resetZoom();
    }
    setPage(([p]) => [p + newDirection, newDirection]);
  }, [resetZoom]);

  // Reset zoom on photo change
  useEffect(() => {
    resetZoom();
  }, [imageIndex, resetZoom]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (scaleRef.current > 1.05) {
        resetZoom();
      } else {
        onClose();
      }
    }
    if (e.key === 'ArrowLeft') paginate(-1);
    if (e.key === 'ArrowRight') paginate(1);
  }, [onClose, paginate, resetZoom]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  // ── Touch handlers ───────────────────────────────────────────────────────────

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch start
      lastPinchDistRef.current = getDistance(e.touches[0], e.touches[1]);
      lastPinchMidRef.current = getMidpoint(e.touches[0], e.touches[1]);
      singleTouchStartRef.current = null;
    } else if (e.touches.length === 1) {
      singleTouchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      lastPinchDistRef.current = null;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault?.();
      const dist = getDistance(e.touches[0], e.touches[1]);
      const mid = getMidpoint(e.touches[0], e.touches[1]);

      if (lastPinchDistRef.current !== null && lastPinchMidRef.current !== null) {
        const ratio = dist / lastPinchDistRef.current;
        const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scaleRef.current * ratio));

        // Pan to keep pinch midpoint anchored
        const dx = mid.x - lastPinchMidRef.current.x;
        const dy = mid.y - lastPinchMidRef.current.y;
        const newPan = {
          x: panRef.current.x + dx,
          y: panRef.current.y + dy,
        };

        scaleRef.current = newScale;
        panRef.current = newPan;
        setScale(newScale);
        setPan({ ...newPan });
      }

      lastPinchDistRef.current = dist;
      lastPinchMidRef.current = mid;
      singleTouchStartRef.current = null;
    } else if (e.touches.length === 1 && scaleRef.current > 1.05) {
      // Panning while zoomed
      if (singleTouchStartRef.current) {
        const dx = e.touches[0].clientX - singleTouchStartRef.current.x;
        const dy = e.touches[0].clientY - singleTouchStartRef.current.y;
        panRef.current = { x: panRef.current.x + dx, y: panRef.current.y + dy };
        setPan({ ...panRef.current });
        singleTouchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    lastPinchDistRef.current = null;
    lastPinchMidRef.current = null;

    // Snap back to 1x if almost un-pinched
    if (scaleRef.current < 1.1) {
      resetZoom();
      return;
    }

    // Allow a fast/big horizontal swipe to navigate even while zoomed
    if (e.changedTouches.length === 1 && singleTouchStartRef.current) {
      const dx = e.changedTouches[0].clientX - singleTouchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - singleTouchStartRef.current.y;
      const isHorizontalSwipe = Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 80;

      if (isHorizontalSwipe) {
        resetZoom();
        paginate(dx < 0 ? 1 : -1);
        return;
      }
    }
  };

  const toggleZoomDesktop = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isZoomed) {
      resetZoom();
    } else {
      scaleRef.current = 2;
      setScale(2);
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

      {/* Zoom button — desktop only */}
      {current.type === 'image' && (
        <button
          onClick={() => (isZoomed ? resetZoom() : (scaleRef.current = 2, setScale(2)))}
          className="hidden md:flex absolute bottom-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-sm transition-all duration-200 hover:scale-110"
          aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
        >
          {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
        </button>
      )}

      {/* Prev button — desktop only */}
      <button
        onClick={(e) => { e.stopPropagation(); paginate(-1); }}
        className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-sm transition-all duration-200 hover:scale-110"
        aria-label="Previous photo"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button — desktop only */}
      <button
        onClick={(e) => { e.stopPropagation(); paginate(1); }}
        className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-sm transition-all duration-200 hover:scale-110"
        aria-label="Next photo"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main media area */}
      <div
        className="relative flex items-center justify-center w-full h-full px-4 md:px-24 pt-16 pb-24 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            // Desktop drag-to-navigate (disabled when zoomed)
            drag={isZoomed ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) paginate(1);
              else if (swipe > swipeConfidenceThreshold) paginate(-1);
            }}
            className="absolute flex items-center justify-center w-full h-full"
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
                ref={imageRef}
                className="relative rounded-lg overflow-hidden shadow-2xl select-none"
                style={{
                  transform: `scale(${scale}) translate(${pan.x / scale}px, ${pan.y / scale}px)`,
                  transformOrigin: 'center center',
                  transition: scale === 1 ? 'transform 0.25s ease' : 'none',
                  cursor: isZoomed ? 'move' : 'zoom-in',
                  touchAction: 'none',
                }}
                onClick={toggleZoomDesktop}
              >
                <Image
                  src={current.src}
                  alt={current.title || `Photo ${imageIndex + 1}`}
                  width={current.width}
                  height={current.height}
                  className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain pointer-events-none"
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
