"use client";
import Link from "next/link";
import { useState } from "react";
import { FaInstagram, FaXTwitter, FaWhatsapp } from "react-icons/fa6";

const menuLinks = [
  { label: "Ana Sayfa", href: "/" },
  { label: "VIP Transfer", href: "/vip-transfer" },
  { label: "Dron Transferi", href: "/dron-transferi" },
  { label: "Bireysel Transferler", href: "/individual-transfers" },
  { label: "Business Class", href: "/business-class" },
  { label: "Aile Paketleri", href: "/family-packages" },
  { label: "Havalimanı Transferi", href: "/airport-transfers" },
  { label: "İletişim", href: "/contact" }
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow z-50 w-full sticky top-0">
      <div className="flex items-center justify-between px-4 md:px-20 py-4">
        {/* Logo */}
        <Link href="/">
          <span className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            YolcuTransferi
          </span>
        </Link>

        {/* Masaüstü Menü */}
        <nav className="hidden md:flex gap-3 font-semibold text-lg bg-gray-100 rounded-xl px-5 py-2 shadow-inner">
          {menuLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-2 rounded-lg transition bg-white/0 hover:bg-yellow-100 hover:text-yellow-700"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Sosyal ve giriş (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" title="WhatsApp">
            <FaWhatsapp className="text-green-400 text-xl" />
          </a>
          <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" title="Instagram">
            <FaInstagram className="text-pink-500 text-xl" />
          </a>
          <a href="https://twitter.com/yolcutransferi" target="_blank" rel="noopener noreferrer" title="X">
            <FaXTwitter className="text-black text-xl" />
          </a>
          <Link
            href="/login"
            className="bg-yellow-400 hover:bg-yellow-500 transition text-black px-5 py-2 rounded-xl font-semibold shadow text-lg"
          >
            Giriş / Üyelik
          </Link>
        </div>

        {/* Mobil hamburger */}
        <button
          className="md:hidden flex flex-col gap-1 p-2 rounded-lg border border-[#bfa658] bg-white/90 focus:outline-none"
          onClick={() => setMenuOpen(val => !val)}
          aria-label="Menü"
        >
          <span className="block w-6 h-0.5 bg-[#bfa658] rounded"></span>
          <span className="block w-6 h-0.5 bg-[#bfa658] rounded"></span>
          <span className="block w-6 h-0.5 bg-[#bfa658] rounded"></span>
        </button>
      </div>

      {/* Mobil Menü Açılır */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/60 z-50" onClick={() => setMenuOpen(false)}>
          <nav
            className="absolute top-0 left-0 w-3/4 max-w-xs h-full bg-white shadow-2xl px-6 py-8 flex flex-col gap-4 animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <button className="ml-auto mb-4 text-gray-600 text-2xl" onClick={() => setMenuOpen(false)}>×</button>
            {menuLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="block py-3 px-2 rounded-lg text-lg font-semibold text-gray-800 hover:bg-yellow-100 transition"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="flex gap-4 pt-2">
              <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                <FaWhatsapp className="text-green-400 text-2xl" />
              </a>
              <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" title="Instagram">
                <FaInstagram className="text-pink-500 text-2xl" />
              </a>
              <a href="https://twitter.com/yolcutransferi" target="_blank" rel="noopener noreferrer" title="X">
                <FaXTwitter className="text-black text-2xl" />
              </a>
            </div>
            <Link
              href="/login"
              className="bg-yellow-400 hover:bg-yellow-500 transition text-black px-5 py-2 rounded-xl font-semibold shadow text-lg mt-4 text-center"
              onClick={() => setMenuOpen(false)}
            >
              Giriş / Üyelik
            </Link>
          </nav>
        </div>
      )}

      {/* Küçük fade animasyon */}
      <style jsx>{`
        .animate-fade-in { animation: fadeIn .25s;}
        @keyframes fadeIn { from { opacity: 0; transform: translateX(-24px);} to { opacity: 1; transform: none;} }
      `}</style>
    </header>
  );
}
