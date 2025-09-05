const nextConfig = {
  env: {
    BASE_URL_API: process.env.BASE_URL_API
  },
  // on production, use proper protocol and hostname
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**'
      },
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  // enhance performance when dev
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 15 * 60 * 1000, // 15 minutes
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 4
  }
}

export default nextConfig
