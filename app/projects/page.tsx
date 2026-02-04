import { getProjects } from "@/lib/projects";
import { getPhotos } from "@/lib/photos";
import Image from "next/image";
import Link from "next/link";

// Remove the searchParams prop completely
export default async function ProjectsPage() {
  // Fetch BOTH datasets at build time
  const projects = await getProjects();
  const photos = await getPhotos();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto">
      <div className="mb-16 md:mb-24">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">
          Selected Work
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl">
          A curated collection of {projects.length} projects
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group block"
          >
            <div className="relative rounded-xl transition-all duration-200 group-hover:ring-2 group-hover:ring-white group-hover:ring-offset-black">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 mb-4">
                {project.coverType === 'video' ? (
                  <video
                    src={project.coverImage}
                    autoPlay
                    muted
                    loop
                    playsInline
                    disableRemotePlayback
                    disablePictureInPicture
                    preload="auto"
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                  />
                )}
              </div>
            </div>

            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold mb-1 group-hover:opacity-60 transition-opacity">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-500">{project.category}</p>
              </div>
              <span className="text-sm text-neutral-400">{project.year}</span>
            </div>  
          </Link>
        ))}
      </div>
    </div>
  );
}