import type { NextConfig } from "next";

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // required for static export
  },
};

module.exports = nextConfig;
