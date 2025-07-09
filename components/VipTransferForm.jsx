"use client";
import { useState, useEffect, useRef } from "react";

// Türkçe karakter normalization fonksiyonu (hem autocomplete hem filtre için)
function normalizeTr(str = "") {
  return str
    .toLocaleLowerCase("tr-TR")
    .replace(/ü/g, "u")
    .replace(/ğ/g, "g")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c");
}

// Otomatik doldurma için kayıtlı user (demo)
function getUserProfile() {
  // Gerçek ortamda JWT/Session ile çekilecek
  if (typeof window !== "undefined") {
    try {
      const d = JSON.parse(localStorage.getItem("userProfile") || "{}");
      return d;
    } catch { return {}; }
  }
  return {};
}

// Adres listesi hem json hem airport
function useAddressList() {
  const [list, setList] = useState([]);
  useEffect(() => {
    (async () => {
      let arr = [];
      try {
        // Her iki kaynağı da çek
        const txt = await fetch("/dumps/il ilçe mahalle köys.txt").then(r => r.text());
        const airports = await fetch("/dumps/airports.json").then(r => r.json());
        arr = txt
          .split("\n")
          .map(x => x.trim())
          .filter(Boolean)
          .concat((airports || []).map(a => a.name).filter(Boolean));
        setList(arr);
      } catch {
        setList([]);
      }
    })();
  }, []);
  return list;
}

// Autocomplete input field
function AutoCompleteInput({ value, onChange, placeholder }) {
  const list = useAddressList();
  const [suggest, setSuggest] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!value || value.length < 2) setSuggest([]);
    else {
      const v = normalizeTr(value);
      setSuggest(
        list.filter((item) =>
          normalizeTr(item).includes(v)
        ).slice(0, 10)
      );
    }
  }, [value, list]);
  return (
    <div className="relative">
      <input
        className="w-full h-[44px] rounded-xl px-3 text-base bg-white text-black border border-[#bfa658] focus:ring-2 focus:ring-[#bfa658] transition font-semibold"
        value={value}
        onChange={e => {
          onChange(e.target.value);
          setShow(true);
        }}
        placeholder={placeholder}
        autoComplete="off"
        onFocus={() => setShow(true)}
        onBlur={() => setTimeout(() => setShow(false), 130)}
      />
      {show && suggest.length > 0 && (
        <ul className="absolute z-10 bg-white border border-[#bfa658] rounded-xl w-full mt-1 text-black max-h-48 overflow-y-auto shadow-lg">
          {suggest.map((s) => (
            <li key={s}
              className="px-3 py-1 hover:bg-[#bfa658] hover:text-white cursor-pointer text-base"
              onClick={() => {
                onChange(s);
                setShow(false);
              }}
            >{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Saat listesi
const saatler = [];
for (let h = 0; h < 24; ++h)
  for (let m of [0, 15, 30, 45]) saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);

// Airport detection
function isAirport(str) {
  if (!str) return false;
  return /havalimanı|airport|uçuş/i.test(normalizeTr(str));
}

// Form main
export default function VipTransferForm({ onComplete }) {
  // Otomatik user bilgisi
  const user = getUserProfile();

  // State
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [people, setPeople] = useState("");
  const [segment, setSegment] = useState("");
  const [transfer, setTransfer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pnr, setPnr] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState({});

  // Otomatik user field doldurma (ilk renderda)
  useEffect(() => {
    if (user) {
      if (user.name) setPeople(user.people || "");
      // Diğerlerini de otomatik çekebilirsin...
    }
  }, [user]);

  // PNR input
  const showPNR =
    transfer === "VIP Havalimanı Transferi" ||
    isAirport(from) ||
    isAirport(to);

  // Tarih inputunda placeholder desteği ve full clickable
  const dateInputRef = useRef();
  const timeInputRef = useRef();

  // Otomatik doldurma ile yönlendirme
  function handleSubmit(e) {
    e.preventDefault();
    const err = {};
    if (!from) err.from = "Nereden?";
    if (!to) err.to = "Nereye?";
    if (!people) err.people = "Kişi Sayısı?";
    if (!segment) err.segment = "Segment?";
    if (!transfer) err.transfer = "Transfer türü?";
    if (!date) err.date = "Tarih?";
    if (!time) err.time = "Saat?";
    setError(err);
    if (Object.keys(err).length > 0) return;
    // Hafızaya yaz
    if (typeof window !== "undefined") {
      localStorage.setItem("vipFormData", JSON.stringify({
        from, to, people, segment, transfer, date, time, pnr, note,
      }));
    }
    // Dışa aktar (örn. parent'a veya route push)
    if (typeof onComplete === "function") {
      onComplete({
        from, to, people, segment, transfer, date, time, pnr, note,
      });
    }
    // Yönlendirme
    if (typeof window !== "undefined") {
      window.location.href = "/rezervasyon";
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center"
      style={{
        maxWidth: "600px", minWidth: 340, width: "100%",
        padding: "0 1vw"
      }}
      autoComplete="off"
    >
      <h2 className="text-2xl font-extrabold mb-2 text-[#bfa658] text-center" style={{ letterSpacing: ".5px" }}>
        VIP Transfer Rezervasyonu
      </h2>
      {/* Altın çizgi */}
      <div
        className="w-full mx-auto mb-5"
        style={{
          borderBottom: "3px solid #bfa658",
          width: "90%",
          maxWidth: "370px",
          marginBottom: "22px"
        }}
      />
      {/* Inputs */}
      <div className="w-full flex flex-col gap-4">
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Nereden?</label>
          <AutoCompleteInput value={from} onChange={setFrom} placeholder="Nereden? İl/İlçe/Mahalle/Havalimanı" />
          {error.from && <span className="text-red-500 text-xs">{error.from}</span>}
        </div>
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Nereye?</label>
          <AutoCompleteInput value={to} onChange={setTo} placeholder="Nereye? İl/İlçe/Mahalle/Havalimanı" />
          {error.to && <span className="text-red-500 text-xs">{error.to}</span>}
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-[#bfa658] font-semibold mb-1">Kişi Sayısı</label>
            <select className="w-full h-[44px] rounded-xl px-3 text-base bg-white text-black border border-[#bfa658]" value={people} onChange={e => setPeople(e.target.value)}>
              <option value="">Seçiniz</option>
              {Array.from({ length: 24 }, (_, i) => i + 1).map(val => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
            {error.people && <span className="text-red-500 text-xs">{error.people}</span>}
          </div>
          <div className="flex-1">
            <label className="block text-[#bfa658] font-semibold mb-1">Segment</label>
            <select className="w-full h-[44px] rounded-xl px-3 text-base bg-white text-black border border-[#bfa658]" value={segment} onChange={e => setSegment(e.target.value)}>
              <option value="">Seçiniz</option>
              <option>Ekonomik</option>
              <option>Lüks</option>
              <option>Prime+</option>
            </select>
            {error.segment && <span className="text-red-500 text-xs">{error.segment}</span>}
          </div>
        </div>
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Transfer Türü</label>
          <select className="w-full h-[44px] rounded-xl px-3 text-base bg-white text-black border border-[#bfa658]" value={transfer} onChange={e => setTransfer(e.target.value)}>
            <option value="">Seçiniz</option>
            <option>VIP Havalimanı Transferi</option>
            <option>Şehirler Arası Transfer</option>
            <option>Kurumsal Etkinlik</option>
            <option>Özel Etkinlik</option>
            <option>Tur & Gezi</option>
            <option>Toplu Transfer</option>
            <option>Düğün vb Organizasyonlar</option>
          </select>
          {error.transfer && <span className="text-red-500 text-xs">{error.transfer}</span>}
        </div>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <label className="block text-[#bfa658] font-semibold mb-1">Tarih</label>
            <input
              ref={dateInputRef}
              type="date"
              className="w-full h-[44px] rounded-xl px-3 text-base bg-white text-black border border-[#bfa658] cursor-pointer"
              value={date}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              placeholder="Tarih seçin"
              onFocus={e => e.target.showPicker && e.target.showPicker()}
            />
            {!date && (
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                style={{ fontSize: "15px" }}
              >
                Tarih seçin
              </span>
            )}
            {error.date && <span className="text-red-500 text-xs">{error.date}</span>}
          </div>
          <div className="flex-1 relative">
            <label className="block text-[#bfa658] font-semibold mb-1">Saat</label>
            <select
              ref={timeInputRef}
              className="w-full h-[44px] rounded-xl px-3 text-base bg-white text-black border border-[#bfa658] cursor-pointer"
              value={time}
              onChange={e => setTime(e.target.value)}
              onFocus={e => { if (!time) setTime(""); }}
            >
              <option value="">Saat seçin</option>
              {saatler.map(saat => (
                <option key={saat} value={saat}>{saat}</option>
              ))}
            </select>
            {!time && (
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                style={{ fontSize: "15px" }}
              >
                Saat seçin
              </span>
            )}
            {error.time && <span className="text-red-500 text-xs">{error.time}</span>}
          </div>
        </div>
        {showPNR && (
          <div>
            <label className="block text-[#bfa658] font-semibold mb-1">PNR/Uçuş Kodu</label>
            <input
              type="text"
              className="w-full h-[44px] rounded-xl px-3 text-base bg-white text-black border border-[#bfa658]"
              value={pnr}
              onChange={e => setPnr(e.target.value)}
              placeholder="Uçuş rezervasyon kodu (varsa)"
            />
          </div>
        )}
        <div>
          <label className="block text-[#bfa658] font-semibold mb-1">Ek Not</label>
          <textarea
            className="w-full h-[44px] rounded-xl px-3 text-base bg-white text-black border border-[#bfa658]"
            rows={2}
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Eklemek istediğiniz bir not var mı?"
          />
        </div>
      </div>
      {/* Devam Et Butonu */}
      <button
        type="submit"
        className="w-[180px] h-[46px] rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold text-lg shadow hover:scale-105 transition mt-7"
        style={{ marginTop: "18px", marginBottom: "6px" }}
      >
        Devam Et
      </button>
    </form>
  );
}
