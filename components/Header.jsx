import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 md:px-20 py-4 bg-white shadow z-50 w-full">
      <div className="flex items-center gap-2">
        {/* Logo */}
        <Link href="/">
          <span className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            YolcuTransferi
          </span>
        </Link>
      </div>
      <nav className="hidden md:flex gap-6 font-semibold text-base">
        <Link href="/">Anasayfa</Link>
        <Link href="/vip-transfer">VIP Transfer</Link>
        <Link href="/dron-transferi">Dron Transferi</Link>
        <Link href="/individual-transfers">Bireysel Transferler</Link>
        <Link href="/business-class">Business Class</Link>
        <Link href="/family-packages">Aile Paketleri</Link>
        <Link href="/airport-transfers">Havalimanı Transferi</Link>
        <Link href="/contact">İletişim</Link>
      </nav>
      <div className="flex items-center gap-4">
        {/* Giriş/Üyelik butonu */}
        <Link
          href="/login"
          className="bg-yellow-400 hover:bg-yellow-500 transition text-black px-4 py-2 rounded-xl font-semibold"
        >
          Giriş / Üyelik
        </Link>
      </div>
    </header>
  );
}
