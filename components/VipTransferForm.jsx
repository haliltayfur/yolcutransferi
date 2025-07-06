// === Dosya: /components/VipTransferForm.jsx ===

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// 15 dakikalık saatler
const saatler = [];
for (let h = 0; h < 24; ++h)
  for (let m of [0, 15, 30, 45]) saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);

function isAirport(str) {
  if (!str) return false;
  return /havalimanı|airport|uçuş/i.test(str);
}

export default function VipTransferForm() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [people, setPeople] = useState("");
  const [segment, setSegment] = useState("");
  const [transfer, setTransfer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pnr, setPnr] = useState("");
  const [errors, setErrors] = useState({});

  // PNR alanı, havalimanı içeren herhangi bir durumda görünür
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
    const params = new URLSearchParams({ from, to, people, segment, transfer, date, time, pnr });
    router.push(`/rezervasyon?${params.toString()}`);
  }

  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center"
      style={{
        maxWidth: 680,
        minWidth: 320,
        margin: "0 auto",
        height: "100%",
        minHeight: 400,
        boxSizing: "border-box"
      }}
    >
      <div
        className="border border-[#bfa658] rounded-2xl"
        style={{
          width: "100%",
          height: "100%",
          padding: 10, // 10px padding ile içeride form tam ortada
          boxSizing: "border-box",
          background: "rgba(25,22,10,0.98)"
        }}
      >
        <form
          onSubmit={handleSubmit}
          autoComplete="on"
          className="w-full h-full flex flex-col justify-center items-center"
        >
          <div className="w-full mx-auto flex flex-col gap-2">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#bfa658] tracking-tight mb-6 text-center font-quicksand">
              VIP Rezervasyon Formu
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
              <div>
                <label className="font-bold text-[#bfa658] mb-1 block">Nereden?</label>
                <input type="text" value={from} onChange={e => setFrom(e.target.value)}
                  placeholder="Nereden? (İl / Havalimanı / Otel)"
                  className="input w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-lg"
                  autoComplete="address-level2"
                  style={{ fontFamily: "inherit", width: "100%" }}
                />
              </div>
              <div>
                <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
                <input type="text" value={to} onChange={e => setTo(e.target.value)}
                  placeholder="Nereye? (İl / İlçe / Otel)"
                  className="input w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-lg"
                  autoComplete="address-level2"
                  style={{ fontFamily: "inherit", width: "100%" }}
                />
              </div>
              <div>
                <label className="font-bold text-[#bfa658] mb-1 block">Yolcu Sayısı</label>
                <select value={people} onChange={e => setPeople(e.target.value)}
                  className="input w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-lg"
                  style={{ fontFamily: "inherit" }}>
                  <option value="">Seçiniz</option>
                  {Array.from({ length: 24 }, (_, i) => i + 1).map(val =>
                    <option key={val} value={val}>{val}</option>
                  )}
                </select>
              </div>
              <div>
                <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
                <select value={segment} onChange={e => setSegment(e.target.value)}
                  className="input w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-lg"
                  style={{ fontFamily: "inherit" }}>
                  <option value="">Seçiniz</option>
                  <option value="Ekonomik">Ekonomik</option>
                  <option value="Lüks">Lüks</option>
                  <option value="Prime+">Prime+</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-[#bfa658] mb-1 block">Transfer Türü</label>
                <select value={transfer} onChange={e => setTransfer(e.target.value)}
                  className="input w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-lg"
                  style={{ fontFamily: "inherit" }}>
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
              <div style={{ position: "relative" }}>
                <label className="font-bold text-[#bfa658] mb-1 block">Tarih</label>
                <div
                  tabIndex={0}
                  className="input w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-lg cursor-pointer flex items-center"
                  onClick={() => { document.getElementById("date-picker").showPicker(); }}
                  style={{ fontFamily: "inherit", width: "100%" }}
                >
                  <input
                    id="date-picker"
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="bg-transparent border-0 outline-none text-black w-full text-lg"
                    style={{ padding: 0, height: "1.7em" }}
                    tabIndex={-1}
                  />
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
                <div
                  tabIndex={0}
                  className="input w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-lg cursor-pointer flex items-center"
                  onClick={() => document.getElementById("saat-picker").focus()}
                  style={{ fontFamily: "inherit", width: "100%" }}
                >
                  <select
                    id="saat-picker"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="bg-transparent border-0 outline-none text-black w-full text-lg"
                    style={{ padding: 0, height: "1.7em" }}
                    tabIndex={-1}
                  >
                    <option value="">Seçiniz</option>
                    {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
                  </select>
                </div>
              </div>
              {pnrRequired && (
                <div className="md:col-span-2">
                  <label className="font-bold text-[#bfa658] mb-1 block">PNR / Uçuş Kodu</label>
                  <input
                    type="text"
                    value={pnr}
                    onChange={e => setPnr(e.target.value)}
                    placeholder="Uçuş rezervasyon kodu"
                    className="input w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-lg"
                    style={{ fontFamily: "inherit", width: "100%" }}
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 mt-6 rounded-xl text-xl shadow hover:scale-105 transition"
              style={{ fontFamily: "inherit", fontSize: "1.3rem" }}
            >
              Devam Et
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
// === Dosya SONU: /components/VipTransferForm.jsx ===
