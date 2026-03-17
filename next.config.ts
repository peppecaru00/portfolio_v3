// next.config.js
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'portfolio_v3';

/** @type {import('next').NextConfig} */
// Allow overriding basePath when deploying to a custom domain (GitHub Pages or otherwise).
// If NEXT_PUBLIC_BASE_PATH is set, we use that. Otherwise we default to the repo name (GitHub Pages path).
//
// To force root-relative paths for custom domains, set NEXT_PUBLIC_BASE_PATH=ROOT in your
// repository secrets (GitHub Actions) or environment.
const inferredBasePath = isGithubActions ? `/${repoName}` : '';
const explicitBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim();
const basePath = explicitBasePath === 'ROOT' ? '' : explicitBasePath ?? inferredBasePath;

const nextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // Helps with GitHub Pages routing
};

module.exports = nextConfig;