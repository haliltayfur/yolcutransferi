/** @type {import('next').NextConfig} */
const nextConfig = {
i18n: {
  locales: ['tr', 'en', 'ar'],
  defaultLocale: 'tr',
  localeDetection: false // ← doğru!
},
  // Diğer ayarların...
};

module.exports = nextConfig;
