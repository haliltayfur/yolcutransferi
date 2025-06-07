import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si";

export const metadata = {
  title: "YolcuTransferi.com",
  description: "VIP Transfer | Dron Transfer | Türkiye Geneli",
};

const menuItems = [
  { name: "AnasayfaAAA", href: "/" },
  { name: "Hizmetler", href: "/hizmetler" },
  { name: "Araçlar", href: "/araclar" },
  { name: "Rezervasyon", href: "/rezervasyon" },
  { name: "S.S.S.", href: "/sss" },
  { name: "İletişim", href: "/iletisim" },
];

export default function RootLayout({ children }) {
  // Hamburger menu için state
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="tr">
      <body className="bg-black text-white min-h-screen flex flex-col font-poppins overflow-x-hidden">
        {/* HEADER */}
        <header className="w-full bg-black/95 shadow z-40 relative">
          <div className="w-full flex items-center justify-between px-3 sm:px-6 md:px-16 py-3">
            {/* Logo */}
            <Link href="/">
              <Image
                src="/LOGO.png"
                alt="Logo"
                width={180}
                height={50}
                className="mr-2"
                priority
                style={{ height: 44, width: "auto" }}
              />
            </Link>
            {/* Desktop Menü */}
            <nav className="hidden md:flex items-center gap-5 font-medium text-[1.1rem] text-gray-300 flex-wrap">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-3 py-1 transition-colors duration-200 hover:text-gray-100"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-[10%] w-[80%] h-[1px] bg-gray-100 opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
                </Link>
              ))}
            </nav>
            {/* Desktop: Sosyal ikonlar + Giriş */}
            <div className="hidden md:flex items-center gap-4">
              <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer"
                 className="text-gray-300 hover:text-gray-100 transition-colors duration-200">
                <FaWhatsapp className="w-6 h-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer"
                 className="text-gray-300 hover:text-gray-100 transition-colors duration-200">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer"
                 className="text-gray-300 hover:text-gray-100 transition-colors duration-200">
                <SiX className="w-6 h-6" />
              </a>
              <Link
                href="/login"
                className="text-black font-semibold px-4 py-1.5 rounded-lg
                           bg-yellow-400 hover:bg-yellow-450
                           transition-colors duration-200 shadow-sm text-sm"
                style={{ backgroundColor: "#FFD700" }}
              >
                Giriş Yap
              </Link>
            </div>
            {/* Mobil Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1 p-2 rounded-lg border border-[#bfa658] bg-black/70 focus:outline-none"
              onClick={() => setMenuOpen((val) => !val)}
              aria-label="Menü"
            >
              <span className="block w-7 h-0.5 bg-[#bfa658] rounded"></span>
              <span className="block w-7 h-0.5 bg-[#bfa658] rounded"></span>
              <span className="block w-7 h-0.5 bg-[#bfa658] rounded"></span>
            </button>
          </div>
          {/* Mobil Menü Açılır */}
          {menuOpen && (
            <nav className="md:hidden absolute top-full left-0 w-full bg-black/95 px-6 py-5 z-50 shadow-xl animate-fade-in">
              <div className="flex flex-col gap-2 text-lg font-semibold">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-2 border-b border-[#bfa658] block"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex gap-4 pt-2">
                  <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer"><FaWhatsapp className="text-2xl text-[#25d366]" /></a>
                  <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram className="text-2xl text-[#e4405f]" /></a>
                  <a href="#" target="_blank" rel="noopener noreferrer"><SiX className="text-2xl text-white" /></a>
                </div>
                <Link
                  href="/login"
                  className="mt-3 px-4 py-2 rounded-xl bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition text-base shadow text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Giriş Yap
                </Link>
              </div>
            </nav>
          )}
          {/* Alt Çizgi */}
          <div className="w-full mt-2" style={{ borderBottom: "0.3px solid rgba(255,255,255,0.15)" }}></div>
          <style jsx>{`
            .animate-fade-in { animation: fadeIn .4s; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px);} to { opacity: 1; transform: translateY(0);} }
          `}</style>
        </header>

        <main className="flex-grow">{children}</main>

        <footer className="w-full px-8 py-6 bg-black/90 flex flex-col md:flex-row items-center justify-between gap-3 mt-auto">
          <span className="text-sm text-gray-400">© 2025 YolcuTransferi.com</span>
          <div className="flex gap-6 items-center">
            <Link href="/sozlesme" className="text-sm underline text-gray-400">Sözleşme</Link>
            <Link href="/gizlilik" className="text-sm underline text-gray-400">Gizlilik</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
