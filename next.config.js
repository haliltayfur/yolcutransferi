/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['tr', 'en', 'ar'],
    defaultLocale: 'tr',
    localeDetection: false, // Tarayıcı dili algılamasını kapatır (önerilir)
  },
  reactStrictMode: true, // (opsiyonel ama tavsiye edilir)
};

module.exports = nextConfig;
