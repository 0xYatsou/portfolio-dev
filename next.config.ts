import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/portfolio-dev',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
