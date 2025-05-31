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
                  width={253}
                  height={69}
                  className="mr-2"
                  priority
                />
              </Link>
            </div>

            {/* MENÜ */}
            <nav className="flex items-center gap-2 font-semibold text-[1.15rem] bg-gray-100 rounded-xl px-4 py-2 shadow-inner">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-3 py-1.5 rounded-lg text-black
                             transition-colors duration-200
                             hover:text-yellow-500
                             after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-yellow-500 after:transition-[width] after:duration-300 hover:after:w-full
                             hover:after:shadow-yellow-400/80"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* SOSYAL İKONLAR + GİRİŞ BUTONU */}
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/905395267569"
                target="_blank"
                aria-label="Whatsapp"
                rel="noopener noreferrer"
                className="text-yellow-500 hover:text-yellow-400 transition-colors duration-200"
              >
                <FaWhatsapp className="w-6 h-6" />
              </a>
              <a
                href="#"
                target="_blank"
                aria-label="Instagram"
                rel="noopener noreferrer"
                className="text-yellow-500 hover:text-yellow-400 transition-colors duration-200"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                target="_blank"
                aria-label="X (Twitter)"
                rel="noopener noreferrer"
                className="text-yellow-500 hover:text-yellow-400 transition-colors duration-200"
              >
                <SiX className="w-6 h-6" />
              </a>
              <Link
                href="/login"
                className="text-black font-semibold px-5 py-1.5 rounded-xl
                           bg-yellow-400 hover:bg-yellow-500
                           transition-colors duration-200
                           shadow-md hover:shadow-yellow-400"
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
