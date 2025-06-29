// app/admin/rezervasyonlar/page.js

"use client";
import React, { useState, useEffect, useRef } from "react";

// Yardımcı fonksiyonlar
function formatTL(n) {
  return (n || 0).toLocaleString("tr-TR") + " ₺";
}

// Sütunlar
const columns = [
  { name: "Sipariş No", key: "orderId", className: "min-w-[120px]" },
  { name: "Tarih", key: "createdAt", className: "min-w-[130px]" },
  { name: "Ad Soyad", key: "nameSurname", className: "min-w-[120px]" },
  { name: "Telefon", key: "phone", className: "min-w-[120px]" },
  { name: "E-posta", key: "email", className: "min-w-[150px]" },
  { name: "Transfer Türü", key: "transfer", className: "min-w-[140px]" },
  { name: "Kalkış / Varış", key: "route", className: "min-w-[180px]" },
  { name: "Tutar", key: "total", className: "min-w-[90px] text-right" },
  { name: "Durum", key: "status", className: "min-w-[100px]" },
  { name: "İşlem", key: "actions", className: "min-w-[120px]" }
];

export default function AdminRezervasyonlar() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showHidden, setShowHidden] = useState(false);
  const [modalRez, setModalRez] = useState(null);
  const [lastHash, setLastHash] = useState(""); // Arka planda değişiklik algılama için
  const pollingRef = useRef();

  // Sayfa ilk açıldığında ve showHidden değiştiğinde listeyi yükle
  useEffect(() => {
    fetchList();
    // 10 saniyede bir (arka planda sadece değişiklik varsa güncelle)
    pollingRef.current = setInterval(bgCheckForUpdate, 10000);
    return () => clearInterval(pollingRef.current);
    // eslint-disable-next-line
  }, [showHidden]);

  // Kullanıcı elle "Şimdi Yenile"ye basınca çağrılır
  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/rezervasyonlar?showHidden=${showHidden}`);
      const json = await res.json();
      setList(json.items || []);
      // Arka plan kontrolü için hash/guid sakla
      setLastHash(createListHash(json.items || []));
    } catch {
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  // Sadece arka planda sessizce çalışır, veri değişmişse günceller
  const bgCheckForUpdate = async () => {
    try {
      const res = await fetch(`/api/admin/rezervasyonlar?showHidden=${showHidden}`);
      const json = await res.json();
      const newHash = createListHash(json.items || []);
      if (newHash !== lastHash) {
        setList(json.items || []);
        setLastHash(newHash);
      }
    } catch {/* sessiz geç */}
  };

  // Liste hash (sadece son 20 kaydı kıyasla, performans için)
  function createListHash(items) {
    return (items || []).slice(0, 20).map(i => i._id).join("-");
  }

  // Kaldır (hide) veya Geri Al (unhide)
  const handleHideToggle = async (id, hide) => {
    await fetch("/api/admin/rezervasyonlar", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, hide }),
    });
    fetchList();
    setModalRez(null);
  };

  // Detay popup (standart şablon)
  const RezervasyonDetayPopup = ({ item, onClose }) => {
    if (!item) return null;
    let extrasTable = null;
    if (Array.isArray(item.selectedExtras) && item.selectedExtras.length > 0) {
      extrasTable = (
        <table className="w-full mb-2 text-xs border border-[#bfa658] rounded">
          <thead>
            <tr className="bg-[#bfa658] text-black">
              <th className="p-1">Ekstra</th>
              <th className="p-1">Adet</th>
              <th className="p-1">Birim</th>
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
    let tutarDetay = null;
    if (item.summary) {
      tutarDetay = (
        <div className="my-3 text-sm text-right">
          <div>Transfer Bedeli: <b>{formatTL(item.summary.basePrice)}</b></div>
          <div>Ekstralar: <b>{formatTL(item.summary.extrasTotal)}</b></div>
          <div>KDV (%20): <b>{formatTL(item.summary.kdv)}</b></div>
          <div style={{ fontWeight: "bold", fontSize: 18, color: "#bfa658" }}>Toplam: {formatTL(item.summary.toplam)}</div>
        </div>
      );
    }
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={onClose}>
        <div
          className="bg-[#232118] w-full max-w-xl rounded-2xl p-7 relative border-2 border-[#bfa658] overflow-y-auto max-h-[97vh]"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-5 text-3xl font-bold text-[#bfa658] hover:text-red-400"
          >×</button>
          <h2 className="text-2xl font-bold mb-5 text-[#bfa658] text-center">Rezervasyon Detayı</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-[16px] mb-2 text-[#ffeec2]">
            <div><b>Sipariş No:</b> {item.orderId}</div>
            <div><b>Durum:</b> {item.status}</div>
            <div><b>Tarih/Saat:</b> {item.date} {item.time}</div>
            <div><b>Ad Soyad:</b> {item.name} {item.surname}</div>
            <div><b>Telefon:</b> {item.phone}</div>
            <div><b>E-posta:</b> {item.email}</div>
            <div><b>Segment:</b> {item.segment}</div>
            <div><b>Transfer Türü:</b> {item.transfer}</div>
            <div><b>Araç:</b> {item.vehicle}</div>
            <div><b>Kalkış:</b> {item.from}</div>
            <div><b>Varış:</b> {item.to}</div>
            <div><b>Kişi Sayısı:</b> {item.people}</div>
            <div><b>T.C.:</b> {item.tc}</div>
            {item.pnr && <div className="col-span-2"><b>PNR/Uçuş Kodu:</b> {item.pnr}</div>}
            {item.note && <div className="col-span-2"><b>Ek Not:</b> {item.note}</div>}
          </div>
          <div className="col-span-2 mb-2">
            <b>Ekstralar:</b>
            {extrasTable ? extrasTable : <span className="text-gray-500 ml-2">Ekstra yok</span>}
          </div>
          {tutarDetay}
          <div className="flex gap-4 mt-8 justify-end">
            {!item.hide ? (
              <button
                onClick={() => handleHideToggle(item._id, true)}
                className="bg-yellow-800 text-[#ffeec2] px-6 py-2 rounded-xl font-bold border border-[#bfa658] hover:bg-[#bfa658] hover:text-black transition"
              >Kaldır</button>
            ) : (
              <button
                onClick={() => handleHideToggle(item._id, false)}
                className="bg-green-800 text-[#ffeec2] px-6 py-2 rounded-xl font-bold border border-[#bfa658] hover:bg-green-400 hover:text-black transition"
              >Geri Al</button>
            )}
            <button
              className="bg-black text-white px-6 py-2 rounded-xl font-bold border border-[#bfa658] hover:bg-[#bfa658] hover:text-black transition"
              onClick={onClose}
            >Kapat</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="w-full max-w-6xl mx-auto px-1 py-7">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-7 text-left">Rezervasyon Kayıtları</h1>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setShowHidden(!showHidden)}
          className="bg-[#444] border border-[#bfa658] text-[#ffeec2] font-semibold px-4 py-2 rounded hover:bg-[#bfa658] hover:text-black text-sm shadow"
        >
          {showHidden ? "Kaldırılanları Gizle" : "Kaldırılanları Göster"}
        </button>
        <button
          onClick={fetchList}
          className="bg-[#bfa658] border border-[#bfa658] text-black font-semibold px-4 py-2 rounded hover:bg-[#ffeec2] hover:text-[#bfa658] text-sm shadow"
        >Şimdi Yenile</button>
        <span className="ml-2 text-sm text-[#bfa658] font-bold">{list.length} kayıt listelendi.</span>
      </div>
      <div className="overflow-x-auto w-full bg-[#151310] rounded-2xl border-2 border-[#bfa658]">
        <table className="w-full border-collapse min-w-[1150px] text-sm">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th
                  key={col.name}
                  className={`p-2 border-b-2 border-[#bfa658] bg-[#19160a] text-[#ffeec2] font-bold ${col.className}`}
                  style={{ borderRight: i !== columns.length - 1 ? '1px solid #bfa658' : undefined }}
                >{col.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((item, idx) => (
              <tr key={item._id} className={item.hide ? "bg-[#33281a] text-gray-500" : "hover:bg-[#232118] transition"}>
                <td className="p-2 border-b border-[#bfa658] font-semibold whitespace-nowrap">{item.orderId}</td>
                <td className="p-2 border-b border-[#bfa658] whitespace-nowrap">{item.createdAt ? new Date(item.createdAt).toLocaleString("tr-TR") : "-"}</td>
                <td className="p-2 border-b border-[#bfa658] whitespace-nowrap">{item.name} {item.surname}</td>
                <td className="p-2 border-b border-[#bfa658] whitespace-nowrap">{item.phone}</td>
                <td className="p-2 border-b border-[#bfa658] whitespace-nowrap">{item.email}</td>
                <td className="p-2 border-b border-[#bfa658] whitespace-nowrap">{item.transfer}</td>
                <td className="p-2 border-b border-[#bfa658] whitespace-nowrap">{item.from} → {item.to}</td>
                <td className="p-2 border-b border-[#bfa658] font-semibold text-right">{formatTL(item.summary?.toplam)}</td>
                <td className="p-2 border-b border-[#bfa658]">{item.status || "-"}</td>
                <td className="p-2 border-b border-[#bfa658] text-right">
                  <button
                    className="bg-[#bfa658] text-black px-3 py-1 rounded font-bold text-xs hover:opacity-80 shadow border border-[#a08b50]"
                    onClick={() => setModalRez(item)}
                    type="button"
                  >Oku</button>
                  {!item.hide ? (
                    <button
                      onClick={() => handleHideToggle(item._id, true)}
                      className="bg-yellow-800 text-[#ffeec2] px-2 py-1 rounded text-xs font-semibold border border-[#bfa658] hover:bg-[#bfa658] hover:text-black transition ml-2"
                    >Kaldır</button>
                  ) : (
                    <button
                      onClick={() => handleHideToggle(item._id, false)}
                      className="bg-green-800 text-[#ffeec2] px-2 py-1 rounded text-xs font-semibold border border-[#bfa658] hover:bg-green-400 hover:text-black transition ml-2"
                    >Geri Al</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalRez && <RezervasyonDetayPopup item={modalRez} onClose={() => setModalRez(null)} />}
    </main>
  );
}

// app/admin/rezervasyonlar/page.js  --- SON
