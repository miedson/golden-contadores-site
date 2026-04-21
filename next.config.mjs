/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    cpus: 1
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "images.pexels.com"
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      },
      {
        protocol: "https",
        hostname: "lh4.googleusercontent.com"
      },
      {
        protocol: "https",
        hostname: "lh5.googleusercontent.com"
      },
      {
        protocol: "https",
        hostname: "lh6.googleusercontent.com"
      }
    ]
  }
};

export default nextConfig;
