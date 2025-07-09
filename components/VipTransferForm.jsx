// === PATH: components/VipTransferForm.jsx ===
"use client";
import { useState, useEffect } from "react";

function fixTurkishChars(str) {
  return str
    .replace(/ý/g, "ı").replace(/Ý/g, "İ")
    .replace(/þ/g, "ş").replace(/Þ/g, "Ş")
    .replace(/ð/g, "ğ").replace(/Ð/g, "Ğ")
    .replace(/æ/g, "ç").replace(/Æ/g, "Ç");
}

export default function VipTransferForm({ onComplete }) {
  // State
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [people, setPeople] = useState("");
  const [segment, setSegment] = useState("");
  const [transfer, setTransfer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pnr, setPnr] = useState("");
  const [showPnr, setShowPnr] = useState(false);
  const [suggestionsFrom, setSuggestionsFrom] = useState([]);
  const [suggestionsTo, setSuggestionsTo] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    fetch("/dumps/il ilçe mahalle köys.txt")
      .then(r => r.text())
      .then(txt => txt.split("\n").map(satir => fixTurkishChars(satir.trim())).filter(Boolean))
      .then(arr => setAllLocations(arr))
      .catch(() => setAllLocations([]));

    fetch("/dumps/airports.json")
      .then(r => r.json())
      .then(arr => setAirports(arr))
      .catch(() => setAirports([]));
  }, []);

  // Autocomplete (FROM)
  useEffect(() => {
    if (from.length < 2) { setSuggestionsFrom([]); return; }
    const value = fixTurkishChars(from.toLowerCase());
    let results = allLocations.filter(l => fixTurkishChars(l.toLowerCase()).includes(value));
    results = results.concat(
      airports.filter(a =>
        fixTurkishChars(a.name.toLowerCase()).includes(value) ||
        fixTurkishChars(a.iata?.toLowerCase() || "").includes(value)
      ).map(a => a.name)
    );
    setSuggestionsFrom([...new Set(results)].slice(0, 8));
  }, [from, allLocations, airports]);

  // Autocomplete (TO)
  useEffect(() => {
    if (to.length < 2) { setSuggestionsTo([]); return; }
    const value = fixTurkishChars(to.toLowerCase());
    let results = allLocations.filter(l => fixTurkishChars(l.toLowerCase()).includes(value));
    results = results.concat(
      airports.filter(a =>
        fixTurkishChars(a.name.toLowerCase()).includes(value) ||
        fixTurkishChars(a.iata?.toLowerCase() || "").includes(value)
      ).map(a => a.name)
    );
    setSuggestionsTo([...new Set(results)].slice(0, 8));
  }, [to, allLocations, airports]);

  function isAirport(val) {
    if (!val) return false;
    const valFixed = fixTurkishChars(val.toLowerCase());
    return airports.some(a =>
      valFixed.includes(fixTurkishChars(a.name.toLowerCase())) ||
      valFixed.includes(fixTurkishChars(a.iata?.toLowerCase() || ""))
    );
  }

  useEffect(() => {
    setShowPnr(isAirport(from) || isAirport(to) || transfer.toLowerCase().includes("havalimanı"));
  }, [from, to, transfer, airports]);

  function handleSubmit(e) {
    e.preventDefault();
    const data = { from, to, people, segment, transfer, date, time, pnr };
    if (typeof window !== "undefined") {
      localStorage.setItem("rezFormData", JSON.stringify(data));
      if (onComplete) onComplete(data);
      window.location.href = "/rezervasyon";
    }
  }

  // Mobil kontrol (responsive için)
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 900 : false;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-1 text-[#bfa658] font-quicksand text-center mt-2">VIP Transfer Rezervasyonu</h2>
      <div className="w-24 h-1 rounded-full bg-[#bfa658] mx-auto mb-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3 md:gap-y-4 mb-5">
        {/* Nereden */}
        <div className="relative">
          <label className="block text-[#bfa658] font-semibold mb-1">Nereden?</label>
          <input
            value={from}
            onChange={e => setFrom(e.target.value)}
            className="w-full h-[42px] rounded-xl px-3 text-base bg-white border border-gray-300 text-black"
            placeholder="Nereden? İl / İlçe / Mahalle / Havalimanı"
            autoComplete="off"
            style={{ fontSize: "16px" }}
          />
          {suggestionsFrom.length > 0 && (
            <div className="absolute z-10 left-0 right-0 bg-white text-black border border-gray-300 rounded-b-xl shadow-lg max-h-40 overflow-auto">
              {suggestionsFrom.map((s, i) => (
                <div
                  key={i}
                  className="px-3 py-2 hover:bg-yellow-100 cursor-pointer"
                  onMouseDown={() => setFrom(s)}
                >{s}</div>
              ))}
            </div>
          )}
        </div>
        {/* Nereye */}
        <div className="relative">
          <label className="block text-[#bfa658] font-semibold mb-1">Nereye?</label>
          <input
            value={to}
            onChange={e => setTo(e.target.value)}
            className="w-full h-[42px] rounded-xl px-3 text-base bg-white border border-gray-300 text-black"
            placeholder="Nereye? İl / İlçe / Mahalle / Havalimanı"
            autoComplete="off"
            style={{ fontSize: "16px" }}
          />
          {suggestionsTo.length > 0 && (
            <div className="absolute z-10 left-0 right-0 bg-white text-black border border-gray-300 rounded-b-xl shadow-lg max-h-40 overflow-auto">
              {suggestionsTo.map((s, i) => (
                <div
                  key={i}
                  className="px-3 py-2 hover:bg-yellow-100 cursor-pointer"
                  onMouseDown={() => setTo(s)}
                >{s}</div>
              ))}
            </div>
          )}
        </div>
        {/* Kişi Sayısı */}
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Kişi Sayısı</label>
          <select value={people} onChange={e => setPeople(e.target.value)} className="w-full h-[42px] rounded-xl px-3 text-base bg-white border border-gray-300 text-black" style={{ fontSize: "16px" }}>
            <option value="">Seçiniz</option>
            {Array.from({ length: 24 }, (_, i) => i + 1).map(val => <option key={val} value={val}>{val}</option>)}
          </select>
        </div>
        {/* PNR */}
        {showPnr ? (
          <div>
            <label className="block text-[#bfa658] font-semibold mb-1">PNR (varsa)</label>
            <input value={pnr} onChange={e => setPnr(e.target.value)} className="w-full h-[42px] rounded-xl px-3 text-base bg-white border border-gray-300 text-black" placeholder="Uçuş Kodu (varsa)" style={{ fontSize: "16px" }} />
          </div>
        ) : (<div />)}
        {/* Transfer Türü */}
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Transfer Türü</label>
          <select value={transfer} onChange={e => setTransfer(e.target.value)} className="w-full h-[42px] rounded-xl px-3 text-base bg-white border border-gray-300 text-black" style={{ fontSize: "16px" }}>
            <option value="">Seçiniz</option>
            <option>VIP Havalimanı Transferi</option>
            <option>Şehirler Arası Transfer</option>
            <option>Kurumsal Etkinlik</option>
            <option>Özel Etkinlik</option>
            <option>Tur & Gezi</option>
            <option>Toplu Transfer</option>
            <option>Düğün vb Organizasyonlar</option>
          </select>
        </div>
        {/* Segment */}
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Araç Segmenti</label>
          <select value={segment} onChange={e => setSegment(e.target.value)} className="w-full h-[42px] rounded-xl px-3 text-base bg-white border border-gray-300 text-black" style={{ fontSize: "16px" }}>
            <option value="">Seçiniz</option>
            <option>Ekonomik</option>
            <option>Lüks</option>
            <option>Prime+</option>
          </select>
        </div>
        {/* Tarih */}
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Tarih</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full h-[42px] rounded-xl px-3 text-base bg-white border border-gray-300 text-black"
            min={new Date().toISOString().split("T")[0]}
            placeholder="Seçiniz"
            style={{ fontSize: "16px" }}
          />
        </div>
        {/* Saat */}
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Saat</label>
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            className="w-full h-[42px] rounded-xl px-3 text-base bg-white border border-gray-300 text-black"
            placeholder="Seçiniz"
            style={{ fontSize: "16px" }}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full h-[40px] rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold text-lg shadow hover:scale-105 transition mt-2"
        style={{ fontSize: "18px" }}
      >
        Devam Et
      </button>
    </form>
  );
}
// === SONU: components/VipTransferForm.jsx ===
