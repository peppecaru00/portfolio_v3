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

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export interface PhotoCategory {
  name: string;
  slug: string;
  count: number;
}

// Helper: extract alphabetic prefix from filenames like "NATURE1.jpg" or "nature_01.jpg".
const extractPrefix = (filename: string): string | null => {
  const base = filename.replace(/\.[^/.]+$/, '');
  const m = base.match(/^([A-Za-z]+)(?:[_-]?\d.*|[_-].*|$)/);
  return m ? m[1] : null;
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

export const getPhotoCategories = cache(async (): Promise<PhotoCategory[]> => {
  const photosDirectory = path.join(process.cwd(), 'public', 'photos');

  if (!fs.existsSync(photosDirectory)) {
    return [{ name: 'All', slug: 'all', count: 0 }];
  }

  const entries = fs.readdirSync(photosDirectory, { withFileTypes: true });
  const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.mov', '.webm'];

  let total = 0;
  const counts = new Map<string, number>();

  // count files in root and infer prefix-based categories
  for (const e of entries) {
    if (!e.isFile()) continue;
    const ext = path.extname(e.name).toLowerCase();
    if (!allowed.includes(ext)) continue;
    total++;

    const prefix = extractPrefix(e.name);
    if (prefix) {
      const slug = prefix.toLowerCase();
      counts.set(slug, (counts.get(slug) || 0) + 1);
    }
  }

  // count files in subdirectories (directory = explicit category)
  for (const d of entries.filter(e => e.isDirectory())) {
    const dirPath = path.join(photosDirectory, d.name);
    const files = fs.readdirSync(dirPath).filter(f => allowed.includes(path.extname(f).toLowerCase()));
    total += files.length;
    const slug = d.name.toLowerCase();
    counts.set(slug, (counts.get(slug) || 0) + files.length);
  }

  const categories: PhotoCategory[] = Array.from(counts.entries())
    .map(([slug, count]) => ({ name: capitalize(slug), slug, count }))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

  return [{ name: 'All', slug: 'all', count: total }, ...categories];
});

export const getPhotos = cache(async (category?: string): Promise<PhotoMeta[]> => {
  const photosDirectory = path.join(process.cwd(), 'public', 'photos');

  if (!fs.existsSync(photosDirectory)) {
    console.warn('Photos directory not found:', photosDirectory);
    return [];
  }

  const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.mov', '.webm'];

  const collect = (dirPath: string, prefix = ''): { file: string; filePath: string; src: string }[] => {
    return fs.readdirSync(dirPath)
      .filter(f => allowed.includes(path.extname(f).toLowerCase()))
      .map(file => ({ file, filePath: path.join(dirPath, file), src: `${basePath}/photos/${prefix}${file}` }));
  };

  const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matchesPrefix = (file: string, prefix: string) => {
    const base = file.replace(/\.[^/.]+$/, '').toLowerCase();
    const p = prefix.toLowerCase();
    return new RegExp(`^${escapeRegExp(p)}(?:\\d|[_-]|$)`).test(base);
  };

  let candidates: { file: string; filePath: string; src: string }[] = [];

  if (!category || category.toLowerCase() === 'all') {
    // collect root files and subfolders
    candidates.push(...collect(photosDirectory, ''));
    const entries = fs.readdirSync(photosDirectory, { withFileTypes: true });
    for (const d of entries.filter(e => e.isDirectory())) {
      candidates.push(...collect(path.join(photosDirectory, d.name), `${d.name}/`));
    }
  } else {
    const entries = fs.readdirSync(photosDirectory, { withFileTypes: true });

    // if there's a matching directory, return its files
    const matchDir = entries.find(e => e.isDirectory() && e.name.toLowerCase() === category.toLowerCase());
    if (matchDir) {
      candidates.push(...collect(path.join(photosDirectory, matchDir.name), `${matchDir.name}/`));
    } else {
      // treat category as filename prefix: match files in root and in subfolders
      candidates.push(...collect(photosDirectory, '').filter(c => matchesPrefix(c.file, category)));
      for (const d of entries.filter(e => e.isDirectory())) {
        candidates.push(...collect(path.join(photosDirectory, d.name), `${d.name}/`).filter(c => matchesPrefix(c.file, category)));
      }
    }
  }

  // sort by filename (numeric-aware)
  candidates.sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true, sensitivity: 'base' }));

  const photos = await Promise.all(
    candidates.map(async ({ file, filePath, src }) => {
      const id = file.replace(/\.[^/.]+$/, '');
      const ext = path.extname(file).toLowerCase();
      const isVideo = ['.mp4', '.mov', '.webm'].includes(ext);

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

      const metaPath = path.join(path.dirname(filePath), `${id}.json`);
      let meta: Partial<PhotoMeta> = { title: id.replace(/-/g, ' ') };
      if (fs.existsSync(metaPath)) {
        const fileContent = fs.readFileSync(metaPath, 'utf8');
        meta = { ...meta, ...JSON.parse(fileContent) };
      }

      return {
        id,
        src,
        type: isVideo ? 'video' : 'image',
        width,
        height,
        ...meta,
      } as PhotoMeta;
    })
  );

  return photos;
});