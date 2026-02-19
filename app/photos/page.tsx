import { getPhotos, getPhotoCategories } from "@/lib/photos";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: 'Photography | Portfolio',
  description: 'A collection of nice pics',
};

export default async function PhotosPage({ searchParams }: { searchParams?: { category?: string } }) {
  const selectedCategory = (searchParams?.category || 'all').toLowerCase();

  const [photos, categories] = await Promise.all([
    getPhotos(selectedCategory),
    getPhotoCategories(),
  ]);

  // Ordering: first up to 6 verticals, then up to 3 full-width horizontals, then the rest
  const orderedPhotos = (() => {
    const selected = new Set<string>();
    const ordered = [] as typeof photos;

    let v = 0;
    for (const p of photos) {
      if (v >= 6) break;
      if ((p.height || 0) > (p.width || 0)) {
        ordered.push(p);
        selected.add(p.id);
        v++;
      }
    }

    let h = 0;
    for (const p of photos) {
      if (h >= 3) break;
      if (!selected.has(p.id) && (p.width || 0) >= (p.height || 0)) {
        ordered.push(p);
        selected.add(p.id);
        h++;
      }
    }

    for (const p of photos) {
      if (!selected.has(p.id)) ordered.push(p);
    }

    return ordered;
  })();

  // Compute responsive span classes and ensure incomplete vertical rows expand
  const renderItems: { photo: typeof photos[number]; spanClass: string }[] = [];
  for (let i = 0; i < orderedPhotos.length;) {
    const current = orderedPhotos[i];
    const isVert = (current.height || 0) > (current.width || 0);

    if (isVert) {
      let j = i;
      while (j < orderedPhotos.length && (orderedPhotos[j].height || 0) > (orderedPhotos[j].width || 0)) j++;
      const run = orderedPhotos.slice(i, j);

      for (let k = 0; k < run.length; k += 3) {
        const group = run.slice(k, k + 3);
        if (group.length === 3) {
          group.forEach(item => renderItems.push({ photo: item, spanClass: 'col-span-1' }));
        } else if (group.length === 2) {
          renderItems.push({ photo: group[0], spanClass: 'col-span-1' });
          renderItems.push({ photo: group[1], spanClass: 'col-span-1 md:col-span-1 lg:col-span-2' });
        } else {
          renderItems.push({ photo: group[0], spanClass: 'col-span-1 md:col-span-2 lg:col-span-3' });
        }
      }

      i = j;
    } else {
      renderItems.push({ photo: current, spanClass: 'col-span-1 md:col-span-2 lg:col-span-3' });
      i++;
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto">
      <div className="mb-8 md:mb-12">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-2">Photogallery</h1>

        <div className="mt-3 flex flex-wrap gap-3">
          {categories.map(cat => {
            const active = cat.slug === selectedCategory || (selectedCategory === 'all' && cat.slug === 'all');
            const href = cat.slug === 'all' ? '/photos' : `/photos?category=${encodeURIComponent(cat.slug)}`;
            return (
              <Link
                key={cat.slug}
                href={href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${active ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200'}`}
              >
                {cat.name} <span className="ml-2 text-neutral-400">({cat.count})</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="grid items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {renderItems.map(({ photo, spanClass }, index) => {
          const isLandscape = (photo.width || 0) >= (photo.height || 0);
          return (
            <div key={photo.id} className={`${spanClass} relative group overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900`}>
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
                    priority={index < 3}
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