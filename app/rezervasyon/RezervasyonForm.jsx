"use client";
import React, { useState, useEffect } from "react";
import EkstralarAccordion from "../../data/EkstralarAccordion.jsx";
import { vehicles } from "../../data/vehicleList.js";
import { extrasListByCategory } from "../../data/extrasByCategory.js";
import { useRouter } from "next/navigation";

// Transfer ücretini hesaplayan fonksiyon (Buradan başka dosyaya taşıyabiliriz)
function hesaplaTransferUcreti({ km, segment, people }) {
  if (!km || isNaN(km)) return 0;
  let base = 40; // km başı
  let segmentF = segment === "Prime+" ? 2.2 : segment === "Lüks" ? 1.5 : 1;
  let kisiF = people > 2 ? 1 + (people - 2) * 0.1 : 1;
  let min = 1000; // Minimum ücret
  return Math.max(Math.round(km * base * segmentF * kisiF), min);
}

// ==== Adres AutoComplete (il/ilçe/havalimanı) ====
function useFullLocationList() {
  const [addressList, setAddressList] = useState([]);
  useEffect(() => {
    let mounted = true;
    Promise.all([
      fetch("/dumps/airports.json").then(r => r.json()).catch(() => []),
      fetch("https://raw.githubusercontent.com/haliltayfur/yolcutransferi/main/public/dumps/ililce.txt").then(r => r.text()).catch(() => "")
    ]).then(([airport, ililce]) => {
      const airports = (airport || []).map(a => a.name);
      const ililceList = ililce.split("\n").map(x => x.trim()).filter(Boolean);
      const all = Array.from(new Set([...airports, ...ililceList]));
      if (mounted) setAddressList(all);
    });
    return () => { mounted = false; }
  }, []);
  return addressList;
}
function AutoCompleteInput({ value, onChange, placeholder }) {
  const addressList = useFullLocationList();
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
        onBlur={() => setTimeout(() => setShowList(false), 140)}
        autoComplete="off"
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

// === Mesafe & Süre (Gerçek API) ===
function useDistance(from, to) {
  const [data, setData] = useState({ km: "", min: "", error: "" });
  useEffect(() => {
    if (!from || !to) {
      setData({ km: "", min: "", error: "" });
      return;
    }
    let ignore = false;
    setData({ km: "Yükleniyor...", min: "Yükleniyor...", error: "" });
    fetch(`/api/distance?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)
      .then(res => res.json())
      .then(res => {
        if (ignore) return;
        if (res.km && res.min) setData({ km: res.km, min: res.min, error: "" });
        else setData({ km: "", min: "", error: res.error || "Mesafe hesaplanamadı." });
      })
      .catch(() => { if (!ignore) setData({ km: "", min: "", error: "Bağlantı hatası." }); });
    return () => { ignore = true; };
  }, [from, to]);
  return data;
}

// === KVKK Popup (Kısa) ===
function KvkkPopup({ open, onClose, onApprove }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/80">
      <div className="relative bg-[#19160a] border-2 border-[#bfa658] rounded-2xl w-full max-w-2xl max-h-[93vh] overflow-y-auto px-8 py-10">
        <button className="absolute top-4 right-4 bg-[#bfa658] text-black font-bold rounded-xl px-5 py-2 text-lg"
          onClick={onClose}>Kapat</button>
        <div className="text-[#ffeec2]">
          <b>KVKK Aydınlatma Metni ve Politikası</b><br />
          Kişisel verileriniz yalnızca transfer hizmetlerinin sunulması amacıyla işlenecektir. Tüm detaylı politikamıza ana menüden ulaşabilirsiniz.<br />
          <button
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-3 px-8 rounded-xl text-lg shadow hover:scale-105 transition mt-4"
            onClick={() => { onApprove(); onClose(); }}>Okudum, Onaylıyorum</button>
        </div>
      </div>
    </div>
  );
}

// === Sigorta Bilgi ===
function SigortaBilgi() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-[#242012] border border-[#bfa658] rounded-lg px-4 py-2 shadow max-w-xs z-[99] text-xs text-[#ffeec2]">
      <b>YolcuTransferi Sigortası</b>: Transfer süresince <b>kaza, vefat, sakatlık, sağlık, bagaj kaybı</b> gibi tüm risklerde<br />
      özel sigorta koruması sağlar. Her yolcu için geçerli. <br />
      7/24 destek ve tazminat. Fiyat, transfer ücreti ve yolcu sayısına göre otomatik hesaplanır.
    </div>
  );
}

// === Araç Kombinasyonu ===
function getBestVehicleText(people, segment) {
  if (!people || !segment) return "";
  people = Number(people);
  let candidates = vehicles.filter(v => v.segment === segment && v.max >= people);
  if (segment === "Prime+" && people <= 2)
    candidates = candidates.filter(v => v.label.toLowerCase().includes("maybach") || v.label.toLowerCase().includes("s-class") || v.label.toLowerCase().includes("bmw 7"));
  if (segment === "Lüks" && people <= 3)
    candidates = candidates.filter(v => v.label.toLowerCase().includes("e-class") || v.label.toLowerCase().includes("vito"));
  candidates = candidates.sort((a, b) => a.max - b.max);
  let best = candidates[0];
  if (!best) return "";
  return `Sizin seçiminize en uygun araç: ${best.label} veya benzeri (${best.max} kişi kapasiteli) aracımızı sizin için hazırlıyoruz.`;
}

const segmentOptions = [
  { key: "Ekonomik", label: "Ekonomik" },
  { key: "Lüks", label: "Lüks" },
  { key: "Prime+", label: "Prime+" }
];
const allTransfers = [
  "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Kurumsal Etkinlik", "Özel Etkinlik", "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
];
const saatler = [];
for (let h = 0; h < 24; ++h)
  for (let m of [0, 15, 30, 45]) saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);

function isAirportRelated(val) {
  if (!val) return false;
  const t = val.toLocaleLowerCase("tr-TR");
  return ["havalimanı", "istanbul havalimanı", "iga", "ist", "sabiha gökçen", "saw", "eskişehir havalimanı",
    "antalya havalimanı", "ankara esenboğa", "esenboğa", "milas bodrum", "izmir adnan", "trabzon havalimanı"]
    .some(k => t.includes(k));
}

export default function RezervasyonForm() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [people, setPeople] = useState("");
  const [segment, setSegment] = useState("");
  const [transfer, setTransfer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [tc, setTc] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pnr, setPnr] = useState("");
  const [note, setNote] = useState("");
  const [extras, setExtras] = useState([]);
  const [extrasQty, setExtrasQty] = useState({});
  const [sigorta, setSigorta] = useState(false);
  const [sigortaHover, setSigortaHover] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showKvkkPopup, setShowKvkkPopup] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [kvkkChecked, setKvkkChecked] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  // --- Dinamik Transfer Ücreti Hesaplama ---
  const { km, min, error: distErr } = useDistance(from, to);
  const kmSayisi = typeof km === "string" ? parseFloat(km.replace(/[^\d.]/g, "")) : Number(km);
  const transferUcreti = (from && to && segment && people && !isNaN(kmSayisi) && kmSayisi > 0)
    ? hesaplaTransferUcreti({ km: kmSayisi, segment, people: Number(people) })
    : 0;

  const sigortaTutar = sigorta
    ? Math.round(transferUcreti * 0.4 * (1 + Math.max(Number(people) - 1, 0) * 0.1))
    : 0;

  // --- Validasyon ---
  const isValidTC = t => /^[1-9]\d{9}[02468]$/.test(t) && t.length === 11;
  const isValidPhone = t => /^05\d{9}$/.test(t) && t.length === 11;
  const isValidEmail = t => /^\S+@\S+\.\S+$/.test(t);

  function handleTcChange(val) { setTc(val.replace(/\D/g, "").slice(0, 11)); }
  function handlePhoneChange(val) {
    let num = val.replace(/\D/g, "");
    if (num.length > 0 && num[0] !== "0") num = "0" + num;
    setPhone(num.slice(0, 11));
  }

  const vehicleText = getBestVehicleText(Number(people), segment);
  const showVehicleCombos = segment && people;
  const showPNR = transfer === "VIP Havalimanı Transferi" || isAirportRelated(from) || isAirportRelated(to);

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

  function handleKvkkApprove() { setKvkkChecked(true); }
  function handlePayment() { setShowSummary(false); setShowPayment(true); }
  async function handlePaymentComplete() {
    setShowPayment(false); setShowThanks(true);
    // DB ve Mail'e gönder:
    try {
      await fetch("/api/rezervasyon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from, to, people, segment, transfer, date, time, name, surname, tc, phone, email, pnr, note, extras, extrasQty, sigorta, transferUcreti
        }),
      });
    } catch (e) { }
  }

  return (
    <section className="w-full max-w-3xl mx-auto rounded-3xl shadow-2xl bg-[#19160a] border border-[#bfa658] px-6 md:px-10 py-12 my-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-8 text-center font-quicksand">
        VIP Rezervasyon Formu
      </h1>
      <form onSubmit={handleSubmit} autoComplete="on" className="flex flex-col gap-2">
        {/* Nereden Nereye */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
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
        {(from && to) && (
          <div className="mb-3 text-[#ffeec2]">
            <span className="font-semibold">Tahmini mesafe:</span> {km}   |  
            <span className="font-semibold">Tahmini süre:</span> {min}
            {distErr && <span className="text-red-400 ml-3">{distErr}</span>}
            <span className="text-[#bfa658] ml-3 text-sm">(Trafik yoğunluğu ve saat bilgisine göre değişebilir)</span>
          </div>
        )}
        {/* Kişi, segment, tür */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
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
        {/* Tarih/saat */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Tarih</label>
            <input
              name="date"
              type="date"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={date}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              autoComplete="on"
            />
            {fieldErrors.date && <div className="text-red-400 text-xs mt-1">{fieldErrors.date}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
            <select className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={time}
              onChange={e => setTime(e.target.value)}>
              <option value="">Seçiniz</option>
              {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
            </select>
            {fieldErrors.time && <div className="text-red-400 text-xs mt-1">{fieldErrors.time}</div>}
          </div>
        </div>
        {/* Kişisel bilgiler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
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
        {/* TC/telefon/email */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
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
        <div className="mb-3">
          <label className="font-bold text-[#bfa658] mb-1 block">Ek Not</label>
          <textarea
            className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
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
            <label className="font-bold text-[#bfa658] mb-2 block text-lg">Araç</label>
            <div className="text-[#ffeec2] text-base mb-1">
              {vehicleText || <span className="text-red-400">Uygun araç bulunamadı.</span>}
            </div>
          </div>
        )}
        {/* --- EKSTRA SİGORTA --- */}
        <div className="flex items-center mt-3 mb-3 relative">
          <input
            type="checkbox"
            id="sigorta"
            checked={sigorta}
            onChange={e => setSigorta(e.target.checked)}
            className="accent-[#bfa658] w-5 h-5"
          />
          <label htmlFor="sigorta" className="ml-2 text-[#ffeec2] text-sm flex items-center relative">
            <span
              className="underline text-[#FFD700] hover:text-[#bfa658] cursor-pointer px-1"
              style={{ border: "none", background: "transparent" }}
              onMouseEnter={() => setSigortaHover(true)}
              onMouseLeave={() => setSigortaHover(false)}
            >Bu seyahatim için ekstra YolcuTransferi Sigortası istiyorum.</span>
            {sigortaHover && <SigortaBilgi />}
            {sigorta && (
              <span className="ml-2 text-[#FFD700] text-xs font-bold">
                ({sigortaTutar > 0 ? `Fiyat: ${sigortaTutar.toLocaleString()}₺` : "Fiyat hesaplanıyor..."})
              </span>
            )}
          </label>
        </div>
        {/* KVKK */}
        <div className="flex items-center mb-3">
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
        {/* Tutar */}
        <div className="mb-4 flex items-center justify-end gap-6 text-xl font-bold">
          <span className="text-[#ffeec2]">Transfer Ücreti:</span>
          <span className="text-[#bfa658]">{transferUcreti ? `${transferUcreti.toLocaleString()} ₺` : "Hesaplanıyor..."}</span>
        </div>
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-12 rounded-xl text-xl shadow hover:scale-105 transition"
          >
            Rezervasyonu Tamamla
          </button>
        </div>
      </form>
      <KvkkPopup open={showKvkkPopup} onClose={() => setShowKvkkPopup(false)} onApprove={handleKvkkApprove} />
      {/* Özet ve ödeme popup’ları, mevcut state’e uygun şekilde eklemen yeterli */}
    </section>
  );
}
