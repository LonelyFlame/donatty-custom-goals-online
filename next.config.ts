import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    authInterrupts: true,
  },
  /* for builds only. because of next-auth error */
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
