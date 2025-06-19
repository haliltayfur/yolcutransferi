"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function AdminKvkk() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchForms = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/kvkk/forms");
      const json = await res.json();

      if (Array.isArray(json)) {
        setForms(json);
      } else {
        console.error("Veri dizi değil:", json);
        setForms([]);
        setError(true);
      }
    } catch (err) {
      console.error("KVKK verisi çekilemedi:", err);
      setForms([]);
      setError(true);
    } finally {
      setLoading(false);
      localStorage.setItem("kvkkLastRead", new Date().toISOString());
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 text-white">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-8 text-center">KVKK Başvuruları</h1>

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
                <th className="px-2 py-2">Tarih</th>
                <th className="px-2 py-2">Ad Soyad</th>
                <th className="px-2 py-2">Telefon</th>
                <th className="px-2 py-2">E-posta</th>
                <th className="px-2 py-2">Talep Türü</th>
                <th className="px-2 py-2">Açıklama</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr key={form._id} className="border-t border-[#bfa658] text-gray-200">
                  <td className="px-2 py-2">
                    {form.createdAt ? format(new Date(form.createdAt), "dd.MM.yyyy HH:mm") : "-"}
                  </td>
                  <td className="px-2 py-2">{form.adsoyad}</td>
                  <td className="px-2 py-2">{form.telefon || "-"}</td>
                  <td className="px-2 py-2">{form.eposta}</td>
                  <td className="px-2 py-2">{form.talep}</td>
                  <td className="px-2 py-2">{form.aciklama || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
