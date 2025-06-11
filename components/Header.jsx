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
  { name: "Araçlar", href: "/araclar" },
  { name: "Şoför Başvurusu", href: "/sofor-basvuru" },
  { name: "İş Birliği", href: "/is-birligi" },
  { name: "Firma Başvurusu", href: "/firma-basvuru" },
  { name: "Aracı Başvurusu", href: "/araci-basvuru" },
];
const mobileMenu = [
  { name: "Anasayfa", href: "/" },
  { name: "Hizmetler", href: "/hizmetler" },
  { name: "Rezervasyon", href: "/rezervasyon" },
  { name: "İletişim", href: "/iletisim" },
];
const mobileBurger = [
  { name: "Araçlar", href: "/araclar" },
  { name: "Şoför Başvurusu", href: "/sofor-basvuru" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "S.S.S.", href: "/sss" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const burgerRef = useRef(null);
  const menuBoxRef = useRef(null);
  const [menuCoords, setMenuCoords] = useState({ top: 0, left: 0, width: 220 });

  // Responsive kontrol
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Hamburger pozisyonu
  useEffect(() => {
    if (menuOpen && burgerRef.current) {
      const rect = burgerRef.current.getBoundingClientRect();
      setMenuCoords({
        top: rect.bottom + window.scrollY,
        left: rect.right - 210,
        width: 210,
      });
    }
  }, [menuOpen, isDesktop]);

  // Dışarı tıklayınca hamburgeri kapat
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
    if (menuOpen) window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <header className="w-full bg-black backdrop-blur-md shadow-2xl z-40 relative border-b border-[#FFD70033]">
      {isDesktop ? (
        <div className="flex items-center justify-between px-6 lg:px-14 py-2 w-full" style={{ minHeight: 100 }}>
          {/* Logo */}
          <Link href="/" className="flex items-center min-w-0" style={{ height: "90px" }}>
            <Image
              src="/LOGO.png"
              alt="Logo"
              width={260}
              height={90}
              priority
              style={{
                width: "auto",
                height: "82px",
                maxHeight: "90px",
                objectFit: "contain"
              }}
            />
          </Link>
          {/* Menü */}
          <nav className="flex items-center gap-3 flex-shrink-0 ml-6">
            {desktopMenu.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gold px-4 py-2 font-extrabold text-[20px] hover:bg-[#ffd70016] hover:text-yellow-300 transition-colors duration-150 rounded-xl tracking-wide shadow-sm uppercase"
                style={{
                  marginRight: i !== desktopMenu.length - 1 ? 4 : 0,
                  letterSpacing: ".03em"
                }}
              >
                {item.name}
              </Link>
            ))}
            {/* Hamburger */}
            <button
              ref={burgerRef}
              className="flex flex-col gap-1 p-2 rounded-lg border-2 border-gold bg-[#0a0a0a] hover:scale-105 transition-all duration-150 ml-2 shadow-xl"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menü"
            >
              <span className="block w-8 h-1 bg-gold rounded-xl transition-all"></span>
              <span className="block w-8 h-1 bg-gold rounded-xl transition-all"></span>
              <span className="block w-8 h-1 bg-gold rounded-xl transition-all"></span>
            </button>
          </nav>
          {/* Sağda giriş/üye ol + sosyal */}
          <div className="flex items-center gap-4 ml-5">
            <Link
              href="/login"
              className="lux-btn"
              style={{ minWidth: 98, fontWeight: 800 }}
            >
              Giriş Yap
            </Link>
            <Link
              href="/register"
              className="lux-btn lux-btn-outline"
              style={{ minWidth: 98, fontWeight: 800 }}
            >
              Üye Ol
            </Link>
            <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaWhatsapp className="w-7 h-7" />
            </a>
            <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaInstagram className="w-7 h-7" />
            </a>
            <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer" className="social-icon">
              <SiX className="w-7 h-7" />
            </a>
          </div>
          {/* Hamburger açılır menü */}
          {menuOpen && (
            <nav
              ref={menuBoxRef}
              className="absolute bg-[#1b1a17] border-2 border-gold rounded-2xl shadow-2xl animate-fade-in"
              style={{
                top: menuCoords.top + 2,
                left: menuCoords.left,
                minWidth: 220,
                maxWidth: 260,
                zIndex: 99,
              }}
            >
              <div className="flex flex-col gap-0 py-2">
                {desktopBurger.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-2 px-6 border-b border-gold last:border-0 hover:bg-black/50 transition text-gold font-semibold text-[17px] tracking-tight"
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
          {/* Mobil: Logo + Giriş/Üye Ol */}
          <div className="flex items-center justify-between px-3 pt-2 pb-1 w-full" style={{ minHeight: 66 }}>
            <Link href="/" className="flex items-center">
              <Image
                src="/LOGO.png"
                alt="Logo"
                width={135}
                height={55}
                priority
                style={{
                  width: "auto",
                  height: "54px",
                  minWidth: "90px",
                  maxHeight: "66px",
                  objectFit: "contain"
                }}
              />
            </Link>
            <div className="flex gap-1 flex-shrink-0">
              <Link
                href="/login"
                className="lux-btn min-w-[72px] py-1.5 text-[15px]"
              >
                Giriş Yap
              </Link>
              <Link
                href="/register"
                className="lux-btn lux-btn-outline min-w-[72px] py-1.5 text-[15px]"
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
                  className="text-gold px-3 py-1 font-bold text-[16px] hover:bg-[#ffd70011] hover:text-yellow-300 transition-colors rounded-lg whitespace-nowrap uppercase"
                  style={{ minWidth: 54, textAlign: "center" }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            {/* Hamburger */}
            <button
              ref={burgerRef}
              className="flex flex-col gap-1 p-2 rounded-lg border-2 border-gold bg-black/90 ml-2 shadow-xl hover:scale-110 transition-all duration-150"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menü"
            >
              <span className="block w-7 h-1 bg-gold rounded-xl transition-all"></span>
              <span className="block w-7 h-1 bg-gold rounded-xl transition-all"></span>
              <span className="block w-7 h-1 bg-gold rounded-xl transition-all"></span>
            </button>
            {/* Hamburger açılır menü */}
            {menuOpen && (
              <nav
                ref={menuBoxRef}
                className="absolute bg-[#1b1a17] border-2 border-gold rounded-2xl shadow-2xl animate-fade-in"
                style={{
                  top: menuCoords.top + 2,
                  left: menuCoords.left,
                  minWidth: 210,
                  maxWidth: 235,
                  zIndex: 99,
                }}
              >
                <div className="flex flex-col gap-0 py-2">
                  {mobileBurger.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="py-2 px-6 border-b border-gold last:border-0 hover:bg-black/50 transition text-gold font-semibold text-[16px] tracking-tight"
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
      <div className="w-full mt-2" style={{ borderBottom: "0.5px solid rgba(255,215,0,0.10)" }}></div>
      <style jsx>{`
        .text-gold { color: #FFD700; }
        .bg-gold { background: #FFD700; }
        .border-gold { border-color: #FFD700 !important; }
        .lux-btn {
          background: linear-gradient(90deg, #FFD700 65%, #fff8c0 100%);
          color: #101010;
          font-weight: 900;
          font-size: 1.08rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px 0 rgba(255,215,0,0.14);
          border: none;
          padding: 0.55rem 1.4rem;
          transition: all .18s cubic-bezier(.32,1.56,.68,1.11);
          letter-spacing: .02em;
        }
        .lux-btn:hover {
          background: linear-gradient(90deg, #ffe567 30%, #FFD700 80%);
          color: #191919;
          box-shadow: 0 2px 20px 0 rgba(255,215,0,0.32), 0 1.5px 8px rgba(0,0,0,0.08);
          transform: translateY(-2px) scale(1.035);
        }
        .lux-btn-outline {
          background: #191919;
          color: #FFD700;
          border: 2px solid #FFD700;
        }
        .lux-btn-outline:hover {
          background: linear-gradient(90deg, #FFD700 70%, #fff8c0 100%);
          color: #191919;
          box-shadow: 0 2px 20px 0 rgba(255,215,0,0.22);
        }
        .social-icon {
          color: #FFD700;
          margin-left: 2px;
          margin-right: 2px;
          border-radius: 50%;
          padding: 7px;
          transition: box-shadow 0.18s, color 0.15s;
          box-shadow: 0 0 0 rgba(255,215,0,0);
        }
        .social-icon:hover {
          color: #fff8c0;
          box-shadow: 0 0 10px 3px #FFD70077;
          background: #161616;
        }
        .animate-fade-in { animation: fadeIn .23s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-12px);} to { opacity: 1; transform: translateY(0);} }
      `}</style>
    </header>
  );
}
