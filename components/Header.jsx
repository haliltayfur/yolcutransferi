"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si";

// Menü başlıkları
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

  // Hamburger açılır menü kapatma
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
      <div className="flex items-center justify-between px-7 lg:px-20 py-2 w-full" style={{ minHeight: 100 }}>
        {/* Logo */}
        <Link href="/" className="flex items-center min-w-0" style={{ height: "96px" }}>
          <Image
            src="/LOGO.png"
            alt="Logo"
            width={270} // Kendi logonun width'i neyse onu KÜÇÜLTME!
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

        {/* Menü - ortalanmış ve büyütülmüş */}
        <nav className="hidden lg:flex flex-1 justify-center items-center">
          <div className="flex items-center gap-[36px]"> {/* klasik 30px ise %20 arttırdık */}
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="header-menu-link"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Giriş/Üye Ol Butonları ve Sosyal */}
        <div className="hidden lg:flex items-center gap-3 ml-6">
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
          className="lg:hidden flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border-2 border-gold bg-black/90 shadow-xl hover:scale-110 transition-all duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü"
          style={{ minWidth: 52 }}
        >
          <span className="block w-9 h-1.5 rounded-full bg-gold mb-1 shadow-lg" />
          <span className="block w-9 h-1.5 rounded-full bg-gold mb-1 shadow-lg" />
          <span className="block w-9 h-1.5 rounded-full bg-gold shadow-lg" />
        </button>
        {menuOpen && (
          <nav
            ref={menuBoxRef}
            className="fixed right-4 top-24 z-50 bg-[#161616] border-2 border-gold rounded-2xl shadow-2xl animate-fade-in px-7 py-6"
            style={{
              minWidth: 250,
              maxWidth: 350,
            }}
          >
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="header-menu-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/login"
                className="header-btn mt-6"
                onClick={() => setMenuOpen(false)}
              >
                Giriş Yap
              </Link>
              <Link
                href="/register"
                className="header-btn header-btn-outline mt-3"
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
        .header-menu-link {
          color: #eaeaea;
          font-size: 1.37rem;  /* %20 büyütülmüş */
          font-weight: 700;
          letter-spacing: .03em;
          padding: 13px 0;
          border-radius: 10px;
          transition: color 0.16s, background 0.15s;
        }
        .header-menu-link:hover {
          color: #FFD700;
          background: #191919;
        }
        .header-btn {
          background: linear-gradient(90deg, #E5C100 65%, #FFD700 100%);
          color: #191919;
          font-weight: 900;
          font-size: 1.09rem;
          border-radius: 15px;
          box-shadow: 0 3px 18px 0 rgba(255,215,0,0.13);
          border: none;
          padding: 0.62rem 1.55rem;
          transition: all .18s cubic-bezier(.32,1.56,.68,1.11);
          letter-spacing: .02em;
        }
        .header-btn:hover {
          background: linear-gradient(90deg, #FFD700 10%, #E5C100 100%);
          color: #101010;
          box-shadow: 0 2px 16px 0 rgba(255,215,0,0.19);
          transform: translateY(-1px) scale(1.03);
        }
        .header-btn-outline {
          background: #191919;
          color: #FFD700;
          border: 2px solid #FFD700;
        }
        .header-btn-outline:hover {
          background: linear-gradient(90deg, #FFD700 80%, #fff8c0 100%);
          color: #191919;
        }
        .header-social {
          color: #FFD700;
          border-radius: 50%;
          padding: 7px;
          transition: color 0.15s, box-shadow 0.18s;
        }
        .header-social:hover {
          color: #fff8c0;
          box-shadow: 0 0 11px 2px #FFD70099;
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
