"use client";
import { useState, useEffect } from "react";
import { vehicles } from "../data/vehicles";
import { extrasList } from "../data/extras";
import { rotarList } from "../data/rotarOptions";
import RezSummaryPopup from "./RezSummaryPopup";

const saatler = [ ... ]; // Tüm saatler aynen kalsın

const ADRES_PATH = "/addresses/il-ilce-mahalle-sokak.json"; // path doğruysa sorun yok

export default function VipTransferForm() {
  // --- AUTOCOMPLETE STATE ---
  const [adresler, setAdresler] = useState([]);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  // SENİN STATE’LERİN AYNEN KALIYOR
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vehicle, setVehicle] = useState(vehicles[0]?.value || "");
  const [people, setPeople] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [rotar, setRotar] = useState(rotarList[0]?.label || "");
  const [showPopup, setShowPopup] = useState(false);

  // Havalimanı mı kontrolü
  const isAirport =
    from.toLowerCase().includes("hava") ||
    to.toLowerCase().includes("hava");
  const [ucusNo, setUcusNo] = useState("");

  // Ekstra seçme
  const toggleExtra = (key) => {
    setSelectedExtras((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    );
  };

  const maxPeople = vehicles.find((v) => v.value === vehicle)?.max || 10;

  // AUTOCOMPLETE JSON YÜKLE
  useEffect(() => {
    fetch(ADRES_PATH)
      .then(r => r.json())
      .then(d => setAdresler(d));
  }, []);

  // AUTOCOMPLETE FILTER
  function autocompleteAdres(val) {
    if (!val || val.length < 2) return [];
    return adresler
      .filter(a =>
        a.toLowerCase().includes(val.toLowerCase())
      )
      .slice(0, 8);
  }

  useEffect(() => {
    setFromSuggestions(autocompleteAdres(from));
  }, [from, adresler]);
  useEffect(() => {
    setToSuggestions(autocompleteAdres(to));
  }, [to, adresler]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isAirport && !ucusNo) {
      alert("Havalimanı transferlerinde uçuş/Pnr numarası girilmelidir.");
      return;
    }
    setShowPopup(true);
  }

  return (
    <>
      <form className="w-full max-w-3xl mx-auto bg-black/80 rounded-2xl shadow-lg px-8 py-6 border border-gold mt-8" onSubmit={handleSubmit}>
        <div className="flex gap-2 mb-2">
          {/* AUTOCOMPLETE FROM */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Nereden?"
              className="input w-full"
              value={from}
              onChange={e => setFrom(e.target.value)}
              autoComplete="off"
            />
            {fromSuggestions.length > 0 && (
              <ul className="bg-white border mt-1 rounded shadow absolute z-50 w-full text-black">
                {fromSuggestions.map((t, i) => (
                  <li
                    key={i}
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setFrom(t)}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* AUTOCOMPLETE TO */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Nereye?"
              className="input w-full"
              value={to}
              onChange={e => setTo(e.target.value)}
              autoComplete="off"
            />
            {toSuggestions.length > 0 && (
              <ul className="bg-white border mt-1 rounded shadow absolute z-50 w-full text-black">
                {toSuggestions.map((t, i) => (
                  <li
                    key={i}
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setTo(t)}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Kalan senin kodun AYNEN */}
        <div className="flex gap-2 mb-2">
          <input
            type="date"
            className="input"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <select
            className="input"
            value={time}
            onChange={e => setTime(e.target.value)}
          >
            <option value="">Saat</option>
            {saatler.map((saat, i) => (
              <option key={i} value={saat}>{saat}</option>
            ))}
          </select>
          <select
            className="input"
            value={vehicle}
            onChange={e => setVehicle(e.target.value)}
          >
            {vehicles.map((v, i) =>
              <option key={i} value={v.value}>{v.label}</option>
            )}
          </select>
          <select
            className="input"
            value={people}
            onChange={e => setPeople(Number(e.target.value))}
          >
            {[...Array(maxPeople).keys()].map(i =>
              <option key={i + 1} value={i + 1}>{i + 1} Kişi</option>
            )}
          </select>
        </div>

        {isAirport && (
          <div className="mb-2">
            <input
              type="text"
              className="input"
              value={ucusNo}
              onChange={e => setUcusNo(e.target.value)}
              placeholder="Uçuş/Pnr Numarası"
              required
            />
          </div>
        )}

        {/* Ekstralar */}
        <div className="flex flex-wrap gap-3 mb-2">
          {extrasList.map(item => (
            <label key={item.key} className={`flex items-center gap-1 px-2 py-1 rounded-lg border border-gray-600 cursor-pointer ${selectedExtras.includes(item.key) ? "bg-gold text-black" : "bg-black text-white"}`}>
              <input
                type="checkbox"
                className="mr-1"
                checked={selectedExtras.includes(item.key)}
                onChange={() => toggleExtra(item.key)}
              />
              <span className="text-base">{item.icon} {item.label} <span className="text-xs">(+{item.price}₺)</span></span>
            </label>
          ))}
        </div>

        {/* Rötar Garantisi */}
        <div className="mb-3">
          <label className="font-bold text-sm">Rötar Garantisi:</label>
          <select className="input mt-1" value={rotar} onChange={e => setRotar(e.target.value)}>
            {rotarList.map(opt => (
              <option key={opt.label} value={opt.label}>{opt.label} {opt.price > 0 ? `(+${opt.price}₺)` : ""}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-gold text-black font-bold py-3 rounded-xl mt-2 w-full text-lg"
        >
          Fiyatı Gör
        </button>
      </form>

      {/* Rezervasyon Özeti Popup */}
      <RezSummaryPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        info={{
          from, to, date, time,
          vehicle: vehicles.find(v => v.value === vehicle)?.label,
          people,
          selectedExtras,
          rotar,
          ucusNo
        }}
      />
    </>
  );
}
