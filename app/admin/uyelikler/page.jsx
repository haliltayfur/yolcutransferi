//app/admin/uyelikler/page.jsx
"use client";
import { useEffect, useState } from "react";

export default function UyeliklerPage() {
  const [uyeler, setUyeler] = useState([]);
  const [tip, setTip] = useState("hepsi");

  useEffect(() => {
    fetch("/api/uyelikler")
      .then(res => res.json())
      .then(data => setUyeler(data.items || []));
  }, []);

  const filtreliUyeler = tip === "hepsi" ? uyeler : uyeler.filter(u => u.tip === tip);

  return (
    <main className="max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-8">Üyelikler</h1>
      <div className="mb-6 flex gap-4">
        <select className="border rounded px-3 py-2" value={tip} onChange={e => setTip(e.target.value)}>
          <option value="hepsi">Hepsi</option>
          <option value="musteri">Müşteri</option>
          <option value="sofor">Araçlı Şoför</option>
          <option value="firma">Firma</option>
          <option value="isbirligi">İş Birliği</option>
        </select>
        <span className="ml-4 font-semibold text-[#ffeec2]">{filtreliUyeler.length} üye bulundu.</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtreliUyeler.map((u, i) => (
          <div key={i} className="bg-black/80 border-2 border-[#bfa658] rounded-xl p-4">
            <div className="font-bold text-lg text-[#bfa658]">{u.ad} {u.soyad}</div>
            <div className="text-[#ffeec2]">Tip: {u.tip}</div>
            <div className="text-[#ffeec2]">E-posta: {u.email}</div>
            <div className="text-[#ffeec2]">Telefon: {u.telefon}</div>
            <div className="text-[#ffeec2]">İl: {u.il}</div>
            <div className="text-[#ffeec2]">Kayıt: {u.createdAt ? u.createdAt.slice(0, 10) : ""}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
//app/admin/uyelikler/page.jsx
