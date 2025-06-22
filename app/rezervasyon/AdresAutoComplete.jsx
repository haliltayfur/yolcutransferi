// /app/rezervasyon/AdresAutoComplete.jsx
"use client";
import { useEffect, useState } from "react";

// Tüm adresleri yükle
const useAddressList = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    Promise.all([
      fetch("/dumps/sehirler.json").then(r => r.json()),
      fetch("/dumps/ilceler.json").then(r => r.json()),
      fetch("/dumps/mahalleler.json").then(r => r.json()),
      fetch("/dumps/airports.json").then(r => r.json())
    ]).then(([sehirler, ilceler, mahalleler, airports]) => {
      let adresler = [];
      sehirler.forEach(s => {
        adresler.push({ label: s.sehir_adi, tip: "il" });
      });
      ilceler.forEach(i => {
        const sehir = sehirler.find(s => s.sehir_ID === i.sehir_ID)?.sehir_adi || "";
        adresler.push({ label: `${sehir} / ${i.ilce_adi}`, tip: "ilce" });
      });
      mahalleler.forEach(m => {
        const ilce = ilceler.find(i => i.ilce_ID === m.ilce_ID);
        const sehir = sehirler.find(s => s.sehir_ID === ilce?.sehir_ID)?.sehir_adi || "";
        adresler.push({ label: `${sehir} / ${ilce?.ilce_adi} / ${m.mahalle_adi}`, tip: "mahalle" });
      });
      airports.forEach(a => {
        adresler.push({ label: a.name, tip: "havalimani" });
      });
      setList(adresler);
    });
  }, []);
  return list;
};

function normalize(s) {
  return s?.toLocaleLowerCase("tr-TR")
    .replace(/[çÇ]/g, "c").replace(/[ğĞ]/g, "g")
    .replace(/[ıİ]/g, "i").replace(/[öÖ]/g, "o")
    .replace(/[şŞ]/g, "s").replace(/[üÜ]/g, "u")
    .replace(/[\s\-\.]/g, "");
}

export default function AdresAutoComplete({ value, onChange, placeholder }) {
  const addressList = useAddressList();
  const [input, setInput] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    if (!input || input.length < 2) return setSuggestions([]);
    setSuggestions(
      addressList
        .filter(a => normalize(a.label).includes(normalize(input)))
        .map(a => a.label)
        .slice(0, 15)
    );
  }, [input, addressList]);
  return (
    <div className="relative">
      <input
        type="text"
        className="input w-full"
        placeholder={placeholder || "Nereden?"}
        value={input}
        onChange={e => {
          setInput(e.target.value);
          onChange && onChange(e.target.value);
        }}
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border rounded shadow z-50 w-full max-h-56 overflow-auto text-black">
          {suggestions.map((s, i) => (
            <li key={i} className="px-3 py-2 hover:bg-yellow-50 cursor-pointer"
                onClick={() => { setInput(s); onChange && onChange(s); setSuggestions([]); }}>
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
