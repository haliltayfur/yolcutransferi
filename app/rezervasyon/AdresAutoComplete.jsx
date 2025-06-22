"use client";
import { useState, useEffect } from "react";

// JSON dosyalarını fetch’le
const useAdresData = () => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    Promise.all([
      fetch("/dumps/sehirler.json").then(r => r.json()),
      fetch("/dumps/ilceler.json").then(r => r.json()),
      fetch("/dumps/mahalleler.json").then(r => r.json()),
      fetch("/dumps/airports.json").then(r => r.json())
    ]).then(([sehirler, ilceler, mahalleler, airports]) => {
      let arr = [];
      // Şehirler
      arr.push(...sehirler.map(x => ({ text: x.sehir_adi, type: "il" })));
      // İlçeler
      arr.push(...ilceler.map(x => ({
        text: `${sehirler.find(s => s.sehir_ID === x.sehir_ID)?.sehir_adi || ""} / ${x.ilce_adi}`,
        type: "ilce"
      })));
      // Mahalleler
      arr.push(...mahalleler.map(x => {
        const ilce = ilceler.find(i => i.ilce_ID === x.ilce_ID);
        const il = sehirler.find(s => s.sehir_ID === ilce?.sehir_ID);
        return {
          text: `${il?.sehir_adi || ""} / ${ilce?.ilce_adi || ""} / ${x.mahalle_adi}`,
          type: "mahalle"
        }
      }));
      // Havalimanları
      arr.push(...airports.map(x => ({ text: x.name, type: "havalimani" })));
      setOptions(arr);
    });
  }, []);
  return options;
};

export default function AdresAutoComplete({ value, onChange, placeholder = "Adres girin..." }) {
  const options = useAdresData();
  const [input, setInput] = useState(value || "");
  const [suggest, setSuggest] = useState([]);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!input || input.length < 2) return setSuggest([]);
    const q = input.toLocaleLowerCase("tr-TR");
    setSuggest(
      options.filter(opt =>
        opt.text.toLocaleLowerCase("tr-TR").includes(q)
      ).slice(0, 15)
    );
  }, [input, options]);

  return (
    <div style={{ position: "relative" }}>
      <input
        className="input w-full"
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={e => { setInput(e.target.value); onChange && onChange(""); }}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 120)}
        style={{ fontFamily: "Quicksand, sans-serif" }}
      />
      {focused && suggest.length > 0 && (
        <ul className="bg-white text-black rounded-xl shadow-lg absolute left-0 right-0 mt-1 z-50 max-h-56 overflow-auto border border-[#bfa658]">
          {suggest.map((item, i) => (
            <li
              key={i}
              className="px-4 py-2 cursor-pointer hover:bg-yellow-100"
              onMouseDown={() => { setInput(item.text); onChange && onChange(item.text); setSuggest([]); }}
            >
              {item.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
