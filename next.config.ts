import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vercel/Next image optimization can return 402 when the optimization quota is blocked.
    // Serve source assets directly so Swell CDN and local product images keep rendering.
    unoptimized: true,
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
};

export default nextConfig;
