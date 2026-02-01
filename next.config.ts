/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  
  // Auto-detect from GitHub Actions or use repo name
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig