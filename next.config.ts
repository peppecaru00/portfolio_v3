import type { NextConfig } from "next";

// 1. Define your repo name here ONCE
const repoName = 'portfolio_v3'; 

// 2. Determine if we are in production (GitHub Pages) or development (Localhost)
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  
  // 3. Only apply the base path in production
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',

  images: {
    unoptimized: true,
  },

  // 4. Expose this variable to your frontend code
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repoName}` : '',
  },
};

export default nextConfig;
