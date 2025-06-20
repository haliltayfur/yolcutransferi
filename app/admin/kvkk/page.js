"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function AdminKvkk() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Sayfalama ekleyelim (geliştirilebilir)
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const fetchForms = async (currPage = page, currPageSize = pageSize) => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/kvkk/forms?page=${currPage}&pageSize=${currPageSize}`);
      const json = await res.json();

      // Hata kontrolü
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

  useEffect(() => {
    fetchForms(page, pageSize);
    // eslint-disable-next-line
  }, [page, pageSize]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 text-white">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-8 text-center">KVKK Başvuruları</h1>
      <div className="mb-4 flex items-center gap-4">
        <label>Sayfa Boyutu:</label>
        <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} className="text-black px-2 py-1 rounded">
          {[5, 10, 25, 50, 100].map(size => (
            <option value={size} key={size}>{size}</option>
          ))}
        </select>
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
                <th className="px-2 py-2">Kayıt No</th>
                <th className="px-2 py-2">Tarih</th>
                <th className="px-2 py-2">Ad Soyad</th>
                <th className="px-2 py-2">Telefon</th>
                <th className="px-2 py-2">E-posta</th>
                <th className="px-2 py-2">Talep Türü</th>
                <th className="px-2 py-2">Açıklama</th>
                <th className="px-2 py-2">KVKK</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form, i) => (
                <tr key={form._id || i} className="border-t border-[#bfa658] text-gray-200">
                  <td className="px-2 py-2">{form.kayitNo || "-"}</td>
                  <td className="px-2 py-2">
                    {form.createdAt ? format(new Date(form.createdAt), "dd.MM.yyyy HH:mm") : "-"}
                  </td>
                  <td className="px-2 py-2">{form.adsoyad}</td>
                  <td className="px-2 py-2">{form.telefon || "-"}</td>
                  <td className="px-2 py-2">{form.eposta}</td>
                  <td className="px-2 py-2">{form.talep}</td>
                  <td className="px-2 py-2">{form.aciklama || "-"}</td>
                  <td className="px-2 py-2">{form.kvkkOnay ? "✓" : "X"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Sayfalama butonları */}
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
