// PATH: /app/admin/layout.js
"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";

export default function AdminLayout({ children }) {
  const [isClient, setIsClient] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // ADMIN YETKİ KONTROLÜ (Burası localStorage ile client'ta çalışmalı)
  const isAdmin = typeof window !== "undefined" && localStorage.getItem("admin_auth") === "ok";
  if (!isAdmin && !path.includes("/admin/login")) {
    if (typeof window !== "undefined") {
      window.location.href = `/admin/login?next=${encodeURIComponent(path)}`;
    }
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-[#19160a] to-[#282314]">
      <header className="w-full py-4 px-6 flex justify-between items-center border-b border-[#bfa658] bg-black/90 shadow z-10 sticky top-0">
        <span className="text-2xl font-extrabold tracking-wide text-[#bfa658]">YolcuTransferi Admin Panel</span>
        <span className="text-[#ffeec2] font-semibold text-lg">Admin</span>
      </header>
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
// PATH: /app/admin/layout.js
