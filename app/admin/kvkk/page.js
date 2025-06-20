"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";

// Açıklamayı kısaltmak için yardımcı fonksiyon
function kisaAciklama(str) {
  if (!str) return "";
  return str.length > 15 ? str.slice(0, 15) + "..." : str;
}

export default function AdminKvkk() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAciklama, setModalAciklama] = useState(null);

  useEffect(() => {
    async function fetchForms() {
      setLoading(true);
      try {
        const res = await fetch("/api/kvkk/forms");
        const data = await res.json();
        setForms(data);
      } catch (e) {
        // Hata durumunda boş göster, burada logging eklenebilir
        setForms([]);
      }
      setLoading(false);
    }
    fetchForms();
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-8">KVKK Başvuruları</h1>
      {loading ? (
        <p className="text-gray-300">Yükleniyor...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm bg-black/80 rounded-2xl">
            <thead>
              <tr>
                <th className="p-2 border-b border-gray-500">Kayıt No</th>
                <th className="p-2 border-b border-gray-500">Ad Soyad</th>
                <th className="p-2 border-b border-gray-500">Telefon</th>
                <th className="p-2 border-b border-gray-500">E-posta</th>
                <th className="p-2 border-b border-gray-500">Talep Türü</th>
                <th className="p-2 border-b border-gray-500">Açıklama</th>
                <th className="p-2 border-b border-gray-500">Tarih</th>
                <th className="p-2 border-b border-gray-500">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr key={form._id}>
                  <td className="p-2 border-b border-gray-600">{form.kayitNo || "-"}</td>
                  <td className="p-2 border-b border-gray-600">{form.adsoyad}</td>
                  <td className="p-2 border-b border-gray-600">{form.telefon}</td>
                  <td className="p-2 border-b border-gray-600">{form.eposta}</td>
                  <td className="p-2 border-b border-gray-600">{form.talep}</td>
                  <td className="p-2 border-b border-gray-600">
                    {kisaAciklama(form.aciklama)}
                    {form.aciklama && form.aciklama.length > 15 && (
                      <button
                        className="ml-2 underline text-[#FFD700] cursor-pointer text-xs"
                        onClick={() => setModalAciklama(form.aciklama)}
                        type="button"
                      >
                        Oku
                      </button>
                    )}
                  </td>
                  <td className="p-2 border-b border-gray-600">
                    {form.tarih ? format(new Date(form.tarih), "dd.MM.yyyy HH:mm") : "-"}
                  </td>
                  <td className="p-2 border-b border-gray-600">
                    {/* Buraya silme butonu vs. eklenebilir */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
