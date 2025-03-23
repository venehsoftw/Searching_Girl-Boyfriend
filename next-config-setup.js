// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['worldchain-storage.example.com'],
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/api/auth/signin',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

// .env.local.example
// Rename to .env.local and fill in your actual credentials
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# World Chain API Configuration
WORLD_CHAIN_API_URL=https://api.worldchain.example.com
WORLD_CHAIN_API_KEY=your_world_chain_api_key
WORLD_CHAIN_APP_ID=your_mini_app_id

# Database Connection (if using external database)
DATABASE_URL=your_database_connection_string
