// app/admin/rezervasyonlar/page.js
"use client";
import { useEffect, useState } from "react";

// Detay Popup
function RezervasyonDetayPopup({ item, onClose }) {
  if (!item) return null;

  // Ekstralar tablosu
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

  // Fiyat özet
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

// Ana Panel
export default function AdminRezervasyonlarPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, paid, cancelled, hidden
  const [showPopup, setShowPopup] = useState(false);
  const [selected, setSelected] = useState(null);

  // Yedeklenmiş veri anında güncellensin
  function fetchList() {
    setLoading(true);
    fetch("/api/admin/rezervasyonlar")
      .then(r => r.json())
      .then(d => { setList(d.items || []); setLoading(false); });
  }

  useEffect(() => {
    fetchList();
    // Her 6 sn'de bir güncelle (otomatik yenileme)
    const interval = setInterval(fetchList, 6000);
    return () => clearInterval(interval);
  }, []);

  // Filtrele
  let filtered = [];
  if (filter === "all") filtered = list.filter(item => !item.hidden);
  else if (filter === "paid") filtered = list.filter(item => item.status === "Ödeme Yapıldı" && !item.hidden);
  else if (filter === "cancelled") filtered = list.filter(item => item.status === "İptal" && !item.hidden);
  else if (filter === "hidden") filtered = list.filter(item => item.hidden);

  // Kaldır veya geri ekle fonksiyonu (inline)
  async function handleHideToggle(id, hide) {
    await fetch(`/api/admin/rezervasyonlar/hide?id=${id}&hide=${hide ? 1 : 0}`, { method: "POST" });
    fetchList();
  }

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-black/30 py-8">
      <section className="w-full max-w-5xl bg-black/80 rounded-2xl shadow-lg px-8 py-10 border border-gold">
        <h1 className="text-2xl font-bold text-gold mb-6 text-center">Rezervasyon Talepleri</h1>
        <div className="flex gap-3 mb-6">
          <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded font-bold ${filter === "all" ? "bg-gold text-black" : "bg-gray-700 text-white"}`}>Tümü</button>
          <button onClick={() => setFilter("paid")} className={`px-4 py-2 rounded font-bold ${filter === "paid" ? "bg-gold text-black" : "bg-gray-700 text-white"}`}>Ödeme Yapmış</button>
          <button onClick={() => setFilter("cancelled")} className={`px-4 py-2 rounded font-bold ${filter === "cancelled" ? "bg-gold text-black" : "bg-gray-700 text-white"}`}>Vazgeçilen</button>
          <button onClick={() => setFilter("hidden")} className={`px-4 py-2 rounded font-bold ${filter === "hidden" ? "bg-gold text-black" : "bg-gray-700 text-white"}`}>Kaldırılanlar</button>
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
                  <th className="py-2 px-2">Transfer Türü</th>
                  <th className="py-2 px-2">Nereden</th>
                  <th className="py-2 px-2">Nereye</th>
                  <th className="py-2 px-2">Tutar</th>
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
                    <td className="py-2 px-2">{r.transfer || "-"}</td>
                    <td className="py-2 px-2">{r.from}</td>
                    <td className="py-2 px-2">{r.to}</td>
                    <td className="py-2 px-2 font-semibold">{r.summary?.toplam?.toLocaleString()} ₺</td>
                    <td className="py-2 px-2 flex gap-2">
                      <button
                        className="bg-[#bfa658] text-black rounded px-3 py-1 font-bold hover:bg-[#ffeec2]"
                        onClick={() => { setSelected(r); setShowPopup(true); }}>
                        Oku
                      </button>
                      {filter !== "hidden" ? (
                        <button
                          className="bg-gray-700 text-[#ffeec2] rounded px-3 py-1 font-bold hover:bg-gray-900"
                          onClick={() => handleHideToggle(r._id, true)}>
                          Kaldır
                        </button>
                      ) : (
                        <button
                          className="bg-green-700 text-white rounded px-3 py-1 font-bold hover:bg-green-600"
                          onClick={() => handleHideToggle(r._id, false)}>
                          Geri Ekle
                        </button>
                      )}
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
