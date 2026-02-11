import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath: '/brain',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
