"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si";

const menuItems = [
  { name: "Anasayfa", href: "/" },
  { name: "Hizmetler", href: "/hizmetler" },
  { name: "Rezervasyon", href: "/rezervasyon" },
  { name: "İletişim", href: "/iletisim" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-black/95 shadow z-40 relative">
      {/* Üst Satır: Logo sola, sosyal sağa */}
      <div className="flex items-center justify-between px-3 sm:px-6 md:px-16 pt-3 pb-1 w-full">
        <Link href="/" className="flex items-center min-w-0">
          <Image
            src="/LOGO.png"
            alt="Logo"
            width={360}
            height={110}
            priority
            className="mr-2"
            style={{
              width: "264px", // %20 büyütülmüş
              maxWidth: "70vw",
              maxHeight: "105px",
              height: "auto",
              objectFit: "contain",
            }}
            sizes="(max-width: 600px) 160px, 264px"
          />
        </Link>
        <div className="flex items-center gap-3 flex-shrink-0">
          <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-100 transition-colors duration-200">
            <FaWhatsapp className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-100 transition-colors duration-200">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-100 transition-colors duration-200">
            <SiX className="w-6 h-6" />
          </a>
        </div>
      </div>
      {/* Alt satır: Menü ve hamburger */}
      <div className="flex items-center justify-between px-3 sm:px-6 md:px-16 pb-2 pt-1 w-full">
        <nav className="flex-1 flex flex-wrap items-center gap-2 justify-start overflow-x-auto">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-300 px-3 py-1 font-medium text-base hover:text-yellow-400 transition-colors rounded-lg whitespace-nowrap"
              style={{ minWidth: 80, textAlign: "center" }}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        {/* Hamburger Menü */}
        <button
          className="flex md:hidden flex-col gap-1 p-2 rounded-lg border border-[#bfa658] bg-black/70 ml-2"
          onClick={() => setMenuOpen((val) => !val)}
          aria-label="Menü"
        >
          <span className="block w-7 h-0.5 bg-[#bfa658] rounded"></span>
          <span className="block w-7 h-0.5 bg-[#bfa658] rounded"></span>
          <span className="block w-7 h-0.5 bg-[#bfa658] rounded"></span>
        </button>
      </div>
      {/* Hamburger açılır menü: sadece giriş */}
      {menuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-black/95 px-6 py-5 z-50 shadow-xl animate-fade-in">
          <div className="flex flex-col gap-2 text-lg font-semibold">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition text-base shadow text-center"
              onClick={() => setMenuOpen(false)}
            >
              Giriş Yap
            </Link>
          </div>
        </nav>
      )}
      {/* Alt çizgi */}
      <div className="w-full mt-2" style={{ borderBottom: "0.3px solid rgba(255,255,255,0.15)" }}></div>
      <style jsx>{`
        .animate-fade-in { animation: fadeIn .4s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px);} to { opacity: 1; transform: translateY(0);} }
        @media (max-width: 600px) {
          img[alt="Logo"] { width: 160px !important; max-height: 62px !important; }
        }
      `}</style>
    </header>
  );
}
