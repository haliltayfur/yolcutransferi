"use client";
import { useState, useEffect } from "react";
import { vehicles } from "../data/vehicles";
import { extrasList } from "../data/extras";
import { rotarList } from "../data/rotarOptions";
import RezSummaryPopup from "./RezSummaryPopup";

const saatler = [ /* ... senin saat array’in ... */ ];

export default function VipTransferForm() {
  // Diğer stateler aynı
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vehicle, setVehicle] = useState(vehicles[0]?.value || "");
  const [people, setPeople] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [rotar, setRotar] = useState(rotarList[0]?.label || "");
  const [showPopup, setShowPopup] = useState(false);
  const [ucusNo, setUcusNo] = useState("");

  // AUTOCOMPLETE stateleri
  const [addressList, setAddressList] = useState([]);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  // Havalimanı mı kontrolü
  const isAirport =
    from.toLowerCase().includes("hava") ||
    from.toLowerCase().match(/\b[a-z]{3}\b/) || // iata kodu yazılırsa da
    to.toLowerCase().includes("hava") ||
    to.toLowerCase().match(/\b[a-z]{3}\b/);

  // Ekstra seçme
  const toggleExtra = (key) => {
    setSelectedExtras((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    );
  };

  const maxPeople = vehicles.find((v) => v.value === vehicle)?.max || 10;

  // ---- ADRES DATA YÜKLEME (Şehir, ilçe, mahalle, sokak + havalimanları) ----
  useEffect(() => {
    async function fetchAll() {
      const [iller, ilceler, mahalleler, sokaklar, airports] = await Promise.all([
        fetch("/dumps/iller.metadata.json").then(r => r.json()),
        fetch("/dumps/ilceler.metadata.json").then(r => r.json()),
        fetch("/dumps/mahalleler.metadata.json").then(r => r.json()),
        fetch("/dumps/sokaklar.metadata.json").then(r => r.json()),
        fetch("/dumps/airports.json").then(r => r.json())
      ]);

      // Adres array’lerini string’e çevir (isim field’ı farklı olursa ayarla)
      const list = [
        ...iller.map(i => i.name || i.il_adi || i.label),
        ...ilceler.map(i => i.name || i.ilce_adi || i.label),
        ...mahalleler.map(i => i.name || i.mahalle_adi || i.label),
        ...sokaklar.map(i => i.name || i.sokak_adi || i.label),
        ...airports.map(a => `${a.name} (${a.city}) [${a.iata}]`), // Havalimanı adı+şehir+kodu
        ...airports.map(a => a.iata) // Ayrı olarak sadece kodu
      ];
      setAddressList([...new Set(list)]); // Tekilleştir
    }
    fetchAll();
  }, []);

  // AUTOCOMPLETE FONKSİYONU
  function getSuggestions(input) {
    if (!input || input.length < 2) return [];
    input = input.toLowerCase();
    // isme/koda göre eşleştir
    return addressList
      .filter(item =>
        item.toLowerCase().includes(input)
      )
      .slice(0, 8);
  }

  useEffect(() => {
    setFromSuggestions(getSuggestions(from));
  }, [from, addressList]);
  useEffect(() => {
    setToSuggestions(getSuggestions(to));
  }, [to, addressList]);

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
        {/* Diğer alanlar ve butonlar senin kodundaki gibi devam edecek */}
        {/* ... */}
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
