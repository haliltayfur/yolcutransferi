"use client";
import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const PAGE_SIZES = [5, 10, 20, 100];

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

  // Her 10sn’de bir güncelle + “şimdi yenile” ile manuel tetikleme
  useEffect(() => {
    fetchForms();
    pollingRef.current = setInterval(() => fetchForms(), 10000);
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

  // Excel Export (XLSX, Türkçe uyumlu)
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

  return (
    <main className="max-w-6xl mx-auto px-2 py-8">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-8 text-center">İletişimden Gelenler</h1>
      <div className="flex flex-wrap items-center gap-3 mb-4">
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
          <table className="min-w-full text-sm border-separate border-spacing-0">
            <thead>
              <tr>
                {["Kayıt No", "Tarih", "Ad", "Soyad", "Telefon", "E-posta", "Mesaj", "Neden", "Tercih", "KVKK", "İşlem"].map((col, i, arr) => (
                  <th
                    key={col}
                    className="p-2 border-b-2 border-[#bfa658] bg-black/90 text-[#ffeec2] font-bold"
                    style={{ borderRight: i !== arr.length - 1 ? '1px solid #bfa658' : undefined }}
                  >{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {forms.map((form, idx) => (
                <tr key={form._id} className={form.kaldirildi ? "bg-[#331] text-gray-500" : "hover:bg-[#231d10] transition"}>
                  <td className="p-2 border-b border-[#bfa658] font-semibold" style={{ borderRight: '1px solid #bfa658' }}>{form.kayitNo || "-"}</td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>{form.createdAt ? new Date(form.createdAt).toLocaleString("tr-TR") : "-"}</td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>{form.ad}</td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>{form.soyad}</td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>{form.telefon}</td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>{form.email}</td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>
                    <button
                      className="bg-[#bfa658] text-black px-3 py-1 rounded font-bold text-xs mr-1 hover:opacity-80 shadow"
                      onClick={() => setModalForm(form)}
                      type="button"
                    >Oku</button>
                  </td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>{form.neden}</td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>{form.iletisimTercihi}</td>
                  <td className="p-2 border-b border-[#bfa658]" style={{ borderRight: '1px solid #bfa658' }}>{form.kvkkOnay ? "✓" : "X"}</td>
                  <td className="p-2 border-b border-[#bfa658] text-center min-w-[120px]">
                    {!form.kaldirildi ? (
                      <button
                        onClick={() => handleToggleRemove(form._id, true)}
                        className="bg-yellow-800 text-[#ffeec2] px-2 py-1 rounded mr-2 text-xs font-semibold border border-[#bfa658] hover:bg-[#bfa658] hover:text-black transition"
                      >Kaldır</button>
                    ) : (
                      <button
                        onClick={() => handleToggleRemove(form._id, false)}
                        className="bg-green-800 text-[#ffeec2] px-2 py-1 rounded mr-2 text-xs font-semibold border border-[#bfa658] hover:bg-green-400 hover:text-black transition"
                      >Geri Al</button>
                    )}
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
