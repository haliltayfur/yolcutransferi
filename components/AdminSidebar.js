"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEnvelope, FaUsersCog, FaCog, FaUserShield, FaSignOutAlt } from "react-icons/fa";

export default function AdminSidebar({ closeMenu }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(localStorage.getItem("admin_auth") === "ok");
    }
  }, []);

  if (!isLoggedIn) return null;

  function logout() {
    localStorage.removeItem("admin_auth");
    window.location.href = "/admin/login";
  }

  return (
    <nav className="flex flex-col gap-2 py-6 px-2 h-full">
      <Link href="/admin/iletisim" className="flex items-center gap-3 px-4 py-3 hover:bg-[#1a170c] rounded-xl text-lg font-semibold text-[#ffeec2]">
        <FaEnvelope /> İletişim
      </Link>
      <Link href="/admin/kvkk" className="flex items-center gap-3 px-4 py-3 hover:bg-[#1a170c] rounded-xl text-lg font-semibold text-[#ffeec2]">
        <FaUserShield /> KVKK Başvuruları
      </Link>
      <Link href="/admin/uyelikler" className="flex items-center gap-3 px-4 py-3 hover:bg-[#1a170c] rounded-xl text-lg font-semibold text-[#ffeec2]">
        <FaUsersCog /> Üyelikler
      </Link>
      <Link href="/admin/ayarlar" className="flex items-center gap-3 px-4 py-3 hover:bg-[#1a170c] rounded-xl text-lg font-semibold text-[#ffeec2]">
        <FaCog /> Ayarlar
      </Link>
      <button onClick={logout} className="mt-auto px-4 py-3 rounded-xl bg-[#4e170c] hover:bg-[#a32e00] text-white flex items-center gap-3 font-bold">
        <FaSignOutAlt /> Çıkış Yap
      </button>
      {closeMenu && <button onClick={closeMenu} className="mt-2 w-full text-center text-[#bfa658]">Menüyü Kapat</button>}
    </nav>
  );
}
