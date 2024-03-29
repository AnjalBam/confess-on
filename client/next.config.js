/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['bit.ly'],
    },
    webpackDevMiddleware: config => {
        config.watchOptions = {
          poll: 1000,
          aggregateTimeout: 300,
        }
        return config
      }
};

module.exports = nextConfig;
