"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Image from "next/image";

interface ImageLightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  projectTitle?: string;
}

export default function ImageLightbox({ 
  images, 
  initialIndex = 0, 
  isOpen, 
  onClose,
  projectTitle = "Project"
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setScale(1);
      setPosition({ x: 0, y: 0 });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") navigatePrev();
      if (e.key === "ArrowRight") navigateNext();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, scale]);

  const navigateNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resetZoom();
  }, [images.length]);

  const navigatePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    resetZoom();
  }, [images.length]);

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.5, 4));
  const zoomOut = () => {
    setScale((prev) => {
      const newScale = Math.max(prev - 0.5, 1);
      if (newScale === 1) setPosition({ x: 0, y: 0 });
      return newScale;
    });
  };

  // Pan functionality when zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) zoomIn();
    else zoomOut();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col"
          onClick={onClose}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 text-white z-50">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium tracking-widest uppercase text-neutral-400">
                {projectTitle}
              </span>
              <span className="text-neutral-600">/</span>
              <span className="text-sm font-medium tabular-nums">
                {currentIndex + 1} <span className="text-neutral-500">/</span> {images.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <button
                onClick={(e) => { e.stopPropagation(); zoomOut(); }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-30"
                disabled={scale <= 1}
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-xs font-medium w-12 text-center tabular-nums">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); zoomIn(); }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-30"
                disabled={scale >= 4}
              >
                <ZoomIn className="w-5 h-5" />
              </button>

              <div className="w-px h-6 bg-white/20 mx-2" />

              <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Main Image Area */}
          <div 
            className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  scale: scale,
                  x: position.x,
                  y: position.y
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
              >
                <Image
                  src={images[currentIndex]}
                  alt={`${projectTitle} image ${currentIndex + 1}`}
                  fill
                  className="object-contain select-none pointer-events-none"
                  sizes="100vw"
                  priority
                  quality={95}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); navigatePrev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full text-white transition-all hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full text-white transition-all hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Zoom Hint */}
            {scale === 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-neutral-400 text-sm"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Scroll or use +/- to zoom</span>
              </motion.div>
            )}
          </div>

          {/* Thumbnails Strip */}
          {images.length > 1 && (
            <div className="px-6 py-4 bg-black/50 border-t border-white/10">
              <div className="flex gap-2 overflow-x-auto max-w-full pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); resetZoom(); }}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
                      idx === currentIndex 
                        ? "ring-2 ring-white scale-105" 
                        : "opacity-50 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}