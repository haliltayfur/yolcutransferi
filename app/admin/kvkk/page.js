"use client";
import { useEffect, useState } from "react";

// Modal bileşeni
function Modal({ open, onClose, form }) {
  if (!open || !form) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40">
      <div className="bg-[#191919] rounded-2xl shadow-2xl p-7 max-w-lg w-full border-2 border-[#bfa658] relative">
        <h2 className="text-2xl font-bold mb-5 text-[#bfa658]">Başvuru Detayları</h2>
        <div className="space-y-3 text-[1rem]">
          <div><span className="font-bold text-[#bfa658]">Kayıt No: </span> {form.kayitNo}</div>
          <div><span className="font-bold text-[#bfa658]">Ad Soyad: </span> {form.adsoyad}</div>
          <div><span className="font-bold text-[#bfa658]">Telefon: </span> {form.telefon}</div>
          <div><span className="font-bold text-[#bfa658]">E-posta: </span> {form.eposta}</div>
          <div><span className="font-bold text-[#bfa658]">Talep Türü: </span> {form.talep}</div>
          <div>
            <span className="font-bold text-[#bfa658]">Açıklama: </span>
            <div className="whitespace-pre-line bg-black/40 rounded p-2 mt-1 text-gray-200">{form.aciklama}</div>
          </div>
          <div><span className="font-bold text-[#bfa658]">Tarih: </span> {form.tarih}</div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-[#bfa658] hover:text-white text-2xl font-bold"
          title="Kapat"
        >×</button>
      </div>
    </div>
  );
}

export default function AdminKvkk() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  // Kayıt No sıralı üretme (backendde yoksa)
  function formatKayitNo(index) {
    return `kvkkgunayyil_${(index + 1).toString().padStart(4, "0")}`;
  }

  // Yeni verileri getir
  const fetchForms = async () => {
    setLoading(true);
    const res = await fetch("/api/kvkk/forms");
    const data = await res.json();
    setForms(data);
    setLoading(false);
    localStorage.setItem("kvkkLastRead", new Date().toISOString());
  };

  // 15 sn'de bir sadece yeni kayıt varsa ekle
  useEffect(() => {
    fetchForms();
    const intv = setInterval(async () => {
      const res = await fetch("/api/kvkk/forms");
      const data = await res.json();
      if (data.length > forms.length) {
        setForms(data);
      }
    }, 15000);
    return () => clearInterval(intv);
    // eslint-disable-next-line
  }, [forms]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 mt-12 md:mt-16">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-8">KVKK Başvuruları</h1>
      {loading ? (
        <p className="text-gray-300">Yükleniyor...</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border-2 border-[#bfa658] bg-black/80">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-[#221c0e] text-[#e3b77b] text-base">
                <th className="px-3 py-3 text-left font-bold">Kayıt No</th>
                <th className="px-3 py-3 text-left font-bold">Tarih</th>
                <th className="px-3 py-3 text-left font-bold">Ad Soyad</th>
                <th className="px-3 py-3 text-left font-bold">Telefon</th>
                <th className="px-3 py-3 text-left font-bold">E-posta</th>
                <th className="px-3 py-3 text-left font-bold">Talep Türü</th>
                <th className="px-3 py-3 text-left font-bold">Açıklama</th>
                <th className="px-3 py-3 text-left font-bold">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form, i) => (
                <tr key={form._id || i} className="border-b border-[#bfa658]/10 hover:bg-[#191919] text-gray-300">
                  <td className="px-3 py-2">{formatKayitNo(i)}</td>
                  <td className="px-3 py-2">{form.tarih || "-"}</td>
                  <td className="px-3 py-2">{form.adsoyad}</td>
                  <td className="px-3 py-2">{form.telefon}</td>
                  <td className="px-3 py-2">{form.eposta}</td>
                  <td className="px-3 py-2">{form.talep}</td>
                  <td className="px-3 py-2">
                    {form.aciklama?.length > 15
                      ? (
                        <>
                          {form.aciklama.slice(0, 15)}...
                          <button
                            className="ml-2 text-xs underline text-[#e3b77b] hover:text-[#bfa658] font-semibold"
                            onClick={() => setSelected({
                              ...form,
                              kayitNo: formatKayitNo(i)
                            })}
                          >Oku</button>
                        </>
                      )
                      : form.aciklama}
                  </td>
                  <td className="px-3 py-2">
                    <button className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-3 py-1 text-xs font-bold shadow">Kaldır</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal gösterimi */}
      <Modal open={!!selected} onClose={() => setSelected(null)} form={selected} />
    </main>
  );
}
