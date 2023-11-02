/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      appDir: true,
    },
    images:{
      domains: ['res.cloudinary.com','utfs.io'],
    }
  };
  
  module.exports = nextConfig;
  