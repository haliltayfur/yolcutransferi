"use client";
import { useEffect, useState } from "react";

export default function AdminRezervasyonlarPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/admin/rezervasyonlar")
      .then(r => r.json())
      .then(d => { setList(d.items || []); setLoading(false); });
  }, []);

  // Filtreleme
  const filtered = list.filter(item => {
    if (filter === "all") return true;
    if (filter === "paid") return item.status === "Ödeme Yapıldı";
    if (filter === "cancelled") return item.status === "İptal";
    return true;
  });

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-black/30 py-8">
      <section className="w-full max-w-5xl bg-black/80 rounded-2xl shadow-lg px-8 py-10 border border-gold">
        <h1 className="text-2xl font-bold text-gold mb-6 text-center">Rezervasyon Talepleri</h1>
        <div className="flex gap-3 mb-6">
          <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded font-bold ${filter === "all" ? "bg-gold text-black" : "bg-gray-700 text-white"}`}>Tümü</button>
          <button onClick={() => setFilter("paid")} className={`px-4 py-2 rounded font-bold ${filter === "paid" ? "bg-gold text-black" : "bg-gray-700 text-white"}`}>Ödeme Yapmış</button>
          <button onClick={() => setFilter("cancelled")} className={`px-4 py-2 rounded font-bold ${filter === "cancelled" ? "bg-gold text-black" : "bg-gray-700 text-white"}`}>Vazgeçilen</button>
        </div>
        {loading ? (
          <div className="text-center text-gold">Yükleniyor...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gold text-black">
                  <th className="py-2 px-2">Tarih</th>
                  <th className="py-2 px-2">Ad Soyad</th>
                  <th className="py-2 px-2">Nereden</th>
                  <th className="py-2 px-2">Nereye</th>
                  <th className="py-2 px-2">Telefon</th>
                  <th className="py-2 px-2">E-posta</th>
                  <th className="py-2 px-2">Durum</th>
                  <th className="py-2 px-2">Not</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r._id || i} className="border-b border-gold/30">
                    <td className="py-2 px-2">{r.createdAt ? new Date(r.createdAt).toLocaleString("tr-TR") : "-"}</td>
                    <td className="py-2 px-2">{r.ad} {r.soyad}</td>
                    <td className="py-2 px-2">{r.from}</td>
                    <td className="py-2 px-2">{r.to}</td>
                    <td className="py-2 px-2">{r.telefon}</td>
                    <td className="py-2 px-2">{r.email}</td>
                    <td className="py-2 px-2">{r.status || "-"}</td>
                    <td className="py-2 px-2">{r.note || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
