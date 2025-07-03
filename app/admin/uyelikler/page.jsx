// app/admin/uyelikler/page.jsx

"use client";
import { useEffect, useState } from "react";

// Üye tipleri
const UYE_TIPLERI = [
  { value: "hepsi", label: "Tümü" },
  { value: "musteri", label: "Müşteri" },
  { value: "sofor", label: "Şoför" },
  { value: "firma", label: "Firma" },
  { value: "isbirligi", label: "İş Birliği" }
];

export default function UyeliklerAdmin() {
  const [uyeler, setUyeler] = useState([]);
  const [filter, setFilter] = useState("hepsi");
  const [showModal, setShowModal] = useState(false);
  const [selectedUye, setSelectedUye] = useState(null);
  const [silmeKodu, setSilmeKodu] = useState("");
  const [koduMaille, setKoduMaille] = useState("");
  const [silinmekIstenenUye, setSilinmekIstenenUye] = useState(null);
  const [kodGonderildi, setKodGonderildi] = useState(false);
  const [loading, setLoading] = useState(true);

  // Üyeleri çek
  useEffect(() => {
    async function fetchUyeler() {
      setLoading(true);
      try {
        const res = await fetch("/api/uye/list");
        const data = await res.json();
        setUyeler(data.uyeler || []);
      } catch {
        setUyeler([]);
      }
      setLoading(false);
    }
    fetchUyeler();
  }, []);

  // Filtrelenmiş üye listesi
  const filtered = filter === "hepsi" ? uyeler : uyeler.filter(u => u.tip === filter);

  // Silmek için kod gönder
  async function handleSilKod(uye) {
    try {
      setSilinmekIstenenUye(uye);
      const res = await fetch("/api/uye/silmekodu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uyeId: uye._id }),
      });
      const data = await res.json();
      if (data && data.kod) {
        setKoduMaille(data.kod);
        setKodGonderildi(true);
      }
    } catch {
      alert("Kod gönderilemedi.");
    }
  }

  // Silmeyi onayla
  async function handleSilOnay() {
    try {
      const res = await fetch("/api/uye/sil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uyeId: silinmekIstenenUye._id,
          kod: silmeKodu,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        alert("Üye silindi.");
        setUyeler(u => u.filter(x => x._id !== silinmekIstenenUye._id));
        setShowModal(false);
        setSilinmekIstenenUye(null);
        setSilmeKodu("");
        setKoduMaille("");
        setKodGonderildi(false);
      } else {
        alert("Kod hatalı veya işlem başarısız.");
      }
    } catch {
      alert("İşlem başarısız.");
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 text-[#f2e3ba]">
      <h1 className="text-3xl font-extrabold mb-8 text-[#bfa658]">Üyelikler</h1>

      <div className="flex flex-wrap items-center gap-4 mb-7">
        <label className="font-semibold text-[#ffeec2]">Üye Tipi:</label>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border border-[#bfa658] rounded px-3 py-1 text-base bg-black text-[#bfa658] font-semibold"
        >
          {UYE_TIPLERI.map(x => (
            <option key={x.value} value={x.value}>{x.label}</option>
          ))}
        </select>
        <span className="text-sm ml-4">{filtered.length} üye bulundu.</span>
      </div>

      {/* Tablo - Satırda özet, "oku"ya tıklayınca modalda detay gösterilir */}
      <div className="rounded-xl border-2 border-[#bfa658] bg-black/90 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="p-2 text-left text-[#ffeec2]">Üye No</th>
              <th className="p-2 text-left text-[#ffeec2]">Tipi</th>
              <th className="p-2 text-left text-[#ffeec2]">Adı</th>
              <th className="p-2 text-left text-[#ffeec2]">E-posta</th>
              <th className="p-2 text-left text-[#ffeec2]">Telefon</th>
              <th className="p-2 text-left text-[#ffeec2]">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-7 text-gray-400 text-lg">Yükleniyor...</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-400 text-xl font-semibold">Hiç üye bulunamadı.</td>
              </tr>
            ) : (
              filtered.map((uye, i) => (
                <tr key={uye._id || i} className="hover:bg-[#1e1a13] transition">
                  <td className="p-2 font-bold">{uye.uyeno}</td>
                  <td className="p-2">{UYE_TIPLERI.find(x => x.value === uye.tip)?.label || uye.tip}</td>
                  <td className="p-2">{uye.adsoyad || uye.firmaadi || "-"}</td>
                  <td className="p-2">{uye.email}</td>
                  <td className="p-2">{uye.telefon}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      className="px-3 py-1 rounded bg-[#bfa658] text-black font-bold hover:bg-yellow-400 text-xs"
                      onClick={() => { setSelectedUye(uye); setShowModal(true); }}
                    >
                      Oku
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-red-600 text-white font-bold hover:bg-red-400 text-xs"
                      onClick={() => handleSilKod(uye)}
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

      {/* Modal - Oku */}
      {showModal && selectedUye && (
        <div className="fixed left-0 top-0 w-full h-full bg-black/85 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div className="bg-white text-black p-0 rounded-xl max-w-xl w-full shadow-2xl relative overflow-hidden"
            onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200 bg-[#f3ecd1]">
              <div className="text-xl font-bold text-[#bfa658]">Üye Detayı</div>
              <button
                className="text-2xl text-gray-400 hover:text-black"
                onClick={() => setShowModal(false)}
                aria-label="Kapat"
              >×</button>
            </div>
            <div className="px-6 py-5 space-y-2">
              <div><b>Üye No:</b> {selectedUye.uyeno}</div>
              <div><b>Tipi:</b> {UYE_TIPLERI.find(x => x.value === selectedUye.tip)?.label || selectedUye.tip}</div>
              <div><b>Adı:</b> {selectedUye.adsoyad || selectedUye.firmaadi || "-"}</div>
              <div><b>E-posta:</b> {selectedUye.email}</div>
              <div><b>Telefon:</b> {selectedUye.telefon}</div>
              <div><b>İl:</b> {selectedUye.il}</div>
              {selectedUye.firmaadi && <div><b>Firma Adı:</b> {selectedUye.firmaadi}</div>}
              {selectedUye.yetkili && <div><b>Yetkili:</b> {selectedUye.yetkili}</div>}
              <div><b>Kayıt Tarihi:</b> {selectedUye.kayitTarihi}</div>
              <div><b>Durum:</b> {selectedUye.durum || "Aktif"}</div>
            </div>
            <div className="flex gap-3 justify-end bg-[#faf8ef] px-6 py-4 border-t border-gray-200">
              <button
                className="bg-black text-white px-4 py-2 rounded font-bold text-sm border border-[#bfa658] hover:bg-[#bfa658] hover:text-black transition"
                onClick={() => setShowModal(false)}
              >Kapat</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Silme kodu */}
      {kodGonderildi && silinmekIstenenUye && (
        <div className="fixed left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-50"
          onClick={() => { setKodGonderildi(false); setSilinmekIstenenUye(null); setSilmeKodu(""); }}>
          <div className="bg-white text-black p-0 rounded-xl max-w-lg w-full shadow-2xl relative overflow-hidden"
            onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200 bg-[#f3ecd1]">
              <div className="text-lg font-bold text-[#bfa658]">Silme Onayı</div>
              <button
                className="text-2xl text-gray-400 hover:text-black"
                onClick={() => { setKodGonderildi(false); setSilinmekIstenenUye(null); setSilmeKodu(""); }}
                aria-label="Kapat"
              >×</button>
            </div>
            <div className="px-6 py-5 space-y-2">
              <div>Silmek için mailinize gelen kodu girin:</div>
              <input
                type="text"
                className="border border-[#bfa658] rounded px-3 py-2 w-full font-mono text-lg"
                value={silmeKodu}
                onChange={e => setSilmeKodu(e.target.value)}
                autoFocus
              />
              <button
                className="w-full mt-2 bg-red-600 text-white font-bold py-2 rounded hover:bg-red-400"
                onClick={handleSilOnay}
              >Silmeyi Onayla</button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}

// app/admin/uyelikler/page.jsx
