"use client";
import { useState, useEffect } from "react";

// Ortak adres datasını oku
export function useAddressData() {
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    Promise.all([
      fetch("/dumps/sehirler.json").then(r => r.json()),
      fetch("/dumps/ilceler.json").then(r => r.json()),
      fetch("/dumps/mahalleler.json").then(r => r.json()),
      fetch("/dumps/airports.json").then(r => r.json())
    ]).then(([sehirler, ilceler, mahalleler, airports]) => {
      // Şehir
      const sehirList = sehirler.map(s => ({
        label: s.sehir_adi,
        value: s.sehir_adi,
        tip: "il"
      }));
      // İlçe
      const ilceList = ilceler.map(i => ({
        label: `${i.sehir_adi} / ${i.ilce_adi}`,
        value: `${i.sehir_adi} / ${i.ilce_adi}`,
        tip: "ilce"
      }));
      // Mahalle
      const mahalleList = mahalleler.map(m => ({
        label: `${m.sehir_adi} / ${m.ilce_adi} / ${m.mahalle_adi}`,
        value: `${m.sehir_adi} / ${m.ilce_adi} / ${m.mahalle_adi}`,
        tip: "mahalle"
      }));
      // Havalimanı
      const havalimaniList = airports.map(a => ({
        label: a.name,
        value: a.name,
        tip: "havalimani"
      }));
      setAddresses([...sehirList, ...ilceList, ...mahalleList, ...havalimaniList]);
    });
  }, []);
  return addresses;
}

// Normalleştirme fonksiyonu
function normalize(s) {
  return s
    .toLocaleLowerCase("tr-TR")
    .replace(/[çÇ]/g,"c").replace(/[ğĞ]/g,"g").replace(/[ıİ]/g,"i")
    .replace(/[öÖ]/g,"o").replace(/[şŞ]/g,"s").replace(/[üÜ]/g,"u")
    .replace(/[\s\-\.]/g,"");
}

// Otomatik tamamlama component'i
export default function AdresAutoComplete({ label, value, onChange, placeholder = "İl / İlçe / Mahalle / Havalimanı" }) {
  const addressList = useAddressData();
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => { setQuery(value); }, [value]);

  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }
    const q = normalize(query);
    setSuggestions(
      addressList
        .filter(item => normalize(item.label).includes(q))
        .slice(0, 10)
    );
  }, [query, addressList]);

  return (
    <div className="relative w-full">
      {label && <label className="font-bold text-[#bfa658] mb-1 block">{label}</label>}
      <input
        type="text"
        className="input w-full"
        value={query}
        placeholder={placeholder}
        onChange={e => {
          setQuery(e.target.value);
          onChange(e.target.value);
        }}
        onFocus={() => setSuggestions(query.length >= 2 ? suggestions : [])}
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 w-full bg-white text-black rounded shadow z-50 mt-1 max-h-60 overflow-auto">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="px-3 py-2 hover:bg-[#fffbec] cursor-pointer"
              onClick={() => {
                setQuery(s.label);
                onChange(s.label);
                setSuggestions([]);
              }}
            >
              {s.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
