"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaEnvelope, FaUser, FaFileAlt, FaChartLine, FaUsers, FaCogs, FaSignOutAlt } from "react-icons/fa";

export default function AdminSidebar({ closeMenu }) {
  const pathname = usePathname();

  // Çıkış (Logout) fonksiyonu
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_auth");
      window.location.href = "/admin/login";
    }
    if (closeMenu) closeMenu();
  };

  return (
    <nav className="flex flex-col gap-1 h-full p-4">
      <Link href="/admin" className={`flex items-center gap-3 px-4 py-2 rounded font-bold text-lg ${pathname === "/admin" ? "bg-[#bfa658]/30 text-[#FFD700]" : "text-[#ffeec2] hover:bg-[#bfa658]/20"}`}>
        <FaChartLine /> Panel
      </Link>
      <Link href="/admin/rezervasyonlar" className={`flex items-center gap-3 px-4 py-2 rounded font-bold text-lg ${pathname.includes("rezervasyonlar") ? "bg-[#bfa658]/30 text-[#FFD700]" : "text-[#ffeec2] hover:bg-[#bfa658]/20"}`}>
        <FaFileAlt /> Rezervasyonlar
      </Link>
      <Link href="/admin/iletisim" className={`flex items-center gap-3 px-4 py-2 rounded font-bold text-lg ${pathname.includes("iletisim") ? "bg-[#bfa658]/30 text-[#FFD700]" : "text-[#ffeec2] hover:bg-[#bfa658]/20"}`}>
        <FaEnvelope /> İletişim
      </Link>
      <Link href="/admin/kvkk" className={`flex items-center gap-3 px-4 py-2 rounded font-bold text-lg ${pathname.includes("kvkk") ? "bg-[#bfa658]/30 text-[#FFD700]" : "text-[#ffeec2] hover:bg-[#bfa658]/20"}`}>
        <FaFileAlt /> KVKK Başvuruları
      </Link>
      <Link href="/admin/uyelikler" className={`flex items-center gap-3 px-4 py-2 rounded font-bold text-lg ${pathname.includes("uyelik") ? "bg-[#bfa658]/30 text-[#FFD700]" : "text-[#ffeec2] hover:bg-[#bfa658]/20"}`}>
        <FaUsers /> Üyelikler
      </Link>
      <Link href="/admin/ayarlar" className={`flex items-center gap-3 px-4 py-2 rounded font-bold text-lg ${pathname.includes("ayarlar") ? "bg-[#bfa658]/30 text-[#FFD700]" : "text-[#ffeec2] hover:bg-[#bfa658]/20"}`}>
        <FaCogs /> Ayarlar
      </Link>

      {/* Çıkış Butonu */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 mt-auto px-4 py-2 rounded font-bold text-lg bg-[#bfa658]/30 text-[#c62a2a] hover:bg-[#FFD700] hover:text-black transition w-full"
        style={{ marginTop: "auto" }}
      >
        <FaSignOutAlt /> Çıkış Yap
      </button>
    </nav>
  );
}
