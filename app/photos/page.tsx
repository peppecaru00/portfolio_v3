// app/photos/page.tsx
import { getProjects, getProjectCategories } from "@/lib/photos";
import Image from "next/image";
import Link from "next/link";
import { Images } from "lucide-react";

export const metadata = {
  title: 'Photography | Portfolio',
  description: 'A collection of photography projects',
};

export default async function PhotosPage() {
  const selectedCategory = 'all';

  const [projects, categories] = await Promise.all([
    getProjects(selectedCategory),
    getProjectCategories(),
  ]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto">
      <div className="mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2">
          Photogallery
        </h1>
        <p className="text-neutral-400 text-lg">Explore my photography projects</p>

        <div className="mt-8 flex flex-wrap gap-3">
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/photos/${project.slug}`}
            className="group relative block cursor-pointer mb-6 md:mb-0"
          >
            {/* Main Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-neutral-900 w-full h-full z-10 transition-transform duration-500">
              {/* Inner Border */}
              <div className="absolute inset-0 border-2 border-white/10 rounded-lg pointer-events-none z-30" />
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Album Icon Indicator */}
              <div className="absolute top-4 right-4 bg-black/40 border border-white/10 backdrop-blur-sm rounded-full p-2 text-white/90 group-hover:bg-black/60 group-hover:scale-110 transition-all duration-300">
                <Images className="w-5 h-5" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none">
                <h3 className="text-2xl font-bold tracking-wide mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  {project.title}
                </h3>
                <div className="flex items-center gap-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  <p className="text-neutral-400 text-sm">
                    {project.year}
                  </p>
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                  <p className="text-neutral-400 text-sm font-medium">
                    View Album
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}