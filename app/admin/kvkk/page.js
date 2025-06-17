// ✅ Dosya: app/admin/kvkk/page.js
"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function AdminKvkk() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchForms = async () => {
    setLoading(true);
    const res = await fetch("/api/kvkk/forms");
    const data = await res.json();
    setForms(data);
    setLoading(false);
    localStorage.setItem("kvkkLastRead", new Date().toISOString());
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-8">KVKK Başvuruları</h1>
      {loading ? (
        <p className="text-gray-300">Yükleniyor...</p>
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
              <p className="text-sm text-gray-400 mt-2">Gönderim Tarihi: {format(new Date(form.createdAt), "dd.MM.yyyy HH:mm")}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
