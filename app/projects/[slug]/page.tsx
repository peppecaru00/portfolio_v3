import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjects, getProjectBySlug, getProjectImages } from "@/lib/projects";

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = await getProjects();
  
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for each project
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  };
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

  // Get all images from the project's images folder
  const galleryImages = await getProjectImages(slug);

  // Find next project for navigation
  const allProjects = await getProjects();
  const currentIndex = allProjects.findIndex(p => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[85vh] bg-neutral-100 dark:bg-neutral-900">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* Project Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div className="max-w-[1800px] mx-auto">
            <p className="text-sm font-medium tracking-widest uppercase mb-4 opacity-80">
              {project.client || project.category}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <h3 className="text-sm font-medium tracking-widest uppercase text-neutral-500 mb-2">
                Year
              </h3>
              <p className="text-lg font-medium">{project.year}</p>
            </div>

            {project.services && project.services.length > 0 && (
              <div>
                <h3 className="text-sm font-medium tracking-widest uppercase text-neutral-500 mb-2">
                  Services
                </h3>
                <ul className="space-y-1">
                  {project.services.map((service) => (
                    <li key={service} className="text-lg font-medium">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.client && (
              <div>
                <h3 className="text-sm font-medium tracking-widest uppercase text-neutral-500 mb-2">
                  Client
                </h3>
                <p className="text-lg font-medium">{project.client}</p>
              </div>
            )}

            {project.toolsUsed && (
              <div>
                <h3 className="text-sm font-medium tracking-widest uppercase text-neutral-500 mb-2">
                  Tools used
                </h3>
                <p className="text-lg font-medium">{project.toolsUsed.join(', ')}</p>
              </div>
            )}

            {project.shotOn && (
              <div>
                <h3 className="text-sm font-medium tracking-widest uppercase text-neutral-500 mb-2">
                  Shot On
                </h3>
                <p className="text-lg font-medium">{project.shotOn.join(', ')}</p>
              </div>
            )}


          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-16">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
                Overview
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-neutral-700 dark:text-neutral-300">
                {project.description}
              </p>
            </section>

            {(project.challenge || project.solution) && (
              <section className="grid md:grid-cols-2 gap-8">
                {project.challenge && (
                  <div>
                    <h3 className="text-xl font-bold tracking-tight mb-4">Challenge</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                )}
                {project.solution && (
                  <div>
                    <h3 className="text-xl font-bold tracking-tight mb-4">Solution</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Project Gallery - Bento Grid */}
      {galleryImages.length > 0 && (
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 md:auto-rows-[250px] gap-2 md:gap-3">
            {galleryImages.map((image, index) => {
              // Repeating pattern every 5 items for visual rhythm
              const patterns = [
                "md:col-span-7 md:row-span-2", // Large left (2x2)
                "md:col-span-5 md:row-span-1", // Top right (1x1)
                "md:col-span-5 md:row-span-1", // Bottom right (1x1)
                "md:col-span-6 md:row-span-1", // Half width
                "md:col-span-6 md:row-span-1", // Half width
              ];
              const gridClass = patterns[index % patterns.length] || "md:col-span-6";

              // Mobile: Keep original aspect ratios | Desktop: Full height
              const aspectClass = index % 3 === 0 ? "aspect-[16/9] md:aspect-auto" : "aspect-[21/9] md:aspect-auto";

              return (
                <div
                  key={image}
                  className={`group relative overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 ${aspectClass} ${gridClass}`}
                >
                  <Image
                    src={image}
                    alt={`${project.title} detail ${index + 1}`}
                    fill
                    className="object-cover transition-all duration-700"
                    sizes={index % 5 === 0 ? "60vw" : "40vw"}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Next Project Navigation */}
      {nextProject && nextProject.slug !== slug && (
        <div className="border-t border-neutral-200 dark:border-neutral-800">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-16 md:py-24">
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div>
                <p className="text-sm font-medium tracking-widest uppercase text-neutral-500 mb-2">
                  Next Project
                </p>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter group-hover:opacity-60 transition-opacity duration-300">
                  {nextProject.title}
                </h2>
              </div>
              <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}