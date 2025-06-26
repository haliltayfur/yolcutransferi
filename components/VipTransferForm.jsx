"use client";
import { useState, useEffect, useRef } from "react";
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
  { value: "Ekonomik", label: "Ekonomik (Standart Konfor)" },
  { value: "Lüks", label: "Lüks (VIP / Ekstra Konfor)" },
  { value: "Prime+", label: "Prime+ (Ultra Lüks)" }
];

function normalize(str) {
  return (str || "")
    .toLowerCase()
    .replace(/&/g, "ve")
    .replace(/[,\.]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function VipTransferForm() {
  const router = useRouter();
  const params = useSearchParams();

  // PARAMS'tan okuma (sayfalar arası tutarlılık)
  const [from, setFrom] = useState(params.get("from") || "");
  const [to, setTo] = useState(params.get("to") || "");
  const [segment, setSegment] = useState(params.get("segment") || "Ekonomik");
  const [people, setPeople] = useState(Number(params.get("people")) || 1);
  const [transfer, setTransfer] = useState(params.get("transfer") || "");
  const [date, setDate] = useState(params.get("date") ? new Date(params.get("date")) : null);
  const [time, setTime] = useState(params.get("time") || "");
  const [error, setError] = useState("");

  // Araçlar sadece segment ve kişi sayısına göre otomatik atanacak (model seçilmiyor)
  const filteredVehicles = vehicles.filter(v =>
    normalize(v.segment) === normalize(segment) && (v.max || 1) >= people
  );

  // Form submit
  function handleSubmit(e) {
    e.preventDefault();
    if (!from || !to || !segment || !transfer || !date || !time) {
      setError("Lütfen tüm alanları eksiksiz doldurun.");
      return;
    }
    setError("");
    const params = new URLSearchParams({
      from, to, segment, people, transfer,
      date: date.toISOString().split("T")[0], time
    }).toString();
    router.push(`/rezervasyon?${params}`);
  }

  // Ana form stili
  return (
    <form
      className="w-full max-w-[340px] md:max-w-[810px] h-[600px] md:h-[600px] flex flex-col justify-center px-4 md:px-8 py-8
                 border border-[#bfa658] rounded-2xl bg-black/80 shadow-2xl"
      style={{ fontFamily: "Quicksand, sans-serif" }}
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl md:text-3xl font-extrabold text-[#bfa658] tracking-tight mb-8 text-center">
        VIP Rezervasyon Formu
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        <div>
          <label className="text-[#bfa658] font-semibold mb-1 block">Nereden?</label>
          <input
            type="text"
            className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-transparent text-lg text-white focus:outline-none"
            value={from}
            onChange={e => setFrom(e.target.value)}
            placeholder="İlçe/Mahalle"
            autoComplete="off"
          />
        </div>
        <div>
          <label className="text-[#bfa658] font-semibold mb-1 block">Nereye?</label>
          <input
            type="text"
            className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-transparent text-lg text-white focus:outline-none"
            value={to}
            onChange={e => setTo(e.target.value)}
            placeholder="İlçe/Mahalle"
            autoComplete="off"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div>
          <label className="text-[#bfa658] font-semibold mb-1 block">Araç Sınıfı</label>
          <select
            className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-transparent text-lg text-white"
            value={segment}
            onChange={e => setSegment(e.target.value)}
          >
            {segmentOptions.map(opt =>
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            )}
          </select>
        </div>
        <div>
          <label className="text-[#bfa658] font-semibold mb-1 block">Kişi Sayısı</label>
          <select
            className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-transparent text-lg text-white"
            value={people}
            onChange={e => setPeople(Number(e.target.value))}
          >
            {Array.from({ length: 24 }, (_, i) => i + 1).map(val =>
              <option key={val} value={val}>{val}</option>
            )}
          </select>
        </div>
      </div>
      <div className="mb-2">
        <label className="text-[#bfa658] font-semibold mb-1 block">Transfer Türü</label>
        <select
          className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-transparent text-lg text-white"
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="text-[#bfa658] font-semibold mb-1 block">Araç</label>
          <div className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-black/40 text-lg text-white min-h-[46px] flex items-center">
            {
              filteredVehicles.length
                ? <span>{filteredVehicles[0].label}</span>
                : <span className="text-gray-400">Uygun araç yok</span>
            }
          </div>
          <div className="text-xs text-[#ffeec2] mt-1">
            Seçtiğiniz sınıfta uygun bir araç atanacaktır.
          </div>
        </div>
        <div>
          <label className="text-[#bfa658] font-semibold mb-1 block">Tarih</label>
          <DatePicker
            selected={date}
            onChange={date => setDate(date)}
            dateFormat="dd.MM.yyyy"
            minDate={new Date()}
            placeholderText="Tarih Seç"
            className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-black/80 text-lg text-white focus:outline-none"
            calendarClassName="!bg-black !text-white"
            popperPlacement="bottom"
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label className="text-[#bfa658] font-semibold mb-1 block">Saat</label>
          <select
            className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-transparent text-lg text-white"
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
      {error && <div className="text-red-400 text-center mb-2">{error}</div>}
      <button
        type="submit"
        className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-8 rounded-xl w-full text-xl shadow hover:scale-105 transition mt-2"
      >
        Transfer Planla
      </button>
    </form>
  );
}
