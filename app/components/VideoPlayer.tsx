"use client";

import { useRef} from "react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div 
      className="relative w-full h-full group"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
} 