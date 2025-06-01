/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  i18n: {
    locales: ['tr'],
    defaultLocale: 'tr',
    localeDetection: false,
  },
};

module.exports = nextConfig;
