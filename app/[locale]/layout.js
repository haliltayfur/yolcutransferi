import "../globals.css";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si";
import LanguageSelector from "../../components/LanguageSelector";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function LocaleLayout({ children, params }) {
  const messages = useMessages();
  const locale = params.locale;

  return (
    <html lang={locale}>
      <body className="bg-black text-white min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {/* HEADER */}
          <header className="flex flex-col items-end px-8 md:px-20 py-4 bg-black/95 shadow z-40 w-full">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link href={`/${locale}`}>
                  <Image src="/logo-vip.png" alt="Logo" width={42} height={42} className="mr-2" />
                </Link>
                <span className="text-2xl md:text-3xl font-bold text-yellow-400">YolcuTransferi.com</span>
              </div>
              <nav className="flex items-center gap-6 text-base font-medium">
                <Link href={`/${locale}`}>{messages.menu.home}</Link>
                <Link href={`/${locale}/hizmetler`}>{messages.menu.services}</Link>
                <Link href={`/${locale}/araclar`}>{messages.menu.cars}</Link>
                <Link href={`/${locale}/rezervasyon`}>{messages.menu.reservation}</Link>
                <Link href={`/${locale}/sss`}>{messages.menu.faq}</Link>
                <Link href={`/${locale}/iletisim`}>{messages.menu.contact}</Link>
              </nav>
              <div className="flex items-center gap-4">
                <a href="https://wa.me/905395267569" target="_blank" aria-label="Whatsapp" rel="noopener noreferrer">
                  <FaWhatsapp className="w-6 h-6 text-green-400 hover:text-green-500" />
                </a>
                <a href="#" target="_blank" aria-label="Instagram" rel="noopener noreferrer">
                  <FaInstagram className="w-6 h-6 text-pink-500 hover:text-pink-600" />
                </a>
                <a href="#" target="_blank" aria-label="X (Twitter)" rel="noopener noreferrer">
                  <SiX className="w-6 h-6 text-white hover:text-gray-400" />
                </a>
                <Link
                  href={`/${locale}/login`}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-1.5 rounded-xl focus:outline-none"
                >
                  {messages.login}
                </Link>
              </div>
            </div>
            <div className="flex justify-end w-full mt-1">
              <LanguageSelector />
            </div>
          </header>
          <main className="flex-grow">
            {children}
          </main>
          <footer className="w-full px-8 py-6 bg-black/90 flex flex-col md:flex-row items-center justify-between gap-3 mt-auto">
            <span className="text-sm text-gray-300">© 2025 YolcuTransferi.com</span>
            <div className="flex gap-6 items-center">
              <Link href={`/${locale}/sozlesme`} className="text-sm underline">Sözleşme</Link>
              <Link href={`/${locale}/gizlilik`} className="text-sm underline">Gizlilik</Link>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
