"use client";
import { motion } from "framer-motion";
import VideoBackground from "./components/VideoBackground";
import Link from "next/link";

export default function Home() {
  // Get the base path we defined in next.config.ts
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  console.log("Current Base Path:", basePath);
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Video */}
      <VideoBackground 
        videoSrc={`${basePath}/videos/hero-bg.mp4`}
        overlay={true}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-12 text-white">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base font-medium tracking-widest uppercase mb-6"
          >
            Creative Filmmaker & Editor
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8"
          >
            Crafting
            <br />
            Visual
            <br />
            Experiences
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-6 md:items-center"
          >
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-4xl px-8 py-4 border border-white text-white font-medium tracking-wide hover:bg-white hover:text-black transition-all duration-300"
            >
              View Projects
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}