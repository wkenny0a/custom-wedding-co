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
  typescript: {
    ignoreBuildErrors: true,
  },
} as any;

export default nextConfig;
