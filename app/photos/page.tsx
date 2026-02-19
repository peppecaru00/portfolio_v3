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

      {/* Grid layout — landscape spans full width, portrait placed in columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo, index) => {
          const isLandscape = (photo.width || 0) >= (photo.height || 0);
          const spanClass = isLandscape ? 'col-span-1 md:col-span-2 lg:col-span-3' : 'col-span-1';

          return (
            <div
              key={photo.id}
              className={`${spanClass} relative group overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900`}
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
                  className="w-full h-auto object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image
                    src={photo.src}
                    alt={photo.title || `Photo ${index + 1}`}
                    width={photo.width || 800}
                    height={photo.height || 600}
                    className="w-full h-auto object-contain"
                    sizes={isLandscape ? '100vw' : '(min-width: 768px) 50vw, 100vw'}
                  />
                </div>
              )}

              
            </div>
          );
        })}
      </div>
    </div>
  );
}