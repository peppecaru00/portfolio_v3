import { getPhotos } from "@/lib/photos";
import Image from "next/image";

export const metadata = {
  title: 'Photography | Portfolio',
  description: 'A collection of captured moments',
};

export default async function PhotosPage() {
  const photos = await getPhotos();

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto">
      <div className="mb-16 md:mb-24">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">
          Photography
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl">
          A collection of {photos.length} moments captured
        </p>
      </div>

      {/* Mobile: Single column stack | Desktop: Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-3 md:auto-rows-[200px]">
        {photos.map((photo, index) => {
          // Desktop bento patterns only
          const patterns = [
                  "md:col-span-6 md:row-span-2",
                  "md:col-span-6 md:row-span-1",
                  "md:col-span-6 md:row-span-1",
                  "md:col-span-4 md:row-span-2",
                  "md:col-span-4 md:row-span-2",
                  "md:col-span-4 md:row-span-2",
          ];
          const gridClass = patterns[index % patterns.length];

          return (
            <div
              key={photo.id}
              className={`group relative overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 aspect-[4/5] md:aspect-auto ${gridClass}`}
            >
              {photo.type === 'video' ? (
                <video
                  src={photo.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  disableRemotePlayback
                  disablePictureInPicture
                  preload="auto"
                  className="w-full h-full object-contain bg-black md:object-cover"
                />
              ) : (
                <Image
                  src={photo.src}
                  alt={photo.title || `Photo ${index + 1}`}
                  fill
                  className="object-cover bg-neutral-900 md:object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
              
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4 opacity-0">
                <div className="text-white">
                  {photo.location && (
                    <p className="text-xs opacity-80">{photo.location}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}