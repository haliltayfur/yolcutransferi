// middleware.js
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './next-intl.config';

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: false
});

export const config = {
  // sadece /api, /_next ve statik dosyalar hariç tutulur
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
