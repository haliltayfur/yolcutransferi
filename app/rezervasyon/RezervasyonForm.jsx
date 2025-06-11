"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { vehicles } from "/data/vehicles";
import { extrasList } from "/data/extras";

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

  // Form State
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Dinamik State
  const [selectedTransfer, setSelectedTransfer] = useState(transferTypes[0]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [people, setPeople] = useState(1);
  const [vehicleMax, setVehicleMax] = useState(1);
  const [vehicleExtras, setVehicleExtras] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);

  // Popup için (kendi popup'ın varsa onu ekleyebilirsin)
  const [showSummary, setShowSummary] = useState(false);

  // Parametreleri ilk yükle
  useEffect(() => {
    setFrom(params.get("from") || "");
    setTo(params.get("to") || "");
    setDate(params.get("date") || "");
    setTime(params.get("time") || "");
  }, [params]);

  // Transfer tipi değişince uygun araçları filtrele
  useEffect(() => {
    const vList = vehicles.filter(v => v.transferTypes.includes(selectedTransfer));
    setFilteredVehicles(vList);
    setSelectedVehicle(vList[0]?.value || "");
  }, [selectedTransfer]);

  // Araç değişince max kişi ve ekstralar güncelle
  useEffect(() => {
    const v = vehicles.find(v => v.value === selectedVehicle);
    setVehicleMax(v?.max || 1);
    setPeople(1);
    setVehicleExtras(v?.extras || []);
    setSelectedExtras([]);
  }, [selectedVehicle]);

  // Ekstra seçimi toggle
  const toggleExtra = key => {
    setSelectedExtras(prev =>
      prev.includes(key) ? prev.filter(e => e !== key) : [...prev, key]
    );
  };

  // Rezervasyon gönderimi
  function handleSubmit(e) {
    e.preventDefault();
    setShowSummary(true);
  }

  // Popup kapat
  function closeSummary() {
    setShowSummary(false);
  }

  // Özet popup
  function RezSummaryPopup() {
    // Fiyatlar
    const ekstraDetay = extrasList.filter(e => selectedExtras.includes(e.key));
    const toplam = ekstraDetay.reduce((acc, e) => acc + (e.price || 0), 0);

    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 relative">
          <button onClick={closeSummary} className="absolute top-2 right-4 text-xl">×</button>
          <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Rezervasyon Özeti</h2>
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="w-full max-w-lg p-8 rounded-2xl shadow-2xl bg-white/95 backdrop-blur-md">
        <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">Rezervasyon Formu</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Nereden */}
          <div>
            <label className="block text-gray-700 mb-1">Nereden</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Örn: İstanbul Havalimanı"
              value={from}
              onChange={e => setFrom(e.target.value)}
            />
          </div>
          {/* Nereye */}
          <div>
            <label className="block text-gray-700 mb-1">Nereye</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Örn: Taksim"
              value={to}
              onChange={e => setTo(e.target.value)}
            />
          </div>
          {/* Tarih/Saat */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Tarih</label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Saat</label>
              <input
                type="time"
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white"
                value={time}
                onChange={e => setTime(e.target.value)}
              />
            </div>
          </div>
          {/* Transfer Tipi Dropdown */}
          <div>
            <label className="block text-gray-700 mb-1">Transfer Tipi</label>
            <select
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white"
              value={selectedTransfer}
              onChange={e => setSelectedTransfer(e.target.value)}
            >
              {transferTypes.map((t, i) => (
                <option key={i} value={t}>{t}</option>
              ))}
            </select>
          </div>
          {/* Araç Tipi Dropdown */}
          <div>
            <label className="block text-gray-700 mb-1">Araç Tipi</label>
            <select
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white"
              value={selectedVehicle}
              onChange={e => setSelectedVehicle(e.target.value)}
            >
              {filteredVehicles.map((v, i) => (
                <option key={i} value={v.value}>{v.label} ({v.segment})</option>
              ))}
            </select>
          </div>
          {/* Kişi Sayısı Dropdown */}
          <div>
            <label className="block text-gray-700 mb-1">Kişi Sayısı</label>
            <select
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white"
              value={people}
              onChange={e => setPeople(Number(e.target.value))}
            >
              {Array.from({ length: vehicleMax }, (_, i) => i + 1).map(n =>
                <option key={n} value={n}>{n}</option>
              )}
            </select>
            <div className="text-xs text-gray-500 mt-1">
              Maksimum {vehicleMax} kişi (şoför hariç)
            </div>
          </div>
          {/* Ekstralar Checkbox */}
          <div>
            <label className="block text-gray-700 mb-1">Ekstra Hizmetler</label>
            <div className="flex flex-wrap gap-2">
              {vehicleExtras.length === 0 && (
                <span className="text-sm text-gray-400">Bu araca özel ekstra hizmet yok.</span>
              )}
              {vehicleExtras.map(key => {
                const ex = extrasList.find(e => e.key === key);
                if (!ex) return null;
                return (
                  <label key={ex.key} className="flex items-center gap-1 px-2 py-1 rounded-lg border border-gray-300 cursor-pointer bg-white">
                    <input
                      type="checkbox"
                      checked={selectedExtras.includes(ex.key)}
                      onChange={() => toggleExtra(ex.key)}
                    />
                    <span>{ex.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
          {/* Ad Soyad */}
          <div>
            <label className="block text-gray-700 mb-1">Ad Soyad</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white"
              placeholder="Adınız Soyadınız"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          {/* Telefon */}
          <div>
            <label className="block text-gray-700 mb-1">Telefon</label>
            <input
              type="tel"
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white"
              placeholder="05xx xxx xx xx"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          {/* Gönder Butonu */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
          >
            Rezervasyon Yap
          </button>
        </form>
        {/* Özet Popup */}
        {showSummary && <RezSummaryPopup />}
      </div>
    </div>
  );
}
