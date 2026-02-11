/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/next-go-app' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
