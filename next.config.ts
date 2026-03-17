// next.config.js
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'portfolio_v3';

/** @type {import('next').NextConfig} */
const basePath = isGithubActions ? `/${repoName}` : '';

const nextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath,
  assetPrefix: isGithubActions ? `/${repoName}/` : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // Helps with GitHub Pages routing
};

module.exports = nextConfig;