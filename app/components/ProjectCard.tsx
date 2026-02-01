"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  category: string;
  year: string;
  image: string;
  slug: string;
  index: number;
}

export default function ProjectCard({ 
  title, category, year, image, slug, index
}: ProjectCardProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link href={`/projects/${slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-900 mb-4">
        {/* Placeholder while loading */}
        <div className={`absolute inset-0 bg-neutral-200 dark:bg-neutral-800 transition-opacity duration-500 ${loaded ? 'opacity-0' : 'opacity-100'}`} />
        
        <Image
          key={`${slug}-${image}`} // Force re-render on route change
          src={image}
          alt={title}
          fill
          className={`object-cover transition-all duration-700 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setLoaded(true)}
          priority={index < 3}
        />
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold mb-1 group-hover:opacity-60 transition-opacity">
            {title}
          </h3>
          <p className="text-sm text-neutral-500">{category}</p>
        </div>
        <span className="text-sm text-neutral-400">{year}</span>
      </div>
    </Link>
  );
}