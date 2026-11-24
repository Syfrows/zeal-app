/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{
      source: "/admin/account",
      destination: "https://api.relaxzeal.com/admin/settings/profile",
      permanent: false,
    }, {
      source: "/admin/:path*",
      destination: "https://api.relaxzeal.com/admin/:path*",
      permanent: false,
    }];
  },
  images: {
    domains: ["picsum.photos", "localhost", "api.relaxzeal.com"],
  },
  modularizeImports: {
    "@mui/material/?(((\\w*)?/?)*)": {
      transform: "@mui/material/{{ matches.[1] }}/{{member}}",
    },
    "@mui/icons-material/?(((\\w*)?/?)*)": {
      transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
    },
  },
};

module.exports = nextConfig;
