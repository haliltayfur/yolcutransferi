import Link from "next/link";
import LanguageSelector from "./LanguageSelector";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 md:px-20 py-4 bg-white shadow z-50 w-full">
      <div className="flex items-center gap-2">
        {/* Logo */}
        <Link href="/">
          <span className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">YolcuTransferi</span>
        </Link>
      </div>
      <nav className="hidden md:flex gap-6 font-semibold text-base">
        <Link href="/">Anasayfa</Link>
        <Link href="/vip-transfer">VIP Transfer</Link>
        <Link href="/dron-transferi">Dron Transferi</Link>
        <Link href="/individual-transfers">Bireysel Transfer</Link>
        <Link href="/business-class">Business Class</Link>
        <Link href="/family-packages">Aile Paketleri</Link>
        <Link href="/airport-transfers">Havalimanı Transferi</Link>
        <Link href="/contact">İletişim</Link>
      </nav>
      <div className="flex items-center gap-4">
        <LanguageSelector />
        {/* Giriş/Üyelik dropdown */}
        <div className="relative group">
          <button className="bg-yellow-400 hover:bg-yellow-500 transition text-black px-4 py-2 rounded-xl font-semibold">
            Giriş / Üye Ol
          </button>
          <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl py-2 z-50">
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
  );
}
