import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['tr', 'en', 'ar'],      // Dil seçeneklerin
  defaultLocale: 'tr',              // Varsayılan dil
  localeDetection: true             // Otomatik algılamayı aç
});

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|robots.txt).*)']  // API ve static dosyalar hariç
};
