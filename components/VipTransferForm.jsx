"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// ----------- isAirportRelated FONKSİYONU -----------
function isAirportRelated(val) {
  if (!val) return false;
  const airportKeywords = [
    "havalimanı", "istanbul havalimanı", "iga", "ist", "sabiha gökçen", "saw", "eskişehir havalimanı",
    "antalya havalimanı", "ankara esenboğa", "esenboğa", "milas bodrum", "izmir adnan", "trabzon havalimanı"
  ];
  const t = val.toLocaleLowerCase("tr-TR");
  return airportKeywords.some(k => t.includes(k));
}

// ----------- AUTOCOMPLETE INPUT -----------
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
        style={{ minHeight: 48, fontSize: 16 }}
      />
      {showList && suggestions.length > 0 &&
        <ul className="absolute z-20 bg-[#19160a] border border-[#bfa658] rounded-lg w-full mt-1 text-[#ffeec2] max-h-52 overflow-y-auto shadow-lg">
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

// ----------- SABİT LİSTELER -----------
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

// ----------- FORM -----------
export default function VipTransferForm() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [people, setPeople] = useState("");
  const [segment, setSegment] = useState("");
  const [transfer, setTransfer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pnr, setPnr] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const err = {};
    if (!from) err.from = "Nereden?";
    if (!to) err.to = "Nereye?";
    if (!people) err.people = "Kişi sayısı?";
    if (!segment) err.segment = "Segment?";
    if (!transfer) err.transfer = "Transfer türü?";
    if (!date) err.date = "Tarih?";
    if (!time) err.time = "Saat?";
    setFieldErrors(err);
    if (Object.keys(err).length > 0) return;
    const params = new URLSearchParams({
      from, to, people, segment, transfer, date, time, pnr
    });
    router.push(`/rezervasyon?${params.toString()}`);
  }
  const showPNR = transfer === "VIP Havalimanı Transferi" || isAirportRelated(from) || isAirportRelated(to);

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        bg-[#19160a] border border-[#bfa658] rounded-3xl shadow-2xl
        mt-8 ml-0 md:ml-14
        px-3 py-7 sm:px-5 md:px-10 lg:px-14
        w-full max-w-2xl
        flex flex-col
      `}
      style={{ minWidth: 0, width: "100%" }}
    >
      <div className="mb-8 text-xl sm:text-2xl font-extrabold text-[#bfa658] text-left">
        VIP Transfer Rezervasyonu
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
        <div>
          <label className="block font-bold text-[#bfa658] mb-1 text-sm sm:text-base">Nereden?</label>
          <AutoCompleteInput value={from} onChange={setFrom} placeholder="Nereden? İl / İlçe / Mahalle / Havalimanı" />
          {fieldErrors.from && <div className="text-red-400 text-xs mt-1">{fieldErrors.from}</div>}
        </div>
        <div>
          <label className="block font-bold text-[#bfa658] mb-1 text-sm sm:text-base">Nereye?</label>
          <AutoCompleteInput value={to} onChange={setTo} placeholder="Nereye? İl / İlçe / Mahalle / Havalimanı" />
          {fieldErrors.to && <div className="text-red-400 text-xs mt-1">{fieldErrors.to}</div>}
        </div>
        <div>
          <label className="block font-bold text-[#bfa658] mb-1 text-sm sm:text-base">Kişi Sayısı</label>
          <select
            className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3 text-base"
            value={people}
            onChange={e => setPeople(e.target.value)}
            style={{ minHeight: 48, fontSize: 16 }}
          >
            <option value="">Seçiniz</option>
            {Array.from({ length: 24 }, (_, i) => i + 1).map(val => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
          {fieldErrors.people && <div className="text-red-400 text-xs mt-1">{fieldErrors.people}</div>}
        </div>
        <div>
          <label className="block font-bold text-[#bfa658] mb-1 text-sm sm:text-base">Segment</label>
          <select
            className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3 text-base"
            value={segment}
            onChange={e => setSegment(e.target.value)}
            style={{ minHeight: 48, fontSize: 16 }}
          >
            <option value="">Seçiniz</option>
            {segmentOptions.map(opt => (
              <option key={opt.key} value={opt.label}>{opt.label}</option>
            ))}
          </select>
          {fieldErrors.segment && <div className="text-red-400 text-xs mt-1">{fieldErrors.segment}</div>}
        </div>
        <div>
          <label className="block font-bold text-[#bfa658] mb-1 text-sm sm:text-base">Transfer Türü</label>
          <select
            className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3 text-base"
            value={transfer}
            onChange={e => setTransfer(e.target.value)}
            style={{ minHeight: 48, fontSize: 16 }}
          >
            <option value="">Seçiniz</option>
            {allTransfers.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {fieldErrors.transfer && <div className="text-red-400 text-xs mt-1">{fieldErrors.transfer}</div>}
        </div>
        {/* Tarih & Saat yan yana */}
        <div className="flex flex-row gap-3 col-span-2">
          <div className="flex-1">
            <label className="block font-bold text-[#bfa658] mb-1 text-sm sm:text-base">Tarih</label>
            <input
              type="date"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3 text-base"
              value={date}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              style={{ minHeight: 48, fontSize: 16 }}
            />
            {fieldErrors.date && <div className="text-red-400 text-xs mt-1">{fieldErrors.date}</div>}
          </div>
          <div className="flex-1">
            <label className="block font-bold text-[#bfa658] mb-1 text-sm sm:text-base">Saat</label>
            <select
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3 text-base"
              value={time}
              onChange={e => setTime(e.target.value)}
              style={{ minHeight: 48, fontSize: 16 }}
            >
              <option value="">Seçiniz</option>
              {saatler.map(saat => (
                <option key={saat} value={saat}>{saat}</option>
              ))}
            </select>
            {fieldErrors.time && <div className="text-red-400 text-xs mt-1">{fieldErrors.time}</div>}
          </div>
        </div>
        {/* PNR kutucuğu full row */}
        {showPNR && (
          <div className="col-span-2">
            <label className="block font-bold text-[#bfa658] mb-1 text-sm sm:text-base">PNR/Uçuş Kodu</label>
            <input
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3 text-base"
              value={pnr}
              onChange={e => setPnr(e.target.value)}
              placeholder="Uçuş rezervasyon kodu (varsa)"
              style={{ minHeight: 48, fontSize: 16 }}
            />
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full mt-8 bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-12 rounded-xl text-xl shadow hover:scale-105 transition"
        style={{ minHeight: 50, fontSize: 20 }}
      >
        Devam Et
      </button>
    </form>
  );
}
