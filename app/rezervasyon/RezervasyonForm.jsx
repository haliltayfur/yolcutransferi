// PATH: /app/rezervasyon/RezervasyonForm.jsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import EkstralarAccordion from "./EkstralarAccordion";
import { vehicles } from "../../data/vehicleList";
import { useRouter } from "next/navigation";

// Autocomplete listesi (örnek)
const addressSuggestions = [
  "Ümraniye", "Bağcılar", "Kadıköy", "Maltepe", "Bakırköy",
  "Atatürk Havalimanı", "Sabiha Gökçen Havalimanı", "Esenler",
  "Ankara Esenboğa Havalimanı", "Antalya Havalimanı"
];
// Basit autocomplete componenti
function AdresAutoComplete({ value, onChange, placeholder }) {
  const [list, setList] = useState([]);
  function handleInput(e) {
    const val = e.target.value;
    onChange(val);
    if (!val) setList([]);
    else setList(addressSuggestions.filter(addr =>
      addr.toLocaleLowerCase("tr-TR").includes(val.toLocaleLowerCase("tr-TR"))
    ));
  }
  return (
    <div className="relative w-full">
      <input
        type="text"
        className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
        value={value}
        onChange={handleInput}
        placeholder={placeholder}
        autoComplete="off"
      />
      {list.length > 0 &&
        <ul className="absolute left-0 right-0 z-20 bg-[#19160a] border border-[#bfa658] rounded-xl mt-1 max-h-40 overflow-auto">
          {list.map(addr => (
            <li key={addr}
              className="px-3 py-1 cursor-pointer hover:bg-[#bfa658] hover:text-black"
              onClick={() => { onChange(addr); setList([]); }}>
              {addr}
            </li>
          ))}
        </ul>}
    </div>
  );
}
const KDV_ORAN = 0.20;
const saatler = [];
for (let h = 0; h < 24; ++h)
  for (let m of [0, 15, 30, 45]) saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
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
// Havalimanı anahtar kelime kontrolü
const airportKeywords = [
  "havalimanı", "istanbul havalimanı", "iga", "ist", "sabiha gökçen", "saw", "eskişehir havalimanı",
  "antalya havalimanı", "ankara esenboğa", "esenboğa", "milas bodrum", "izmir adnan", "trabzon havalimanı"
];
function isAirportRelated(text) {
  if (!text) return false;
  const t = text.toLocaleLowerCase("tr-TR");
  return airportKeywords.some(keyword => t.includes(keyword));
}
// KVKK Popup
function KvkkPopup({ open, onClose }) {
  const [mainHtml, setMainHtml] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch("/kvkk")
      .then(r => r.text())
      .then(html => {
        const match = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
        setMainHtml(match ? match[1] : "İçerik yüklenemedi.");
      })
      .catch(() => setMainHtml("KVKK içeriği alınamadı."))
      .finally(() => setLoading(false));
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="absolute top-0 right-0 m-5">
        <button onClick={onClose}
          className="bg-[#19160a] border border-[#bfa658] text-[#ffeec2] font-bold rounded-full text-lg px-5 py-2 shadow-xl hover:bg-[#bfa658] hover:text-black transition">
          Kapat
        </button>
      </div>
      <div className="bg-[#1b1b1b] border-2 border-[#bfa658] rounded-3xl p-8 max-w-3xl w-full shadow-2xl overflow-y-auto max-h-[92vh]">
        {loading
          ? <div className="text-center text-[#ffeec2] py-8">Yükleniyor...</div>
          : <div dangerouslySetInnerHTML={{ __html: mainHtml }} />}
      </div>
    </div>
  );
}
export default function RezervasyonForm() {
  const router = useRouter();
  // STATE
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
  const [fieldErrors, setFieldErrors] = useState({});
  const [kvkkChecked, setKvkkChecked] = useState(false);
  const [showKvkkPopup, setShowKvkkPopup] = useState(false);

  // Validasyon
  const isValidTC = t => /^[1-9]\d{9}[02468]$/.test(t) && t.length === 11;
  const isValidPhone = t => /^05\d{9}$/.test(t) && t.length === 11;
  const isValidEmail = t => /^\S+@\S+\.\S+$/.test(t);
  function handleTcChange(val) { setTc(val.replace(/\D/g, "").slice(0, 11)); }
  function handlePhoneChange(val) {
    let num = val.replace(/\D/g, "");
    if (num.length > 0 && num[0] !== "0") num = "0" + num;
    setPhone(num.slice(0, 11));
  }

  // Araç filtre mantığı
  function filterVehicles(segment, people, transfer) {
    if (!segment || !people) return [];
    const p = parseInt(people, 10);
    let maxKisi = 0;
    if (p <= 4) maxKisi = 6;
    else if (p <= 7) maxKisi = 10;
    else if (p <= 9) maxKisi = 12;
    else if (p <= 12) maxKisi = 15;
    else maxKisi = 24; // En üst
    return vehicles.filter(
      v =>
        v.segment === segment &&
        v.max >= p &&
        v.max <= maxKisi &&
        (!transfer || v.transferTypes.includes(transfer))
    );
  }
  const filteredVehicles = filterVehicles(segment, people, transfer);

  function handleSubmit(e) {
    e.preventDefault();
    const err = {};
    if (!from) err.from = "Lütfen kalkış noktası giriniz.";
    if (!to) err.to = "Lütfen varış noktası giriniz.";
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
  const showPNR =
    transfer === "VIP Havalimanı Transferi" ||
    isAirportRelated(from) ||
    isAirportRelated(to);

  return (
    <section className="w-full max-w-4xl mx-auto rounded-3xl shadow-2xl bg-[#19160a] border border-[#bfa658] px-6 md:px-12 py-14 my-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-8 text-center font-quicksand">
        VIP Rezervasyon Formu
      </h1>
      <form onSubmit={handleSubmit} autoComplete="on">
        {/* Kişi/segment/transfer türü yan yana */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Kişi Sayısı</label>
            <select name="people" className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={people}
              onChange={e => setPeople(e.target.value)}>
              <option value="">Seçiniz</option>
              {Array.from({ length: 24 }, (_, i) => i + 1).map(val =>
                <option key={val} value={val}>{val}</option>
              )}
            </select>
            {fieldErrors.people && <div className="text-red-400 text-xs mt-1">{fieldErrors.people}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
            <select name="segment" className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={segment}
              onChange={e => setSegment(e.target.value)}>
              <option value="">Seçiniz</option>
              {segmentOptions.map(opt =>
                <option key={opt.key} value={opt.label}>{opt.label}</option>
              )}
            </select>
            {fieldErrors.segment && <div className="text-red-400 text-xs mt-1">{fieldErrors.segment}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Transfer Türü</label>
            <select name="transfer" className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={transfer}
              onChange={e => setTransfer(e.target.value)}>
              <option value="">Seçiniz</option>
              {allTransfers.map(opt =>
                <option key={opt} value={opt}>{opt}</option>
              )}
            </select>
            {fieldErrors.transfer && <div className="text-red-400 text-xs mt-1">{fieldErrors.transfer}</div>}
          </div>
        </div>
        {/* Araçlar kutusu */}
        <div className="mb-6">
          <label className="font-bold text-[#bfa658] mb-2 block text-lg">Araçlar</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {segment && people && filteredVehicles.length > 0 ? filteredVehicles.map((v) => (
              <div key={v.value} className="border-2 border-[#bfa658] rounded-xl p-3 bg-black/70 flex flex-col items-center text-[#ffeec2]">
                <div className="font-bold text-base">{v.label}</div>
                <div className="text-xs text-[#bfa658] mb-1">{v.segment}</div>
                <div className="text-xs">{v.max} Kişi</div>
              </div>
            )) : (
              <div className="text-gray-400 col-span-3">Lütfen segment ve kişi sayısını seçiniz. Uygun araçlar burada listelenecektir.</div>
            )}
          </div>
          <div className="mt-2 text-sm text-[#ffeec2] opacity-90">
            Seçtiğiniz segment ve kişi sayısına uygun araçlardan biri, size en uygun ve kurumsal şekilde rezerve edilecektir.
          </div>
        </div>
        {/* Diğer alanlar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereden?</label>
            <AdresAutoComplete
              value={from}
              onChange={setFrom}
              placeholder="Nereden? İl / İlçe / Mahalle / Havalimanı"
            />
            {fieldErrors.from && <div className="text-red-400 text-xs mt-1">{fieldErrors.from}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
            <AdresAutoComplete
              value={to}
              onChange={setTo}
              placeholder="Nereye? İl / İlçe / Mahalle / Havalimanı"
            />
            {fieldErrors.to && <div className="text-red-400 text-xs mt-1">{fieldErrors.to}</div>}
          </div>
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
              onFocus={e => e.target.showPicker && e.target.showPicker()}
            />
            {fieldErrors.date && <div className="text-red-400 text-xs mt-1">{fieldErrors.date}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
            <select name="time" className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={time}
              onChange={e => setTime(e.target.value)}>
              <option value="">Seçiniz</option>
              {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
            </select>
            {fieldErrors.time && <div className="text-red-400 text-xs mt-1">{fieldErrors.time}</div>}
          </div>
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
        </div>
        {/* Ek Not */}
        <div className="mt-5">
          <label className="font-bold text-[#bfa658] mb-1 block">Ek Not</label>
          <textarea
            className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            rows={2}
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Eklemek istediğiniz bir not var mı?"
          />
        </div>
        {/* Ekstralar */}
        <div className="mt-5">
          <label className="font-bold text-[#bfa658] mb-2 block text-lg">Ekstralar</label>
          <EkstralarAccordion
            selectedExtras={extras}
            setSelectedExtras={setExtras}
            extrasQty={extrasQty}
            setExtrasQty={setExtrasQty}
          />
        </div>
        {/* KVKK Onay */}
        <div className="flex items-center mt-7">
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
              className="underline text-[#FFD700] hover:text-[#bfa658] cursor-pointer outline-none"
              style={{ padding: 0, border: "none", background: "transparent" }}
              onClick={() => setShowKvkkPopup(true)}>
              KVKK Aydınlatma Metni ve Politikası
            </button>{" "}
            'nı okudum, onaylıyorum.
          </label>
        </div>
        {fieldErrors.kvkk && <div className="text-red-400 text-xs mt-1">{fieldErrors.kvkk}</div>}
        {/* Buton */}
        <div className="flex justify-end mt-7">
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-12 rounded-xl text-xl shadow hover:scale-105 transition"
          >
            Rezervasyonu Tamamla
          </button>
        </div>
      </form>
      {/* KVKK POPUP */}
      <KvkkPopup open={showKvkkPopup} onClose={() => setShowKvkkPopup(false)} />
      {/* REZERVASYON ÖZETİ (yeni eklenmeli!) */}
      {/* {showSummary && <SummaryPopup onClose={() => setShowSummary(false)} />} */}
    </section>
  );
}
// PATH SONU
