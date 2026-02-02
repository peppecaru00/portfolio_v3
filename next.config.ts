import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = "portfolio_v3"; // ⚠️ REPLACE THIS with your repository name

const nextConfig: NextConfig = {
  output: 'export',
  // This tells Next.js to serve the site from the subdirectory on GitHub Pages
  basePath: isProd ? `/${repoName}` : '',
  // Required for static export to work with images
  images: {
    unoptimized: true,
  },
  // Makes the basePath available as an environment variable in your components
  env: {
    basePath: isProd ? `/${repoName}` : '',
  },
};

export default nextConfig;