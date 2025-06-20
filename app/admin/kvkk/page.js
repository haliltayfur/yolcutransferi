"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";

// Yardımcı: Kısa açıklama için
function kisaAciklama(str) {
  if (!str) return "";
  return str.length > 20 ? str.slice(0, 20) + "..." : str;
}

// Yardımcı: Kayıt no üretilmesi
function kayitNoUret(form, i) {
  if (form.kayitNo) return form.kayitNo;
  // Hem tarih, hem createdAt olabiliyor, ikisini de kontrol et!
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
  const [modalAciklama, setModalAciklama] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    async function fetchForms() {
      setLoading(true);
      try {
        const res = await fetch("/api/kvkk/forms");
        const data = await res.json();
        // DİKKAT: Sadece items dizisini alıyoruz!
        const arr = Array.isArray(data.items) ? data.items : [];
        setForms(arr);
        setFiltered(arr);
      } catch (e) {
        setForms([]);
        setFiltered([]);
      }
      setLoading(false);
    }
    fetchForms();
  }, []);

  // Sayfalama
  const totalPages = Math.ceil(filtered.length / perPage);
  const pagedForms = filtered.slice((page - 1) * perPage, page * perPage);

  // Excel Export
  function exportCSV() {
    if (!filtered.length) return;
    const keys = [
      "Kayıt No", "Tarih", "Ad Soyad", "Telefon", "E-posta", "Talep Türü", "Açıklama"
    ];
    const rows = [
      keys.join(";"),
      ...filtered.map((f, i) =>
        [
          kayitNoUret(f, i),
          // tarih veya createdAt
          f.tarih
            ? format(new Date(f.tarih), "dd.MM.yyyy HH:mm")
            : f.createdAt
            ? format(new Date(f.createdAt), "dd.MM.yyyy HH:mm")
            : "",
          f.adsoyad || "",
          f.telefon || "",
          f.eposta || "",
          f.talep || "",
          (f.aciklama || "").replace(/;/g, " "),
        ].join(";")
      ),
    ].join("\n");
    const blob = new Blob([rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kvkk_basvurulari.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="max-w-6xl mx-auto px-2 py-8">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-6">KVKK Başvuruları</h1>

      <div className="mb-3 flex flex-wrap items-center gap-3">
        <select
          value={perPage}
          onChange={e => { setPerPage(Number(e.target.value)); setPage(1); }}
          className="border border-gray-500 rounded px-2 py-1 text-sm"
        >
          {[5, 10, 25, 50, 100].map((v) => <option key={v}>{v}</option>)}
        </select>
        <button onClick={exportCSV}
          className="bg-[#bfa658] text-black px-3 py-2 rounded font-bold hover:opacity-80 text-sm">
          Excel (CSV) İndir
        </button>
        <span className="ml-2 text-sm text-gray-400">{filtered.length} başvuru bulundu.</span>
      </div>

      <div className="overflow-x-auto bg-black/80 rounded-2xl border-2 border-[#bfa658]">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="p-2 border-b border-gray-600">Kayıt No</th>
              <th className="p-2 border-b border-gray-600">Tarih</th>
              <th className="p-2 border-b border-gray-600">Ad Soyad</th>
              <th className="p-2 border-b border-gray-600">Telefon</th>
              <th className="p-2 border-b border-gray-600">E-posta</th>
              <th className="p-2 border-b border-gray-600">Talep Türü</th>
              <th className="p-2 border-b border-gray-600">Açıklama</th>
              <th className="p-2 border-b border-gray-600">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center p-4 text-gray-400">Yükleniyor...</td>
              </tr>
            ) : pagedForms.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center p-4 text-gray-400">Hiç başvuru bulunamadı.</td>
              </tr>
            ) : (
              pagedForms.map((form, i) => (
                <tr key={form._id || i}>
                  <td className="p-2 border-b border-gray-700">{kayitNoUret(form, i + (page-1)*perPage)}</td>
                  <td className="p-2 border-b border-gray-700">
                    {form.tarih
                      ? format(new Date(form.tarih), "dd.MM.yyyy HH:mm")
                      : form.createdAt
                      ? format(new Date(form.createdAt), "dd.MM.yyyy HH:mm")
                      : ""}
                  </td>
                  <td className="p-2 border-b border-gray-700">{form.adsoyad}</td>
                  <td className="p-2 border-b border-gray-700">{form.telefon}</td>
                  <td className="p-2 border-b border-gray-700">{form.eposta}</td>
                  <td className="p-2 border-b border-gray-700">{form.talep}</td>
                  <td className="p-2 border-b border-gray-700">
                    {kisaAciklama(form.aciklama)}
                    {form.aciklama && form.aciklama.length > 20 && (
                      <button
                        className="ml-2 underline text-[#FFD700] cursor-pointer text-xs"
                        onClick={() => setModalAciklama(form.aciklama)}
                        type="button"
                      >
                        Oku
                      </button>
                    )}
                  </td>
                  <td className="p-2 border-b border-gray-700">
                    {/* Silme, düzenleme vs. ekleyebilirsin */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Sayfalama butonları */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-1 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded font-bold border ${page === i + 1 ? "bg-[#bfa658] text-black" : "bg-black text-[#bfa658]"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modal açıklama kutusu */}
      {modalAciklama && (
        <div
          className="fixed left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-50"
          onClick={() => setModalAciklama(null)}
        >
          <div
            className="bg-white text-black p-6 rounded-lg max-w-xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 font-bold text-lg">Tüm Açıklama</div>
            <div className="whitespace-pre-line">{modalAciklama}</div>
            <button
              className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
              onClick={() => setModalAciklama(null)}
              type="button"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
