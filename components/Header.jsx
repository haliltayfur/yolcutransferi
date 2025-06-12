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
    if (menuOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <header className="flex items-center justify-between py-3 px-6 bg-white shadow-md w-full z-50">
      {/* LOGO */}
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="YolcuTransferi Logo"
            width={52}
            height={52}
            className="mr-4"
            priority
          />
        </Link>
      </div>

      {/* MENU */}
      <nav className="hidden md:flex gap-2 xl:gap-5 items-center">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-[1.15rem] xl:text-[1.25rem] font-semibold px-5 py-2 rounded-xl transition-all duration-200 hover:bg-[#f6efdb] hover:text-[#735b18]"
            style={{
              fontSize: "1.18rem", // %10 büyütülmüş font
              padding: "0.55rem 1.25rem", // %10 büyütülmüş padding
            }}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Sağ Butonlar */}
      <div className="flex items-center gap-3">
        {/* Giriş ve Üye Ol */}
        <Link href="/giris">
          <button
            className="h-12 px-5 bg-gradient-to-tr from-[#baa25a] to-[#ffe194] text-[#45330a] font-bold rounded-xl border border-[#e0c471] shadow hover:scale-105 hover:from-[#ffe194] hover:to-[#baa25a] transition-all duration-200 text-[1.05rem]"
            style={{ minWidth: "100px", maxHeight: "48px" }}
          >
            Giriş Yap
          </button>
        </Link>
        <Link href="/uye-ol">
          <button
            className="h-12 px-5 bg-gradient-to-tr from-[#baa25a] to-[#ffe194] text-[#45330a] font-bold rounded-xl border border-[#e0c471] shadow hover:scale-105 hover:from-[#ffe194] hover:to-[#baa25a] transition-all duration-200 text-[1.05rem]"
            style={{ minWidth: "100px", maxHeight: "48px" }}
          >
            Üye Ol
          </button>
        </Link>

        {/* Sosyal Medya */}
        <a
          href="https://wa.me/905395267569"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#128C7E] transition"
          style={{ fontSize: 26 }}
        >
          <FaWhatsapp color="white" />
        </a>
        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-[#8a3ab9] via-[#e95950] to-[#fccc63] hover:opacity-80 transition"
          style={{ fontSize: 26 }}
        >
          <FaInstagram color="white" />
        </a>
        <a
          href="https://x.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-black hover:bg-gray-800 transition"
          style={{ fontSize: 26 }}
        >
          <SiX color="white" />
        </a>
      </div>

      {/* Mobile Menu Button */}
      <div
        className="md:hidden flex items-center cursor-pointer ml-4"
        ref={burgerRef}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="w-8 h-1 bg-[#735b18] block mb-1 rounded"></span>
        <span className="w-8 h-1 bg-[#735b18] block mb-1 rounded"></span>
        <span className="w-8 h-1 bg-[#735b18] block rounded"></span>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav
          ref={menuBoxRef}
          className="absolute top-20 right-2 bg-white shadow-lg rounded-xl flex flex-col items-end p-6 gap-4 z-50 w-64"
        >
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-xl font-semibold py-2 w-full text-right hover:text-[#735b18]"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link href="/giris" className="w-full">
            <button
              className="w-full py-2 my-1 bg-gradient-to-tr from-[#baa25a] to-[#ffe194] text-[#45330a] font-bold rounded-xl border border-[#e0c471] shadow hover:scale-105 transition-all duration-200 text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Giriş Yap
            </button>
          </Link>
          <Link href="/uye-ol" className="w-full">
            <button
              className="w-full py-2 my-1 bg-gradient-to-tr from-[#baa25a] to-[#ffe194] text-[#45330a] font-bold rounded-xl border border-[#e0c471] shadow hover:scale-105 transition-all duration-200 text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Üye Ol
            </button>
          </Link>
        </nav>
      )}
    </header>
  );
}
