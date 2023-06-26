/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },

  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
};

module.exports = nextConfig;
