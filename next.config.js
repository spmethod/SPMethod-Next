/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  // Keeps every response (pages, images, video) out of search results; remove to be listed again
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noimageindex' }] }]
  },
}

module.exports = nextConfig
