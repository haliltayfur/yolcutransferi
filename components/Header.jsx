"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
        <Link href="/" className="flex items-center min-w-[100px]">
          <Image
            src="/LOGO.png"
            alt="Logo"
            width={140}
            height={40}
            priority
            className="object-contain"
            style={{
              width: "auto",
              height: 40,
              maxHeight: 48,
              minWidth: 92,
              minHeight: 28,
            }}
          />
        </Link>
        {/* Desktop Menü ve Sosyal/Giriş/Üye Ol */}
        <nav className="hidden md:flex items-center gap-4 font-medium text-[1.1rem] text-gray-300 flex-wrap">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-3 py-1 transition-colors duration-200 hover:text-gray-100"
            >
              {item.name}
              <span className="absolute bottom-0 left-[10%] w-[80%] h-[1px] bg-gray-100 opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
            </Link>
          ))}
          <a
            href="https://wa.me/905395267569"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 text-gray-300 hover:text-[#25d366] transition-colors duration-200"
          >
            <FaWhatsapp className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/yolcutransferi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-pink-400 transition-colors duration-200"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
          <a
            href="https://x.com/yolcutransferi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            <SiX className="w-6 h-6" />
          </a>
          <Link
            href="/login"
            className="ml-3 text-black font-semibold px-4 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 shadow-sm text-sm"
            style={{ backgroundColor: "#FFD700" }}
          >
            Giriş Yap
          </Link>
          <Link
            href="/register"
            className="ml-2 text-black font-semibold px-4 py-1.5 rounded-lg bg-white hover:bg-gray-200 transition-colors duration-200 shadow-sm text-sm border border-[#FFD700]"
            style={{}}
          >
            Üye Ol
          </Link>
        </nav>
        {/* Mobilde Giriş & Üye Ol Butonları */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            href="/login"
            className="text-black font-semibold px-3 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 shadow-sm text-xs"
            style={{ backgroundColor: "#FFD700" }}
          >
            Giriş
          </Link>
          <Link
            href="/register"
            className="text-black font-semibold px-3 py-1 rounded-lg bg-white hover:bg-gray-200 transition-colors duration-200 shadow-sm text-xs border border-[#FFD700]"
            style={{}}
          >
            Üye Ol
          </Link>
          <button
            className="flex flex-col gap-1 p-2 rounded-lg border border-[#bfa658] bg-black/70 focus:outline-none"
            onClick={() => setMenuOpen((val) => !val)}
            aria-label="Menü"
          >
            <span className="block w-7 h-0.5 bg-[#bfa658] rounded"></span>
            <span className="block w-7 h-0.5 bg-[#bfa658] rounded"></span>
            <span className="block w-7 h-0.5 bg-[#bfa658] rounded"></span>
          </button>
        </div>
      </div>
      {/* Mobil Menü Açılır */}
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
            {/* Sosyal Medya Mobil Menüde */}
            <div className="flex gap-4 pt-3">
              <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer"><FaWhatsapp className="text-2xl text-[#25d366]" /></a>
              <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer"><FaInstagram className="text-2xl text-[#e4405f]" /></a>
              <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer"><SiX className="text-2xl text-white" /></a>
            </div>
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
