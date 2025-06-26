"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { vehicles } from "../../data/vehicleList";
import EkstralarAccordion from "./EkstralarAccordion";
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

export default function RezervasyonForm() {
  const router = useRouter();
  const params = useSearchParams();

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

  function handleTcChange(val) {
    setTc(val.replace(/\D/g, "").slice(0, 11));
  }
  function handlePhoneChange(val) {
    let num = val.replace(/\D/g, "");
    if (num.length > 0 && num[0] !== "0") num = "0" + num;
    setPhone(num.slice(0, 11));
  }

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

  function MesafeliPopup({ onClose }) {
    const [content, setContent] = useState("Yükleniyor...");
    useEffect(() => {
      fetch("/mesafeli-satis")
        .then(r => r.text())
        .then(html => {
          const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
          setContent(main ? main[1] : html);
        });
    }, []);
    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
        <div className="bg-[#19160a] rounded-2xl max-w-2xl w-full shadow-2xl p-8 overflow-y-auto max-h-[90vh] relative border border-[#bfa658]">
          <button onClick={onClose} className="absolute top-3 right-5 text-2xl font-bold text-red-500 hover:text-red-700">×</button>
          <div className="text-[#ffeec2] prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    );
  }

  function SummaryPopup({
    from, to, people, segment, transfer, vehicle, date, time, name, surname, tc, phone, note, extras, extrasQty, setExtrasQty, setExtras, pnr, onClose, router
  }) {
    const allExtras = require("../../data/extrasByCategory").extrasListByCategory.flatMap(cat => cat.items);
    const selectedExtras = allExtras.filter(e => extras.includes(e.key));
    const basePrice = 4000;
    const extrasTotal = selectedExtras.reduce((sum, e) => sum + (e.price * (extrasQty[e.key] || 1)), 0);
    const araToplam = basePrice + extrasTotal;
    const kdv = araToplam * KDV_ORAN;
    const toplam = araToplam + kdv;

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

    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
        <div className="bg-[#19160a] rounded-2xl max-w-xl w-full shadow-2xl p-8 overflow-y-auto max-h-[90vh] relative border border-[#bfa658]">
          <button onClick={onClose} className="absolute top-3 right-5 text-2xl font-bold text-red-500 hover:text-red-700">×</button>
          <h2 className="text-2xl font-bold mb-5 text-[#bfa658] text-center">Rezervasyon Özeti</h2>
          <div className="space-y-2 mb-5 text-[#ffeec2] text-lg">
            <div><b>Transfer:</b> {transfer || "-"}</div>
            <div><b>Araç:</b> {vehicle || "-"}</div>
            <div><b>Kişi:</b> {people}</div>
            <div><b>Nereden:</b> {from}</div>
            <div><b>Nereye:</b> {to}</div>
            <div><b>Tarih:</b> {date} {time}</div>
            <div><b>Ad Soyad:</b> {name} {surname} – T.C.: {tc}</div>
            <div><b>Telefon:</b> {phone}</div>
            {pnr && <div><b>PNR/Uçuş Kodu:</b> {pnr}</div>}
            {note && <div><b>Ek Not:</b> {note}</div>}
          </div>
          <div className="mb-5">
            <b className="block mb-2 text-[#bfa658]">Ekstralar:</b>
            {selectedExtras.length === 0 && <span className="text-gray-400">Ekstra yok</span>}
            {selectedExtras.map(extra =>
              <div key={extra.key} className="flex items-center gap-2 py-1">
                <span className="font-semibold">{extra.label}</span>
                <button type="button" className="px-2" onClick={() => changeQty(extra.key, -1)}>-</button>
                <span className="w-8 text-center">{extrasQty[extra.key] || 1}</span>
                <button type="button" className="px-2" onClick={() => changeQty(extra.key, +1)}>+</button>
                <span className="ml-2">{extra.price}₺</span>
                <button type="button" onClick={() => removeExtra(extra.key)} className="ml-2 text-red-500 font-bold hover:underline">Çıkar</button>
              </div>
            )}
          </div>
          <div className="mb-5 space-y-1 text-right text-lg">
            <div><b>Transfer Bedeli:</b> {basePrice.toLocaleString()} ₺</div>
            <div><b>Ekstralar:</b> {extrasTotal.toLocaleString()} ₺</div>
            <div><b>KDV (%20):</b> {kdv.toLocaleString(undefined, { maximumFractionDigits: 2 })} ₺</div>
            <div className="text-xl font-extrabold"><b>Toplam:</b> {toplam.toLocaleString()} ₺</div>
          </div>
          <button
            onClick={() => {
              router.push("/odeme?success=1");
            }}
            className="w-full py-3 rounded-xl bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition text-xl"
          >Onayla ve Öde</button>
        </div>
      </div>
    );
  }

  // ---- ANA FORM ----
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-[#19160a] to-[#302811] pt-10 pb-4">
      <section className="w-full max-w-4xl mx-auto rounded-3xl shadow-2xl bg-[#19160a] border border-[#bfa658] px-6 md:px-12 py-14 mt-8 mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-8 text-center font-quicksand shadow-none">
          VIP Rezervasyon Formu
        </h1>
        <form onSubmit={handleSubmit} autoComplete="on" className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* --- FORM ALANLARI --- */}
          {/* ... Tüm field'lar yukarıdaki kodundaki gibi devam ... */}
          {/* (Aynen bırakabilirsin, kodun geri kalanı birebir seninkiyle aynı olacak) */}
          {/* ... */}
        </form>
        {showContract && <MesafeliPopup onClose={() => setShowContract(false)} />}
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
