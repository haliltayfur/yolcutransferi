"use client";
import { useState, useEffect } from "react";
import { vehicles } from "../../data/vehicles";
import { extrasList } from "../../data/extras";

const segments = [
  { key: "ekonomik", label: "Ekonomik" },
  { key: "lux", label: "Lüks" },
  { key: "prime", label: "Prime+" }
];

const transferTypes = {
  ekonomik: [
    "Şehirlerarası Transfer",
    "Kurumsal & Toplu Transfer",
    "Tur & Gezi Transferi"
  ],
  lux: [
    "VIP Havalimanı Transferi",
    "Şehirlerarası Transfer",
    "Tur & Gezi Transferi",
    "Kurumsal & Toplu Transfer"
  ],
  prime: [
    "VIP Havalimanı Transferi",
    "Şehirlerarası Transfer",
    "Kurumsal & Toplu Transfer",
    "Tur & Gezi Transferi",
    "Düğün & Özel Etkinlik Transferi",
    "Drone Yolcu Transferi"
  ]
};

// Lokasyon verisi
const useLocationData = () => {
  const [airports, setAirports] = useState([]);
  const [iller, setIller] = useState([]);
  const [ilceler, setIlceler] = useState([]);
  const [mahalleler, setMahalleler] = useState([]);
  useEffect(() => {
    fetch("/dumps/airports.json").then(r => r.json()).then(setAirports);
    fetch("/dumps/iller.metadata.json").then(r => r.json()).then(setIller);
    fetch("/dumps/ilceler.metadata.json").then(r => r.json()).then(setIlceler);
    fetch("/dumps/mahalleler.metadata.json").then(r => r.json()).then(setMahalleler);
  }, []);
  return { airports, iller, ilceler, mahalleler };
};

// Havalimanı olup olmadığını kontrol et
function needsPnr(from, to) {
  const lower = [from, to].join(" ").toLocaleLowerCase("tr-TR");
  return lower.includes("havalimanı") || lower.includes("airport");
}

export default function RezervasyonForm() {
  // Lokasyon verisi
  const { airports, iller, ilceler, mahalleler } = useLocationData();

  // State'ler
  const [segment, setSegment] = useState("ekonomik");
  const [transfer, setTransfer] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [people, setPeople] = useState(1);
  const [extras, setExtras] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromSug, setFromSug] = useState([]);
  const [toSug, setToSug] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [tc, setTc] = useState("");
  const [phone, setPhone] = useState("");
  const [pnr, setPnr] = useState("");
  const [showSummary, setShowSummary] = useState(false);

  // Transfer ve araç seçenekleri zinciri
  const availableTransfers = transferTypes[segment] || [];

  // DÜZELTME: Araçları, segment seçilince getir, transfer tipi seçilirse ona göre daralt
  const availableVehicles = vehicles.filter(v => {
    if (transfer) {
      return v.segment?.toLowerCase() === segment && (v.transferTypes || []).includes(transfer);
    } else {
      return v.segment?.toLowerCase() === segment;
    }
  });

  // Kişi sayısı ve ekstralar
  const vehicleObj = availableVehicles.find(v => v.value === vehicle);
  const maxPeople = vehicleObj?.max || 1;
  const availableExtras = vehicleObj?.extras || [];

  // Fiyat hesaplama
  const basePrice = vehicleObj?.price || 1500;
  const extrasPrice = extrasList.filter(e => extras.includes(e.key)).reduce((sum, e) => sum + (e.price || 0), 0);
  const totalPrice = basePrice + extrasPrice;

  // Autocomplete
  const allLocations = [
    ...(Array.isArray(airports) ? airports.map(a => a.name) : []),
    ...(Array.isArray(iller) ? iller.map(i => i.name) : []),
    ...(Array.isArray(ilceler) ? ilceler.map(i => i.name) : []),
    ...(Array.isArray(mahalleler) ? mahalleler.map(i => i.name) : [])
  ];
  const getSuggestions = v =>
    !v ? [] : allLocations.filter(l => l?.toLowerCase().includes(v.toLowerCase())).slice(0, 10);

  useEffect(() => { setFromSug(getSuggestions(from)); }, [from, airports, iller, ilceler, mahalleler]);
  useEffect(() => { setToSug(getSuggestions(to)); }, [to, airports, iller, ilceler, mahalleler]);

  // Zincir reset
  useEffect(() => { setTransfer(""); setVehicle(""); setPeople(1); setExtras([]); }, [segment]);
  useEffect(() => { setVehicle(""); setPeople(1); setExtras([]); }, [transfer]);
  useEffect(() => { setPeople(1); setExtras([]); }, [vehicle]);

  // Doğrulama
  const validate = () => {
    if (!from || !to || !date || !time || !name || !surname || !tc || !phone) return false;
    if (needsPnr(from, to) && !pnr) return false;
    if (!vehicle) return false;
    return true;
  };

  // Özet Pop-up
  const Summary = () => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 relative">
        <button onClick={() => setShowSummary(false)} className="absolute top-2 right-4 text-2xl font-bold text-red-500 hover:text-red-700">×</button>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Rezervasyon Özeti</h2>
        <div className="mb-2 space-y-1 text-black text-base">
          <div><b>Transfer:</b> {transfer}</div>
          <div><b>Araç:</b> {vehicleObj?.label}</div>
          <div><b>Kişi:</b> {people}</div>
          <div><b>Nereden:</b> {from}</div>
          <div><b>Nereye:</b> {to}</div>
          <div><b>Tarih:</b> {date} {time}</div>
          <div><b>Ad Soyad:</b> {name} {surname} – T.C.: {tc}</div>
          <div><b>Telefon:</b> {phone}</div>
          {needsPnr(from, to) && (
            <div><b>PNR/Uçuş No:</b> {pnr}</div>
          )}
          <div><b>Ekstralar:</b> {extrasList.filter(e => extras.includes(e.key)).map(e => e.label).join(", ") || "Yok"}</div>
        </div>
        <div className="text-xl font-bold text-right my-4">Toplam: <span className="text-green-700">{totalPrice}₺</span></div>
        <button
          onClick={() => alert("Demo: Ödeme sayfasına yönlendirme yapılacak! (Burada gerçek ödeme API'si bağlanır.)")}
          className="w-full py-3 rounded-xl bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition"
        >Onayla ve Öde</button>
      </div>
    </div>
  );

  // Submit
  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return alert("Lütfen eksiksiz doldurun!");
    setShowSummary(true);
    // Burada gerçek bir API çağrısı ile kaydı admin paneline POST edebilirsin.
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="w-full max-w-4xl p-6 md:p-10 rounded-3xl shadow-2xl bg-[#181818] border border-yellow-700">
        <h1 className="text-3xl font-bold mb-8 text-center text-yellow-400">VIP Rezervasyon Formu</h1>
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={handleSubmit}>
          {/* Segment */}
          <div className="flex flex-col col-span-4">
            <label className="text-white font-bold mb-1">Hizmet Segmenti</label>
            <div className="flex gap-4">
              {segments.map(s => (
                <button type="button" key={s.key}
                  className={`py-2 px-5 rounded-full font-bold border-2 ${segment === s.key ? "bg-yellow-400 text-black border-yellow-500" : "bg-black text-yellow-300 border-gray-700"} hover:bg-yellow-500`}
                  onClick={() => setSegment(s.key)}
                >{s.label}</button>
              ))}
            </div>
          </div>
          {/* Transfer Tipi */}
          <div className="flex flex-col col-span-2">
            <label className="text-white font-semibold mb-1">Transfer Tipi</label>
            <select
              className="rounded-xl border border-yellow-400 px-4 py-3 text-base bg-white text-black shadow"
              value={transfer}
              onChange={e => setTransfer(e.target.value)}
              required
            >
              <option value="">Seçiniz</option>
              {availableTransfers.map((t, i) => <option key={i} value={t}>{t}</option>)}
            </select>
          </div>
          {/* Araç Tipi */}
          <div className="flex flex-col col-span-2">
            <label className="text-white font-semibold mb-1">Araç Tipi</label>
            <select
              className="rounded-xl border border-yellow-400 px-4 py-3 text-base bg-white text-black shadow"
              value={vehicle}
              onChange={e => setVehicle(e.target.value)}
              required
            >
              <option value="">Seçiniz</option>
              {availableVehicles.map((v, i) =>
                <option key={i} value={v.value}>{v.label} ({v.segment})</option>
              )}
            </select>
          </div>
          {/* Nereden */}
          <div className="flex flex-col relative col-span-2">
            <label className="text-white font-semibold mb-1">Nereden</label>
            <input
              type="text"
              className="rounded-xl border border-yellow-400 px-4 py-3 text-base bg-white text-black"
              placeholder="Örn: İstanbul Havalimanı"
              value={from}
              onChange={e => setFrom(e.target.value)}
              autoComplete="off"
              required
            />
            {from && fromSug.length > 0 && (
              <ul className="absolute z-50 top-full left-0 right-0 bg-white border border-yellow-400 rounded-b-xl text-black max-h-40 overflow-y-auto">
                {fromSug.map((s, i) => (
                  <li key={i} className="px-4 py-1 hover:bg-yellow-200 cursor-pointer"
                    onClick={() => { setFrom(s); setFromSug([]); }}>
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Nereye */}
          <div className="flex flex-col relative col-span-2">
            <label className="text-white font-semibold mb-1">Nereye</label>
            <input
              type="text"
              className="rounded-xl border border-yellow-400 px-4 py-3 text-base bg-white text-black"
              placeholder="Örn: Taksim"
              value={to}
              onChange={e => setTo(e.target.value)}
              autoComplete="off"
              required
            />
            {to && toSug.length > 0 && (
              <ul className="absolute z-50 top-full left-0 right-0 bg-white border border-yellow-400 rounded-b-xl text-black max-h-40 overflow-y-auto">
                {toSug.map((s, i) => (
                  <li key={i} className="px-4 py-1 hover:bg-yellow-200 cursor-pointer"
                    onClick={() => { setTo(s); setToSug([]); }}>
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Tarih */}
          <div className="flex flex-col col-span-2">
            <label className="text-white font-semibold mb-1">Tarih</label>
            <input
              type="date"
              className="rounded-xl border border-yellow-400 px-4 py-3 text-base bg-white text-black"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>
          {/* Saat */}
          <div className="flex flex-col col-span-2">
            <label className="text-white font-semibold mb-1">Saat</label>
            <input
              type="time"
              className="rounded-xl border border-yellow-400 px-4 py-3 text-base bg-white text-black"
              value={time}
              onChange={e => setTime(e.target.value)}
              required
            />
          </div>
          {/* Kişi Sayısı */}
          <div className="flex flex-col col-span-2">
            <label className="text-white font-semibold mb-1">Kişi Sayısı</label>
            <select
              className="rounded-xl border border-yellow-400 px-4 py-3 text-base bg-white text-black"
              value={people}
              onChange={e => setPeople(Number(e.target.value))}
              required
            >
              {Array.from({ length: maxPeople }, (_, i) => i + 1).map(n =>
                <option key={n} value={n}>{n}</option>
              )}
            </select>
            <div className="text-xs text-gray-400 mt-1">
              Maksimum {maxPeople} kişi (şoför hariç)
            </div>
          </div>
          {/* Ekstralar */}
          <div className="flex flex-col col-span-2">
            <label className="text-white font-semibold mb-1">Ekstra Hizmetler</label>
            <div className="flex flex-wrap gap-2">
              {availableExtras.length === 0 && (
                <span className="text-sm text-gray-400">Bu araca özel ekstra hizmet yok.</span>
              )}
              {availableExtras.map(key => {
                const ex = extrasList.find(e => e.key === key);
                if (!ex) return null;
                return (
                  <label key={ex.key} className="flex items-center gap-1 px-2 py-1 rounded-lg border border-gray-400 cursor-pointer bg-white hover:bg-yellow-100">
                    <input
                      type="checkbox"
                      checked={extras.includes(ex.key)}
                      onChange={() =>
                        setExtras(prev =>
                          prev.includes(ex.key)
                            ? prev.filter(k => k !== ex.key)
                            : [...prev, ex.key]
                        )
                      }
                    />
                    <span className="text-black">{ex.label} <span className="text-xs">+{ex.price}₺</span></span>
                  </label>
                );
              })}
            </div>
          </div>
          {/* Ad / Soyad / TC / Telefon */}
          <div className="flex flex-col col-span-1">
            <label className="text-white font-semibold mb-1">Ad</label>
            <input type="text" className="rounded-xl border border-yellow-400 px-4 py-3 text-base bg-white text-black" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="flex flex-col col-span-1">
            <label className="text-white font-semibold mb-1">Soyad</label>
            <input type="text" className="rounded-xl border border-yellow-400 px-4 py-3 text-base bg-white text-black" value={surname} onChange={e => setSurname(e.target.value)} required />
          </div>
          <div className="flex flex-col col-span-1">
            <label className="text-white font-semibold mb-1">T.C. Kimlik</label>
            <input type="text" className="rounded-xl border border-yellow-400 px-4 py-3 text-base bg-white text-black" value={tc} maxLength={11} onChange={e => setTc(e.target.value.replace(/\D/g, ""))} required />
          </div>
          <div className="flex flex-col col-span-1">
            <label className="text-white font-semibold mb-1">Telefon</label>
            <input type="tel" className="rounded-xl border border-yellow-400 px-4 py-3 text-base bg-white text-black" value={phone} onChange={e => setPhone(e.target.value)} required />
          </div>
          {/* Havalimanı PNR */}
          {needsPnr(from, to) && (
            <div className="flex flex-col col-span-4">
              <label className="text-white font-semibold mb-1">Uçuş/PNR No</label>
              <input type="text" className="rounded-xl border border-yellow-400 px-4 py-3 text-base bg-white text-black" value={pnr} onChange={e => setPnr(e.target.value)} required />
            </div>
          )}
          {/* Submit */}
          <div className="col-span-4">
            <button type="submit" className="w-full py-4 rounded-2xl bg-yellow-400 text-black font-extrabold text-lg shadow-lg hover:bg-yellow-500 transition">
              Rezervasyon Yap & Fiyat Gör
            </button>
          </div>
        </form>
        {showSummary && <Summary />}
      </div>
    </div>
  );
}
