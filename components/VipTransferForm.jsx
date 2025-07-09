"use client";
import { useState, useEffect } from "react";

// ÖRNEK airports.json datası, gerçek dosyanı fetch ile çek!
const airports = [
  { name: "İstanbul Havalimanı", iata: "IST" },
  { name: "Sabiha Gökçen", iata: "SAW" },
  { name: "Esenboğa", iata: "ESB" },
  // ...
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
const allLocations = [
  "İstanbul Havalimanı", "Sabiha Gökçen", "Yeşilköy", "Bakırköy", "Ataşehir",
  "Ümraniye", "Ankara Havalimanı", "Kadıköy", "Beşiktaş", "Bostancı", "Sancaktepe", "Şişli", "Maslak"
];
const saatler = [];
for (let h = 0; h < 24; ++h)
  for (let m of [0, 15, 30, 45]) saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);

// Bir havalimanı geçti mi? (autocomplete, input veya dropdown'dan)
function containsAirport(val) {
  if (!val) return false;
  const v = val.toLowerCase();
  return airports.some(a => v.includes(a.name.toLowerCase()) || v.includes(a.iata.toLowerCase()));
}

// Fake API ile PNR sorgu örneği (gerçekte buraya fetch atanır)
async function getFlightInfoFromPNR(pnr) {
  // Normalde buraya bir API çağrısı yapılır.
  // Örnek response:
  return {
    airline: "THY", // veya Pegasus vs
    arrival: "2024-07-10T19:30:00",
    status: "planned",
    flight: "TK1923"
  };
}

export default function VipTransferForm({ onComplete, initialData = {} }) {
  const [from, setFrom] = useState(initialData.from || "");
  const [to, setTo] = useState(initialData.to || "");
  const [people, setPeople] = useState(initialData.people || "");
  const [segment, setSegment] = useState(initialData.segment || "");
  const [transfer, setTransfer] = useState(initialData.transfer || "");
  const [date, setDate] = useState(initialData.date || "");
  const [time, setTime] = useState(initialData.time || "");
  const [pnr, setPnr] = useState(initialData.pnr || "");
  const [showPNR, setShowPNR] = useState(false);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [pnrInfo, setPnrInfo] = useState(null);

  useEffect(() => {
    // Hafızadan doldur
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

  // Dinamik PNR açma
  useEffect(() => {
    setShowPNR(
      transfer === "VIP Havalimanı Transferi"
      || containsAirport(from)
      || containsAirport(to)
    );
  }, [transfer, from, to]);

  // PNR’dan airline & saat getirme (örnek)
  useEffect(() => {
    if (pnr && showPNR) {
      getFlightInfoFromPNR(pnr).then(info => setPnrInfo(info));
    } else {
      setPnrInfo(null);
    }
  }, [pnr, showPNR]);

  // Autocomplete
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

  const inputClass =
    "w-full h-[56px] rounded-xl px-4 text-base bg-white/95 border border-gray-300 focus:ring-2 focus:ring-[#bfa658] transition text-black my-3 mx-1";

  return (
    <form className="w-full" onSubmit={handleSubmit} autoComplete="off">
      <h2 className="text-3xl font-bold text-[#bfa658] mb-0 mt-0 text-center" style={{ marginTop: 6 }}>
        VIP Transfer Rezervasyonu
      </h2>
      {/* Altın yaldızlı çizgi */}
      <div
        style={{
          height: 2,
          background: "#bfa658",
          borderRadius: 2,
          width: "100%",
          margin: "7px 0 15px 0"
        }}
      />
      <div className="grid grid-cols-2 gap-x-9 gap-y-4 mb-5">
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
        {showPNR && (
          <div>
            <label className="block text-[#bfa658] font-semibold mb-1">PNR</label>
            <input
              className={inputClass}
              placeholder="Uçuş Kodu"
              value={pnr}
              onChange={e => setPnr(e.target.value)}
            />
            {/* PNR’dan info varsa gösterebilirsin */}
            {pnrInfo && (
              <div className="text-sm text-[#bfa658] mt-1">
                {pnrInfo.airline && <>Havayolu: <b>{pnrInfo.airline}</b> - </>}
                {pnrInfo.arrival && <>Varış: <b>{new Date(pnrInfo.arrival).toLocaleString("tr-TR")}</b></>}
                {pnrInfo.status && <> ({pnrInfo.status})</>}
                {pnrInfo.flight && <> - Uçuş No: <b>{pnrInfo.flight}</b></>}
              </div>
            )}
          </div>
        )}
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
            {segmentOptions.map(opt => <option key={opt.key} value={opt.label}>{opt.label}</option>)}
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
      <button
        type="submit"
        className="w-full h-[56px] rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold text-xl shadow hover:scale-105 transition"
        style={{ marginTop: 24, marginBottom: 2, position: "relative", bottom: 0 }}
      >
        Devam Et
      </button>
    </form>
  );
}
