"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function AdminIletisim() {
  const [kayitlar, setKayitlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showRemoved, setShowRemoved] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  async function fetchKayitlar() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/iletisim/forms?showRemoved=${showRemoved}&page=${page}&pageSize=${pageSize}`);
      const data = await res.json();
      if (data.items && Array.isArray(data.items)) {
        setKayitlar(data.items);
        setTotal(data.total || 0);
      } else {
        setKayitlar([]);
        setError(true);
      }
    } catch {
      setKayitlar([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchKayitlar();
    // eslint-disable-next-line
  }, [showRemoved, page, pageSize]);

  // Her 10 sn'de bir otomatik yenile
  useEffect(() => {
    const timer = setInterval(fetchKayitlar, 10000);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [showRemoved, page, pageSize]);

  async function handleRemove(id, kaldirildi) {
    await fetch("/api/iletisim/forms", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, kaldirildi })
    });
    fetchKayitlar();
  }

  // Export fonksiyonları
  function exportJSON() {
    const data = kayitlar.map(({ _id, ...kalan }) => kalan);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "iletisim-kayitlari.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  // Export Excel (CSV)
  function exportCSV() {
    if (!kayitlar.length) return;
    const header = Object.keys(kayitlar[0]).join(";");
    const rows = kayitlar.map(obj => Object.values(obj).join(";"));
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "iletisim-kayitlari.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  // Export basit PDF (text tabanlı)
  function exportPDF() {
    if (!kayitlar.length) return;
    let txt = "";
    txt += Object.keys(kayitlar[0]).join("\t") + "\n";
    txt += kayitlar.map(obj => Object.values(obj).join("\t")).join("\n");
    const blob = new Blob([txt], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "iletisim-kayitlari.pdf";
    a.click();
    URL.revokeObjectURL(url);
  }

  // --- Sayfalama ---
  const totalPages = Math.ceil(total / pageSize);
  function sayfaNo(n) {
    setPage(n);
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-8 text-center">İletişimden Gelenler</h1>

      <div className="mb-3 flex items-center gap-4">
        <label className="text-gray-400 font-semibold mr-2">Sayfa Boyutu:</label>
        <select
          className="border rounded px-2 py-1 text-black"
          value={pageSize}
          onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}>
          {[5, 10, 20, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <button
          onClick={() => setShowRemoved(v => !v)}
          className="bg-[#bfa658] hover:bg-yellow-700 text-black font-bold px-5 py-1 rounded shadow ml-4"
        >
          {showRemoved ? "Kaldırılanları Gizle" : "Kaldırılanları Göster"}
        </button>
        <button onClick={exportJSON} className="bg-green-600 hover:bg-green-800 text-white font-bold px-4 py-1 rounded mx-2">JSON</button>
        <button onClick={exportCSV} className="bg-blue-600 hover:bg-blue-800 text-white font-bold px-4 py-1 rounded mx-2">Excel (CSV)</button>
        <button onClick={exportPDF} className="bg-red-600 hover:bg-red-800 text-white font-bold px-4 py-1 rounded mx-2">PDF</button>
        <button onClick={fetchKayitlar} className="ml-4 bg-gray-800 hover:bg-gray-900 text-white px-4 py-1 rounded border">Güncelle</button>
      </div>

      <div className="border border-[#bfa658] rounded-xl overflow-x-auto min-h-[70px]">
        {loading ? (
          <p className="text-center text-gray-300 py-4">Yükleniyor...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-4">Kayıtlar alınamadı</p>
        ) : kayitlar.length === 0 ? (
          <p className="text-center text-gray-300 py-4">Kayıt bulunamadı.</p>
        ) : (
          <table className="w-full text-sm text-center">
            <thead>
              <tr className="bg-[#bfa658] text-black font-semibold">
                <th className="px-2 py-2">Kayıt No</th>
                <th className="px-2 py-2">Tarih</th>
                <th className="px-2 py-2">Ad Soyad</th>
                <th className="px-2 py-2">Telefon</th>
                <th className="px-2 py-2">E-posta</th>
                <th className="px-2 py-2">Mesaj</th>
                <th className="px-2 py-2">İletişim Nedeni</th>
                <th className="px-2 py-2">Tercih</th>
                <th className="px-2 py-2">KVKK</th>
                <th className="px-2 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {kayitlar.map(form => (
                <tr key={form._id} className="border-t border-[#bfa658] text-gray-200">
                  <td className="px-2 py-2">{form.kayitNo || "-"}</td>
                  <td className="px-2 py-2">{form.createdAt ? format(new Date(form.createdAt), "dd.MM.yyyy HH:mm") : "-"}</td>
                  <td className="px-2 py-2">{(form.ad || "") + " " + (form.soyad || "")}</td>
                  <td className="px-2 py-2">{form.telefon}</td>
                  <td className="px-2 py-2">{form.email}</td>
                  <td className="px-2 py-2">{form.mesaj}</td>
                  <td className="px-2 py-2">{form.neden}</td>
                  <td className="px-2 py-2">{form.iletisimTercihi}</td>
                  <td className="px-2 py-2">{form.kvkkOnay ? "✓" : <span className="text-red-500">✗</span>}</td>
                  <td className="px-2 py-2">
                    <button
                      className={`text-sm font-bold ${form.kaldirildi ? "text-green-400" : "text-red-500"} underline`}
                      onClick={() => handleRemove(form._id, !form.kaldirildi)}
                    >
                      {form.kaldirildi ? "Geri Ekle" : "Kaldır"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Sayfa numarası */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => sayfaNo(idx + 1)}
            className={`w-7 h-7 rounded-full mx-1 ${page === idx + 1 ? "bg-[#bfa658] text-black font-bold" : "bg-[#333] text-white"}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </main>
  );
}
