// PATH: components/VipTransferForm.jsx
"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

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
  const dateRef = useRef();

  // PNR alanı (her zaman göster, zorunlu ise kontrol et)
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

  const fieldInput =
    "w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-4 text-lg focus:outline-[#bfa658] transition-all duration-100";

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="on"
      className="w-full h-full flex flex-col justify-center items-center"
    >
      <h1 className="font-extrabold text-[#bfa658] tracking-tight text-center font-quicksand text-2xl md:text-3xl mb-6 md:mb-8">
        VIP Rezervasyon Formu
      </h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-2">
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Nereden?</label>
          <input
            type="text"
            value={from}
            onChange={e => setFrom(e.target.value)}
            placeholder="Nereden? (İl / Havalimanı / Otel)"
            className={fieldInput + " min-w-0"}
            style={{ width: "100%" }}
            autoComplete="address-level2"
          />
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
          <input
            type="text"
            value={to}
            onChange={e => setTo(e.target.value)}
            placeholder="Nereye? (İl / İlçe / Otel)"
            className={fieldInput + " min-w-0"}
            style={{ width: "100%" }}
            autoComplete="address-level2"
          />
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Yolcu Sayısı</label>
          <select
            value={people}
            onChange={e => setPeople(e.target.value)}
            className={fieldInput}
          >
            <option value="">Seçiniz</option>
            {Array.from({ length: 24 }, (_, i) => i + 1).map(val =>
              <option key={val} value={val}>{val}</option>
            )}
          </select>
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
          <select
            value={segment}
            onChange={e => setSegment(e.target.value)}
            className={fieldInput}
          >
            <option value="">Seçiniz</option>
            <option value="Ekonomik">Ekonomik</option>
            <option value="Lüks">Lüks</option>
            <option value="Prime+">Prime+</option>
          </select>
        </div>
        <div>
          <label
            className="font-bold text-[#bfa658] mb-1 block cursor-pointer"
            onClick={() => dateRef.current && dateRef.current.showPicker()}
            htmlFor="rez-date"
          >Tarih</label>
          <input
            ref={dateRef}
            id="rez-date"
            name="date"
            type="date"
            className={fieldInput + " cursor-pointer"}
            value={date}
            onChange={e => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            autoComplete="on"
            style={{ width: "100%" }}
            onClick={e => e.target.showPicker && e.target.showPicker()}
          />
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
          <select
            value={time}
            onChange={e => setTime(e.target.value)}
            className={fieldInput}
          >
            <option value="">Seçiniz</option>
            {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="font-bold text-[#bfa658] mb-1 block">PNR / Uçuş Kodu</label>
          <input
            type="text"
            value={pnr}
            onChange={e => setPnr(e.target.value)}
            placeholder="Uçuş rezervasyon kodu"
            className={fieldInput}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 mt-4 rounded-xl text-xl shadow hover:scale-105 transition"
        style={{
          fontSize: "1.3rem",
        }}
      >
        Devam Et
      </button>
    </form>
  );
}
