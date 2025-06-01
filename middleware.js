import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './next-intl.config';

export default createMiddleware({
  locales,
  defaultLocale,
});

export const config = {
  matcher: ['/', '/(tr|en|ar)/:path*'],
};
