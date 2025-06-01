import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 md:px-20 py-5 bg-white shadow z-50 w-full">
      {/* Logo kısmı */}
      <div className="flex items-center gap-2">
        <Link href="/">
          <span className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            YolcuTransferi
          </span>
        </Link>
      </div>

      {/* Menü kısmı */}
      <nav className="hidden md:flex gap-3 font-semibold text-lg bg-gray-100 rounded-xl px-5 py-2 shadow-inner">
        {[
          { label: "Ana Sayfa", href: "/" },
          { label: "VIP Transfer", href: "/vip-transfer" },
          { label: "Dron Transferi", href: "/dron-transferi" },
          { label: "Bireysel Transferler", href: "/individual-transfers" },
          { label: "Business Class", href: "/business-class" },
          { label: "Aile Paketleri", href: "/family-packages" },
          { label: "Havalimanı Transferi", href: "/airport-transfers" },
          { label: "İletişim", href: "/contact" }
        ].map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="px-4 py-2 rounded-lg transition bg-white/0 hover:bg-yellow-100 hover:text-yellow-700"
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Sosyal medya ikonları ve Giriş/Üyelik butonu */}
      <div className="flex items-center gap-4">
        {/* Sosyal medya ikonları */}
        <div className="flex gap-3">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="text-gray-700 hover:text-blue-600 transition text-xl" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-gray-700 hover:text-pink-500 transition text-xl" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-gray-700 hover:text-blue-400 transition text-xl" />
          </a>
        </div>

        {/* Giriş/Üyelik butonu */}
        <Link
          href="/login"
          className="bg-yellow-400 hover:bg-yellow-500 transition text-black px-5 py-2 rounded-xl font-semibold shadow text-lg"
        >
          Giriş / Üyelik
        </Link>
      </div>
    </header>
  );
}
