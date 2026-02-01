import type { NextConfig } from "next";

// 1. Define your repo name here ONCE
const repoName = 'portfolio_v3'; 

// 2. Determine if we are in production (GitHub Pages) or development (Localhost)
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  
  basePath: isProd ? "/portfolio_v3" : "",  
  // Sometimes needed for CSS/JS loading correctly
  assetPrefix: isProd ? "/portfolio_v3/" : "",
  // Ensure images are unoptimized for static export if using next/image
  images: {
    unoptimized: true,
  },

};

export default nextConfig;
