"use client";
import React, { useState, useRef, useEffect } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import EkstralarAccordion from "../../data/EkstralarAccordion";
import SummaryPopup from "../../components/SummaryPopup";
import PaymentPopup from "../../components/PaymentPopup";
import TesekkurPopup from "../../components/TesekkurPopup";
import KvkkPopup from "../../components/KvkkPopup";
import SigortaPopup from "../../components/SigortaPopup";

const saatler = [];
for (let h = 0; h < 24; ++h)
  for (let m of [0, 15, 30, 45]) saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];

export default function RezervasyonForm() {
  const fromRef = useRef();
  const toRef = useRef();
  const { isLoaded } = useLoadScript({ googleMapsApiKey: GOOGLE_MAPS_API_KEY, libraries });

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
  const [showKvkkPopup, setShowKvkkPopup] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  // Mesafe/süre hesapla
  useEffect(() => {
    if (isLoaded && from && to && date && time) {
      if (window.google && window.google.maps) {
        const service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
          origins: [from],
          destinations: [to],
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.METRIC,
          language: "tr",
        }, (res, status) => {
          if (status === "OK" && res.rows[0].elements[0].status === "OK") {
            setKm((res.rows[0].elements[0].distance.value / 1000).toFixed(1));
            setMin(res.rows[0].elements[0].duration.text);
            setDistErr("");
          } else {
            setKm("");
            setMin("");
            setDistErr("Mesafe/süre hesaplanamadı");
          }
        });
      }
    }
  }, [isLoaded, from, to, date, time]);

  function handlePlaceChanged(ref, setter) {
    if (ref.current && ref.current.getPlace) {
      setter(ref.current.getPlace().formatted_address);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShowSummary(true);
  }

  // Tarih kutusunun tamamına tıklayınca açılmasını sağla
  function openDatePicker(e) {
    if (e.target.showPicker) e.target.showPicker();
  }

  return (
    <section className="max-w-3xl mx-auto bg-[#19160a] border border-[#bfa658] p-6 rounded-xl">
      <h1 className="text-3xl text-[#bfa658] font-bold text-center">VIP Rezervasyon Formu</h1>
      <form onSubmit={handleSubmit} autoComplete="on">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {isLoaded && (
            <>
              <Autocomplete onLoad={ref => fromRef.current = ref} onPlaceChanged={() => handlePlaceChanged(fromRef, setFrom)}>
                <input className="input" placeholder="Nereden? İlçe/Mahalle/Havalimanı" autoComplete="off" />
              </Autocomplete>
              <Autocomplete onLoad={ref => toRef.current = ref} onPlaceChanged={() => handlePlaceChanged(toRef, setTo)}>
                <input className="input" placeholder="Nereye? İlçe/Mahalle/Havalimanı" autoComplete="off" />
              </Autocomplete>
            </>
          )}
        </div>
        {(from && to && date && time) && (
          <div className="mb-3 text-[#ffeec2]">
            {distErr ? <span className="text-red-400 font-bold">{distErr}</span> : <span>
              <b>Mesafe:</b> {km ? `${km} km` : "..."}   |  
              <b>Süre:</b> {min || "..."}
            </span>}
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <input type="date" value={date} onChange={e => setDate(e.target.value)} onFocus={openDatePicker}
            min={new Date().toISOString().split("T")[0]} className="input" />
          <select value={time} onChange={e => setTime(e.target.value)} className="input">
            <option value="">Saat Seçiniz</option>
            {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
          </select>
        </div>
        {/* Diğer alanlar burada... */}
        <input className="input" placeholder="Adınız" value={name} onChange={e => setName(e.target.value)} autoComplete="name" />
        <input className="input" placeholder="Soyadınız" value={surname} onChange={e => setSurname(e.target.value)} autoComplete="family-name" />
        <input className="input" placeholder="TC Kimlik No" value={tc} onChange={e => setTc(e.target.value)} autoComplete="off" />
        <input className="input" placeholder="Telefon" value={phone} onChange={e => setPhone(e.target.value)} autoComplete="tel" />
        <input className="input" placeholder="E-posta" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
        <input className="input" placeholder="PNR/Uçuş Kodu" value={pnr} onChange={e => setPnr(e.target.value)} />
        <textarea className="input" placeholder="Eklemek istediğiniz bir not var mı?" value={note} onChange={e => setNote(e.target.value)} />
        <EkstralarAccordion value={extras} onChange={setExtras} onlyCheck={true} />
        {/* Sigorta, KVKK, buton ve popuplar */}
        <div className="flex items-center mt-3">
          <input type="checkbox" checked={sigorta} onChange={() => setSigorta(v => !v)} id="sigorta" className="mr-2" />
          <label htmlFor="sigorta" className="cursor-pointer text-[#ffeec2] underline hover:text-[#bfa658]" onClick={() => setShowSigortaPopup(true)}>
            Bu seyahatim için ekstra YolcuTransferi Sigortası istiyorum.
          </label>
        </div>
        <div className="flex items-center mt-3 mb-4">
          <input type="checkbox" className="mr-2" />
          <span>
            <span onClick={() => setShowKvkkPopup(true)} className="cursor-pointer underline text-[#ffeec2] hover:text-[#bfa658]">
              KVKK, Satış ve Diğer Politikaları
            </span>{" "}
            okudum, onaylıyorum.
          </span>
        </div>
        <button type="submit" className="btn btn-primary w-full text-xl py-3 mt-2">Rezervasyonu Tamamla</button>
      </form>
      <SummaryPopup open={showSummary} onClose={() => setShowSummary(false)} />
      <PaymentPopup open={showPayment} onClose={() => setShowPayment(false)} />
      <TesekkurPopup open={showThanks} onClose={() => setShowThanks(false)} />
      <KvkkPopup open={showKvkkPopup} onClose={() => setShowKvkkPopup(false)} />
      <SigortaPopup open={showSigortaPopup} onClose={() => setShowSigortaPopup(false)} />
    </section>
  );
}
