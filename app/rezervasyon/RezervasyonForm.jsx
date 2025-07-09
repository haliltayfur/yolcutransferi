// PATH: app/rezervasyon/RezervasyonForm.jsx

"use client";
import React, { useState, useEffect, useRef } from "react";
import EkstralarAccordion from "../../data/EkstralarAccordion.jsx";
import { vehicles } from "../../data/vehicleList.js";
import { extrasListByCategory } from "../../data/extrasByCategory.js";
import { useRouter } from "next/navigation";

// ==== LOCAL STORAGE'DAN OTOMATİK DOLDURMA ====
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

// ==== ADRES AUTOCOMPLETE ====
function useAddressList() {
  const [addressList, setAddressList] = useState([]);
  useEffect(() => {
    async function fetchAll() {
      let [adresler, airports] = await Promise.all([
        fetch("/dumps/ililcemahalle.txt").then(r => r.text()).catch(() => ""),
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
      setSuggestions(addressList.filter(a => a.toLocaleLowerCase("tr-TR").includes(val)).slice(0, 14));
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

// ==== MESAFE & SÜRE ====
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

// ==== ARAÇ KOMBİNASYONLARI ====
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

// ==== PNR (Uçuş) KONTROL ====
const airportKeywords = [
  "havalimanı", "havaalanı", "airport", "iga", "ist", "saw", "esb", "adb", "dnz", "uçuş", "uçak"
];
function isAirportRelated(val) {
  if (!val) return false;
  const t = val.toLocaleLowerCase("tr-TR");
  return airportKeywords.some(k => t.includes(k));
}

// ==== FORM SEÇENEKLERİ ====
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

// ==== BAŞLANGIÇ STATE ====
export default function RezervasyonForm() {
  const router = useRouter();
  const vipDefaults = getSavedForm();
  const userProfile = getUserProfile();

  // Öncelik: VIP formdan -> userProfile'dan -> "" (kullanıcı değiştirebilir!)
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

  // ==== FORM DOĞRULAMA ====
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

  // === ÖNCEKİ VIP FORMUNU SİL (başarıyla tamamlanınca) ===
  function handlePayment() {
    setShowSummary(false);
    setShowThanks(true);
    if (typeof window !== "undefined") {
      localStorage.removeItem("vipForm");
    }
  }

  // === Mobil boyut algılama ===
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 900); }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // --- FORM HTML ---
  return (
    <section
      className="w-full mx-auto rounded-3xl shadow-2xl bg-[#19160a] border border-[#bfa658] px-3 sm:px-6 md:px-12 py-12 my-10"
      style={{
        maxWidth: isMobile ? 420 : "calc(54vw + 200px)", // %15 genişletildi
        minWidth: 300,
        transition: "max-width 0.4s",
      }}
    >
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center font-quicksand"
        style={{ letterSpacing: ".02em" }}>
        VIP Rezervasyon Formu
      </h1>
      {/* Altın çizgi */}
      <div style={{
        width: "100%",
        height: "4px",
        margin: "0 auto 1.2em auto",
        background: "linear-gradient(90deg, #FFD700 40%, #bfa658 60%)",
        borderRadius: "2px",
        maxWidth: 420,
        marginBottom: "1.2em",
      }} />
      <form onSubmit={handleSubmit} autoComplete="on" className="flex flex-col gap-2">
        {/* NEREDEN / NEREYE */}
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

        {/* KİŞİ/SEGMENT/TRANSFER */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-2`}>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Kişi Sayısı</label>
            <select className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={people} onChange={e => setPeople(e.target.value)}>
              <option value="">Seçiniz</option>
              {Array.from({ length: 24 }, (_, i) => i + 1).map(val => <option key={val} value={val}>{val}</option>)}
            </select>
            {fieldErrors.people && <div className="text-red-400 text-xs mt-1">{fieldErrors.people}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
            <select className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={segment} onChange={e => setSegment(e.target.value)}>
              <option value="">Seçiniz</option>
              {segmentOptions.map(opt => <option key={opt.key} value={opt.label}>{opt.label}</option>)}
            </select>
            {fieldErrors.segment && <div className="text-red-400 text-xs mt-1">{fieldErrors.segment}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Transfer Türü</label>
            <select className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={transfer} onChange={e => setTransfer(e.target.value)}>
              <option value="">Seçiniz</option>
              {allTransfers.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            {fieldErrors.transfer && <div className="text-red-400 text-xs mt-1">{fieldErrors.transfer}</div>}
          </div>
        </div>

        {/* TARİH / SAAT */}
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
              style={{ cursor: "pointer" }}
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
                style={{ cursor: "pointer" }}
              >
                <option value="">{date ? "Saat seçin" : "Önce tarih seçin"}</option>
                {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
              </select>
              {/* herhangi bir yere tıklanınca açılması için label'a tıklama */}
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

        {/* PNR (Uçuş kodu) */}
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

        {/* Ad / Soyad / TC / Telefon / Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Ad</label>
            <input
              name="name"
              type="text"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={name}
              onChange={e => setName(e.target.value)}
              autoComplete="given-name"
            />
            {fieldErrors.name && <div className="text-red-400 text-xs mt-1">{fieldErrors.name}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Soyad</label>
            <input
              name="surname"
              type="text"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={surname}
              onChange={e => setSurname(e.target.value)}
              autoComplete="family-name"
            />
            {fieldErrors.surname && <div className="text-red-400 text-xs mt-1">{fieldErrors.surname}</div>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">T.C. Kimlik No</label>
            <input
              name="tc"
              type="text"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              maxLength={11}
              pattern="[0-9]*"
              value={tc}
              onChange={e => handleTcChange(e.target.value)}
              autoComplete="off"
            />
            {fieldErrors.tc && <div className="text-red-400 text-xs mt-1">{fieldErrors.tc}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Telefon</label>
            <input
              name="phone"
              type="text"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              maxLength={11}
              pattern="[0-9]*"
              value={phone}
              onChange={e => handlePhoneChange(e.target.value)}
              autoComplete="tel"
            />
            {fieldErrors.phone && <div className="text-red-400 text-xs mt-1">{fieldErrors.phone}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">E-posta</label>
            <input
              name="email"
              type="email"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="ornek@email.com"
            />
            {fieldErrors.email && <div className="text-red-400 text-xs mt-1">{fieldErrors.email}</div>}
          </div>
        </div>
        {/* NOT */}
        <div className="mb-2">
          <label className="font-bold text-[#bfa658] mb-1 block">Ek Not</label>
          <textarea
            className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            rows={2}
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Eklemek istediğiniz bir not var mı?"
          />
        </div>
        {/* EKSTRALAR */}
        <div className="mb-2">
          <label className="font-bold text-[#bfa658] mb-2 block text-lg">Ekstralar</label>
          <EkstralarAccordion
            selectedExtras={extras}
            setSelectedExtras={setExtras}
            extrasQty={extrasQty}
            setExtrasQty={setExtrasQty}
          />
        </div>
        {/* ARAÇ SEÇİMİ */}
        {showVehicleCombos && (
          <div className="mb-2">
            <label className="font-bold text-[#bfa658] mb-2 block text-lg">Araç Seçimi</label>
            <div className="text-[#ffeec2] text-base mb-1">
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
            <div className="mt-2 text-sm text-[#ffeec2] opacity-90">
              Size en uygun ve kurumsal araçlardan biri rezerve edilecektir.
            </div>
          </div>
        )}
        {/* KVKK */}
        <div className="flex items-center mt-5 mb-2">
          <input
            type="checkbox"
            id="kvkk"
            required
            checked={kvkkChecked}
            onChange={e => setKvkkChecked(e.target.checked)}
            className="accent-[#bfa658] w-5 h-5"
          />
          <label htmlFor="kvkk" className="ml-2 text-[#ffeec2] text-sm">
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
        {/* BUTON */}
        <div className="flex justify-end mt-7">
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-12 rounded-xl text-xl shadow hover:scale-105 transition"
            style={{ marginBottom: "0.5cm" }}
          >
            Rezervasyonu Tamamla
          </button>
        </div>
      </form>
      {/* POPUP'LAR */}
      {/* Burada Summary, KVKK, Tesekkur Popup kodlarını senin mevcut kodundan alabilirsin */}
    </section>
  );
}

// PATH: app/rezervasyon/RezervasyonForm.jsx
