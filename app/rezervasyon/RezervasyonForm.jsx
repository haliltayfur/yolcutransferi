"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { vehicles } from "../../data/vehicles";
import { extrasList } from "../../data/extras";

// Segment ve Transfer tipleri
const segments = [
  { key: "ekonomik", label: "Ekonomik" },
  { key: "lux", label: "Lüks" },
  { key: "prime", label: "Prime+" }
];
const transferTypes = {
  ekonomik: [
    "Şehirlerarası Transfer", "Kurumsal & Toplu Transfer", "Tur & Gezi Transferi"
  ],
  lux: [
    "VIP Havalimanı Transferi", "Şehirlerarası Transfer", "Tur & Gezi Transferi", "Kurumsal & Toplu Transfer"
  ],
  prime: [
    "VIP Havalimanı Transferi", "Şehirlerarası Transfer", "Kurumsal & Toplu Transfer", "Tur & Gezi Transferi", "Düğün & Özel Etkinlik Transferi", "Drone Yolcu Transferi"
  ]
};

const useLocationData = () => {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    // Tüm il/ilçe/mahalle/sokak/havalimanı json verilerini tek diziye topluyoruz.
    Promise.all([
      fetch("/dumps/airports.json").then(r => r.json()),
      fetch("/dumps/iller.metadata.json").then(r => r.json()),
      fetch("/dumps/ilceler.metadata.json").then(r => r.json()),
      fetch("/dumps/mahalleler.metadata.json").then(r => r.json())
    ]).then(([airports, iller, ilceler, mahalleler]) => {
      const all = [];
      if (Array.isArray(airports)) all.push(...airports.map(a => a.name));
      if (Array.isArray(iller)) all.push(...iller.map(i => i.name));
      if (Array.isArray(ilceler)) all.push(...ilceler.map(i => i.name));
      if (Array.isArray(mahalleler)) all.push(...mahalleler.map(i => i.name));
      setLocations([...new Set(all.filter(Boolean))]);
    });
  }, []);
  return locations;
};

function needsPnr(from, to) {
  const lower = [from, to].join(" ").toLocaleLowerCase("tr-TR");
  return lower.includes("havalimanı") || lower.includes("airport");
}

export default function RezervasyonForm() {
  // URL params ve localStorage'dan başlangıç verilerini oku
  const params = useSearchParams();
  const initialFrom = params.get("from") || "";
  const initialTo = params.get("to") || "";
  const initialDate = params.get("date") || "";
  const initialTime = params.get("time") || "";
  const initialVehicle = params.get("vehicle") || "";
  const initialPeople = Number(params.get("people")) || 1;

  const locations = useLocationData();

  // Form State
  const [segment, setSegment] = useState("ekonomik");
  const [transfer, setTransfer] = useState("");
  const [vehicle, setVehicle] = useState(initialVehicle);
  const [people, setPeople] = useState(initialPeople);
  const [extras, setExtras] = useState([]);
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [fromSug, setFromSug] = useState([]);
  const [toSug, setToSug] = useState([]);
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [tc, setTc] = useState("");
  const [phone, setPhone] = useState("");
  const [pnr, setPnr] = useState("");
  const [note, setNote] = useState("");
  const [showSummary, setShowSummary] = useState(false);

  // Araç ve transfer seçenekleri
  const availableTransfers = transferTypes[segment] || [];
  const availableVehicles = vehicles.filter(v => {
    if (transfer) {
      return v.segment?.toLowerCase() === segment && (v.transferTypes || []).includes(transfer);
    } else {
      return v.segment?.toLowerCase() === segment;
    }
  });
  const vehicleObj = availableVehicles.find(v => v.value === vehicle) || vehicles.find(v => v.value === vehicle);
  const maxPeople = vehicleObj?.max || 1;
  const availableExtras = vehicleObj?.extras || [];
  const basePrice = vehicleObj?.price || 1500;
  const extrasPrice = extrasList.filter(e => extras.includes(e.key)).reduce((sum, e) => sum + (e.price || 0), 0);
  const totalPrice = basePrice + extrasPrice;

  // Autocomplete (Tüm veriler DB'den anında gelir)
  const getSuggestions = v =>
    !v ? [] : locations.filter(l => l?.toLowerCase().includes(v.toLowerCase())).slice(0, 8);

  useEffect(() => { setFromSug(getSuggestions(from)); }, [from, locations]);
  useEffect(() => { setToSug(getSuggestions(to)); }, [to, locations]);
  useEffect(() => { setTransfer(""); setVehicle(""); setPeople(1); setExtras([]); }, [segment]);
  useEffect(() => { setVehicle(""); setPeople(1); setExtras([]); }, [transfer]);
  useEffect(() => { setPeople(1); setExtras([]); }, [vehicle]);

  // Otomatik validasyon
  const validate = () => {
    if (!from || !to || !date || !time || !name || !surname || !tc || !phone) return false;
    if (needsPnr(from, to) && !pnr) return false;
    if (!vehicle) return false;
    return true;
  };

  // Kayıt / Gönderim
  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return alert("Lütfen eksiksiz doldurun!");
    setShowSummary(true);
    // --- Burada API endpoint'e POST ile db'e kayıt da ekleyebilirsin
    // fetch('/api/rezervasyonlar', { method: "POST", body: JSON.stringify({...}) })
  }

  // Özet Modal
  const Summary = () => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 relative">
        <button onClick={() => setShowSummary(false)} className="absolute top-2 right-4 text-2xl font-bold text-red-500 hover:text-red-700">×</button>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Rezervasyon Özeti</h2>
        <div className="mb-2 space-y-1 text-black text-base">
          <div><b>Transfer Türü:</b> {transfer}</div>
          <div><b>Araç:</b> {vehicleObj?.label}</div>
          <div><b>Kişi:</b> {people}</div>
          <div><b>Nereden:</b> {from}</div>
          <div><b>Nereye:</b> {to}</div>
          <div><b>Tarih:</b> {date} {time}</div>
          <div><b>Ad Soyad:</b> {name} {surname} – T.C.: {tc}</div>
          <div><b>Telefon:</b> {phone}</div>
          {needsPnr(from, to) && (<div><b>PNR/Uçuş No:</b> {pnr}</div>)}
          <div><b>Ekstralar:</b> {extrasList.filter(e => extras.includes(e.key)).map(e => e.label).join(", ") || "Yok"}</div>
          {note && (<div><b>Ek Not:</b> {note}</div>)}
        </div>
        <div className="text-xl font-bold text-right my-4">Toplam: <span className="text-green-700">{totalPrice}₺</span></div>
        <button
          onClick={() => alert("Demo: Ödeme sayfasına yönlendirme yapılacak! (Burada gerçek ödeme API'si bağlanır.)")}
          className="w-full py-3 rounded-xl bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition"
        >Onayla ve Öde</button>
      </div>
    </div>
  );

  // ---- FORM ----
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="w-full max-w-4xl p-6 md:p-10 rounded-3xl shadow-2xl bg-[#181818] border border-yellow-700">
        <h1 className="text-3xl font-bold mb-8 text-center text-yellow-400">VIP Rezervasyon Formu</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit} autoComplete="off">
          {/* Nereden */}
          <div className="relative">
            <label className="text-gold">Nereden?</label>
            <input
              type="text"
              className="input"
              placeholder="il/ilçe/mahalle/sokak/havalimanı"
              value={from}
              onChange={e => setFrom(e.target.value)}
              required
              autoComplete="off"
            />
            {fromSug.length > 0 && (
              <ul className="bg-white border mt-1 rounded shadow absolute z-50 w-full text-black max-h-52 overflow-auto">
                {fromSug.map((t, i) => (
                  <li key={i} className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setFrom(t)}
                  >{t}</li>
                ))}
              </ul>
            )}
          </div>
          {/* Nereye */}
          <div className="relative">
            <label className="text-gold">Nereye?</label>
            <input
              type="text"
              className="input"
              placeholder="il/ilçe/mahalle/sokak/havalimanı"
              value={to}
              onChange={e => setTo(e.target.value)}
              required
              autoComplete="off"
            />
            {toSug.length > 0 && (
              <ul className="bg-white border mt-1 rounded shadow absolute z-50 w-full text-black max-h-52 overflow-auto">
                {toSug.map((t, i) => (
                  <li key={i} className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setTo(t)}
                  >{t}</li>
                ))}
              </ul>
            )}
          </div>
          {/* Segment */}
          <div>
            <label className="text-gold">Segment</label>
            <select className="input" value={segment} onChange={e => setSegment(e.target.value)} required>
              {segments.map(s => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </div>
          {/* Transfer Tipi */}
          <div>
            <label className="text-gold">Transfer Türü</label>
            <select className="input" value={transfer} onChange={e => setTransfer(e.target.value)} required>
              <option value="">Seçiniz</option>
              {availableTransfers.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          {/* Araç Tipi */}
          <div>
            <label className="text-gold">Araç Tipi</label>
            <select className="input" value={vehicle} onChange={e => setVehicle(e.target.value)} required>
              <option value="">Seçiniz</option>
              {availableVehicles.map(v => (
                <option key={v.value} value={v.value}>{v.label}</option>
              ))}
            </select>
          </div>
          {/* Kişi */}
          <div>
            <label className="text-gold">Kişi Sayısı</label>
            <select className="input" value={people} onChange={e => setPeople(Number(e.target.value))} required>
              {Array.from({ length: maxPeople }, (_, i) => i + 1).map(val =>
                <option key={val} value={val}>{val}</option>
              )}
            </select>
          </div>
          {/* Tarih */}
          <div>
            <label className="text-gold">Tarih</label>
            <input type="date" className="input" value={date} onChange={e => setDate(e.target.value)} required />
          </div>
          {/* Saat */}
          <div>
            <label className="text-gold">Saat</label>
            <input type="time" className="input" value={time} onChange={e => setTime(e.target.value)} required />
          </div>
          {/* Ekstralar */}
          <div className="col-span-2">
            <label className="text-gold">Ekstralar</label>
            <div className="flex flex-wrap gap-2">
              {availableExtras.length === 0 && <span className="text-gray-400">Bu araç için ekstra seçenek yok</span>}
              {availableExtras.map(extraKey => {
                const extra = extrasList.find(e => e.key === extraKey);
                return (
                  <label key={extra.key} className="flex items-center gap-2 cursor-pointer bg-black/50 px-4 py-2 rounded border border-gold">
                    <input
                      type="checkbox"
                      checked={extras.includes(extra.key)}
                      onChange={() =>
                        setExtras(prev => prev.includes(extra.key)
                          ? prev.filter(k => k !== extra.key)
                          : [...prev, extra.key]
                        )
                      }
                    />
                    <span>{extra.label} <span className="text-xs text-gray-400">+{extra.price}₺</span></span>
                  </label>
                );
              })}
            </div>
          </div>
          {/* Müşteri Bilgileri */}
          <div>
            <label className="text-gold">Ad</label>
            <input type="text" className="input" placeholder="Adınız" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label className="text-gold">Soyad</label>
            <input type="text" className="input" placeholder="Soyadınız" value={surname} onChange={e => setSurname(e.target.value)} required />
          </div>
          <div>
            <label className="text-gold">T.C. Kimlik No</label>
            <input type="text" className="input" placeholder="T.C." value={tc} onChange={e => setTc(e.target.value)} required />
          </div>
          <div>
            <label className="text-gold">Telefon</label>
            <input type="tel" className="input" placeholder="05xx..." value={phone} onChange={e => setPhone(e.target.value)} required />
          </div>
          {/* Havalimanı ise PNR/Uçuş No */}
          {needsPnr(from, to) && (
            <div className="col-span-2">
              <label className="text-gold">PNR / Uçuş No</label>
              <input type="text" className="input" placeholder="Uçuş kodunuz" value={pnr} onChange={e => setPnr(e.target.value)} required />
            </div>
          )}
          {/* Ek Not */}
          <div className="col-span-2">
            <label className="text-gold">Ek Not</label>
            <textarea className="input" placeholder="Eklemek istediğiniz bir not var mı?" value={note} onChange={e => setNote(e.target.value)} />
          </div>
          {/* Fiyat ve Özet */}
          <div className="col-span-2 flex flex-col items-end gap-2">
            <div className="text-xl text-yellow-400 font-bold">
              Toplam Tutar: <span className="text-green-400">{totalPrice}₺</span>
            </div>
            <button type="submit" className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-8 rounded-xl w-full text-xl shadow hover:scale-105 transition">
              Rezervasyonu Tamamla
            </button>
          </div>
        </form>
        {showSummary && <Summary />}
      </div>
    </div>
  );
}
