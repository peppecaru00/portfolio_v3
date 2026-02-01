"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import ImageLightbox from "./ImageLightbox";

interface ProjectGalleryProps {
  images: string[];
  projectTitle: string;
}

export default function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  if (images.length === 0) return null;

  return (
    <>
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 md:auto-rows-[250px] gap-2 md:gap-3">
          {images.map((image, index) => {
            const patterns = [
              "md:col-span-7 md:row-span-2",
              "md:col-span-5 md:row-span-1",
              "md:col-span-5 md:row-span-1",
              "md:col-span-6 md:row-span-1",
              "md:col-span-6 md:row-span-1",
            ];
            const gridClass = patterns[index % patterns.length] || "md:col-span-6";
            const aspectClass = index % 3 === 0 ? "aspect-[16/9] md:aspect-auto" : "aspect-[21/9] md:aspect-auto";

            return (
              <div
                key={image}
                onClick={() => openLightbox(index)}
                className={`group relative overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 ${aspectClass} ${gridClass} cursor-zoom-in`}
              >
                <Image
                  src={image}
                  alt={`${projectTitle} detail ${index + 1}`}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105 md:h-full"
                  sizes={index % 5 === 0 ? "60vw" : "40vw"}
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white/90 backdrop-blur text-black px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <Maximize2 className="w-4 h-4" />
                    View
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ImageLightbox
        images={images}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        initialIndex={selectedImageIndex}
        projectTitle={projectTitle}
      />
    </>
  );
}