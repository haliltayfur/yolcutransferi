"use client";
import { useState, useEffect } from "react";

const defaultSegments = [
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

// Basit autocomplete verisi (mock)
// Gerçekte bir API'den fetch ile alınacak şekilde yapılmalı!
const allLocations = [
  "İstanbul Havalimanı", "Sabiha Gökçen", "Yeşilköy", "Bakırköy", "Ataşehir", "Ümraniye", "Ankara Havalimanı",
  "Ankara", "Kadıköy", "Beşiktaş", "Bostancı", "Sancaktepe", "Şişli", "Maslak"
];

export default function VipTransferForm({ onComplete, initialData = {} }) {
  // State'ler
  const [from, setFrom] = useState(initialData.from || "");
  const [to, setTo] = useState(initialData.to || "");
  const [people, setPeople] = useState(initialData.people || "");
  const [segment, setSegment] = useState(initialData.segment || "");
  const [transfer, setTransfer] = useState(initialData.transfer || "");
  const [date, setDate] = useState(initialData.date || "");
  const [time, setTime] = useState(initialData.time || "");
  const [pnr, setPnr] = useState(initialData.pnr || "");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  // Otomatik doldurma için /rezervasyon sayfasında hafızadan çek
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("rezFormData");
      if (saved) {
        const d = JSON.parse(saved);
        setFrom(d.from || "");
        setTo(d.to || "");
        setPeople(d.people || "");
        setSegment(d.segment || "");
        setTransfer(d.transfer || "");
        setDate(d.date || "");
        setTime(d.time || "");
        setPnr(d.pnr || "");
      }
    }
  }, []);

  // Autocomplete basit filtre (gerçekte API)
  function handleFromChange(e) {
    const v = e.target.value;
    setFrom(v);
    setFromSuggestions(
      v.length > 1 ? allLocations.filter(loc => loc.toLowerCase().includes(v.toLowerCase())) : []
    );
  }
  function handleToChange(e) {
    const v = e.target.value;
    setTo(v);
    setToSuggestions(
      v.length > 1 ? allLocations.filter(loc => loc.toLowerCase().includes(v.toLowerCase())) : []
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = { from, to, people, segment, transfer, date, time, pnr };
    if (typeof window !== "undefined") {
      localStorage.setItem("rezFormData", JSON.stringify(data));
      if (onComplete) onComplete(data);
      else window.location.href = "/rezervasyon";
    }
  }

  // Kutucuk yazı rengi siyah
  const inputClass =
    "w-full h-[48px] rounded-xl px-3 text-base bg-white/95 border border-gray-300 focus:ring-2 focus:ring-[#bfa658] transition text-black";

  return (
    <form className="w-full" onSubmit={handleSubmit} autoComplete="off">
      <h2 className="text-3xl font-bold text-[#bfa658] mb-1" style={{ marginTop: 0 }}>
        VIP Transfer Rezervasyonu
      </h2>
      {/* Altın yaldızlı çizgi */}
      <div
        style={{
          height: 4,
          background: "linear-gradient(90deg, #FFD700 0%, #bfa658 100%)",
          borderRadius: 4,
          width: "100%",
          marginBottom: 18,
          marginTop: 3,
        }}
      />
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5">
        {/* Nereden */}
        <div className="relative col-span-1">
          <label className="block text-[#bfa658] font-semibold mb-1">Nereden?</label>
          <input
            className={inputClass}
            placeholder="Nereden? İl / İlçe / Mahalle / Havalimanı"
            value={from}
            onChange={handleFromChange}
            autoComplete="off"
          />
          {fromSuggestions.length > 0 && (
            <div className="absolute z-40 bg-white border border-gray-200 rounded-xl mt-1 shadow w-full max-h-32 overflow-auto">
              {fromSuggestions.map((s, i) => (
                <div
                  key={i}
                  className="px-3 py-2 hover:bg-yellow-100 cursor-pointer text-black"
                  onClick={() => { setFrom(s); setFromSuggestions([]); }}
                >{s}</div>
              ))}
            </div>
          )}
        </div>
        {/* Nereye */}
        <div className="relative col-span-1">
          <label className="block text-[#bfa658] font-semibold mb-1">Nereye?</label>
          <input
            className={inputClass}
            placeholder="Nereye? İl / İlçe / Mahalle / Havalimanı"
            value={to}
            onChange={handleToChange}
            autoComplete="off"
          />
          {toSuggestions.length > 0 && (
            <div className="absolute z-40 bg-white border border-gray-200 rounded-xl mt-1 shadow w-full max-h-32 overflow-auto">
              {toSuggestions.map((s, i) => (
                <div
                  key={i}
                  className="px-3 py-2 hover:bg-yellow-100 cursor-pointer text-black"
                  onClick={() => { setTo(s); setToSuggestions([]); }}
                >{s}</div>
              ))}
            </div>
          )}
        </div>
        {/* Kişi Sayısı */}
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Kişi Sayısı</label>
          <select className={inputClass} value={people} onChange={e => setPeople(e.target.value)}>
            <option value="">Seçiniz</option>
            {Array.from({ length: 24 }, (_, i) => i + 1).map(val => <option key={val} value={val}>{val}</option>)}
          </select>
        </div>
        {/* PNR */}
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">PNR (varsa)</label>
          <input
            className={inputClass}
            placeholder="Uçuş Kodu (varsa)"
            value={pnr}
            onChange={e => setPnr(e.target.value)}
          />
        </div>
        {/* Transfer Türü */}
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Transfer Türü</label>
          <select className={inputClass} value={transfer} onChange={e => setTransfer(e.target.value)}>
            <option value="">Seçiniz</option>
            {allTransfers.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        {/* Araç Segmenti */}
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Araç Segmenti</label>
          <select className={inputClass} value={segment} onChange={e => setSegment(e.target.value)}>
            <option value="">Seçiniz</option>
            {defaultSegments.map(opt => <option key={opt.key} value={opt.label}>{opt.label}</option>)}
          </select>
        </div>
        {/* Tarih */}
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Tarih</label>
          <input
            type="date"
            className={inputClass}
            value={date}
            onChange={e => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        {/* Saat */}
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Saat</label>
          <select className={inputClass} value={time} onChange={e => setTime(e.target.value)}>
            <option value="">Seçiniz</option>
            {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
          </select>
        </div>
      </div>
      {/* Devam Et Butonu */}
      <button
        type="submit"
        className="w-full h-[48px] rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold text-xl shadow hover:scale-105 transition mb-2"
        style={{ marginTop: 16, marginBottom: 0, position: "relative", bottom: 0 }}
      >
        Devam Et
      </button>
    </form>
  );
}
