"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function AdminKvkk() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [showRemoved, setShowRemoved] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [total, setTotal] = useState(0);

  // Export
  function exportCSV() {
    const headers = ["Kayıt No", "Tarih", "Ad Soyad", "Telefon", "E-posta", "Talep Türü", "Açıklama", "KVKK"];
    const rows = [headers, ...forms.map(f => [
      f.kayitNo || "-",
      f.createdAt ? format(new Date(f.createdAt), "dd.MM.yyyy HH:mm") : "-",
      f.adsoyad,
      f.telefon || "-",
      f.eposta,
      f.talep,
      (f.aciklama || "").replace(/\s+/g, " "),
      f.kvkkOnay ? "✓" : "X"
    ])];
    const csvContent = "\uFEFF" + rows.map(e => e.join(";")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kvkk_kayitlari.csv";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  // GET
  const fetchForms = async (currPage = page, currPageSize = pageSize, removed = showRemoved) => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/kvkk/forms?page=${currPage}&pageSize=${currPageSize}&showRemoved=${removed}`);
      const json = await res.json();
      if (json.items && Array.isArray(json.items)) {
        setForms(json.items);
        setTotal(json.total || 0);
      } else {
        setForms([]);
        setError(true);
      }
    } catch (err) {
      setForms([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Kaldır/Geri Ekle
  const toggleKaldir = async (id, currVal) => {
    await fetch("/api/kvkk/forms", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, kaldirildi: !currVal }),
    });
    fetchForms(page, pageSize, showRemoved);
  };

  // Otomatik güncelleme (10s) SADECE bu sayfa açıksa!
  useEffect(() => {
    fetchForms(page, pageSize, showRemoved);
    const timer = setInterval(() => fetchForms(page, pageSize, showRemoved), 10000);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [page, pageSize, showRemoved]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 text-white">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-8 text-center">KVKK Başvuruları</h1>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <label>Sayfa Boyutu:</label>
        <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} className="text-black px-2 py-1 rounded">
          {[5, 10, 25, 50, 100].map(size => (
            <option value={size} key={size}>{size}</option>
          ))}
        </select>
        <button
          onClick={() => setShowRemoved(v => !v)}
          className="ml-2 bg-[#bfa658] px-4 py-2 rounded font-bold text-black shadow"
        >
          {showRemoved ? "Kaldırılanları Gizle" : "Kaldırılanları Göster"}
        </button>
        <button
          onClick={exportCSV}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold shadow"
        >
          Excel (CSV) İndir
        </button>
      </div>
      <div className="border border-[#bfa658] rounded-xl overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-300 py-4">Yükleniyor...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-4">Kayıtlar alınamadı</p>
        ) : forms.length === 0 ? (
          <p className="text-center text-gray-300 py-4">Henüz başvuru yok.</p>
        ) : (
          <table className="w-full text-sm text-center">
            <thead>
              <tr className="bg-[#bfa658] text-black font-semibold">
                <th>Kayıt No</th>
                <th>Tarih</th>
                <th>Ad Soyad</th>
                <th>Telefon</th>
                <th>E-posta</th>
                <th>Talep Türü</th>
                <th>Açıklama</th>
                <th>KVKK</th>
                <th>Kaldır</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form, i) => (
                <tr key={form._id || i} className={`border-t border-[#bfa658] text-gray-200 ${form.kaldirildi ? "opacity-60 bg-gray-800" : ""}`}>
                  <td>{form.kayitNo || "-"}</td>
                  <td>{form.createdAt ? format(new Date(form.createdAt), "dd.MM.yyyy HH:mm") : "-"}</td>
                  <td>{form.adsoyad}</td>
                  <td>{form.telefon || "-"}</td>
                  <td>{form.eposta}</td>
                  <td>{form.talep}</td>
                  <td>{form.aciklama || "-"}</td>
                  <td>{form.kvkkOnay ? "✓" : "X"}</td>
                  <td>
                    <button
                      onClick={() => toggleKaldir(form._id, form.kaldirildi)}
                      className={`px-2 py-1 font-bold rounded ${form.kaldirildi ? "bg-yellow-600" : "bg-red-600"} text-white hover:bg-black transition`}
                    >
                      {form.kaldirildi ? "Geri Al" : "Kaldır"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Sayfalama */}
      <div className="flex gap-2 mt-4 justify-center">
        {[...Array(Math.ceil(total / pageSize)).keys()].map(i => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-8 h-8 rounded ${page === i + 1 ? "bg-[#bfa658] text-black" : "bg-gray-800 text-white"} font-bold`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </main>
  );
}
