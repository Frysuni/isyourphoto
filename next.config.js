/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ["localhost", "cdn.isyourphoto.ru"],
  },
};
module.exports = nextConfig;
