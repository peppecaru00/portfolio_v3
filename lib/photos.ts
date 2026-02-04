import fs from 'fs';
import path from 'path';
import { cache } from 'react';

export interface PhotoMeta {
  id: string;
  src: string;
  title?: string;
  location?: string;
  date?: string;
  type: 'image' | 'video';
  width?: number;
  height?: number;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const getPhotos = cache(async (): Promise<PhotoMeta[]> => {
  const photosDirectory = path.join(process.cwd(), 'public', 'photos');
  
  if (!fs.existsSync(photosDirectory)) {
    console.warn('Photos directory not found:', photosDirectory);
    return [];
  }

  const files = fs.readdirSync(photosDirectory)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.mov', '.webm'].includes(ext);
    })
    .sort();

  const photos = await Promise.all(
    files.map(async (file, index) => {
      const id = file.replace(/\.[^/.]+$/, '');
      const ext = path.extname(file).toLowerCase();
      const src = `${basePath}/photos/${file}`;
      const isVideo = ['.mp4', '.mov', '.webm'].includes(ext);
      
      // Check for meta file (optional)
      const metaPath = path.join(photosDirectory, `${id}.json`);
      let meta: Partial<PhotoMeta> = {
        title: id.replace(/-/g, ' '),
      };

      if (fs.existsSync(metaPath)) {
        const fileContent = fs.readFileSync(metaPath, 'utf8');
        meta = { ...meta, ...JSON.parse(fileContent) };
      }

      return {
        id,
        src,
        type: isVideo ? 'video' : 'image',
        ...meta,
      } as PhotoMeta;
    })
  );

  return photos;
});