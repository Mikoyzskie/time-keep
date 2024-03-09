/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zandatestcms.azurewebsites.net",
        port: "",
        pathname: "/assets/*",
      },
    ],
  },
};

export default nextConfig;
