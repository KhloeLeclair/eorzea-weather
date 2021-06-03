const withMDX = require('@next/mdx')();

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
const nextConfig = {
  future: {
    webpack5: true,
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
  redirects: () => [
    {
      source: '/(en|ja)/:any*',
      destination: '/:any*',
      permanent: true,
    },
  ],
  rewrites: () => [
    {
      destination: '/api/ads',
      source: '/ads.txt',
    },
  ],
};

module.exports = withMDX(nextConfig);
