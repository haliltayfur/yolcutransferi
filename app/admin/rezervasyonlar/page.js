// app/admin/rezervasyonlar/page.js
"use client";
import { useEffect, useState, useRef } from "react";

// Detaylı popup
function RezervasyonDetayPopup({ item, onClose }) {
  if (!item) return null;

  // Ekstralar detay tablosu
  let extrasTable = null;
  if (Array.isArray(item.selectedExtras) && item.selectedExtras.length > 0) {
    extrasTable = (
      <table className="w-full mb-2 text-xs border border-[#bfa658] rounded">
        <thead>
          <tr className="bg-[#bfa658] text-black">
            <th className="p-1">Ekstra</th>
            <th className="p-1">Adet</th>
            <th className="p-1">Birim Fiyat</th>
            <th className="p-1">Toplam</th>
          </tr>
        </thead>
        <tbody>
          {item.selectedExtras.map(e => (
            <tr key={e.key} className="text-[#19160a]">
              <td className="p-1">{e.label || e.key}</td>
              <td className="p-1">{item.extrasQty?.[e.key] || 1}</td>
              <td className="p-1">{e.price?.toLocaleString?.() || "-"}</td>
              <td className="p-1">{((e.price || 0) * (item.extrasQty?.[e.key] || 1)).toLocaleString()} ₺</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  // Toplam özet
  let tutarDetay = null;
  if (item.summary) {
    tutarDetay = (
      <div className="my-3 text-sm text-right">
        <div><b>Transfer Bedeli:</b> {item.summary.basePrice?.toLocaleString()} ₺</div>
        <div><b>Ekstralar:</b> {item.summary.extrasTotal?.toLocaleString()} ₺</div>
        <div><b>KDV (%20):</b> {item.summary.kdv?.toLocaleString(undefined, { maximumFractionDigits: 2 })} ₺</div>
        <div className="font-bold text-lg"><b>Toplam:</b> {item.summary.toplam?.toLocaleString()} ₺</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-[#fffbef] max-w-2xl w-full rounded-2xl p-8 relative border-2 border-[#bfa658] overflow-y-auto max-h-[98vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-5 text-3xl font-bold text-[#bfa658] hover:text-red-400"
        >×</button>
        <h2 className="text-2xl font-bold mb-5 text-[#bfa658] text-center">Rezervasyon Detayı</h2>
        <div className="grid grid-cols-2 gap-4 text-sm text-[#19160a]">
          <div><b>Sipariş No:</b> {item.orderId}</div>
          <div><b>Durum:</b> {item.status}</div>
          <div><b>Oluşturma Tarihi:</b> {item.createdAt ? new Date(item.createdAt).toLocaleString("tr-TR") : "-"}</div>
          <div><b>Kişi Sayısı:</b> {item.people}</div>
          <div><b>Ad Soyad:</b> {item.name} {item.surname}</div>
          <div><b>T.C.:</b> {item.tc}</div>
          <div><b>Telefon:</b> {item.phone}</div>
          <div><b>E-posta:</b> {item.email || "-"}</div>
          <div><b>Segment:</b> {item.segment}</div>
          <div><b>Transfer Türü:</b> {item.transfer}</div>
          <div><b>Araç:</b> {item.vehicle} <span className="text-[11px] text-gray-500 block">{item.segment ? "(Segment seçildi, araç atanacak)" : ""}</span></div>
          <div><b>Nereden:</b> {item.from}</div>
          <div><b>Nereye:</b> {item.to}</div>
          <div><b>Tarih/Saat:</b> {item.date} {item.time}</div>
          {item.pnr && <div className="col-span-2"><b>PNR/Uçuş Kodu:</b> {item.pnr}</div>}
          {item.note && <div className="col-span-2"><b>Ek Not:</b> {item.note}</div>}
          <div className="col-span-2">
            <b>Ekstralar:</b>
            {extrasTable ? extrasTable : <span className="text-gray-500 ml-2">Ekstra yok</span>}
          </div>
        </div>
        {tutarDetay}
        <div className="flex gap-4 mt-8 justify-end">
          <button
            className="bg-[#bfa658] hover:bg-[#9f7c2b] text-black px-6 py-2 rounded-xl font-bold"
            onClick={onClose}
          >Kapat</button>
        </div>
      </div>
    </div>
  );
}

export default function AdminRezervasyonlarPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showPopup, setShowPopup] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showRemoved, setShowRemoved] = useState(false);

  const intervalRef = useRef(null);

  // Listeyi güncelle
  function refreshList() {
    setLoading(true);
    fetch("/api/admin/rezervasyonlar" + (showRemoved ? "?removed=1" : ""))
      .then(r => r.json())
      .then(d => { setList(d.items || []); setLoading(false); });
  }

  useEffect(() => {
    refreshList();
    // Her 5 saniyede bir güncelle
    intervalRef.current = setInterval(refreshList, 5000);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line
  }, [showRemoved]);

  const filtered = list.filter(item => {
    if (filter === "all") return !item.removed;
    if (filter === "paid") return item.status === "Ödeme Yapıldı" && !item.removed;
    if (filter === "cancelled") return item.status === "İptal" && !item.removed;
    return !item.removed;
  });

  // Rezervasyonu kaldır (admin panelde gösterme ama silme)
  async function handleRemove(id) {
    await fetch("/api/admin/rezervasyonlar/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    refreshList();
  }

  // Rezervasyonu db'den tamamen sil (çok riskli, geri dönüşsüz!)
  async function handleDelete(id) {
    if (!window.confirm("Bu rezervasyonu kalıcı olarak silmek istediğinize emin misiniz?")) return;
    await fetch("/api/admin/rezervasyonlar/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    refreshList();
  }

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-black/30 py-8">
      <section className="w-full max-w-5xl bg-black/80 rounded-2xl shadow-lg px-8 py-10 border border-gold">
        <h1 className="text-2xl font-bold text-gold mb-6 text-center">Rezervasyon Talepleri</h1>
        <div className="flex gap-3 mb-6">
          <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded font-bold ${filter === "all" ? "bg-gold text-black" : "bg-gray-700 text-white"}`}>Tümü</button>
          <button onClick={() => setFilter("paid")} className={`px-4 py-2 rounded font-bold ${filter === "paid" ? "bg-gold text-black" : "bg-gray-700 text-white"}`}>Ödeme Yapmış</button>
          <button onClick={() => setFilter("cancelled")} className={`px-4 py-2 rounded font-bold ${filter === "cancelled" ? "bg-gold text-black" : "bg-gray-700 text-white"}`}>Vazgeçilen</button>
          <button onClick={() => setShowRemoved(v => !v)} className={`ml-5 px-4 py-2 rounded font-bold border ${showRemoved ? "bg-gold text-black" : "bg-black text-gold border-gold"}`}>
            {showRemoved ? "Aktifleri Göster" : "Kaldırılanları Göster"}
          </button>
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
                  <tr key={r._id || i} className="border-b border-gold/30">
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
                    <td className="py-2 px-2 flex flex-col gap-1">
                      <button
                        className="bg-[#bfa658] text-black rounded px-3 py-1 font-bold hover:bg-[#ffeec2] mb-1"
                        onClick={() => { setSelected(r); setShowPopup(true); }}>
                        Oku
                      </button>
                      {!r.removed && (
                        <button
                          className="bg-yellow-900 text-white rounded px-3 py-1 font-bold hover:bg-yellow-800 mb-1"
                          onClick={() => handleRemove(r._id)}>
                          Kaldır
                        </button>
                      )}
                      <button
                        className="bg-red-700 text-white rounded px-3 py-1 font-bold hover:bg-red-500"
                        onClick={() => handleDelete(r._id)}>
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showPopup && selected &&
          <RezervasyonDetayPopup item={selected} onClose={() => setShowPopup(false)} />
        }
      </section>
    </main>
  );
}

// app/admin/rezervasyonlar/page.js
