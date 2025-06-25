"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { vehicles } from "../../data/vehicleList";
import { extrasList } from "../../data/extras";
import EkstralarAccordion from "../../components/EkstralarAccordion";
import AdresAutoComplete from "./AdresAutoComplete";

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

function normalize(str) {
  return (str || "")
    .toLocaleLowerCase("tr-TR")
    .replace(/&/g, "ve")
    .replace(/[çÇ]/g, "c")
    .replace(/[ğĞ]/g, "g")
    .replace(/[ıİ]/g, "i")
    .replace(/[öÖ]/g, "o")
    .replace(/[şŞ]/g, "s")
    .replace(/[üÜ]/g, "u")
    .replace(/[,\.]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// EN BAŞ: Form bileşeni
export default function VipTransferForm() {
  const router = useRouter();
  const params = useSearchParams();
  // --- OTOMATİK PARAMETRE OKUMA VE STATE AYARLAMA ---
  const paramFrom = params.get("from") || "";
  const paramTo = params.get("to") || "";
  const paramDate = params.get("date") || "";
  const paramTime = params.get("time") || "";
  const paramVehicle = params.get("vehicle") || "";
  const paramPeople = Number(params.get("people")) || 1;
  const paramSegment = params.get("segment") || "Ekonomik";
  const paramTransfer = params.get("transfer") || "";

  const [from, setFrom] = useState(paramFrom);
  const [to, setTo] = useState(paramTo);
  const [people, setPeople] = useState(paramPeople);
  const [segment, setSegment] = useState(paramSegment);
  const [transfer, setTransfer] = useState(paramTransfer);
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
  const [extrasQty, setExtrasQty] = useState({});
  const [mesafeliOk, setMesafeliOk] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showContract, setShowContract] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // FİLTRELER
  const availableTransfers = allTransfers;
  const availableVehicles = vehicles.filter(v =>
    (!segment || normalize(v.segment) === normalize(segment)) &&
    (!transfer || (v.transferTypes || []).map(normalize).includes(normalize(transfer))) &&
    (!people || (v.max || 1) >= people)
  );
  const maxPeople = Math.max(...availableVehicles.map(v => v.max || 1), 10);

  useEffect(() => {
    const next = {};
    extras.forEach(key => {
      next[key] = extrasQty[key] || 1;
    });
    setExtrasQty(next);
  }, [extras]);

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

  // KİŞİ BİLGİLERİ LOCALSTORAGE
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
    const errors = {};
    if (!from) errors.from = "Lütfen kalkış noktası girin!";
    if (!to) errors.to = "Lütfen varış noktası girin!";
    if (!people) errors.people = "Kişi sayısı seçin!";
    if (!segment) errors.segment = "Segment seçin!";
    if (!transfer) errors.transfer = "Transfer türü seçin!";
    if (!vehicle) errors.vehicle = "Araç seçin!";
    if (!date) errors.date = "Tarih seçin!";
    if (!time) errors.time = "Saat seçin!";
    if (!name) errors.name = "Adınızı girin!";
    if (!surname) errors.surname = "Soyadınızı girin!";
    if (tc.length !== 11) errors.tc = "TC Kimlik No 11 haneli olmalı!";
    if (phone.length !== 11) errors.phone = "Telefon 11 haneli olmalı!";
    if (!mesafeliOk) errors.mesafeliOk = "Mesafeli satış onayı zorunlu!";
    if (showPnr && !pnr) errors.pnr = "PNR/Uçuş kodu zorunlu!";
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      const first = Object.keys(errors)[0];
      const el = document.querySelector(`[name='${first}']`);
      if (el) el.focus();
      return;
    }
    setShowSummary(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-[#19160a] to-[#302811]">
      <section className="w-full max-w-2xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] my-16">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-8 text-center font-quicksand">
          VIP Rezervasyon Formu
        </h1>
        <form onSubmit={handleSubmit} autoComplete="on" className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* ...Aşağıdaki kodun tamamı aynı... */}
          {/* --- Formun tamamı burada değişmeden devam eder --- */}
          {/* ... */}
        </form>
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
            extrasQty={extrasQty}
            setExtrasQty={setExtrasQty}
            setExtras={setExtras}
            pnr={pnr}
            onClose={() => setShowSummary(false)}
            router={router}
          />
        )}
      </section>
    </div>
  );
}

// MesafeliPopup ve SummaryPopup fonksiyonları kodunda değişmeden kalabilir.
