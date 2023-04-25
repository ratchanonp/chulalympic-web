/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  ...nextConfig,
  async redirects() {
    return [
      // {
      //   source: "/admin",
      //   destination: "/admin/dashboard",
      //   permanent: true,
      // },
      {
        source: "/((?!close).*)",
        destination: "/close",
        permanent: false,
      },
    ];
  },
};
