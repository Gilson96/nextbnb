import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        //pathname:"/**/**"
      },
    ],
  },
};
export default nextConfig;
