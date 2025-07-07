// PATH: /app/rezervasyon/RezervasyonForm.jsx

"use client";
import React, { useState, useEffect } from "react";
import EkstralarAccordion from "./EkstralarAccordion";
import { vehicles } from "../../data/vehicleList";
import { useRouter } from "next/navigation";

// --- Adres Otomatik Tamamlama ---
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

// --- Mesafe ve Süre ---
function useDistance(from, to, time) {
  const [data, setData] = useState({ km: "", min: "", error: "" });
  useEffect(() => {
    if (!from || !to) return;
    async function fetchDist() {
      setData({ km: "...", min: "...", error: "" });
      setTimeout(() => setData({
        km: Math.floor(25 + Math.random() * 180) + " km",
        min: (time && +time.split(":")[0] >= 7 && +time.split(":")[0] <= 10) ? "Yoğun Saat: 90 dk" : (30 + Math.floor(Math.random() * 60)) + " dk",
        error: ""
      }), 800);
    }
    fetchDist();
  }, [from, to, time]);
  return data;
}

// --- Araç Kombinasyonu Hesaplama ---
function bestVehicleCombos(people, segment) {
  if (!people || !segment) return [];
  let candidates = vehicles.filter(v => v.segment === segment);
  candidates = candidates.sort((a, b) => b.max - a.max);
  let combos = [];
  let best = candidates.find(v => v.max >= people);
  if (best) combos.push([{ ...best, count: 1 }]);
  for (let a = 0; a < candidates.length; ++a) {
    for (let b = a; b < candidates.length; ++b) {
      let total = candidates[a].max + candidates[b].max;
      if (total >= people && candidates[a].max < people) {
        combos.push([
          { ...candidates[a], count: 1 },
          { ...candidates[b], count: 1 }
        ]);
      }
    }
  }
  if (combos.length === 0 && candidates.length > 1) {
    for (let a = 0; a < candidates.length; ++a)
      for (let b = 0; b < candidates.length; ++b)
        for (let c = 0; c < candidates.length; ++c) {
          let sum = candidates[a].max + candidates[b].max + candidates[c].max;
          if (sum >= people) {
            combos.push([
              { ...candidates[a], count: 1 },
              { ...candidates[b], count: 1 },
              { ...candidates[c], count: 1 }
            ]);
          }
        }
  }
  if (combos.length === 0 && candidates.length > 0) {
    combos.push([{ ...candidates[0], count: Math.ceil(people / candidates[0].max) }]);
  }
  // Tekrarlı kombinasyonları kaldır
  const uniq = [];
  combos.forEach(arr => {
    let key = arr.map(i => i.label + i.count).sort().join(",");
    if (!uniq.some(u => u.map(i => i.label + i.count).sort().join(",") === key)) uniq.push(arr);
  });
  return uniq.slice(0, 4);
}

// --- PNR GÖSTER LOGIC ---
const airportKeywords = [
  "havalimanı", "istanbul havalimanı", "iga", "ist", "sabiha gökçen", "saw", "eskişehir havalimanı",
  "antalya havalimanı", "ankara esenboğa", "esenboğa", "milas bodrum", "izmir adnan", "trabzon havalimanı"
];
function isAirportRelated(val) {
  if (!val) return false;
  const t = val.toLocaleLowerCase("tr-TR");
  return airportKeywords.some(k => t.includes(k));
}

// --- KVKK POPUP GÜNCEL ---
function KvkkPopup({ open, onClose, onApprove }) {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch("/mesafeli-satis")
      .then(r => r.text())
      .then(txt => {
        let mainContent = txt.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] || "İçerik yüklenemedi.";
        mainContent = mainContent.replace(/<a([^>]+)href="([^"]+)"([^>]*)>/gi,
          '<a$1href="$2"$3 target="_blank" rel="noopener noreferrer" style="color:#FFD700;text-decoration:underline;">');
        setHtml(mainContent);
      })
      .catch(() => setHtml("İçerik alınamadı."))
      .finally(() => setLoading(false));
  }, [open]);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/80">
      <div className="relative bg-[#19160a] border-2 border-[#bfa658] rounded-2xl shadow-2xl w-[90vw] max-w-4xl max-h-[93vh] overflow-y-auto px-8 py-10">
        <button
          className="absolute top-5 right-5 bg-[#bfa658] text-black text-3xl font-bold rounded-full px-3 shadow hover:bg-yellow-400"
          onClick={onClose}
        >×</button>
        <div className="text-[#ffeec2] space-y-2" dangerouslySetInnerHTML={{ __html: loading ? "Yükleniyor..." : html }} />
        <div className="mt-6 border-t border-[#bfa65866] pt-4">
          <div className="text-sm text-[#FFD700] mb-3">
            Gizlilik, İptal &amp; İade, Çerez Politikası gibi tüm sözleşme ve formlara web sitemizden ulaşabilirsiniz.
          </div>
          <button
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-3 px-8 rounded-xl text-lg shadow hover:scale-105 transition w-full"
            onClick={() => { onApprove(); onClose(); }}
          >
            Okudum, Onaylıyorum
          </button>
        </div>
      </div>
    </div>
  );
}

// --- SİPARİŞ ÖZETİ POPUP (DEMO) ---
function SummaryPopup({ visible, onClose, form, extras, extrasQty, setExtras, setExtrasQty, combos, kmInfo, minInfo }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/85">
      <div className="relative bg-[#19160a] border-2 border-[#bfa658] rounded-2xl shadow-2xl w-[99vw] max-w-3xl max-h-[95vh] overflow-y-auto px-8 py-12">
        <button
          className="absolute top-4 right-4 bg-[#bfa658] text-black text-3xl font-bold rounded-full px-3 shadow hover:bg-yellow-400"
          onClick={onClose}
        >×</button>
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-[#bfa658] text-center font-quicksand">
          Rezervasyon Özeti
        </h2>
        <div className="flex flex-col gap-2 mb-5 text-[#ffeec2] text-base">
          <div><b>Nereden:</b> {form.from}</div>
          <div><b>Nereye:</b> {form.to}</div>
          <div><b>Mesafe:</b> {kmInfo}   <b>Süre:</b> {minInfo}</div>
          <div><b>Kişi:</b> {form.people}</div>
          <div><b>Tarih:</b> {form.date}</div>
          <div><b>Saat:</b> {form.time}</div>
          <div><b>Transfer:</b> {form.transfer}</div>
          <div><b>Segment:</b> {form.segment}</div>
          <div><b>Ad Soyad:</b> {form.name} {form.surname}</div>
          <div><b>T.C.:</b> {form.tc}</div>
          <div><b>Telefon:</b> {form.phone}</div>
          <div><b>E-posta:</b> {form.email}</div>
          {form.pnr && <div><b>PNR/Uçuş Kodu:</b> {form.pnr}</div>}
          <div><b>Ek Not:</b> {form.note}</div>
        </div>
        <div className="mt-7 flex flex-col items-center">
          <button
            className="w-full bg-[#bfa658] hover:bg-[#ffeec2] text-black font-bold py-3 px-8 rounded-xl shadow-lg transition-colors"
            onClick={() => { alert("Ödeme ekranına yönlendirilecektir (demo)"); onClose(); }}
          >
            Onayla ve Ödemeye Geç
          </button>
        </div>
      </div>
    </div>
  );
}

// --- ANA REZERVASYON FORMU ---
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
  const [showSummary, setShowSummary] = useState(false);
  const [showKvkkPopup, setShowKvkkPopup] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [kvkkChecked, setKvkkChecked] = useState(false);

  // Mesafe/süre
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
    setShowSummary(true);
  }

  // Araç seçimi kutusunu sadece kişi & segment seçiliyse göster
  const showVehicleCombos = segment && people;
  const showPNR = transfer === "VIP Havalimanı Transferi" || isAirportRelated(from) || isAirportRelated(to);

  function handleKvkkApprove() {
    setKvkkChecked(true);
  }

  return (
    <section className="w-full max-w-3xl mx-auto rounded-3xl shadow-2xl bg-[#19160a] border border-[#bfa658] px-6 md:px-10 py-12 my-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-8 text-center font-quicksand">
        VIP Rezervasyon Formu
      </h1>
      <form onSubmit={handleSubmit} autoComplete="on" className="flex flex-col gap-2">
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
        {from && to && (
          <div className="mb-3 text-[#ffeec2]">
            <span className="font-semibold">Tahmini mesafe:</span> {km}   |  
            <span className="font-semibold">Tahmini süre:</span> {min}
            {distErr && <span className="text-red-400 ml-3">{distErr}</span>}
            <span className="text-[#bfa658] ml-3 text-sm">(Trafik yoğunluğu ve saat bilgisine göre değişebilir)</span>
          </div>
        )}
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
              onClick={e => e.target.showPicker && e.target.showPicker()}
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
        <div className="flex items-center mt-6 mb-3">
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
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-12 rounded-xl text-xl shadow hover:scale-105 transition"
          >
            Rezervasyonu Tamamla
          </button>
        </div>
      </form>
      {/* KVKK POPUP */}
      <KvkkPopup open={showKvkkPopup} onClose={() => setShowKvkkPopup(false)} onApprove={handleKvkkApprove} />
      {/* REZERVASYON ÖZETİ */}
      <SummaryPopup
        visible={showSummary}
        onClose={() => setShowSummary(false)}
        form={{ from, to, people, segment, transfer, date, time, name, surname, tc, phone, email, pnr, note }}
        extras={extras}
        extrasQty={extrasQty}
        setExtras={setExtras}
        setExtrasQty={setExtrasQty}
        combos={vehicleCombos}
        kmInfo={km}
        minInfo={min}
      />
    </section>
  );
}
