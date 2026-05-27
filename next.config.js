/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['placeimg.com'],
  },
  async redirects() {
    return [
      {
        source: '/publicbigchat',
        destination: '/',
        permanent: true,
      }
    ];
  },
  output: 'standalone',
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.module = {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: [{ loader: '@svgr/webpack', options: { icon: true } }],
        },
      ],
    };
    return config;
  },
};
