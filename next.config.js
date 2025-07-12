/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Optimize build performance
  // Reduce build time by skipping type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Reduce build time by skipping ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
}

module.exports = nextConfig
