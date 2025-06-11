"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si";

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
  const burgerRef = useRef(null);
  const menuBoxRef = useRef(null);

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
    <header className="w-full bg-black shadow-2xl z-40 border-b border-[#FFD70044]">
      <div className="flex items-center justify-between px-7 lg:px-20 py-1 w-full" style={{ minHeight: 70 }}>
        {/* Logo */}
        <Link href="/" className="flex items-center min-w-0" style={{ height: "60px" }}>
          <Image
            src="/LOGO.png"
            alt="Logo"
            width={180}
            height={60}
            priority
            style={{
              width: "auto",
              height: "60px",
              maxHeight: "60px",
              objectFit: "contain"
            }}
          />
        </Link>
        {/* Menü - hepsi buton gibi aynı font ve style */}
        <nav className="hidden lg:flex flex-1 justify-center items-center">
          <div className="flex items-center gap-[22px]">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="header-nav-btn"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        {/* Giriş/Üye Ol Butonları ve Sosyal */}
        <div className="hidden lg:flex items-center gap-2 ml-5">
          <Link
            href="/login"
            className="header-btn header-btn-outline"
          >
            Giriş Yap
          </Link>
          <Link
            href="/register"
            className="header-btn"
          >
            Üye Ol
          </Link>
          <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" className="header-social ml-1">
            <FaWhatsapp className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" className="header-social">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer" className="header-social">
            <SiX className="w-6 h-6" />
          </a>
        </div>
        {/* Hamburger - sadece mobilde */}
        <button
          ref={burgerRef}
          className="lg:hidden flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl border-2 border-gold bg-black/90 shadow-xl hover:scale-110 transition-all duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü"
          style={{ minWidth: 48 }}
        >
          <span className="block w-8 h-1.5 rounded-full bg-gold mb-1 shadow-lg" />
          <span className="block w-8 h-1.5 rounded-full bg-gold mb-1 shadow-lg" />
          <span className="block w-8 h-1.5 rounded-full bg-gold shadow-lg" />
        </button>
        {menuOpen && (
          <nav
            ref={menuBoxRef}
            className="fixed right-4 top-20 z-50 bg-[#161616] border-2 border-gold rounded-2xl shadow-2xl animate-fade-in px-7 py-6"
            style={{
              minWidth: 210,
              maxWidth: 340,
            }}
          >
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="header-nav-btn"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/login"
                className="header-btn header-btn-outline mt-6"
                onClick={() => setMenuOpen(false)}
              >
                Giriş Yap
              </Link>
              <Link
                href="/register"
                className="header-btn mt-3"
                onClick={() => setMenuOpen(false)}
              >
                Üye Ol
              </Link>
              <div className="flex items-center gap-2 mt-7 justify-center">
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
        .header-nav-btn {
          background: none;
          color: #FFD700;
          font-size: 1.10rem;
          font-weight: 800;
          padding: 8px 18px;
          border-radius: 11px;
          transition: color 0.13s, background 0.13s, box-shadow 0.14s;
          border: 2px solid transparent;
          letter-spacing: .025em;
        }
        .header-nav-btn:hover, .header-nav-btn:focus {
          background: #222;
          color: #fffbe6;
          border-color: #FFD700;
          box-shadow: 0 0 0 2px #FFD70055;
        }
        .header-btn {
          background: linear-gradient(90deg, #FFD700 80%, #fffbe6 100%);
          color: #191919;
          font-weight: 900;
          font-size: 1.11rem;
          border-radius: 15px;
          border: 2px solid #FFD700;
          padding: 0.5rem 1.7rem;
          box-shadow: 0 2px 9px 0 rgba(255,215,0,0.11);
          transition: all .15s;
          margin-left: 2px;
        }
        .header-btn:hover {
          background: linear-gradient(90deg, #fffbe6 10%, #FFD700 100%);
          color: #101010;
          box-shadow: 0 2px 11px 0 rgba(255,215,0,0.15);
          transform: translateY(-1px) scale(1.045);
        }
        .header-btn-outline {
          background: transparent;
          color: #FFD700;
          border: 2px solid #FFD700;
        }
        .header-btn-outline:hover {
          background: linear-gradient(90deg, #FFD700 85%, #fff8c0 100%);
          color: #191919;
          box-shadow: 0 2px 13px 0 rgba(255,215,0,0.16);
        }
        .header-social {
          color: #FFD700;
          border-radius: 50%;
          padding: 6px;
          transition: color 0.15s, box-shadow 0.16s;
        }
        .header-social:hover {
          color: #fff8c0;
          box-shadow: 0 0 10px 2px #FFD70099;
          background: #161616;
        }
        .bg-gold { background: #FFD700; }
        .border-gold { border-color: #FFD700 !important; }
        .animate-fade-in { animation: fadeIn .16s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-12px);} to { opacity: 1; transform: translateY(0);} }
      `}</style>
    </header>
  );
}
