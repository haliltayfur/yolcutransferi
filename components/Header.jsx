"use client";
import { useState } from "react";
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
  { name: "İletişim", href: "/iletisim" }
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-black/95 shadow z-40 relative">
      {/* --- DESKTOP --- */}
      <div className="hidden md:flex items-center justify-between px-6 py-4 w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/LOGO.png"
            alt="YolcuTransferi.com"
            width={235}
            height={56}
            className="mr-4"
            priority
            style={{ width: "auto", height: 56, maxWidth: 260 }}
          />
        </Link>

        {/* Menü */}
        <nav className="flex gap-4 items-center font-semibold text-lg text-white">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-3 py-1 transition-colors hover:text-[#FFD700] duration-150"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Sos
