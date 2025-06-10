"use client";
import { useState } from "react";
import { extras } from "../data/extras";
import { vehicleList } from "../data/vehicleList";
import { rotarOptions } from "../data/rotarOptions";
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

export default function VipTransferForm(props) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [vehicle, setVehicle] = useState(vehicleList[0]?.type || "");
  const [people, setPeople] = useState("1");
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [rotar, setRotar] = useState(rotarOptions[0].label);
  const [showPopup, setShowPopup] = useState(false);

  // Araç tipine göre kişi seçenekleri
  const maxPeople = vehicleList.find(v => v.type === vehicle)?.max || 4;
  const peopleOptions = Array.from({ length: maxPeople }, (_, i) => (i + 1).toString());

  const handleExtraToggle = (key) => {
    setSelectedExtras((arr) =>
      arr.includes(key) ? arr.filter((e) => e !== key) : [...arr, key]
    );
  };

  // Her kutunun üstünde label
  return (
    <section className="w-full flex justify-center py-10 px-2">
      <div className="bg-[#171717] border border-gold/30 rounded-2xl shadow-xl max-w-3xl w-full px-8 py-8 flex flex-col items-center gap-7">
        <h2 className="text-2xl font-bold text-gold mb-2">VIP Transferinizi Planlayın</h2>
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={e => {
            e.preventDefault();
            setShowPopup(true);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 w-full">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gold font-semibold pl-1 mb-1">Nereden?</label>
              <input className="input" value={from} onChange={e => setFrom(e.target.value)} required placeholder="Nereden?" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gold font-semibold pl-1 mb-1">Nereye?</label>
              <input className="input" value={to} onChange={e => setTo(e.target.value)} required placeholder="Nereye?" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gold font-semibold pl-1 mb-1">Tarih</label>
              <input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gold font-semibold pl-1 mb-1">Saat</label>
              <select className="input" value={time} onChange={e => setTime(e.target.value)} required>
                {saatler.map(saat => (
                  <option key={saat} value={saat}>{saat}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gold font-semibold pl-1 mb-1">Araç Tipi</label>
              <select className="input" value={vehicle} onChange={e => setVehicle(e.target.value)} required>
                {vehicleList.map(v => (
                  <option key={v.type} value={v.type}>{v.type}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gold font-semibold pl-1 mb-1">Yolcu Sayısı</label>
              <select className="input" value={people} onChange={e => setPeople(e.target.value)} required>
                {peopleOptions.map((n) => (
                  <option key={n} value={n}>{n} Kişi</option>
                ))}
              </select>
            </div>
          </div>
          {/* Ekstralar */}
          <div className="w-full flex flex-wrap gap-3 justify-center mt-3">
            {extras.map(extra => (
              <button
                type="button"
                key={extra.key}
                className={`flex items-center gap-2 border rounded-xl px-4 py-2 text-sm font-semibold transition 
                  ${selectedExtras.includes(extra.key)
                  ? "bg-gold text-black border-gold shadow"
                  : "bg-[#1a1a1a] text-gold border-gold/40 hover:border-gold/90 hover:bg-[#222]"
                  }`}
                onClick={() => handleExtraToggle(extra.key)}
                style={{ minWidth: 150, marginBottom: 4 }}
              >
                {extra.icon}
                {extra.label}
              </button>
            ))}
          </div>
          {/* Rotar Garantisi */}
          <div className="flex flex-col gap-1 w-full max-w-xs mx-auto mt-2">
            <label className="text-xs text-gold font-semibold pl-1 mb-1">Rötar Garantisi</label>
            <select className="input" value={rotar} onChange={e => setRotar(e.target.value)}>
              {rotarOptions.map(opt => (
                <option key={opt.label} value={opt.label}>{opt.label}</option>
              ))}
            </select>
          </div>
          {/* Fiyat Gör Butonu */}
          <button type="submit" className="w-full mt-2 bg-gold text-black font-extrabold rounded-xl py-4 text-lg transition hover:bg-yellow-400 shadow-xl">
            Fiyatı Gör
          </button>
        </form>
        {/* REZERVASYON ÖZETİ POPUP */}
        <RezSummaryPopup
          show={showPopup}
          onClose={() => setShowPopup(false)}
          info={{
            from, to, date, time, vehicle, people,
            selectedExtras, rotar
          }}
        />
      </div>
      {/* Tailwind custom input styling */}
      <style jsx global>{`
        .input {
          background: #232323;
          color: #fff;
          border-radius: 0.75rem;
          padding: 0.8rem 1rem;
          border: 1.5px solid #333;
          min-width: 0;
          font-size: 15px;
          outline: none;
        }
        .input:focus {
          border: 1.5px solid #FFD700;
          background: #191919;
        }
      `}</style>
    </section>
  );
}
