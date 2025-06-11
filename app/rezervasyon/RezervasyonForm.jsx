"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { vehicles } from "../../data/vehicles";
import { extrasList } from "../../data/extras";

const transferTypes = [
  "Havalimanı",
  "Şehirlerarası",
  "Tur & Gezi",
  "Kurumsal",
  "Prime+",
  "Özel Etkinlik",
  "Drone Yolcu Transferi",
  "Toplu Transfer",
  "Düğün"
];

export default function RezervasyonForm() {
  const params = useSearchParams();

  // JSON veriler için state
  const [iller, setIller] = useState([]);
  const [ilceler, setIlceler] = useState([]);
  const [mahalleler, setMahalleler] = useState([]);
  const [airports, setAirports] = useState([]);

  // Adres inputları ve autocomplete
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromSug, setFromSug] = useState([]);
  const [toSug, setToSug] = useState([]);

  // Diğer form state'leri
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedTransfer, setSelectedTransfer] = useState(transferTypes[0]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [people, setPeople] = useState(1);
  const [vehicleMax, setVehicleMax] = useState(1);
  const [vehicleExtras, setVehicleExtras] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  // JSON'ları fetch ile yükle
  useEffect(() => {
    fetch("/dumps/iller.metadata.json").then(res => res.json()).then(setIller);
    fetch("/dumps/ilceler.metadata.json").then(res => res.json()).then(setIlceler);
    fetch("/dumps/mahalleler.metadata.json").then(res => res.json()).then(setMahalleler);
    fetch("/dumps/airports.json").then(res => res.json()).then(setAirports);
  }, []);

  // Tüm adresler/havalimanı için master liste
  const allLocations = [
    ...airports.map(a => a.name),
    ...iller.map(i => i.name),
    ...ilceler.map(i => i.name),
    ...mahalleler.map(i => i.name),
  ];

  function getSuggestions(value) {
    if (!value) return [];
    const q = value.toLocaleLowerCase("tr-TR");
    return allLocations.filter(
      l => l && l.toLocaleLowerCase("tr-TR").includes(q)
    ).slice(0, 10);
  }

  useEffect(() => { setFromSug(getSuggestions(from)); }, [from, iller, ilceler, mahalleler, airports]);
  useEffect(() => { setToSug(getSuggestions(to)); }, [to, iller, ilceler, mahalleler, airports]);

  useEffect(() => {
    setFrom(params.get("from") || "");
    setTo(params.get("to") || "");
    setDate(params.get("date") || "");
    setTime(params.get("time") || "");
  }, [params]);

  useEffect(() => {
    const vList = vehicles.filter(
      v => Array.isArray(v.transferTypes) && v.transferTypes.includes(selectedTransfer)
    );
    setFilteredVehicles(vList);
    setSelectedVehicle(vList[0]?.value || "");
  }, [selectedTransfer]);

  useEffect(() => {
    const v = vehicles.find(v => v.value === selectedVehicle);
    setVehicleMax(v?.max || 1);
    setPeople(1);
    setVehicleExtras(v?.extras || []);
    setSelectedExtras([]);
  }, [selectedVehicle]);

  const toggleExtra = key => {
    setSelectedExtras(prev =>
      prev.includes(key) ? prev.filter(e => e !== key) : [...prev, key]
    );
  };

  function handleSubmit(e) {
    e.preventDefault();
    setShowSummary(true);
  }
  function closeSummary() {
    setShowSummary(false);
  }

  function RezSummaryPopup() {
    const ekstraDetay = extrasList.filter(e => selectedExtras.includes(e.key));
    const toplam = ekstraDetay.reduce((acc, e) => acc + (e.price || 0), 0);
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 relative">
          <button onClick={closeSummary} className="absolute top-2 right-4 text-2xl font-bold text-red-500 hover:text-red-700">×</button>
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Rezervasyon Özeti</h2>
          <ul className="mb-3 space-y-2 text-black">
            <li><b>Nereden:</b> {from}</li>
            <li><b>Nereye:</b> {to}</li>
            <li><b>Tarih:</b> {date}</li>
            <li><b>Saat:</b> {time}</li>
            <li><b>Transfer Tipi:</b> {selectedTransfer}</li>
            <li><b>Araç:</b> {vehicles.find(v => v.value === selectedVehicle)?.label || "-"}</li>
            <li><b>Kişi:</b> {people}</li>
            <li><b>Ekstralar:</b>
              <ul className="ml-4 list-disc">
                {ekstraDetay.length === 0 && <li>Yok</li>}
                {ekstraDetay.map(e => (
                  <li key={e.key}>{e.label} <span className="text-xs text-gray-600">+{e.price}₺</span></li>
                ))}
              </ul>
            </li>
          </ul>
          <div className="text-lg font-bold text-right mb-4">Ekstra Toplam: <span className="text-green-700">{toplam}₺</span></div>
          <button
            onClick={closeSummary}
            className="w-full py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
          >Onayla ve Kapat</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111112]">
      <div className="w-full max-w-4xl p-6 md:p-12 rounded-3xl shadow-2xl bg-[#161616] backdrop-blur-xl border border-gray-900">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#ffc700] tracking-tight">VIP Rezervasyon Formu</h1>
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={handleSubmit}>
          {/* Nereden */}
          <div className="flex flex-col relative">
            <label className="text-white font-semibold mb-1">Nereden</label>
            <input
              type="text"
              className="rounded-xl border border-[#ffc700] px-4 py-3 text-base bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#ffc700] shadow"
              placeholder="Örn: İstanbul Havalimanı"
              value={from}
              onChange={e => setFrom(e.target.value)}
              autoComplete="off"
              required
            />
            {/* Autocomplete Suggestions */}
            {from && fromSug.length > 0 && (
              <ul className="absolute z-50 top-full left-0 right-0 bg-white border border-[#ffc700] rounded-b-xl text-black max-h-40 overflow-y-auto">
                {fromSug.map((s, i) => (
                  <li key={i} className="px-4 py-1 hover:bg-[#ffe066] cursor-pointer"
                    onClick={() => { setFrom(s); setFromSug([]); }}>
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Nereye */}
          <div className="flex flex-col relative">
            <label className="text-white font-semibold mb-1">Nereye</label>
            <input
              type="text"
              className="rounded-xl border border-[#ffc700] px-4 py-3 text-base bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#ffc700] shadow"
              placeholder="Örn: Taksim"
              value={to}
              onChange={e => setTo(e.target.value)}
              autoComplete="off"
              required
            />
            {/* Autocomplete Suggestions */}
            {to && toSug.length > 0 && (
              <ul className="absolute z-50 top-full left-0 right-0 bg-white border border-[#ffc700] rounded-b-xl text-black max-h-40 overflow-y-auto">
                {toSug.map((s, i) => (
                  <li key={i} className="px-4 py-1 hover:bg-[#ffe066] cursor-pointer"
                    onClick={() => { setTo(s); setToSug([]); }}>
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Tarih */}
          <div className="flex flex-col">
            <label className="text-white font-semibold mb-1">Tarih</label>
            <input
              type="date"
              className="rounded-xl border border-[#ffc700] px-4 py-3 text-base bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#ffc700] shadow"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>
          {/* Saat */}
          <div className="flex flex-col">
            <label className="text-white font-semibold mb-1">Saat</label>
            <input
              type="time"
              className="rounded-xl border border-[#ffc700] px-4 py-3 text-base bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#ffc700] shadow"
              value={time}
              onChange={e => setTime(e.target.value)}
              required
            />
          </div>
          {/* Transfer Tipi */}
          <div className="flex flex-col col-span-2 md:col-span-2">
            <label className="text-white font-semibold mb-1">Transfer Tipi</label>
            <select
              className="rounded-xl border border-[#ffc700] px-4 py-3 text-base bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#ffc700] shadow"
              value={selectedTransfer}
              onChange={e => setSelectedTransfer(e.target.value)}
            >
              {transferTypes.map((t, i) => (
                <option key={i} value={t}>{t}</option>
              ))}
            </select>
          </div>
          {/* Araç Tipi */}
          <div className="flex flex-col col-span-2 md:col-span-2">
            <label className="text-white font-semibold mb-1">Araç Tipi</label>
            <select
              className="rounded-xl border border-[#ffc700] px-4 py-3 text-base bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#ffc700] shadow"
              value={selectedVehicle}
              onChange={e => setSelectedVehicle(e.target.value)}
            >
              {filteredVehicles.map((v, i) => (
                <option key={i} value={v.value}>{v.label} ({v.segment})</option>
              ))}
            </select>
          </div>
          {/* Kişi Sayısı */}
          <div className="flex flex-col col-span-2 md:col-span-2">
            <label className="text-white font-semibold mb-1">Kişi Sayısı</label>
            <select
              className="rounded-xl border border-[#ffc700] px-4 py-3 text-base bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#ffc700] shadow"
              value={people}
              onChange={e => setPeople(Number(e.target.value))}
            >
              {Array.from({ length: vehicleMax }, (_, i) => i + 1).map(n =>
                <option key={n} value={n}>{n}</option>
              )}
            </select>
            <div className="text-xs text-gray-400 mt-1">
              Maksimum {vehicleMax} kişi (şoför hariç)
            </div>
          </div>
          {/* Ekstralar */}
          <div className="flex flex-col col-span-2 md:col-span-2">
            <label className="text-white font-semibold mb-1">Ekstra Hizmetler</label>
            <div className="flex flex-wrap gap-2">
              {vehicleExtras.length === 0 && (
                <span className="text-sm text-gray-400">Bu araca özel ekstra hizmet yok.</span>
              )}
              {vehicleExtras.map(key => {
                const ex = extrasList.find(e => e.key === key);
                if (!ex) return null;
                return (
                  <label key={ex.key} className="flex items-center gap-1 px-2 py-1 rounded-lg border border-gray-400 cursor-pointer bg-white hover:bg-[#ffe066]">
                    <input
                      type="checkbox"
                      checked={selectedExtras.includes(ex.key)}
                      onChange={() => toggleExtra(ex.key)}
                    />
                    <span className="text-black">{ex.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
          {/* Ad Soyad */}
          <div className="flex flex-col col-span-2 md:col-span-2">
            <label className="text-white font-semibold mb-1">Ad Soyad</label>
            <input
              type="text"
              className="rounded-xl border border-[#ffc700] px-4 py-3 text-base bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#ffc700] shadow"
              placeholder="Adınız Soyadınız"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          {/* Telefon */}
          <div className="flex flex-col col-span-2 md:col-span-2">
            <label className="text-white font-semibold mb-1">Telefon</label>
            <input
              type="tel"
              className="rounded-xl border border-[#ffc700] px-4 py-3 text-base bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#ffc700] shadow"
              placeholder="05xx xxx xx xx"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
          </div>
          {/* Gönder Butonu */}
          <div className="col-span-4">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#ffc700] text-[#222] font-extrabold text-lg shadow-lg hover:bg-[#ffe066] transition"
            >
              Rezervasyon Yap
            </button>
          </div>
        </form>
        {/* Özet Popup */}
        {showSummary && <RezSummaryPopup />}
      </div>
    </div>
  );
}
