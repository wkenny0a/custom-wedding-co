import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.schema.io',
      },
      {
        protocol: 'https',
        hostname: 'cdn.swell.store',
      }
    ],
  },
};

export default nextConfig;
