/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

module.exports = {
  env: {
    apiKey: process.env.apiKey,
    API_URL: process.env.API_URL,
  },
};
