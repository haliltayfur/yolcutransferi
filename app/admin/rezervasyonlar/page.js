"use client";
import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Para formatı
function formatTL(n) {
  return (n || 0).toLocaleString("tr-TR") + " ₺";
}

// Kayıt no üretici
function kayitNoUret(rez, i) {
  if (rez.orderId) return rez.orderId;
  const tarihStr = rez.createdAt;
  if (tarihStr) {
    const t = new Date(tarihStr);
    const yy = t.getFullYear();
    const mm = String(t.getMonth() + 1).padStart(2, "0");
    const dd = String(t.getDate()).padStart(2, "0");
    return `rez${yy}${mm}${dd}_${String(i + 1).padStart(4, "0")}`;
  }
  return `rez_000${i + 1}`;
}

export default function AdminRezervasyonlar() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalRez, setModalRez] = useState(null);
  const [showHidden, setShowHidden] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const pollingRef = useRef();

  // Kaldırılan/aktif ayrımı için cache
  const [activeList, setActiveList] = useState([]);
  const [removedList, setRemovedList] = useState([]);

  // Modal açıkken body scroll'unu engelle
  useEffect(() => {
    if (modalRez) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [modalRez]);

  // Backend verisini çek
  async function fetchList() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/rezervasyonlar?showHidden=1`);
      const json = await res.json();
      const arr = json.items || [];
      setList(arr);
      setActiveList(arr.filter(x => !x.hide));
      setRemovedList(arr.filter(x => x.hide));
    } catch {
      setList([]);
      setActiveList([]);
      setRemovedList([]);
    }
    setLoading(false);
  }

  // Kaldır (hide) veya geri al (unhide)
  const handleHideToggle = async (id, hide) => {
    await fetch("/api/admin/rezervasyonlar", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, hide }),
    });
    // Anlık olarak sadece local listede güncelle:
    setActiveList(prev =>
      hide ? prev.filter(item => item._id !== id) : [...prev, removedList.find(x => x._id === id)]
    );
    setRemovedList(prev =>
      hide
        ? [...prev, activeList.find(x => x._id === id)]
        : prev.filter(item => item._id !== id)
    );
    setModalRez(null);
    setTimeout(fetchList, 500); // Yedek sync, backend ile kesin uyum için
  };

  // İlk açılış ve elle yenilemede
  useEffect(() => {
    fetchList();
    pollingRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/admin/rezervasyonlar?showHidden=1`);
        const json = await res.json();
        const arr = json.items || [];
        setList(arr);
        setActiveList(arr.filter(x => !x.hide));
        setRemovedList(arr.filter(x => x.hide));
      } catch {}
    }, 10000);
    return () => clearInterval(pollingRef.current);
    // eslint-disable-next-line
  }, [refreshFlag]);

  function handleShowHidden() {
    setShowHidden(s => !s);
    setPage(1);
  }

  function handleRefresh() {
    setRefreshFlag(f => !f);
  }

  // Excel export (tüm alanlar)
  function exportExcel() {
    const exportArr = showHidden ? removedList : activeList;
    if (!exportArr.length) return;
    const sheetData = [
      [
        "Kayıt No", "Tarih", "Ad", "Soyad", "Telefon", "E-posta", "Segment", "Araç",
        "Kişi", "TC", "KVKK Onayı", "Transfer Türü", "Kalkış", "Varış", "PNR",
        "Ek Not", "Tutar", "Durum"
      ],
      ...exportArr.map((r, i) => [
        kayitNoUret(r, i),
        r.createdAt ? new Date(r.createdAt).toLocaleString("tr-TR") : "",
        r.name || "",
        r.surname || "",
        r.phone || "",
        r.email || "",
        r.segment || "",
        r.vehicle || "",
        r.people || "",
        r.tc || "",
        r.kvkk ? "✓" : "✗",
        r.transfer || "",
        r.from || "",
        r.to || "",
        r.pnr || "",
        r.note || "",
        r.summary?.toplam || 0,
        r.status || ""
      ])
    ];
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rezervasyonlar");
    const wbout = XLSX.write(wb, { type: "array", bookType: "xlsx" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "rezervasyonlar.xlsx");
  }

  // Pagination
  const dataArr = showHidden ? removedList : activeList;
  const totalPages = Math.ceil(dataArr.length / perPage);
  const pagedList = dataArr.slice((page - 1) * perPage, page * perPage);

  const columns = [
    "Kayıt No", "Tarih", "Ad", "Soyad", "Telefon", "E-posta", "Segment", "Araç", "Kişi", "TC", "KVKK", "Transfer Türü", "Kalkış / Varış", "Tutar", "Durum", "İşlem"
  ];

  // Detay Popup
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
          <div><b>Transfer Bedeli:</b> {formatTL(item.summary.basePrice)}</div>
          <div><b>Ekstralar:</b> {formatTL(item.summary.extrasTotal)}</div>
          <div><b>KDV (%20):</b> {formatTL(item.summary.kdv)}</div>
          <div className="font-bold text-lg"><b>Toplam:</b> {formatTL(item.summary.toplam)}</div>
        </div>
      );
    }
    return (
      <div
        className="fixed left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white text-black p-0 rounded-xl max-w-2xl w-full shadow-2xl relative overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200 bg-[#f3ecd1]">
            <div className="text-xl font-bold text-[#bfa658]">Rezervasyon Detayı</div>
            <button
              className="text-2xl text-gray-400 hover:text-black"
              onClick={onClose}
              aria-label="Kapat"
            >×</button>
          </div>
          {/* Detay İçerik */}
          <div className="px-6 py-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-[16px] mb-4">
              <div><b>Kayıt No:</b> {kayitNoUret(item, 0)}</div>
              <div><b>Tarih/Saat:</b> {item.date} {item.time}</div>
              <div><b>Ad Soyad:</b> {item.name} {item.surname}</div>
              <div><b>Telefon:</b> {item.phone}</div>
              <div><b>E-posta:</b> {item.email}</div>
              <div><b>Segment:</b> {item.segment}</div>
              <div><b>Araç:</b> {item.vehicle}</div>
              <div><b>Kişi Sayısı:</b> {item.people}</div>
              <div><b>T.C.:</b> {item.tc}</div>
              <div><b>KVKK Onayı:</b> {item.kvkk ? "✓" : "✗"}</div>
              <div><b>Transfer Türü:</b> {item.transfer}</div>
              <div><b>Kalkış:</b> {item.from}</div>
              <div><b>Varış:</b> {item.to}</div>
              <div><b>PNR/Uçuş Kodu:</b> {item.pnr}</div>
              {item.note && <div className="col-span-2"><b>Ek Not:</b> {item.note}</div>}
            </div>
            <div className="col-span-2 mb-2">
              <b>Ekstralar:</b>
              {extrasTable ? extrasTable : <span className="text-gray-500 ml-2">Ekstra yok</span>}
            </div>
            {tutarDetay}
          </div>
          {/* Alt Butonlar */}
          <div className="flex gap-3 justify-end bg-[#faf8ef] px-6 py-4 border-t border-gray-200">
            {!item.hide ? (
              <button
                onClick={() => handleHideToggle(item._id, true)}
                className="bg-yellow-800 text-[#ffeec2] px-4 py-2 rounded font-bold text-sm border border-[#bfa658] hover:bg-[#bfa658] hover:text-black transition"
              >Kaldır</button>
            ) : (
              <button
                onClick={() => handleHideToggle(item._id, false)}
                className="bg-green-800 text-[#ffeec2] px-4 py-2 rounded font-bold text-sm border border-[#bfa658] hover:bg-green-400 hover:text-black transition"
              >Geri Al</button>
            )}
            <button
              className="bg-black text-white px-4 py-2 rounded font-bold text-sm border border-[#bfa658] hover:bg-[#bfa658] hover:text-black transition"
              onClick={onClose}
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="max-w-6xl mx-auto px-2 py-8">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-8">Rezervasyon Kayıtları</h1>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select
          value={perPage}
          onChange={e => { setPerPage(Number(e.target.value)); setPage(1); }}
          className="border border-[#bfa658] rounded px-2 py-1 text-sm bg-black text-[#bfa658] font-semibold focus:outline-none"
        >
          {[5, 10, 25, 50, 100].map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
        <button onClick={exportExcel}
          className="bg-[#bfa658] text-black px-4 py-2 rounded font-bold hover:opacity-80 text-sm shadow">
          Excel (XLSX) İndir
        </button>
        <button
          onClick={handleShowHidden}
          className="bg-[#444] border border-[#bfa658] text-[#ffeec2] font-semibold px-4 py-2 rounded hover:bg-[#bfa658] hover:text-black text-sm shadow"
        >
          {showHidden ? "Aktifleri Göster" : "Kaldırılanları Göster"}
        </button>
        <button
          onClick={handleRefresh}
          className="bg-[#19160a] border border-[#bfa658] text-[#ffeec2] font-semibold px-4 py-2 rounded hover:bg-[#bfa658] hover:text-black text-sm shadow"
        >
          Şimdi Yenile
        </button>
        <span className="ml-2 text-sm text-gray-400">{dataArr.length} kayıt listelendi.</span>
      </div>
      <div className="overflow-x-auto bg-black/80 rounded-2xl border-2 border-[#bfa658]">
        <table className="min-w-full text-sm border-separate border-spacing-0">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th
                  key={col}
                  className="p-2 border-b-2 border-[#bfa658] bg-black/90 text-[#ffeec2] font-bold"
                  style={{ borderRight: i !== columns.length - 1 ? '1px solid #bfa658' : undefined }}
                >{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-6 text-gray-400 text-lg">Yükleniyor...</td>
              </tr>
            ) : pagedList.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-10 text-gray-400 text-xl font-semibold">Hiç kayıt yok.</td>
              </tr>
            ) : (
              pagedList.map((item, i) => (
                <tr key={item._id || i} className="hover:bg-[#231d10] transition">
                  <td className="p-2 border-b border-[#bfa658] font-semibold"
                    style={{ borderRight: '1px solid #bfa658' }}>
                    {kayitNoUret(item, i + (page-1)*perPage)}
                  </td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString("tr-TR")
                      : ""}
                  </td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>
                    {item.name}
                  </td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>
                    {item.surname}
                  </td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>{item.phone}</td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>{item.email}</td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>{item.segment}</td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>{item.vehicle}</td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>{item.people}</td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>{item.tc}</td>
                  <td className="p-2 border-b border-[#bfa658] text-center" style={{ borderRight: '1px solid #bfa658' }}>
                    {item.kvkk ? "✓" : "✗"}
                  </td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>{item.transfer}</td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>
                    {item.from} → {item.to}
                  </td>
                  <td className="p-2 border-b border-[#bfa658] font-bold text-right" style={{ borderRight: '1px solid #bfa658' }}>
                    {formatTL(item.summary?.toplam)}
                  </td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>
                    {item.status || "-"}
                  </td>
                  <td className="p-2 border-b border-[#bfa658] text-center min-w-[120px]">
                    <button
                      className="bg-[#bfa658] text-black px-3 py-1 rounded font-bold text-xs mr-1 hover:opacity-80 shadow"
                      onClick={() => setModalRez(item)}
                      type="button"
                    >Oku</button>
                    {!item.hide ? (
                      <button
                        onClick={() => handleHideToggle(item._id, true)}
                        className="bg-yellow-800 text-[#ffeec2] px-2 py-1 rounded mr-2 text-xs font-semibold border border-[#bfa658] hover:bg-[#bfa658] hover:text-black transition"
                      >Kaldır</button>
                    ) : (
                      <button
                        onClick={() => handleHideToggle(item._id, false)}
                        className="bg-green-800 text-[#ffeec2] px-2 py-1 rounded text-xs font-semibold border border-[#bfa658] hover:bg-green-400 hover:text-black transition"
                      >Geri Al</button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center gap-1 mt-5">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded font-bold border border-[#bfa658] mx-0.5 shadow-sm 
                ${page === i + 1
                  ? "bg-[#bfa658] text-black"
                  : "bg-black text-[#bfa658] hover:bg-[#19160a] hover:text-white"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
      {/* Popup */}
      {modalRez && <RezervasyonDetayPopup item={modalRez} onClose={() => setModalRez(null)} />}
    </main>
  );
}
// app/admin/rezervasyonlar/page.js
