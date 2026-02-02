import type { NextConfig } from "next";

const repo = 'portfolio_v3';
const assetPrefix = `/${repo}`;
const basePath = `/${repo}`;

const nextConfig: NextConfig = {
  output: 'export',
  
  // 2. These settings tell Next.js where your site lives
  basePath: process.env.NODE_ENV === 'production' ? basePath : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? assetPrefix : '',
  
  images: {
    unoptimized: true,
  },
  
  // 3. This forces the variable into the browser code
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NODE_ENV === 'production' ? basePath : '',
  },
};

export default nextConfig;