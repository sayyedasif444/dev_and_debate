/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    turbotrace: {
      logLevel: 'error',
      contextDirectory: __dirname
    }
  },
  // Optimize build performance
  swcMinify: true,
  // Reduce build time by skipping type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Reduce build time by skipping ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  // Add trailing slash for static export
  trailingSlash: true,
}

module.exports = nextConfig
