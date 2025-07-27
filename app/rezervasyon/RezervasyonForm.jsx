// PATH: app/rezervasyon/RezervasyonForm.jsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLoadScript } from "@react-google-maps/api";
import EkstralarAccordion from "../../data/EkstralarAccordion.jsx";
import { vehicles } from "../../data/vehicleList.js";
import { extrasListByCategory } from "../../data/extrasByCategory.js";
import SummaryPopup from "../../components/SummaryPopup.jsx";
import PaymentPopup from "../../components/PaymentPopup.jsx";
import TesekkurPopup from "../../components/TesekkurPopup.jsx";
import KvkkPopup from "../../components/KvkkPopup.jsx";

const libraries = ["places"];

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

// 00:00, 00:15, 00:30... gibi saatler:
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

// Araç öneri açıklama:
function getBestVehicleText(people, segment) {
  if (!people || !segment) return "";
  people = Number(people);
  let candidates = vehicles.filter(v => v.segment === segment && v.max >= people);
  candidates = candidates.sort((a, b) => a.max - b.max);
  let best = candidates[0];
  if (!best) return "";
  return `Araç Seçimi: Sizin seçiminize en uygun araç: ${best.label} veya benzeri (Kapasitesi: ${best.max} Kişi, ${best.luggage || 4} Valiz) aracımızla en özel hizmeti sunarız.`;
}

function hesaplaTransferUcreti({ km, segment, people }) {
  if (!km || isNaN(km)) return null;
  let base = 38; // km başı
  let segmentF = segment === "Prime+" ? 2.4 : segment === "Lüks" ? 1.6 : 1;
  let kisiF = people > 2 ? 1 + (people - 2) * 0.1 : 1;
  let min = 1000;
  return Math.max(Math.round(km * base * segmentF * kisiF), min);
}

// KVKK ve Politikalar Popup
function KvkkFullPopup({ open, onClose, onApprove }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/80 px-1">
      <div className="relative bg-[#19160a] border-2 border-[#bfa658] rounded-2xl w-full max-w-4xl max-h-[98vh] overflow-y-auto px-8 py-10" style={{width: "98vw"}}>
        <button className="absolute top-4 right-4 bg-[#bfa658] text-black font-bold rounded-xl px-5 py-2 text-lg"
          onClick={onClose}>Kapat</button>
        <div className="text-[#ffeec2] text-base max-w-2xl mx-auto" style={{lineHeight: "1.65"}}>
          {/* Bu metni https://yolcutransferi.com/mesafeli-satis sayfasının göbeğinden birebir çekip yapıştırabilirsin */}
          <b>Mesafeli Satış Sözleşmesi, KVKK ve Tüm Politika Metinleri</b><br />
          {/* --- Senin orijinal KVKK/satış/gizlilik vb metnin tamamı burada olmalı! --- */}
          <p>... (metin tamamı buraya, kopyala-yapıştır yapabilirsin) ...</p>
          <div className="mt-8 flex flex-col items-center">
            <button
              className="w-full max-w-xs bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-3 px-8 rounded-xl text-lg shadow hover:scale-105 transition"
              onClick={() => { onApprove(); onClose(); }}
            >
              Tümünü Okudum ve Onayladım
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sigorta Tooltip Açıklama (daha geniş!)
function SigortaBilgi({ visible }) {
  if (!visible) return null;
  return (
    <div className="absolute left-1/2 -translate-x-1/2 mt-3 bg-[#242012] border border-[#bfa658] rounded-lg px-8 py-4 shadow max-w-xl z-[99] text-base text-[#ffeec2]" style={{minWidth:"340px"}}>
      <b>YolcuTransferi Sigortası</b><br />
      Transfer süresince <b>kaza, vefat, sakatlık, sağlık giderleri, bagaj kaybı</b> gibi tüm risklere karşı ek koruma sağlar. Her yolcu için geçerli olup, 7/24 destek ve yüksek tazminat içerir.<br />
      Teminatlar: Ferdi kaza, ölüm, sakatlık, acil sağlık, bagaj, gecikme ve kayıp, sorumluluk.<br />
      Tutar yolcu ve transfer ücretine göre hesaplanır. Detaylar için müşteri hizmetlerimizi arayabilirsiniz.
    </div>
  );
}

// --- ANA BİLEŞEN ---
export default function RezervasyonForm() {
  const router = useRouter();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries
  });

  // INPUT/STATE
  const fromRef = useRef(null);
  const toRef = useRef(null);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [km, setKm] = useState(null);
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
  const [extrasQty, setExtrasQty] = useState({});
  const [sigorta, setSigorta] = useState(false);
  const [sigortaHover, setSigortaHover] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showKvkkPopup, setShowKvkkPopup] = useState(false);
  const [kvkkChecked, setKvkkChecked] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Google Autocomplete bağla
  useEffect(() => {
    if (isLoaded && fromRef.current && toRef.current) {
      const fromAutocomplete = new google.maps.places.Autocomplete(fromRef.current, { componentRestrictions: { country: "tr" } });
      fromAutocomplete.addListener("place_changed", () => {
        const place = fromAutocomplete.getPlace();
        setFrom(place.formatted_address || fromRef.current.value);
      });
      const toAutocomplete = new google.maps.places.Autocomplete(toRef.current, { componentRestrictions: { country: "tr" } });
      toAutocomplete.addListener("place_changed", () => {
        const place = toAutocomplete.getPlace();
        setTo(place.formatted_address || toRef.current.value);
      });
    }
  }, [isLoaded]);

  // MESAFE VE SÜRE AL (her değişimde)
  useEffect(() => {
    setKm(null); setMin(""); setDistErr("");
    if (!isLoaded || !from || !to) return;
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [from],
        destinations: [to],
        travelMode: "DRIVING"
      },
      (res, status) => {
        if (status === "OK" && res.rows[0].elements[0].status === "OK") {
          setKm(res.rows[0].elements[0].distance.value / 1000);
          setMin(res.rows[0].elements[0].duration.text);
          setDistErr("");
        } else {
          setKm(null); setMin(""); setDistErr("Transfer mesafe/süresi hesaplanamadı, yetkililerimiz size teklif sunacaktır.");
        }
      }
    );
  }, [from, to, isLoaded]);

  // Hesaplamalar
  const kmSayisi = km ? parseFloat(km) : null;
  const transferUcreti = (from && to && segment && people && kmSayisi)
    ? hesaplaTransferUcreti({ km: kmSayisi, segment, people: Number(people) })
    : null;
  const sigortaTutar = sigorta && transferUcreti
    ? Math.round(transferUcreti * 0.4 * (1 + Math.max(Number(people) - 1, 0) * 0.1))
    : 0;
  const vehicleText = getBestVehicleText(Number(people), segment);

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
    if (!kvkkChecked) err.kvkk = "KVKK ve politikalar onayı zorunludur.";
    setFieldErrors(err);
    if (Object.keys(err).length > 0) return;
    setShowSummary(true);
  }

  // KVKK Onay Popup
  function handleKvkkApprove() { setKvkkChecked(true); }

  // Ödeme ve DB’ye gönderim (dummy)
  async function handlePaymentComplete() {
    setShowPayment(false); setShowThanks(true);
    try {
      await fetch("/api/rezervasyon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from, to, people, segment, transfer, date, time, name, surname, tc, phone, email, pnr, note,
          extras, extrasQty, sigorta, transferUcreti, sigortaTutar, kvkkChecked
        }),
      });
    } catch (e) {}
  }

  const showPNR = transfer === "VIP Havalimanı Transferi" || isAirportRelated(from) || isAirportRelated(to);

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
            <input
              ref={fromRef}
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              placeholder="Nereden? İlçe/Mahalle/Havalimanı"
              autoComplete="off"
              onBlur={e => setFrom(e.target.value)}
              defaultValue={from}
            />
            {fieldErrors.from && <div className="text-red-400 text-xs mt-1">{fieldErrors.from}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
            <input
              ref={toRef}
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              placeholder="Nereye? İlçe/Mahalle/Havalimanı"
              autoComplete="off"
              onBlur={e => setTo(e.target.value)}
              defaultValue={to}
            />
            {fieldErrors.to && <div className="text-red-400 text-xs mt-1">{fieldErrors.to}</div>}
          </div>
        </div>

        {/* Mesafe ve süre açıklaması */}
        {(from && to) && (
          <div className="mb-3 text-[#ffeec2]">
            {distErr ? (
              <span className="text-red-400">{distErr}</span>
            ) : (
              km && min && (
                <span>
                  Toplam mesafe yaklaşık <b>{km.toFixed(1)} km</b>, seyahat süreniz ise <b>{min}</b> olacaktır.
                  (Trafik ve hava şartlarına göre değişebilir.)
                </span>
              )
            )}
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
              onChange={e => setTc(e.target.value.replace(/\D/g, "").slice(0, 11))}
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
              onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
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

        {/* Ekstralar */}
        <div className="mb-2">
          <label className="font-bold text-[#bfa658] mb-2 block text-lg">Ekstralar</label>
          <EkstralarAccordion
            selectedExtras={extras}
            setSelectedExtras={setExtras}
            extrasQty={extrasQty}
            setExtrasQty={setExtrasQty}
          />
        </div>

        {/* Araç Seçimi */}
        {vehicleText && (
          <div className="mb-2">
            <label className="font-bold text-[#bfa658] mb-2 block text-lg">Araç</label>
            <div className="text-[#ffeec2] text-base mb-1">
              {vehicleText}
            </div>
          </div>
        )}

        {/* Sigorta */}
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
            <SigortaBilgi visible={sigortaHover} />
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
              KVKK, Satış ve Diğer Politikaları
            </button>
            {' '}okudum, onaylıyorum.
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

      {/* --- POPUP'lar --- */}
      <KvkkFullPopup
        open={showKvkkPopup}
        onClose={() => setShowKvkkPopup(false)}
        onApprove={handleKvkkApprove}
      />

      <SummaryPopup
        visible={showSummary}
        onClose={() => setShowSummary(false)}
        form={{
          from, to, people, segment, transfer, date, time, name, surname, tc, phone, email, pnr, note
        }}
        extras={extras}
        extrasQty={extrasQty}
        setExtras={setExtras}
        setExtrasQty={setExtrasQty}
        vehicleText={vehicleText}
        kmInfo={km}
        minInfo={min}
        onPayment={() => { setShowSummary(false); setShowPayment(true); }}
        transferUcreti={transferUcreti}
        sigorta={sigorta}
        sigortaTutar={sigortaTutar}
      />
      <PaymentPopup
        open={showPayment}
        onClose={() => setShowPayment(false)}
        summary={{
          toplam:
            (transferUcreti || 0) +
            (sigorta ? sigortaTutar : 0) +
            Object.entries(extrasQty).reduce((sum, [key, qty]) => {
              const price = extrasListByCategory.flatMap(cat => cat.items).find(e => e.key === key)?.price || 0;
              return sum + price * qty;
            }, 0)
        }}
        onPaid={handlePaymentComplete}
      />
      <TesekkurPopup
        open={showThanks}
        onClose={() => { setShowThanks(false); router.push("/"); }}
      />
    </section>
  );
}
