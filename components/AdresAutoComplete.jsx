// === PATH: components/AdresAutoComplete.jsx ===

"use client";
import { useState, useEffect, useRef } from "react";

// Tüm json’ları yükle
const useAdresData = () => {
  const [adresler, setAdresler] = useState({ sehirler: [], ilceler: [], mahalleler: [] });
  useEffect(() => {
    Promise.all([
      fetch("/dumps/sehirler.json").then(r => r.json()),
      fetch("/dumps/ilceler.json").then(r => r.json()),
      fetch("/dumps/mahalleler-1.json").then(r => r.json()).catch(()=>[]),
      fetch("/dumps/mahalleler-2.json").then(r => r.json()).catch(()=>[]),
      fetch("/dumps/mahalleler-3.json").then(r => r.json()).catch(()=>[]),
      fetch("/dumps/mahalleler-4.json").then(r => r.json()).catch(()=>[]),
    ]).then(([sehirler, ilceler, m1, m2, m3, m4]) => {
      const mahalleler = [].concat(m1, m2, m3, m4);
      setAdresler({ sehirler, ilceler, mahalleler });
    });
  }, []);
  return adresler;
};

// Öneri hesapla (autocomplete)
function getAdresOneri(query, { sehirler, ilceler, mahalleler }) {
  if (!query || query.length < 2) return [];
  const nq = query.toLocaleLowerCase("tr-TR");
  let results = [];

  // Mahalle bazlı
  mahalleler.forEach(m => {
    if (m.mahalle_adi && m.mahalle_adi.toLocaleLowerCase("tr-TR").includes(nq)) {
      const ilce = ilceler.find(i => i.ilce_ID === m.ilce_ID);
      const sehir = sehirler.find(s => s.sehir_ID === m.sehir_ID);
      if (ilce && sehir)
        results.push(`${sehir.sehir_title} / ${ilce.ilce_adi} / ${m.mahalle_adi}`);
    }
  });
  // İlçe bazlı
  ilceler.forEach(i => {
    if (i.ilce_adi && i.ilce_adi.toLocaleLowerCase("tr-TR").includes(nq)) {
      const sehir = sehirler.find(s => s.sehir_ID === i.sehir_ID);
      if (sehir)
        results.push(`${sehir.sehir_title} / ${i.ilce_adi}`);
    }
  });
  // Şehir bazlı
  sehirler.forEach(s => {
    if (s.sehir_title.toLocaleLowerCase("tr-TR").includes(nq)) {
      results.push(s.sehir_title);
    }
  });

  // Dublicate’leri kaldır
  results = Array.from(new Set(results));
  return results.slice(0, 24);
}

// Ana component
export default function AdresAutoComplete({ value, onChange, placeholder = "Nereden? İl / İlçe / Mahalle / Havalimanı" }) {
  const adresler = useAdresData();
  const [input, setInput] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showSug, setShowSug] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    setInput(value || "");
  }, [value]);

  useEffect(() => {
    if (input.length > 1) {
      setSuggestions(getAdresOneri(input, adresler));
      setShowSug(true);
    } else {
      setSuggestions([]);
      setShowSug(false);
    }
  }, [input, adresler]);

  function handleSelect(val) {
    setInput(val);
    setShowSug(false);
    if (onChange) onChange(val);
  }

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type="text"
        value={input}
        ref={inputRef}
        onChange={e => {
          setInput(e.target.value);
          if (onChange) onChange(e.target.value);
        }}
        placeholder={placeholder}
        className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-3 py-2"
        autoComplete="off"
        onFocus={() => setShowSug(input.length > 1 && suggestions.length > 0)}
        onBlur={() => setTimeout(() => setShowSug(false), 120)}
        style={{ minHeight: 45 }}
      />
      {/* Öneriler */}
      {showSug && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 bg-[#181818] border border-[#bfa658] rounded-xl shadow-lg z-40 max-h-72 overflow-y-auto py-1">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onMouseDown={() => handleSelect(s)}
              className="px-3 py-2 cursor-pointer hover:bg-[#bfa658] hover:text-black transition text-sm"
              style={{ borderBottom: "1px solid #3332" }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// === PATH END: components/AdresAutoComplete.jsx ===
