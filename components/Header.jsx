"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si";

// Menü
const desktopMenu = [
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
    <header className="w-full bg-black backdrop-blur-md shadow-lg z-40 relative border-b border-[#FFD70033]">
      <div className="flex items-center justify-between px-7 lg:px-16 py-2 w-full" style={{ minHeight: 86 }}>
        {/* Logo */}
        <Link href="/" className="flex items-center min-w-0" style={{ height: "76px" }}>
          <Image
            src="/LOGO.png"
            alt="Logo"
            width={185}
            height={76}
            priority
            style={{
              width: "auto",
              height: "54px",
              maxHeight: "76px",
              objectFit: "contain"
            }}
          />
        </Link>
        {/* Menü */}
        <nav className="flex items-center gap-2 flex-shrink-0 ml-6">
          {desktopMenu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="header-menu-link"
            >
              {item.name}
            </Link>
          ))}
          {/* Hamburger */}
          <button
            ref={burgerRef}
            className="flex flex-col gap-1 p-2 rounded-lg border border-gold bg-black/70 ml-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü"
          >
            <span className="block w-6 h-0.5 bg-gold rounded"></span>
            <span className="block w-6 h-0.5 bg-gold rounded"></span>
            <span className="block w-6 h-0.5 bg-gold rounded"></span>
          </button>
        </nav>
        {/* Sağda giriş/üye ol + sosyal */}
        <div className="flex items-center gap-3 ml-3">
          <Link
            href="/login"
            className="header-btn"
          >
            Giriş Yap
          </Link>
          <Link
            href="/register"
            className="header-btn header-btn-outline"
          >
            Üye Ol
          </Link>
          <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" className="header-social">
            <FaWhatsapp className="w-7 h-7" />
          </a>
          <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" className="header-social">
            <FaInstagram className="w-7 h-7" />
          </a>
          <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer" className="header-social">
            <SiX className="w-7 h-7" />
          </a>
        </div>
      </div>
      <style jsx>{`
        .header-menu-link {
          color: #eaeaea;
          font-size: 18.5px;
          font-weight: 700;
          letter-spacing: .01em;
          padding: 10px 16px;
          border-radius: 10px;
          transition: color 0.18s, background 0.18s;
          margin-right: 4px;
        }
        .header-menu-link:hover {
          color: #FFD700;
          background: #1a1a1a;
        }
        .header-btn {
          background: linear-gradient(90deg, #FFD700 60%, #fff7be 100%);
          color: #181818;
          font-weight: 800;
          font-size: 1.05rem;
          border-radius: 14px;
          box-shadow: 0 3px 14px 0 rgba(255,215,0,0.12);
          border: none;
          padding: 0.48rem 1.26rem;
          transition: all .17s cubic-bezier(.32,1.56,.68,1.11);
          letter-spacing: .01em;
        }
        .header-btn:hover {
          background: linear-gradient(90deg, #fff7be 10%, #FFD700 100%);
          color: #191919;
          box-shadow: 0 2px 16px 0 rgba(255,215,0,0.22);
        }
        .header-btn-outline {
          background: #191919;
          color: #FFD700;
          border: 2px solid #FFD700;
        }
        .header-btn-outline:hover {
          background: linear-gradient(90deg, #FFD700 70%, #fff8c0 100%);
          color: #191919;
        }
        .header-social {
          color: #FFD700;
          border-radius: 50%;
          padding: 7px;
          transition: box-shadow 0.18s, color 0.15s;
        }
        .header-social:hover {
          color: #fff8c0;
          box-shadow: 0 0 12px 3px #FFD70077;
          background: #161616;
        }
        .bg-gold { background: #FFD700; }
        .border-gold { border-color: #FFD700 !important; }
      `}</style>
    </header>
  );
}
