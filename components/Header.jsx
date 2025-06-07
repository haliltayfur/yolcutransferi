"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si";

// Menü tanımları (senin istediğin sırayla)
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

  // Click dışında hamburgeri kapat
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

  // Responsive detection
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <header className="w-full bg-black/95 shadow z-40 relative">
      {isDesktop ? (
        <div className="flex items-center justify-between px-2 sm:px-8 lg:px-16 py-2 w-full" style={{minHeight: 90}}>
          {/* Logo */}
          <Link href="/" className="flex items-center min-w-0" style={{height: '70px'}}>
            <Image
              src="/LOGO.png"
              alt="Logo"
              width={200}
              height={70}
              priority
              style={{
                width: "auto",
                height: "62px",
                maxHeight: "70px",
                objectFit: "contain",
              }}
            />
          </Link>
          {/* Menü (gap azaldı, yarı yarıya) */}
          <nav className="flex items-center gap-3 md:gap-5 flex-shrink-0" style={{marginLeft: 10}}>
            {desktopMenu.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 px-1 md:px-2 py-1 font-medium text-[16px] hover:text-yellow-400 transition-colors rounded-lg whitespace-nowrap"
                style={{letterSpacing: "0.01em"}}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          {/* Hamburger (iletişim ile hakkımızdanın arasında) */}
          <button
            ref={burgerRef}
            className="flex flex-col gap-1 p-2 rounded-lg border border-[#bfa658] bg-black/70 ml-2 mr-3 relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü"
            style={{marginLeft: 10}}
          >
            <span className="block w-6 h-0.5 bg-[#bfa658] rounded"></span>
            <span className="block w-6 h-0.5 bg-[#bfa658] rounded"></span>
            <span className="block w-6 h-0.5 bg-[#bfa658] rounded"></span>
          </button>
          {/* Sağda giriş/üye ol + sosyal */}
          <div className="flex items-center gap-2 ml-2">
            <Link
              href="/login"
              className="text-black font-semibold px-3 py-1 rounded bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 shadow-sm text-[15px]"
              style={{minWidth: 80, fontWeight: 600, fontSize: 15}}
            >
              Giriş Yap
            </Link>
            <Link
              href="/register"
              className="text-[#222] font-semibold px-3 py-1 rounded border border-yellow-400 bg-yellow-200 hover:bg-yellow-400 hover:text-black transition-colors duration-200 shadow-sm text-[15px]"
              style={{minWidth: 80, fontWeight: 600, fontSize: 15}}
            >
              Üye Ol
            </Link>
            <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-100 transition-colors duration-200">
              <FaWhatsapp className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-100 transition-colors duration-200">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-100 transition-colors duration-200">
              <SiX className="w-5 h-5" />
            </a>
          </div>
          {/* Hamburger açılır menü - hemen ikonun altında, kutu ve koyu arka planlı */}
          {menuOpen && (
            <nav
              ref={menuBoxRef}
              className="absolute bg-[#1b1b1b] border border-[#bfa658] rounded-xl shadow-xl animate-fade-in"
              style={{
                top: 72,
                right: 200,
                minWidth: 210,
                maxWidth: 260,
                zIndex: 99,
                padding: "0px 0px",
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
          {/* Mobil üst satır: Logo + Giriş/Üye Ol */}
          <div className="flex items-center justify-between px-3 pt-2 pb-1 w-full" style={{minHeight: 64}}>
            <Link href="/" className="flex items-center">
              <Image
                src="/LOGO.png"
                alt="Logo"
                width={155}
                height={50}
                priority
                style={{
                  width: "auto",
                  height: "55px",
                  minWidth: "80px",
                  maxHeight: "60px",
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
            >
              <span className="block w-6 h-0.5 bg-[#bfa658] rounded"></span>
              <span className="block w-6 h-0.5 bg-[#bfa658] rounded"></span>
              <span className="block w-6 h-0.5 bg-[#bfa658] rounded"></span>
            </button>
            {/* Hamburger açılır menü - sola yaslı, hamburgerin altında kutu */}
            {menuOpen && (
              <nav
                ref={menuBoxRef}
                className="absolute bg-[#181818] border border-[#bfa658] rounded-xl shadow-xl animate-fade-in"
                style={{
                  top: 104,
                  left: 16,
                  minWidth: 205,
                  maxWidth: 240,
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
