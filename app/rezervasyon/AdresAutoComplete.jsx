"use client";
import { useState, useEffect } from "react";

export default function AdresAutoComplete({ value, onChange, label = "Adres Seçimi" }) {
  const [sehirler, setSehirler] = useState([]);
  const [ilceler, setIlceler] = useState([]);
  const [mahalleler, setMahalleler] = useState([]);

  const [selectedSehir, setSelectedSehir] = useState("");
  const [selectedIlce, setSelectedIlce] = useState("");
  const [selectedMahalle, setSelectedMahalle] = useState("");

  // Şehirleri yükle
  useEffect(() => {
    fetch("/dumps/sehirler.json").then(r => r.json()).then(setSehirler);
  }, []);
  // İlçeleri yükle
  useEffect(() => {
    if (selectedSehir) {
      fetch("/dumps/ilceler.json").then(r => r.json()).then(data => {
        setIlceler(data.filter(i => i.sehir_ID === selectedSehir));
        setSelectedIlce("");
        setSelectedMahalle("");
        setMahalleler([]);
      });
    }
  }, [selectedSehir]);
  // Mahalleleri yükle
  useEffect(() => {
    if (selectedIlce) {
      fetch("/dumps/mahalleler.json").then(r => r.json()).then(data => {
        setMahalleler(data.filter(m => m.ilce_ID === selectedIlce));
        setSelectedMahalle("");
      });
    }
  }, [selectedIlce]);

  // Dışarıya birleşik value döndür
  useEffect(() => {
    let result = "";
    if (selectedSehir) {
      const s = sehirler.find(x => x.sehir_ID === selectedSehir)?.sehir_adi;
      if (s) result += s;
      if (selectedIlce) {
        const i = ilceler.find(x => x.ilce_ID === selectedIlce)?.ilce_adi;
        if (i) result += " / " + i;
        if (selectedMahalle) {
          const m = mahalleler.find(x => x.mahalle_ID === selectedMahalle)?.mahalle_adi;
          if (m) result += " / " + m;
        }
      }
    }
    if (onChange) onChange(result);
  }, [selectedSehir, selectedIlce, selectedMahalle]);

  return (
    <div>
      <label className="block mb-1 font-bold text-[#bfa658]">{label}</label>
      <div className="flex gap-2">
        {/* Şehir */}
        <select
          className="input"
          value={selectedSehir}
          onChange={e => setSelectedSehir(e.target.value)}
        >
          <option value="">Şehir Seç</option>
          {sehirler.map(s => (
            <option key={s.sehir_ID} value={s.sehir_ID}>{s.sehir_adi}</option>
          ))}
        </select>
        {/* İlçe */}
        <select
          className="input"
          value={selectedIlce}
          onChange={e => setSelectedIlce(e.target.value)}
          disabled={!selectedSehir}
        >
          <option value="">İlçe Seç</option>
          {ilceler.map(i => (
            <option key={i.ilce_ID} value={i.ilce_ID}>{i.ilce_adi}</option>
          ))}
        </select>
        {/* Mahalle */}
        <select
          className="input"
          value={selectedMahalle}
          onChange={e => setSelectedMahalle(e.target.value)}
          disabled={!selectedIlce}
        >
          <option value="">Mahalle Seç</option>
          {mahalleler.map(m => (
            <option key={m.mahalle_ID} value={m.mahalle_ID}>{m.mahalle_adi}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
