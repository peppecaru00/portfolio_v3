import fs from 'fs';
import path from 'path';
import { cache } from 'react';

export interface ProjectMeta {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  services: string[];
  toolsUsed: string[];
  shotOn?: string[];
  coverImage: string;
  nextProject?: string;
}

// Cache the project scan for performance
export const getProjects = cache(async (): Promise<ProjectMeta[]> => {
  const projectsDirectory = path.join(process.cwd(), 'public', 'projects');
  
  // Check if directory exists
  if (!fs.existsSync(projectsDirectory)) {
    console.warn('Projects directory not found:', projectsDirectory);
    return [];
  }

  const projectFolders = fs.readdirSync(projectsDirectory)
    .filter(folder => {
      const folderPath = path.join(projectsDirectory, folder);
      return fs.statSync(folderPath).isDirectory();
    });

  const projects = await Promise.all(
    projectFolders.map(async (slug) => {
      const metaPath = path.join(projectsDirectory, slug, 'meta.json');
      
      // Default metadata if meta.json doesn't exist
      let meta: Partial<ProjectMeta> = {
        slug,
        title: slug.replace(/-/g, ' '),
        category: 'Uncategorized',
        year: new Date().getFullYear().toString(),
      };

      // Read meta.json if it exists
      if (fs.existsSync(metaPath)) {
        const fileContent = fs.readFileSync(metaPath, 'utf8');
        meta = { ...meta, ...JSON.parse(fileContent) };
      }

      // Check for cover image
      const coverPath = path.join(projectsDirectory, slug, 'cover.webp');
      const coverImage = fs.existsSync(coverPath) 
        ? `/projects/${slug}/cover.webp`
        : '/images/placeholder.jpg';

      return {
        ...meta,
        slug,
        coverImage,
      } as ProjectMeta;
    })
  );

  // Sort by year (newest first)
  return projects.sort((a, b) => parseInt(b.year) - parseInt(a.year));
});

export const getProjectBySlug = cache(async (slug: string): Promise<ProjectMeta | null> => {
  const projects = await getProjects();
  return projects.find(p => p.slug === slug) || null;
});

export const getProjectImages = cache(async (slug: string): Promise<string[]> => {
  const imagesDirectory = path.join(process.cwd(), 'public', 'projects', slug, 'images');
  
  if (!fs.existsSync(imagesDirectory)) {
    return [];
  }

  const files = fs.readdirSync(imagesDirectory)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp', '.gif', 'webp'].includes(ext);
    })
    .sort(); // Sort alphabetically/ numerically

  return files.map(file => `/projects/${slug}/images/${file}`);
});