// components/VipTransferForm.jsx
"use client";
import { useState, useEffect } from "react";
import axios from "axios";

// Türkçe karakter fix fonksiyonu
function fixTurkishChars(str = "") {
  return str
    .replace(/ý/g, "ı").replace(/ð/g, "ğ").replace(/þ/g, "ş")
    .replace(/Ý/g, "İ").replace(/Ð/g, "Ğ").replace(/Þ/g, "Ş")
    .replace(/i̇/g, "i").replace(/İ/g, "İ");
}

// Gelişmiş autocomplete
const [allLocations, setAllLocations] = [];

export default function VipTransferForm({ onComplete, initialData = {} }) {
  // State'ler
  const [from, setFrom] = useState(initialData.from || "");
  const [to, setTo] = useState(initialData.to || "");
  const [people, setPeople] = useState(initialData.people || "");
  const [segment, setSegment] = useState(initialData.segment || "");
  const [transfer, setTransfer] = useState(initialData.transfer || "");
  const [date, setDate] = useState(initialData.date || "");
  const [time, setTime] = useState(initialData.time || "");
  const [pnr, setPnr] = useState(initialData.pnr || "");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [fiyat, setFiyat] = useState(null);

  // Tüm lokasyon datasını fetchle
  useEffect(() => {
    (async () => {
      try {
        const [sehir, ilce, mahalle, airport] = await Promise.all([
          fetch("/dumps/sehirler.json").then(r => r.json()).catch(() => []),
          fetch("/dumps/ilceler.json").then(r => r.json()).catch(() => []),
          fetch("/dumps/mahalleler-1.json").then(r => r.json()).catch(() => []),
          fetch("/dumps/airports.json").then(r => r.json()).catch(() => []),
        ]);
        let out = [];
        sehir.forEach(s => out.push(fixTurkishChars(s.sehir_adi)));
        ilce.forEach(i => out.push(fixTurkishChars(i.ilce_adi)));
        mahalle.forEach(m => out.push(fixTurkishChars(m.mahalle_adi)));
        airport.forEach(a => out.push(fixTurkishChars(a.name)));
        setAllLocations(Array.from(new Set(out)));
      } catch (err) {
        setAllLocations([]);
      }
    })();
  }, []);

  // Hafızadan otomatik doldurma
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("rezFormData");
      if (saved) {
        const d = JSON.parse(saved);
        setFrom(d.from || "");
        setTo(d.to || "");
        setPeople(d.people || "");
        setSegment(d.segment || "");
        setTransfer(d.transfer || "");
        setDate(d.date || "");
        setTime(d.time || "");
        setPnr(d.pnr || "");
      }
    }
  }, []);

  // Autocomplete gelişmiş filtre (Türkçe)
  function handleFromChange(e) {
    const v = e.target.value;
    setFrom(v);
    setFromSuggestions(
      v.length > 1
        ? allLocations.filter(loc => fixTurkishChars(loc).toLowerCase().includes(fixTurkishChars(v).toLowerCase()))
        : []
    );
  }
  function handleToChange(e) {
    const v = e.target.value;
    setTo(v);
    setToSuggestions(
      v.length > 1
        ? allLocations.filter(loc => fixTurkishChars(loc).toLowerCase().includes(fixTurkishChars(v).toLowerCase()))
        : []
    );
  }

  // Otomatik fiyat alma
  useEffect(() => {
    async function fiyatAl() {
      if (from && to) {
        try {
          const response = await axios.post("/api/fiyatCek", { from, to });
          setFiyat(response.data);
        } catch {
          setFiyat({ message: "Fiyat alınamadı." });
        }
      }
    }
    fiyatAl();
  }, [from, to]);

  function handleSubmit(e) {
    e.preventDefault();
    const data = { from, to, people, segment, transfer, date, time, pnr };
    if (typeof window !== "undefined") {
      localStorage.setItem("rezFormData", JSON.stringify(data));
      if (onComplete) onComplete(data);
      else window.location.href = "/rezervasyon";
    }
  }

  const inputClass =
    "w-full h-[48px] rounded-xl px-3 text-base bg-white/95 border border-gray-300 focus:ring-2 focus:ring-[#bfa658] transition text-black";

  return (
    <form className="w-full" onSubmit={handleSubmit} autoComplete="off">
      <h2 className="text-3xl font-bold text-[#bfa658] mb-1 text-center" style={{ marginTop: 0 }}>
        VIP Transfer Rezervasyonu
      </h2>
      <div
        style={{
          height: 4,
          background: "#bfa658",
          borderRadius: 4,
          width: "100%",
          marginBottom: 18,
          marginTop: 3,
        }}
      />
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5">
        {/* Nereden */}
        <div className="relative col-span-1">
          <label className="block text-[#bfa658] font-semibold mb-1">Nereden?</label>
          <input
            className={inputClass}
            placeholder="Nereden? İl / İlçe / Mahalle / Havalimanı"
            value={from}
            onChange={handleFromChange}
            autoComplete="off"
          />
          {fromSuggestions.length > 0 && (
            <div className="absolute z-40 bg-white border border-gray-200 rounded-xl mt-1 shadow w-full max-h-32 overflow-auto">
              {fromSuggestions.map((s, i) => (
                <div
                  key={i}
                  className="px-3 py-2 hover:bg-yellow-100 cursor-pointer text-black"
                  onClick={() => { setFrom(s); setFromSuggestions([]); }}
                >{s}</div>
              ))}
            </div>
          )}
        </div>
        {/* Nereye */}
        <div className="relative col-span-1">
          <label className="block text-[#bfa658] font-semibold mb-1">Nereye?</label>
          <input
            className={inputClass}
            placeholder="Nereye? İl / İlçe / Mahalle / Havalimanı"
            value={to}
            onChange={handleToChange}
            autoComplete="off"
          />
          {toSuggestions.length > 0 && (
            <div className="absolute z-40 bg-white border border-gray-200 rounded-xl mt-1 shadow w-full max-h-32 overflow-auto">
              {toSuggestions.map((s, i) => (
                <div
                  key={i}
                  className="px-3 py-2 hover:bg-yellow-100 cursor-pointer text-black"
                  onClick={() => { setTo(s); setToSuggestions([]); }}
                >{s}</div>
              ))}
            </div>
          )}
        </div>
        {/* Kişi Sayısı, PNR, Transfer Türü, Segment, Tarih, Saat - Senin Kodun Değişmeden */}
        {/* ...Buraları eski kodun ile aynı şekilde devam ettir... */}
      </div>

      {/* Fiyat Gösterimi */}
      {from && to && (
        <div className="text-lg font-bold text-[#bfa658] mb-2">
          {fiyat?.sonFiyat
            ? <>Transfer Fiyatı: {fiyat.sonFiyat.toLocaleString()} ₺ (KDV Dahil)</>
            : fiyat?.message ? fiyat.message : "Fiyat hesaplanıyor..."}
        </div>
      )}

      <button
        type="submit"
        className="w-full h-[48px] rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold text-xl shadow hover:scale-105 transition mb-2"
        style={{ marginTop: 16, marginBottom: 0, position: "relative", bottom: 0 }}
      >
        Devam Et
      </button>
    </form>
  );
}
