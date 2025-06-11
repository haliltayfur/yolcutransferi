"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si";

// Menü
const menuItems = [
  { name: "Anasayfa", href: "/" },
  { name: "Hizmetler", href: "/hizmetler" },
  { name: "Rezervasyon", href: "/rezervasyon" },
  { name: "Araçlar", href: "/araclar" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "İletişim", href: "/iletisim" },
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
    <header className="w-full bg-black/95 shadow-2xl z-40 relative border-b border-[#FFD70044]">
      <div className="flex items-center justify-between px-8 lg:px-20 py-2 w-full" style={{ minHeight: 100 }}>
        {/* Logo %20 büyük */}
        <Link href="/" className="flex items-center min-w-0" style={{ height: "96px" }}>
          <Image
            src="/LOGO.png"
            alt="Logo"
            width={324}    // Örneğin önce 270 ise 324 = 270 * 1.2
            height={96}
            priority
            style={{
              width: "auto",
              height: "96px",
              maxHeight: "96px",
              objectFit: "contain"
            }}
          />
        </Link>

        {/* Menü */}
        <nav className="hidden lg:flex items-center gap-1 flex-shrink-0 ml-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="header-menu-link"
            >
              {item.name}
            </Link>
          ))}

          {/* Giriş/Üye Ol Butonları */}
          <Link
            href="/login"
            className="header-btn ml-5"
          >
            Giriş Yap
          </Link>
          <Link
            href="/register"
            className="header-btn header-btn-outline ml-2"
          >
            Üye Ol
          </Link>

          {/* Sosyal ikonlar */}
          <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" className="header-social ml-2">
            <FaWhatsapp className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" className="header-social">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer" className="header-social">
            <SiX className="w-6 h-6" />
          </a>
        </nav>

        {/* Hamburger */}
        <button
          ref={burgerRef}
          className="lg:hidden flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border-2 border-gold bg-black/90 shadow-xl hover:scale-110 transition-all duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü"
          style={{ minWidth: 52 }}
        >
          <span className="block w-9 h-1 rounded-full bg-gold mb-1 shadow-lg" />
          <span className="block w-9 h-1 rounded-full bg-gold mb-1 shadow-lg" />
          <span className="block w-9 h-1 rounded-full bg-gold shadow-lg" />
        </button>
        {/* Hamburger açılır menü */}
        {menuOpen && (
          <nav
            ref={menuBoxRef}
            className="fixed right-4 top-24 z-50 bg-[#161616] border-2 border-gold rounded-2xl shadow-2xl animate-fade-in px-6 py-5"
            style={{
              minWidth: 230,
              maxWidth: 320,
            }}
          >
            <div className="flex flex-col gap-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="header-menu-link mb-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/login"
                className="header-btn mt-4"
                onClick={() => setMenuOpen(false)}
              >
                Giriş Yap
              </Link>
              <Link
                href="/register"
                className="header-btn header-btn-outline mt-2"
                onClick={() => setMenuOpen(false)}
              >
                Üye Ol
              </Link>
              <div className="flex items-center gap-2 mt-5 justify-center">
                <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" className="header-social">
                  <FaWhatsapp className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" className="header-social">
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer" className="header-social">
                  <SiX className="w-6 h-6" />
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
      <style jsx>{`
        .header-menu-link {
          color: #eaeaea;
          font-size: 1.13rem; /* 18px + 2px gibi (giriş yap ile eşit) */
          font-weight: 700;
          letter-spacing: .02em;
          padding: 12px 22px;
          border-radius: 11px;
          transition: color 0.16s, background 0.15s;
        }
        .header-menu-link:hover {
          color: #FFD700;
          background: #181818;
        }
        .header-btn {
          background: linear-gradient(90deg, #FFD700 65%, #fff8c0 100%);
          color: #191919;
          font-weight: 900;
          font-size: 1.13rem;
          border-radius: 15px;
          box-shadow: 0 4px 20px 0 rgba(255,215,0,0.14);
          border: none;
          padding: 0.7rem 2.1rem;
          transition: all .18s cubic-bezier(.32,1.56,.68,1.11);
          letter-spacing: .02em;
        }
        .header-btn:hover {
          background: linear-gradient(90deg, #ffe567 20%, #FFD700 90%);
          color: #101010;
          box-shadow: 0 2px 20px 0 rgba(255,215,0,0.18);
          transform: translateY(-2px) scale(1.04);
        }
        .header-btn-outline {
          background: #191919;
          color: #FFD700;
          border: 2px solid #FFD700;
        }
        .header-btn-outline:hover {
          background: linear-gradient(90deg, #FFD700 70%, #fff8c0 100%);
          color: #191919;
          box-shadow: 0 2px 20px 0 rgba(255,215,0,0.22);
        }
        .header-social {
          color: #FFD700;
          border-radius: 50%;
          padding: 8px;
          transition: color 0.15s, box-shadow 0.18s;
        }
        .header-social:hover {
          color: #fff8c0;
          box-shadow: 0 0 12px 3px #FFD70099;
          background: #161616;
        }
        .bg-gold { background: #FFD700; }
        .border-gold { border-color: #FFD700 !important; }
        .animate-fade-in { animation: fadeIn .20s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-16px);} to { opacity: 1; transform: translateY(0);} }
      `}</style>
    </header>
  );
}
