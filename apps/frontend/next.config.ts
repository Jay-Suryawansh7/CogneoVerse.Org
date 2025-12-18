import type { NextConfig } from "next";
const path = require('path')

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: '**.cogneverse.com',
      },
    ],
  },
  turbopack: {
    root: path.join(__dirname, '../..'),
  },
};

export default nextConfig;
