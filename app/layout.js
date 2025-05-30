import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import LanguageSelector from "../components/LanguageSelector";
import SocialMediaBar from "../components/SocialMediaBar";


export const metadata = {
  title: "YolcuTransferi.com",
  description: "VIP Transfer | Dron Transfer | Türkiye Geneli",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="bg-black text-white min-h-screen flex flex-col">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-4 bg-black/90 w-full z-40">
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <Link href="/">
              <Image src="/logo-vip.png" alt="Logo" width={42} height={42} className="mr-2" />
            </Link>
            <span className="text-2xl md:text-3xl font-bold text-yellow-400">YolcuTransferi.com</span>
          </div>
          <nav className="flex flex-wrap items-center gap-5 text-base font-medium">
            <Link href="/">Anasayfa</Link>
            <Link href="/hizmetler">Hizmetlerimiz</Link>
            <Link href="/araclar">Araçlar</Link>
            <Link href="/rezervasyon">Rezervasyon</Link>
            <Link href="/sss">SSS</Link>
            <Link href="/iletisim">İletişim</Link>
          </nav>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <LanguageSelector />
            {/* Login / Üye Ol Dropdown */}
            <div className="relative group">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-1.5 rounded-xl focus:outline-none">
                Giriş / Üye Ol
              </button>
              <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white text-black rounded-xl shadow-lg z-50 py-2">
                <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">Giriş Yap</Link>
                <div className="border-t my-1"></div>
                <Link href="/register/customer" className="block px-4 py-2 hover:bg-gray-100">Müşteri Üyeliği</Link>
                <Link href="/register/driver" className="block px-4 py-2 hover:bg-gray-100">Araçlı Şoför Kaydı</Link>
                <Link href="/register/partner" className="block px-4 py-2 hover:bg-gray-100">İş Birliği Başvurusu</Link>
                <Link href="/register/company" className="block px-4 py-2 hover:bg-gray-100">Firma Üyeliği</Link>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="w-full px-6 md:px-20 py-10 bg-gray-900/95 text-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h2 className="text-lg font-semibold mb-2">Explore</h2>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/business-class" className="hover:underline">Business Class</Link>
                </li>
                <li>
                  <Link href="/family-packages" className="hover:underline">Aile Paketleri</Link>
                </li>
                <li>
                  <Link href="/airport-transfers" className="hover:underline">Havalimanı Transferi</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Services</h2>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/vip-transfer" className="hover:underline">VIP Transfer</Link>
                </li>
                <li>
                  <Link href="/corporate-transfers" className="hover:underline">Kurumsal Transfer</Link>
                </li>
                <li>
                  <Link href="/individual-transfers" className="hover:underline">Bireysel Transfer</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">İletişim</h2>
              <p className="text-sm">info@yolcutransferi.com</p>
              <p className="text-sm mt-2">
                WhatsApp:{" "}
                <a
                  href="https://wa.me/905395267569"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  +90 539 526 75 69
                </a>
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Bülten Aboneliği</h2>
              <form className="flex">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="rounded-l px-3 py-1 w-full text-black"
                />
                <button
                  type="submit"
                  className="bg-yellow-400 text-black rounded-r px-4 font-semibold"
                >
                  Abone Ol
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs">© 2025 YolcuTransferi.com. Tüm hakları saklıdır.</p>
            <div className="flex gap-3 mt-2 md:mt-0">
              <Link href="/sozlesme" className="hover:underline text-xs">Sözleşme</Link>
              <span>|</span>
              <Link href="/gizlilik" className="hover:underline text-xs">Gizlilik</Link>
            </div>
            <SocialMediaBar />
          </div>
        </footer>
      </body>
    </html>
  );
}
