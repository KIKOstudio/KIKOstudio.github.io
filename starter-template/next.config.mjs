/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',           // 👈 for static build
  images: { unoptimized: true },
  experimental: {
    appDir: true
  },
  // 👇 tell Next.js your code is inside src/
  dir: './src'
};

export default nextConfig;
