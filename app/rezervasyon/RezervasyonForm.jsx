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
import calcTransferPrice from "../../utils/calcTransferPrice"; // <-- yeni ekle

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

function getBestVehicleText(people, segment) {
  people = Number(people);
  if (!people || !segment) return "";
  if (people <= 6) {
    if (segment === "Prime+") return "Maybach veya benzeri (6 kişiye kadar).";
    if (segment === "Lüks") return "Vito veya benzeri (6 kişiye kadar).";
    return "Transporter veya benzeri (6 kişiye kadar).";
  }
  if (people >= 7 && people <= 8) return "Mercedes Vito veya Transporter önerilir (7-8 kişi).";
  if (people >= 9) return "Mercedes Sprinter veya benzeri (9-16 kişi).";
  return "";
}

export default function RezervasyonForm() {
  // State'ler
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

  const [transferUcreti, setTransferUcreti] = useState(null);

  useEffect(() => {
    ["name", "surname", "phone", "email", "tc"].forEach((f) => {
      if (typeof window !== "undefined" && window.localStorage) {
        const v = window.localStorage.getItem("yt_" + f);
        if (v) {
          if (f === "name") setName(v);
          if (f === "surname") setSurname(v);
          if (f === "phone") setPhone(v);
          if (f === "email") setEmail(v);
          if (f === "tc") setTc(v);
        }
      }
    });
  }, []);
  useEffect(() => {
    if (typeof window === "undefined" || !window.localStorage) return;
    window.localStorage.setItem("yt_name", name || "");
    window.localStorage.setItem("yt_surname", surname || "");
    window.localStorage.setItem("yt_phone", phone || "");
    window.localStorage.setItem("yt_email", email || "");
    window.localStorage.setItem("yt_tc", tc || "");
  }, [name, surname, phone, email, tc]);

  useEffect(() => {
    if (showKvkkPopup && !kvkkText) {
      fetchKvkk().then(txt => setKvkkText(txt.replace(/<br\s*\/?>/gi, "\n")));
    }
  }, [showKvkkPopup]);

  // MESAFE OTOMATİK ÇEK
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

  // Transfer Ücretini Hesapla (her km/segment/kişi/saat değişiminde otomatik)
  useEffect(() => {
    if (!km || !segment || !people || !time) { setTransferUcreti(null); return; }
    if (distErr) { setTransferUcreti(null); return; }
    setTransferUcreti(calcTransferPrice(Number(km), segment, Number(people), time));
  }, [km, segment, people, time, distErr]);

  // Sigorta tutarı info
  const sigortaBilgiYazisi = sigorta
    ? "Seçiminize göre ekstra 400-4000 TL arası YolcuTransferi Sigortası ücreti eklenir."
    : "";

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
    if (!/^\d{11}$/.test(tc) || /^(\d)\1+$/.test(tc)) err.tc = "Geçerli bir TC Kimlik No giriniz.";
    let cleanedPhone = phone.replace(/\D/g, "");
    if (!/^05\d{9}$/.test(cleanedPhone) || cleanedPhone.length !== 11) err.phone = "Geçerli bir 05xx ile başlayan telefon giriniz.";
    if (!/^\S+@\S+\.\S+$/.test(email)) err.email = "Geçerli e-posta adresi giriniz.";
    if (!kvkkChecked) err.kvkk = "KVKK onayı zorunludur.";
    setFieldErrors(err);
    if (Object.keys(err).length > 0) return;
    setShowSummary(true);
  }

  useEffect(() => {
    if (!dateInputRef.current) return;
    const el = dateInputRef.current;
    el.addEventListener("click", () => el.showPicker && el.showPicker());
    return () => el.removeEventListener("click", () => el.showPicker && el.showPicker());
  }, []);

  // Sigorta Tutarı (örnek: 1/10 fiyatı gibi demo)
  const sigortaTutar = sigorta && transferUcreti ? Math.round(Number(transferUcreti) / 10) : 0;

  return (
    <section className="w-full max-w-3xl mx-auto rounded-3xl shadow-2xl bg-[#19160a] border border-[#bfa658] px-6 md:px-10 py-12 my-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-8 text-center font-quicksand">
        VIP Rezervasyon Formu
      </h1>
      <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-2">
        {/* ... aynı inputlar ... */}
        {/* Yukarıdaki kodun tamamını KESİNLİKLE aynen bırak, sadece aşağıdaki popupları GÜNCELLE */}
      </form>
      {/* POPUP COMPONENTS */}
      <SummaryPopup
        open={showSummary}
        onClose={() => setShowSummary(false)}
        {...{
          from, to, date, time, people, segment, transfer,
          name, surname, tc, phone, email, pnr, note,
          extras,
          sigorta,
          sigortaTutar,
          transferUcreti,
          vehicleText: getBestVehicleText(Number(people), segment),
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
          transferUcreti: transferUcreti || 0,
          sigortaTutar: sigortaTutar || 0,
          extras: [], // Eğer extras objeleri {key, label, price, qty} ise buraya extras geç!
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
