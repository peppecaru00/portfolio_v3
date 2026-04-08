'use client';

import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { PhotoMeta } from '@/lib/photos';

const Lightbox = dynamic(() => import('@/app/components/Lightbox'), { ssr: false });

interface AlbumGalleryProps {
  photos: PhotoMeta[];
}

function PhotoCard({
  photo,
  index,
  onClick,
}: {
  photo: PhotoMeta;
  index: number;
  onClick: () => void;
}) {
  return (
    <div
      className="relative group overflow-hidden rounded-lg bg-neutral-900 cursor-pointer"
      onClick={onClick}
    >
      {/* Inner Border */}
      <div className="absolute inset-0 border-2 border-white/10 rounded-lg pointer-events-none z-30" />
      {photo.type === 'video' ? (
        <div className="relative">
          <video
            src={photo.src}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto"
          />
          {/* Play indicator overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden">
          <Image
            src={photo.src}
            alt={photo.title || `Photo ${index + 1}`}
            width={photo.width || 800}
            height={photo.height || 600}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 3}
            loading={index < 3 ? 'eager' : 'lazy'}
          />
          {/* Hover zoom hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20">
            <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AlbumGallery({ photos }: AlbumGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* Photo Grid - Masonry style with left-to-right order */}
      <div className="w-full">
        {/* Mobile: 1 Column */}
        <div className="md:hidden flex flex-col gap-3">
          {photos.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={index}
              onClick={() => setLightboxIndex(index)}
            />
          ))}
        </div>

        {/* Tablet: 2 Columns */}
        <div className="hidden md:flex lg:hidden flex-row gap-3">
          {Array.from({ length: 2 }).map((_, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3 flex-1">
              {photos
                .map((photo, index) => ({ photo, index }))
                .filter((_, i) => i % 2 === colIndex)
                .map(({ photo, index }) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    index={index}
                    onClick={() => setLightboxIndex(index)}
                  />
                ))}
            </div>
          ))}
        </div>

        {/* Desktop: 3 Columns */}
        <div className="hidden lg:flex flex-row gap-3">
          {Array.from({ length: 3 }).map((_, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3 flex-1">
              {photos
                .map((photo, index) => ({ photo, index }))
                .filter((_, i) => i % 3 === colIndex)
                .map(({ photo, index }) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    index={index}
                    onClick={() => setLightboxIndex(index)}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
