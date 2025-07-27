"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { vehicles } from "../../data/vehicleList.js";
import EkstralarAccordion from "../../data/EkstralarAccordion.jsx";
// import extrasListByCategory from '../../data/extrasByCategory.js' // Ekstraları özette kullanacaksan lazım!

import SummaryPopup from "../../components/SummaryPopup.jsx";
import PaymentPopup from "../../components/PaymentPopup.jsx";
import TesekkurPopup from "../../components/TesekkurPopup.jsx";
import KvkkPopup from "../../components/KvkkPopup.jsx";

// Google API yükleyici
function useGoogleMaps(apiKey) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      setLoaded(true);
      return;
    }
    if (document.getElementById("google-maps-script")) {
      setLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);
  }, [apiKey]);
  return loaded;
}

// Google Autocomplete inputu (örn: Ümraniye...)
function GooglePlacesInput({ value, onChange, placeholder }) {
  const inputRef = useRef();
  useEffect(() => {
    let autocomplete;
    if (window.google && inputRef.current) {
      autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["geocode"],
        componentRestrictions: { country: "tr" },
      });
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        onChange(place.formatted_address || inputRef.current.value);
      });
    }
    return () => {};
  }, []);
  return (
    <input
      ref={inputRef}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
      autoComplete="off"
    />
  );
}

// Mesafe & süre bulucu
function useDistanceGoogle(from, to) {
  const [state, setState] = useState({ km: null, min: null, error: "" });
  useEffect(() => {
    if (!from || !to || !(window.google && window.google.maps && window.google.maps.DistanceMatrixService)) {
      setState({ km: null, min: null, error: "" });
      return;
    }
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [from],
        destinations: [to],
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (res, status) => {
        if (
          status === "OK" &&
          res.rows &&
          res.rows[0] &&
          res.rows[0].elements[0].status === "OK"
        ) {
          const elem = res.rows[0].elements[0];
          setState({
            km: elem.distance.value / 1000,
            min: Math.round(elem.duration.value / 60),
            error: "",
          });
        } else {
          setState({ km: null, min: null, error: "Hesaplanamadı" });
        }
      }
    );
  }, [from, to]);
  return state;
}

// Sigorta Açıklama (tıklayınca)
function SigortaBilgiModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className="bg-[#242012] border-2 border-[#bfa658] rounded-2xl px-8 py-8 w-[90vw] max-w-2xl text-[#ffeec2] shadow-xl relative">
        <button onClick={onClose} className="absolute top-2 right-4 bg-[#bfa658] text-black px-4 py-1 rounded-lg text-lg font-bold">Kapat</button>
        <h2 className="text-xl font-bold mb-4">YolcuTransferi Seyahat Sigortası Kapsamı</h2>
        <ul className="list-disc pl-6 mb-3">
          <li><b>Kaza, vefat, sakatlık</b> dahil tüm yolculuk risklerine karşı özel teminat</li>
          <li><b>Sağlık ve bagaj kaybı</b> riskleri dahil</li>
          <li>Her yolcu için geçerlidir</li>
          <li>Olası gecikmeler ve iptal durumları için ek tazminat</li>
          <li>7/24 canlı destek ve hızlı tazminat</li>
          <li>Poliçe tutarı, transfer ücreti ve yolcu sayısına göre otomatik hesaplanır</li>
        </ul>
        <p className="text-[#FFD700] mt-2 font-bold">Kapsam detayları için info@yolcutransferi.com</p>
      </div>
    </div>
  );
}

// KVKK Popup
function fetchPolicyText() {
  return fetch("/api/policy-text")
    .then(r => r.json())
    .then(data => data.text)
    .catch(() => "KVKK & Politika metni alınamadı. Lütfen https://yolcutransferi.com/mesafeli-satis adresini kontrol edin.");
}

function usePolicyText() {
  const [text, setText] = useState("");
  useEffect(() => {
    fetchPolicyText().then(setText);
  }, []);
  return text;
}

const saatler = [];
for (let h = 0; h < 24; ++h)
  for (let m of [0, 15, 30, 45]) saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);

const segmentOptions = [
  { key: "Ekonomik", label: "Ekonomik" },
  { key: "Lüks", label: "Lüks" },
  { key: "Prime+", label: "Prime+" }
];
const allTransfers = [
  "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Kurumsal Etkinlik", "Özel Etkinlik", "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
];

function getBestVehicleText(people, segment) {
  if (!people || !segment) return "";
  people = Number(people);
  let candidates = vehicles.filter(v => v.segment === segment && v.max >= people);
  candidates = candidates.sort((a, b) => a.max - b.max);
  let best = candidates[0];
  if (!best) return "";
  return `Araç Seçimi: Sizin seçiminize en uygun araç: ${best.label} veya benzeri (Kapasite: ${best.max} Kişi, ${best.luggage || 3} Valiz) aracımızla en özel hizmeti sunarız.`;
}

// Fiyat hesapla
function hesaplaTransferUcreti({ km, segment, people }) {
  if (!km || isNaN(km)) return null;
  let base = 30; // km başı
  let segmentF = segment === "Prime+" ? 2.5 : segment === "Lüks" ? 1.7 : 1;
  let kisiF = people > 2 ? 1 + (people - 2) * 0.12 : 1;
  let min = 1000;
  return Math.max(Math.round(km * base * segmentF * kisiF), min);
}

export default function RezervasyonForm() {
  const router = useRouter();
  const googleLoaded = useGoogleMaps(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
  const policyText = usePolicyText();

  // Form states
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
  const [sigortaModal, setSigortaModal] = useState(false);
  const [showKvkkPopup, setShowKvkkPopup] = useState(false);
  const [kvkkChecked, setKvkkChecked] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  // Mesafe & süre
  const { km, min, error: distErr } = useDistanceGoogle(from, to);

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

  // Araç metni
  const vehicleText = getBestVehicleText(Number(people), segment);

  // Transfer ücreti
  const transferUcreti = (from && to && segment && people && km)
    ? hesaplaTransferUcreti({ km, segment, people: Number(people) })
    : null;

  // Form Submit
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

  // ... Sipariş Özeti/Ödeme/Teşekkür POPUP fonksiyonları aynı şekilde buraya eklenir ...

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
            {googleLoaded ?
              <GooglePlacesInput value={from} onChange={setFrom} placeholder="Nereden? İlçe/Mahalle/Havalimanı" />
              :
              <input disabled value={from} className="input w-full bg-[#222]" placeholder="Yükleniyor..." />
            }
            {fieldErrors.from && <div className="text-red-400 text-xs mt-1">{fieldErrors.from}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
            {googleLoaded ?
              <GooglePlacesInput value={to} onChange={setTo} placeholder="Nereye? İlçe/Mahalle/Havalimanı" />
              :
              <input disabled value={to} className="input w-full bg-[#222]" placeholder="Yükleniyor..." />
            }
            {fieldErrors.to && <div className="text-red-400 text-xs mt-1">{fieldErrors.to}</div>}
          </div>
        </div>
        {/* Tarih/Saat */}
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
              style={{ cursor: "pointer" }}
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
        {/* Mesafe & Süre */}
        {(from && to) && (
          <div className="mb-3 text-[#ffeec2]">
            {km && min
              ? <span>Toplam mesafe yaklaşık <b>{km.toFixed(1)} km</b> ve seyahat süreniz <b>{min} dakika</b> olacaktır. <span className="text-[#bfa658]">(Trafik ve hava koşullarına göre değişebilir)</span></span>
              : distErr && <span className="text-red-400">Transfer mesafe/süresi hesaplanamadı, yetkililerimiz size teklif sunacaktır.</span>
            }
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
        {/* Araç Bilgisi */}
        {(segment && people) &&
          <div className="mb-2 text-[#ffeec2] text-base font-bold">{vehicleText}</div>
        }
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
        {/* PNR */}
        {(transfer === "VIP Havalimanı Transferi" || /havalimanı|airport|uçuş/i.test(from + " " + to)) && (
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
            showQtyInPopup={true} // Adetleri popup'ta değiştir
          />
        </div>
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
              onClick={() => setSigortaModal(true)}
            >Bu seyahatim için ekstra YolcuTransferi Sigortası istiyorum.</span>
          </label>
        </div>
        <SigortaBilgiModal open={sigortaModal} onClose={() => setSigortaModal(false)} />
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
              onClick={() => setShowKvkkPopup(true)}
            >
              KVKK, Satış ve Diğer Politikaları
            </button>
            okudum, onaylıyorum.
          </label>
        </div>
        {fieldErrors.kvkk && <div className="text-red-400 text-xs mt-1">{fieldErrors.kvkk}</div>}
        {/* Rezervasyonu Tamamla */}
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-12 rounded-xl text-xl shadow hover:scale-105 transition"
          >
            Rezervasyonu Tamamla
          </button>
        </div>
      </form>
      {/* POPUP'lar */}
      <KvkkPopup open={showKvkkPopup} onClose={() => setShowKvkkPopup(false)} text={policyText} onApprove={() => setKvkkChecked(true)} />
      {showSummary && (
        <SummaryPopup
          {...{
            from, to, km, min, people, segment, transfer, date, time, name, surname, tc, phone, email, pnr, note, extras, extrasQty, sigorta, transferUcreti,
            onPayment: () => { setShowSummary(false); setShowPayment(true); },
            onClose: () => setShowSummary(false),
          }}
        />
      )}
      {showPayment && (
        <PaymentPopup
          {...{
            name, surname, email, phone, amount: transferUcreti,
            onPaid: () => { setShowPayment(false); setShowThanks(true); },
            onCancel: () => setShowPayment(false),
          }}
        />
      )}
      {showThanks && (
        <TesekkurPopup
          {...{ name, email, onClose: () => { setShowThanks(false); router.push("/"); } }}
        />
      )}
    </section>
  );
}
