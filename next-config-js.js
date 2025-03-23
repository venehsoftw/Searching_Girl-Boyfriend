/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['worldchain-app.storage.googleapis.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@worldchain/sdk'],
    serverActions: {
      bodySizeLimit: '4mb',
    },
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WORLDCHAIN_URL: process.env.NEXT_PUBLIC_WORLDCHAIN_URL,
  },
  async redirects() {
    return [
      {
        source: '/marketplace',
        destination: '/marketplace?category=all',
        permanent: false,
      },
      {
        source: '/profile',
        destination: '/profile/edit',
        permanent: false,
      },
    ];
  },
  webpack: (config) => {
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    return config;
  },
};

module.exports = nextConfig;
