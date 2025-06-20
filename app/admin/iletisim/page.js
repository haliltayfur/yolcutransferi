"use client";
import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const PAGE_SIZES = [5, 10, 20, 100];

function kisaMetin(str, len = 15) {
  if (!str) return "";
  return str.length > len ? str.slice(0, len) + "..." : str;
}

export default function AdminIletisim() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showRemoved, setShowRemoved] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [modalForm, setModalForm] = useState(null);
  const pollingRef = useRef();

  // 180 sn'de bir güncelle
  useEffect(() => {
    fetchForms();
    pollingRef.current = setInterval(() => fetchForms(), 180000);
    return () => clearInterval(pollingRef.current);
    // eslint-disable-next-line
  }, [showRemoved, page, pageSize]);

  const fetchForms = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `/api/iletisim/forms?showRemoved=${showRemoved}&page=${page}&pageSize=${pageSize}`
      );
      const json = await res.json();
      setForms(json.items || []);
      setTotal(json.total || 0);
    } catch (err) {
      setError(true);
      setForms([]);
    } finally {
      setLoading(false);
    }
  };

  // Kaldır / Geri Al
  const handleToggleRemove = async (id, kaldirildi) => {
    await fetch("/api/iletisim/forms", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, kaldirildi }),
    });
    fetchForms();
    setModalForm(null);
  };

  // Sil
  const handleSil = async (id) => {
    await fetch("/api/iletisim/forms", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchForms();
    setModalForm(null);
  };

  // Excel Export (XLSX) - TÜM alanları export etmeye devam!
  const exportExcel = () => {
    const sheetData = [
      ["Kayıt No", "Tarih", "Ad", "Soyad", "Telefon", "E-posta", "Mesaj", "Neden", "Tercih", "KVKK"],
      ...forms.map(f => [
        f.kayitNo || "-",
        f.createdAt ? new Date(f.createdAt).toLocaleString("tr-TR") : "-",
        f.ad, f.soyad, f.telefon, f.email, f.mesaj, f.neden, f.iletisimTercihi,
        f.kvkkOnay ? "✓" : "X"
      ])
    ];
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "İletişim Kayıtları");
    const wbout = XLSX.write(wb, { type: "array", bookType: "xlsx" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "iletisim-kayitlari.xlsx");
  };

  // Pagination
  const pageCount = Math.ceil(total / pageSize);
  const goToPage = p => setPage(p);

  // SADE ANA SÜTUNLAR:
  const columns = [
    { name: "Kayıt No", className: "min-w-[135px] text-left" },
    { name: "Tarih", className: "min-w-[140px] text-left" },
    { name: "Ad", className: "min-w-[80px] text-left" },
    { name: "Soyad", className: "min-w-[80px] text-left" },
    { name: "Telefon", className: "min-w-[120px] text-left" },
    { name: "Mesaj", className: "max-w-[110px] text-left" },
    { name: "KVKK", className: "min-w-[45px] text-center" },
    { name: "İşlem", className: "min-w-[200px] text-right" }
  ];

  return (
    <main className="max-w-6xl mx-auto px-2 py-8">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-8 text-left">İletişimden Gelenler</h1>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select
          value={pageSize}
          onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
          className="border border-[#bfa658] rounded px-2 py-1 text-sm bg-black text-[#bfa658] font-semibold focus:outline-none"
        >
          {PAGE_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={exportExcel} className="bg-[#bfa658] text-black px-4 py-2 rounded font-bold hover:opacity-80 text-sm shadow">Excel (XLSX) İndir</button>
        <button onClick={() => setShowRemoved(!showRemoved)} className="bg-[#444] border border-[#bfa658] text-[#ffeec2] font-semibold px-4 py-2 rounded hover:bg-[#bfa658] hover:text-black text-sm shadow">
          {showRemoved ? "Kaldırılanları Gizle" : "Kaldırılanları Göster"}
        </button>
        <button onClick={fetchForms} className="bg-[#19160a] border border-[#bfa658] text-[#ffeec2] font-semibold px-4 py-2 rounded hover:bg-[#bfa658] hover:text-black text-sm shadow">Şimdi Yenile</button>
        <span className="ml-2 text-sm text-gray-400">{total} kayıt bulundu.</span>
      </div>

      <div className="overflow-x-auto bg-black/80 rounded-2xl border-2 border-[#bfa658]">
        {loading ? (
          <p className="text-center py-6 text-gray-300">Yükleniyor...</p>
        ) : error ? (
          <p className="text-center py-6 text-red-400">Kayıtlar alınamadı</p>
        ) : forms.length === 0 ? (
          <p className="text-center py-6 text-gray-300">Hiç kayıt yok.</p>
        ) : (
          <table className="w-full border-collapse min-w-[800px] text-sm">
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
              {forms.map((form, idx) => (
                <tr key={form._id} className={form.kaldirildi ? "bg-[#331] text-gray-500" : "hover:bg-[#231d10] transition"}>
                  <td className="p-2 border-b border-[#bfa658] font-semibold whitespace-nowrap">{form.kayitNo || "-"}</td>
                  <td className="p-2 border-b border-[#bfa658] whitespace-nowrap">{form.createdAt ? new Date(form.createdAt).toLocaleString("tr-TR") : "-"}</td>
                  <td className="p-2 border-b border-[#bfa658] whitespace-nowrap">{form.ad}</td>
                  <td className="p-2 border-b border-[#bfa658] whitespace-nowrap">{form.soyad}</td>
                  <td className="p-2 border-b border-[#bfa658] whitespace-nowrap">{form.telefon}</td>
                  <td className="p-2 border-b border-[#bfa658] max-w-[110px] truncate">{kisaMetin(form.mesaj, 15)}</td>
                  <td className="p-2 border-b border-[#bfa658] text-center">{form.kvkkOnay ? "✓" : "X"}</td>
                  <td className="p-2 border-b border-[#bfa658] text-right">
                    <button
                      className="bg-[#bfa658] text-black px-3 py-1 rounded font-bold text-xs hover:opacity-80 shadow"
                      onClick={() => setModalForm(form)}
                      type="button"
                    >Oku</button>
                    {!form.kaldirildi ? (
                      <button
                        onClick={() => handleToggleRemove(form._id, true)}
                        className="bg-yellow-800 text-[#ffeec2] px-2 py-1 rounded text-xs font-semibold border border-[#bfa658] hover:bg-[#bfa658] hover:text-black transition ml-2"
                      >Kaldır</button>
                    ) : (
                      <button
                        onClick={() => handleToggleRemove(form._id, false)}
                        className="bg-green-800 text-[#ffeec2] px-2 py-1 rounded text-xs font-semibold border border-[#bfa658] hover:bg-green-400 hover:text-black transition ml-2"
                      >Geri Al</button>
                    )}
                    <button
                      onClick={() => handleSil(form._id)}
                      className="bg-red-700 text-white px-2 py-1 rounded text-xs font-semibold border border-[#bfa658] hover:bg-red-400 hover:text-black transition ml-2"
                    >Sil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Sayfalama */}
      {pageCount > 1 && (
        <div className="flex justify-center gap-1 mt-5">
          {Array(pageCount).fill(0).map((_, i) => (
            <button key={i} onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded font-bold border border-[#bfa658] mx-0.5 shadow-sm 
                ${page === i + 1
                  ? "bg-[#bfa658] text-black"
                  : "bg-black text-[#bfa658] hover:bg-[#19160a] hover:text-white"}`}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
      {/* Popup mail okur gibi TÜM detaylar */}
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
              <div className="text-xl font-bold text-[#bfa658]">Mesaj Detayı</div>
              <button
                className="text-2xl text-gray-400 hover:text-black"
                onClick={() => setModalForm(null)}
                aria-label="Kapat"
              >×</button>
            </div>
            {/* Detay İçerik */}
            <div className="px-6 py-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-[16px] mb-4">
                <div><b>Kayıt No:</b> {modalForm.kayitNo || "-"}</div>
                <div><b>Tarih:</b> {modalForm.createdAt ? new Date(modalForm.createdAt).toLocaleString("tr-TR") : "-"}</div>
                <div><b>Ad:</b> {modalForm.ad}</div>
                <div><b>Soyad:</b> {modalForm.soyad}</div>
                <div><b>Telefon:</b> {modalForm.telefon}</div>
                <div><b>E-posta:</b> {modalForm.email}</div>
                <div><b>Neden:</b> {modalForm.neden}</div>
                <div><b>Tercih:</b> {modalForm.iletisimTercihi}</div>
                <div><b>KVKK:</b> {modalForm.kvkkOnay ? "✓" : "X"}</div>
              </div>
              <div className="mb-1 text-[15px]"><b>Mesaj:</b></div>
              <div className="bg-gray-100 rounded-md p-3 text-gray-900 font-mono max-h-48 overflow-y-auto whitespace-pre-line break-words">{modalForm.mesaj}</div>
            </div>
            {/* Alt Butonlar */}
            <div className="flex gap-3 justify-end bg-[#faf8ef] px-6 py-4 border-t border-gray-200">
              {!modalForm.kaldirildi ? (
                <button
                  onClick={() => handleToggleRemove(modalForm._id, true)}
                  className="bg-yellow-800 text-[#ffeec2] px-4 py-2 rounded font-bold text-sm border border-[#bfa658] hover:bg-[#bfa658] hover:text-black transition"
                >Kaldır</button>
              ) : (
                <button
                  onClick={() => handleToggleRemove(modalForm._id, false)}
                  className="bg-green-800 text-[#ffeec2] px-4 py-2 rounded font-bold text-sm border border-[#bfa658] hover:bg-green-400 hover:text-black transition"
                >Geri Al</button>
              )}
              <button
                onClick={() => handleSil(modalForm._id)}
                className="bg-red-700 text-white px-4 py-2 rounded font-bold text-sm border border-[#bfa658] hover:bg-red-400 hover:text-black transition"
              >Sil</button>
              <button
                className="bg-black text-white px-4 py-2 rounded font-bold text-sm border border-[#bfa658] hover:bg-[#bfa658] hover:text-black transition"
                onClick={() => setModalForm(null)}
              >Kapat</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
