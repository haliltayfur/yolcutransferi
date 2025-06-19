// Dosya: app/admin/iletisim/page.js
"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function AdminIletisim() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showRemoved, setShowRemoved] = useState(false);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchForms = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/iletisim/forms");
      const json = await res.json();
      if (Array.isArray(json)) {
        setForms(json);
      } else {
        setError(true);
        setForms([]);
      }
    } catch (e) {
      console.error("API HATASI", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const visibleForms = forms.filter((f) => showRemoved || !f.kaldirildi);
  const paginatedForms = visibleForms.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalPages = Math.ceil(visibleForms.length / perPage);

  const handleKaldir = (id) => {
    setForms(prev => prev.map(f => f._id === id ? { ...f, kaldirildi: true } : f));
  };

  const handleShowRemovedToggle = () => setShowRemoved(prev => !prev);
  const handlePageChange = (p) => setCurrentPage(p);

  const handleExport = () => {
    const data = visibleForms.map(({ _id, ...f }) => f);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "iletisim_kayitlari.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 text-white">
      <h1 className="text-3xl font-bold text-center text-[#FFD700] mb-6">İletişimden Gelenler</h1>

      <div className="mb-4 flex flex-wrap items-center gap-4 justify-between">
        <div className="flex items-center gap-2">
          <label>Sayfa Boyutu:</label>
          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className="text-black px-2 py-1 rounded"
          >
            {[5, 10, 25, 50, 100].map((val) => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
        </div>

        <button onClick={handleShowRemovedToggle} className="bg-yellow-600 px-4 py-2 rounded text-black">
          {showRemoved ? "Kaldırılanları Gizle" : "Kaldırılanları Göster"}
        </button>

        <button onClick={handleExport} className="bg-green-600 px-4 py-2 rounded text-white">
          Export JSON
        </button>
      </div>

      <div className="border border-[#FFD700] rounded-xl overflow-x-auto">
        {loading ? (
          <p className="text-center py-6 text-gray-300">Yükleniyor...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-6">Kayıtlar alınamadı</p>
        ) : (
          <table className="w-full text-sm text-center">
            <thead>
              <tr className="bg-[#FFD700] text-black font-semibold">
                <th className="px-2 py-2">Kayıt No</th>
                <th className="px-2 py-2">Tarih</th>
                <th className="px-2 py-2">Ad Soyad</th>
                <th className="px-2 py-2">Telefon</th>
                <th className="px-2 py-2">E-posta</th>
                <th className="px-2 py-2">Mesaj</th>
                <th className="px-2 py-2">Neden</th>
                <th className="px-2 py-2">Tercih</th>
                <th className="px-2 py-2">KVKK</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginatedForms.map((f) => (
                <tr key={f._id} className={`border-t border-[#FFD700] ${f.kaldirildi ? "opacity-40" : ""}`}>
                  <td>{f.kayitNo || "-"}</td>
                  <td>{f.createdAt ? format(new Date(f.createdAt), "dd.MM.yyyy HH:mm") : "-"}</td>
                  <td>{f.ad} {f.soyad}</td>
                  <td>{f.telefon}</td>
                  <td>{f.email}</td>
                  <td>{f.mesaj}</td>
                  <td>{f.neden}</td>
                  <td>{f.iletisimTercihi}</td>
                  <td>{f.kvkkOnay ? "✅" : "❌"}</td>
                  <td>
                    {!f.kaldirildi && (
                      <button
                        onClick={() => handleKaldir(f._id)}
                        className="text-red-500 underline"
                      >Kaldır</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Sayfalama */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={`px-3 py-1 rounded ${currentPage === p ? "bg-[#FFD700] text-black" : "bg-gray-700 text-white"}`}
          >{p}</button>
        ))}
      </div>
    </main>
  );
}
