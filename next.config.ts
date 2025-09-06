import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: process.cwd(),
  
  images: {
    unoptimized: true, // static export için gerekli
  },
  
  // Sadece production'da aktif optimizasyonlar
  ...(isDev ? {} : {
    compress: true,
    experimental: {
      optimizeCss: true,
      optimizePackageImports: ['framer-motion', 'lucide-react']
    }
  }),
  
  webpack: (config, { dev, isServer }) => {
    // Sadece production build'de code splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
