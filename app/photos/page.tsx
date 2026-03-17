// app/photos/page.tsx
import { getProjects, getProjectCategories } from "@/lib/photos";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: 'Photography | Portfolio',
  description: 'A collection of photography projects',
};

export default async function PhotosPage({ 
  searchParams 
}: { 
  searchParams?: { category?: string } 
}) {
  const selectedCategory = (searchParams?.category || 'all').toLowerCase();
  
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
        <p className="text-neutral-400 text-lg">Selected works</p>

        <div className="mt-8 flex flex-wrap gap-3">
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {projects.map((project) => (
          <Link 
            key={project.id} 
            href={`/photos/${project.slug}`}
            className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-neutral-900 block cursor-pointer"
          >
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none">
              <h3 className="text-2xl font-bold tracking-wide mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                {project.title}
              </h3>
              <p className="text-neutral-400 text-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                {project.year}
              </p>
            </div>

            {/* Hover indicator */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs uppercase tracking-widest text-white/80">View Project</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}