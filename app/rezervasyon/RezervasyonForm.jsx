"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { vehicles } from "../data/vehicles";
import { extrasList } from "../data/extras";
import AdresAutoComplete from "./AdresAutoComplete";
import EkstralarAccordion from "../components/EkstralarAccordion";
const saatler = [];
for (let h = 0; h < 24; ++h)
  for (let m of [0, 15, 30, 45]) saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);

export default function VipTransferForm() {
  const params = useSearchParams();
  const paramFrom = params.get("from") || "";
  const paramTo = params.get("to") || "";
  const paramDate = params.get("date") || "";
  const paramTime = params.get("time") || "";
  const paramVehicle = params.get("vehicle") || "";
  const paramPeople = Number(params.get("people")) || 1;

  // State'ler
  const [from, setFrom] = useState(paramFrom);
  const [to, setTo] = useState(paramTo);
  const [people, setPeople] = useState(paramPeople);
  const [segment, setSegment] = useState("ekonomik");
  const [transfer, setTransfer] = useState("");
  const [vehicle, setVehicle] = useState(paramVehicle);
  const [date, setDate] = useState(paramDate);
  const [time, setTime] = useState(paramTime);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [tc, setTc] = useState("");
  const [phone, setPhone] = useState("");
  const [pnr, setPnr] = useState("");
  const [note, setNote] = useState("");
  const [extras, setExtras] = useState([]);
  const [mesafeliOk, setMesafeliOk] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showContract, setShowContract] = useState(false);

  // SEGMENTLER
  const segmentOptions = [
    { key: "ekonomik", label: "Ekonomik" },
    { key: "lux", label: "Lüks" },
    { key: "prime", label: "Prime+" }
  ];
  const transferTypes = {
    ekonomik: [
      "VIP Havalimanı Transferi",
      "Şehirlerarası Transfer",
      "Kurumsal & Toplu Transfer",
      "Tur & Gezi Transferi"
    ],
    lux: [
      "VIP Havalimanı Transferi",
      "Şehirlerarası Transfer",
      "Kurumsal & Toplu Transfer",
      "Tur & Gezi Transferi"
    ],
    prime: [
      "VIP Havalimanı Transferi",
      "Şehirlerarası Transfer",
      "Kurumsal & Toplu Transfer",
      "Tur & Gezi Transferi",
      "Düğün & Özel Etkinlik Transferi",
      "Drone Yolcu Transferi"
    ]
  };
  const availableTransfers = transferTypes[segment] || [];
  const availableVehicles = vehicles.filter(v =>
    (!transfer || v.transferTypes?.includes(transfer)) &&
    (!segment || v.segment?.toLowerCase() === segment) &&
    (!people || (v.max || 1) >= people)
  );
  const maxPeople = Math.max(...availableVehicles.map(v => v.max || 1), 10);

  const dateInputRef = useRef();
  const openDate = () => dateInputRef.current && dateInputRef.current.showPicker();

  function handleTcChange(val) {
    setTc(val.replace(/\D/g, "").slice(0, 11));
  }
  function handlePhoneChange(val) {
    let num = val.replace(/\D/g, "");
    if (num.length > 0 && num[0] !== "0") num = "0" + num;
    setPhone(num.slice(0, 11));
  }

  // AD / SOYAD / TEL CACHE (browser + localStorage)
  useEffect(() => {
    try {
      if (!name) {
        let isim = window.localStorage.getItem("rezv_ad");
        if (!isim) isim = window.sessionStorage.getItem("rezv_ad");
        if (!isim && window.navigator.userAgent.includes("Chrome")) {
          isim = window.localStorage.getItem("ad") || "";
        }
        if (isim) setName(isim);
      }
      if (!surname) {
        let soyad = window.localStorage.getItem("rezv_soyad");
        if (!soyad) soyad = window.sessionStorage.getItem("rezv_soyad");
        if (!soyad && window.navigator.userAgent.includes("Chrome")) {
          soyad = window.localStorage.getItem("soyad") || "";
        }
        if (soyad) setSurname(soyad);
      }
      if (!phone) {
        let tel = window.localStorage.getItem("rezv_tel") || window.sessionStorage.getItem("rezv_tel");
        if (!tel && window.navigator.userAgent.includes("Chrome")) {
          tel = window.localStorage.getItem("tel") || "";
        }
        if (tel) setPhone(tel);
      }
    } catch { }
  }, []);

  useEffect(() => {
    if (showSummary) {
      window.localStorage.setItem("rezv_ad", name);
      window.localStorage.setItem("rezv_soyad", surname);
      window.localStorage.setItem("rezv_tel", phone);
    }
  }, [showSummary, name, surname, phone]);

  // HAVALİMANI ALGILAMA
  const isAirport = str =>
    str && typeof str === "string" && (
      str.toLowerCase().includes("havaalan") ||
      str.toLowerCase().includes("havaliman") ||
      str.toLowerCase().includes("airport")
    );
  const showPnr =
    isAirport(from) || isAirport(to) || (transfer && transfer.toLowerCase().includes("hava"));

  function handleSubmit(e) {
    e.preventDefault();
    if (!from || !to || !date || !time || !vehicle || !name || !surname || tc.length !== 11 || phone.length !== 11 || !mesafeliOk || (showPnr && !pnr)) {
      alert("Lütfen tüm alanları eksiksiz ve doğru doldurun!");
      return;
    }
    setShowSummary(true);
  }

  // Vercel debug bar gizle (prod için)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const el = document.querySelector('[class*="vercel-toolbar"]');
      if (el && process.env.NODE_ENV === "production") el.style.display = "none";
    }
  }, []);

  // -- RETURN HTML --
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-[#19160a] to-[#302811]">
      <section className="w-full max-w-2xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] my-16">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-8 text-center font-quicksand">
          VIP Rezervasyon Formu
        </h1>
        <form onSubmit={handleSubmit} autoComplete="on" className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Nereden */}
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereden?</label>
            <AdresAutoComplete
              value={from}
              onChange={setFrom}
              placeholder="Nereden? İl / İlçe / Mahalle / Havalimanı"
            />
          </div>
          {/* Nereye */}
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
            <AdresAutoComplete
              value={to}
              onChange={setTo}
              placeholder="Nereye? İl / İlçe / Mahalle / Havalimanı"
            />
          </div>
          {/* Kişi ve Segment */}
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Kişi Sayısı</label>
            <select className="input w-full"
                    value={people}
                    onChange={e => setPeople(Number(e.target.value))}>
              {Array.from({ length: maxPeople }, (_, i) => i + 1).map(val =>
                <option key={val} value={val}>{val}</option>
              )}
            </select>
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
            <select className="input w-full"
                    value={segment}
                    onChange={e => setSegment(e.target.value)}>
              {segmentOptions.map(opt =>
                <option key={opt.key} value={opt.key}>{opt.label}</option>
              )}
            </select>
          </div>
          {/* Transfer ve Araç */}
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Transfer Türü</label>
            <select className="input w-full"
                    value={transfer}
                    onChange={e => setTransfer(e.target.value)}>
              <option value="">Seçiniz</option>
              {availableTransfers.map(opt =>
                <option key={opt} value={opt}>{opt}</option>
              )}
            </select>
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Araç</label>
            <select className="input w-full"
                    value={vehicle}
                    onChange={e => setVehicle(e.target.value)}>
              <option value="">Seçiniz</option>
              {availableVehicles.map(opt =>
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              )}
            </select>
          </div>
          {/* PNR (Havalimanı) */}
          {showPnr && (
            <div className="md:col-span-2">
              <label className="font-bold text-[#bfa658] mb-1 block">PNR / Uçuş Kodu</label>
              <input
                type="text"
                className="input w-full"
                value={pnr}
                onChange={e => setPnr(e.target.value)}
                placeholder="Uçuş Rezervasyon Kodu (PNR)"
                style={{ fontFamily: "Quicksand,sans-serif" }}
              />
            </div>
          )}
          {/* Tarih ve Saat */}
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Tarih</label>
            <input
              type="date"
              className="input w-full"
              value={date}
              ref={dateInputRef}
              onFocus={openDate}
              onClick={openDate}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              autoComplete="on"
              style={{ fontFamily: "Quicksand,sans-serif" }}
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
            <select className="input w-full"
                    value={time}
                    onChange={e => setTime(e.target.value)}>
              <option value="">Seçiniz</option>
              {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
            </select>
          </div>
          {/* Ad Soyad */}
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Ad</label>
            <input
              type="text"
              className="input w-full"
              value={name}
              onChange={e => setName(e.target.value)}
              autoComplete="given-name"
              style={{ fontFamily: "Quicksand,sans-serif" }}
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Soyad</label>
            <input
              type="text"
              className="input w-full"
              value={surname}
              onChange={e => setSurname(e.target.value)}
              autoComplete="family-name"
              style={{ fontFamily: "Quicksand,sans-serif" }}
            />
          </div>
          {/* TC ve Telefon */}
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">T.C. Kimlik No</label>
            <input
              type="text"
              className="input w-full"
              maxLength={11}
              pattern="[0-9]*"
              value={tc}
              onChange={e => handleTcChange(e.target.value)}
              autoComplete="off"
              style={{ fontFamily: "Quicksand,sans-serif" }}
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Telefon</label>
            <input
              type="text"
              className="input w-full"
              maxLength={11}
              pattern="[0-9]*"
              value={phone}
              onChange={e => handlePhoneChange(e.target.value)}
              autoComplete="tel"
              style={{ fontFamily: "Quicksand,sans-serif" }}
            />
          </div>
          {/* Ek Not */}
          <div className="md:col-span-2">
            <label className="font-bold text-[#bfa658] mb-1 block">Ek Not</label>
            <textarea
              className="input w-full"
              rows={2}
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Eklemek istediğiniz bir not var mı?"
              style={{ fontFamily: "Quicksand,sans-serif" }}
            />
          </div>
          {/* Ekstralar */}
          <div className="md:col-span-2">
            <label className="font-bold text-[#bfa658] mb-2 block text-lg">Ekstralar</label>
            <EkstralarAccordion selectedExtras={extras} setSelectedExtras={setExtras} />
          </div>
          {/* Mesafeli Satış */}
          <div className="md:col-span-2 flex items-center mt-3">
            <input
              type="checkbox"
              checked={mesafeliOk}
              onChange={e => setMesafeliOk(e.target.checked)}
              className="mr-2"
              id="mesafeliBox"
            />
            <label htmlFor="mesafeliBox" className="text-sm text-gray-200">
              <button type="button" className="underline text-[#bfa658]" onClick={e => { e.preventDefault(); setShowContract(true); }}>
                Mesafeli Satış Sözleşmesini
              </button> okudum ve onaylıyorum.
            </label>
          </div>
          {/* Buton */}
          <div className="md:col-span-2 flex justify-end">
            <button type="submit"
                    className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-12 rounded-xl text-xl shadow hover:scale-105 transition">
              Rezervasyonu Tamamla
            </button>
          </div>
        </form>
        {/* Pop-up'lar */}
        {showContract && (
          <MesafeliPopup onClose={() => setShowContract(false)} />
        )}
        {showSummary && (
          <SummaryPopup
            from={from}
            to={to}
            people={people}
            segment={segment}
            transfer={transfer}
            vehicle={vehicle}
            date={date}
            time={time}
            name={name}
            surname={surname}
            tc={tc}
            phone={phone}
            note={note}
            extras={extras}
            pnr={pnr}
            onClose={() => setShowSummary(false)}
          />
        )}
      </section>
    </div>
  );
}

// MesafeliPopup ve SummaryPopup aynı şekilde kullanılabilir.

