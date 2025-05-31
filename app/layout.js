"use client";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si";

export const metadata = {
  title: "YolcuTransferi.com",
  description: "VIP Transfer | Dron Transfer | Türkiye Geneli",
};

const menuItems = [
  { name: "Anaasayfa", href: "/" },
  { name: "Hizmetler", href: "/hizmetler" },
  { name: "Araçlar", href: "/araclar" },
  { name: "Rezervasyon", href: "/rezervasyon" },
  { name: "S.S.S.", href: "/sss" },
  { name: "İletişim", href: "/iletisim" },
];

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="bg-black text-white min-h-screen flex flex-col">
        {/* HEADER */}
        <header className="flex flex-col items-end px-8 md:px-20 py-4 bg-black/95 shadow z-40 w-full">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/">
                <Image
                  src="/LOGO.png"
                  alt="Logo"
                  width={253}
                  height={69}
                  className="mr-2"
                  priority
                />
              </Link>
            </div>

            {/* MENÜ */}
            <nav className="flex items-center gap-6 font-medium text-[1.1rem] text-gray-300">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-3 py-1 transition-colors duration-300 hover:text-white"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-[10%] w-[80%] h-[1.5px] bg-white opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
                  <style jsx>{`
                    a:hover span {
                      opacity: 1 !important;
                    }
                  `}</style>
                </Link>
              ))}
            </nav>

            {/* SOSYAL İKONLAR + GİRİŞ BUTONU */}
            <div className="flex items-center gap-5">
              <a
                href="https://wa.me/905395267569"
                target="_blank"
                aria-label="Whatsapp"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <FaWhatsapp className="w-6 h-6" />
              </a>
              <a
                href="#"
                target="_blank"
                aria-label="Instagram"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                target="_blank"
                aria-label="X (Twitter)"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <SiX className="w-6 h-6" />
              </a>
              <Link
                href="/login"
                className="text-yellow-900 font-semibold px-6 py-2 rounded-xl
                           bg-yellow-400 shadow-inner shadow-yellow-300/60
                           transition-all duration-300
                           hover:bg-yellow-500 hover:shadow-yellow-400/80
                           hover:shadow-lg hover:text-white"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Giriş Yap
              </Link>
            </div>
          </div>

          {/* HEADER ALTINDA 0.3PX YARI SAYDAM BEYAZ ÇİZGİ TAM GENİŞLİKTE */}
          <div
            className="w-full mt-2"
            style={{ borderBottom: "0.3px solid rgba(255,255,255,0.2)" }}
          ></div>
        </header>

        <main className="flex-grow">{children}</main>

        <footer className="w-full px-8 py-6 bg-black/90 flex flex-col md:flex-row items-center justify-between gap-3 mt-auto">
          <span className="text-sm text-gray-300">© 2025 YolcuTransferi.com</span>
          <div className="flex gap-6 items-center">
            <Link href="/sozlesme" className="text-sm underline">
              Sözleşme
            </Link>
            <Link href="/gizlilik" className="text-sm underline">
              Gizlilik
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
