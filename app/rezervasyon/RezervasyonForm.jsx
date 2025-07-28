// === Dosya: app/rezervasyon/RezervasyonForm.jsx ===
"use client";
import React, { useState, useRef, useEffect } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import EkstralarAccordion from "../../data/EkstralarAccordion.jsx";
import { vehicles } from "../../data/vehicleList.js";
import { useRouter } from "next/navigation";

// Popup Componentleri
import SummaryPopup from "../../components/SummaryPopup";
import PaymentPopup from "../../components/PaymentPopup";
import TesekkurPopup from "../../components/TesekkurPopup";
import KvkkPopup from "../../components/KvkkPopup";

const libraries = ["places"];
const envApiKey = process.env.GOOGLE_MAPS_API_KEY;

function calculateTransferPrice(km, segment, people) {
  if (!km || isNaN(km)) return null;
  const basePrice = km * (segment === "Prime+" ? 80 : segment === "Lüks" ? 60 : 40);
  const extraPeople = Math.max(0, people - 2);
  return Math.round(basePrice * (1 + extraPeople * 0.1));
}

export default function RezervasyonForm() {
  const router = useRouter();
  const { isLoaded } = useLoadScript({ googleMapsApiKey: envApiKey, libraries });

  // STATE
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [km, setKm] = useState(null);
  const [duration, setDuration] = useState(null);
  const [distanceError, setDistanceError] = useState("");
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
  const [showSigortaInfo, setShowSigortaInfo] = useState(false);
  const [showKvkkPopup, setShowKvkkPopup] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [kvkkChecked, setKvkkChecked] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Google Autocomplete Refs
  const fromRef = useRef();
  const toRef = useRef();

  // MESAFE HESAP
  useEffect(() => {
    if (!isLoaded || !from || !to) return;
    setKm(null);
    setDuration(null);
    setDistanceError("");
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [from],
        destinations: [to],
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (
          status === "OK" &&
          response.rows[0].elements[0].status === "OK"
        ) {
          setKm(response.rows[0].elements[0].distance.value / 1000);
          setDuration(response.rows[0].elements[0].duration.text);
        } else {
          setDistanceError("Mesafe/süre hesaplanamadı");
          setKm(null);
          setDuration(null);
        }
      }
    );
  }, [from, to, isLoaded]);

  // ARAÇ SEÇİMİ
  const vehicle =
    vehicles.find(
      (v) =>
        v.segment === segment &&
        v.max >= (parseInt(people) || 1)
    ) || null;

  // SİGORTA
  const sigortaTutar =
    sigorta && km && segment && people
      ? Math.round(
          calculateTransferPrice(km, segment, Number(people)) *
            0.4 *
            (1 + Math.max(Number(people) - 1, 0) * 0.1)
        )
      : 0;

  // FİYAT
  const transferPrice =
    km && segment && people
      ? calculateTransferPrice(km, segment, Number(people))
      : null;

  // VALIDASYON
  const isValidTC = (t) => /^[1-9]\d{9}[02468]$/.test(t) && t.length === 11;
  const isValidPhone = (t) => /^05\d{9}$/.test(t) && t.length === 11;
  const isValidEmail = (t) => /^\S+@\S+\.\S+$/.test(t);

  // FORM SUBMIT
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
    if (!kvkkChecked) err.kvkk = "KVKK, Satış ve diğer politikalar onayı zorunludur.";
    setFieldErrors(err);
    if (Object.keys(err).length > 0) return;
    setShowSummary(true);
  }

  // TC/PHONE HELPER
  function handleTcChange(val) {
    setTc(val.replace(/\D/g, "").slice(0, 11));
  }
  function handlePhoneChange(val) {
    let num = val.replace(/\D/g, "");
    if (num.length > 0 && num[0] !== "0") num = "0" + num;
    setPhone(num.slice(0, 11));
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
            {isLoaded && (
              <Autocomplete onPlaceChanged={() => setFrom(fromRef.current.value)}>
                <input
                  ref={fromRef}
                  className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
                  placeholder="Nereden? İlçe/Mahalle/Havalimanı"
                  autoComplete="off"
                  onChange={e => setFrom(e.target.value)}
                />
              </Autocomplete>
            )}
            {fieldErrors.from && <div className="text-red-400 text-xs mt-1">{fieldErrors.from}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
            {isLoaded && (
              <Autocomplete onPlaceChanged={() => setTo(toRef.current.value)}>
                <input
                  ref={toRef}
                  className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
                  placeholder="Nereye? İlçe/Mahalle/Havalimanı"
                  autoComplete="off"
                  onChange={e => setTo(e.target.value)}
                />
              </Autocomplete>
            )}
            {fieldErrors.to && <div className="text-red-400 text-xs mt-1">{fieldErrors.to}</div>}
          </div>
        </div>
        {/* Mesafe/süre ve araç seçimi info */}
        {(from && to) && (
          <>
            {km && duration ? (
              <div className="mb-2 text-[#ffeec2] font-bold">
                Toplam mesafe yaklaşık <span className="text-[#FFD700]">{km.toFixed(1)} km</span> ve seyahat süreniz <span className="text-[#FFD700]">{duration}</span> olacaktır. <span className="text-sm text-[#bfa658]">(Trafik ve hava şartlarına göre değişebilir.)</span>
              </div>
            ) : null}
            {distanceError && <div className="text-red-400 font-bold mb-2">{distanceError}</div>}
          </>
        )}
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
              onClick={e => e.target.showPicker && e.target.showPicker()} // Chrome destekli date-picker
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
              {Array.from({ length: 24 }, (_, h) =>
                [0, 15, 30, 45].map(m => (
                  <option key={`${h}:${m}`} value={`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`}>
                    {h.toString().padStart(2, "0")}:{m.toString().padStart(2, "0")}
                  </option>
                ))
              )}
            </select>
            {fieldErrors.time && <div className="text-red-400 text-xs mt-1">{fieldErrors.time}</div>}
          </div>
        </div>
        {/* Araç seçimi info */}
        {vehicle && (
          <div className="mb-3 text-[#ffeec2] text-base font-semibold">
            Araç Seçimi: Sizin seçiminize en uygun araç: <b>{vehicle.label}</b> veya benzeri (Kapasitesi: {vehicle.max} Kişi, {vehicle.luggage || 0} Valiz) aracımızla en özel hizmeti sunarız.
          </div>
        )}
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
              {Array.from({ length: 24 }, (_, i) => i + 1).map(val => (
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
              <option>Ekonomik</option>
              <option>Lüks</option>
              <option>Prime+</option>
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
              <option>VIP Havalimanı Transferi</option>
              <option>Şehirler Arası Transfer</option>
              <option>Kurumsal Etkinlik</option>
              <option>Özel Etkinlik</option>
              <option>Tur & Gezi</option>
              <option>Toplu Transfer</option>
              <option>Düğün vb Organizasyonlar</option>
            </select>
            {fieldErrors.transfer && <div className="text-red-400 text-xs mt-1">{fieldErrors.transfer}</div>}
          </div>
        </div>
        {/* Kişisel Bilgiler */}
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
        {/* PNR, Not */}
        {(transfer === "VIP Havalimanı Transferi" || from.toLowerCase().includes("havalimanı") || to.toLowerCase().includes("havalimanı")) && (
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
        {/* Sigorta */}
        <div className="flex items-center mt-3 mb-3 relative">
          <input
            type="checkbox"
            id="sigorta"
            checked={sigorta}
            onChange={e => setSigorta(e.target.checked)}
            className="accent-[#bfa658] w-5 h-5"
          />
          <label
            htmlFor="sigorta"
            className="ml-2 text-[#ffeec2] text-sm flex items-center relative"
          >
            <span
              className="underline text-[#FFD700] hover:text-[#bfa658] cursor-pointer px-1"
              onClick={() => setShowSigortaInfo(!showSigortaInfo)}
            >
              Bu seyahatim için ekstra YolcuTransferi Sigortası istiyorum.
            </span>
            {showSigortaInfo && (
              <div
                className="absolute left-0 mt-8 w-[390px] max-w-[96vw] z-40 bg-[#242012] border border-[#bfa658] rounded-lg px-6 py-3 shadow text-xs text-[#ffeec2]"
                style={{ minWidth: "350px" }}
              >
                <b>YolcuTransferi Sigortası</b>: Transfer süresince <b>kaza, vefat, sakatlık, sağlık, bagaj kaybı</b> gibi tüm risklerde özel sigorta koruması sağlar. Her yolcu için geçerli. 7/24 destek ve tazminat. Fiyat, transfer ücreti ve yolcu sayısına göre otomatik hesaplanır.
                <div className="mt-2 text-[#FFD700] font-bold">
                  {sigortaTutar > 0 ? `Sigorta Ücreti: ${sigortaTutar.toLocaleString()}₺` : "Sigorta fiyatı transfer ücretiyle birlikte hesaplanır."}
                </div>
              </div>
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
            <button
              type="button"
              className="underline text-[#FFD700] hover:text-[#bfa658] cursor-pointer px-1"
              onClick={() => setShowKvkkPopup(true)}
            >
              KVKK, Satış ve Diğer Politikaları
            </button>
            {' '}okudum, onaylıyorum.
          </label>
        </div>
        {fieldErrors.kvkk && (
          <div className="text-red-400 text-xs mt-1">{fieldErrors.kvkk}</div>
        )}
        {/* Buton */}
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-12 rounded-xl text-xl shadow hover:scale-105 transition"
          >
            Rezervasyonu Tamamla
          </button>
        </div>
      </form>

      {/* Popuplar */}
      {showSummary && (
        <SummaryPopup
          {...{
            from, to, km, duration, people, segment, transfer, date, time,
            name, surname, tc, phone, email, pnr, note, extras, extrasQty, sigorta, sigortaTutar, transferPrice,
            onClose: () => setShowSummary(false),
            onPayment: () => { setShowSummary(false); setShowPayment(true); }
          }}
        />
      )}
      {showPayment && (
        <PaymentPopup
          {...{
            from, to, km, duration, people, segment, transfer, date, time,
            name, surname, tc, phone, email, pnr, note, extras, extrasQty, sigorta, sigortaTutar, transferPrice,
            onComplete: () => { setShowPayment(false); setShowThanks(true); }
          }}
        />
      )}
      {showThanks && (
        <TesekkurPopup
          name={name}
          email={email}
          onClose={() => { setShowThanks(false); router.push("/"); }}
        />
      )}
      {showKvkkPopup && (
        <KvkkPopup onClose={() => setShowKvkkPopup(false)} />
      )}
    </section>
  );
}
