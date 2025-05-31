import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si";

export const metadata = {
  title: "YolcuTransferi.com",
  description: "VIP Transfer | Dron Transfer | Türkiye Geneli",
};

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
                  width={253}  // 220 * 1.15 ≈ 253
                  height={69}  // 60 * 1.15 ≈ 69
                  className="mr-2"
                  priority
                />
              </Link>
              {/* <span className="text-2xl md:text-3xl font-bold text-yellow-400">YolcuTransferi.com</span> */}
            </div>
            {/* MENÜ: Modern arka plan ve hover */}
            <nav className="flex items-center gap-2 font-semibold text-[1.15rem] bg-gray-100 rounded-xl px-4 py-2 shadow-inner">
              <Link href="/" className="px-3 py-1.5 rounded-lg transition bg-white/0 hover:bg-yellow-100 hover:text-yellow-700">Anaasayfa</Link>
              <Link href="/hizmetler" className="px-3 py-1.5 rounded-lg transition bg-white/0 hover:bg-yellow-100 hover:text-yellow-700">Hizmetler</Link>
              <Link href="/araclar" className="px-3 py-1.5 rounded-lg transition bg-white/0 hover:bg-yellow-100 hover:text-yellow-700">Araçlar</Link>
              <Link href="/rezervasyon" className="px-3 py-1.5 rounded-lg transition bg-white/0 hover:bg-yellow-100 hover:text-yellow-700">Rezervasyon</Link>
              <Link href="/sss" className="px-3 py-1.5 rounded-lg transition bg-white/0 hover:bg-yellow-100 hover:text-yellow-700">S.S.S.</Link>
              <Link href="/iletisim" className="px-3 py-1.5 rounded-lg transition bg-white/0 hover:bg-yellow-100 hover:text-yellow-700">İletişim</Link>
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
                href="/login"
                className="
                  px-4 py-1.5 rounded-xl border border-gray-600
                  text-white font-semibold
                  bg-transparent
                  hover:bg-gray-800 hover:border-gray-400 hover:text-yellow-400
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black
                "
              >
                Giriş Yap
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="w-full px-8 py-6 bg-black/90 flex flex-col md:flex-row items-center justify-between gap-3 mt-auto">
          <span className="text-sm text-gray-300">© 2025 YolcuTransferi.com</span>
          <div className="flex gap-6 items-center">
            <Link href="/sozlesme" className="text-sm underline">Sözleşme</Link>
            <Link href="/gizlilik" className="text-sm underline">Gizlilik</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
