// PATH: app/rezervasyon/RezervasyonForm.jsx
"use client";
import React, { useState, useEffect, useRef } from "react";

// === Türkçe karakter normalize helper ===
const fixTr = s =>
  s?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/İ/g, "I")
    .replace(/ğ/g, "g")
    .replace(/Ğ/g, "G")
    .replace(/ü/g, "u")
    .replace(/Ü/g, "U")
    .replace(/ş/g, "s")
    .replace(/Ş/g, "S")
    .replace(/ö/g, "o")
    .replace(/Ö/g, "O")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "C");

// === Adres AutoComplete ===
function useAddressList() {
  const [addressList, setAddressList] = useState([]);
  useEffect(() => {
    async function fetchAll() {
      let airport = [];
      let mahalle = [];
      try {
        airport = await fetch("/dumps/airports.json").then(r => r.json());
        mahalle = await fetch("/dumps/ililcemahalle.txt").then(r => r.text()).then(txt =>
          txt.split("\n").map(l => fixTr(l.trim())).filter(l => l.length > 3)
        );
      } catch { }
      const out = [
        ...mahalle,
        ...airport.map(a => fixTr(a.name || "")),
        ...airport.map(a => fixTr(a.iata || ""))
      ];
      setAddressList(Array.from(new Set(out)));
    }
    fetchAll();
  }, []);
  return addressList;
}
function AutoCompleteInput({ value, onChange, placeholder, required }) {
  const addressList = useAddressList();
  const [suggestions, setSuggestions] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (!value || value.length < 2) setSuggestions([]);
    else {
      const val = fixTr(value.toLocaleLowerCase("tr-TR"));
      setSuggestions(addressList.filter(a =>
        fixTr(a.toLocaleLowerCase("tr-TR")).includes(val)
      ).slice(0, 12));
    }
  }, [value, addressList]);

  return (
    <div className="relative">
      <input
        className="w-full h-[45px] rounded-xl px-3 text-base bg-white text-black border border-gray-300 focus:ring-2 focus:ring-[#bfa658] transition"
        value={value}
        required={required}
        onChange={e => { onChange(e.target.value); setShowList(true); }}
        placeholder={placeholder}
        onFocus={() => setShowList(true)}
        onBlur={() => setTimeout(() => setShowList(false), 180)}
        autoComplete="off"
      />
      {showList && suggestions.length > 0 &&
        <ul className="absolute z-20 bg-white border border-[#bfa658] rounded-lg w-full mt-1 text-black max-h-60 overflow-y-auto shadow-lg">
          {suggestions.map(s => (
            <li key={s}
              className="px-3 py-1 hover:bg-[#bfa658] hover:text-black cursor-pointer"
              onMouseDown={() => { onChange(s); setShowList(false); }}
            >{s}</li>
          ))}
        </ul>
      }
    </div>
  );
}

// === Seçenekler ===
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

// === PNR Kutu Göstergesi ===
function isAirport(val) {
  if (!val) return false;
  return /havalimanı|airport|uçuş|saw|ist|iga/i.test(val);
}

export default function RezervasyonForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [people, setPeople] = useState("");
  const [segment, setSegment] = useState("");
  const [transfer, setTransfer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pnr, setPnr] = useState("");
  const [error, setError] = useState("");

  // Otomatik doldurma (localStorage & user profili)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const cache = window.localStorage.getItem("rezFormData");
    if (cache) {
      try {
        const d = JSON.parse(cache);
        setFrom(d.from || "");
        setTo(d.to || "");
        setPeople(d.people || "");
        setSegment(d.segment || "");
        setTransfer(d.transfer || "");
        setDate(d.date || "");
        setTime(d.time || "");
        setPnr(d.pnr || "");
      } catch { }
    }
    // TODO: Üyelik varsa profil datası ile otomatik doldur (örnek /api/profile fetch ile)
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("rezFormData", JSON.stringify({ from, to, people, segment, transfer, date, time, pnr }));
  }, [from, to, people, segment, transfer, date, time, pnr]);

  // PNR sadece havalimanı/airport olursa görünür
  const showPNR = transfer === "VIP Havalimanı Transferi" || isAirport(from) || isAirport(to);

  // Responsive: mobil/desktop
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!from || !to || !people || !segment || !transfer || !date || !time) {
      setError("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }
    setError("");
    if (typeof window !== "undefined") {
      window.localStorage.setItem("rezFormData", JSON.stringify({ from, to, people, segment, transfer, date, time, pnr }));
      window.location.href = "/rezervasyon";
    }
  }

  return (
    <form onSubmit={handleSubmit}
      className="w-full flex flex-col items-center"
      style={{
        width: isMobile ? "97vw" : "78vw",
        minWidth: 300,
        maxWidth: isMobile ? "98vw" : "980px",
        margin: "0 auto"
      }}
    >
      <h2 className="text-3xl font-bold text-[#bfa658] mb-1" style={{ marginTop: "8px" }}>
        VIP Transfer Rezervasyonu
      </h2>
      <div className="w-full border-b-2 mb-5" style={{
        borderColor: "#bfa658", borderWidth: "2px", width: isMobile ? "98%" : "72%"
      }} />
      <div className={`grid grid-cols-2 gap-x-8 gap-y-5 w-full mb-4 ${isMobile ? "text-[15px]" : "text-base"}`}>
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Nereden?</label>
          <AutoCompleteInput value={from} onChange={setFrom} placeholder="" required />
        </div>
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Nereye?</label>
          <AutoCompleteInput value={to} onChange={setTo} placeholder="" required />
        </div>
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Kişi Sayısı</label>
          <select className="w-full h-[45px] rounded-xl px-3 text-base bg-white text-black border border-gray-300"
            value={people} onChange={e => setPeople(e.target.value)} required>
            <option value="">Seçiniz</option>
            {Array.from({ length: 24 }, (_, i) => i + 1).map(val => <option key={val} value={val}>{val}</option>)}
          </select>
        </div>
        {showPNR && (
          <div>
            <label className="block text-[#bfa658] font-semibold mb-1">PNR/Uçuş Kodu</label>
            <input className="w-full h-[45px] rounded-xl px-3 text-base bg-white text-black border border-gray-300"
              value={pnr} onChange={e => setPnr(e.target.value)} placeholder="Uçuş Kodu" />
          </div>
        )}
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Transfer Türü</label>
          <select className="w-full h-[45px] rounded-xl px-3 text-base bg-white text-black border border-gray-300"
            value={transfer} onChange={e => setTransfer(e.target.value)} required>
            <option value="">Seçiniz</option>
            {allTransfers.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Araç Segmenti</label>
          <select className="w-full h-[45px] rounded-xl px-3 text-base bg-white text-black border border-gray-300"
            value={segment} onChange={e => setSegment(e.target.value)} required>
            <option value="">Seçiniz</option>
            {segmentOptions.map(opt => <option key={opt.key} value={opt.label}>{opt.label}</option>)}
          </select>
        </div>
        <div className="col-span-2 flex gap-4">
          <div className="flex-1">
            <label className="block text-[#bfa658] font-semibold mb-1">Tarih</label>
            <input
              type="date"
              className="w-full h-[45px] rounded-xl px-3 text-base bg-white text-black border border-gray-300"
              value={date}
              required
              min={new Date().toISOString().split("T")[0]}
              onChange={e => setDate(e.target.value)}
              placeholder="Tarih seçin"
              onClick={e => e.target.showPicker?.()}
            />
          </div>
          <div className="flex-1">
            <label className="block text-[#bfa658] font-semibold mb-1">Saat</label>
            <select
              className="w-full h-[45px] rounded-xl px-3 text-base bg-white text-black border border-gray-300"
              value={time}
              required
              onChange={e => setTime(e.target.value)}
            >
              <option value="">Saat seçin</option>
              {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
            </select>
          </div>
        </div>
      </div>
      {error && <div className="text-red-500 mb-3">{error}</div>}
      <button
        type="submit"
        className="w-[120px] h-[45px] mt-6 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold text-lg shadow hover:scale-105 transition"
        style={{ marginTop: "20px", alignSelf: "center" }}
      >
        Devam Et
      </button>
    </form>
  );
}
// PATH SONU: app/rezervasyon/RezervasyonForm.jsx
