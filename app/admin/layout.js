// app/admin/layout.js
"use client";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-[#19160a] to-[#282314]">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-black/95 border-r border-[#bfa658] shadow-2xl fixed inset-y-0 left-0 z-30">
        <AdminSidebar />
      </aside>
      {/* Mobile Sidebar (Burger açılır, ekstra component ile açabilirsin) */}
      {/* <MobileSidebar /> */}
      {/* Main content */}
      <div className="flex flex-col flex-1 md:ml-64 min-h-screen">
        <header className="w-full py-4 px-6 flex justify-between items-center border-b border-[#bfa658] bg-black/90 shadow z-10 sticky top-0">
          <span className="text-2xl font-extrabold tracking-wide text-[#bfa658]">YolcuTransferi Admin Panel</span>
          {/* Buraya kullanıcı adı/avatar ekleyebilirsin */}
          <span className="text-[#ffeec2] font-semibold text-lg hidden md:block">Admin</span>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
