// app/admin/kvkk/page.js
"use client";
import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Tablo için kısa açıklama
function kisaAciklama(str) {
  if (!str) return "";
  return str.length > 20 ? str.slice(0, 20) + "..." : str;
}

// Kayıt no üretici
function kayitNoUret(form, i) {
  if (form.kayitNo) return form.kayitNo;
  const tarihStr = form.tarih || form.createdAt;
  if (tarihStr) {
    const t = new Date(tarihStr);
    const yy = t.getFullYear();
    const mm = String(t.getMonth() + 1).padStart(2, "0");
    const dd = String(t.getDate()).padStart(2, "0");
    return `kvkk${yy}${mm}${dd}_${String(i + 1).padStart(4, "0")}`;
  }
  return `kvkk_000${i + 1}`;
}

export default function AdminKvkk() {
  const [forms, setForms] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalForm, setModalForm] = useState(null);
  const [showRemoved, setShowRemoved] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [removedForms, setRemovedForms] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const pollingRef = useRef();

  // Modal açıkken body scroll'unu engelle
  useEffect(() => {
    if (modalForm) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [modalForm]);

  // Backend verisini çek
  async function fetchForms() {
    setLoading(true);
    try {
      const res = await fetch("/api/kvkk/forms");
      const data = await res.json();
      let arr = Array.isArray(data.items) ? data.items : [];
      arr = arr.map(x => ({
        ...x,
        kaldirildi: x.kaldirildi || false,
      }));
      setForms(arr);
      setFiltered(arr.filter(f => !f.kaldirildi));
      setRemovedForms(arr.filter(f => f.kaldirildi));
    } catch (e) {
      setForms([]);
      setFiltered([]);
      setRemovedForms([]);
    }
    setLoading(false);
  }

  // Kaldır (backend'e kalıcı yaz)
  async function handleKaldir(_id) {
    await fetch(`/api/kvkk/forms/${_id}/kaldir`, { method: "POST" });
    setForms(f => f.map(row => row._id === _id ? { ...row, kaldirildi: true } : row));
    setFiltered(f => f.filter(row => row._id !== _id));
    setRemovedForms(f => [
      ...forms.filter(x => x._id === _id).map(x => ({ ...x, kaldirildi: true })),
      ...removedForms,
    ]);
    setModalForm(null);
  }

  // Sil (backend'den tamamen sil)
  async function handleSil(_id) {
    await fetch(`/api/kvkk/forms/${_id}`, { method: "DELETE" });
    setForms(f => f.filter(row => row._id !== _id));
    setFiltered(f => f.filter(row => row._id !== _id));
    setRemovedForms(f => f.filter(row => row._id !== _id));
    setModalForm(null);
  }

  // İlk açılış ve manuel yenilemede
  useEffect(() => {
    fetchForms();
    pollingRef.current = setInterval(async () => {
      try {
        const res = await fetch("/api/kvkk/forms");
        const data = await res.json();
        let arr = Array.isArray(data.items) ? data.items : [];
        arr = arr.map(x => ({
          ...x,
          kaldirildi: x.kaldirildi || false,
        }));
        // Yeni kayıt kontrolü
        if (arr.length !== forms.length) {
          setForms(arr);
          setFiltered(arr.filter(f => !f.kaldirildi));
          setRemovedForms(arr.filter(f => f.kaldirildi));
        }
      } catch {}
    }, 5000);
    return () => clearInterval(pollingRef.current);
    // eslint-disable-next-line
  }, [refreshFlag]);

  function handleShowRemoved() {
    setShowRemoved(s => !s);
    setPage(1);
  }

  function handleRefresh() {
    setRefreshFlag(f => !f);
  }

  // XLSX (gerçek Excel dosyası) export
  function exportExcel() {
    const arr = showRemoved ? removedForms : filtered;
    if (!arr.length) return;
    const sheetData = [
      ["Kayıt No", "Tarih", "Ad Soyad", "Telefon", "E-posta", "Talep Türü", "Açıklama"],
      ...arr.map((f, i) => [
        kayitNoUret(f, i),
        f.tarih
          ? format(new Date(f.tarih), "dd.MM.yyyy HH:mm")
          : f.createdAt
          ? format(new Date(f.createdAt), "dd.MM.yyyy HH:mm")
          : "",
        f.adsoyad || "",
        f.telefon || "",
        f.eposta || "",
        f.talep || "",
        f.aciklama || "",
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "KVKK Başvuruları");
    const wbout = XLSX.write(wb, { type: "array", bookType: "xlsx" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "kvkk_basvurulari.xlsx");
  }

  const dataArr = showRemoved ? removedForms : filtered;
  const totalPages = Math.ceil(dataArr.length / perPage);
  const pagedForms = dataArr.slice((page - 1) * perPage, page * perPage);

  const columns = [
    "Kayıt No", "Tarih", "Ad Soyad", "Telefon", "E-posta", "Talep Türü", "Açıklama", "İşlem"
  ];

  return (
    <main className="max-w-6xl mx-auto px-2 py-8">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-8">KVKK Başvuruları</h1>
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
          onClick={handleShowRemoved}
          className="bg-[#444] border border-[#bfa658] text-[#ffeec2] font-semibold px-4 py-2 rounded hover:bg-[#bfa658] hover:text-black text-sm shadow"
        >
          {showRemoved ? "Aktifleri Göster" : "Kaldırılanları Göster"}
        </button>
        <button
          onClick={handleRefresh}
          className="bg-[#19160a] border border-[#bfa658] text-[#ffeec2] font-semibold px-4 py-2 rounded hover:bg-[#bfa658] hover:text-black text-sm shadow"
        >
          Şimdi Yenile
        </button>
        <span className="ml-2 text-sm text-gray-400">{dataArr.length} başvuru bulundu.</span>
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
            ) : pagedForms.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-10 text-gray-400 text-xl font-semibold">Hiç başvuru bulunamadı.</td>
              </tr>
            ) : (
              pagedForms.map((form, i) => (
                <tr key={form._id || i} className="hover:bg-[#231d10] transition">
                  <td className="p-2 border-b border-[#bfa658] font-semibold"
                    style={{ borderRight: '1px solid #bfa658' }}>
                    {kayitNoUret(form, i + (page-1)*perPage)}
                  </td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>
                    {form.tarih
                      ? format(new Date(form.tarih), "dd.MM.yyyy HH:mm")
                      : form.createdAt
                      ? format(new Date(form.createdAt), "dd.MM.yyyy HH:mm")
                      : ""}
                  </td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>{form.adsoyad}</td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>{form.telefon}</td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>{form.eposta}</td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>{form.talep}</td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>
                    <button
                      className="bg-[#bfa658] text-black px-3 py-1 rounded font-bold text-xs mr-1 hover:opacity-80 shadow"
                      onClick={() => setModalForm(form)}
                      type="button"
                    >Oku</button>
                  </td>
                  <td className="p-2 border-b border-[#bfa658] text-center min-w-[120px]">
                    {!form.kaldirildi && (
                      <button
                        onClick={() => handleKaldir(form._id)}
                        className="bg-yellow-800 text-[#ffeec2] px-2 py-1 rounded mr-2 text-xs font-semibold border border-[#bfa658] hover:bg-[#bfa658] hover:text-black transition"
                      >Kaldır</button>
                    )}
                    <button
                      onClick={() => handleSil(form._id)}
                      className="bg-red-700 text-white px-2 py-1 rounded text-xs font-semibold border border-[#bfa658] hover:bg-red-400 hover:text-black transition"
                    >Sil</button>
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
      {/* Popup mail okur gibi */}
      {modalForm && (
        <div
          className="fixed left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-50"
          onClick={() => setModalForm(null)}
        >
          <div
            className="bg-white text-black p-0 rounded-xl max-w-2xl w-full shadow-2xl relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200 bg-[#f3ecd1]">
              <div className="text-xl font-bold text-[#bfa658]">Başvuru Detayı</div>
              <button
                className="text-2xl text-gray-400 hover:text-black"
                onClick={() => setModalForm(null)}
                aria-label="Kapat"
              >×</button>
            </div>
            {/* Detay İçerik */}
            <div className="px-6 py-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-[16px] mb-4">
                <div><b>Kayıt No:</b> {kayitNoUret(modalForm, 0)}</div>
                <div><b>Tarih:</b> {modalForm.tarih ? format(new Date(modalForm.tarih), "dd.MM.yyyy HH:mm") : modalForm.createdAt ? format(new Date(modalForm.createdAt), "dd.MM.yyyy HH:mm") : ""}</div>
                <div><b>Ad Soyad:</b> {modalForm.adsoyad}</div>
                <div><b>Telefon:</b> {modalForm.telefon}</div>
                <div><b>E-posta:</b> {modalForm.eposta}</div>
                <div><b>Talep Türü:</b> {modalForm.talep}</div>
              </div>
              <div className="mb-1 text-[15px]"><b>Açıklama:</b></div>
              <div className="bg-gray-100 rounded-md p-3 text-gray-900 font-mono max-h-48 overflow-y-auto whitespace-pre-line break-words">{modalForm.aciklama}</div>
            </div>
            {/* Alt Butonlar */}
            <div className="flex gap-3 justify-end bg-[#faf8ef] px-6 py-4 border-t border-gray-200">
              {!modalForm.kaldirildi && (
                <button
                  onClick={() => handleKaldir(modalForm._id)}
                  className="bg-yellow-800 text-[#ffeec2] px-4 py-2 rounded font-bold text-sm border border-[#bfa658] hover:bg-[#bfa658] hover:text-black transition"
                >Kaldır</button>
              )}
              <button
                onClick={() => handleSil(modalForm._id)}
                className="bg-red-700 text-white px-4 py-2 rounded font-bold text-sm border border-[#bfa658] hover:bg-red-400 hover:text-black transition"
              >Sil</button>
              <button
                className="bg-black text-white px-4 py-2 rounded font-bold text-sm border border-[#bfa658] hover:bg-[#bfa658] hover:text-black transition"
                onClick={() => setModalForm(null)}
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
// app/admin/kvkk/page.js
