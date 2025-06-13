"use client";
import { useEffect, useState } from "react";

export default function AdminIletisimPage() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/iletisim")
      .then(r => r.json())
      .then(d => {
        setForms(d.forms || []);
        setLoading(false);
      })
      .catch(err => {
        setError("Kayıtlar alınamadı");
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-black/30 py-8">
      <section className="w-full max-w-4xl bg-black/80 rounded-2xl shadow-lg px-8 py-10 border border-gold">
        <h1 className="text-2xl font-bold text-gold mb-6 text-center">
          İletişimden Gelenler
        </h1>
        {loading && <div className="text-center text-gold">Yükleniyor...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gold text-black">
                <th className="py-2 px-2">Tarih</th>
                <th className="py-2 px-2">Ad Soyad</th>
                <th className="py-2 px-2">Telefon</th>
                <th className="py-2 px-2">E-posta</th>
                <th className="py-2 px-2">Mesaj</th>
                <th className="py-2 px-2">İletişim Nedeni</th>
                <th className="py-2 px-2">Tercihi</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((f, i) => (
                <tr key={i} className="border-b border-gold/30">
                  <td className="py-2 px-2">
                    {f.createdAt
                      ? new Date(f.createdAt).toLocaleString("tr-TR")
                      : "-"}
                  </td>
                  <td className="py-2 px-2">{f.ad} {f.soyad}</td>
                  <td className="py-2 px-2">{f.telefon}</td>
                  <td className="py-2 px-2">{f.email}</td>
                  <td className="py-2 px-2">{f.mesaj}</td>
                  <td className="py-2 px-2">{f.neden}</td>
                  <td className="py-2 px-2">{f.iletisimTercihi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
