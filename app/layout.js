import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "YolcuTransferi.com",
  description: "VIP Transfer | Dron Transfer | Türkiye Geneli",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="bg-black text-white min-h-screen">
        {/* HEADER/BANNER */}
        <header className="flex items-center justify-between px-8 md:px-20 py-5 bg-black bg-opacity-90 backdrop-blur z-40 w-full">
          <div className="flex items-center gap-2">
            <Image src="/logo-vip.png" alt="Logo" width={42} height={42} className="mr-2" />
            <span className="text-2xl md:text-3xl font-bold text-yellow-400">YolcuTransferi.com</span>
          </div>
          <nav className="flex items-center gap-5 text-base">
            <Link href="/">Anasayfa</Link>
            <Link href="/hizmetler">Hizmetlerimiz</Link>
            <Link href="/araclar">Araçlar</Link>
            <Link href="/rezervasyon">Rezervasyon</Link>
            <Link href="/sss">SSS</Link>
            <Link href="/iletisim">İletişim</Link>
          </nav>
        </header>
        {children}
        {/* FOOTER */}
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
