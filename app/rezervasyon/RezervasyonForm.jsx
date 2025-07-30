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
import calcTransferPrice from "../../utils/calcTransferPrice";

// Zaman slotları
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
  "Düğün vb Organizasyonlar",
  "Dron Transferi"
];

// Kullanıcı hafızasından öneri çek (ad/soyad/mail/telefon)
function getAutoSuggest(key) {
  if (typeof window === "undefined" || !window.localStorage) return [];
  const data = JSON.parse(window.localStorage.getItem("yt_autosuggest") || "{}");
  return data[key] || [];
}
function saveAutoSuggest(key, value) {
  if (typeof window === "undefined" || !window.localStorage || !value) return;
  let data = {};
  try { data = JSON.parse(window.localStorage.getItem("yt_autosuggest")) || {}; } catch {}
  data[key] = Array.from(new Set([...(data[key] || []), value])).slice(-5);
  window.localStorage.setItem("yt_autosuggest", JSON.stringify(data));
}

// LocalStorage ile son form verilerini hatırla
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

// Araç ve valiz kapasitesi metni
function getBestVehicleText(people, segment) {
  people = Number(people);
  let valiz = 0, txt = "";
  if (!people || !segment) return "";
  if (people <= 6) {
    valiz = segment === "Prime+" ? 3 : 2;
    if (segment === "Prime+") txt = "Maybach veya benzeri";
    else if (segment === "Lüks") txt = "Vito veya benzeri";
    else txt = "Transporter veya benzeri";
    return (
      <span>
        <span className="font-bold text-[#bfa658]">Araç Seçimi:</span> {txt} <span className="text-[#ffeec2]">(max 6 kişi, max {valiz} valiz)</span>
      </span>
    );
  }
  if (people >= 7 && people <= 8)
    return <span><span className="font-bold text-[#bfa658]">Araç Seçimi:</span> Mercedes Vito veya Transporter <span className="text-[#ffeec2]">(max 8 kişi, max 6 valiz)</span></span>;
  if (people >= 9 && people <= 12)
    return <span><span className="font-bold text-[#bfa658]">Araç Seçimi:</span> Mercedes Sprinter veya benzeri <span className="text-[#ffeec2]">(max 12 kişi, max 9 valiz)</span></span>;
  if (people > 12 && people <= 16)
    return <span><span className="font-bold text-[#bfa658]">Araç Seçimi:</span> Büyük Minibüs <span className="text-[#ffeec2]">(max {people} kişi, max {people - 3} valiz)</span></span>;
  return "";
}

export default function RezervasyonForm() {
  const initial = getFormCache();
  const [from, setFrom] = useState(initial.from);
  const [to, setTo] = useState(initial.to);
  const [km, setKm] = useState("");
  const [min, setMin] = useState("");
  const [distErr, setDistErr] = useState("");
  const [people, setPeople] = useState(initial.people);
  const [segment, setSegment] = useState(initial.segment);
  const [transfer, setTransfer] = useState(initial.transfer);
  const [date, setDate] = useState(initial.date);
  const [time, setTime] = useState(initial.time);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [tc, setTc] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pnr, setPnr] = useState(initial.pnr || "");
  const [note, setNote] = useState("");
  const [extras, setExtras] = useState([]);
  const [sigorta, setSigorta] = useState(true);
  const [showSigortaPopup, setShowSigortaPopup] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showKvkkPopup, setShowKvkkPopup] = useState(false);
  const [kvkkText, setKvkkText] = useState("");
  const [kvkkChecked, setKvkkChecked] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const dateInputRef = useRef();
  const [transferUcreti, setTransferUcreti] = useState(null);

  // KVKK popup içeriği yükle
  useEffect(() => {
    if (showKvkkPopup && !kvkkText) fetchKvkk().then(txt => setKvkkText(txt));
  }, [showKvkkPopup]);

  // MESAFE, SÜRE, FİYAT (+ trafik ek süre)
  useEffect(() => {
    setKm(""); setMin(""); setDistErr("");
    if (!from || !to || !date || !time) return;
    if (transfer === "Dron Transferi") {
      setKm("50"); setMin("60 dk"); setDistErr("");
      setTransferUcreti(calcTransferPrice(50, segment, people, time));
      return;
    }
    getDistance(from, to).then(res => {
      let extra = 0;
      if (["istanbul", "ankara", "izmir", "antalya"].some(s => [from, to].join(" ").toLowerCase().includes(s))) {
        const hour = Number(time.split(":")[0]);
        if ((hour >= 7 && hour <= 10) || (hour >= 16 && hour <= 21)) extra = 0.3;
      }
      let realMin = res.min && !isNaN(Number(res.min)) ? Math.round(Number(res.min) * (1 + extra)) : res.min;
      setKm(res.km);
      setMin(realMin ? `${realMin} dk` : res.min);
      setDistErr(res.error);
      if (res.km) setTransferUcreti(calcTransferPrice(res.km, segment, people, time));
      else setTransferUcreti(null);
    });
  }, [from, to, date, time, transfer, segment, people]);

  // Tarih inputunu her yere tıklayınca aç
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

  // Hafıza autocomplete + kaydet
  function handleAutoSuggestChange(setter, key, val) {
    setter(val);
    saveAutoSuggest(key, val);
  }
  const adOneri = getAutoSuggest("ad");
  const soyadOneri = getAutoSuggest("soyad");
  const telOneri = getAutoSuggest("telefon");
  const mailOneri = getAutoSuggest("mail");

  // Su ekstrası adedi
  const suAdedi = extras.filter(x => x === "su").length;

  // Sigorta ücreti
  const sigortaTutar = sigorta && transferUcreti ? Math.round(Number(transferUcreti) * 0.2) : 0;

  // Sigorta info
  const sigortaInfo = sigorta ? "Ekstra sigorta için ekstra ücret yansıtılır." : "";

  // Havalimanı kontrolü (PNR)
  const havalimaniSecildi = /havalimanı|airport/i.test(from) || /havalimanı|airport/i.test(to) || transfer === "VIP Havalimanı Transferi";

  // Form validasyon ve özet pop-up aç
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
    if (!/^\d{11}$/.test(tc) || /^(\d)\1+$/.test(tc)) err.tc = "Geçerli bir TC Kimlik No giriniz.";
    let cleanedPhone = phone.replace(/\D/g, "");
    if (!/^05\d{9}$/.test(cleanedPhone) || cleanedPhone.length !== 11) err.phone = "Geçerli bir 05xx ile başlayan telefon giriniz.";
    if (!/^\S+@\S+\.\S+$/.test(email)) err.email = "Geçerli e-posta adresi giriniz.";
    if (havalimaniSecildi && !pnr) err.pnr = "Havalimanı transferlerinde PNR/Uçuş Kodu zorunludur.";
    if (!kvkkChecked) err.kvkk = "KVKK onayı zorunludur.";
    setFieldErrors(err);
    if (Object.keys(err).length > 0) return;
    setShowSummary(true);
  }

  // Rezervasyon kaydı ve mail gönderimi (örnek backend)
  async function handlePaymentSuccess() {
    // Backend'e kayıt ve mail
    await fetch("/api/rezervasyon/kaydet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from, to, date, time, people, segment, transfer, name, surname, tc, phone, email, pnr, note,
        extras, sigorta, sigortaTutar, transferUcreti, km, min
      })
    });
    setShowThanks(true);
  }

  return (
    <section className="w-full max-w-3xl mx-auto rounded-3xl shadow-2xl bg-[#19160a] border border-[#bfa658] px-6 md:px-10 py-12 my-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-8 text-center font-quicksand">
        VIP Rezervasyon Formu
      </h1>
      <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-2">
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
            {distErr ? <span className="text-red-400 font-bold">{distErr}</span> : <span>
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
              autoComplete="off"
              style={{ cursor: "pointer" }}
            />
            {fieldErrors.date && <div className="text-red-400 text-xs mt-1">{fieldErrors.date}</div>}
          </div>
          <div>
                <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
            <select
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={time}
              onChange={e => setTime(e.target.value)}
            >
              <option value="">Seçiniz</option>
              {saatler.map(saat => (
                <option key={saat} value={saat}>{saat}</option>
              ))}
            </select>
            {fieldErrors.time && <div className="text-red-400 text-xs mt-1">{fieldErrors.time}</div>}
          </div>
        </div>
        {/* Kişi, segment, tür */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Kişi Sayısı</label>
            <select
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={people}
              onChange={e => setPeople(e.target.value)}
            >
              <option value="">Seçiniz</option>
              {Array.from({ length: 16 }, (_, i) => i + 1).map(val => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
            {fieldErrors.people && <div className="text-red-400 text-xs mt-1">{fieldErrors.people}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
            <select
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={segment}
              onChange={e => setSegment(e.target.value)}
            >
              <option value="">Seçiniz</option>
              {segmentOptions.map(opt => (
                <option key={opt.key} value={opt.label}>{opt.label}</option>
              ))}
            </select>
            {fieldErrors.segment && <div className="text-red-400 text-xs mt-1">{fieldErrors.segment}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Transfer Türü</label>
            <select
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={transfer}
              onChange={e => setTransfer(e.target.value)}
            >
              <option value="">Seçiniz</option>
              {allTransfers.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {fieldErrors.transfer && <div className="text-red-400 text-xs mt-1">{fieldErrors.transfer}</div>}
          </div>
        </div>

        {/* Araç önerisi */}
        {people && segment && (
          <div className="my-2 font-semibold text-[#ffeec2] text-base">
            {getBestVehicleText(Number(people), segment)}
          </div>
        )}

        {/* Kişisel Bilgi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Ad</label>
            <input
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={name}
              onChange={e => handleAutoSuggestChange(setName, "ad", e.target.value)}
              autoComplete="off"
              list="ad-onesi"
            />
            <datalist id="ad-onesi">
              {adOneri.map((ad, i) => <option key={i} value={ad} />)}
            </datalist>
            {fieldErrors.name && <div className="text-red-400 text-xs mt-1">{fieldErrors.name}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Soyad</label>
            <input
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={surname}
              onChange={e => handleAutoSuggestChange(setSurname, "soyad", e.target.value)}
              autoComplete="off"
              list="soyad-onesi"
            />
            <datalist id="soyad-onesi">
              {soyadOneri.map((ad, i) => <option key={i} value={ad} />)}
            </datalist>
            {fieldErrors.surname && <div className="text-red-400 text-xs mt-1">{fieldErrors.surname}</div>}
          </div>
        </div>
        {/* Diğer Kişisel Bilgi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">T.C. Kimlik No</label>
            <input
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={tc}
              onChange={e => setTc(e.target.value)}
              autoComplete="off"
            />
            {fieldErrors.tc && <div className="text-red-400 text-xs mt-1">{fieldErrors.tc}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Telefon</label>
            <input
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={phone}
              onChange={e => handleAutoSuggestChange(setPhone, "telefon", e.target.value.replace(/\D/g, "").slice(0, 11))}
              autoComplete="off"
              maxLength={11}
              list="telefon-onesi"
            />
            <datalist id="telefon-onesi">
              {telOneri.map((tel, i) => <option key={i} value={tel} />)}
            </datalist>
            {fieldErrors.phone && <div className="text-red-400 text-xs mt-1">{fieldErrors.phone}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">E-posta</label>
            <input
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={email}
              onChange={e => handleAutoSuggestChange(setEmail, "mail", e.target.value)}
              autoComplete="off"
              list="mail-onesi"
            />
            <datalist id="mail-onesi">
              {mailOneri.map((mail, i) => <option key={i} value={mail} />)}
            </datalist>
            {fieldErrors.email && <div className="text-red-400 text-xs mt-1">{fieldErrors.email}</div>}
          </div>
        </div>

        {/* PNR - sadece havalimanı varsa zorunlu */}
        {havalimaniSecildi && (
          <div className="mb-3">
            <label className="font-bold text-[#bfa658] mb-1 block">PNR/Uçuş Kodu</label>
            <input
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={pnr}
              onChange={e => setPnr(e.target.value)}
              placeholder="Uçuş rezervasyon kodu (zorunlu)"
              autoComplete="off"
            />
            {fieldErrors.pnr && <div className="text-red-400 text-xs mt-1">{fieldErrors.pnr}</div>}
          </div>
        )}

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
        <EkstralarAccordion value={extras} onChange={setExtras} people={people} segment={segment} />
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
            onClick={e => { e.preventDefault(); setShowSigortaPopup(true); }}
          >
            Bu seyahatim için ekstra YolcuTransferi Sigortası istiyorum.
          </label>
          <span className="ml-2 text-[#bfa658] text-xs font-semibold">{sigortaInfo}</span>
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
              onClick={e => { e.preventDefault(); setShowKvkkPopup(true); }}
              className="cursor-pointer underline text-[#ffeec2] hover:text-[#bfa658]"
              tabIndex={0}
              style={{ outline: "none" }}
            >
              KVKK, Mesafeli Satış ve Tüm Politikalar
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
        {fieldErrors.kvkk && (
          <div className="text-red-400 text-xs mt-1">{fieldErrors.kvkk}</div>
        )}
        {/* Rezervasyon Tamamla */}
        <button
          type="submit"
          className="w-full text-xl py-3 mt-2 rounded-lg font-bold bg-gradient-to-r from-[#bfa658] to-[#ffeec2] text-black shadow-lg hover:scale-105 transition-all"
          style={{ letterSpacing: ".02em" }}
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
          vehicleText: getBestVehicleText(Number(people), segment),
          onNext: () => {
            setShowSummary(false);
            setShowPayment(true);
          },
          onRemoveSigorta: () => setSigorta(false),
          people: Number(people) || 1,
        }}
      />
      <PaymentPopup
        open={showPayment}
        onClose={() => setShowPayment(false)}
        {...{
          transferUcreti: transferUcreti,
          sigortaTutar: sigortaTutar,
          extras,
          segment,
          people: Number(people) || 1,
          onNext: handlePaymentSuccess
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

