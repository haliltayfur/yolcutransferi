// next.config.js
const withNextIntl = require('next-intl/plugin')('./next-intl.config.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // diğer isteğe bağlı ayarlar burada olabilir
};

module.exports = withNextIntl(nextConfig);
