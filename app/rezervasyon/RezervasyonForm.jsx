// /app/rezervasyon/RezervasyonForm.jsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

// Türkçe karakter düzeltici
function fixTurkishChars(str = "") {
  return str
    .replace(/ý/g, "ı").replace(/ð/g, "ğ").replace(/þ/g, "ş")
    .replace(/Ý/g, "İ").replace(/Ð/g, "Ğ").replace(/Þ/g, "Ş")
    .replace(/i̇/g, "i").replace(/İ/g, "İ");
}

// Adres AutoComplete
function useAddressList() {
  const [addressList, setAddressList] = useState([]);
  useEffect(() => {
    async function fetchAll() {
      let [sehir, ilce, mahalle, airport] = await Promise.all([
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
      setAddressList(Array.from(new Set(out)));
    }
    fetchAll();
  }, []);
  return addressList;
}
function AutoCompleteInput({ value, onChange, placeholder }) {
  const addressList = useAddressList();
  const [suggestions, setSuggestions] = useState([]);
  const [showList, setShowList] = useState(false);
  useEffect(() => {
    if (!value || value.length < 2) setSuggestions([]);
    else {
      const val = fixTurkishChars(value).toLocaleLowerCase("tr-TR");
      setSuggestions(addressList.filter(a =>
        fixTurkishChars(a).toLocaleLowerCase("tr-TR").includes(val)
      ).slice(0, 12));
    }
  }, [value, addressList]);
  return (
    <div className="relative">
      <input
        className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
        value={value}
        onChange={e => { onChange(e.target.value); setShowList(true); }}
        placeholder={placeholder}
        onFocus={() => setShowList(true)}
        onBlur={() => setTimeout(() => setShowList(false), 140)}
        autoComplete="off"
      />
      {showList && suggestions.length > 0 &&
        <ul className="absolute z-20 bg-[#19160a] border border-[#bfa658] rounded-lg w-full mt-1 text-[#ffeec2] max-h-52 overflow-y-auto shadow-lg">
          {suggestions.map(s => (
            <li key={s}
              className="px-3 py-1 hover:bg-[#bfa658] hover:text-black cursor-pointer"
              onClick={() => { onChange(s); setShowList(false); }}
            >{s}</li>
          ))}
        </ul>
      }
    </div>
  );
}

const segmentOptions = [
  { key: "Ekonomik", label: "Ekonomik" },
  { key: "Lüks", label: "Lüks" },
  { key: "Prime+", label: "Prime+" }
];
const allTransfers = [
  "VIP Havalimanı Transferi",
  "Şehirler Arası Transfer",
  "Kurumsal Etkinlik",
  "Özel Etkinlik",
  "Tur & Gezi",
  "Toplu Transfer",
  "Düğün vb Organizasyonlar"
];
const saatler = [];
for (let h = 0; h < 24; ++h)
  for (let m of [0, 15, 30, 45]) saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);

const ekstralar = [
  { key: "su", label: "Maden Suyu" },
  { key: "wifi", label: "Wi-Fi" },
  { key: "powerbank", label: "Powerbank Şarj" },
  { key: "hostes", label: "Hostes" },
  { key: "reyon", label: "Reyon Servisi" }
  // Daha fazla eklenebilir
];

export default function RezervasyonForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [people, setPeople] = useState("");
  const [segment, setSegment] = useState("");
  const [transfer, setTransfer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pnr, setPnr] = useState("");
  const [note, setNote] = useState("");
  const [ekstra, setEkstra] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [kvkkChecked, setKvkkChecked] = useState(false);
  const [fiyat, setFiyat] = useState(null);

  // Fiyatı otomatik çek
  useEffect(() => {
    async function fiyatGoster() {
      if (from && to) {
        try {
          const response = await axios.post("/api/fiyatCek", { from, to });
          setFiyat(response.data);
        } catch {
          setFiyat({ message: "Fiyat alınamadı." });
        }
      } else setFiyat(null);
    }
    fiyatGoster();
  }, [from, to]);

  function handleSubmit(e) {
    e.preventDefault();
    const err = {};
    if (!from) err.from = "Nereden gerekli";
    if (!to) err.to = "Nereye gerekli";
    if (!people) err.people = "Kişi gerekli";
    if (!segment) err.segment = "Segment gerekli";
    if (!transfer) err.transfer = "Transfer tipi gerekli";
    if (!date) err.date = "Tarih gerekli";
    if (!time) err.time = "Saat gerekli";
    if (!name) err.name = "Ad gerekli";
    if (!surname) err.surname = "Soyad gerekli";
    if (!phone) err.phone = "Telefon gerekli";
    if (!email) err.email = "E-posta gerekli";
    if (!kvkkChecked) err.kvkk = "KVKK onayı gerekli";
    setFieldErrors(err);
    if (Object.keys(err).length > 0) return;
    setShowSummary(true);
  }

  // Responsive tasarım ve altın çizgi VIP dokunuşu
  return (
    <section className="w-full max-w-2xl mx-auto rounded-3xl shadow-2xl bg-[#19160a] border-2 border-[#bfa658] px-8 md:px-12 py-10 my-12" style={{ marginTop: 40, marginBottom: 40 }}>
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-2 text-center font-quicksand">VIP Rezervasyon Formu</h1>
      <div style={{height: 4, background: "linear-gradient(90deg, #FFD700 0%, #bfa658 100%)", borderRadius: 4, width: "100%", marginBottom: 22}} />
      <form onSubmit={handleSubmit} autoComplete="on" className="flex flex-col gap-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereden?</label>
            <AutoCompleteInput value={from} onChange={setFrom} placeholder="Nereden? İl / İlçe / Mahalle / Havalimanı" />
            {fieldErrors.from && <div className="text-red-400 text-xs mt-1">{fieldErrors.from}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
            <AutoCompleteInput value={to} onChange={setTo} placeholder="Nereye? İl / İlçe / Mahalle / Havalimanı" />
            {fieldErrors.to && <div className="text-red-400 text-xs mt-1">{fieldErrors.to}</div>}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Kişi</label>
            <select className="input w-full" value={people} onChange={e => setPeople(e.target.value)}>
              <option value="">Seçiniz</option>
              {Array.from({ length: 24 }, (_, i) => i + 1).map(val => <option key={val} value={val}>{val}</option>)}
            </select>
            {fieldErrors.people && <div className="text-red-400 text-xs mt-1">{fieldErrors.people}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
            <select className="input w-full" value={segment} onChange={e => setSegment(e.target.value)}>
              <option value="">Seçiniz</option>
              {segmentOptions.map(opt => <option key={opt.key} value={opt.label}>{opt.label}</option>)}
            </select>
            {fieldErrors.segment && <div className="text-red-400 text-xs mt-1">{fieldErrors.segment}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Transfer Türü</label>
            <select className="input w-full" value={transfer} onChange={e => setTransfer(e.target.value)}>
              <option value="">Seçiniz</option>
              {allTransfers.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            {fieldErrors.transfer && <div className="text-red-400 text-xs mt-1">{fieldErrors.transfer}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Tarih</label>
            <input type="date" className="input w-full" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
            {fieldErrors.date && <div className="text-red-400 text-xs mt-1">{fieldErrors.date}</div>}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
            <select className="input w-full" value={time} onChange={e => setTime(e.target.value)}>
              <option value="">Seçiniz</option>
              {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
            </select>
            {fieldErrors.time && <div className="text-red-400 text-xs mt-1">{fieldErrors.time}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">PNR (Varsa)</label>
            <input className="input w-full" value={pnr} onChange={e => setPnr(e.target.value)} placeholder="Uçuş kodu (varsa)" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Ad</label>
            <input type="text" className="input w-full" value={name} onChange={e => setName(e.target.value)} />
            {fieldErrors.name && <div className="text-red-400 text-xs mt-1">{fieldErrors.name}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Soyad</label>
            <input type="text" className="input w-full" value={surname} onChange={e => setSurname(e.target.value)} />
            {fieldErrors.surname && <div className="text-red-400 text-xs mt-1">{fieldErrors.surname}</div>}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Telefon</label>
            <input type="tel" className="input w-full" value={phone} onChange={e => setPhone(e.target.value)} />
            {fieldErrors.phone && <div className="text-red-400 text-xs mt-1">{fieldErrors.phone}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">E-posta</label>
            <input type="email" className="input w-full" value={email} onChange={e => setEmail(e.target.value)} />
            {fieldErrors.email && <div className="text-red-400 text-xs mt-1">{fieldErrors.email}</div>}
          </div>
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Ekstralar</label>
          <div className="flex flex-wrap gap-2">
            {ekstralar.map(x => (
              <label key={x.key} className="bg-[#282216] px-3 py-2 rounded-lg border border-[#bfa65888] cursor-pointer flex items-center gap-2">
                <input type="checkbox" checked={ekstra.includes(x.key)} onChange={() => setEkstra(e => e.includes(x.key) ? e.filter(i => i !== x.key) : [...e, x.key])} />
                <span>{x.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Ek Not</label>
          <textarea className="input w-full" value={note} onChange={e => setNote(e.target.value)} rows={2} placeholder="Eklemek istediğiniz bir not var mı?" />
        </div>
        <div className="flex items-center mt-2 mb-2">
          <input type="checkbox" checked={kvkkChecked} onChange={e => setKvkkChecked(e.target.checked)} className="accent-[#bfa658] w-5 h-5" />
          <label className="ml-2 text-[#ffeec2] text-sm">KVKK Onaylıyorum</label>
          {fieldErrors.kvkk && <div className="text-red-400 text-xs mt-1 ml-3">{fieldErrors.kvkk}</div>}
        </div>
        {from && to && (
          <div className="text-lg font-bold text-[#bfa658] mb-2">
            {fiyat?.sonFiyat
              ? <>Transfer Fiyatı: {fiyat.sonFiyat.toLocaleString()} ₺ (KDV Dahil)</>
              : fiyat?.message ? fiyat.message : "Fiyat hesaplanıyor..."}
          </div>
        )}
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-12 rounded-xl text-xl shadow hover:scale-105 transition"
          >
            Rezervasyonu Tamamla
          </button>
        </div>
      </form>
      {/* Sipariş özeti popup */}
      {showSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-[#19160a] rounded-2xl border-2 border-[#bfa658] w-full max-w-lg p-8 text-[#ffeec2] relative">
            <button onClick={() => setShowSummary(false)}
              className="absolute top-2 right-2 bg-[#bfa658] text-black px-4 py-1 rounded-xl">Kapat</button>
            <h2 className="text-2xl font-bold text-[#bfa658] mb-4 text-center">Rezervasyon Özeti</h2>
            <div className="mb-4">Transfer Fiyatı: <b>{fiyat?.sonFiyat?.toLocaleString() ?? "?"} ₺</b></div>
            <div><b>Nereden:</b> {from}</div>
            <div><b>Nereye:</b> {to}</div>
            <div><b>Kişi:</b> {people}</div>
            <div><b>Segment:</b> {segment}</div>
            <div><b>Transfer:</b> {transfer}</div>
            <div><b>Tarih:</b> {date}</div>
            <div><b>Saat:</b> {time}</div>
            <div><b>Ad:</b> {name}</div>
            <div><b>Soyad:</b> {surname}</div>
            <div><b>Telefon:</b> {phone}</div>
            <div><b>E-posta:</b> {email}</div>
            <div><b>Ekstralar:</b> {ekstra.map(k => ekstralar.find(x => x.key === k)?.label).join(", ") || "-"}</div>
            <div><b>Not:</b> {note}</div>
            <button className="w-full mt-6 bg-[#bfa658] text-black font-bold py-3 rounded-xl text-lg"
              onClick={() => { setShowSummary(false); alert("Ödeme entegrasyonu burada!"); }}>Onayla ve Güvenli Ödemeye Geç</button>
          </div>
        </div>
      )}
    </section>
  );
}
