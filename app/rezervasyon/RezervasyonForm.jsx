"use client";
import React, { useState, useEffect, useRef } from "react";
import AutocompleteInput from "../../components/AutocompleteInput";
import fetchKvkk from "../../utils/fetchKvkk";
import getDistance from "../../utils/getDistance";
import EkstralarAccordion from "../../components/EkstralarAccordion";
import SummaryPopup from "../../components/SummaryPopup";
import PaymentPopup from "../../components/PaymentPopup";
import TesekkurPopup from "../../components/TesekkurPopup";
import KvkkPopup from "../../components/KvkkPopup";
import SigortaPopup from "../../components/SigortaPopup";
import { vehicles } from "../../data/vehicleList";

const saatler = [];
for (let h = 0; h < 24; ++h) for (let m of [0, 15, 30, 45]) saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);

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
  "Düğün vb Organizasyonlar",
  "Dron Transferi"
];

export default function RezervasyonForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [km, setKm] = useState("");
  const [min, setMin] = useState("");
  const [distErr, setDistErr] = useState("");
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
  const [sigorta, setSigorta] = useState(false);
  const [showSigortaPopup, setShowSigortaPopup] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showKvkkPopup, setShowKvkkPopup] = useState(false);
  const [kvkkText, setKvkkText] = useState("");
  const [kvkkChecked, setKvkkChecked] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const dateInputRef = useRef();

  // --- Dinamik KVKK ---
  useEffect(() => {
    if (showKvkkPopup && !kvkkText) {
      fetchKvkk().then(setKvkkText);
    }
  }, [showKvkkPopup]);

  // --- MESAFE OTOMATİK ÇEK ---
  useEffect(() => {
    setKm(""); setMin(""); setDistErr("");
    if (!from || !to || !date || !time) return;
    if (transfer === "Dron Transferi") {
      setKm("50"); setMin("60 dk"); setDistErr(""); // Dron sabit
      return;
    }
    getDistance(from, to).then(res => {
      setKm(res.km);
      setMin(res.min);
      setDistErr(res.error);
    });
  }, [from, to, date, time, transfer]);

  // Araç önerisi
  function getBestVehicleText(people, segment) {
    people = Number(people);
    if (!people || !segment) return "";
    if (transfer === "Dron Transferi") {
      return "Sizin için Dron Transferi seçildi! Tuzla - Tuzla Terminal arası 1 saat, 5000 USD.";
    }
    if (people >= 9) {
      if (segment === "Prime+") return "Maybach veya Mercedes Sprinter önerilir (10+ kişi).";
      return "Mercedes Vito veya Transporter önerilir (9-12 kişi).";
    }
    let candidates = vehicles.filter(v => v.segment === segment && v.max >= people);
    candidates = candidates.sort((a, b) => a.max - b.max);
    let best = candidates[0];
    if (!best) return "";
    return `${best.label} veya benzeri (${best.max} kişi kapasiteli) aracımızı sizin için hazırlıyoruz.`;
  }
  const vehicleText = getBestVehicleText(Number(people), segment);

  // Sigorta tutarı
  const kmSayisi = km ? parseFloat(km.replace(/[^\d.]/g, "")) : null;
  const transferUcreti = (from && to && segment && people && kmSayisi)
    ? (transfer === "Dron Transferi" ? 5000 * 32 : Math.max(Math.round(kmSayisi * 30 * (segment === "Prime+" ? 2.5 : segment === "Lüks" ? 1.7 : 1) * (people > 2 ? 1 + (people - 2) * 0.12 : 1)), 1000))
    : null;
  const sigortaTutar = sigorta && transferUcreti
    ? Math.round(transferUcreti * 0.4 * (1 + Math.max(Number(people) - 1, 0) * 0.1))
    : 0;

  // Validasyonlar
  const isValidTC = t => /^[1-9]\d{9}[02468]$/.test(t) && t.length === 11;
  const isValidPhone = t => /^05\d{9}$/.test(t) && t.length === 11;
  const isValidEmail = t => /^\S+@\S+\.\S+$/.test(t);

  // Submit
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

  // Tarih kutusunun her yerine tıklayınca aç
  useEffect(() => {
    if (!dateInputRef.current) return;
    const el = dateInputRef.current;
    el.addEventListener("click", () => el.showPicker && el.showPicker());
    return () => el.removeEventListener("click", () => el.showPicker && el.showPicker());
  }, []);

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
            <AutocompleteInput value={from} onChange={setFrom} placeholder="Nereden? İlçe/Mahalle/Havalimanı" name="from" />
            {fieldErrors.from && <div className="text-red-400 text-xs mt-1">{fieldErrors.from}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
            <AutocompleteInput value={to} onChange={setTo} placeholder="Nereye? İlçe/Mahalle/Havalimanı" name="to" />
            {fieldErrors.to && <div className="text-red-400 text-xs mt-1">{fieldErrors.to}</div>}
          </div>
        </div>
        {(from && to && date && time) && (
          <div className="mb-3 text-[#ffeec2]">
            {distErr ? <span className="text-red-400 font-bold">Mesafe/süre hesaplanamadı</span> : <span>
              <span className="font-semibold">Tahmini mesafe:</span> {km ? `${km} km` : "..."}   |  
              <span className="font-semibold">Tahmini süre:</span> {min || "..."}
              <span className="text-[#bfa658] ml-3 text-sm">(Trafik yoğunluğu ve saat bilgisine göre değişebilir)</span>
            </span>}
          </div>
        )}
        {/* Tarih Saat */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Tarih</label>
            <input
              name="date"
              type="date"
              ref={dateInputRef}
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={date}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              autoComplete="on"
              style={{ cursor: "pointer" }}
            />
            {fieldErrors.date && <div className="text-red-400 text-xs mt-1">{fieldErrors.date}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
            <select className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={time} onChange={e => setTime(e.target.value)}>
              <option value="">Seçiniz</option>
              {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
            </select>
            {fieldErrors.time && <div className="text-red-400 text-xs mt-1">{fieldErrors.time}</div>}
          </div>
        </div>
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
        {/* Araç önerisi */}
        {vehicleText && (
          <div className="my-2 font-semibold text-[#ffeec2] text-base">{vehicleText}</div>
        )}
        {/* Kişisel Bilgi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Ad</label>
            <input className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={name} onChange={e => setName(e.target.value)} autoComplete="given-name" />
            {fieldErrors.name && <div className="text-red-400 text-xs mt-1">{fieldErrors.name}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Soyad</label>
            <input className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={surname} onChange={e => setSurname(e.target.value)} autoComplete="family-name" />
            {fieldErrors.surname && <div className="text-red-400 text-xs mt-1">{fieldErrors.surname}</div>}
          </div>
        </div>
        {/* Diğer Kişisel Bilgi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">T.C. Kimlik No</label>
            <input className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={tc} onChange={e => setTc(e.target.value)} autoComplete="off" />
            {fieldErrors.tc && <div className="text-red-400 text-xs mt-1">{fieldErrors.tc}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Telefon</label>
            <input className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={phone} onChange={e => setPhone(e.target.value)} autoComplete="tel" />
            {fieldErrors.phone && <div className="text-red-400 text-xs mt-1">{fieldErrors.phone}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">E-posta</label>
            <input className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
            {fieldErrors.email && <div className="text-red-400 text-xs mt-1">{fieldErrors.email}</div>}
          </div>
        </div>
                {/* PNR */}
          <div className="mb-3">
            <label className="font-bold text-[#bfa658] mb-1 block">PNR/Uçuş Kodu</label>
            <input
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={pnr}
              onChange={e => setPnr(e.target.value)}
              placeholder="Uçuş rezervasyon kodu (varsa)"
              autoComplete="off"
            />
          </div>
          {/* Not */}
          <div className="mb-3">
            <label className="font-bold text-[#bfa658] mb-1 block">Ek Not</label>
            <textarea
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl min-h-[60px]"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Eklemek istediğiniz bir not var mı?"
            />
          </div>
          {/* Ekstralar */}
          <EkstralarAccordion value={extras} onChange={setExtras} onlyCheck={true} />
          {/* Sigorta kutusu */}
          <div className="flex items-center mt-3 mb-2">
            <input
              type="checkbox"
              checked={sigorta}
              onChange={() => setSigorta(v => !v)}
              id="sigorta"
              className="mr-2"
            />
            <label
              htmlFor="sigorta"
              className="cursor-pointer text-[#ffeec2] underline hover:text-[#bfa658]"
              onClick={e => {
                e.preventDefault();
                setShowSigortaPopup(true);
              }}
            >
              Bu seyahatim için ekstra YolcuTransferi Sigortası istiyorum.
            </label>
            {sigorta && (
              <span className="ml-2 text-[#bfa658] text-xs font-semibold">
                (Seçiminize göre ekstra {sigortaTutar.toLocaleString()} TL eklenir.)
              </span>
            )}
            <SigortaPopup
              open={showSigortaPopup}
              onClose={() => setShowSigortaPopup(false)}
            />
          </div>
          {/* KVKK ve onay */}
          <div className="flex items-center mt-3 mb-4">
            <input
              type="checkbox"
              checked={kvkkChecked}
              onChange={e => setKvkkChecked(e.target.checked)}
              className="mr-2"
              id="kvkkonay"
            />
            <span>
              <span
                onClick={e => {
                  e.preventDefault();
                  setShowKvkkPopup(true);
                }}
                className="cursor-pointer underline text-[#ffeec2] hover:text-[#bfa658]"
                tabIndex={0}
                style={{ outline: "none" }}
              >
                KVKK, Satış ve Diğer Politikaları
              </span>{" "}
              okudum, onaylıyorum.
            </span>
            <KvkkPopup
              open={showKvkkPopup}
              onClose={() => setShowKvkkPopup(false)}
              text={kvkkText}
              onConfirm={() => setKvkkChecked(true)}
            />
          </div>
          {/* Hata */}
          {fieldErrors.kvkk && (
            <div className="text-red-400 text-xs mt-1">{fieldErrors.kvkk}</div>
          )}
          {/* Rezervasyon Tamamla */}
          <button
            type="submit"
            className="btn btn-primary w-full text-xl py-3 mt-2"
          >
            Rezervasyonu Tamamla
          </button>
        </form>
        {/* POPUP COMPONENTS */}
        <SummaryPopup
          open={showSummary}
          onClose={() => setShowSummary(false)}
          {...{
            from,
            to,
            date,
            time,
            people,
            segment,
            transfer,
            name,
            surname,
            tc,
            phone,
            email,
            pnr,
            note,
            extras,
            sigorta,
            sigortaTutar,
            transferUcreti,
            vehicleText,
            onNext: () => {
              setShowSummary(false);
              setShowPayment(true);
            },
          }}
        />
        <PaymentPopup
          open={showPayment}
          onClose={() => setShowPayment(false)}
          {...{
            transferUcreti,
            sigortaTutar,
            extras,
            onNext: () => {
              setShowPayment(false);
              setShowThanks(true);
            },
          }}
        />
        <TesekkurPopup
          open={showThanks}
          onClose={() => setShowThanks(false)}
          {...{ name, email }}
        />
      </section>
    );
}
