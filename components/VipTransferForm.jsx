"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { vehicles } from "../data/vehicles";
import { rotarList } from "../data/rotarOptions";

const saatler = [
  "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
  "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
];

// Türkçe karakter normalize fonksiyonu
const normalize = s => s
  .toLowerCase()
  .replace(/ç/g,"c").replace(/ğ/g,"g").replace(/ı/g,"i")
  .replace(/ö/g,"o").replace(/ş/g,"s").replace(/ü/g,"u")
  .replace(/[\s\-\.]/g,"");

export default function VipTransferForm() {
  const router = useRouter();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vehicle, setVehicle] = useState(vehicles[0]?.value || "");
  const [people, setPeople] = useState(1);
  const [addressList, setAddressList] = useState([]);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const maxPeople = vehicles.find((v) => v.value === vehicle)?.max || 10;

  // ---- YENİ TEK JSON'DAN ADRESLERİ YÜKLE ----
  useEffect(() => {
    fetch("/dumps/adresler.json")
      .then(r => r.json())
      .then(data => {
        // JSON şu yapıda olmalı:
        // { il: "...", ilce: "...", mahalle: "...", sokak: "..." }
        // Tek satırlık gösterim: il/ilçe/mahalle/sokak
        const list = data.map(obj =>
          [obj.il, obj.ilce, obj.mahalle, obj.sokak].filter(Boolean).join(" / ")
        );
        setAddressList([...new Set(list.filter(Boolean))]);
      });
  }, []);

  // AUTOCOMPLETE FONKSİYONU - Türkçe uyumlu
  function getSuggestions(input) {
    if (!input || input.length < 2) return [];
    const q = normalize(input);
    return addressList.filter(item =>
      normalize(item).includes(q)
    ).slice(0, 8);
  }

  useEffect(() => {
    setFromSuggestions(getSuggestions(from));
  }, [from, addressList]);
  useEffect(() => {
    setToSuggestions(getSuggestions(to));
  }, [to, addressList]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!from || !to || !date || !time || !vehicle) {
      alert("Lütfen tüm alanları eksiksiz doldurun.");
      return;
    }
    const params = new URLSearchParams({
      from, to, date, time, vehicle, people
    }).toString();
    router.push(`/rezervasyon?${params}`);
  }

  return (
    <form
      className="w-full max-w-3xl mx-auto bg-black/80 rounded-2xl shadow-lg px-8 py-6 border border-gold mt-8"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col md:flex-row gap-2 mb-2">
        {/* AUTOCOMPLETE FROM */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Nereden? (il/ilçe/mahalle/sokak)"
            className="input w-full"
            value={from}
            onChange={e => setFrom(e.target.value)}
            autoComplete="off"
          />
          {fromSuggestions.length > 0 && (
            <ul className="bg-white border mt-1 rounded shadow absolute z-50 w-full text-black max-h-52 overflow-auto">
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
            placeholder="Nereye? (il/ilçe/mahalle/sokak)"
            className="input w-full"
            value={to}
            onChange={e => setTo(e.target.value)}
            autoComplete="off"
          />
          {toSuggestions.length > 0 && (
            <ul className="bg-white border mt-1 rounded shadow absolute z-50 w-full text-black max-h-52 overflow-auto">
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
        {/* ARAÇ TİPİ */}
        <div className="flex-1 min-w-[130px]">
          <select
            className="input w-full"
            value={vehicle}
            onChange={e => setVehicle(e.target.value)}
          >
            {vehicles.map((v, i) => (
              <option key={i} value={v.value}>{v.label}</option>
            ))}
          </select>
        </div>
        {/* YOLCU SAYISI */}
        <div className="flex-1 min-w-[110px]">
          <select
            className="input w-full"
            value={people}
            onChange={e => setPeople(Number(e.target.value))}
          >
            {Array.from({ length: maxPeople }, (_, i) => i + 1).map(val =>
              <option key={val} value={val}>{val}</option>
            )}
          </select>
        </div>
      </div>
      {/* TARİH & SAAT */}
      <div className="flex gap-2 mb-4">
        <input
          type="date"
          className="input flex-1"
          value={date}
          onChange={e => setDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />
        <select
          className="input flex-1"
          value={time}
          onChange={e => setTime(e.target.value)}
        >
          <option value="">Saat seç</option>
          {saatler.map((saat, i) => (
            <option key={i} value={saat}>{saat}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-3 px-8 rounded-xl mt-2 w-full text-lg shadow hover:scale-105 transition"
      >
        Transfer Planla
      </button>
    </form>
  );
}
