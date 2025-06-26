"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { vehicles } from "../data/vehicleList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const saatler = [
  "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
  "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
];

const segmentOptions = [
  { key: "Ekonomik", label: "Ekonomik (Standart Konfor)" },
  { key: "Lüks", label: "Lüks (Premium Sınıf)" },
  { key: "Prime+", label: "Prime+ (Ultra Lüks)" }
];

function normalize(str) {
  return (str || "")
    .toLowerCase()
    .replace(/&/g, "ve")
    .replace(/[,\.]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isAirport(str) {
  if (!str) return false;
  str = str.toLowerCase();
  return (
    str.includes("havaalan") ||
    str.includes("havaliman") ||
    str.includes("airport")
  );
}

export default function VipTransferForm() {
  const router = useRouter();
  const params = useSearchParams();

  // ---- INITIAL STATE ----
  const [from, setFrom] = useState(params.get("from") || "");
  const [to, setTo] = useState(params.get("to") || "");
  const [segment, setSegment] = useState(params.get("segment") || "");
  const [people, setPeople] = useState(Number(params.get("people")) || 1);
  const [transfer, setTransfer] = useState(params.get("transfer") || "");
  const [date, setDate] = useState(params.get("date") ? new Date(params.get("date")) : null);
  const [time, setTime] = useState(params.get("time") || "");
  const [pnr, setPnr] = useState(params.get("pnr") || "");

  // LocalStorage - sadece kendi browser'ında, farklı cihazda çalışmaz!
  useEffect(() => {
    const draft = JSON.parse(localStorage.getItem("reservationDraft") || "{}");
    if (!params.get("from") && draft.from) setFrom(draft.from);
    if (!params.get("to") && draft.to) setTo(draft.to);
    if (!params.get("segment") && draft.segment) setSegment(draft.segment);
    if (!params.get("people") && draft.people) setPeople(draft.people);
    if (!params.get("transfer") && draft.transfer) setTransfer(draft.transfer);
    if (!params.get("date") && draft.date) setDate(new Date(draft.date));
    if (!params.get("time") && draft.time) setTime(draft.time);
    if (!params.get("pnr") && draft.pnr) setPnr(draft.pnr);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "reservationDraft",
      JSON.stringify({
        from, to, segment, people, transfer, date: date ? date.toISOString() : "", time, pnr
      })
    );
  }, [from, to, segment, people, transfer, date, time, pnr]);

  // Sayfa reload'da (Ctrl+Shift+R) temizle
  useEffect(() => {
    const onReload = (e) => {
      if (performance.getEntriesByType("navigation")[0].type === "reload") {
        localStorage.removeItem("reservationDraft");
      }
    };
    window.addEventListener("beforeunload", onReload);
    return () => window.removeEventListener("beforeunload", onReload);
  }, []);

  // Araçlar - Sadece segmentteki araçlar listelenir
  const availableVehicles = vehicles.filter(
    v =>
      (!segment || normalize(v.segment) === normalize(segment)) &&
      (!transfer || (v.transferTypes || []).map(normalize).includes(normalize(transfer))) &&
      (!people || (v.max || 1) >= people)
  );

  // --- Takvim Teması ---
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .react-datepicker,
      .react-datepicker__month-container {
        background: #111 !important;
        color: #ffeec2 !important;
        border-radius: 18px !important;
      }
      .react-datepicker__header {
        background: #19160a !important;
        border-bottom: 1px solid #bfa658 !important;
      }
      .react-datepicker__day--selected,
      .react-datepicker__day--keyboard-selected {
        background: #bfa658 !important;
        color: #111 !important;
      }
      .react-datepicker__day {
        border-radius: 6px !important;
      }
      .react-datepicker__day:hover {
        background: #ffeec2 !important;
        color: #111 !important;
      }
      .react-datepicker__current-month,
      .react-datepicker__day-name {
        color: #ffeec2 !important;
      }
      .react-datepicker__day--disabled {
        color: #555 !important;
        background: #222 !important;
      }
      .react-datepicker__triangle { display: none; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // Submit
  function handleSubmit(e) {
    e.preventDefault();
    const paramsObj = {
      from, to, segment, people, transfer,
      date: date ? date.toISOString().split("T")[0] : "",
      time, pnr
    };
    router.push(`/rezervasyon?${Object.entries(paramsObj).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("&")}`);
  }

  // Araç kutusunda segmentteki araçlar tek kutuda gösterilecek
  let vehicleLabel = "";
  if (segment && availableVehicles.length > 0) {
    vehicleLabel = availableVehicles.map(v => v.label).join(" / ");
  }

  // ---- TASARIM (KVKK ile birebir uyumlu, premium, responsive) ----
  return (
    <form
      className="w-full max-w-[340px] md:max-w-[810px] flex flex-col gap-2 px-2 md:px-6 py-2"
      style={{
        fontFamily: "Quicksand, sans-serif"
      }}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <h2 className="text-3xl font-extrabold text-[#bfa658] tracking-tight mb-1 mt-3 text-center">VIP Rezervasyon Formu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
        <div>
          <label className="text-[#bfa658] font-semibold mb-1 block">Nereden?</label>
          <input
            type="text"
            placeholder="İlçe/Mahalle"
            className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-black/80 text-lg text-white focus:outline-none focus:border-[#ffeec2] transition"
            value={from}
            onChange={e => setFrom(e.target.value)}
          />
        </div>
        <div>
          <label className="text-[#bfa658] font-semibold mb-1 block">Nereye?</label>
          <input
            type="text"
            placeholder="İlçe/Mahalle"
            className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-black/80 text-lg text-white focus:outline-none focus:border-[#ffeec2] transition"
            value={to}
            onChange={e => setTo(e.target.value)}
          />
        </div>
        <div>
          <label className="text-[#bfa658] font-semibold mb-1 block">Araç Sınıfı</label>
          <select
            className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-black/80 text-lg text-white"
            value={segment}
            onChange={e => { setSegment(e.target.value); }}
          >
            <option value="">Araç Sınıfı Seçin</option>
            {segmentOptions.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[#bfa658] font-semibold mb-1 block">Kişi Sayısı</label>
          <select
            className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-black/80 text-lg text-white"
            value={people}
            onChange={e => setPeople(Number(e.target.value))}
          >
            {Array.from({ length: 24 }, (_, i) => i + 1).map(val =>
              <option key={val} value={val}>{val}</option>
            )}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="text-[#bfa658] font-semibold mb-1 block">Transfer Türü</label>
          <select
            className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-black/80 text-lg text-white"
            value={transfer}
            onChange={e => setTransfer(e.target.value)}
          >
            <option value="">Transfer Türü Seç</option>
            <option value="VIP Havalimanı Transferi">VIP Havalimanı Transferi</option>
            <option value="Şehirler Arası Transfer">Şehirler Arası Transfer</option>
            <option value="Özel Etkinlik">Özel Etkinlik</option>
            <option value="Kurumsal Etkinlik">Kurumsal Etkinlik</option>
            <option value="Tur & Gezi">Tur & Gezi</option>
            <option value="Toplu Transfer">Toplu Transfer</option>
            <option value="Düğün vb Organizasyonlar">Düğün vb Organizasyonlar</option>
          </select>
        </div>
        {/* Araçlar - Tüm segment araçları gösteriliyor, seçilemiyor */}
        <div className="md:col-span-2">
          <label className="text-[#bfa658] font-semibold mb-1 block">Araçlar</label>
          <input
            className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-black/80 text-lg text-[#ffeec2] font-bold cursor-not-allowed"
            value={vehicleLabel || ""}
            disabled
            readOnly
          />
          {segment && (
            <div className="text-xs text-[#ffeec2] mt-1">
              Seçtiğiniz sınıfa uygun araçlardan biri otomatik atanacaktır.
            </div>
          )}
        </div>
        {/* Tarih ve Saat yan yana */}
        <div>
          <label className="text-[#bfa658] font-semibold mb-1 block">Tarih</label>
          <DatePicker
            selected={date}
            onChange={date => setDate(date)}
            dateFormat="dd.MM.yyyy"
            minDate={new Date()}
            placeholderText="Tarih Seç"
            className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-black/80 text-lg text-white focus:outline-none focus:border-[#ffeec2]"
            calendarClassName="bg-black text-white"
            popperPlacement="bottom"
          />
        </div>
        <div>
          <label className="text-[#bfa658] font-semibold mb-1 block">Saat</label>
          <select
            className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-black/80 text-lg text-white"
            value={time}
            onChange={e => setTime(e.target.value)}
          >
            <option value="">Saat seç</option>
            {saatler.map((saat, i) => (
              <option key={i} value={saat}>{saat}</option>
            ))}
          </select>
        </div>
        {/* PNR - Koşullu gösterim */}
        {(transfer.includes("Havalimanı") || isAirport(from) || isAirport(to)) && (
          <div className="md:col-span-2">
            <label className="text-[#bfa658] font-semibold mb-1 block">PNR / Uçuş Kodu</label>
            <input
              type="text"
              placeholder="Uçuş Rezervasyon Kodu (PNR)"
              className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-black/80 text-lg text-white focus:outline-none"
              value={pnr}
              onChange={e => setPnr(e.target.value)}
            />
          </div>
        )}
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-8 rounded-xl w-full text-xl shadow hover:scale-105 transition mt-3"
      >
        Transfer Planla
      </button>
    </form>
  );
}
