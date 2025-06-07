"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si";

const menuItems = [
  { name: "Anasayfa", href: "/" },
  { name: "Hizmetler", href: "/hizmetler" },
  { name: "Araçlar", href: "/araclar" },
  { name: "Rezervasyon", href: "/rezervasyon" },
  { name: "S.S.S.", href: "/sss" },
  { name: "İletişim", href: "/iletisim" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-black/95 shadow z-40 relative">
      <div className="w-full flex items-center justify-between px-3 sm:px-6 md:px-16 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/LOGO.png"
            alt="Logo"
            width={360}        // 2 kat büyük
            height={100}
            className="mr-2"
            priority
            style={{ height: 88, width: "auto" }} // 2 kat yüksek
          />
        </Link>
        {/* --- Mobilde --- Sosyal ve Giriş butonu hamburgerin solunda */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href="https://wa.me/905395267569"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-100 transition-colors duration-200"
          >
            <FaWhatsapp className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/yolcutransferi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-100 transition-colors duration-200"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
          <a
            href="https://x.com/yolcutransferi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-100 transition-colors duration-200"
          >
            <SiX className="w-6 h-6" />
          </a>
          <Link
            href="/login"
            className="text-black font-semibold px-4 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-450 transition-colors duration-200 shadow-sm text-sm"
            style={{ backgroundColor: "#FFD700" }}
          >
            Giriş Yap
          </Link>
        </div>
        {/* Hamburger Menü */}
        <button
          className="md:hidden flex flex-col gap-1 p-2 rounded-lg border border-[#bfa658] bg-black/70 focus:outline-none"
          onClick={() => setMenuOpen((val) => !val)}
          aria-label="Menü"
        >
          <span className="block w-7 h-0.5 bg-[#bfa658] rounded"></span>
          <span className="block w-7 h-0.5 bg-[#bfa658] rounded"></span>
          <span className="block w-7 h-0.5 bg-[#bfa658] rounded"></span>
        </button>
        {/* Masaüstü sosyal ve giriş burada yok, onlar yukarıda */}
      </div>
      {/* Hamburger Menü İçeriği (sadece menü itemleri) */}
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
              <span className="absolute bottom-0 left-[10%] w-[80%] h-[1px] bg-gray-100 opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
            </Link>
          ))}
        </nav>
        {/* --- Desktop: Sosyal ikonlar + Giriş --- */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://wa.me/905395267569"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-100 transition-colors duration-200"
          >
            <FaWhatsapp className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/yolcutransferi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-100 transition-colors duration-200"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
          <a
            href="https://x.com/yolcutransferi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-100 transition-colors duration-200"
          >
            <SiX className="w-6 h-6" />
          </a>
          <Link
            href="/login"
            className="text-black font-semibold px-4 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-450 transition-colors duration-200 shadow-sm text-sm"
            style={{ backgroundColor: "#FFD700" }}
          >
            Giriş Yap
          </Link>
        </div>
      </div>
      {/* --- Hamburger Menü Açılır --- */}
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
          </div>
        </nav>
      )}
      <div className="w-full mt-2" style={{ borderBottom: "0.3px solid rgba(255,255,255,0.15)" }}></div>
      <style jsx>{`
        .animate-fade-in { animation: fadeIn .4s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px);} to { opacity: 1; transform: translateY(0);} }
      `}</style>
    </header>
  );
}
