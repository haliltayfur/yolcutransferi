"use client";
import { usePathname, useRouter } from "next/navigation";
import { FaChartBar, FaListAlt, FaEnvelope, FaUserShield, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import React from "react";

// Menü yapısı
const menu = [
  { label: "Panel", icon: <FaChartBar />, href: "/admin" },
  { label: "Rezervasyonlar", icon: <FaListAlt />, href: "/admin/rezervasyonlar" },
  { label: "İletişim", icon: <FaEnvelope />, href: "/admin/iletisim" },
  { label: "KVKK Başvuruları", icon: <FaUserShield />, href: "/admin/kvkk" },
  { label: "Üyelikler", icon: <FaUsers />, href: "/admin/uyelikler" },
  { label: "Ayarlar", icon: <FaCog />, href: "/admin/ayarlar" }
];

// Mobil menüyü kapatma desteği için opsiyonel closeMenu fonksiyonu alır
export default function AdminSidebar({ closeMenu }) {
  const pathname = usePathname();
  const router = useRouter();

  // Çıkış yapma fonksiyonu
  const handleLogout = () => {
    // Örneğin: localStorage'dan token sil, veya api/logout çağır...
    if (closeMenu) closeMenu();
    router.push("/login");
  };

  // Menüdeki bir linke tıklanırsa mobilde menüyü kapat
  const handleMenuClick = (href) => {
    if (closeMenu) closeMenu();
    router.push(href);
  };

  return (
    <nav className="flex flex-col h-full py-8 px-3">
      <div className="flex items-center mb-12 ml-1 gap-2">
        <span className="text-2xl font-extrabold text-[#bfa658]">YolcuTransferi</span>
        <span className="bg-[#bfa658]/10 text-[#ffeec2] px-2 py-1 rounded-lg text-xs font-bold">ADMIN</span>
      </div>
      <ul className="flex-1 space-y-2">
        {menu.map(({ label, icon, href }) => (
          <li key={href}>
            {/* 
              - Masaüstünde klasik Link çalışıyor.
              - Mobilde closeMenu varsa, Link yerine buton gibi davranıp router.push ve menü kapatılır.
            */}
            {closeMenu ? (
              <button
                type="button"
                onClick={() => handleMenuClick(href)}
                className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors
                  ${pathname === href
                    ? "bg-[#bfa658]/90 text-black shadow-lg"
                    : "text-[#ffeec2] hover:bg-[#bfa658]/40 hover:text-[#ffeec2]"
                  }`}
              >
                <span className="text-xl">{icon}</span>
                <span className="text-base">{label}</span>
              </button>
            ) : (
              <Link
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors
                  ${pathname === href
                    ? "bg-[#bfa658]/90 text-black shadow-lg"
                    : "text-[#ffeec2] hover:bg-[#bfa658]/40 hover:text-[#ffeec2]"
                  }`}
              >
                <span className="text-xl">{icon}</span>
                <span className="text-base">{label}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-3 rounded-xl text-[#ffeec2] font-semibold bg-gradient-to-r from-[#3a2f13] to-[#bfa658]/60 hover:bg-[#bfa658] hover:text-black transition text-base mt-2"
      >
        <FaSignOutAlt className="text-lg" />
        Çıkış Yap
      </button>
    </nav>
  );
}
