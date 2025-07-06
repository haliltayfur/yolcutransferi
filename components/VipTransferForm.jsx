// === Dosya: /components/VipTransferForm.jsx ===

"use client";
import { useState } from "react";
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
      className="flex flex-col justify-center items-center w-full h-full"
      style={{
        height: "100%",
        minHeight: 400,
        boxSizing: "border-box",
      }}
    >
      <div
        className="border-2 border-[#bfa658] bg-[rgba(25,22,10,0.98)] flex flex-col justify-center items-center
          rounded-[32px] md:rounded-[32px]"
        style={{
          width: "100%",
          maxWidth: 680,
          margin: "0 auto",
          boxSizing: "border-box",
          padding: 0,
        }}
      >
        <form
          onSubmit={handleSubmit}
          autoComplete="on"
          className="flex flex-col justify-center items-center w-full"
          style={{
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            padding: "26px 22px 14px 22px", // desktopta
          }}
        >
          <h1 className="font-extrabold text-[#bfa658] tracking-tight text-center font-quicksand
            text-[1.7rem] md:text-3xl mb-5 md:mb-6"
            style={{
              marginTop: 2,
              letterSpacing: ".5px",
              lineHeight: "1.18",
            }}
          >
            VIP Rezervasyon Formu
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 w-full"
            style={{
              marginBottom: 10,
            }}>
            <div>
              <label className="font-bold text-[#bfa658] mb-1 block text-[1rem] md:text-[1.08rem]">Nereden?</label>
              <input type="text" value={from} onChange={e => setFrom(e.target.value)}
                placeholder="Nereden? (İl / Havalimanı / Otel)"
                className="input w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-base md:text-lg"
                autoComplete="address-level2"
                style={{ fontFamily: "inherit", width: "100%" }}
              />
            </div>
            <div>
              <label className="font-bold text-[#bfa658] mb-1 block text-[1rem] md:text-[1.08rem]">Nereye?</label>
              <input type="text" value={to} onChange={e => setTo(e.target.value)}
                placeholder="Nereye? (İl / İlçe / Otel)"
                className="input w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-base md:text-lg"
                autoComplete="address-level2"
                style={{ fontFamily: "inherit", width: "100%" }}
              />
            </div>
            <div>
              <label className="font-bold text-[#bfa658] mb-1 block text-[1rem] md:text-[1.08rem]">Yolcu Sayısı</label>
              <select value={people} onChange={e => setPeople(e.target.value)}
                className="input w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-base md:text-lg"
                style={{ fontFamily: "inherit" }}>
                <option value="">Seçiniz</option>
                {Array.from({ length: 24 }, (_, i) => i + 1).map(val =>
                  <option key={val} value={val}>{val}</option>
                )}
              </select>
            </div>
            <div>
              <label className="font-bold text-[#bfa658] mb-1 block text-[1rem] md:text-[1.08rem]">Segment</label>
              <select value={segment} onChange={e => setSegment(e.target.value)}
                className="input w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-base md:text-lg"
                style={{ fontFamily: "inherit" }}>
                <option value="">Seçiniz</option>
                <option value="Ekonomik">Ekonomik</option>
                <option value="Lüks">Lüks</option>
                <option value="Prime+">Prime+</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-[#bfa658] mb-1 block text-[1rem] md:text-[1.08rem]">Transfer Türü</label>
              <select value={transfer} onChange={e => setTransfer(e.target.value)}
                className="input w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-base md:text-lg"
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
              <label className="font-bold text-[#bfa658] mb-1 block text-[1rem] md:text-[1.08rem]">Tarih</label>
              <div
                tabIndex={0}
                className="input w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-base md:text-lg cursor-pointer flex items-center"
                onClick={() => { document.getElementById("date-picker").showPicker(); }}
                style={{ fontFamily: "inherit", width: "100%" }}
              >
                <input
                  id="date-picker"
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="bg-transparent border-0 outline-none text-black w-full text-base md:text-lg"
                  style={{ padding: 0, height: "1.7em" }}
                  tabIndex={-1}
                />
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <label className="font-bold text-[#bfa658] mb-1 block text-[1rem] md:text-[1.08rem]">Saat</label>
              <div
                tabIndex={0}
                className="input w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-base md:text-lg cursor-pointer flex items-center"
                onClick={() => document.getElementById("saat-picker").focus()}
                style={{ fontFamily: "inherit", width: "100%" }}
              >
                <select
                  id="saat-picker"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className="bg-transparent border-0 outline-none text-black w-full text-base md:text-lg"
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
                <label className="font-bold text-[#bfa658] mb-1 block text-[1rem] md:text-[1.08rem]">PNR / Uçuş Kodu</label>
                <input
                  type="text"
                  value={pnr}
                  onChange={e => setPnr(e.target.value)}
                  placeholder="Uçuş rezervasyon kodu"
                  className="input w-full bg-[#fff] text-black border border-[#bfa658] rounded-xl px-4 py-3 text-base md:text-lg"
                  style={{ fontFamily: "inherit", width: "100%" }}
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 mt-4 rounded-xl text-lg md:text-xl shadow hover:scale-105 transition"
            style={{
              fontFamily: "inherit",
              marginBottom: "2px",
            }}
          >
            Devam Et
          </button>
        </form>
        <style jsx>{`
          @media (max-width: 640px) {
            div[class^='border-2'] {
              max-width: 98vw !important;
              min-width: 0 !important;
              padding: 0 !important;
              border-radius: 20px !important;
            }
            form {
              padding: 14px 6px 8px 6px !important;
              border-radius: 20px !important;
            }
            input, select {
              font-size: 1rem !important;
              padding-top: 12px !important;
              padding-bottom: 12px !important;
            }
            h1 { font-size: 1.15rem !important; }
          }
        `}</style>
      </div>
    </div>
  );
}
// === Dosya SONU: /components/VipTransferForm.jsx ===
