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
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  const photos = await Promise.all(
    files.map(async (file, index) => {
      const id = file.replace(/\.[^/.]+$/, '');
      const ext = path.extname(file).toLowerCase();
      const src = `${basePath}/photos/${file}`;
      const isVideo = ['.mp4', '.mov', '.webm'].includes(ext);
      const filePath = path.join(photosDirectory, file);
      
      // Get dimensions (preserve native aspect)
      let width = 800;
      let height = 600;

      if (!isVideo) {
        try {
          const buffer = fs.readFileSync(filePath);
          const dims = sizeOf(buffer as Buffer);
          width = dims.width || width;
          height = dims.height || height;
        } catch (e) {
          console.warn(`Could not read dimensions for ${file}`);
        }
      } else {
        width = 1920;
        height = 1080;
      }
    
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
        width,
        height,
        ...meta,
      } as PhotoMeta;
    })
  );

  return photos;
});