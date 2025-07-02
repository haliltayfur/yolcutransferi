// app/iletisim/page.jsx
// === app/admin/iletisim/page.js ===
"use client";
import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const PAGE_SIZES = [5, 10, 20, 50, 100];

function formatDate(date) {
  return new Date(date).toLocaleString("tr-TR");
}

export default function AdminIletisim() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRemoved, setShowRemoved] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [modalForm, setModalForm] = useState(null);
  const pollingRef = useRef();

  useEffect(() => {
    fetchForms();
    pollingRef.current = setInterval(fetchForms, 30000);
    return () => clearInterval(pollingRef.current);
  }, [showRemoved, page, pageSize]);

  async function fetchForms() {
    setLoading(true);
    try {
      const res = await fetch(`/api/iletisim/forms?showRemoved=${showRemoved}&page=${page}&pageSize=${pageSize}`);
      const data = await res.json();
      setForms(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      setError("Kayıtlar alınamadı");
    } finally {
      setLoading(false);
    }
  }

  async function toggleRemove(id, kaldirildi) {
    await fetch("/api/iletisim/forms", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, kaldirildi }),
    });
    fetchForms();
    setModalForm(null);
  }

  async function deleteForm(id) {
    await fetch("/api/iletisim/forms", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchForms();
    setModalForm(null);
  }

  function exportExcel() {
    const data = forms.map(f => [
      f.kayitNo, formatDate(f.createdAt), f.ad, f.soyad, f.telefon, f.email, f.neden, f.mesaj, f.iletisimTercihi, f.kvkkOnay ? "Evet" : "Hayır"
    ]);
    const sheet = XLSX.utils.aoa_to_sheet([["Kayıt No", "Tarih", "Ad", "Soyad", "Telefon", "Email", "Neden", "Mesaj", "Tercih", "KVKK"], ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, "İletişim Kayıtları");
    XLSX.writeFile(workbook, "iletisim_kayitlari.xlsx");
  }

  const pageCount = Math.ceil(total / pageSize);

  return (
    <main className="max-w-6xl mx-auto px-2 py-8 text-sm">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-6">İletişimden Gelenler</h1>
      
      <div className="flex gap-3 mb-4">
        <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}
          className="border rounded bg-black text-[#bfa658] px-2 py-1">
          {PAGE_SIZES.map(size => <option key={size} value={size}>{size}</option>)}
        </select>
        <button onClick={exportExcel} className="bg-[#bfa658] text-black px-3 py-1 rounded">Excel İndir</button>
        <button onClick={() => setShowRemoved(!showRemoved)} className="bg-gray-700 text-white px-3 py-1 rounded">
          {showRemoved ? "Kaldırılanları Gizle" : "Kaldırılanları Göster"}
        </button>
        <button onClick={fetchForms} className="bg-black text-[#bfa658] border border-[#bfa658] px-3 py-1 rounded">Yenile</button>
      </div>

      {loading ? (
        <div className="text-center py-4">Yükleniyor...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : (
        <>
          <table className="w-full border-collapse border border-[#bfa658]">
            <thead>
              <tr className="bg-black text-[#ffeec2]">
                <th className="border border-[#bfa658] p-2">Kayıt No</th>
                <th className="border border-[#bfa658] p-2">Tarih</th>
                <th className="border border-[#bfa658] p-2">Ad Soyad</th>
                <th className="border border-[#bfa658] p-2">Telefon</th>
                <th className="border border-[#bfa658] p-2">Mesaj</th>
                <th className="border border-[#bfa658] p-2">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {forms.map(form => (
                <tr key={form._id} className={form.kaldirildi ? "bg-gray-800" : "hover:bg-gray-700"}>
                  <td className="border border-[#bfa658] p-2">{form.kayitNo}</td>
                  <td className="border border-[#bfa658] p-2">{formatDate(form.createdAt)}</td>
                  <td className="border border-[#bfa658] p-2">{form.ad} {form.soyad}</td>
                  <td className="border border-[#bfa658] p-2">{form.telefon}</td>
                  <td className="border border-[#bfa658] p-2">{form.mesaj.slice(0,30)}...</td>
                  <td className="border border-[#bfa658] p-2 text-center">
                    <button className="bg-[#bfa658] px-2 py-1 rounded text-black" onClick={() => setModalForm(form)}>Oku</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-2 justify-center mt-4">
            {Array(pageCount).fill().map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)}
                className={`px-3 py-1 ${page === i + 1 ? "bg-[#bfa658] text-black" : "bg-black text-[#bfa658] border border-[#bfa658]"}`}>
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {modalForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Mesaj Detayı</h2>
            <p><b>Gönderen:</b> {modalForm.ad} {modalForm.soyad}</p>
            <p><b>Telefon:</b> {modalForm.telefon}</p>
            <p><b>Email:</b> {modalForm.email}</p>
            <p><b>Mesaj:</b> {modalForm.mesaj}</p>
            <div className="flex gap-3 justify-end mt-4">
              <button onClick={() => toggleRemove(modalForm._id, !modalForm.kaldirildi)}
                className="bg-yellow-500 px-3 py-1 rounded">Kaldır/Geri Al</button>
              <button onClick={() => deleteForm(modalForm._id)}
                className="bg-red-500 text-white px-3 py-1 rounded">Sil</button>
              <button onClick={() => setModalForm(null)}
                className="bg-gray-700 text-white px-3 py-1 rounded">Kapat</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
