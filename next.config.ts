import type { NextConfig } from "next";

// 1. Grab the path from the environment (injected by GitHub Actions)
// If running locally, this will be undefined, defaulting to '' (root)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export',  
  // 2. Use the dynamic path
  basePath: basePath,
  
  images: {
    unoptimized: true,
  },
  
  // 3. No need for 'env' block here; NEXT_PUBLIC_ variables 
  // are automatically picked up if set in the system (like we did in YAML).
};

export default nextConfig;