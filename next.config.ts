import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'diocese.wds-project.com',
      },
    ],
  },
};

export default nextConfig;
