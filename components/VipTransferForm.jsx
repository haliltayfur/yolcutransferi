"use client";
import { useState, useEffect, useRef } from "react";

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

function setFormCache(obj) {
  if (typeof window === "undefined" || !window.localStorage) return;
  Object.entries(obj).forEach(([k, v]) => {
    window.localStorage.setItem("yt_" + k, v ?? "");
  });
}
function getFormCache() {
  if (typeof window === "undefined" || !window.localStorage) return {};
  return {
    from: window.localStorage.getItem("yt_from") || "",
    to: window.localStorage.getItem("yt_to") || "",
    people: window.localStorage.getItem("yt_people") || "",
    segment: window.localStorage.getItem("yt_segment") || "",
    transfer: window.localStorage.getItem("yt_transfer") || "",
    date: window.localStorage.getItem("yt_date") || "",
    time: window.localStorage.getItem("yt_time") || "",
    pnr: window.localStorage.getItem("yt_pnr") || "",
  };
}

function isHavalimani(val) {
  if (!val) return false;
  return /(havaalanı|havalimanı|airport)/i.test(val);
}

export default function VipTransferForm() {
  const initial = getFormCache();
  const [from, setFrom] = useState(initial.from);
  const [to, setTo] = useState(initial.to);
  const [people, setPeople] = useState(initial.people);
  const [segment, setSegment] = useState(initial.segment);
  const [transfer, setTransfer] = useState(initial.transfer);
  const [date, setDate] = useState(initial.date);
  const [time, setTime] = useState(initial.time);
  const [pnr, setPnr] = useState(initial.pnr || "");
  const [showPnr, setShowPnr] = useState(false);

  const fromRef = useRef();
  const toRef = useRef();
  const dateInputRef = useRef();

  // Google Autocomplete
  useEffect(() => {
    if (!window.google || !window.google.maps || !fromRef.current || !toRef.current) return;

    let acFrom = new window.google.maps.places.Autocomplete(fromRef.current, { types: ["geocode"], componentRestrictions: { country: "tr" } });
    let acTo = new window.google.maps.places.Autocomplete(toRef.current, { types: ["geocode"], componentRestrictions: { country: "tr" } });

    acFrom.addListener("place_changed", () => {
      const place = acFrom.getPlace();
      if (place?.formatted_address) setFrom(place.formatted_address);
      else if (place?.name) setFrom(place.name);
      else setFrom(fromRef.current.value);
    });
    acTo.addListener("place_changed", () => {
      const place = acTo.getPlace();
      if (place?.formatted_address) setTo(place.formatted_address);
      else if (place?.name) setTo(place.name);
      else setTo(toRef.current.value);
    });

    return () => {
      window.google.maps.event.clearInstanceListeners(acFrom);
      window.google.maps.event.clearInstanceListeners(acTo);
    };
  }, []);

  // Havalimanı kontrolü (her üç alanda)
  useEffect(() => {
    if (isHavalimani(from) || isHavalimani(to) || isHavalimani(transfer)) {
      setShowPnr(true);
    } else {
      setShowPnr(false);
      setPnr("");
    }
  }, [from, to, transfer]);

  // Tarih inputu UX
  useEffect(() => {
    if (!dateInputRef.current) return;
    const el = dateInputRef.current;
    const openPicker = () => el.showPicker && el.showPicker();
    el.addEventListener("click", openPicker);
    el.addEventListener("focus", openPicker);
    return () => {
      el.removeEventListener("click", openPicker);
      el.removeEventListener("focus", openPicker);
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setFormCache({ from, to, people, segment, transfer, date, time, pnr: showPnr ? pnr : "" });
    window.location.href = "/rezervasyon";
  }

  const inputClass =
    "w-full h-[48px] rounded-xl px-3 text-base bg-white/95 border border-gray-300 focus:ring-2 focus:ring-[#bfa658] transition text-black";

  return (
    <form className="w-full" onSubmit={handleSubmit} autoComplete="off">
      <h2 className="text-3xl font-bold text-[#bfa658] mb-1" style={{ marginTop: 0 }}>
        VIP Transfer Rezervasyonu
      </h2>
      <div style={{
        height: 2,
        background: "#bfa658",
        borderRadius: 2,
        width: "100%",
        marginBottom: 18,
        marginTop: 3,
      }} />
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5">
        {/* Nereden */}
        <div className="col-span-1">
          <label className="block text-[#bfa658] font-semibold mb-1">Nereden?</label>
          <input
            className={inputClass}
            placeholder="Nereden? İl / İlçe / Havalimanı"
            ref={fromRef}
            value={from}
            onChange={e => setFrom(e.target.value)}
            autoComplete="off"
          />
        </div>
        {/* Nereye */}
        <div className="col-span-1">
          <label className="block text-[#bfa658] font-semibold mb-1">Nereye?</label>
          <input
            className={inputClass}
            placeholder="Nereye? İl / İlçe / Havalimanı"
            ref={toRef}
            value={to}
            onChange={e => setTo(e.target.value)}
            autoComplete="off"
          />
        </div>
        {/* Kişi Sayısı */}
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Kişi Sayısı</label>
          <select className={inputClass} value={people} onChange={e => setPeople(e.target.value)}>
            <option value="">Seçiniz</option>
            {Array.from({ length: 16 }, (_, i) => i + 1).map(val => <option key={val} value={val}>{val}</option>)}
          </select>
        </div>
        {/* PNR sadece havalimanı varsa */}
        {showPnr ? (
          <div>
            <label className="block text-[#bfa658] font-semibold mb-1">PNR/Uçuş Kodu</label>
            <input
              className={inputClass}
              placeholder="Uçuş Rezervasyon Kodu"
              value={pnr}
              onChange={e => setPnr(e.target.value)}
              autoComplete="off"
            />
          </div>
        ) : <div></div>}
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
            ref={dateInputRef}
            className={inputClass}
            value={date}
            onChange={e => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            style={{ cursor: "pointer" }}
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
    </form>
  );
}
