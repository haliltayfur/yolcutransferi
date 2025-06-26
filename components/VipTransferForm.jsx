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

function normalize(str) {
  return (str || "")
    .toLowerCase()
    .replace(/&/g, "ve")
    .replace(/[,\.]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function RezervasyonForm() {
  const router = useRouter();
  const params = useSearchParams();

  const [segment, setSegment] = useState(params.get("segment") || "");
  const [transfer, setTransfer] = useState(params.get("transfer") || "");
  const [from, setFrom] = useState(params.get("from") || "");
  const [to, setTo] = useState(params.get("to") || "");
  const [date, setDate] = useState(params.get("date") ? new Date(params.get("date")) : null);
  const [time, setTime] = useState(params.get("time") || "");
  const [vehicle, setVehicle] = useState("");
  const [people, setPeople] = useState(1);

  useEffect(() => {
    const draft = JSON.parse(localStorage.getItem("reservationDraft") || "{}");
    if (!params.get("from") && draft.from) setFrom(draft.from);
    if (!params.get("to") && draft.to) setTo(draft.to);
    if (!params.get("date") && draft.date) setDate(new Date(draft.date));
    if (!params.get("time") && draft.time) setTime(draft.time);
    if (!params.get("vehicle") && draft.vehicle) setVehicle(draft.vehicle);
    if (!params.get("people") && draft.people) setPeople(draft.people);
    if (!params.get("segment") && draft.segment) setSegment(draft.segment);
    if (!params.get("transfer") && draft.transfer) setTransfer(draft.transfer);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "reservationDraft",
      JSON.stringify({
        from,
        to,
        date: date ? date.toISOString() : "",
        time,
        vehicle,
        people,
        segment,
        transfer
      })
    );
  }, [from, to, date, time, vehicle, people, segment, transfer]);

  const availableVehicles = vehicles.filter(v => {
    if (segment && normalize(v.segment) !== normalize(segment)) return false;
    if (people && v.max < people) return false;
    if (transfer) {
      const transferNorm = normalize(transfer);
      const arr = (v.transferTypes || []).map(normalize);
      if (!arr.includes(transferNorm)) return false;
    }
    return true;
  });

  useEffect(() => {
    setVehicle("");
    setPeople(1);
  }, [segment, transfer]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!from || !to || !date || !time || !vehicle) {
      alert("Lütfen tüm alanları eksiksiz doldurun.");
      return;
    }
    const params = new URLSearchParams({
      from, to, date: date.toISOString().split("T")[0], time, vehicle, people, segment, transfer
    }).toString();
    router.push(`/rezervasyon?${params}`);
  }

  return (
    <form
      className="w-full max-w-xl mx-auto rounded-2xl border border-[#bfa658] shadow-2xl bg-black/90 px-8 py-10
      flex flex-col gap-4"
      style={{
        fontFamily: "Quicksand, sans-serif",
        minWidth: "300px",
        background: "linear-gradient(135deg, #1a1813 80%, #302811 100%)"
      }}
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-6 text-center"
        style={{ letterSpacing: ".02em" }}>
        VIP Rezervasyon Formu
      </h2>

      <div className="flex flex-col gap-3">
        <label className="text-[#bfa658] font-semibold">Nereden?</label>
        <input
          type="text"
          placeholder="İl / İlçe / Mahalle / Sokak"
          className="w-full py-3 px-4 rounded-xl bg-black/80 text-lg text-white border border-[#bfa658] focus:outline-none focus:ring-2 focus:ring-[#bfa658]"
          value={from}
          onChange={e => setFrom(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-[#bfa658] font-semibold">Nereye?</label>
        <input
          type="text"
          placeholder="İl / İlçe / Mahalle / Sokak"
          className="w-full py-3 px-4 rounded-xl bg-black/80 text-lg text-white border border-[#bfa658] focus:outline-none focus:ring-2 focus:ring-[#bfa658]"
          value={to}
          onChange={e => setTo(e.target.value)}
        />
      </div>

      <div className="flex flex-row gap-4">
        <div className="flex-1 flex flex-col">
          <label className="text-[#bfa658] font-semibold">Segment</label>
          <select
            className="w-full py-3 px-4 rounded-xl bg-black/80 text-lg text-white border border-[#bfa658]"
            value={segment}
            onChange={e => setSegment(e.target.value)}
          >
            <option value="">Segment Seç</option>
            <option value="Ekonomik">Ekonomik</option>
            <option value="Lüks">Lüks</option>
            <option value="Prime+">Prime+</option>
          </select>
        </div>
        <div className="flex-1 flex flex-col">
          <label className="text-[#bfa658] font-semibold">Transfer Türü</label>
          <select
            className="w-full py-3 px-4 rounded-xl bg-black/80 text-lg text-white border border-[#bfa658]"
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div>
          <label className="text-[#bfa658] font-semibold">Araç</label>
          <select
            className="w-full py-3 px-4 rounded-xl bg-black/80 text-lg text-white border border-[#bfa658]"
            value={vehicle}
            onChange={e => setVehicle(e.target.value)}
          >
            <option value="">Araç Seç</option>
            {availableVehicles.map((v, i) => (
              <option key={i} value={v.value}>{v.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[#bfa658] font-semibold">Kişi</label>
          <select
            className="w-full py-3 px-4 rounded-xl bg-black/80 text-lg text-white border border-[#bfa658]"
            value={people}
            onChange={e => setPeople(Number(e.target.value))}
          >
            {Array.from({ length: 24 }, (_, i) => i + 1).map(val =>
              <option key={val} value={val}>{val}</option>
            )}
          </select>
        </div>
        <div>
          <label className="text-[#bfa658] font-semibold">Tarih</label>
          <DatePicker
            selected={date}
            onChange={date => setDate(date)}
            dateFormat="dd.MM.yyyy"
            minDate={new Date()}
            placeholderText="Tarih Seç"
            className="w-full py-3 px-4 rounded-xl bg-black/80 text-lg text-white border border-[#bfa658] focus:outline-none"
            popperPlacement="bottom"
            calendarClassName="bg-black text-white"
          />
        </div>
        <div>
          <label className="text-[#bfa658] font-semibold">Saat</label>
          <select
            className="w-full py-3 px-4 rounded-xl bg-black/80 text-lg text-white border border-[#bfa658]"
            value={time}
            onChange={e => setTime(e.target.value)}
          >
            <option value="">Saat seç</option>
            {saatler.map((saat, i) => (
              <option key={i} value={saat}>{saat}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-8 rounded-xl w-full text-xl shadow hover:scale-105 transition mt-6"
        style={{
          marginTop: 32,
          letterSpacing: "0.02em",
          boxShadow: "0 4px 24px 0 rgba(191, 166, 88, 0.13)"
        }}
      >
        Transfer Planla
      </button>
    </form>
  );
}
