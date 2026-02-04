import { getPhotos } from "@/lib/photos";
import Image from "next/image";

export const metadata = {
  title: 'Photography | Portfolio',
  description: 'A collection of nice pics',
};

export default async function PhotosPage() {
  const photos = await getPhotos();

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto">
      <div className="mb-16 md:mb-24">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">
          Photogallery
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl">
          {photos.length} nice pics.
        </p>
      </div>

      {/* Bento grid - Vertical orientation */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-3 md:auto-rows-auto">
        {photos.map((photo, index) => {
          // Vertical bento patterns - 3 columns, portrait focus
          const patterns = [
            "md:col-span-6 md:row-span-1", // Each takes full height
            "md:col-span-6 md:row-span-1",
            "md:col-span-4 md:row-span-1",
            "md:col-span-4 md:row-span-1",
            "md:col-span-4 md:row-span-1",
          ];
          const gridClass = patterns[index % patterns.length];

          return (
            <div
              key={photo.id}
              className={`group relative overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 aspect-[3/2] ${gridClass}`}
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
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={photo.src}
                  alt={photo.title || `Photo ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              )}

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
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