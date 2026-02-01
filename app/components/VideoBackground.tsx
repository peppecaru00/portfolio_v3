"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface VideoBackgroundProps {
  videoSrc: string;
  overlay?: boolean;
  poster?: string;
}

export default function VideoBackground({ 
  videoSrc, 
  overlay = true,
  poster 
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          onLoadedData={() => setIsLoaded(true)}
          className="object-cover w-full h-full"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </motion.div>
      
      {overlay && (
        <div className="absolute inset-0 video-overlay" />
      )}
    </div>
  );
}