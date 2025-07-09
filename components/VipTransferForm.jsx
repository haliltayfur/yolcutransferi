"use client";
import { useState, useEffect, useRef } from "react";

// Otomatik doldurma için (VIP'den /rezervasyon'a bilgi taşıma)
function getSavedForm() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("vipForm")) || {};
  } catch { return {}; }
}

const saatler = [];
for (let h = 0; h < 24; ++h)
  for (let m of [0, 15, 30, 45]) saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);

export default function VipTransferForm({ onComplete }) {
  // Önceden doldurulmuş (ya da localStorage'dan) form
  const [form, setForm] = useState(() => ({
    from: "", to: "", people: "", pnr: "", transfer: "",
    segment: "", date: "", time: "", ...getSavedForm()
  }));

  // Otomatik tamamlama için il-ilçe-mahalle-airport JSON'u
  const [addressList, setAddressList] = useState([]);
  useEffect(() => {
    async function load() {
      let [adresler, airports] = await Promise.all([
        fetch("/dumps/ililcemahalle.txt").then(r => r.text()).catch(() => ""),
        fetch("/dumps/airports.json").then(r => r.json()).catch(() => []),
      ]);
      let lines = adresler.split("\n").map(l => l.trim()).filter(Boolean);
      let ap = airports.map(a => a.name || "").filter(Boolean);
      setAddressList([...lines, ...ap]);
    }
    load();
  }, []);

  function handleAutoComplete(field, val) {
    setForm(f => ({ ...f, [field]: val }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  // AutoSuggest mantığı (adres için)
  function AutoSuggest({ value, onChange, placeholder, name }) {
    const [sug, setSug] = useState([]);
    const [show, setShow] = useState(false);
    useEffect(() => {
      if (!value || value.length < 2) setSug([]);
      else setSug(addressList.filter(a =>
        a.toLocaleLowerCase("tr-TR").includes(value.toLocaleLowerCase("tr-TR"))
      ).slice(0, 10));
    }, [value, addressList]);
    return (
      <div className="relative">
        <input
          name={name}
          value={value}
          onChange={e => { onChange(e.target.value); setShow(true); }}
          className="w-full h-[48px] rounded-xl px-3 text-base bg-white text-black border border-[#bfa658] focus:ring-2 focus:ring-[#bfa658] transition"
          placeholder={placeholder}
          onFocus={() => setShow(true)}
          onBlur={() => setTimeout(() => setShow(false), 100)}
          autoComplete="off"
        />
        {show && sug.length > 0 &&
          <ul className="absolute z-20 bg-white border border-[#bfa658] rounded-lg w-full mt-1 text-black max-h-44 overflow-y-auto shadow-lg">
            {sug.map(s => (
              <li key={s}
                className="px-3 py-1 hover:bg-[#bfa658] hover:text-black cursor-pointer"
                onClick={() => { onChange(s); setShow(false); }}>
                {s}
              </li>
            ))}
          </ul>
        }
      </div>
    );
  }

  // PNR gösterimi mantığı (from/to/transfer havalimanı içeriyorsa)
  const isAirport = val => val && /(havaalanı|havalimanı|airport|uçuş|saw|iga|ist|esb|adb|ayt|dnz)/i.test(val);
  const showPNR = isAirport(form.from) || isAirport(form.to) || /havali/i.test(form.transfer);

  // DEVAM ET -- Tüm bilgileri kaydet ve yönlendir
  function handleSubmit(e) {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("vipForm", JSON.stringify(form));
      // /rezervasyon'a yönlendir (onComplete varsa oradan da)
      if (onComplete) onComplete(form);
      else window.location.href = "/rezervasyon";
    }
  }

  // Tarih seçicide placeholder ve kutunun tamamına tıklanabilirlik
  const dateRef = useRef();
  const timeRef = useRef();

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-[#bfa658] font-quicksand"
        style={{ marginBottom: "0.7em", marginTop: "0.3em", letterSpacing: ".02em" }}>
        VIP Transfer Rezervasyonu
      </h2>
      {/* Altın çizgi */}
      <div style={{
        width: "100%",
        height: "4px",
        marginBottom: "1.3em",
        background: "linear-gradient(90deg, #FFD700 40%, #bfa658 60%)",
        borderRadius: "2px",
      }} />
      <div className="flex flex-col gap-3 w-full">
        <AutoSuggest name="from" value={form.from} onChange={val => handleAutoComplete("from", val)} placeholder="Nereden? İl / İlçe / Mahalle / Havalimanı" />
        <AutoSuggest name="to" value={form.to} onChange={val => handleAutoComplete("to", val)} placeholder="Nereye? İl / İlçe / Mahalle / Havalimanı" />
        <div className="flex gap-3 w-full">
          <select
            name="people"
            value={form.people}
            onChange={handleChange}
            className="w-full h-[48px] rounded-xl px-3 text-base bg-white text-black border border-[#bfa658]"
          >
            <option value="">Kişi Sayısı</option>
            {Array.from({ length: 24 }, (_, i) => i + 1).map(val => <option key={val} value={val}>{val}</option>)}
          </select>
          {showPNR &&
            <input
              name="pnr"
              value={form.pnr}
              onChange={handleChange}
              placeholder="PNR / Uçuş Kodu"
              className="w-full h-[48px] rounded-xl px-3 text-base bg-white text-black border border-[#bfa658]"
            />}
        </div>
        <div className="flex gap-3 w-full">
          <select
            name="transfer"
            value={form.transfer}
            onChange={handleChange}
            className="w-full h-[48px] rounded-xl px-3 text-base bg-white text-black border border-[#bfa658]"
          >
            <option value="">Transfer Türü</option>
            <option>VIP Havalimanı Transferi</option>
            <option>Şehirler Arası Transfer</option>
            <option>Kurumsal Etkinlik</option>
            <option>Özel Etkinlik</option>
            <option>Tur & Gezi</option>
            <option>Toplu Transfer</option>
            <option>Düğün vb Organizasyonlar</option>
          </select>
          <select
            name="segment"
            value={form.segment}
            onChange={handleChange}
            className="w-full h-[48px] rounded-xl px-3 text-base bg-white text-black border border-[#bfa658]"
          >
            <option value="">Araç Segmenti</option>
            <option>Ekonomik</option>
            <option>Lüks</option>
            <option>Prime+</option>
          </select>
        </div>
        <div className="flex gap-3 w-full">
          {/* Tarih seçici */}
          <div
            className="relative w-full"
            onClick={() => dateRef.current?.showPicker && dateRef.current.showPicker()}
          >
            <input
              ref={dateRef}
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="w-full h-[48px] rounded-xl px-3 text-base bg-white text-black border border-[#bfa658]"
              min={new Date().toISOString().split("T")[0]}
              style={form.date ? {} : { color: "#888" }}
            />
            {!form.date &&
              <span className="absolute left-3 top-3 text-gray-500 pointer-events-none select-none">Tarih Seçin</span>
            }
          </div>
          {/* Saat seçici */}
          <div
            className="relative w-full"
            onClick={() => timeRef.current?.focus && timeRef.current.focus()}
          >
            <select
              ref={timeRef}
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full h-[48px] rounded-xl px-3 text-base bg-white text-black border border-[#bfa658]"
              style={form.time ? {} : { color: "#888" }}
            >
              <option value="">Saat Seçin</option>
              {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
            </select>
          </div>
        </div>
        {/* Devam Et Butonu */}
        <button
          type="submit"
          className="w-full h-[48px] rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold text-xl shadow hover:scale-105 transition mt-8"
          style={{ marginTop: "1.1em" }}
        >
          Devam Et
        </button>
      </div>
    </form>
  );
}
