// PATH: app/rezervasyon/RezervasyonForm.jsx

"use client";
import React, { useState, useEffect } from "react";
import EkstralarAccordion from "../../data/EkstralarAccordion.jsx";
import { vehicles } from "../../data/vehicleList.js";
import { extrasListByCategory } from "../../data/extrasByCategory.js";
import { useRouter } from "next/navigation";

// ======= ADRES AUTOCOMPLETE (il, ilçe, mahalle ve airport) =======
function useAddressList() {
  const [addressList, setAddressList] = useState([]);
  useEffect(() => {
    async function fetchAll() {
      let [adresler, airports] = await Promise.all([
        fetch("/dumps/il ilçe mahalle köys.txt").then(r => r.text()).catch(() => ""),
        fetch("/dumps/airports.json").then(r => r.json()).catch(() => [])
      ]);
      let lines = adresler.split("\n").map(l => l.trim()).filter(Boolean);
      let ap = airports.map(a => a.name || "").filter(Boolean);
      setAddressList([...lines, ...ap]);
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
      setSuggestions(addressList.filter(a => a.toLocaleLowerCase("tr-TR").includes(val)).slice(0, 15));
    }
  }, [value, addressList]);
  return (
    <div className="relative">
      <input
        className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
        value={value}
        onChange={e => { onChange(e.target.value); setShowList(true); }}
        placeholder={placeholder}
        onFocus={() => setShowList(true)}
        onBlur={() => setTimeout(() => setShowList(false), 120)}
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

// =============== MESAFE & SÜRE (simülasyon) ===============
function useDistance(from, to, time) {
  const [data, setData] = useState({ km: "", min: "", error: "" });
  useEffect(() => {
    if (!from || !to) return;
    setData({ km: "...", min: "...", error: "" });
    setTimeout(() => setData({
      km: Math.floor(25 + Math.random() * 180) + " km",
      min: (time && +time.split(":")[0] >= 7 && +time.split(":")[0] <= 10) ? "Yoğun Saat: 90 dk" : (30 + Math.random() * 60 | 0) + " dk",
      error: ""
    }), 800);
  }, [from, to, time]);
  return data;
}

// =============== VIP FORM/USER PROFILE OTOMATİK DOLDURMA ===============
function getSavedForm() {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem("vipForm")) || {}; }
  catch { return {}; }
}
function getUserProfile() {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem("userProfile")) || {}; }
  catch { return {}; }
}

// =============== ARAÇ KOMBO ===============
function bestVehicleCombos(people, segment) {
  if (!people || !segment) return [];
  people = Number(people);
  let candidates = vehicles.filter(v => v.segment === segment && v.max >= people);
  if (people <= 5) candidates = candidates.filter(v => v.max <= 5);
  else if (people <= 9) candidates = candidates.filter(v => v.max <= 9);
  if (candidates.length === 0)
    candidates = vehicles.filter(v => v.segment === segment && v.max >= people);
  if (candidates.length === 0) return [];
  candidates = candidates.sort((a, b) => a.max - b.max);
  let combos = [];
  let best = candidates.find(v => v.max >= people);
  if (best) combos.push([{ ...best, count: 1 }]);
  return combos;
}
const airportKeywords = [
  "havalimanı", "havaalanı", "airport", "iga", "ist", "saw", "esb", "adb", "uçuş"
];
function isAirportRelated(val) {
  if (!val) return false;
  const t = val.toLocaleLowerCase("tr-TR");
  return airportKeywords.some(k => t.includes(k));
}
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

export default function RezervasyonForm() {
  const router = useRouter();
  const vipDefaults = getSavedForm();
  const userProfile = getUserProfile();

  const [from, setFrom] = useState(vipDefaults.from || "");
  const [to, setTo] = useState(vipDefaults.to || "");
  const [people, setPeople] = useState(vipDefaults.people || "");
  const [segment, setSegment] = useState(vipDefaults.segment || "");
  const [transfer, setTransfer] = useState(vipDefaults.transfer || "");
  const [date, setDate] = useState(vipDefaults.date || "");
  const [time, setTime] = useState(vipDefaults.time || "");
  const [name, setName] = useState(userProfile.name || "");
  const [surname, setSurname] = useState(userProfile.surname || "");
  const [tc, setTc] = useState(userProfile.tc || "");
  const [phone, setPhone] = useState(userProfile.phone || "");
  const [email, setEmail] = useState(userProfile.email || "");
  const [pnr, setPnr] = useState(vipDefaults.pnr || "");
  const [note, setNote] = useState("");
  const [extras, setExtras] = useState([]);
  const [extrasQty, setExtrasQty] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [showKvkkPopup, setShowKvkkPopup] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [kvkkChecked, setKvkkChecked] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  const { km, min, error: distErr } = useDistance(from, to, time);
  const isValidTC = t => /^[1-9]\d{9}[02468]$/.test(t) && t.length === 11;
  const isValidPhone = t => /^05\d{9}$/.test(t) && t.length === 11;
  const isValidEmail = t => /^\S+@\S+\.\S+$/.test(t);

  function handleTcChange(val) { setTc(val.replace(/\D/g, "").slice(0, 11)); }
  function handlePhoneChange(val) {
    let num = val.replace(/\D/g, "");
    if (num.length > 0 && num[0] !== "0") num = "0" + num;
    setPhone(num.slice(0, 11));
  }
  const vehicleCombos = bestVehicleCombos(Number(people), segment);

  function handleSubmit(e) {
    e.preventDefault();
    const err = {};
    if (!from) err.from = "Lütfen kalkış noktası giriniz.";
    if (!to) err.to = "Lütfen varış noktası giriniz.";
    if (!people) err.people = "Kişi sayısı zorunlu.";
    if (!segment) err.segment = "Lütfen segment seçiniz.";
    if (!transfer) err.transfer = "Lütfen transfer tipi seçiniz.";
    if (!date) err.date = "Tarih zorunlu.";
    if (!time) err.time = "Saat zorunlu.";
    if (!name) err.name = "Ad zorunlu.";
    if (!surname) err.surname = "Soyad zorunlu.";
    if (!isValidTC(tc)) err.tc = "Geçerli bir TC Kimlik No giriniz.";
    if (!isValidPhone(phone)) err.phone = "Geçerli bir 05xx ile başlayan telefon giriniz.";
    if (!isValidEmail(email)) err.email = "Geçerli e-posta adresi giriniz.";
    if (!kvkkChecked) err.kvkk = "KVKK onayı zorunludur.";
    setFieldErrors(err);
    if (Object.keys(err).length > 0) return;
    setShowSummary(true);
  }

  const showVehicleCombos = segment && people;
  const showPNR = transfer === "VIP Havalimanı Transferi" || isAirportRelated(from) || isAirportRelated(to);

  // === Mobil ekran tespit ===
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 900); }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      className="w-full mx-auto rounded-3xl shadow-2xl bg-[#19160a] border border-[#bfa658] px-3 sm:px-6 md:px-12 py-12 my-10"
      style={{
        maxWidth: isMobile ? 380 : "62vw", // %15 daha geniş, mobilde daha dar
        minWidth: 270,
        transition: "max-width 0.4s",
      }}
    >
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center font-quicksand"
        style={{ letterSpacing: ".02em" }}>
        VIP Rezervasyon Formu
      </h1>
      {/* Altın çizgi */}
      <div style={{
        width: "min(430px,100%)",
        height: "4px",
        margin: "0 auto 1.2em auto",
        background: "linear-gradient(90deg, #FFD700 45%, #bfa658 70%)",
        borderRadius: "2px"
      }} />
      <form onSubmit={handleSubmit} autoComplete="on" className="flex flex-col gap-2">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-2`}>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereden?</label>
            <AutoCompleteInput value={from} onChange={setFrom} placeholder="Nereden? İl / İlçe / Mahalle / Havalimanı" />
            {fieldErrors.from && <div className="text-red-400 text-xs mt-1">{fieldErrors.from}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
            <AutoCompleteInput value={to} onChange={setTo} placeholder="Nereye? İl / İlçe / Mahalle / Havalimanı" />
            {fieldErrors.to && <div className="text-red-400 text-xs mt-1">{fieldErrors.to}</div>}
          </div>
        </div>
        {from && to && (
          <div className="mb-2 text-[#ffeec2] text-xs">
            <span className="font-semibold">Tahmini mesafe:</span> {km}   |  
            <span className="font-semibold">Tahmini süre:</span> {min}
            {distErr && <span className="text-red-400 ml-3">{distErr}</span>}
            <span className="text-[#bfa658] ml-3 text-sm">(Trafik yoğunluğu ve saat bilgisine göre değişebilir)</span>
          </div>
        )}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-2`}>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Kişi Sayısı</label>
            <select className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={people} onChange={e => setPeople(e.target.value)}
              style={isMobile ? { fontSize: "13px" } : {}}
            >
              <option value="">Seçiniz</option>
              {Array.from({ length: 24 }, (_, i) => i + 1).map(val => <option key={val} value={val}>{val}</option>)}
            </select>
            {fieldErrors.people && <div className="text-red-400 text-xs mt-1">{fieldErrors.people}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
            <select className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={segment} onChange={e => setSegment(e.target.value)}
              style={isMobile ? { fontSize: "13px" } : {}}
            >
              <option value="">Seçiniz</option>
              {segmentOptions.map(opt => <option key={opt.key} value={opt.label}>{opt.label}</option>)}
            </select>
            {fieldErrors.segment && <div className="text-red-400 text-xs mt-1">{fieldErrors.segment}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Transfer Türü</label>
            <select className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={transfer} onChange={e => setTransfer(e.target.value)}
              style={isMobile ? { fontSize: "13px" } : {}}
            >
              <option value="">Seçiniz</option>
              {allTransfers.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            {fieldErrors.transfer && <div className="text-red-400 text-xs mt-1">{fieldErrors.transfer}</div>}
          </div>
        </div>
        {/* TARİH/SAAT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          {/* Tarih */}
          <div onClick={e => e.currentTarget.querySelector("input")?.showPicker && e.currentTarget.querySelector("input").showPicker()}>
            <label className="font-bold text-[#bfa658] mb-1 block">Tarih</label>
            <input
              name="date"
              type="date"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={date}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              placeholder="Tarih seçin"
              autoComplete="on"
              style={{ cursor: "pointer", fontSize: isMobile ? "13px" : "16px" }}
            />
            {fieldErrors.date && <div className="text-red-400 text-xs mt-1">{fieldErrors.date}</div>}
          </div>
          {/* Saat */}
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
            <div style={{ position: "relative" }}>
              <select
                className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
                value={time}
                onChange={e => setTime(e.target.value)}
                style={{ cursor: "pointer", fontSize: isMobile ? "13px" : "16px" }}
              >
                <option value="">{date ? "Saat seçin" : "Önce tarih seçin"}</option>
                {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
              </select>
              <div style={{
                position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                zIndex: 1, cursor: "pointer"
              }}
                onClick={e => e.currentTarget.previousSibling && e.currentTarget.previousSibling.focus()}
              />
            </div>
            {fieldErrors.time && <div className="text-red-400 text-xs mt-1">{fieldErrors.time}</div>}
          </div>
        </div>
        {/* PNR */}
        {showPNR && (
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">PNR/Uçuş Kodu</label>
            <input
              name="pnr"
              type="text"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={pnr}
              onChange={e => setPnr(e.target.value)}
              placeholder="Uçuş rezervasyon kodu (varsa)"
            />
          </div>
        )}
        {/* Devam Et */}
        <div className="flex justify-center mt-7">
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-10 rounded-xl text-xl shadow hover:scale-105 transition"
            style={{
              width: isMobile ? "75%" : "38%",
              marginBottom: isMobile ? 10 : 18
            }}
          >
            Devam Et
          </button>
        </div>
      </form>
    </section>
  );
}

// PATH: app/rezervasyon/RezervasyonForm.jsx
