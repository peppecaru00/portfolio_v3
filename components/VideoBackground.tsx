"use client";

export default function VideoBackground({ videoSrc = "/videos/hero-bg.mp4", overlay = false }: { videoSrc?: string; overlay?: boolean }) {
  return (
    <div className="video-background relative">
      <video
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-auto object-cover"
      />
      {overlay && <div className="video-overlay absolute inset-0 bg-black/40 pointer-events-none" />}
    </div>
  );
}
