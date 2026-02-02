import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  basePath: process.env.NODE_ENV === 'production' ? '/portfolio_v3' : '',

};

export default nextConfig;
