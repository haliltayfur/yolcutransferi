// ✅ Dosya: app/admin/kvkk/page.js
"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function AdminKvkk() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // ❗️Hata durumu eklendi

  const fetchForms = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/kvkk/forms");
      const json = await res.json();

      // ✅ Dizi mi kontrolü
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
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-8">KVKK Başvuruları</h1>

      {loading ? (
        <p className="text-gray-300">Yükleniyor...</p>
      ) : error ? (
        <p className="text-red-500">Veri alınırken bir hata oluştu.</p>
      ) : forms.length === 0 ? (
        <p className="text-gray-300">Henüz başvuru yok.</p>
      ) : (
        <div className="space-y-6">
          {forms.map((form) => (
            <div key={form._id} className="border border-[#bfa658] rounded-lg bg-black/70 p-6 text-gray-200">
              <p><strong>Ad Soyad:</strong> {form.adsoyad}</p>
              <p><strong>Telefon:</strong> {form.telefon || "-"}</p>
              <p><strong>E-posta:</strong> {form.eposta}</p>
              <p><strong>Talep:</strong> {form.talep}</p>
              <p><strong>Açıklama:</strong> {form.aciklama || "-"}</p>
              <p className="text-sm text-gray-400 mt-2">
                Gönderim Tarihi:{" "}
                {form.createdAt
                  ? format(new Date(form.createdAt), "dd.MM.yyyy HH:mm")
                  : "-"}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
