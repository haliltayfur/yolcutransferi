// app/admin/rezervasyonlar/page.js
"use client";
import React, { useState, useEffect, useRef } from "react";

// Yardımcı fonksiyonlar
function formatTL(n) {
  return (n || 0).toLocaleString("tr-TR") + " ₺";
}
function kisaMetin(str, len = 18) {
  if (!str) return "";
  return str.length > len ? str.slice(0, len) + "..." : str;
}

// Sütunlar
const columns = [
  { name: "Sipariş No", className: "min-w-[120px]" },
  { name: "Tarih", className: "min-w-[130px]" },
  { name: "Ad Soyad", className: "min-w-[120px]" },
  { name: "Telefon", className: "min-w-[120px]" },
  { name: "E-posta", className: "min-w-[150px]" },
  { name: "Transfer Türü", className: "min-w-[120px]" },
  { name: "Kalkış / Varış", className: "min-w-[140px]" },
  { name: "Tutar", className: "min-w-[90px] text-right" },
  { name: "Durum", className: "min-w-[100px]" },
  { name: "İşlem", className: "min-w-[160px]" }
];

export default function AdminRezervasyonlar() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showHidden, setShowHidden] = useState(false);
  const [modalRez, setModalRez] = useState(null);
  const pollingRef = useRef();

  // 90sn'de bir veya veri değişince güncelle
  useEffect(() => {
    fetchList();
    pollingRef.current = setInterval(() => fetchList(), 90000);
    return () => clearInterval(pollingRef.current);
    // eslint-disable-next-line
  }, [showHidden]);

  // Kayıtları çek (anlık)
  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/rezervasyonlar?showHidden=${showHidden}`);
      const json = await res.json();
      setList(json.items || []);
    } catch {
      setList([]);
    } finally {
      setLoading(false);
    }
  };

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

  // Detay popup
  const RezervasyonDetayPopup = ({ item, onClose }) => {
    if (!item) return null;
    // Ekstralar tablo
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
    // Tutar detayı
    let tutarDetay = null;
    if (item.summary) {
      tutarDetay = (
        <div className="my-3 text-sm text-right">
          <div><b>Transfer Bedeli:</b> {formatTL(item.summary.basePrice)}</div>
          <div><b>Ekstralar:</b> {formatTL(item.summary.extrasTotal)}</div>
          <div><b>KDV (%20):</b> {formatTL(item.summary.kdv)}</div>
          <div className="font-bold text-lg"><b>Toplam:</b> {formatTL(item.summary.toplam)}</div>
        </div>
      );
    }
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={onClose}>
        <div
          className="bg-[#fffbef] max-w-2xl w-full rounded-2xl p-8 relative border-2 border-[#bfa658] overflow-y-auto max-h-[98vh]"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-5 text-3xl font-bold text-[#bfa658] hover:text-red-400"
          >×</button>
          <h2 className="text-2xl font-bold mb-5 text-[#bfa658] text-center">Rezervasyon Detayı</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-[16px] mb-2 text-[#19160a]">
            <div><b>Sipariş No:</b> {item.orderId}</div>
            <div><b>Durum:</b> {item.status}</div>
            <div><b>Oluşturma:</b> {item.createdAt ? new Date(item.createdAt).toLocaleString("tr-TR") : "-"}</div>
            <div><b>Kişi Sayısı:</b> {item.people}</div>
            <div><b>Ad Soyad:</b> {item.name} {item.surname}</div>
            <div><b>T.C.:</b> {item.tc}</div>
            <div><b>Telefon:</b> {item.phone}</div>
            <div><b>E-posta:</b> {item.email}</div>
            <div><b>Segment:</b> {item.segment}</div>
            <div><b>Transfer Türü:</b> {item.transfer}</div>
            <div><b>Araç:</b> {item.vehicle}</div>
            <div><b>Kalkış:</b> {item.from}</div>
            <div><b>Varış:</b> {item.to}</div>
            <div><b>Tarih/Saat:</b> {item.date} {item.time}</div>
            {item.pnr && <div className="col-span-2"><b>PNR/Uçuş Kodu:</b> {item.pnr}</div>}
            {item.note && <div className="col-span-2"><b>Ek Not:</b> {item.note}</div>}
          </div>
          {/* Ekstralar ve tutar */}
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

  // Tablo ve ana ekran
  return (
    <main className="max-w-7xl mx-auto px-2 py-8">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-8 text-left">Rezervasyon Kayıtları</h1>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setShowHidden(!showHidden)}
          className="bg-[#444] border border-[#bfa658] text-[#ffeec2] font-semibold px-4 py-2 rounded hover:bg-[#bfa658] hover:text-black text-sm shadow"
        >
          {showHidden ? "Kaldırılanları Gizle" : "Kaldırılanları Göster"}
        </button>
        <button
          onClick={fetchList}
          className="bg-[#19160a] border border-[#bfa658] text-[#ffeec2] font-semibold px-4 py-2 rounded hover:bg-[#bfa658] hover:text-black text-sm shadow"
        >Şimdi Yenile</button>
        <span className="ml-2 text-sm text-gray-400">{list.length} kayıt listelendi.</span>
      </div>
      <div className="overflow-x-auto bg-black/80 rounded-2xl border-2 border-[#bfa658]">
        {loading ? (
          <p className="text-center py-6 text-gray-300 text-xl">Yükleniyor...</p>
        ) : list.length === 0 ? (
          <p className="text-center py-10 text-gray-400 text-xl font-semibold">Hiç kayıt yok.</p>
        ) : (
          <table className="w-full border-collapse min-w-[900px] text-sm">
            <thead>
              <tr>
                {columns.map((col, i) => (
                  <th
                    key={col.name}
                    className={`p-2 border-b-2 border-[#bfa658] bg-black/90 text-[#ffeec2] font-bold ${col.className}`}
                    style={{ borderRight: i !== columns.length - 1 ? '1px solid #bfa658' : undefined }}
                  >{col.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((item, idx) => (
                <tr key={item._id} className={item.hide ? "bg-[#331] text-gray-500" : "hover:bg-[#231d10] transition"}>
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
                      className="bg-[#bfa658] text-black px-3 py-1 rounded font-bold text-xs hover:opacity-80 shadow"
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
        )}
      </div>
      {/* Popup detay */}
      {modalRez && <RezervasyonDetayPopup item={modalRez} onClose={() => setModalRez(null)} />}
    </main>
  );
}
// app/admin/rezervasyonlar/page.js
