import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'supabase.co',
      },
    ],
  },
  // Static export disabled so API routes work
};

export default nextConfig;