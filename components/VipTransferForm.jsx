"use client";
import { useState } from "react";
import { vehicles } from "../data/vehicles";
import { extrasList } from "../data/extras";
import RezSummaryPopup from "./RezSummaryPopup";

const saatler = [
  "00:00", "00:15", "00:30", "00:45",
  "01:00", "01:15", "01:30", "01:45",
  "02:00", "02:15", "02:30", "02:45",
  "03:00", "03:15", "03:30", "03:45",
  "04:00", "04:15", "04:30", "04:45",
  "05:00", "05:15", "05:30", "05:45",
  "06:00", "06:15", "06:30", "06:45",
  "07:00", "07:15", "07:30", "07:45",
  "08:00", "08:15", "08:30", "08:45",
  "09:00", "09:15", "09:30", "09:45",
  "10:00", "10:15", "10:30", "10:45",
  "11:00", "11:15", "11:30", "11:45",
  "12:00", "12:15", "12:30", "12:45",
  "13:00", "13:15", "13:30", "13:45",
  "14:00", "14:15", "14:30", "14:45",
  "15:00", "15:15", "15:30", "15:45",
  "16:00", "16:15", "16:30", "16:45",
  "17:00", "17:15", "17:30", "17:45",
  "18:00", "18:15", "18:30", "18:45",
  "19:00", "19:15", "19:30", "19:45",
  "20:00", "20:15", "20:30", "20:45",
  "21:00", "21:15", "21:30", "21:45",
  "22:00", "22:15", "22:30", "22:45",
  "23:00", "23:15", "23:30", "23:45"
];

export default function VipTransferForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vehicle, setVehicle] = useState(vehicles[0]?.value || "");
  const [people, setPeople] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Araç kişi sınırı
  const maxPeople = vehicles.find((v) => v.value === vehicle)?.max || 10;

  // Ekstra ekleme/çıkarma
  const toggleExtra = key => {
    setSelectedExtras(list =>
      list.includes(key)
        ? list.filter(k => k !== key)
        : [...list, key]
    );
  };

  // Form verisiyle popup aç
  const handleShowPrice = () => {
    if (!from || !to || !date || !time) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }
    setShowPopup(true);
  };

  return (
    <section className="w-full flex flex-col items-center my-6">
      <div className="w-full max-w-2xl bg-black/90 rounded-2xl p-7 shadow-2xl border border-gold">
        {/* Form */}
        <form className="flex flex-col gap-4">
          <div className="flex gap-3 flex-col md:flex-row">
            <input type="text" placeholder="Nereden?" className="input flex-1" value={from} onChange={e => setFrom(e.target.value)} />
            <input type="text" placeholder="Nereye?" className="input flex-1" value={to} onChange={e => setTo(e.target.value)} />
          </div>
          <div className="flex gap-3 flex-col md:flex-row">
            <input type="date" className="input" value={date} onChange={e => setDate(e.target.value)} />
            <select className="input" value={time} onChange={e => setTime(e.target.value)}>
              <option value="">Saat</option>
              {saatler.map((saat, i) => <option key={i} value={saat}>{saat}</option>)}
            </select>
            <select className="input" value={vehicle} onChange={e => setVehicle(e.target.value)}>
              {vehicles.map((v, i) => <option key={i} value={v.value}>{v.label}</option>)}
            </select>
            <select className="input" value={people} onChange={e => setPeople(Number(e.target.value))}>
              {[...Array(maxPeople).keys()].map(i => <option key={i+1} value={i+1}>{i+1} Kişi</option>)}
            </select>
          </div>
          {/* Ekstralar */}
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {extrasList.map(extra => (
              <button
                type="button"
                key={extra.key}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg border font-semibold shadow text-sm transition ${selectedExtras.includes(extra.key) ? "bg-gold text-black border-gold" : "bg-gray-900 text-white border-gray-700 hover:bg-yellow-800"}`}
                onClick={() => toggleExtra(extra.key)}
              >
                {extra.icon} {extra.label}
              </button>
            ))}
          </div>
          {/* Fiyatı Gör Butonu */}
          <button
            type="button"
            className="bg-gold text-black font-bold py-3 rounded-xl mt-3 text-lg w-full hover:bg-yellow-400 transition"
            onClick={handleShowPrice}
          >
            Fiyatı Gör
          </button>
        </form>
      </div>
      {/* Popup */}
      <RezSummaryPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        info={{
          from,
          to,
          date,
          time,
          vehicle: vehicles.find(v => v.value === vehicle)?.label || "",
          people,
          selectedExtras
        }}
      />
    </section>
  );
}
