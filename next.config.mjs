/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.codepath.com', 'storage.googleapis.com'],
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
