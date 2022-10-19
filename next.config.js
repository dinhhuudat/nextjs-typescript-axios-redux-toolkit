/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

module.exports = {
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    domains: ["deckofcardsapi.com", "thumbs.dreamstime.com"],
  },
};
