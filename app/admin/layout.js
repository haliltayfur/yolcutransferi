// app/admin/layout.js
"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { FaBars } from "react-icons/fa";
import { useState, useRef } from "react";

// Basit admin giriş koruması (sadece layoutta!)
// Eğer giriş yapılmamışsa, sadece login sayfası hariç yönlendirir
function useAdminAuth() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isAuth = localStorage.getItem("admin_auth") === "ok";
    if (!isAuth && !pathname.startsWith("/admin/login")) {
      router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [router, pathname]);
}

export default function AdminLayout({ children }) {
  useAdminAuth();

  const [mobileMenu, setMobileMenu] = useState(false);
  const mobileMenuRef = useRef();

  useEffect(() => {
    if (mobileMenu) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenu]);

  useEffect(() => {
    function handleClick(e) {
      if (mobileMenu && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenu(false);
      }
    }
    if (mobileMenu) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileMenu]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-[#19160a] to-[#282314]">
      <aside className="hidden md:flex flex-col w-64 bg-black/95 border-r border-[#bfa658] shadow-2xl fixed inset-y-0 left-0 z-30">
        <AdminSidebar />
      </aside>
      <button
        className="md:hidden fixed top-4 left-4 z-40 bg-black/90 border-2 border-[#bfa658] rounded-xl p-3 shadow-xl text-[#bfa658] active:scale-95 transition"
        aria-label="Menüyü Aç"
        onClick={() => setMobileMenu(true)}
      >
        <FaBars size={26} />
      </button>
      {mobileMenu && (
        <div className="fixed inset-0 z-50 flex">
          <nav
            ref={mobileMenuRef}
            className="w-72 bg-black/95 border-r border-[#bfa658] shadow-2xl flex flex-col h-full p-0 animate-slidein"
            style={{ minWidth: "240px" }}
          >
            <AdminSidebar closeMenu={() => setMobileMenu(false)} />
          </nav>
          <div
            className="flex-1 bg-black/60"
            onClick={() => setMobileMenu(false)}
          ></div>
        </div>
      )}
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
// app/admin/layout.js
