"use client";
import { useEffect, useState } from "react";

// Tablo başlıkları
const columns = [
  { label: "Kayıt No", key: "kayitNo" },
  { label: "Tarih", key: "createdAt" },
  { label: "Ad", key: "ad" },
  { label: "Soyad", key: "soyad" },
  { label: "Telefon", key: "telefon" },
  { label: "E-posta", key: "email" },
  { label: "Mesaj", key: "mesaj" },
  { label: "Neden", key: "neden" },
  { label: "Tercih", key: "iletisimTercihi" },
  { label: "KVKK", key: "kvkkOnay" }
];

function formatDate(dt) {
  try {
    if (!dt) return "";
    const date = new Date(dt);
    return date.toLocaleString("tr-TR", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
  } catch {
    return dt;
  }
}

export default function AdminIletisim() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Export için kod burada
  function exportCSV() {
    const rows = [
      columns.map(col => col.label), // header
      ...data.map(row =>
        columns.map(col => {
          if (col.key === "createdAt") return formatDate(row[col.key]);
          if (col.key === "kvkkOnay") return row[col.key] ? "✔" : "✗";
          return typeof row[col.key] === "string" ? row[col.key].replace(/;/g, ",") : row[col.key] || "";
        })
      )
    ];
    // UTF-8 BOM ile başlatıyoruz
    const csvContent = "\uFEFF" + rows.map(e => e.join(";")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "iletisim-kayitlari.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Kayıtları çek
  const fetchData = async () => {
    setLoading(true); setError(false);
    try {
      const res = await fetch("/api/iletisim/forms?page=1&pageSize=1000");
      const { items } = await res.json();
      setData(items);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-8 text-center">İletişimden Gelenler</h1>
      <button
        onClick={exportCSV}
        className="mb-4 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >Excel (CSV) İndir</button>

      <div className="overflow-x-auto border border-[#bfa658] rounded-xl mt-4">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Yükleniyor...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">Kayıtlar alınamadı</div>
        ) : (
          <table className="min-w-full text-sm text-center">
            <thead>
              <tr className="bg-[#bfa658] text-black font-semibold">
                {columns.map(col => <th key={col.key} className="px-2 py-2">{col.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <tr key={row._id} className="border-t border-[#bfa658] text-gray-200">
                  {columns.map(col => (
                    <td key={col.key} className="px-2 py-2">
                      {col.key === "createdAt" ? formatDate(row[col.key])
                        : col.key === "kvkkOnay" ? (row.kvkkOnay ? "✔" : "✗")
                        : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
