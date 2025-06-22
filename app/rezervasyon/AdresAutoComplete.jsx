"use client";
import { useState, useEffect, useRef } from "react";

// JSON'lardan il/ilçe/semt/mahalle/havalimanı yükle
function useAddressData() {
  const [list, setList] = useState([]);
  useEffect(() => {
    Promise.all([
      fetch("/dumps/sehirler.json").then(r => r.json()),
      fetch("/dumps/ilceler.json").then(r => r.json()),
      fetch("/dumps/mahalleler.json").then(r => r.json()),
      fetch("/dumps/airports.json").then(r => r.json()),
    ]).then(([sehirler, ilceler, mahalleler, havalimanlari]) => {
      // Hepsini tek diziye ekle
      const adresler = [];
      sehirler.forEach(sehir =>
        adresler.push({ tip: "il", il: sehir.sehir_adi })
      );
      ilceler.forEach(ilce =>
        adresler.push({ tip: "ilce", il: ilce.sehir_adi, ilce: ilce.ilce_adi })
      );
      mahalleler.forEach(mahalle =>
        adresler.push({
          tip: "mahalle",
          il: mahalle.sehir_adi,
          ilce: mahalle.ilce_adi,
          mahalle: mahalle.mahalle_adi,
        })
      );
      havalimanlari.forEach(h => adresler.push({ tip: "havalimani", ad: h.name }));
      setList(adresler);
    });
  }, []);
  return list;
}

function normalize(s) {
  return s
    .toLocaleLowerCase("tr-TR")
    .replace(/[çÇ]/g, "c")
    .replace(/[ğĞ]/g, "g")
    .replace(/[ıİ]/g, "i")
    .replace(/[öÖ]/g, "o")
    .replace(/[şŞ]/g, "s")
    .replace(/[üÜ]/g, "u")
    .replace(/[\s\-\.]/g, "");
}

function getSuggestions(q, addressList) {
  if (!q || q.length < 2) return [];
  const nq = normalize(q);
  return addressList
    .filter(
      (item) =>
        (item.il && normalize(item.il).includes(nq)) ||
        (item.ilce && normalize(item.ilce).includes(nq)) ||
        (item.semt && normalize(item.semt).includes(nq)) ||
        (item.mahalle && normalize(item.mahalle).includes(nq)) ||
        (item.ad && normalize(item.ad).includes(nq))
    )
    .slice(0, 15)
    .map((item) => {
      if (item.tip === "il") return item.il;
      if (item.tip === "ilce") return `${item.il} / ${item.ilce}`;
      if (item.tip === "mahalle")
        return `${item.il} / ${item.ilce} / ${item.mahalle}`;
      if (item.tip === "havalimani") return item.ad;
      return "";
    });
}

// KULLANIM: <AdresAutoComplete value={from} onChange={setFrom} placeholder="Nereden?" />

export default function AdresAutoComplete({ value, onChange, placeholder }) {
  const addressList = useAddressData();
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setFocused] = useState(false);
  const ref = useRef();

  useEffect(() => {
    setSuggestions(getSuggestions(value, addressList));
  }, [value, addressList]);

  return (
    <div className="relative">
      <input
        ref={ref}
        type="text"
        className="input w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 180)}
        style={{ fontFamily: "Quicksand,sans-serif" }}
      />
      {focused && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 bg-white text-black rounded-xl shadow-lg z-50 max-h-60 overflow-auto border border-[#bfa658]">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="px-4 py-2 cursor-pointer hover:bg-yellow-100"
              onMouseDown={() => {
                onChange(s);
                setSuggestions([]);
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
