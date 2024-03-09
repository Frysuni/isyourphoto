/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ["localhost", "res.cloudinary.com"],
  },
};
module.exports = nextConfig;
