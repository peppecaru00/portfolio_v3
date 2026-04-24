import { getProjects } from "@/lib/projects";
import { getAllProjectSlugs } from "@/lib/photos";
import { siteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

export async function GET() {
  const projects = await getProjects();
  const photoSlugs = await getAllProjectSlugs();

  const entries = [
    `${siteUrl}/`,
    `${siteUrl}/about`,
    `${siteUrl}/contact`,
    `${siteUrl}/projects`,
    `${siteUrl}/photos`,
    ...projects.map((project) => `${siteUrl}/projects/${project.slug}`),
    ...photoSlugs.map((slug) => `${siteUrl}/photos/${slug}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries.map((url) => `  <url><loc>${url}</loc></url>`).join("\n") +
    `\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
