/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn-icons-gif.flaticon.com', 'celebwell.com', 'th.bing.com', 'flxt.tmsimg.com', 'www.sheknows.com'], // 👈 add this line
  },
}

module.exports = nextConfig
