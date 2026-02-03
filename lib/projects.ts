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
  coverType: 'image' | 'video';
  galleryAspectRatio?: 'horizontal' | 'vertical' | 'square';
  youtubeUrl?: string;
  nextProject?: string;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.webm'];

export const getProjects = cache(async (): Promise<ProjectMeta[]> => {
  const projectsDirectory = path.join(process.cwd(), 'public', 'projects');
  
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
      
      let meta: Partial<ProjectMeta> = {
        slug,
        title: slug.replace(/-/g, ' '),
        category: 'Uncategorized',
        year: new Date().getFullYear().toString(),
        galleryAspectRatio: 'horizontal',
      };

      if (fs.existsSync(metaPath)) {
        const fileContent = fs.readFileSync(metaPath, 'utf8');
        meta = { ...meta, ...JSON.parse(fileContent) };
      }

      const projectPath = path.join(projectsDirectory, slug);
      let coverImage = '/images/placeholder.jpg';
      let coverType: 'image' | 'video' = 'image';

      const videoExtensions = ['.mp4', '.mov', '.webm'];
      const imageExtensions = ['.gif', '.webp', '.jpg', '.jpeg', '.png'];
      
      for (const ext of videoExtensions) {
        const coverPath = path.join(projectPath, `cover${ext}`);
        if (fs.existsSync(coverPath)) {
          coverImage = `${basePath}/projects/${slug}/cover${ext}`;
          coverType = 'video';
          break;
        }
      }
      
      if (coverType === 'image') {
        for (const ext of imageExtensions) {
          const coverPath = path.join(projectPath, `cover${ext}`);
          if (fs.existsSync(coverPath)) {
            coverImage = `${basePath}/projects/${slug}/cover${ext}`;
            break;
          }
        }
      }

      return {
        ...meta,
        slug,
        coverImage,
        coverType,
      } as ProjectMeta;
    })
  );

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
      return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.mov', '.webm'].includes(ext);
    })
    .sort();

  return files.map(file => `${basePath}/projects/${slug}/images/${file}`);
});