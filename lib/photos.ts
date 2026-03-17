// lib/photos.ts
import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import sizeOf from 'image-size';

export interface PhotoMeta {
  id: string;
  src: string;
  title?: string;
  location?: string;
  date?: string;
  type: 'image' | 'video';
  width: number;
  height: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  year: string;
  description?: string;
  coverImage: string;
  category: string;
  photos: PhotoMeta[];
}

export interface PhotoCategory {
  name: string;
  slug: string;
  count: number;
}

// More robust basePath detection for GitHub Pages
const getBasePath = () => {
  // If the env var is defined (even if empty), use it.
  // This makes it possible to force root-relative paths via an empty string.
  const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
  if (envBasePath !== undefined) {
    // Special case: allow "ROOT" to mean root path in build-time env configs.
    return envBasePath === 'ROOT' ? '' : envBasePath;
  }

  // For GitHub Pages, detect from package.json name or repository name
  // This helps when env var isn't set during static export
  if (process.env.GITHUB_PAGES || process.env.CI) {
    // Try to read from package.json or use a default
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
      // GitHub Pages usually uses the repo name as the base path
      return `/${packageJson.name}`;
    } catch {
      return '';
    }
  }

  return '';
};

const basePath = getBasePath();

// Projects are organized as subdirectories in /public/photos/

export const getProjectCategories = cache(async (): Promise<PhotoCategory[]> => {
  const photosDirectory = path.join(process.cwd(), 'public', 'photos');
  
  if (!fs.existsSync(photosDirectory)) {
    return [{ name: 'All', slug: 'all', count: 0 }];
  }

  const entries = fs.readdirSync(photosDirectory, { withFileTypes: true });
  const projectDirs = entries.filter(e => e.isDirectory());
  
  const categories = new Map<string, number>();
  let totalProjects = 0;

  for (const dir of projectDirs) {
    const projectPath = path.join(photosDirectory, dir.name);
    const hasImages = fs.readdirSync(projectPath).some(f => 
      ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.mov', '.webm']
        .includes(path.extname(f).toLowerCase())
    );
    
    if (hasImages) {
      totalProjects++;
      const metaPath = path.join(projectPath, 'project.json');
      if (fs.existsSync(metaPath)) {
        const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        if (meta.category) {
          const slug = meta.category.toLowerCase();
          categories.set(slug, (categories.get(slug) || 0) + 1);
        }
      }
    }
  }

  const catsArray = Array.from(categories.entries())
    .map(([slug, count]) => ({ 
      name: slug.charAt(0).toUpperCase() + slug.slice(1), 
      slug, 
      count 
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return [{ name: 'All', slug: 'all', count: totalProjects }, ...catsArray];
});

export const getProjects = cache(async (category?: string): Promise<Project[]> => {
  const photosDirectory = path.join(process.cwd(), 'public', 'photos');
  
  if (!fs.existsSync(photosDirectory)) {
    return [];
  }

  const entries = fs.readdirSync(photosDirectory, { withFileTypes: true });
  const projectDirs = entries.filter(e => e.isDirectory());
  
  const allowedExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.mov', '.webm'];
  const projects: Project[] = [];

  for (const dir of projectDirs) {
    const projectPath = path.join(photosDirectory, dir.name);
    const files = fs.readdirSync(projectPath)
      .filter(f => allowedExts.includes(path.extname(f).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    if (files.length === 0) continue;

    const metaPath = path.join(projectPath, 'project.json');
    let meta: Partial<Project> = {};
    if (fs.existsSync(metaPath)) {
      meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    }

    if (category && category !== 'all') {
      const projectCat = (meta.category || dir.name).toLowerCase();
      if (projectCat !== category) continue;
    }

    const coverFile = files[0];
    // Ensure no double slashes in path construction
    const cleanBasePath = basePath.replace(/\/$/, '');
    const coverSrc = `${cleanBasePath}/photos/${dir.name}/${coverFile}`;

    projects.push({
      id: dir.name,
      slug: dir.name.toLowerCase().replace(/\s+/g, '-'),
      title: meta.title || dir.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      year: meta.year || new Date().getFullYear().toString(),
      description: meta.description,
      coverImage: coverSrc,
      category: meta.category || 'uncategorized',
      photos: [],
    });
  }

  return projects.sort((a, b) => {
    const yearDiff = parseInt(b.year) - parseInt(a.year);
    return yearDiff !== 0 ? yearDiff : a.title.localeCompare(b.title);
  });
});

export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  const photosDirectory = path.join(process.cwd(), 'public', 'photos');
  
  if (!fs.existsSync(photosDirectory)) return null;

  const entries = fs.readdirSync(photosDirectory, { withFileTypes: true });
  const projectDir = entries.find(e => 
    e.isDirectory() && e.name.toLowerCase().replace(/\s+/g, '-') === slug
  );

  if (!projectDir) return null;

  const projectPath = path.join(photosDirectory, projectDir.name);
  const allowedExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.mov', '.webm'];
  
  const files = fs.readdirSync(projectPath)
    .filter(f => allowedExts.includes(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const metaPath = path.join(projectPath, 'project.json');
  let meta: Partial<Project> = {};
  if (fs.existsSync(metaPath)) {
    meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  }

  const cleanBasePath = basePath.replace(/\/$/, '');

  const photos: PhotoMeta[] = await Promise.all(
    files.map(async (file) => {
      const id = path.basename(file, path.extname(file));
      const ext = path.extname(file).toLowerCase();
      const isVideo = ['.mp4', '.mov', '.webm'].includes(ext);
      const filePath = path.join(projectPath, file);
      
      let width = 800;
      let height = 600;

      if (!isVideo) {
        try {
          const buffer = fs.readFileSync(filePath);
          const dims = sizeOf(buffer as Buffer);
          width = dims.width || width;
          height = dims.height || height;
        } catch (e) {
          console.warn(`Could not read dimensions for ${filePath}`);
        }
      } else {
        width = 1920;
        height = 1080;
      }

      const photoMetaPath = path.join(projectPath, `${id}.json`);
      let photoMeta: Partial<PhotoMeta> = { title: id.replace(/[-_]/g, ' ') };
      if (fs.existsSync(photoMetaPath)) {
        photoMeta = { ...photoMeta, ...JSON.parse(fs.readFileSync(photoMetaPath, 'utf8')) };
      }

      return {
        id,
        src: `${cleanBasePath}/photos/${projectDir.name}/${file}`,
        type: isVideo ? 'video' : 'image',
        width,
        height,
        ...photoMeta,
      };
    })
  );

  const coverFile = files[0];
  const coverSrc = `${cleanBasePath}/photos/${projectDir.name}/${coverFile}`;

  return {
    id: projectDir.name,
    slug,
    title: meta.title || projectDir.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    year: meta.year || new Date().getFullYear().toString(),
    description: meta.description,
    coverImage: coverSrc,
    category: meta.category || 'uncategorized',
    photos,
  };
});

export const getAllProjectSlugs = cache(async (): Promise<string[]> => {
  const photosDirectory = path.join(process.cwd(), 'public', 'photos');
  
  if (!fs.existsSync(photosDirectory)) return [];

  const entries = fs.readdirSync(photosDirectory, { withFileTypes: true });
  return entries
    .filter(e => e.isDirectory())
    .map(e => e.name.toLowerCase().replace(/\s+/g, '-'));
});