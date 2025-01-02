import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'shared.cloudflare.steamstatic.com',
      'shared.fastly.steamstatic.com',
      'shared.akamai.steamstatic.com'
    ],
    unoptimized: true,
  },
};

export default nextConfig;
