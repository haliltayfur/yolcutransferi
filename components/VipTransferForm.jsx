"use client";
import { useState, useEffect } from "react";

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
const saatler = [];
for (let h = 0; h < 24; ++h)
  for (let m of [0, 15, 30, 45]) saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);

export default function VipTransferForm({ onComplete }) {
  // Otomatik doldurma için localStorage'dan oku
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [people, setPeople] = useState("");
  const [segment, setSegment] = useState("");
  const [transfer, setTransfer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    // Eğer localStorage'da veri varsa, doldur
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("rezFormData");
      if (saved) {
        try {
          const obj = JSON.parse(saved);
          setFrom(obj.from || "");
          setTo(obj.to || "");
          setPeople(obj.people || "");
          setSegment(obj.segment || "");
          setTransfer(obj.transfer || "");
          setDate(obj.date || "");
          setTime(obj.time || "");
        } catch {}
      }
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (onComplete)
      onComplete({ from, to, people, segment, transfer, date, time });
  }

  return (
    <form className="w-full px-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-x-6 gap-y-5 mb-5">
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Nereden?</label>
          <input
            className="w-full h-[52px] rounded-xl px-4 text-base bg-white/95 border border-gray-300 focus:ring-2 focus:ring-[#bfa658] transition text-black placeholder:text-black"
            placeholder="Nereden? İl / İlçe / Mahalle / Havalimanı"
            value={from}
            onChange={e => setFrom(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Nereye?</label>
          <input
            className="w-full h-[52px] rounded-xl px-4 text-base bg-white/95 border border-gray-300 focus:ring-2 focus:ring-[#bfa658] transition text-black placeholder:text-black"
            placeholder="Nereye? İl / İlçe / Mahalle / Havalimanı"
            value={to}
            onChange={e => setTo(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Kişi Sayısı</label>
          <select className="w-full h-[52px] rounded-xl px-4 text-base bg-white/95 border border-gray-300 text-black" value={people} onChange={e => setPeople(e.target.value)}>
            <option value="">Seçiniz</option>
            {Array.from({ length: 24 }, (_, i) => i + 1).map(val => <option key={val} value={val}>{val}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Segment</label>
          <select className="w-full h-[52px] rounded-xl px-4 text-base bg-white/95 border border-gray-300 text-black" value={segment} onChange={e => setSegment(e.target.value)}>
            <option value="">Seçiniz</option>
            {segmentOptions.map(opt => <option key={opt.key} value={opt.label}>{opt.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Transfer Türü</label>
          <select className="w-full h-[52px] rounded-xl px-4 text-base bg-white/95 border border-gray-300 text-black" value={transfer} onChange={e => setTransfer(e.target.value)}>
            <option value="">Seçiniz</option>
            {allTransfers.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-[#bfa658] font-semibold mb-1">Tarih</label>
            <input
              type="date"
              className="w-full h-[52px] rounded-xl px-4 text-base bg-white/95 border border-gray-300 text-black"
              value={date}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="flex-1">
            <label className="block text-[#bfa658] font-semibold mb-1">Saat</label>
            <select className="w-full h-[52px] rounded-xl px-4 text-base bg-white/95 border border-gray-300 text-black" value={time} onChange={e => setTime(e.target.value)}>
              <option value="">Seçiniz</option>
              {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
            </select>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full h-[52px] rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold text-xl shadow hover:scale-105 transition mt-4"
      >
        Devam Et
      </button>
    </form>
  );
}
