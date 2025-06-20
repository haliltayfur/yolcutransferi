"use client";
import { useEffect, useState } from "react";

const PAGE_SIZES = [5, 10, 20, 100];

export default function AdminIletisim() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showRemoved, setShowRemoved] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  // Her 10sn’de bir güncelle (isteğe bağlı: ŞİMDİ YENİLE butonu da ekle)
  useEffect(() => {
    let interval = setInterval(() => {
      fetchForms();
    }, 10000);
    fetchForms();
    return () => clearInterval(interval);
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

  // Kaldır/Geri Al
  const handleToggleRemove = async (id, kaldirildi) => {
    await fetch("/api/iletisim/forms", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, kaldirildi }),
    });
    fetchForms();
  };

  // CSV Export
  const exportCSV = () => {
    const header = [
      "Kayıt No", "Tarih", "Ad", "Soyad", "Telefon", "E-posta",
      "Mesaj", "Neden", "Tercih", "KVKK"
    ];
    const rows = forms.map(f => [
      f.kayitNo || "-", f.createdAt ? new Date(f.createdAt).toLocaleString("tr-TR") : "-",
      f.ad, f.soyad, f.telefon, f.email, f.mesaj, f.neden, f.iletisimTercihi,
      f.kvkkOnay ? "✓" : "X"
    ]);
    const csvContent = "\uFEFF" + [header, ...rows].map(e => e.join(";")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "iletisim-kayitlari.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Pagination
  const pageCount = Math.ceil(total / pageSize);
  const goToPage = p => setPage(p);

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold text-[#FFD700] mb-8 text-center">İletişimden Gelenler</h1>
      <div className="flex flex-row gap-3 items-center mb-4">
        <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }} className="text-black rounded px-2 py-1">
          {PAGE_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={exportCSV} className="bg-green-600 text-white rounded px-3 py-1 font-semibold">Excel (CSV) İndir</button>
        <button onClick={() => setShowRemoved(!showRemoved)} className="bg-yellow-700 text-white rounded px-3 py-1 font-semibold">
          {showRemoved ? "Kaldırılanları Gizle" : "Kaldırılanları Göster"}
        </button>
        <button onClick={fetchForms} className="bg-gray-700 text-white rounded px-3 py-1 font-semibold">Şimdi Yenile</button>
      </div>

      <div className="rounded-xl border-2 border-[#FFD700] overflow-x-auto">
        {loading ? (
          <p className="text-center py-6 text-gray-300">Yükleniyor...</p>
        ) : error ? (
          <p className="text-center py-6 text-red-400">Kayıtlar alınamadı</p>
        ) : forms.length === 0 ? (
          <p className="text-center py-6 text-gray-300">Hiç kayıt yok.</p>
        ) : (
          <table className="w-full text-sm text-center">
            <thead>
              <tr className="bg-[#FFD700] text-black">
                <th>Kayıt No</th>
                <th>Tarih</th>
                <th>Ad</th>
                <th>Soyad</th>
                <th>Telefon</th>
                <th>E-posta</th>
                <th>Mesaj</th>
                <th>Neden</th>
                <th>Tercih</th>
                <th>KVKK</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {forms.map(form => (
                <tr key={form._id} className={form.kaldirildi ? "bg-[#331] text-gray-500" : ""}>
                  <td>{form.kayitNo || "-"}</td>
                  <td>{form.createdAt ? new Date(form.createdAt).toLocaleString("tr-TR") : "-"}</td>
                  <td>{form.ad}</td>
                  <td>{form.soyad}</td>
                  <td>{form.telefon}</td>
                  <td>{form.email}</td>
                  <td>{form.mesaj}</td>
                  <td>{form.neden}</td>
                  <td>{form.iletisimTercihi}</td>
                  <td>{form.kvkkOnay ? "✓" : "X"}</td>
                  <td>
                    {!form.kaldirildi ? (
                      <button onClick={() => handleToggleRemove(form._id, true)} className="text-red-500 hover:underline">Kaldır</button>
                    ) : (
                      <button onClick={() => handleToggleRemove(form._id, false)} className="text-green-400 hover:underline">Geri Al</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Sayfalama */}
      <div className="flex justify-center gap-2 mt-5">
        {Array(pageCount).fill(0).map((_, i) => (
          <button key={i} onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 rounded ${page === i + 1 ? "bg-[#FFD700] text-black font-bold" : "bg-[#222] text-white"}`}>
            {i + 1}
          </button>
        ))}
      </div>
    </main>
  );
}
