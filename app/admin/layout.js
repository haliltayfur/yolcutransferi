// /app/admin/layout.js
"use client";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";

export default function AdminLayout({ children }) {
  const [yetkili, setYetkili] = useState(null);
  const path = usePathname();

  useEffect(() => {
    // useAdminAuth hook: yetkili yoksa login'e yönlendirir, varsa true döner
    useAdminAuth(setYetkili);
  }, []);

  // Sadece giriş yapmışsa render et!
  if (yetkili === false && !path.includes("/admin/login")) {
    return null; // veya bir loading ekranı!
  }
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-[#19160a] to-[#282314]">
      <aside className="hidden md:flex flex-col w-64 bg-black/95 border-r border-[#bfa658] shadow-2xl fixed inset-y-0 left-0 z-30">
        <AdminSidebar />
      </aside>
      <button className="md:hidden fixed top-4 left-4 z-40 bg-black/90 border-2 border-[#bfa658] rounded-xl p-3 shadow-xl text-[#bfa658] active:scale-95 transition" aria-label="Menüyü Aç">
        <FaBars size={26} />
      </button>
      <div className="flex flex-col flex-1 md:ml-64 min-h-screen">
        <header className="w-full py-4 px-6 flex justify-between items-center border-b border-[#bfa658] bg-black/90 shadow z-10 sticky top-0">
          <span className="text-2xl font-extrabold tracking-wide text-[#bfa658]">YolcuTransferi Admin Panel</span>
          <span className="text-[#ffeec2] font-semibold text-lg hidden md:block">Admin</span>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
      <style jsx global>{`
        @keyframes slidein { from { transform: translateX(-110%);} to { transform: translateX(0);} }
        .animate-slidein { animation: slidein 0.24s cubic-bezier(0.4,0,0.2,1);}
      `}</style>
    </div>
  );
}
// /app/admin/layout.js
