// === Dosya: app/rezervasyon/RezervasyonForm.jsx ===
"use client";
import { useState } from "react";

const saatler = [];
for (let h = 0; h < 24; ++h)
  for (let m of [0, 15, 30, 45]) saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);

function isAirport(str) {
  if (!str) return false;
  return /havalimanı|airport|uçuş/i.test(str);
}

export default function RezervasyonPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [people, setPeople] = useState("");
  const [segment, setSegment] = useState("");
  const [transfer, setTransfer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pnr, setPnr] = useState("");
  const [errors, setErrors] = useState({});

  const pnrRequired =
    transfer === "VIP Havalimanı Transferi" ||
    isAirport(from) ||
    isAirport(to);

  function handleSubmit(e) {
    e.preventDefault();
    let err = {};
    if (!from) err.from = "Nereden?";
    if (!to) err.to = "Nereye?";
    if (!people) err.people = "Yolcu sayısı";
    if (!segment) err.segment = "Segment";
    if (!transfer) err.transfer = "Transfer türü";
    if (!date) err.date = "Tarih";
    if (!time) err.time = "Saat";
    if (pnrRequired && !pnr) err.pnr = "PNR zorunlu!";
    setErrors(err);
    if (Object.keys(err).length > 0) return;
    // Yönlendirme, API işlemi veya başka bir şey buradan yapılabilir.
  }

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-start pt-2 pb-8">
      {/* Noktalar ve Başlık */}
      <div className="w-full flex flex-col items-center justify-center mt-0">
        {/* Dots (simülasyon, sliderdan kopyalayabilirsin) */}
        <div className="flex justify-center gap-1 mt-0 mb-4" style={{ pointerEvents: "none" }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full ${i === 4 ? "bg-yellow-400" : "bg-yellow-700 opacity-50"}`}
              style={{
                border: "2px solid #fff8",
                boxShadow: i === 4 ? "0 0 8px #FFD700cc" : undefined
              }}
            />
          ))}
        </div>
        <h1 className="font-extrabold text-[#bfa658] tracking-tight text-center text-2xl md:text-3xl mb-3 select-none">
          VIP Rezervasyon Formu
        </h1>
      </div>
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        autoComplete="on"
        className="w-full max-w-[500px] bg-[#19160a] border border-[#bfa658] rounded-3xl shadow-2xl px-3 py-5 flex flex-col gap-3 relative overflow-hidden"
        style={{
          boxSizing: "border-box",
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereden?</label>
            <input type="text" value={from} onChange={e => setFrom(e.target.value)}
              placeholder="Nereden? (İl / Havalimanı / Otel)"
              className="w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-3 py-3 text-base"
              style={{ height: 48 }}
              autoComplete="address-level2"
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
            <input type="text" value={to} onChange={e => setTo(e.target.value)}
              placeholder="Nereye? (İl / İlçe / Otel)"
              className="w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-3 py-3 text-base"
              style={{ height: 48 }}
              autoComplete="address-level2"
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Yolcu Sayısı</label>
            <select value={people} onChange={e => setPeople(e.target.value)}
              className="w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-3 py-3 text-base"
              style={{ height: 48 }}>
              <option value="">Seçiniz</option>
              {Array.from({ length: 24 }, (_, i) => i + 1).map(val =>
                <option key={val} value={val}>{val}</option>
              )}
            </select>
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
            <select value={segment} onChange={e => setSegment(e.target.value)}
              className="w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-3 py-3 text-base"
              style={{ height: 48 }}>
              <option value="">Seçiniz</option>
              <option value="Ekonomik">Ekonomik</option>
              <option value="Lüks">Lüks</option>
              <option value="Prime+">Prime+</option>
            </select>
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Transfer Türü</label>
            <select value={transfer} onChange={e => setTransfer(e.target.value)}
              className="w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-3 py-3 text-base"
              style={{ height: 48 }}>
              <option value="">Seçiniz</option>
              <option value="VIP Havalimanı Transferi">VIP Havalimanı Transferi</option>
              <option value="Şehirler Arası Transfer">Şehirler Arası Transfer</option>
              <option value="Kurumsal Etkinlik">Kurumsal Etkinlik</option>
              <option value="Özel Etkinlik">Özel Etkinlik</option>
              <option value="Tur & Gezi">Tur & Gezi</option>
              <option value="Toplu Transfer">Toplu Transfer</option>
              <option value="Düğün vb Organizasyonlar">Düğün vb Organizasyonlar</option>
            </select>
          </div>
          <div className="flex flex-row gap-x-3">
            <div className="flex-1">
              <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
              <select
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-3 py-3 text-base"
                style={{ height: 48 }}
              >
                <option value="">Seçiniz</option>
                {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="font-bold text-[#bfa658] mb-1 block">PNR / Uçuş Kodu</label>
              <input
                type="text"
                value={pnr}
                onChange={e => setPnr(e.target.value)}
                placeholder="Uçuş rezervasyon kodu"
                className="w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-3 py-3 text-base"
                style={{ height: 48 }}
              />
            </div>
          </div>
        </div>
        {/* Hatalar */}
        {Object.values(errors).length > 0 &&
          <div className="text-red-400 text-sm mt-2">{Object.values(errors).join(" | ")}</div>
        }
        {/* Buton */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-3 mt-2 rounded-xl text-xl shadow hover:scale-105 transition"
          style={{ fontSize: "1.1rem" }}
        >
          Devam Et
        </button>
      </form>
    </div>
  );
}

// === Dosya SONU: app/rezervasyon/RezervasyonForm.jsx ===
