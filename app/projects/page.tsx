import { getProjects } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await getProjects();
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
            href={`${basePath}/projects/${project.slug}`}
            className="group block"
          >
            {/* Ring container - outside overflow-hidden */}
            <div className="relative rounded-xl transition-all duration-200 group-hover:ring-2 group-hover:ring-white group-hover:ring-offset-black">
              {/* Image mask container - handles overflow and aspect ratio */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 mb-4">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                />
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