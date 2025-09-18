import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const enableStaticExport = process.env.NEXT_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  env: {
    BRIDGE_BASE: process.env.BRIDGE_BASE,
    BRIDGE_TOKEN: process.env.BRIDGE_TOKEN,
  },
  outputFileTracingRoot: process.cwd(),

  images: {
    unoptimized: true,
  },

  ...(isDev
    ? {}
    : {
        compress: true,
        experimental: {
          optimizePackageImports: ["framer-motion", "lucide-react"],
        },
      }),

  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
