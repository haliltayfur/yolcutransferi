// app/admin/uyelikler/page.jsx
"use client";
import { useEffect, useState } from "react";

export default function AdminUyelikler() {
  const [uyeler, setUyeler] = useState([]);
  const [tip, setTip] = useState("hepsi");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUyeler() {
      setLoading(true);
      try {
        const res = await fetch("/api/uye/liste");
        const data = await res.json();
        setUyeler(data.uyeler || []);
      } catch {
        setUyeler([]);
      }
      setLoading(false);
    }
    fetchUyeler();
  }, []);

  // Filtrele
  const uyelerFiltered = uyeler.filter((u) =>
    tip === "hepsi" ? true : (u.tip || "").toLowerCase() === tip
  );

  // Tarih güvenli gösterim
  function tarihYaz(tarih) {
    if (!tarih) return "-";
    const t = new Date(tarih);
    if (isNaN(t.getTime())) return "-";
    return t.toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short" });
  }

  return (
    <main className="max-w-5xl mx-auto px-2 py-10 text-white font-sans">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-8">Üyelikler</h1>
      <div className="flex gap-3 mb-6">
        <select
          value={tip}
          onChange={e => setTip(e.target.value)}
          className="text-black border border-[#bfa658] rounded px-3 py-2"
        >
          <option value="hepsi">Hepsi</option>
          <option value="musteri">Müşteri</option>
          <option value="sofor">Şoför</option>
          <option value="firma">Firma</option>
          <option value="isbirligi">İş Birliği</option>
          <option value="admin">Admin</option>
        </select>
        <span className="ml-3 text-[#ffeec2] text-lg">
          {uyelerFiltered.length} üye bulundu.
        </span>
      </div>

      <div className="overflow-x-auto bg-black/90 rounded-2xl border-2 border-[#bfa658] min-h-[200px]">
        <table className="min-w-full text-sm border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="p-2 border-b-2 border-[#bfa658]">Üye No</th>
              <th className="p-2 border-b-2 border-[#bfa658]">Tipi</th>
              <th className="p-2 border-b-2 border-[#bfa658]">Adı/Firma</th>
              <th className="p-2 border-b-2 border-[#bfa658]">E-posta</th>
              <th className="p-2 border-b-2 border-[#bfa658]">Telefon</th>
              <th className="p-2 border-b-2 border-[#bfa658]">İl</th>
              <th className="p-2 border-b-2 border-[#bfa658]">Kayıt Tarihi</th>
              <th className="p-2 border-b-2 border-[#bfa658]">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-400">Yükleniyor...</td>
              </tr>
            ) : uyelerFiltered.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-10 text-gray-400 text-lg">Üye bulunamadı.</td>
              </tr>
            ) : (
              uyelerFiltered.map((uye, i) => (
                <tr key={uye._id || i} className="hover:bg-[#231d10] transition">
                  <td className="p-2 border-b border-[#bfa658] font-semibold">{uye.uyeno || "-"}</td>
                  <td className="p-2 border-b border-[#bfa658] capitalize">{uye.tip || "-"}</td>
                  <td className="p-2 border-b border-[#bfa658]">{uye.adsoyad || uye.firmaadi || "-"}</td>
                  <td className="p-2 border-b border-[#bfa658]">{uye.email || "-"}</td>
                  <td className="p-2 border-b border-[#bfa658]">{uye.telefon || "-"}</td>
                  <td className="p-2 border-b border-[#bfa658]">{uye.il || "-"}</td>
                  <td className="p-2 border-b border-[#bfa658]">{tarihYaz(uye.kayitTarihi)}</td>
                  <td className="p-2 border-b border-[#bfa658]">
                    <button
                      className="bg-[#bfa658] text-black px-2 py-1 rounded font-bold text-xs mr-2 hover:opacity-80 shadow"
                      onClick={() => alert(`
Üye No: ${uye.uyeno || "-"}
Tip: ${uye.tip || "-"}
Adı/Firma: ${uye.adsoyad || uye.firmaadi || "-"}
E-posta: ${uye.email || "-"}
Telefon: ${uye.telefon || "-"}
İl: ${uye.il || "-"}
Kayıt Tarihi: ${tarihYaz(uye.kayitTarihi)}
                      `.trim())}
                    >
                      Oku
                    </button>
                    <button
                      className="bg-red-700 text-white px-2 py-1 rounded font-bold text-xs hover:opacity-80 shadow"
                      onClick={() => alert("Silme işlemi için yönetici onayı gereklidir. (Backend kodu eklenmeli)")}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
// app/admin/uyelikler/page.jsx
