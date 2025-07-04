// app/admin/uyelikler/page.jsx
"use client";
import { useEffect, useState } from "react";

const tipler = [
  { value: "", label: "Hepsi" },
  { value: "musteri", label: "Müşteri" },
  { value: "sofor", label: "Şoför" },
  { value: "firma", label: "Firma" },
  { value: "isbirligi", label: "İş Birliği" },
];

export default function AdminUyelikler() {
  const [uyeler, setUyeler] = useState([]);
  const [tip, setTip] = useState("");
  const [okunan, setOkunan] = useState(null);
  const [hata, setHata] = useState("");

  useEffect(() => {
    fetch(`/api/uye/liste?tip=${tip}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("API Hatası");
        return await res.json();
      })
      .then(data => setUyeler(data.uyeler || []))
      .catch(() => setUyeler([]));
  }, [tip]);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-8">Üyelikler</h1>
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <select
          className="border border-[#bfa658] rounded px-3 py-2 bg-black text-[#ffeec2] font-semibold"
          value={tip}
          onChange={e => setTip(e.target.value)}
        >
          {tipler.map(t => (
            <option value={t.value} key={t.value}>{t.label}</option>
          ))}
        </select>
        <span className="text-sm text-gray-300">{uyeler.length} üye bulundu.</span>
      </div>
      <div className="overflow-x-auto bg-black/80 rounded-2xl border-2 border-[#bfa658] min-h-[200px]">
        <table className="min-w-full text-sm border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="p-2 border-b-2 border-[#bfa658] text-[#ffeec2]">Üye No</th>
              <th className="p-2 border-b-2 border-[#bfa658] text-[#ffeec2]">Adı / Firma</th>
              <th className="p-2 border-b-2 border-[#bfa658] text-[#ffeec2]">Tip</th>
              <th className="p-2 border-b-2 border-[#bfa658] text-[#ffeec2]">E-posta</th>
              <th className="p-2 border-b-2 border-[#bfa658] text-[#ffeec2]">Telefon</th>
              <th className="p-2 border-b-2 border-[#bfa658] text-[#ffeec2]">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {uyeler.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-400 text-xl font-semibold">Hiç üye yok.</td>
              </tr>
            )}
            {uyeler.map((uye, i) => (
              <tr key={uye._id || i} className="hover:bg-[#231d10] transition">
                <td className="p-2 border-b border-[#bfa658]">{uye.uyeno}</td>
                <td className="p-2 border-b border-[#bfa658]">{uye.adsoyad || uye.firmaadi || "-"}</td>
                <td className="p-2 border-b border-[#bfa658]">{uye.tip}</td>
                <td className="p-2 border-b border-[#bfa658]">{uye.eposta}</td>
                <td className="p-2 border-b border-[#bfa658]">{uye.telefon}</td>
                <td className="p-2 border-b border-[#bfa658] text-center">
                  <button className="bg-[#bfa658] text-black rounded px-3 py-1 mr-2 font-semibold text-xs" onClick={() => setOkunan(uye)}>Oku</button>
                  <button className="bg-red-700 text-white rounded px-3 py-1 font-semibold text-xs" onClick={() => alert("Silmek için yetkili admin'e kod gönderilecek (TODO)")}>Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Detay modalı */}
      {okunan && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50" onClick={() => setOkunan(null)}>
          <div className="bg-white text-black rounded-xl max-w-2xl w-full shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200 bg-[#f3ecd1]">
              <div className="text-xl font-bold text-[#bfa658]">Üye Detayı</div>
              <button className="text-2xl text-gray-400 hover:text-black" onClick={() => setOkunan(null)} aria-label="Kapat">×</button>
            </div>
            <div className="px-6 py-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-[16px] mb-2">
                <div><b>Üye No:</b> {okunan.uyeno}</div>
                <div><b>Tip:</b> {okunan.tip}</div>
                <div><b>Ad Soyad:</b> {okunan.adsoyad || "-"}</div>
                <div><b>Firma Adı:</b> {okunan.firmaadi || "-"}</div>
                <div><b>Telefon:</b> {okunan.telefon || "-"}</div>
                <div><b>E-posta:</b> {okunan.eposta || "-"}</div>
                <div><b>İl:</b> {okunan.il || "-"}</div>
                <div><b>Kayıt:</b> {okunan.kayitTarihi ? new Date(okunan.kayitTarihi).toLocaleString("tr-TR") : "-"}</div>
              </div>
              <div className="flex gap-3 justify-end bg-[#faf8ef] px-6 py-4 border-t border-gray-200">
                <button className="bg-black text-white px-4 py-2 rounded font-bold text-sm border border-[#bfa658] hover:bg-[#bfa658] hover:text-black transition" onClick={() => setOkunan(null)}>Kapat</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
// app/admin/uyelikler/page.jsx
