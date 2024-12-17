import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['shared.cloudflare.steamstatic.com', 'shared.fastly.steamstatic.com'],
  },
};

export default nextConfig;
