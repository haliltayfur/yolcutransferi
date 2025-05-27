import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaTwitter, FaLock } from "react-icons/fa";

export const metadata = {
  title: "YolcuTransferi.com",
  description: "VIP Transfer | Dron Transfer | Türkiye Geneli",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="bg-black text-white min-h-screen">
        {/* HEADER/BANNER */}
        <header className="flex items-center justify-between px-6 md:px-20 py-5 bg-black bg-opacity-80 backdrop-blur z-40">
          <div className="flex items-center gap-2">
            <Image src="/logo-vip.png" alt="Logo" width={42} height={42} className="mr-2" />
            <span className="text-2xl md:text-3xl font-bold text-gold">YolcuTransferi.com</span>
          </div>
          <nav className="flex items-center gap-5 text-base">
            <Link href="/">Anasayfa</Link>
            <Link href="/hizmetler">Hizmetlerimiz</Link>
            <Link href="/araclar">Araçlar</Link>
            <Link href="/rezervasyon">Rezervasyon</Link>
            <Link href="/sss">SSS</Link>
            <Link href="/iletisim">İletişim</Link>
            <Link href="/hakkimizda">Hakkımızda</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/sozlesme">Sözleşmeler</Link>
            <FaWhatsapp className="w-5 h-5 hover:text-green-400 ml-2 cursor-pointer" />
            <FaInstagram className="w-5 h-5 hover:text-pink-500 cursor-pointer" />
            <FaTwitter className="w-5 h-5 hover:text-blue-400 cursor-pointer" />
            <button className="ml-3 px-2 py-1 text-xs rounded bg-gold/10 text-gold hover:bg-gold/30">TR</button>
            <button className="px-2 py-1 text-xs rounded hover:bg-gold/10">EN</button>
            <button className="px-2 py-1 text-xs rounded hover:bg-gold/10">RU</button>
          </nav>
        </header>
        {children}
        {/* FOOTER */}
        <footer className="w-full px-8 py-6 bg-black/90 flex flex-col md:flex-row items-center justify-between gap-3 mt-auto">
          <div className="flex items-center gap-3">
            <FaLock className="text-green-400" />
            <span className="text-sm text-gray-300">SSL ile korunuyor</span>
          </div>
          <div className="flex gap-6 items-center">
            <Image src="/tursab-logo.png" alt="TURSAB" width={42} height={30} />
            <Link href="/sozlesme" className="text-sm underline">Mesafeli Satış Sözleşmesi</Link>
            <Link href="/gizlilik" className="text-sm underline">Gizlilik</Link>
            <Link href="/iade" className="text-sm underline">İade Politikası</Link>
            <Link href="/cerez" className="text-sm underline">Çerez Politikası</Link>
          </div>
          <div className="text-xs text-gray-400">&copy; 2025 YolcuTransferi.com</div>
        </footer>
      </body>
    </html>
  );
}
