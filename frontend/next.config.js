/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://banking-backend-tljk.onrender.com/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
