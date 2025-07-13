// PATH: app/components/VipTransferForm.jsx
"use client";
import { useState, useEffect } from "react";

// Segment ve transfer tipleri
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

// Türkçe karakter düzelt ve baş harfleri büyüt
function fixTurkish(str) {
  if (!str) return "";
  return str
    .replace(/\\u0131/g, "ı").replace(/\\u015f/g, "ş").replace(/\\u011f/g, "ğ").replace(/\\u00fc/g, "ü")
    .replace(/\\u00f6/g, "ö").replace(/\\u00e7/g, "ç")
    .replace(/\\u0130/g, "İ").replace(/\\u015e/g, "Ş").replace(/\\u011e/g, "Ğ").replace(/\\u00dc/g, "Ü")
    .replace(/\\u00d6/g, "Ö").replace(/\\u00c7/g, "Ç");
}
function titleCase(str) {
  if (!str) return "";
  return str
    .split(" ")
    .map(w => w[0] ? w[0].toLocaleUpperCase("tr-TR") + w.slice(1).toLocaleLowerCase("tr-TR") : "")
    .join(" ");
}

// Havaalanı ve il/ilçe lokasyonları otomatik fetch & birleştirme
function useAllLocations() {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    let isMounted = true;
    Promise.all([
      fetch("/dumps/airports.json").then(r => r.json()).catch(() => []),
      fetch("https://raw.githubusercontent.com/haliltayfur/yolcutransferi/main/public/dumps/ililce.txt").then(r => r.text()).catch(() => "")
    ]).then(([airports, iller]) => {
      const airportNames = (airports || []).map(a => a.name);
      const ililceList = (iller || "").split("\n").map(x => titleCase(fixTurkish(x.trim()))).filter(Boolean);
      const allLocs = Array.from(new Set([...airportNames, ...ililceList])).map(titleCase);
      if (isMounted) setLocations(allLocs);
    });
    return () => { isMounted = false };
  }, []);
  return locations;
}

export default function VipTransferForm({ onComplete, initialData = {} }) {
  // State'ler, ilk açılışta varsa initialData'dan doldur (onComplete ile gelen)
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
  const [averagePrice, setAveragePrice] = useState(null);
  const allLocations = useAllLocations();

  // Autocomplete filtre
  function handleFromChange(e) {
    const v = titleCase(e.target.value);
    setFrom(v);
    setFromSuggestions(
      v.length > 1
        ? allLocations.filter(loc => loc.toLocaleLowerCase("tr-TR").includes(v.toLocaleLowerCase("tr-TR")))
        : []
    );
  }
  function handleToChange(e) {
    const v = titleCase(e.target.value);
    setTo(v);
    setToSuggestions(
      v.length > 1
        ? allLocations.filter(loc => loc.toLocaleLowerCase("tr-TR").includes(v.toLocaleLowerCase("tr-TR")))
        : []
    );
  }

  // Form submitte fiyat çekme (simülasyon, gerçek scraping için server API gerektirir)
  async function handleSubmit(e) {
    e.preventDefault();
    setAveragePrice(null);

    // Normalde backend scraping ile fiyat alınır, burada demo için random
    setTimeout(() => {
      const fake = 800 + Math.floor(Math.random() * 1200);
      setAveragePrice(fake);
    }, 1000);

    // Form submitte initialData doldurulursa /rezervasyon'a aktarılsın diye
    if (onComplete) onComplete({ from, to, people, segment, transfer, date, time, pnr });
    // Eğer sadece yönlendirme varsa:
    // window.location.href = "/rezervasyon";
  }

  // Stil: Çizgi çerçeveyle uyumlu ve daha ince
  const inputClass =
    "w-full h-[48px] rounded-xl px-3 text-base bg-white/95 border border-gray-300 focus:ring-2 focus:ring-[#bfa658] transition text-black";

  return (
    <form className="w-full" onSubmit={handleSubmit} autoComplete="off">
      <h2 className="text-3xl font-bold text-[#bfa658] mb-1" style={{ marginTop: 0 }}>
        VIP Transfer Rezervasyonu
      </h2>
      {/* İnce altın çizgi */}
      <div
        style={{
          height: 2,
          background: "#bfa658",
          borderRadius: 2,
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
            placeholder="Nereden? İl / İlçe / Havalimanı"
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
            placeholder="Nereye? İl / İlçe / Havalimanı"
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
      <button
        type="submit"
        className="w-full h-[48px] rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold text-xl shadow hover:scale-105 transition mb-2"
        style={{ marginTop: 16, marginBottom: 0, position: "relative", bottom: 0 }}
      >
        Devam Et
      </button>
      {averagePrice && (
        <div className="mt-4 text-xl text-center text-[#bfa658] font-bold">
          Ortalama Transfer Tutarı: <span className="text-[#ffeec2]">{averagePrice} TL</span>
        </div>
      )}
    </form>
  );
}
// PATH: app/components/VipTransferForm.jsx
