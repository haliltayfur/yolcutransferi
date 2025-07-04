// PATH: /app/admin/layout.js
"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";

export default function AdminLayout({ children }) {
  const [isClient, setIsClient] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Sadece client'ta render edilsin
    return null;
  }

  // ADMIN YETKİ KONTROLÜ (Burası localStorage ile client'ta çalışmalı)
  const isAdmin =
    typeof window !== "undefined" &&
    localStorage.getItem("admin_auth") === "ok";

  // Eğer admin değilse ve login sayfasında değilse login'e yönlendir:
  if (!isAdmin && !path.includes("/admin/login")) {
    if (typeof window !== "undefined") {
      window.location.href = `/admin/login?next=${encodeURIComponent(path)}`;
    }
    return null;
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
// PATH: /app/admin/layout.js
