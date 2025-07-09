// PATH: /app/rezervasyon/RezervasyonForm.jsx
"use client";
import React, { useState, useEffect } from "react";
import EkstralarAccordion from "../../data/EkstralarAccordion.jsx";
import { vehicles } from "../../data/vehicleList.js";
import { extrasListByCategory } from "../../data/extrasByCategory.js";
import { useRouter } from "next/navigation";

// Türkçe normalize fonksiyonunu burada da kullan
function normalizeTr(str = "") {
  return str
    .toLocaleLowerCase("tr-TR")
    .replace(/ü/g, "u")
    .replace(/ğ/g, "g")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c");
}

// Adres autocomplete
function useAddressList() {
  const [list, setList] = useState([]);
  useEffect(() => {
    (async () => {
      let arr = [];
      try {
        const txt = await fetch("/dumps/il ilçe mahalle köys.txt").then(r => r.text());
        const airports = await fetch("/dumps/airports.json").then(r => r.json());
        arr = txt
          .split("\n")
          .map(x => x.trim())
          .filter(Boolean)
          .concat((airports || []).map(a => a.name).filter(Boolean));
        setList(arr);
      } catch { setList([]); }
    })();
  }, []);
  return list;
}
function AutoCompleteInput({ value, onChange, placeholder }) {
  const list = useAddressList();
  const [suggest, setSuggest] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!value || value.length < 2) setSuggest([]);
    else {
      const v = normalizeTr(value);
      setSuggest(
        list.filter((item) =>
          normalizeTr(item).includes(v)
        ).slice(0, 12)
      );
    }
  }, [value, list]);
  return (
    <div className="relative">
      <input
        className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl font-semibold"
        value={value}
        onChange={e => { onChange(e.target.value); setShow(true); }}
        placeholder={placeholder}
        autoComplete="off"
        onFocus={() => setShow(true)}
        onBlur={() => setTimeout(() => setShow(false), 130)}
      />
      {show && suggest.length > 0 && (
        <ul className="absolute z-10 bg-[#19160a] border border-[#bfa658] rounded-xl w-full mt-1 text-[#ffeec2] max-h-48 overflow-y-auto shadow-lg">
          {suggest.map(s => (
            <li key={s}
              className="px-3 py-1 hover:bg-[#bfa658] hover:text-black cursor-pointer"
              onClick={() => { onChange(s); setShow(false); }}
            >{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

const saatler = [];
for (let h = 0; h < 24; ++h)
  for (let m of [0, 15, 30, 45]) saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);

// Airport detect
function isAirport(str) {
  if (!str) return false;
  return /havalimanı|airport|uçuş/i.test(normalizeTr(str));
}

// Otomatik dolum için VIP Transfer data çek
function getVipFormData() {
  if (typeof window !== "undefined") {
    try {
      const d = JSON.parse(localStorage.getItem("vipFormData") || "{}");
      return d;
    } catch { return {}; }
  }
  return {};
}

export default function RezervasyonForm() {
  const router = useRouter();

  // Otomatik VIP form datası
  const vip = getVipFormData();

  const [from, setFrom] = useState(vip.from || "");
  const [to, setTo] = useState(vip.to || "");
  const [people, setPeople] = useState(vip.people || "");
  const [segment, setSegment] = useState(vip.segment || "");
  const [transfer, setTransfer] = useState(vip.transfer || "");
  const [date, setDate] = useState(vip.date || "");
  const [time, setTime] = useState(vip.time || "");
  const [pnr, setPnr] = useState(vip.pnr || "");
  const [note, setNote] = useState("");
  const [error, setError] = useState({});

  const showPNR =
    transfer === "VIP Havalimanı Transferi" ||
    isAirport(from) ||
    isAirport(to);

  function handleSubmit(e) {
    e.preventDefault();
    // Basit validasyon
    const err = {};
    if (!from) err.from = "Nereden?";
    if (!to) err.to = "Nereye?";
    if (!people) err.people = "Kişi?";
    if (!segment) err.segment = "Segment?";
    if (!transfer) err.transfer = "Transfer türü?";
    if (!date) err.date = "Tarih?";
    if (!time) err.time = "Saat?";
    setError(err);
    if (Object.keys(err).length > 0) return;
    // Burada rezervasyonu tamamla ya da ödeme yönlendirmesi...
    // Örnek: window.location.href = "/tesekkurler";
  }

  return (
    <section className="w-full max-w-2xl mx-auto rounded-3xl shadow-2xl bg-[#19160a] border-2 border-[#bfa658] px-8 py-10 my-10">
      <h2 className="text-2xl font-extrabold mb-1 text-[#bfa658] text-center">VIP Rezervasyon Formu</h2>
      <div
        className="w-full mx-auto mb-5"
        style={{
          borderBottom: "3px solid #bfa658",
          width: "90%",
          maxWidth: "370px",
          marginBottom: "22px"
        }}
      />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Nereden?</label>
          <AutoCompleteInput value={from} onChange={setFrom} placeholder="Nereden? İl/İlçe/Mahalle/Havalimanı" />
          {error.from && <span className="text-red-500 text-xs">{error.from}</span>}
        </div>
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Nereye?</label>
          <AutoCompleteInput value={to} onChange={setTo} placeholder="Nereye? İl/İlçe/Mahalle/Havalimanı" />
          {error.to && <span className="text-red-500 text-xs">{error.to}</span>}
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-[#bfa658] font-semibold mb-1">Kişi Sayısı</label>
            <select className="w-full h-[44px] rounded-xl px-3 text-base bg-white text-black border border-[#bfa658]" value={people} onChange={e => setPeople(e.target.value)}>
              <option value="">Seçiniz</option>
              {Array.from({ length: 24 }, (_, i) => i + 1).map(val => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
            {error.people && <span className="text-red-500 text-xs">{error.people}</span>}
          </div>
          <div className="flex-1">
            <label className="block text-[#bfa658] font-semibold mb-1">Segment</label>
            <select className="w-full h-[44px] rounded-xl px-3 text-base bg-white text-black border border-[#bfa658]" value={segment} onChange={e => setSegment(e.target.value)}>
              <option value="">Seçiniz</option>
              <option>Ekonomik</option>
              <option>Lüks</option>
              <option>Prime+</option>
            </select>
            {error.segment && <span className="text-red-500 text-xs">{error.segment}</span>}
          </div>
        </div>
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Transfer Türü</label>
          <select className="w-full h-[44px] rounded-xl px-3 text-base bg-white text-black border border-[#bfa658]" value={transfer} onChange={e => setTransfer(e.target.value)}>
            <option value="">Seçiniz</option>
            <option>VIP Havalimanı Transferi</option>
            <option>Şehirler Arası Transfer</option>
            <option>Kurumsal Etkinlik</option>
            <option>Özel Etkinlik</option>
            <option>Tur & Gezi</option>
            <option>Toplu Transfer</option>
            <option>Düğün vb Organizasyonlar</option>
          </select>
          {error.transfer && <span className="text-red-500 text-xs">{error.transfer}</span>}
        </div>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <label className="block text-[#bfa658] font-semibold mb-1">Tarih</label>
            <input
              type="date"
              className="w-full h-[44px] rounded-xl px-3 text-base bg-white text-black border border-[#bfa658] cursor-pointer"
              value={date}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              placeholder="Tarih seçin"
            />
            {!date && (
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                style={{ fontSize: "15px" }}
              >
                Tarih seçin
              </span>
            )}
            {error.date && <span className="text-red-500 text-xs">{error.date}</span>}
          </div>
          <div className="flex-1 relative">
            <label className="block text-[#bfa658] font-semibold mb-1">Saat</label>
            <select
              className="w-full h-[44px] rounded-xl px-3 text-base bg-white text-black border border-[#bfa658] cursor-pointer"
              value={time}
              onChange={e => setTime(e.target.value)}
            >
              <option value="">Saat seçin</option>
              {saatler.map(saat => (
                <option key={saat} value={saat}>{saat}</option>
              ))}
            </select>
            {!time && (
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                style={{ fontSize: "15px" }}
              >
                Saat seçin
              </span>
            )}
            {error.time && <span className="text-red-500 text-xs">{error.time}</span>}
          </div>
        </div>
        {showPNR && (
          <div>
            <label className="block text-[#bfa658] font-semibold mb-1">PNR/Uçuş Kodu</label>
            <input
              type="text"
              className="w-full h-[44px] rounded-xl px-3 text-base bg-white text-black border border-[#bfa658]"
              value={pnr}
              onChange={e => setPnr(e.target.value)}
              placeholder="Uçuş rezervasyon kodu (varsa)"
            />
          </div>
        )}
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Ek Not</label>
          <textarea
            className="w-full h-[44px] rounded-xl px-3 text-base bg-white text-black border border-[#bfa658]"
            rows={2}
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Eklemek istediğiniz bir not var mı?"
          />
        </div>
        <button
          type="submit"
          className="w-[180px] h-[46px] rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold text-lg shadow hover:scale-105 transition self-center"
          style={{ marginTop: "20px" }}
        >
          Devam Et
        </button>
      </form>
    </section>
  );
}
// PATH SONU: /app/rezervasyon/RezervasyonForm.jsx
