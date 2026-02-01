import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects }: { projects?: Array<{ title: string; slug: string }> }) {
  return (
    <div className="project-grid">
      {projects?.map((p) => (
        <ProjectCard key={p.slug} title={p.title} slug={p.slug} />
      ))}
    </div>
  );
}
