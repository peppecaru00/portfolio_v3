import type { NextConfig } from "next";

const repo = 'portfolio_v3';

// 1. We check if we are running on GitHub Actions.
// This variable is ALWAYS present in the GitHub build environment.
const isGithub = process.env.GITHUB_ACTIONS === 'true';

// 2. Set the path based on that check.
// Localhost -> ''
// GitHub -> '/portfolio_v3'
const basePath = isGithub ? `/${repo}` : '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  
  // Apply the path for the router
  basePath: basePath,
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Bake the variable into the client-side JavaScript
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;