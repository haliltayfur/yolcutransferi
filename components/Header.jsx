"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si";

// Desktop menü
const desktopMenu = [
  { name: "Anasayfa", href: "/" },
  { name: "Hizmetler", href: "/hizmetler" },
  { name: "Rezervasyon", href: "/rezervasyon" },
  { name: "Araçlar", href: "/araclar" },
  { name: "İletişim", href: "/iletisim" },
  { name: "Hakkımızda", href: "/hakkimizda" },
];
const desktopBurger = [
  { name: "Şoför Başvurusu", href: "/sofor-basvuru" },
  { name: "İş Birliği", href: "/is-birligi" },
  { name: "Firma Başvurusu", href: "/firma-basvuru" },
  { name: "Aracı Başvurusu", href: "/araci-basvuru" },
  { name: "Kurumsal", href: "/kurumsal" },
];
// Mobil menü
const mobileMenu = [
  { name: "Anasayfa", href: "/" },
  { name: "Hizmetler", href: "/hizmetler" },
  { name: "Rezervasyon", href: "/rezervasyon" },
  { name: "İletişim", href: "/iletisim" },
];
const mobileBurger = [
  { name: "Şoför Başvurusu", href: "/sofor-basvuru" },
  { name: "Kurumsal", href: "/kurumsal" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "S.S.S.", href: "/sss" },
  { name: "Araçlar", href: "/araclar" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <header className="w-full bg-black/95 shadow z-40 relative">
      {isDesktop ? (
        <div className="flex items-center justify-between gap-2 px-2 sm:px-6 md:px-10 lg:px-16 py-2 w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center min-w-0">
            <Image
              src="/LOGO.png"
              alt="Logo"
              width={240}
              height={80}
              priority
              className="mr-2"
              style={{
                width: "220px",
                maxWidth: "220px",
                maxHeight: "80px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Link>
          {/* Menü */}
          <nav className="flex items-center gap-2 flex-shrink-0">
            {desktopMenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 px-3 py-1 font-medium text-base hover:text-yellow-400 transition-colors rounded-lg whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          {/* Hamburger */}
          <button
            className="flex flex-col gap-1 p-2 rounded-lg border border-[#bfa658] bg-black/70 ml-2"
            onClick={() => setMenuOpen((val) => !val)}
            aria-label="Menü"
          >
            <span className="block w-7 h-0.5 bg-[#bfa658] rounded"></span>
            <span className="block w-7 h-0.5 bg-[#bfa658] rounded"></span>
            <span className="block w-7 h-0.5 bg-[#bfa658] rounded"></span>
          </button>
          {/* Sağda giriş/üye ol + sosyal */}
          <div className="flex items-center gap-2 ml-4">
            <Link
              href="/login"
              className="text-black font-semibold px-3 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 shadow-sm text-sm"
            >
              Giriş Yap
            </Link>
            <Link
              href="/register"
              className="text-yellow-400 border border-yellow-400 font-semibold px-3 py-1.5 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors duration-200 shadow-sm text-sm"
            >
              Üye Ol
            </Link>
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
      ) : (
        <>
          {/* Üst satır: Logo + Giriş/Üye Ol */}
          <div className="flex items-center justify-between px-3 pt-2 pb-1 w-full">
            <div className="flex items-center min-w-0 flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/LOGO.png"
                  alt="Logo"
                  width={120}
                  height={48}
                  priority
                  className="mr-2"
                  style={{
                    width: "32vw",
                    minWidth: "80px",
                    maxWidth: "160px",
                    maxHeight: "48px",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </Link>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Link
                href="/login"
                className="text-black font-semibold px-2 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 shadow-sm text-xs"
              >
                Giriş Yap
              </Link>
              <Link
                href="/register"
                className="text-yellow-400 border border-yellow-400 font-semibold px-2 py-1 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors duration-200 shadow-sm text-xs"
              >
                Üye Ol
              </Link>
            </div>
          </div>
          {/* Menü + Hamburger */}
          <div className="flex items-center justify-between px-3 pt-1 pb-1 w-full">
            <nav className="flex flex-row items-center gap-1 justify-start overflow-x-auto flex-1">
              {mobileMenu.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 px-2 py-1 font-medium text-[15px] hover:text-yellow-400 transition-colors rounded-lg whitespace-nowrap"
                  style={{ minWidth: 55, textAlign: "center" }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            {/* Hamburger */}
            <button
              className="flex flex-col gap-1 p-2 rounded-lg border border-[#bfa658] bg-black/70 ml-2"
              onClick={() => setMenuOpen((val) => !val)}
              aria-label="Menü"
            >
              <span className="block w-7 h-0.5 bg-[#bfa658] rounded"></span>
              <span className="block w-7 h-0.5 bg-[#bfa658] rounded"></span>
              <span className="block w-7 h-0.5 bg-[#bfa658] rounded"></span>
            </button>
          </div>
        </>
      )}
      {/* Hamburger açılır menü */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-black/95 px-6 py-5 z-50 shadow-xl animate-fade-in">
          <div className="flex flex-col gap-2 text-lg font-semibold">
            {(isDesktop ? desktopBurger : mobileBurger).map((item) => (
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
        @media (max-width: 600px) {
          img[alt="Logo"] { width: 32vw !important; min-width: 60px !important; max-height: 44px !important; }
        }
      `}</style>
    </header>
  );
}
