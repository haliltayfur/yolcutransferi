// app/admin/rezervasyonlar/page.js
"use client";
import { useEffect, useState, useRef } from "react";

function RezervasyonDetayPopup({ item, onClose, onSoftDelete, onHardDelete }) {
  // ... aynı popup kodun kalıyor ...
  // (Bir önceki mesajdaki gibi)
}

export default function AdminRezervasyonlarPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showPopup, setShowPopup] = useState(false);
  const [selected, setSelected] = useState(null);
  const selectedRef = useRef(null);

  // Listeyi getir
  function fetchData() {
    fetch("/api/admin/rezervasyonlar")
      .then(r => r.json())
      .then(d => {
        setList(d.items || []);
        setLoading(false);

        // Eğer popup açık ve seçili bir kayıt varsa, bu kaydın en güncel halini tekrar bul.
        if (showPopup && selectedRef.current) {
          const updated = (d.items || []).find(x => x._id === selectedRef.current._id);
          if (updated) setSelected(updated);
        }
      });
  }

  useEffect(() => {
    fetchData();
    const intv = setInterval(fetchData, 7000); // 7 sn'de bir fetch
    return () => clearInterval(intv);
  }, []);

  // Popup açıldığında, referansa seçili kaydı yaz
  useEffect(() => {
    if (showPopup && selected) selectedRef.current = selected;
    if (!showPopup) selectedRef.current = null;
  }, [showPopup, selected]);

  // Kaldır (soft delete)
  async function handleSoftDelete(item) {
    await fetch("/api/admin/rezervasyonlar", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: item._id, action: "softDelete" }),
    });
    fetchData();
    setShowPopup(false);
  }

  // Sil (hard delete)
  async function handleHardDelete(item) {
    if (!window.confirm("KALICI olarak silinsin mi? Geri alınamaz!")) return;
    await fetch("/api/admin/rezervasyonlar", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: item._id }),
    });
    fetchData();
    setShowPopup(false);
  }

  const filtered = list.filter(item => {
    if (filter === "all") return !item.kaldirildi;
    if (filter === "paid") return item.status === "Ödeme Yapıldı" && !item.kaldirildi;
    if (filter === "cancelled") return item.status === "İptal" && !item.kaldirildi;
    if (filter === "removed") return item.kaldirildi;
    return true;
  });

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-black/30 py-8">
      <section className="w-full max-w-6xl bg-black/80 rounded-2xl shadow-lg px-8 py-10 border border-gold">
        <h1 className="text-2xl font-bold text-gold mb-6 text-center">Rezervasyon Talepleri</h1>
        <div className="flex gap-3 mb-6">
          <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded font-bold ${filter === "all" ? "bg-gold text-black" : "bg-gray-700 text-white"}`}>Tümü</button>
          <button onClick={() => setFilter("paid")} className={`px-4 py-2 rounded font-bold ${filter === "paid" ? "bg-gold text-black" : "bg-gray-700 text-white"}`}>Ödeme Yapmış</button>
          <button onClick={() => setFilter("cancelled")} className={`px-4 py-2 rounded font-bold ${filter === "cancelled" ? "bg-gold text-black" : "bg-gray-700 text-white"}`}>Vazgeçilen</button>
          <button onClick={() => setFilter("removed")} className={`px-4 py-2 rounded font-bold ${filter === "removed" ? "bg-gold text-black" : "bg-gray-700 text-white"}`}>Kaldırılanlar</button>
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
                  <th className="py-2 px-2">Telefon</th>
                  <th className="py-2 px-2">E-posta</th>
                  <th className="py-2 px-2">Segment</th>
                  <th className="py-2 px-2">Transfer Türü</th>
                  <th className="py-2 px-2">Araç</th>
                  <th className="py-2 px-2">Nereden</th>
                  <th className="py-2 px-2">Nereye</th>
                  <th className="py-2 px-2">Tutar</th>
                  <th className="py-2 px-2">Durum</th>
                  <th className="py-2 px-2">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r._id || i} className={`border-b border-gold/30 ${r.kaldirildi ? "bg-gray-200 text-gray-400" : ""}`}>
                    <td className="py-2 px-2">{r.createdAt ? new Date(r.createdAt).toLocaleString("tr-TR") : "-"}</td>
                    <td className="py-2 px-2">{r.name} {r.surname}</td>
                    <td className="py-2 px-2">{r.phone}</td>
                    <td className="py-2 px-2">{r.email || "-"}</td>
                    <td className="py-2 px-2">{r.segment || "-"}</td>
                    <td className="py-2 px-2">{r.transfer || "-"}</td>
                    <td className="py-2 px-2">{r.vehicle || "-"}</td>
                    <td className="py-2 px-2">{r.from}</td>
                    <td className="py-2 px-2">{r.to}</td>
                    <td className="py-2 px-2 font-semibold">{r.summary?.toplam?.toLocaleString()} ₺</td>
                    <td className="py-2 px-2">{r.status || "-"}</td>
                    <td className="py-2 px-2">
                      <button
                        className="bg-[#bfa658] text-black rounded px-3 py-1 font-bold hover:bg-[#ffeec2] mr-2"
                        onClick={() => { setSelected(r); setShowPopup(true); }}>
                        Oku
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showPopup && selected &&
          <RezervasyonDetayPopup
            item={selected}
            onClose={() => setShowPopup(false)}
            onSoftDelete={handleSoftDelete}
            onHardDelete={handleHardDelete}
          />
        }
      </section>
    </main>
  );
}
// app/admin/rezervasyonlar/page.js
