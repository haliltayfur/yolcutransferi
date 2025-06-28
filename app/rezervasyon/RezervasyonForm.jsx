// PATH: /app/rezervasyon/RezervasyonForm.jsx

"use client";
import React, { useState, useRef } from "react";
import EkstralarAccordion from "./EkstralarAccordion";
import AdresAutoComplete from "./AdresAutoComplete";
import { vehicles } from "../../data/vehicleList";
import { useRouter } from "next/navigation";

// KVKK Popup Helper (İletişim sayfasıyla aynı mantık!)
function KvkkPopup({ open, onClose }) {
  const [mainHtml, setMainHtml] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
      <div className="bg-[#19160a] rounded-2xl max-w-2xl w-full p-7 overflow-y-auto max-h-[82vh] border-2 border-[#bfa658] shadow-2xl relative">
        <button
          className="absolute top-3 right-6 text-[#ffeec2] font-bold text-xl px-3 py-1 rounded-full bg-[#bfa658]/20 hover:bg-[#bfa658]/40 transition"
          onClick={onClose}
        >
          Kapat
        </button>
        <div className="mt-2 space-y-3 text-[#ecd9aa]">
          {loading
            ? <div className="text-center text-[#ffeec2] py-8">Yükleniyor...</div>
            : <div dangerouslySetInnerHTML={{ __html: mainHtml }} />}
        </div>
      </div>
    </div>
  );
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
const KDV_ORAN = 0.20;
const saatler = [];
for (let h = 0; h < 24; ++h)
  for (let m of [0, 15, 30, 45]) saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);

// Havalimanı keyword'leri (isteğe göre güncelleyebilirsin)
const airportKeywords = [
  "havalimanı", "istanbul havalimanı", "iga", "ist", "sabiha gökçen", "saw", "eskişehir havalimanı",
  "antalya havalimanı", "ankara esenboğa", "esenboğa", "milas bodrum", "izmir adnan", "trabzon havalimanı"
];
function isAirportRelated(text) {
  if (!text) return false;
  const t = text.toLocaleLowerCase("tr-TR");
  return airportKeywords.some(keyword => t.includes(keyword));
}

// Araç filtreleme mantığı
function getFilteredVehicles(people, segment) {
  if (!people || !segment) return [];
  let min = 1, max = 6;
  if (people >= 1 && people <= 4) max = 6;
  else if (people >= 5 && people <= 7) max = 10;
  else if (people >= 8 && people <= 9) { min = 7; max = 12; }
  else if (people >= 10) { min = 10; max = 15; }
  return vehicles.filter(v =>
    v.segment === segment &&
    v.max >= people &&
    v.max >= min && v.max <= max
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
  const [kvkkPopup, setKvkkPopup] = useState(false);

  // Takvim için input-ref ile label'ı tıklayınca takvim aç
  const dateInputRef = useRef(null);

  // Validasyon fonksiyonları
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

  function handleSubmit(e) {
    e.preventDefault();
    // Hata kontrol
    const err = {};
    if (!from) err.from = "Lütfen kalkış noktası giriniz.";
    if (!to) err.to = "Lütfen varış noktası giriniz.";
    if (!segment) err.segment = "Lütfen segment seçiniz.";
    if (!people) err.people = "Kişi sayısı seçiniz.";
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

  // PNR gösterim mantığı
  const showPNR =
    transfer === "VIP Havalimanı Transferi" ||
    isAirportRelated(from) ||
    isAirportRelated(to);

  // Araç filtrele
  const filteredVehicles = getFilteredVehicles(Number(people), segment);

  // --- REZERVASYON ÖZETİ POPUP --- (Aynı mantık, yukarıdaki ile aynı şekilde kullanılacak)

  function SummaryPopup({ onClose }) {
    const basePrice = 4000;
    const allExtras = require("../../data/extrasByCategory").extrasListByCategory.flatMap(cat => cat.items);
    const selectedExtras = allExtras.filter(e => extras.includes(e.key));
    const extrasTotal = selectedExtras.reduce((sum, e) => sum + (e.price * (extrasQty[e.key] || 1)), 0);
    const araToplam = basePrice + extrasTotal;
    const kdv = araToplam * KDV_ORAN;
    const toplam = araToplam + kdv;

    // Artır/azalt/sil
    function changeQty(key, dir) {
      setExtrasQty(q => ({
        ...q,
        [key]: Math.max(1, (q[key] || 1) + dir)
      }));
    }
    function removeExtra(key) {
      setExtras(es => es.filter(k => k !== key));
      setExtrasQty(q => {
        const { [key]: _, ...rest } = q;
        return rest;
      });
    }

    function handlePayment() {
      const params = new URLSearchParams({
        from, to, people, segment, transfer, date, time, name, surname, tc, phone, email, pnr, note,
        extras: extras.join(","),
        extrasQty: JSON.stringify(extrasQty),
        kvkk: "true",
      }).toString();
      router.push(`/odeme?${params}`);
    }

    // Segmentteki araçlar
    const segmentVehicles = filteredVehicles;

    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
        <div className="bg-[#19160a] rounded-3xl border border-[#bfa658] max-w-3xl w-full shadow-2xl p-8 md:p-12 overflow-y-auto max-h-[92vh] relative">
          <button onClick={onClose} className="absolute top-3 right-5 text-3xl font-bold text-[#ffeec2] hover:text-yellow-400">×</button>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-[#bfa658] text-center font-quicksand">
            Rezervasyon Özeti
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-[#ffeec2] text-base">
            <div>
              <div><b>Ad Soyad:</b> {name} {surname}</div>
              <div><b>T.C.:</b> {tc}</div>
              <div><b>Telefon:</b> {phone}</div>
              <div><b>E-posta:</b> {email}</div>
              <div><b>Kişi:</b> {people}</div>
              <div><b>Tarih:</b> {date}</div>
              <div><b>Saat:</b> {time}</div>
            </div>
            <div>
              <div><b>Transfer:</b> {transfer || "-"}</div>
              <div><b>Segment:</b> {segment}</div>
              <div><b>Nereden:</b> {from}</div>
              <div><b>Nereye:</b> {to}</div>
              {pnr && <div><b>PNR/Uçuş Kodu:</b> {pnr}</div>}
            </div>
          </div>
          <div className="my-4 p-3 rounded-xl border-2 border-[#bfa658] bg-[#19160a]">
            <div className="mb-2 font-semibold text-[#bfa658]">Bu segment ve kişi sayısına uygun araçlar:</div>
            <ul className="space-y-1 text-base">
              {segmentVehicles.length > 0 ? segmentVehicles.map((v) => (
                <li key={v.value} className="text-[#ffeec2]">{v.label} <span className="text-xs text-[#bfa658]">({v.max} kişi)</span></li>
              )) : <li className="text-red-400">Uygun araç bulunamadı.</li>}
            </ul>
            <div className="mt-2 text-sm text-[#ffeec2] opacity-90">
              Seçtiğiniz segment ve kişi sayısına uygun araçlardan biri size en uygun şekilde rezerve edilecektir.
            </div>
          </div>
          {/* Ekstralar Tablosu */}
          <div className="mb-5">
            <b className="block mb-2 text-[#bfa658] text-lg">Ekstralar:</b>
            {selectedExtras.length === 0 && <span className="text-gray-400">Ekstra yok</span>}
            {selectedExtras.length > 0 &&
              <table className="w-full text-base mb-3">
                <thead>
                  <tr className="text-[#ffeec2] border-b border-[#bfa658]/40">
                    <th className="text-left py-1 pl-1">Ürün</th>
                    <th className="text-center w-20">Adet</th>
                    <th className="text-right w-28">Birim</th>
                    <th className="text-right w-28">Toplam</th>
                    <th className="text-center w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {selectedExtras.map(extra => (
                    <tr key={extra.key} className="border-b border-[#bfa658]/10">
                      <td className="py-1 pl-1">{extra.label}</td>
                      <td className="text-center">
                        <div className="flex items-center gap-1 justify-center">
                          <button type="button" className="px-2 text-lg font-bold text-gold" onClick={() => changeQty(extra.key, -1)}>-</button>
                          <span className="w-7 text-center">{extrasQty[extra.key] || 1}</span>
                          <button type="button" className="px-2 text-lg font-bold text-gold" onClick={() => changeQty(extra.key, +1)}>+</button>
                        </div>
                      </td>
                      <td className="text-right">{extra.price.toLocaleString()}₺</td>
                      <td className="text-right">{((extrasQty[extra.key] || 1) * extra.price).toLocaleString()}₺</td>
                      <td className="text-center">
                        <button type="button" onClick={() => removeExtra(extra.key)} className="text-red-400 font-bold hover:scale-125 transition-transform">🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
          </div>
          <div className="w-full flex flex-col items-end gap-1 mt-2 text-base">
            <div>Transfer Bedeli: <b>{basePrice.toLocaleString()} ₺</b></div>
            <div>Ekstralar: <b>{extrasTotal.toLocaleString()} ₺</b></div>
            <div>KDV: <b>{kdv.toLocaleString(undefined, { maximumFractionDigits: 2 })} ₺</b></div>
            <div className="text-xl text-[#bfa658] font-bold">Toplam: {toplam.toLocaleString()} ₺</div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4 mt-9">
            <button
              className="w-full md:w-auto bg-[#bfa658] hover:bg-[#ffeec2] text-black font-bold py-3 px-8 rounded-xl shadow-lg transition-colors"
              onClick={handlePayment}
            >
              Onayla ve Ödemeye Geç
            </button>
            <button
              className="w-full md:w-auto border border-[#bfa658] hover:bg-[#3b2c10] text-[#bfa658] font-semibold py-3 px-8 rounded-xl shadow-lg transition-colors"
              onClick={onClose}
              type="button"
            >
              Vazgeç
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- ANA FORM ---
  return (
    <section className="w-full max-w-4xl mx-auto rounded-3xl shadow-2xl bg-[#19160a] border border-[#bfa658] px-6 md:px-12 py-14 my-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-8 text-center font-quicksand">
        VIP Rezervasyon Formu
      </h1>
      <form
        onSubmit={handleSubmit}
        autoComplete="on"
        className="grid grid-cols-1 gap-5"
      >
        {/* Yan yana grid: kişi sayısı, segment, transfer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-1">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Kişi Sayısı</label>
            <select name="people" className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={people}
              onChange={e => setPeople(Number(e.target.value) || "")}>
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

        {/* Nereden/Nereye */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

        {/* Araçlar kutusu -- ekstraların üstünde */}
        <div>
          <label className="font-bold text-[#bfa658] mb-2 block text-lg">Araçlar</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {(people && segment) ? (
              filteredVehicles.length > 0 ? filteredVehicles.map((v) => (
                <div key={v.value} className="border-2 border-[#bfa658] rounded-xl p-3 bg-black/70 flex flex-col items-center text-[#ffeec2]">
                  <div className="font-bold text-base">{v.label}</div>
                  <div className="text-xs text-[#bfa658] mb-1">{v.segment}</div>
                  <div className="text-xs">{v.max} Kişi</div>
                </div>
              )) : (
                <div className="text-red-400 col-span-3">Seçtiğiniz segment ve kişi sayısına uygun araç bulunamadı.</div>
              )
            ) : (
              <div className="text-gray-400 col-span-3">Lütfen kişi sayısı ve segment seçiniz.</div>
            )}
          </div>
          <div className="mt-2 text-sm text-[#ffeec2] opacity-90">
            Seçtiğiniz segment ve kişi sayısına uygun araçlardan biri size en uygun şekilde rezerve edilecektir.
          </div>
        </div>

        {/* Tarih/Saat */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block"
              onClick={() => dateInputRef.current?.focus()} style={{ cursor: "pointer" }}>Tarih</label>
            <input
              ref={dateInputRef}
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
            <select name="time" className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={time}
              onChange={e => setTime(e.target.value)}>
              <option value="">Seçiniz</option>
              {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
            </select>
            {fieldErrors.time && <div className="text-red-400 text-xs mt-1">{fieldErrors.time}</div>}
          </div>
        </div>
        
        {/* Diğer bilgiler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {/* Sadece havalimanı transferi varsa PNR göster */}
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

        {/* Ek Not */}
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Ek Not</label>
          <textarea
            className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            rows={2}
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Eklemek istediğiniz bir not var mı?"
          />
        </div>

        {/* Ekstralar (Araçların ALTINDA) */}
        <div>
          <label className="font-bold text-[#bfa658] mb-2 block text-lg">Ekstralar</label>
          <EkstralarAccordion
            selectedExtras={extras}
            setSelectedExtras={setExtras}
            extrasQty={extrasQty}
            setExtrasQty={setExtrasQty}
          />
        </div>

        {/* KVKK Onay Kutusu */}
        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            id="kvkk"
            required
            checked={kvkkChecked}
            onChange={e => setKvkkChecked(e.target.checked)}
            className="accent-[#bfa658] w-5 h-5"
          />
          <label htmlFor="kvkk" className="ml-2 text-[#ffeec2] text-sm select-none">
            <button
              type="button"
              onClick={() => setKvkkPopup(true)}
              className="underline text-[#FFD700] hover:text-[#bfa658] cursor-pointer outline-none"
              style={{ padding: 0, border: "none", background: "transparent" }}
            >
              KVKK Aydınlatma Metni ve Politikası
            </button>
            'nı okudum, onaylıyorum.
          </label>
        </div>
        {fieldErrors.kvkk && <div className="text-red-400 text-xs mt-1">{fieldErrors.kvkk}</div>}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-12 rounded-xl text-xl shadow hover:scale-105 transition"
          >
            Rezervasyonu Tamamla
          </button>
        </div>
      </form>
      {showSummary && <SummaryPopup onClose={() => setShowSummary(false)} />}
      <KvkkPopup open={kvkkPopup} onClose={() => setKvkkPopup(false)} />
    </section>
  );
}
