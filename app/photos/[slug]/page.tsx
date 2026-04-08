// app/photos/[slug]/page.tsx
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/photos";
import { notFound } from "next/navigation";
import Link from "next/link";
import AlbumGallery from "./AlbumGallery";

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

      {/* Interactive gallery with lightbox */}
      <AlbumGallery photos={project.photos} />
    </div>
  );
}