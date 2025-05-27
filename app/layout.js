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
        <header className="w-full bg-black bg-opacity-90 backdrop-blur z-40 shadow-sm">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between px-2 md:px-10 py-4 gap-2">
            {/* Logo */}
            <div className="flex items-center gap-2 min-w-[130px]">
              <Image src="/logo-vip.png" alt="Logo" width={38} height={38} className="mr-2" />
              <span className="text-lg md:text-2xl font-bold text-gold whitespace-nowrap">YolcuTransferi.com</span>
            </div>
            {/* Menü ve ikonlar */}
            <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm md:text-base overflow-x-auto md:overflow-visible items-center justify-end w-full">
              <Link href="/" className="hover:text-gold">Anasayfa</Link>
              <Link href="/hizmetler" className="hover:text-gold">Hizmetlerimiz</Link>
              <Link href="/araclar" className="hover:text-gold">Araçlar</Link>
              <Link href="/rezervasyon" className="hover:text-gold">Rezervasyon</Link>
              <Link href="/sss" className="hover:text-gold">SSS</Link>
              <Link href="/iletisim" className="hover:text-gold">İletişim</Link>
              <Link href="/hakkimizda" className="hover:text-gold">Hakkımızda</Link>
              <Link href="/blog" className="hover:text-gold">Blog</Link>
              <Link href="/sozlesme" className="hover:text-gold">Sözleşmeler</Link>
              <FaWhatsapp className="w-5 h-5 hover:text-green-400 cursor-pointer" />
              <FaInstagram className="w-5 h-5 hover:text-pink-500 cursor-pointer" />
              <FaTwitter className="w-5 h-5 hover:text-blue-400 cursor-pointer" />
              <button className="ml-1 px-2 py-1 text-xs rounded bg-gold/10 text-gold hover:bg-gold/30">TR</button>
              <button className="px-2 py-1 text-xs rounded hover:bg-gold/10">EN</button>
              <button className="px-2 py-1 text-xs rounded hover:bg-gold/10">RU</button>
            </nav>
          </div>
        </header>
        {/* Sayfa İçeriği */}
        <div className="min-h-[calc(100vh-120px)]">{children}</div>
        {/* FOOTER */}
        <footer className="w-full px-2 md:px-8 py-6 bg-black/90 flex flex-col md:flex-row items-center justify-between gap-3 mt-auto">
          <div className="flex items-center gap-3">
            <FaLock className="text-green-400" />
            <span className="text-sm text-gray-300">SSL ile korunuyor</span>
          </div>
          <div className="flex gap-4 md:gap-6 items-center text-xs md:text-sm flex-wrap">
            <Image src="/tursab-logo.png" alt="TURSAB" width={38} height={27} />
            <Link href="/sozlesme" className="underline">Mesafeli Satış Sözleşmesi</Link>
            <Link href="/gizlilik" className="underline">Gizlilik</Link>
            <Link href="/iade" className="underline">İade Politikası</Link>
            <Link href="/cerez" className="underline">Çerez Politikası</Link>
          </div>
          <div className="text-xs text-gray-400 text-center">&copy; 2025 YolcuTransferi.com</div>
        </footer>
      </body>
    </html>
  );
}
