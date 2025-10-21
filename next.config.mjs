import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "food99api.onrender.com", "localhost", "127.0.0.1", 'placehold'],
  },
};

export default withPWA(nextConfig);
