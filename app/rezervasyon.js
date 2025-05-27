"use client";
import { useState } from "react";
import FiyatGoster from "./fiyatgoster";
import Harita from "./harita";
import locations from "../data/locations.json"; // Kendi dizinine göre kontrol et

// Mapbox Token (kendi dashboardundan al!)
const MAPBOX_TOKEN = "BURAYA_KENDI_MAPBOX_TOKENINI_YAPISTIR";

function LocationAutocomplete({ label, value, onChange }) {
  const [input, setInput] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const havalimaniList = [
    "İstanbul Havalimanı", "Sabiha Gökçen Havalimanı", "Esenboğa Havalimanı",
    "Antalya Havalimanı", "Adnan Menderes Havalimanı", "Dalaman Havalimanı"
  ];
  function handleInput(e) {
    const val = e.target.value;
    setInput(val);
    if (val.length < 2) return setSuggestions([]);
    const all = [];
    locations.forEach(ilObj => {
      if (ilObj.il.toLowerCase().includes(val.toLowerCase())) all.push(ilObj.il);
      ilObj.ilceler.forEach(ilceObj => {
        if (ilceObj.ilce.toLowerCase().includes(val.toLowerCase())) all.push(`${ilObj.il} / ${ilceObj.ilce}`);
        ilceObj.mahalleler.forEach(m => {
          if (m.toLowerCase().includes(val.toLowerCase())) all.push(`${ilObj.il} / ${ilceObj.ilce} / ${m}`);
        });
      });
    });
    havalimaniList.forEach(hav => {
      if (hav.toLowerCase().includes(val.toLowerCase())) all.push(hav);
    });
    setSuggestions(all.slice(0, 8));
  }
  function selectOption(opt) {
    setInput(opt);
    setSuggestions([]);
    if (onChange) onChange(opt);
  }
  return (
    <div className="w-full relative">
      <label className="font-semibold mb-1 text-gold block">{label}</label>
      <input
        className="w-full px-3 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-gold text-black"
        value={input}
        onChange={handleInput}
        placeholder="İl / ilçe / mahalle / havalimanı"
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <ul className="bg-white text-black border border-gold rounded-xl mt-1 z-40 shadow max-h-56 overflow-auto absolute w-full">
          {suggestions.map((s, i) => (
            <li key={i} className="p-2 hover:bg-gold/40 cursor-pointer" onClick={() => selectOption(s)}>
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function RezervasyonPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [mesafe, setMesafe] = useState(null);
  const [aracTip, setAracTip] = useState("VIP Vito");
  const [fiyat, setFiyat] = useState(null);

  // Mesafe değiştiğinde fiyatı otomatik hesapla
  function hesaplaFiyat(km) {
    // Örnek fiyatlandırma: ilk 20 km 1500 TL, sonrası km başı 25 TL (VIP Vito)
    // İleride araç tipine göre değişir, çarpan eklenir
    let tl = 1500;
    if (km > 20) tl += (km - 20) * 25;
    if (aracTip === "Maybach") tl *= 1.7;
    if (aracTip === "Ekonomik") tl *= 0.7;
    if (aracTip === "Dron Transfer") tl *= 2.0;
    setFiyat(Math.round(tl));
  }

  // Haritadan gelen mesafe km olarak
  function handleMesafe(m) {
    setMesafe(m);
    hesaplaFiyat(m);
  }

  return (
    <main className="min-h-[90vh] flex flex-col items-center bg-black/20 pt-8 pb-10">
      <section className="w-full max-w-2xl bg-black/80 rounded-2xl shadow-lg px-8 py-8 border border-gold mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gold mb-7 text-center">VIP Transfer Rezervasyonu</h1>
        <div className="flex flex-col gap-5">
          <LocationAutocomplete label="Nereden" value={from} onChange={setFrom} />
          <LocationAutocomplete label="Nereye" value={to} onChange={setTo} />
          <div>
            <label className="font-semibold text-gold mr-3">Araç Seçimi:</label>
            <select className="px-3 py-2 rounded-lg border" value={aracTip} onChange={e => setAracTip(e.target.value)}>
              <option>VIP Vito</option>
              <option>Maybach</option>
              <option>Ekonomik</option>
              <option>Dron Transfer</option>
            </select>
          </div>
        </div>
      </section>
      {/* Harita ve mesafe */}
      <section className="w-full max-w-2xl">
        {(from && to) && (
          <Harita from={from} to={to} token={MAPBOX_TOKEN} onMesafe={handleMesafe} />
        )}
      </section>
      {/* Fiyat gösterimi */}
      {fiyat && (
        <section className="w-full max-w-2xl mt-8 flex flex-col items-center">
          <FiyatGoster tlTutar={fiyat} />
        </section>
      )}
    </main>
  );
}
