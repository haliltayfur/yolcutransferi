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
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "İletişim", href: "/iletisim" },
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
  const menuBoxRef = useRef(null);

  // Hamburger dışına tıklayınca kapanma
  useEffect(() => {
    function handleClick(e) {
      if (
        menuBoxRef.current &&
        !menuBoxRef.current.contains(e.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      window.addEventListener("mousedown", handleClick);
    }
    return () => window.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Hamburger'in butona tam yapışık olması için position (İletişim'in hemen sağında)
  const burgerStyle = isDesktop
    ? { marginLeft: 0, marginRight: 16 }
    : { marginLeft: 0 };

  return (
    <header className="w-full bg-black/95 shadow z-40 relative">
      {isDesktop ? (
        <div className="flex items-center justify-between px-4 lg:px-12 py-2 w-full" style={{minHeight: 95}}>
          {/* Logo (desktop %20 büyük) */}
          <Link href="/" className="flex items-center min-w-0" style={{height: '90px'}}>
            <Image
              src="/LOGO.png"
              alt="Logo"
              width={270} // %20 büyük
              height={90}
              priority
              style={{
                width: "auto",
                height: "82px",
                maxHeight: "90px",
                objectFit: "contain",
              }}
            />
          </Link>
          {/* Menü (boşlukları yarı yarıya, gap-3 gibi) */}
          <nav className="flex items-center gap-3 flex-shrink-0 ml-4">
            {desktopMenu.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 px-2 py-1 font-medium text-[17px] hover:text-yellow-400 transition-colors rounded-lg whitespace-nowrap"
                style={{
                  marginRight: i !== desktopMenu.length - 1 ? 6 : 0, // Butonlar arası boşluğu iyice azalt
                  letterSpacing: ".01em"
                }}
              >
                {item.name}
              </Link>
            ))}
            {/* Hamburger (İletişim'in TAM yanında) */}
            <button
              ref={burgerRef}
              className="flex flex-col gap-1 p-2 rounded-lg border border-[#bfa658] bg-black/70 relative"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menü"
              style={burgerStyle}
            >
              <span className="block w-6 h-0.5 bg-[#bfa658] rounded"></span>
              <span className="block w-6 h-0.5 bg-[#bfa658] rounded"></span>
              <span className="block w-6 h-0.5 bg-[#bfa658] rounded"></span>
            </button>
          </nav>
          {/* Sağda giriş/üye ol + sosyal (ikonlar büyük, bozulmamış) */}
          <div className="flex items-center gap-3 ml-2">
            <Link
              href="/login"
              className="text-black font-semibold px-3 py-1.5 rounded bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 shadow-sm text-[15px]"
              style={{minWidth: 80, fontWeight: 600}}
            >
              Giriş Yap
            </Link>
            <Link
              href="/register"
              className="text-[#222] font-semibold px-3 py-1.5 rounded border border-yellow-400 bg-yellow-200 hover:bg-yellow-400 hover:text-black transition-colors duration-200 shadow-sm text-[15px]"
              style={{minWidth: 80, fontWeight: 600}}
            >
              Üye Ol
            </Link>
            <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-100 transition-colors duration-200">
              <FaWhatsapp className="w-7 h-7" />
            </a>
            <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-100 transition-colors duration-200">
              <FaInstagram className="w-7 h-7" />
            </a>
            <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-100 transition-colors duration-200">
              <SiX className="w-7 h-7" />
            </a>
          </div>
          {/* Hamburger açılır menü - TAM hamburger ikonunun altında, kutu ve koyu arka planlı */}
          {menuOpen && (
            <nav
              ref={menuBoxRef}
              className="absolute bg-[#1b1b1b] border border-[#bfa658] rounded-xl shadow-xl animate-fade-in"
              style={{
                top: 95,
                left: undefined,
                right: 130, // hamburger ikonunun sol kenarına hizalı
                minWidth: 210,
                maxWidth: 260,
                zIndex: 99,
              }}
            >
              <div className="flex flex-col gap-0 text-base font-semibold py-2">
                {desktopBurger.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-2 px-4 border-b border-[#bfa658] last:border-0 hover:bg-black/40 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      ) : (
        <>
          {/* Mobil üst satır: Logo (%20 büyük) + Giriş/Üye Ol */}
          <div className="flex items-center justify-between px-3 pt-2 pb-1 w-full" style={{minHeight: 65}}>
            <Link href="/" className="flex items-center">
              <Image
                src="/LOGO.png"
                alt="Logo"
                width={160}
                height={60}
                priority
                style={{
                  width: "auto",
                  height: "65px", // %20 büyük
                  minWidth: "90px",
                  maxHeight: "70px",
                  objectFit: "contain",
                }}
              />
            </Link>
            <div className="flex gap-1 flex-shrink-0">
              <Link
                href="/login"
                className="text-black font-semibold px-2 py-1 rounded bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 shadow-sm text-[14px]"
                style={{minWidth: 70, fontWeight: 600}}
              >
                Giriş Yap
              </Link>
              <Link
                href="/register"
                className="text-[#222] font-semibold px-2 py-1 rounded border border-yellow-400 bg-yellow-200 hover:bg-yellow-400 hover:text-black transition-colors duration-200 shadow-sm text-[14px]"
                style={{minWidth: 70, fontWeight: 600}}
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
            {/* Hamburger sola yaslı ve altına açılır */}
            <button
              ref={burgerRef}
              className="flex flex-col gap-1 p-2 rounded-lg border border-[#bfa658] bg-black/70 ml-2 relative"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menü"
              style={{marginLeft: 0}}
            >
              <span className="block w-6 h-0.5 bg-[#bfa658] rounded"></span>
              <span className="block w-6 h-0.5 bg-[#bfa658] rounded"></span>
              <span className="block w-6 h-0.5 bg-[#bfa658] rounded"></span>
            </button>
            {/* Hamburger açılır menü - hamburger ikonunun tam altından, kutu, sola taşmıyor */}
            {menuOpen && (
              <nav
                ref={menuBoxRef}
                className="absolute bg-[#181818] border border-[#bfa658] rounded-xl shadow-xl animate-fade-in"
                style={{
                  top: 108,
                  left: 18,
                  minWidth: 210,
                  maxWidth: 235,
                  zIndex: 99,
                }}
              >
                <div className="flex flex-col gap-0 text-base font-semibold py-2">
                  {mobileBurger.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="py-2 px-4 border-b border-[#bfa658] last:border-0 hover:bg-black/40 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </nav>
            )}
          </div>
        </>
      )}
      <div className="w-full mt-2" style={{ borderBottom: "0.3px solid rgba(255,255,255,0.15)" }}></div>
      <style jsx>{`
        .animate-fade-in { animation: fadeIn .23s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px);} to { opacity: 1; transform: translateY(0);} }
      `}</style>
    </header>
  );
}
