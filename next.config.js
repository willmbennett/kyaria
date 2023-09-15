/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    serverActions: true,
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
