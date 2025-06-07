"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si";

// Menü tanımları
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
  const burgerRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 220 });

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    // Hamburger açılırsa pozisyonunu al
    if (menuOpen && burgerRef.current) {
      const rect = burgerRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width > 200 ? rect.width : 220,
      });
    }
  }, [menuOpen, isDesktop]);

  return (
    <header className="w-full bg-black/95 shadow z-40 relative">
      {isDesktop ? (
        <div className="flex items-center justify-between gap-2 px-2 sm:px-6 md:px-10 lg:px-16 py-2 w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center min-w-0" style={{height: '90px'}}>
            <Image
              src="/LOGO.png"
              alt="Logo"
              width={230}
              height={90}
              priority
              style={{
                width: "auto",
                height: "75px", // Logo orantılı ve estetik görünsün
                maxHeight: "88px",
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
            ref={burgerRef}
            className="flex flex-col gap-1 p-2 rounded-lg border border-[#bfa658] bg-black/70 ml-2 relative"
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
                  width={200}
                  height={90}
                  priority
                  style={{
                    width: "auto",
                    height: "60px",
                    minWidth: "90px",
                    maxWidth: "90vw",
                    maxHeight: "64px",
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
              ref={burgerRef}
              className="flex flex-col gap-1 p-2 rounded-lg border border-[#bfa658] bg-black/70 ml-2 relative"
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

      {/* Hamburger açılır menü - sadece hamburgerin altında, sağa hizalı kutu */}
      {menuOpen && (
        <nav
          className="absolute bg-black/97 z-50 shadow-xl animate-fade-in border border-[#bfa658] rounded-xl"
          style={{
            top: menuPosition.top,
            left: menuPosition.left,
            width: menuPosition.width,
            minWidth: 200,
            maxWidth: 260,
          }}
        >
          <div className="flex flex-col gap-2 text-lg font-semibold p-3">
            {(isDesktop ? desktopBurger : mobileBurger).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 border-b border-[#bfa658] block last:border-0"
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
        .animate-fade-in { animation: fadeIn .3s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px);} to { opacity: 1; transform: translateY(0);} }
        @media (max-width: 600px) {
          img[alt="Logo"] { width: auto !important; height: 60px !important; min-width: 60px !important; max-height: 64px !important; }
        }
      `}</style>
    </header>
  );
}
