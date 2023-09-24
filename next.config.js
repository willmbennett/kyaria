/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages:['mongoose','@typegoose/typegoose']
  },
  webpack(config) {
    config.optimization.minimize = false;
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
