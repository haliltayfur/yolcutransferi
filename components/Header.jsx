// PATH: /components/Header.jsx
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
  const [user, setUser] = useState(null);
  const burgerRef = useRef(null);
  const menuBoxRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const admin = localStorage.getItem("admin_auth") === "ok";
      if (admin) {
        setUser({
          ad: "Halil",
          soyad: "Tayfur",
          email: "byhaliltayfur@hotmail.com",
          telefon: "5395267569",
          tip: "admin",
        });
      } else {
        const u = localStorage.getItem("user") || localStorage.getItem("uye_bilgi");
        setUser(u ? JSON.parse(u) : null);
      }
    }
  }, []);

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

  function getUserName(u) {
    if (!u) return "Üye";
    return u.ad || u.isim || u.name || u.adsoyad || u.soyad || "Üye";
  }

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("uye_bilgi");
    localStorage.removeItem("admin_auth");
    window.location.href = "/";
  }

  return (
    <header className="w-full bg-black shadow-2xl z-40 border-b border-[#FFD70044]">
      <div className="flex items-center justify-between px-8 lg:px-20 py-2 w-full" style={{ minHeight: 90 }}>
        <Link href="/" className="flex items-center min-w-0" style={{ height: "80px" }}>
          <Image
            src="/LOGO.png"
            alt="Logo"
            width={260}
            height={80}
            priority
            style={{
              width: "auto",
              height: "80px",
              maxHeight: "80px",
              objectFit: "contain"
            }}
          />
        </Link>
        <nav className="hidden lg:flex flex-1 justify-center items-center">
          <div className="flex items-center gap-[28px]">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="header-nav-link"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        <div className="hidden lg:flex items-center gap-3 ml-5">
          {!user ? (
            <>
              <Link href="/login" className="header-btn-outline">
                Giriş Yap
              </Link>
              <Link href="/register" className="header-btn">
                Üye Ol
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#FFD700] text-lg">
                Hoşgeldin, {getUserName(user)}
              </span>
              <Link href="/profil">
                <Image
                  src={user.fotoUrl || "/default-user.png"}
                  alt="Profil"
                  width={46}
                  height={46}
                  className="rounded-full border-2 border-[#FFD700] shadow-md hover:scale-110 cursor-pointer"
                  style={{ objectFit: "cover" }}
                />
              </Link>
              <button className="header-btn-outline ml-3" onClick={handleLogout}>
                Çıkış Yap
              </button>
            </div>
          )}
          <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" className="header-social ml-2">
            <FaWhatsapp className="w-7 h-7" />
          </a>
          <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" className="header-social">
            <FaInstagram className="w-7 h-7" />
          </a>
          <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer" className="header-social">
            <SiX className="w-7 h-7" />
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
              minWidth: 210,
              maxWidth: 340,
            }}
          >
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="header-nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="header-btn-outline mt-6"
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
                </>
              ) : (
                <>
                  <Link
                    href="/profil"
                    className="header-btn mt-3 flex gap-2 items-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>Profilim</span>
                    <Image
                      src={user.fotoUrl || "/default-user.png"}
                      alt="Profil"
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-[#FFD700] ml-1"
                      style={{ objectFit: "cover" }}
                    />
                  </Link>
                  <button className="header-btn-outline mt-3" onClick={() => { setMenuOpen(false); handleLogout(); }}>
                    Çıkış Yap
                  </button>
                </>
              )}
              <div className="flex items-center gap-2 mt-7 justify-center">
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
          </nav>
        )}
      </div>
      <style jsx>{`
        .header-nav-link {
          color: #fff;
          font-size: 1.22rem;
          font-weight: 700;
          letter-spacing: .025em;
          padding: 10px 0;
          border-radius: 10px;
          transition: color 0.14s, background 0.14s;
        }
        .header-nav-link:hover {
          color: #FFD700;
          background: #1a1a1a;
        }
        .header-btn {
          background: linear-gradient(90deg, #FFD700 80%, #fffbe6 100%);
          color: #191919;
          font-weight: 900;
          font-size: 1.15rem;
          border-radius: 15px;
          border: 2px solid #FFD700;
          padding: 0.63rem 1.85rem;
          box-shadow: 0 2px 10px 0 rgba(255,215,0,0.12);
          transition: all .15s;
          margin-left: 5px;
          height: 48px;
          display: flex; align-items: center;
        }
        .header-btn:hover {
          background: linear-gradient(90deg, #fffbe6 10%, #FFD700 100%);
          color: #101010;
          box-shadow: 0 2px 13px 0 rgba(255,215,0,0.17);
          transform: translateY(-1px) scale(1.07);
        }
        .header-btn-outline {
          background: transparent;
          color: #FFD700;
          border: 2px solid #FFD700;
          font-weight: 900;
          font-size: 1.15rem;
          border-radius: 15px;
          padding: 0.63rem 1.85rem;
          box-shadow: 0 2px 8px 0 rgba(255,215,0,0.10);
          margin-left: 3px;
          transition: all .14s;
          height: 48px;
          display: flex; align-items: center;
        }
        .header-btn-outline:hover {
          background: linear-gradient(90deg, #FFD700 85%, #fff8c0 100%);
          color: #191919;
          box-shadow: 0 2px 12px 0 rgba(255,215,0,0.16);
        }
        .header-social {
          color: #FFD700;
          border-radius: 50%;
          padding: 7px;
          transition: color 0.15s, box-shadow 0.16s;
          font-size: 1.7rem;
          height: 48px; width: 48px;
          display: flex; align-items: center; justify-content: center;
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
// PATH: /components/Header.jsx
