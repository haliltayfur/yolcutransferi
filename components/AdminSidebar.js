// components/AdminSidebar.js
import { usePathname, useRouter } from "next/navigation";
import { FaChartBar, FaListAlt, FaEnvelope, FaUserShield, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import React from "react";

const menu = [
  { label: "Panel", icon: <FaChartBar />, href: "/admin" },
  { label: "Rezervasyonlar", icon: <FaListAlt />, href: "/admin/rezervasyonlar" },
  { label: "İletişim", icon: <FaEnvelope />, href: "/admin/iletisim" },
  { label: "KVKK Başvuruları", icon: <FaUserShield />, href: "/admin/kvkk" },
  { label: "Üyelikler", icon: <FaUsers />, href: "/admin/uyelikler" },
  { label: "Ayarlar", icon: <FaCog />, href: "/admin/ayarlar" }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // Çıkış yapma fonksiyonu (gerekirse logout endpointi eklersin)
  const handleLogout = () => {
    // logout işlemi (örn: token sil, yönlendir vs.)
    router.push("/login");
  };

  return (
    <nav className="flex flex-col h-full py-8 px-3">
      <Link href="/admin" className="flex items-center mb-12 ml-1 gap-2">
        <span className="text-2xl font-extrabold text-[#bfa658]">YolcuTransferi</span>
        <span className="bg-[#bfa658]/10 text-[#ffeec2] px-2 py-1 rounded-lg text-xs font-bold">ADMIN</span>
      </Link>
      <ul className="flex-1 space-y-2">
        {menu.map(({ label, icon, href }) => (
          <li key={href}>
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
          </li>
        ))}
      </ul>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-3 rounded-xl text-[#ffeec2] font-semibold bg-gradient-to-r from-[#3a2f13] to-[#bfa658]/60 hover:bg-[#bfa658] hove
