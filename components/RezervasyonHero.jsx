// PATH: components/RezervasyonHero.jsx

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Saatler listesi
const saatler = [];
for (let h = 0; h < 24; ++h)
  for (let m of [0, 15, 30, 45]) saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);

function isAirport(str) {
  if (!str) return false;
  return /havalimanı|airport|uçuş/i.test(str);
}

export default function RezervasyonHero() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [people, setPeople] = useState("");
  const [segment, setSegment] = useState("");
  const [transfer, setTransfer] = useState("");
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
    if (!time) err.time = "Saat";
    if (pnrRequired && !pnr) err.pnr = "PNR zorunlu!";
    setErrors(err);
    if (Object.keys(err).length > 0) return;
    const params = new URLSearchParams({ from, to, people, segment, transfer, time, pnr });
    router.push(`/rezervasyon?${params.toString()}`);
  }

  return (
    <section className="w-full flex flex-col items-center bg-black pb-6">
      {/* SLIDER */}
      <div
        className="
          w-full
          max-w-6xl
          mx-auto
          h-[38vw] max-h-[480px] min-h-[160px]
          rounded-2xl
          overflow-hidden
          flex items-center justify-center
          bg-[#19160a]
        "
        style={{ marginTop: 10 }}
      >
        {/* Slider image veya kendi carouselin */}
        <img
          src="/vip-slider.jpg" // Kendi slider görselin
          alt="Slider"
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* Slider üstüne yazı vs koyacaksan burada */}
      </div>

      {/* FORM + VİDEO */}
      <div className="
        w-full
        flex
        flex-col
        items-center
        justify-center
        mt-0
        md:flex-row
        md:justify-between
        md:items-start
        max-w-6xl
        px-0 md:px-2
        gap-7
      ">
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          autoComplete="on"
          className="
            w-full
            mt-[-32px]
            md:mt-[-85px]
            max-w-[430px]
            flex flex-col
            rounded-2xl border border-[#bfa658]
            bg-gradient-to-br from-[#19160a] to-[#282210]
            shadow-2xl px-6 py-8
            md:ml-5
          "
          style={{
            minWidth: 0,
          }}
        >
          <h2 className="text-[#bfa658] text-2xl md:text-3xl font-extrabold mb-5 text-center font-quicksand tracking-tight">
            VIP Rezervasyon Formu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-2">
            <div>
              <label className="font-bold text-[#bfa658] mb-1 block">Nereden?</label>
              <input type="text" value={from} onChange={e => setFrom(e.target.value)}
                placeholder="Nereden? (İl / Havalimanı / Otel)"
                className="w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-base md:text-lg"
                style={{ height: 50 }}
                autoComplete="address-level2"
              />
              {errors.from && <div className="text-red-400 text-xs mt-1">{errors.from}</div>}
            </div>
            <div>
              <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
              <input type="text" value={to} onChange={e => setTo(e.target.value)}
                placeholder="Nereye? (İl / İlçe / Otel)"
                className="w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-base md:text-lg"
                style={{ height: 50 }}
                autoComplete="address-level2"
              />
              {errors.to && <div className="text-red-400 text-xs mt-1">{errors.to}</div>}
            </div>
            <div>
              <label className="font-bold text-[#bfa658] mb-1 block">Yolcu Sayısı</label>
              <select value={people} onChange={e => setPeople(e.target.value)}
                className="w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-base md:text-lg"
                style={{ height: 50 }}>
                <option value="">Seçiniz</option>
                {Array.from({ length: 24 }, (_, i) => i + 1).map(val =>
                  <option key={val} value={val}>{val}</option>
                )}
              </select>
              {errors.people && <div className="text-red-400 text-xs mt-1">{errors.people}</div>}
            </div>
            <div>
              <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
              <select value={segment} onChange={e => setSegment(e.target.value)}
                className="w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-base md:text-lg"
                style={{ height: 50 }}>
                <option value="">Seçiniz</option>
                <option value="Ekonomik">Ekonomik</option>
                <option value="Lüks">Lüks</option>
                <option value="Prime+">Prime+</option>
              </select>
              {errors.segment && <div className="text-red-400 text-xs mt-1">{errors.segment}</div>}
            </div>
            <div>
              <label className="font-bold text-[#bfa658] mb-1 block">Transfer Türü</label>
              <select value={transfer} onChange={e => setTransfer(e.target.value)}
                className="w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-base md:text-lg"
                style={{ height: 50 }}>
                <option value="">Seçiniz</option>
                <option value="VIP Havalimanı Transferi">VIP Havalimanı Transferi</option>
                <option value="Şehirler Arası Transfer">Şehirler Arası Transfer</option>
                <option value="Kurumsal Etkinlik">Kurumsal Etkinlik</option>
                <option value="Özel Etkinlik">Özel Etkinlik</option>
                <option value="Tur & Gezi">Tur & Gezi</option>
                <option value="Toplu Transfer">Toplu Transfer</option>
                <option value="Düğün vb Organizasyonlar">Düğün vb Organizasyonlar</option>
              </select>
              {errors.transfer && <div className="text-red-400 text-xs mt-1">{errors.transfer}</div>}
            </div>
            <div>
              <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
              <select
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-base md:text-lg"
                style={{ height: 50 }}
              >
                <option value="">Seçiniz</option>
                {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
              </select>
              {errors.time && <div className="text-red-400 text-xs mt-1">{errors.time}</div>}
            </div>
            <div>
              <label className="font-bold text-[#bfa658] mb-1 block">PNR / Uçuş Kodu</label>
              <input
                type="text"
                value={pnr}
                onChange={e => setPnr(e.target.value)}
                placeholder="Uçuş rezervasyon kodu"
                className="w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-base md:text-lg"
                style={{ height: 50 }}
              />
              {errors.pnr && <div className="text-red-400 text-xs mt-1">{errors.pnr}</div>}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 mt-4 rounded-xl text-xl shadow hover:scale-105 transition"
            style={{ fontSize: "1.3rem" }}
          >
            Devam Et
          </button>
        </form>

        {/* VİDEO - SADECE MASAÜSTÜNDE */}
        <div className="hidden md:flex flex-1 justify-center items-start">
          <video
            src="/vip-lady.mp4" // Dosya adını güncelle
            poster="/vip-lady.jpg"
            controls
            className="rounded-2xl shadow-2xl border border-[#bfa658] bg-black w-full max-w-[370px] h-[350px] object-cover mt-0"
            style={{
              minWidth: 220,
              marginLeft: 0,
              marginRight: 0,
              alignSelf: "flex-start"
            }}
          />
        </div>
      </div>
    </section>
  );
}
