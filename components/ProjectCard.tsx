export default function ProjectCard({ title, slug, index, category, year, image }: { title?: string; slug?: string; index?: number; category?: string; year?: string; image?: string }) {
  return (
    <a href={`/projects/${slug}`} className="project-card block">
      {image && <img src={image} alt={title} className="project-image w-full h-auto" />}
      <div className="project-meta">
        <h3>{title ?? "Project"}</h3>
        <p className="meta">{category} {year ? `• ${year}` : null}</p>
      </div>
    </a>
  );
}
