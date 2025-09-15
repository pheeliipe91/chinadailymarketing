/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io', 'images.ctfassets.net'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
  swcMinify: true,
  reactStrictMode: true,
}

module.exports = nextConfig
