import type { NextConfig } from "next";

// ⚠️ Ensure this matches your repository name EXACTLY
const repoName = "portfolio_v3"; 
const basePath = `/${repoName}`;

const nextConfig: NextConfig = {
  output: 'export',
  // Fixes the 404s on reload/direct link
  trailingSlash: true,
  
  // Force the path. No conditions.
  basePath: basePath,
  
  images: {
    unoptimized: true,
  },
  
  // Force the variable into the browser
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;