// === Dosya: components/VipTransferForm.jsx ===
"use client";
import { useState, useEffect } from "react";

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

function useAddressList() {
  const [addressList, setAddressList] = useState([]);
  useEffect(() => {
    async function fetchAll() {
      let [sehir, ilce, mahalle, airport] = await Promise.all([
        fetch("/dumps/sehirler.json").then(r => r.json()).catch(() => []),
        fetch("/dumps/ilceler.json").then(r => r.json()).catch(() => []),
        fetch("/dumps/mahalleler-1.json").then(r => r.json()).catch(() => []),
        fetch("/dumps/airports.json").then(r => r.json()).catch(() => []),
      ]);
      let out = [];
      sehir.forEach(s => out.push(`${s.sehir_adi}`));
      ilce.forEach(i => out.push(`${i.ilce_adi}`));
      mahalle.forEach(m => out.push(`${m.mahalle_adi}`));
      airport.forEach(a => out.push(`${a.name}`));
      setAddressList(Array.from(new Set(out)));
    }
    fetchAll();
  }, []);
  return addressList;
}
function AutoCompleteInput({ value, onChange, placeholder }) {
  const addressList = useAddressList();
  const [suggestions, setSuggestions] = useState([]);
  const [showList, setShowList] = useState(false);
  useEffect(() => {
    if (!value || value.length < 2) setSuggestions([]);
    else {
      const val = value.toLocaleLowerCase("tr-TR");
      setSuggestions(addressList.filter(a => a.toLocaleLowerCase("tr-TR").includes(val)).slice(0, 12));
    }
  }, [value, addressList]);
  return (
    <div className="relative w-full">
      <input
        className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3 text-base"
        value={value}
        onChange={e => { onChange(e.target.value); setShowList(true); }}
        placeholder={placeholder}
        onFocus={() => setShowList(true)}
        onBlur={() => setTimeout(() => setShowList(false), 140)}
        autoComplete="off"
      />
      {showList && suggestions.length > 0 &&
        <ul className="absolute z-20 bg-[#19160a] border border-[#bfa658] rounded-lg w-full mt-1 text-[#ffeec2] max-h-52 overflow-y-auto shadow-lg">
          {suggestions.map(s => (
            <li key={s}
              className="px-3 py-1 hover:bg-[#bfa658] hover:text-black cursor-pointer"
              onClick={() => { onChange(s); setShowList(false); }}
            >{s}</li>
          ))}
        </ul>
      }
    </div>
  );
}

export default function VipTransferForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [people, setPeople] = useState("");
  const [segment, setSegment] = useState("");
  const [transfer, setTransfer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pnr, setPnr] = useState("");
  const [errors, setErrors] = useState({});

  // Havalimanı seçimiyle PNR gösterimi
  const airportKeywords = [
    "havalimanı", "istanbul havalimanı", "iga", "ist", "sabiha gökçen", "saw", "eskişehir havalimanı",
    "antalya havalimanı", "ankara esenboğa", "esenboğa", "milas bodrum", "izmir adnan", "trabzon havalimanı"
  ];
  function isAirportRelated(val) {
    if (!val) return false;
    const t = val.toLocaleLowerCase("tr-TR");
    return airportKeywords.some(k => t.includes(k));
  }
  const showPNR = transfer === "VIP Havalimanı Transferi" || isAirportRelated(from) || isAirportRelated(to);

  function handleSubmit(e) {
    e.preventDefault();
    let err = {};
    if (!from) err.from = "Nereden?";
    if (!to) err.to = "Nereye?";
    if (!people) err.people = "Kişi?";
    if (!segment) err.segment = "Segment?";
    if (!transfer) err.transfer = "Transfer türü?";
    if (!date) err.date = "Tarih?";
    if (!time) err.time = "Saat?";
    setErrors(err);
    if (Object.keys(err).length === 0) {
      // DEVAM ET: Burada routing veya popup açma vs. yapılabilir
      alert("Form başarıyla iletildi!");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="on"
      className="w-full flex flex-col justify-center items-center gap-2"
    >
      <div className="text-xl md:text-2xl font-bold mb-2 text-[#bfa658] text-left w-full" style={{ letterSpacing: ".5px" }}>
        VIP Transfer Rezervasyonu
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2 mb-2">
        {/* Nereden/Nereye */}
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Nereden?</label>
          <AutoCompleteInput value={from} onChange={setFrom} placeholder="Nereden? İl / İlçe / Mahalle / Havalimanı" />
          {errors.from && <div className="text-red-400 text-xs mt-1">{errors.from}</div>}
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
          <AutoCompleteInput value={to} onChange={setTo} placeholder="Nereye? İl / İlçe / Mahalle / Havalimanı" />
          {errors.to && <div className="text-red-400 text-xs mt-1">{errors.to}</div>}
        </div>
        {/* Kişi/Segment */}
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Kişi Sayısı</label>
          <select
            className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3 text-base"
            value={people}
            onChange={e => setPeople(e.target.value)}
          >
            <option value="">Seçiniz</option>
            {Array.from({ length: 24 }, (_, i) => i + 1).map(val => <option key={val} value={val}>{val}</option>)}
          </select>
          {errors.people && <div className="text-red-400 text-xs mt-1">{errors.people}</div>}
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
          <select
            className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3 text-base"
            value={segment}
            onChange={e => setSegment(e.target.value)}
          >
            <option value="">Seçiniz</option>
            {segmentOptions.map(opt => <option key={opt.key} value={opt.label}>{opt.label}</option>)}
          </select>
          {errors.segment && <div className="text-red-400 text-xs mt-1">{errors.segment}</div>}
        </div>
        {/* Transfer Türü / Tarih */}
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Transfer Türü</label>
          <select
            className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3 text-base"
            value={transfer}
            onChange={e => setTransfer(e.target.value)}
          >
            <option value="">Seçiniz</option>
            {allTransfers.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          {errors.transfer && <div className="text-red-400 text-xs mt-1">{errors.transfer}</div>}
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="font-bold text-[#bfa658] mb-1 block">Tarih</label>
            <input
              name="date"
              type="date"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3 text-base"
              value={date}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              autoComplete="on"
            />
            {errors.date && <div className="text-red-400 text-xs mt-1">{errors.date}</div>}
          </div>
          <div className="flex-1">
            <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
            <select
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3 text-base"
              value={time}
              onChange={e => setTime(e.target.value)}
            >
              <option value="">Seçiniz</option>
              {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
            </select>
            {errors.time && <div className="text-red-400 text-xs mt-1">{errors.time}</div>}
          </div>
        </div>
        {/* PNR */}
        {showPNR &&
          <div className="md:col-span-2">
            <label className="font-bold text-[#bfa658] mb-1 block">PNR/Uçuş Kodu</label>
            <input
              name="pnr"
              type="text"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3 text-base"
              value={pnr}
              onChange={e => setPnr(e.target
