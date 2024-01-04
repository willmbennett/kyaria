/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
    deviceSizes: [
      360, 414, 512, 640, 750, 828, 1080, 1200, 1536, 1920, 2048, 3840,
    ],
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['mongoose', '@typegoose/typegoose']
  },
  webpack(config) {
    config.optimization.minimize = false;
    config.module.rules.push({
      test: /canvas\/build\/Release\/canvas\.node$/,
      use: 'raw-loader',
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/github',
        destination: 'https://github.com/willmbennett/career_launcher_ai',
        permanent: false,
      },
      {
        source: '/deploy',
        destination: 'https://vercel.com/willmbennett/career-launcher-ai-k8og',
        permanent: false,
      },
    ];
  },
};
