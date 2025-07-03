// app/admin/uyelikler/page.jsx
"use client";
import { useState, useEffect } from "react";

const UYE_TIPLERI = [
  { value: "", label: "Hepsi" },
  { value: "musteri", label: "Müşteri" },
  { value: "sofor", label: "Şoför" },
  { value: "firma", label: "Firma" },
  { value: "isbirligi", label: "İş Birliği" },
];

export default function AdminUyelikler() {
  const [uyeler, setUyeler] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalUye, setModalUye] = useState(null);
  const [silOnay, setSilOnay] = useState({ step: 0, uye: null, kod: "", email: "" });
  const [silMsg, setSilMsg] = useState("");

  // Üyeleri çek
  useEffect(() => {
    async function fetchUyeler() {
      setLoading(true);
      try {
        const res = await fetch("/api/uye/liste");
        const data = await res.json();
        setUyeler(data.uyeler || []);
      } catch (e) {
        setUyeler([]);
      }
      setLoading(false);
    }
    fetchUyeler();
  }, []);

  // Filtreli üyeler
  const list = uyeler.filter(u => !filter || u.tip === filter);

  // Silme adımları
  async function silOnayla(uye) {
    setSilOnay({ step: 1, uye, kod: "", email: uye.email });
    setSilMsg("");
    // Kod gönderimi API: bu kod hem info@ hem de byhaliltayfur@hotmail.com adresine gitsin!
    await fetch("/api/uye/sil-onayla", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uyeNo: uye.uyeNo,
        ad: uye.ad,
        email: uye.email,
        tip: uye.tip,
        telefon: uye.telefon,
        // diğer tüm bilgileri burada gönderebilirsin!
      })
    });
  }

  async function silKodOnayla() {
    setSilMsg("Kontrol ediliyor...");
    // API'ye kodu ve üyeyi gönder
    const r = await fetch("/api/uye/sil-dogrula", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uyeNo: silOnay.uye.uyeNo,
        kod: silOnay.kod,
        email: silOnay.uye.email,
      }),
    });
    const data = await r.json();
    if (data.success) {
      setUyeler(uyeler.filter(u => u.uyeNo !== silOnay.uye.uyeNo));
      setSilMsg("Üye silindi.");
      setTimeout(() => setSilOnay({ step: 0, uye: null, kod: "", email: "" }), 1300);
    } else {
      setSilMsg(data.error || "Kod yanlış!");
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-2 py-8">
      <h1 className="text-3xl font-extrabold text-[#bfa658] mb-8">Üyelikler</h1>
      <div className="flex flex-wrap gap-2 items-center mb-6">
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border border-[#bfa658] bg-black text-[#ffeec2] font-semibold px-3 py-2 rounded text-lg"
        >
          {UYE_TIPLERI.map(tip => (
            <option key={tip.value} value={tip.value}>{tip.label}</option>
          ))}
        </select>
        <span className="ml-3 text-[#ffeec2] text-lg">{list.length} üye bulundu.</span>
      </div>
      <div className="rounded-xl border-2 border-[#bfa658] bg-black/70 overflow-x-auto">
        <table className="w-full text-base">
          <thead>
            <tr className="bg-[#19160a] text-[#bfa658] font-bold text-lg">
              <th className="px-3 py-2 text-left">Üye No</th>
              <th className="px-3 py-2 text-left">Tipi</th>
              <th className="px-3 py-2 text-left">Adı / Firma</th>
              <th className="px-3 py-2 text-left">E-posta</th>
              <th className="px-3 py-2 text-left">Telefon</th>
              <th className="px-3 py-2 text-center">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-7 text-lg text-gray-400">Yükleniyor...</td></tr>
            ) : (
              list.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-lg text-[#ffeec2]">Hiç üye yok.</td></tr>
              ) : (
                list.map(uye => (
                  <tr key={uye.uyeNo} className="border-b border-[#bfa658] hover:bg-[#232015] text-[#ffeec2]">
                    <td className="px-3 py-2">{uye.uyeNo}</td>
                    <td className="px-3 py-2">{UYE_TIPLERI.find(t=>t.value===uye.tip)?.label || uye.tip}</td>
                    <td className="px-3 py-2">{uye.tip === "firma" ? uye.firmaAdi : uye.ad}</td>
                    <td className="px-3 py-2">{uye.email}</td>
                    <td className="px-3 py-2">{uye.telefon}</td>
                    <td className="px-3 py-2 flex gap-2 justify-center">
                      <button onClick={()=>setModalUye(uye)} className="bg-[#bfa658] text-black px-4 py-1 rounded font-bold hover:bg-yellow-600 transition">Oku</button>
                      <button onClick={()=>silOnayla(uye)} className="bg-red-700 text-white px-4 py-1 rounded font-bold hover:bg-red-400 transition">Sil</button>
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Detay modalı */}
      {modalUye && (
        <div className="fixed left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-50"
          onClick={()=>setModalUye(null)}>
          <div className="bg-white text-black rounded-xl shadow-2xl max-w-xl w-full p-8 relative"
            onClick={e=>e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-[#bfa658] mb-3">Üye Detayı</h2>
            <div className="mb-2"><b>Üye No:</b> {modalUye.uyeNo}</div>
            <div className="mb-2"><b>Tip:</b> {UYE_TIPLERI.find(t=>t.value===modalUye.tip)?.label || modalUye.tip}</div>
            <div className="mb-2"><b>Adı:</b> {modalUye.ad}</div>
            {modalUye.tip === "firma" && (<div className="mb-2"><b>Firma Adı:</b> {modalUye.firmaAdi}</div>)}
            <div className="mb-2"><b>E-posta:</b> {modalUye.email}</div>
            <div className="mb-2"><b>Telefon:</b> {modalUye.telefon}</div>
            <div className="mb-2"><b>İl:</b> {modalUye.il}</div>
            <div className="mb-2"><b>Kayıt Tarihi:</b> {modalUye.createdAt ? new Date(modalUye.createdAt).toLocaleDateString() : ""}</div>
            {/* Diğer bilgiler */}
            <button className="bg-black text-white px-4 py-1 rounded font-bold mt-4"
              onClick={()=>setModalUye(null)}>Kapat</button>
          </div>
        </div>
      )}

      {/* Sil Onay modalı */}
      {silOnay.step > 0 && (
        <div className="fixed left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-50"
          onClick={()=>setSilOnay({step:0, uye:null, kod:"", email:""})}>
          <div className="bg-white text-black rounded-xl shadow-2xl max-w-sm w-full p-6 relative"
            onClick={e=>e.stopPropagation()}>
            <h2 className="text-xl font-bold text-[#bfa658] mb-4">Silme Onayı</h2>
            {silOnay.step === 1 ? (
              <>
                <div>Üyeyi silmek için, kod e-postasına gelen 6 haneli doğrulama kodunu girin:</div>
                <input
                  className="w-full border px-3 py-2 rounded mt-3 mb-2"
                  maxLength={6}
                  value={silOnay.kod}
                  onChange={e=>setSilOnay(s=>({...s,kod:e.target.value}))}
                  autoFocus
                />
                <button className="bg-[#bfa658] text-black font-bold px-4 py-2 rounded w-full"
                  onClick={silKodOnayla}>Sil</button>
                <div className="mt-2 text-red-600 text-sm">{silMsg}</div>
              </>
            ) : (
              <div>Siliniyor...</div>
            )}
            <button className="absolute right-2 top-2 text-gray-600 text-xl" onClick={()=>setSilOnay({step:0, uye:null, kod:"", email:""})}>×</button>
          </div>
        </div>
      )}
    </main>
  );
}
// app/admin/uyelikler/page.jsx
