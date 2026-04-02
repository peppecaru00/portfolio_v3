// app/photos/[slug]/page.tsx
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/photos";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: 'Not Found' };
  }

  return {
    title: `${project.title} | Photography`,
    description: project.description || `Photos from ${project.title}`,
  };
}

function PhotoCard({ photo, index }: { photo: any; index: number; key?: string | number }) {
  return (
    <div className="relative group overflow-hidden rounded-lg bg-neutral-900">
      {photo.type === 'video' ? (
        <video
          src={photo.src}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto"
        />
      ) : (
        <Image
          src={photo.src}
          alt={photo.title || `Photo ${index + 1}`}
          width={photo.width || 800}
          height={photo.height || 600}
          className="w-full h-auto object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 3}
        />
      )}
    </div>
  );
}

export default async function ProjectPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto">
      {/* Back link */}
      <div className="mb-8">
        <Link
          href="/photos"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
        >
          <span>←</span> Back to Projects
        </Link>
      </div>

      {/* Hero */}
      <div className="mb-12 md:mb-16">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">{project.title}</h1>
        <p className="text-neutral-400 text-lg mb-2">{project.year}</p>
        {project.description && (
          <p className="text-neutral-300 max-w-2xl mt-6 text-lg leading-relaxed">
            {project.description}
          </p>
        )}
      </div>

      {/* Photo Grid - Masonry style with left-to-right order */}
      <div className="w-full">
        {/* Mobile: 1 Column */}
        <div className="md:hidden flex flex-col gap-3">
          {project.photos.map((photo: any, index: number) => (
            <PhotoCard key={photo.id} photo={photo} index={index} />
          ))}
        </div>

        {/* Tablet: 2 Columns */}
        <div className="hidden md:flex lg:hidden flex-row gap-3">
          {Array.from({ length: 2 }).map((_, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3 flex-1">
              {project.photos
                .map((photo: any, index: number) => ({ photo, index }))
                .filter((_: any, i: number) => i % 2 === colIndex)
                .map(({ photo, index }: { photo: any, index: number }) => (
                  <PhotoCard key={photo.id} photo={photo} index={index} />
                ))}
            </div>
          ))}
        </div>

        {/* Desktop: 3 Columns */}
        <div className="hidden lg:flex flex-row gap-3">
          {Array.from({ length: 3 }).map((_, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3 flex-1">
              {project.photos
                .map((photo: any, index: number) => ({ photo, index }))
                .filter((_: any, i: number) => i % 3 === colIndex)
                .map(({ photo, index }: { photo: any, index: number }) => (
                  <PhotoCard key={photo.id} photo={photo} index={index} />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}