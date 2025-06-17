// ✅ Dosya: components/admin/KvkkUyariButonu.js
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function KvkkUyariButonu() {
  const [yeniVar, setYeniVar] = useState(false);

  useEffect(() => {
    async function kontrolEt() {
      const res = await fetch("/api/kvkk/forms");
      const data = await res.json();

      const sonGorulme = localStorage.getItem("kvkkSonGorulme");
      const sonZaman = sonGorulme ? new Date(sonGorulme) : new Date(0);

      const okunmamis = data.some((form) => {
        const formTarih = new Date(form.createdAt);
        return formTarih > sonZaman;
      });

      setYeniVar(okunmamis);
    }

    kontrolEt();
    const interval = setInterval(kontrolEt, 10000); // 10 saniyede bir kontrol
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    localStorage.setItem("kvkkSonGorulme", new Date().toISOString());
    setYeniVar(false);
  };

  return (
    <Link href="/admin/kvkk" onClick={handleClick}>
      <button
        className={`relative px-4 py-2 rounded-lg font-bold text-white transition-all duration-300
          ${yeniVar ? "bg-red-600 animate-pulse" : "bg-[#6e5a1e] hover:bg-[#8c7327]"}`}
      >
        KVKK Başvuruları
        {yeniVar && (
          <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-yellow-300"></span>
        )}
      </button>
    </Link>
  );
}
