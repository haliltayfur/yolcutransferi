/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['tr', 'en'],
    defaultLocale: 'tr',
    localeDetection: false // true/false olabilir, istersen kaldırabilirsin de.
  },
  // Diğer ayarların...
};

module.exports = nextConfig;
