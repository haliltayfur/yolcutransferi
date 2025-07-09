"use client";
import { useState, useEffect } from "react";

// Simüle autocomplete verisi (bunu bir API'den çekiyorsan orayı bağlayabilirsin)
const locations = [
  "Sabiha Gökçen Havalimanı",
  "İstanbul Havalimanı",
  "Ankara Esenboğa Havalimanı",
  "Ümraniye",
  "Beşiktaş",
  "Kadıköy",
  "Bakırköy",
  "Ataşehir",
  "Maslak",
  "Pendik",
  "Atatürk Havalimanı",
];

const segmentOptions = [
  { key: "Ekonomik", label: "Ekonomik" },
  { key: "Lüks", label: "Lüks" },
  { key: "Prime+", label: "Prime+" }
];
const allTransfers = [
  "VIP Havalimanı Transferi",
  "Şehirler Arası Transfer",
  "Kurumsal Etkinlik",
  "Özel Etkinlik",
  "Tur & Gezi",
  "Toplu Transfer",
  "Düğün vb Organizasyonlar"
];
const saatler = [];
for (let h = 0; h < 24; ++h)
  for (let m of [0, 15, 30, 45]) saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);

export default function VipTransferForm({ onComplete, isMobile }) {
  // AUTOCOMPLETE (tahminli) inputlar
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  // Diğer state'ler
  const [people, setPeople] = useState("");
  const [pnr, setPnr] = useState("");
  const [transfer, setTransfer] = useState("");
  const [segment, setSegment] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // AUTOCOMPLETE: filtrele
  useEffect(() => {
    if (!from) setFromSuggestions([]);
    else setFromSuggestions(locations.filter(x => x.toLowerCase().includes(from.toLowerCase())));
  }, [from]);
  useEffect(() => {
    if (!to) setToSuggestions([]);
    else setToSuggestions(locations.filter(x => x.toLowerCase().includes(to.toLowerCase())));
  }, [to]);

  // Devam Et → localStorage ve callback
  function handleSubmit(e) {
    e.preventDefault();
    if (onComplete)
      onComplete({ from, to, people, pnr, transfer, segment, date, time });
  }

  // SIRALAMA (her satır alt alta)
  // Sıralama: Nereden | Nereye | alt satır Kişi Sayısı | PNR | alt satır Transfer Türü | Segment | alt satır Tarih | Saat

  return (
    <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit} autoComplete="off">
      {/* Nereden - Nereye */}
      <div className={`${isMobile ? "flex-col" : "flex-row"} flex gap-2 w-full`}>
        {/* Nereden */}
        <div className="flex-1 relative">
          <label className="block text-[#bfa658] font-semibold mb-1">Nereden?</label>
          <input
            className="w-full h-[48px] rounded-xl px-3 text-base bg-white/95 border border-gray-300 focus:ring-2 focus:ring-[#bfa658] transition text-black placeholder:text-black"
            placeholder="Nereden? İl / İlçe / Mahalle / Havalimanı"
            value={from}
            onChange={e => setFrom(e.target.value)}
            onFocus={() => from && setFromSuggestions(locations.filter(x => x.toLowerCase().includes(from.toLowerCase())))}
          />
          {/* AUTOCOMPLETE */}
          {fromSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 bg-white border border-[#bfa658] z-10 max-h-44 overflow-auto rounded-b-lg mt-1">
              {fromSuggestions.map((x, i) => (
                <div
                  key={i}
                  className="px-3 py-2 cursor-pointer hover:bg-[#ffeec2]"
                  style={{ color: "#222" }}
                  onClick={() => { setFrom(x); setFromSuggestions([]); }}
                >
                  {x}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Nereye */}
        <div className="flex-1 relative">
          <label className="block text-[#bfa658] font-semibold mb-1">Nereye?</label>
          <input
            className="w-full h-[48px] rounded-xl px-3 text-base bg-white/95 border border-gray-300 focus:ring-2 focus:ring-[#bfa658] transition text-black placeholder:text-black"
            placeholder="Nereye? İl / İlçe / Mahalle / Havalimanı"
            value={to}
            onChange={e => setTo(e.target.value)}
            onFocus={() => to && setToSuggestions(locations.filter(x => x.toLowerCase().includes(to.toLowerCase())))}
          />
          {/* AUTOCOMPLETE */}
          {toSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 bg-white border border-[#bfa658] z-10 max-h-44 overflow-auto rounded-b-lg mt-1">
              {toSuggestions.map((x, i) => (
                <div
                  key={i}
                  className="px-3 py-2 cursor-pointer hover:bg-[#ffeec2]"
                  style={{ color: "#222" }}
                  onClick={() => { setTo(x); setToSuggestions([]); }}
                >
                  {x}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Kişi Sayısı - PNR */}
      <div className={`${isMobile ? "flex-col" : "flex-row"} flex gap-2 w-full`}>
        <div className="flex-1">
          <label className="block text-[#bfa658] font-semibold mb-1">Kişi Sayısı</label>
          <select className="w-full h-[48px] rounded-xl px-3 text-base bg-white/95 border border-gray-300 text-black" value={people} onChange={e => setPeople(e.target.value)}>
            <option value="">Seçiniz</option>
            {Array.from({ length: 24 }, (_, i) => i + 1).map(val => <option key={val} value={val}>{val}</option>)}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-[#bfa658] font-semibold mb-1">PNR (varsa)</label>
          <input
            className="w-full h-[48px] rounded-xl px-3 text-base bg-white/95 border border-gray-300 text-black placeholder:text-black"
            placeholder="Uçuş Kodu (varsa)"
            value={pnr}
            onChange={e => setPnr(e.target.value)}
          />
        </div>
      </div>
      {/* Transfer Türü - Segment */}
      <div className={`${isMobile ? "flex-col" : "flex-row"} flex gap-2 w-full`}>
        <div className="flex-1">
          <label className="block text-[#bfa658] font-semibold mb-1">Transfer Türü</label>
          <select className="w-full h-[48px] rounded-xl px-3 text-base bg-white/95 border border-gray-300 text-black" value={transfer} onChange={e => setTransfer(e.target.value)}>
            <option value="">Seçiniz</option>
            {allTransfers.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-[#bfa658] font-semibold mb-1">Araç Segmenti</label>
          <select className="w-full h-[48px] rounded-xl px-3 text-base bg-white/95 border border-gray-300 text-black" value={segment} onChange={e => setSegment(e.target.value)}>
            <option value="">Seçiniz</option>
            {segmentOptions.map(opt => <option key={opt.key} value={opt.label}>{opt.label}</option>)}
          </select>
        </div>
      </div>
      {/* Tarih - Saat */}
      <div className={`${isMobile ? "flex-col" : "flex-row"} flex gap-2 w-full`}>
        <div className="flex-1">
          <label className="block text-[#bfa658] font-semibold mb-1">Tarih</label>
          <input
            type="date"
            className="w-full h-[48px] rounded-xl px-3 text-base bg-white/95 border border-gray-300 text-black"
            value={date}
            onChange={e => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="flex-1">
          <label className="block text-[#bfa658] font-semibold mb-1">Saat</label>
          <select className="w-full h-[48px] rounded-xl px-3 text-base bg-white/95 border border-gray-300 text-black" value={time} onChange={e => setTime(e.target.value)}>
            <option value="">Seçiniz</option>
            {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
          </select>
        </div>
      </div>
      {/* DEVAM ET BUTONU */}
      <button
        type="submit"
        className="w-full h-[54px] rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold text-xl shadow hover:scale-105 transition mt-5"
        style={{
          marginTop: isMobile ? 14 : 24,
          marginBottom: isMobile ? 6 : 0,
          position: isMobile ? "static" : "absolute",
          bottom: isMobile ? undefined : 32,
          left: 0,
          right: 0
        }}
      >
        Devam Et
      </button>
    </form>
  );
}
