"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
}

interface ProjectGalleryProps {
  items: GalleryItem[];
  projectTitle: string;
}

export default function ProjectGallery({ items, projectTitle }: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  if (items.length === 0) return null;

  return (
    <>
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 md:auto-rows-[250px] gap-2 md:gap-3">
          {items.map((item, index) => {
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
                key={`${item.type}-${index}`}
                onClick={() => openLightbox(index)}
                className={`group relative overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 ${aspectClass} ${gridClass} cursor-pointer`}
              >
                {item.type === 'video' ? (
                  <>
                    {/* Video Thumbnail */}
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={`${projectTitle} video ${index + 1}`}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                        <Play className="w-12 h-12 text-neutral-600" />
                      </div>
                    )}
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 text-black fill-current ml-1" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Image
                      src={item.src}
                      alt={`${projectTitle} ${index + 1}`}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      sizes={index % 5 === 0 ? "60vw" : "40vw"}
                    />
                    
                    {/* View Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white/90 backdrop-blur text-black px-4 py-2 rounded-full text-sm font-medium">
                        View
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}