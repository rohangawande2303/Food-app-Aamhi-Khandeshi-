/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Optional, but recommended for better error handling
  images: {
    // No need to specify domains if you're only using local images
    // This will optimize local images from the public directory
    unoptimized: false, // Optional, defaults to false
  },
};

export default nextConfig;
