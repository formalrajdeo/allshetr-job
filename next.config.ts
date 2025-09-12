import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_UI_PORT: process.env.NEXT_PUBLIC_UI_PORT,
  },
};

export default nextConfig;
