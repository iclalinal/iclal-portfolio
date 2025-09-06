import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // static export
  // Silence monorepo root inference warning by pinning the tracing root
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
