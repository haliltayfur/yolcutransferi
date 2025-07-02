// app/admin/iletisim/page.jsx
"use client";
import React, { useState, useEffect } from "react";

// --- Yardımcılar ---
function kisaMetin(str, len = 20) {
  if (!str) return "";
  return str.length > len ? str.slice(0, len) + "..." : str;
}

export default function AdminIletisim() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalForm, setModalForm] = useState(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/iletisim");
      const json = await res.json();
      if (json.forms) setForms(json.forms);
      else setError(json.error || "Bilinmeyen hata!");
    } catch (err) {
      setError("Kayıtlar alınamadı: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-2 py-8">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-8">İletişimden Gelenler</h1>
      <div className="overflow-x-auto bg-black/80 rounded-2xl border-2 border-[#bfa658]">
        {loading ? (
          <p className="text-center py-8 text-gray-300 text-xl">Yükleniyor...</p>
        ) : error ? (
          <p className="text-center py-8 text-red-400 text-xl">{error}</p>
        ) : forms.length === 0 ? (
          <p className="text-center py-14 text-gray-400 text-2xl font-semibold">Hiç kayıt yok.</p>
        ) : (
          <table className="w-full border-collapse min-w-[900px] text-sm">
            <thead>
              <tr>
                <th className="p-2 border-b-2 border-[#bfa658]">Kayıt No</th>
                <th className="p-2 border-b-2 border-[#bfa658]">Tarih</th>
                <th className="p-2 border-b-2 border-[#bfa658]">Ad</th>
                <th className="p-2 border-b-2 border-[#bfa658]">Soyad</th>
                <th className="p-2 border-b-2 border-[#bfa658]">Telefon</th>
                <th className="p-2 border-b-2 border-[#bfa658]">E-posta</th>
                <th className="p-2 border-b-2 border-[#bfa658]">Mesaj</th>
                <th className="p-2 border-b-2 border-[#bfa658]">Neden</th>
                <th className="p-2 border-b-2 border-[#bfa658]">Tercih</th>
                <th className="p-2 border-b-2 border-[#bfa658]">KVKK</th>
                <th className="p-2 border-b-2 border-[#bfa658]">Detay</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form, idx) => (
                <tr key={form._id || idx} className="hover:bg-[#232016] transition">
                  <td className="p-2 border-b border-[#bfa658]">{form.kayitNo || "-"}</td>
                  <td className="p-2 border-b border-[#bfa658]">{form.createdAt ? new Date(form.createdAt).toLocaleString("tr-TR") : "-"}</td>
                  <td className="p-2 border-b border-[#bfa658]">{form.ad}</td>
                  <td className="p-2 border-b border-[#bfa658]">{form.soyad}</td>
                  <td className="p-2 border-b border-[#bfa658]">{form.telefon}</td>
                  <td className="p-2 border-b border-[#bfa658]">{form.email}</td>
                  <td className="p-2 border-b border-[#bfa658]">{kisaMetin(form.mesaj, 20)}</td>
                  <td className="p-2 border-b border-[#bfa658]">{form.neden}</td>
                  <td className="p-2 border-b border-[#bfa658]">{form.iletisimTercihi}</td>
                  <td className="p-2 border-b border-[#bfa658] text-center">{form.kvkkOnay ? "✓" : "X"}</td>
                  <td className="p-2 border-b border-[#bfa658] text-center">
                    <button
                      className="bg-[#bfa658] text-black px-2 py-1 rounded font-bold text-xs hover:opacity-80 shadow"
                      onClick={() => setModalForm(form)}
                    >Oku</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Detay Modalı */}
      {modalForm && (
        <div
          className="fixed left-0 top-0 w-full h-full bg-black/70 flex items-center justify-center z-50"
          onClick={() => setModalForm(null)}
        >
          <div
            className="bg-white text-black p-0 rounded-xl max-w-2xl w-full shadow-2xl relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200 bg-[#f3ecd1]">
              <div className="text-xl font-bold text-[#bfa658]">Mesaj Detayı</div>
              <button
                className="text-2xl text-gray-400 hover:text-black"
                onClick={() => setModalForm(null)}
                aria-label="Kapat"
              >×</button>
            </div>
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
            <div className="flex gap-3 justify-end bg-[#faf8ef] px-6 py-4 border-t border-gray-200">
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
// app/admin/iletisim/page.jsx SONU
