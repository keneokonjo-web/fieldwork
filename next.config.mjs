/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/contact', destination: '/request-demo', permanent: true },
      { source: '/pricing', destination: '/websites#price', permanent: true },
      { source: '/business/:path*', destination: '/', permanent: true },
      { source: '/individuals/:path*', destination: '/', permanent: true },
      { source: '/individuals', destination: '/', permanent: true },
      { source: '/business', destination: '/', permanent: true },
      { source: '/learn/:path*', destination: '/ai-workshop', permanent: true },
      { source: '/learn', destination: '/ai-workshop', permanent: true },
      { source: '/build', destination: '/', permanent: true },
      { source: '/login', destination: '/request-demo', permanent: true },
      { source: '/field-notes/:path*', destination: '/', permanent: true },
      { source: '/field-notes', destination: '/', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
        ],
      },
      { source: '/brand/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }] },
    ];
  },
};
export default nextConfig;
