/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  outputFileTracingRoot: __dirname,
  images: { unoptimized: true },
  trailingSlash: true,
};
module.exports = nextConfig;
