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
                {/* LOGO %15 daha büyük */}
                <Image
                  src="/LOGO.png"
                  alt="Logo"
                  width={253} // 220 * 1.15 ≈ 253
                  height={69} // 60 * 1.15 ≈ 69
                  className="mr-2"
                  priority
                />
              </Link>
            </div>
            {/* MENÜ: VIP modern cam efektli butonlar */}
            <nav className="flex items-center gap-3 font-semibold text-[1.15rem] bg-gray-900 bg-opacity-30 rounded-xl px-5 py-3 shadow-lg backdrop-blur-md">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 rounded-lg text-white transition-all duration-300
                             before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-yellow-400 before:via-yellow-300 before:to-yellow-400 before:opacity-0 before:blur-xl before:transition-opacity before:duration-300
                             hover:before:opacity-70 hover:text-black"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-6">
              <a
                href="https://wa.me/905395267569"
                target="_blank"
                aria-label="Whatsapp"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="w-6 h-6 text-yellow-400 hover:text-yellow-300 transition-colors duration-200" />
              </a>
              <a
                href="#"
                target="_blank"
                aria-label="Instagram"
                rel="noopener noreferrer"
              >
                <FaInstagram className="w-6 h-6 text-yellow-400 hover:text-yellow-300 transition-colors duration-200" />
              </a>
              <a
                href="#"
                target="_blank"
                aria-label="X (Twitter)"
                rel="noopener noreferrer"
              >
                <SiX className="w-6 h-6 text-white hover:text-yellow-300 transition-colors duration-200" />
              </a>
              <Link
                href="/login"
                className="relative inline-block px-6 py-2 rounded-xl font-semibold text-white
                           bg-black bg-opacity-30 border-2 border-yellow-400 shadow-lg backdrop-blur-sm
                           transition-all duration-300 hover:bg-yellow-400 hover:text-black hover:shadow-yellow-400/70
                           focus:outline-none focus:ring-4 focus:ring-yellow-300"
              >
                Giriş Yap
              </Link>
            </div>
          </div>
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
