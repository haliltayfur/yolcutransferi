// PATH: /app/rezervasyon/RezervasyonForm.jsx

"use client";
import React, { useState, useEffect } from "react";
import EkstralarAccordion from "../../data/EkstralarAccordion.jsx";
import { vehicles } from "../../data/vehicleList.js";
import { extrasListByCategory } from "../../data/extrasByCategory.js";
import { useRouter } from "next/navigation";

// === Adres AutoComplete ===
function useAddressList() {
  const [addressList, setAddressList] = useState([]);
  useEffect(() => {
    async function fetchAll() {
      // Büyük JSON ya da TXT dosyasından oku
      let adresler = [];
      try {
        const txt = await fetch("/dumps/ililcemahalle.txt").then(r => r.text());
        // Her satır: "istanbul ümraniye istiklal mahallesi" gibi
        adresler = txt.split("\n").map(x => x.trim()).filter(Boolean);
      } catch {
        adresler = [];
      }
      // Airports
      let airports = [];
      try {
        airports = await fetch("/dumps/airports.json").then(r => r.json());
        airports = airports.map(a => a.name + (a.iata ? " (" + a.iata + ")" : ""));
      } catch {
        airports = [];
      }
      setAddressList([...adresler, ...airports]);
    }
    fetchAll();
  }, []);
  return addressList;
}
function normalizeTr(str) {
  // Türkçe karakter normalize
  return str
    .toLocaleLowerCase("tr-TR")
    .replace(/ç/g, "c").replace(/ğ/g, "g")
    .replace(/ı/g, "i").replace(/ö/g, "o")
    .replace(/ş/g, "s").replace(/ü/g, "u");
}
function AutoCompleteInput({ value, onChange, placeholder }) {
  const addressList = useAddressList();
  const [suggestions, setSuggestions] = useState([]);
  const [showList, setShowList] = useState(false);
  useEffect(() => {
    if (!value || value.length < 2) setSuggestions([]);
    else {
      const val = normalizeTr(value);
      setSuggestions(
        addressList.filter(
          a => normalizeTr(a).includes(val)
        ).slice(0, 15)
      );
    }
  }, [value, addressList]);
  return (
    <div className="relative">
      <input
        className="input w-full bg-[#faf6ea] text-black border border-[#bfa658] rounded-xl px-4 py-3 font-medium"
        value={value}
        onChange={e => { onChange(e.target.value); setShowList(true); }}
        placeholder={placeholder}
        onFocus={() => setShowList(true)}
        onBlur={() => setTimeout(() => setShowList(false), 120)}
        autoComplete="off"
      />
      {showList && suggestions.length > 0 &&
        <ul className="absolute z-20 bg-[#fff8ea] border border-[#bfa658] rounded-lg w-full mt-1 text-[#222] max-h-56 overflow-y-auto shadow-xl">
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

// === Mesafe & Süre (dummy) ===
function useDistance(from, to, time) {
  const [data, setData] = useState({ km: "", min: "", error: "" });
  useEffect(() => {
    if (!from || !to) return;
    async function fetchDist() {
      setData({ km: "...", min: "...", error: "" });
      setTimeout(() => setData({
        km: Math.floor(25 + Math.random() * 180) + " km",
        min: (time && +time.split(":")[0] >= 7 && +time.split(":")[0] <= 10) ? "Yoğun Saat: 90 dk" : (30 + Math.random() * 60 | 0) + " dk",
        error: ""
      }), 800);
    }
    fetchDist();
  }, [from, to, time]);
  return data;
}

// === Araç Kombinasyonu ===
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

// === PNR GÖSTER ===
function isAirportRelated(val) {
  if (!val) return false;
  // Hem ililcemahalle hem de airport.json ile ilgili kontrol
  return /(havalimanı|airport|uçuş|istanbul havalimanı|sabiha gökçen|iga|ist|saw|eskişehir havalimanı|milas bodrum|izmir adnan|esenboğa|trabzon havalimanı)/i.test(val);
}

// === LocalStorage ile otomatik doldurma ===
function getLocalData() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("rezFormData") || "{}");
  } catch { return {}; }
}
function setLocalData(obj) {
  if (typeof window !== "undefined") {
    localStorage.setItem("rezFormData", JSON.stringify(obj));
  }
}

// === Ana Form ===
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
  // Önce localStorage’dan otomatik doldurma
  const initial = getLocalData();
  const [from, setFrom] = useState(initial.from || "");
  const [to, setTo] = useState(initial.to || "");
  const [people, setPeople] = useState(initial.people || "");
  const [segment, setSegment] = useState(initial.segment || "");
  const [transfer, setTransfer] = useState(initial.transfer || "");
  const [date, setDate] = useState(initial.date || "");
  const [time, setTime] = useState(initial.time || "");
  const [pnr, setPnr] = useState(initial.pnr || "");
  // ... diğer alanlar aynı kalıyor
  const [name, setName] = useState(initial.name || "");
  const [surname, setSurname] = useState(initial.surname || "");
  const [tc, setTc] = useState(initial.tc || "");
  const [phone, setPhone] = useState(initial.phone || "");
  const [email, setEmail] = useState(initial.email || "");
  const [note, setNote] = useState(initial.note || "");
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

  function handleTcChange(val) {
    setTc(val.replace(/\D/g, "").slice(0, 11));
  }
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
    // localStorage ile otomatik doldurma
    setLocalData({ from, to, people, segment, transfer, date, time, pnr, name, surname, tc, phone, email, note });
    setShowSummary(true);
  }

  const showVehicleCombos = segment && people;
  const showPNR = transfer === "VIP Havalimanı Transferi" || isAirportRelated(from) || isAirportRelated(to);

  function handleKvkkApprove() {
    setKvkkChecked(true);
  }
  function handlePayment() {
    setShowSummary(false);
    setShowThanks(true);
    setLocalData({});
  }

  // --- Mobil ve desktop için sadeleştirilmiş, düzenli arayüz ve spacing ---
  return (
    <section className="w-full max-w-3xl mx-auto rounded-3xl shadow-2xl bg-[#faf6ea] border border-[#bfa658] px-6 md:px-10 py-10 my-6">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-5 text-center font-quicksand">
        VIP Rezervasyon Formu
      </h1>
      <hr className="border-[#bfa658] border-2 mb-7" />
      <form onSubmit={handleSubmit} autoComplete="on" className="flex flex-col gap-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
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
          <div className="mb-3 text-[#8d7500]">
            <span className="font-semibold">Tahmini mesafe:</span> {km}   |  
            <span className="font-semibold">Tahmini süre:</span> {min}
            {distErr && <span className="text-red-400 ml-3">{distErr}</span>}
            <span className="text-[#bfa658] ml-3 text-sm">(Trafik yoğunluğu ve saat bilgisine göre değişebilir)</span>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Kişi Sayısı</label>
            <select className="input w-full bg-[#faf6ea] text-black border border-[#bfa658] rounded-xl"
              value={people} onChange={e => setPeople(e.target.value)}>
              <option value="">Seçiniz</option>
              {Array.from({ length: 24 }, (_, i) => i + 1).map(val => <option key={val} value={val}>{val}</option>)}
            </select>
            {fieldErrors.people && <div className="text-red-400 text-xs mt-1">{fieldErrors.people}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
            <select className="input w-full bg-[#faf6ea] text-black border border-[#bfa658] rounded-xl"
              value={segment} onChange={e => setSegment(e.target.value)}>
              <option value="">Seçiniz</option>
              {segmentOptions.map(opt => <option key={opt.key} value={opt.label}>{opt.label}</option>)}
            </select>
            {fieldErrors.segment && <div className="text-red-400 text-xs mt-1">{fieldErrors.segment}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Transfer Türü</label>
            <select className="input w-full bg-[#faf6ea] text-black border border-[#bfa658] rounded-xl"
              value={transfer} onChange={e => setTransfer(e.target.value)}>
              <option value="">Seçiniz</option>
              {allTransfers.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            {fieldErrors.transfer && <div className="text-red-400 text-xs mt-1">{fieldErrors.transfer}</div>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Tarih</label>
            <input
              name="date"
              type="date"
              className="input w-full bg-[#faf6ea] text-black border border-[#bfa658] rounded-xl"
              value={date}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              autoComplete="on"
              onClick={e => e.target.showPicker && e.target.showPicker()}
              placeholder="Seçiniz"
            />
            {fieldErrors.date && <div className="text-red-400 text-xs mt-1">{fieldErrors.date}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
            <select className="input w-full bg-[#faf6ea] text-black border border-[#bfa658] rounded-xl"
              value={time}
              onChange={e => setTime(e.target.value)}>
              <option value="">Seçiniz</option>
              {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
            </select>
            {fieldErrors.time && <div className="text-red-400 text-xs mt-1">{fieldErrors.time}</div>}
          </div>
        </div>
        {showPNR && (
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">PNR/Uçuş Kodu</label>
            <input
              name="pnr"
              type="text"
              className="input w-full bg-[#faf6ea] text-black border border-[#bfa658] rounded-xl"
              value={pnr}
              onChange={e => setPnr(e.target.value)}
              placeholder="Uçuş rezervasyon kodu (varsa)"
            />
          </div>
        )}
        <div className="mb-3">
          <label className="font-bold text-[#bfa658] mb-1 block">Ek Not</label>
          <textarea
            className="input w-full bg-[#faf6ea] text-black border border-[#bfa658] rounded-xl"
            rows={2}
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Eklemek istediğiniz bir not var mı?"
          />
        </div>
        <div className="mb-2">
          <label className="font-bold text-[#bfa658] mb-2 block text-lg">Ekstralar</label>
          <EkstralarAccordion
            selectedExtras={extras}
            setSelectedExtras={setExtras}
            extrasQty={extrasQty}
            setExtrasQty={setExtrasQty}
          />
        </div>
        {showVehicleCombos && (
          <div className="mb-2">
            <label className="font-bold text-[#bfa658] mb-2 block text-lg">Araç Seçimi</label>
            <div className="text-[#8d7500] text-base mb-1">
              Seçtiğiniz kişi sayısı ve araç segmentine göre uygun araçlar listelenmiştir.
            </div>
            {vehicleCombos.length > 0 ? (
              <div className="space-y-2">
                {vehicleCombos.map((combo, idx) => (
                  <div key={idx} className="border border-[#bfa658] rounded-xl p-2 flex flex-row items-center gap-2 bg-black/70">
                    {combo.map((v, i) =>
                      <span key={v.label + i} className="px-2 py-1 rounded bg-[#bfa65833] text-[#ffeec2] font-semibold text-sm">
                        {v.label} <span className="text-[#bfa658]">x{v.count}</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-red-400">Uygun araç bulunamadı.</div>
            )}
            <div className="mt-2 text-sm text-[#8d7500] opacity-90">
              Size en uygun ve kurumsal araçlardan biri rezerve edilecektir.
            </div>
          </div>
        )}
        <div className="flex items-center mt-6 mb-3">
          <input
            type="checkbox"
            id="kvkk"
            required
            checked={kvkkChecked}
            onChange={e => setKvkkChecked(e.target.checked)}
            className="accent-[#bfa658] w-5 h-5"
          />
          <label htmlFor="kvkk" className="ml-2 text-[#8d7500] text-sm">
            <button type="button"
              className="underline text-[#FFD700] hover:text-[#bfa658] cursor-pointer px-1"
              style={{ border: "none", background: "transparent" }}
              onClick={() => setShowKvkkPopup(true)}
            >
              KVKK Aydınlatma Metni ve Politikası
            </button>
            'nı okudum, onaylıyorum.
          </label>
        </div>
        {fieldErrors.kvkk && <div className="text-red-400 text-xs mt-1">{fieldErrors.kvkk}</div>}
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-3 px-10 rounded-xl text-xl shadow hover:scale-105 transition"
          >
            Rezervasyonu Tamamla
          </button>
        </div>
      </form>
      {/* POPUP'LAR (değişmedi) */}
      {/* ... KVKK, Özet, Teşekkür Popup'ları */}
    </section>
  );
}
// PATH SONU
