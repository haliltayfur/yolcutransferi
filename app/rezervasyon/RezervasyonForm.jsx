"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { vehicles } from "../../data/vehicles";
import { extrasList } from "../../data/extras";

// Demo amaçlı en geniş autocomplete datası için localStorage veya büyük JSON fetch'i önerilir.
const useLocations = () => {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    Promise.all([
      fetch("/dumps/airports.json").then(r => r.json()),
      fetch("/dumps/iller.metadata.json").then(r => r.json()),
      fetch("/dumps/ilceler.metadata.json").then(r => r.json()),
      fetch("/dumps/mahalleler.metadata.json").then(r => r.json()),
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

// Segment ve transfer tipleri
const segments = [
  { key: "Ekonomik", label: "Ekonomik" },
  { key: "Lüks", label: "Lüks" },
  { key: "VIP", label: "VIP" }
];
const transferTypes = {
  Ekonomik: [
    "Şehirlerarası Transfer", "Kurumsal & Toplu Transfer", "Tur & Gezi Transferi"
  ],
  Lüks: [
    "VIP Havalimanı Transferi", "Şehirlerarası Transfer", "Tur & Gezi Transferi", "Kurumsal & Toplu Transfer"
  ],
  VIP: [
    "VIP Havalimanı Transferi", "Şehirlerarası Transfer", "Kurumsal & Toplu Transfer", "Tur & Gezi Transferi", "Düğün & Özel Etkinlik Transferi", "Drone Yolcu Transferi"
  ]
};

function needsPnr(from, to) {
  const lower = [from, to].join(" ").toLocaleLowerCase("tr-TR");
  return lower.includes("havalimanı") || lower.includes("airport");
}

export default function RezervasyonForm() {
  // URL parametreleri
  const params = useSearchParams();
  const initialFrom = params.get("from") || "";
  const initialTo = params.get("to") || "";
  const initialDate = params.get("date") || "";
  const initialTime = params.get("time") || "";
  const initialVehicle = params.get("vehicle") || "";
  const initialPeople = Number(params.get("people")) || 1;

  const locations = useLocations();

  // State
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [fromSug, setFromSug] = useState([]);
  const [toSug, setToSug] = useState([]);
  const [showFromSug, setShowFromSug] = useState(false);
  const [showToSug, setShowToSug] = useState(false);

  const [people, setPeople] = useState(initialPeople);
  const [segment, setSegment] = useState("VIP");
  const [transfer, setTransfer] = useState("");
  const [vehicle, setVehicle] = useState(initialVehicle);
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);

  const [extras, setExtras] = useState([]);
  const [extraCounts, setExtraCounts] = useState({});
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [tc, setTc] = useState("");
  const [phone, setPhone] = useState("");
  const [pnr, setPnr] = useState("");
  const [note, setNote] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [sozlesmeOnay, setSozlesmeOnay] = useState(false);

  // Autocomplete filtreleri
  function getSuggestions(q) {
    if (!q || q.length < 2) return [];
    return locations.filter(l => l.toLowerCase().includes(q.toLowerCase())).slice(0, 20);
  }

  useEffect(() => { setFromSug(getSuggestions(from)); }, [from, locations]);
  useEffect(() => { setToSug(getSuggestions(to)); }, [to, locations]);

  // Araç filtreleme (kapasite ve segment/transfer tipine uygun)
  const availableTransfers = transferTypes[segment] || [];
  const availableVehicles = vehicles.filter(
    v =>
      v.segment === segment &&
      (!transfer || (v.transferTypes || []).includes(transfer)) &&
      v.max >= people
  );

  // Saat slotları
  const saatler = [];
  for (let h = 0; h < 24; h++) {
    ["00", "15", "30", "45"].forEach(m => {
      saatler.push(`${h.toString().padStart(2, "0")}:${m}`);
    });
  }

  // Ekstralar filtrele
  const availableExtras = (vehicles.find(v => v.value === vehicle)?.extras || []);
  useEffect(() => {
    setExtras([]); setExtraCounts({});
  }, [vehicle]);

  // TC kimlik ve telefon validasyon
  const handleTcChange = (val) => {
    let cleaned = val.replace(/\D/g, "").slice(0, 11);
    setTc(cleaned);
  };
  const handlePhoneChange = (val) => {
    let cleaned = val.replace(/\D/g, "");
    if (!cleaned.startsWith("0")) cleaned = "0" + cleaned;
    setPhone(cleaned.slice(0, 11));
  };

  // Tıklayınca takvimi açtır
  const dateRef = useRef();
  const focusDate = () => dateRef.current && dateRef.current.showPicker && dateRef.current.showPicker();

  // Toplam fiyat - Sadece özet popup'ta hesaplanacak
  function calcTotal() {
    const vehicleObj = vehicles.find(v => v.value === vehicle);
    const base = vehicleObj?.price || 0;
    let extraTotal = 0;
    for (const k of extras) {
      const adet = extraCounts[k] || 1;
      const e = extrasList.find(e => e.key === k);
      if (e) extraTotal += adet * (e.price || 0);
    }
    const kdv = Math.round((base + extraTotal) * 0.2);
    const sigorta = 0; // örnek
    return { base, extraTotal, kdv, sigorta, toplam: base + extraTotal + kdv + sigorta };
  }

  // Validasyon
  const validate = () => {
    if (!from || !to || !date || !time || !vehicle || !name || !surname || !tc || !phone) return false;
    if (needsPnr(from, to) && !pnr) return false;
    if (!sozlesmeOnay) return false;
    if (tc.length !== 11) return false;
    if (phone.length !== 11) return false;
    return true;
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return alert("Lütfen tüm alanları eksiksiz doldurun!");
    setShowSummary(true);
  }

  // ---- FORM RENDER ----
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#16160a] to-[#2e2a1b]">
      <div className="w-full max-w-4xl p-6 md:p-10 rounded-3xl shadow-2xl bg-[#181818]/95 border border-yellow-700">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-yellow-400 tracking-tight">
          VIP Rezervasyon Formu
        </h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit} autoComplete="off">
          {/* Nereden */}
          <div className="relative">
            <label className="text-gold">Nereden?</label>
            <input
              className="input"
              value={from}
              onChange={e => { setFrom(e.target.value); setShowFromSug(true); }}
              placeholder="İl/ilçe/mahalle/sokak/havalimanı"
              autoComplete="off"
              onFocus={() => setShowFromSug(true)}
              onBlur={() => setTimeout(() => setShowFromSug(false), 150)}
            />
            {showFromSug && fromSug.length > 0 && (
              <ul className="bg-white border mt-1 rounded shadow absolute z-50 w-full text-black max-h-60 overflow-auto">
                {fromSug.map((t, i) => (
                  <li
                    key={i}
                    className="px-3 py-2 hover:bg-yellow-100 cursor-pointer"
                    onMouseDown={() => { setFrom(t); setShowFromSug(false); }}
                  >{t}</li>
                ))}
              </ul>
            )}
          </div>
          {/* Nereye */}
          <div className="relative">
            <label className="text-gold">Nereye?</label>
            <input
              className="input"
              value={to}
              onChange={e => { setTo(e.target.value); setShowToSug(true); }}
              placeholder="İl/ilçe/mahalle/sokak/havalimanı"
              autoComplete="off"
              onFocus={() => setShowToSug(true)}
              onBlur={() => setTimeout(() => setShowToSug(false), 150)}
            />
            {showToSug && toSug.length > 0 && (
              <ul className="bg-white border mt-1 rounded shadow absolute z-50 w-full text-black max-h-60 overflow-auto">
                {toSug.map((t, i) => (
                  <li
                    key={i}
                    className="px-3 py-2 hover:bg-yellow-100 cursor-pointer"
                    onMouseDown={() => { setTo(t); setShowToSug(false); }}
                  >{t}</li>
                ))}
              </ul>
            )}
          </div>
          {/* Kişi */}
          <div>
            <label className="text-gold">Kişi Sayısı</label>
            <select className="input" value={people} onChange={e => setPeople(Number(e.target.value))}>
              {Array.from({ length: 16 }, (_, i) => i + 1).map(i => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
          {/* Segment */}
          <div>
            <label className="text-gold">Segment</label>
            <select className="input" value={segment} onChange={e => setSegment(e.target.value)}>
              {segments.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
            </select>
          </div>
          {/* Transfer Tipi */}
          <div>
            <label className="text-gold">Transfer Türü</label>
            <select className="input" value={transfer} onChange={e => setTransfer(e.target.value)}>
              <option value="">Seçiniz</option>
              {availableTransfers.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          {/* Araç */}
          <div>
            <label className="text-gold">Araç</label>
            <select className="input" value={vehicle} onChange={e => setVehicle(e.target.value)}>
              <option value="">Seçiniz</option>
              {availableVehicles.length === 0 && <option disabled>Uygun araç yok</option>}
              {availableVehicles.map(v => (
                <option key={v.value} value={v.value}>{v.label} ({v.max} kişilik)</option>
              ))}
            </select>
          </div>
          {/* Tarih */}
          <div>
            <label className="text-gold">Tarih</label>
            <input
              ref={dateRef}
              type="date"
              className="input"
              value={date}
              onChange={e => setDate(e.target.value)}
              onClick={focusDate}
              required
              min={new Date().toISOString().split("T")[0]}
              style={{ cursor: "pointer" }}
            />
          </div>
          {/* Saat */}
          <div>
            <label className="text-gold">Saat</label>
            <select className="input" value={time} onChange={e => setTime(e.target.value)} required>
              <option value="">Seçiniz</option>
              {saatler.map((s, i) => <option key={i} value={s}>{s}</option>)}
            </select>
          </div>
          {/* Ad */}
          <div>
            <label className="text-gold">Ad</label>
            <input type="text" className="input" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          {/* Soyad */}
          <div>
            <label className="text-gold">Soyad</label>
            <input type="text" className="input" value={surname} onChange={e => setSurname(e.target.value)} required />
          </div>
          {/* TC */}
          <div>
            <label className="text-gold">T.C. Kimlik No</label>
            <input
              type="text"
              className="input"
              inputMode="numeric"
              value={tc}
              onChange={e => handleTcChange(e.target.value)}
              required
              maxLength={11}
              pattern="\d{11}"
            />
          </div>
          {/* Telefon */}
          <div>
            <label className="text-gold">Telefon</label>
            <input
              type="tel"
              className="input"
              inputMode="numeric"
              value={phone}
              onChange={e => handlePhoneChange(e.target.value)}
              required
              maxLength={11}
              pattern="0\d{10}"
            />
          </div>
          {/* PNR */}
          {needsPnr(from, to) && (
            <div className="col-span-2">
              <label className="text-gold">PNR / Uçuş No</label>
              <input type="text" className="input" value={pnr} onChange={e => setPnr(e.target.value)} required />
            </div>
          )}
          {/* Ek Not */}
          <div className="col-span-2">
            <label className="text-gold">Ek Not</label>
            <textarea className="input" value={note} onChange={e => setNote(e.target.value)} />
          </div>
          {/* Ekstralar */}
          <div className="col-span-2">
            <label className="text-gold">Ekstralar</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {availableExtras.length === 0 && <span className="text-gray-400">Bu araç için ekstra yok</span>}
              {availableExtras.map(extraKey => {
                const extra = extrasList.find(e => e.key === extraKey);
                const count = extraCounts[extraKey] || 0;
                return (
                  <div key={extraKey} className="flex items-center gap-2 bg-black/40 border border-gold rounded px-3 py-2">
                    <button
                      type="button"
                      className="px-2 py-1 text-lg font-bold rounded bg-yellow-700 text-white"
                      onClick={() => setExtraCounts(c => ({ ...c, [extraKey]: Math.max(0, (c[extraKey] || 0) - 1) }))}
                    >-</button>
                    <span>{extra.label}</span>
                    <span className="text-xs text-gray-400">+{extra.price}₺</span>
                    <span className="font-bold">{count}</span>
                    <button
                      type="button"
                      className="px-2 py-1 text-lg font-bold rounded bg-yellow-700 text-white"
                      onClick={() => { setExtraCounts(c => ({ ...c, [extraKey]: (c[extraKey] || 0) + 1 })); if (!extras.includes(extraKey)) setExtras([...extras, extraKey]); }}
                    >+</button>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Mesafeli Satış Onayı */}
          <div className="col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="sozlesme"
              checked={sozlesmeOnay}
              onChange={e => setSozlesmeOnay(e.target.checked)}
              required
              className="w-5 h-5"
            />
            <label htmlFor="sozlesme" className="text-xs">
              <a href="/mesafeli-satis" target="_blank" className="underline text-yellow-400">Mesafeli Satış Sözleşmesini</a> okudum ve onaylıyorum.
            </label>
          </div>
          {/* Submit */}
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-12 rounded-xl text-xl shadow hover:scale-105 transition"
            >
              Rezervasyonu Tamamla
            </button>
          </div>
        </form>
        {showSummary && (
          <SummaryPopup
            data={{
              from, to, date, time, people, segment, transfer, vehicle, name, surname, tc, phone, pnr, note, extras, extraCounts
            }}
            onClose={() => setShowSummary(false)}
            calcTotal={calcTotal}
            extrasList={extrasList}
          />
        )}
      </div>
    </div>
  );
}

// -- Sipariş Özeti Pop-up Bileşeni --
function SummaryPopup({ data, onClose, calcTotal, extrasList }) {
  const { from, to, date, time, people, segment, transfer, vehicle, name, surname, tc, phone, pnr, note, extras, extraCounts } = data;
  const totals = calcTotal();
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-8 relative border-2 border-yellow-500">
        <button onClick={onClose} className="absolute top-3 right-6 text-3xl font-bold text-red-600 hover:text-red-900">×</button>
        <h2 className="text-2xl font-bold mb-4 text-center text-yellow-600">Sipariş Özeti</h2>
        <div className="space-y-2 text-black text-base">
          <div><b>Transfer:</b> {from} → {to}</div>
          <div><b>Tarih/Saat:</b> {date} {time}</div>
          <div><b>Araç:</b> {vehicle}</div>
          <div><b>Kişi:</b> {people}</div>
          <div><b>Ad Soyad:</b> {name} {surname} – T.C.: {tc}</div>
          <div><b>Telefon:</b> {phone}</div>
          {pnr && (<div><b>PNR/Uçuş No:</b> {pnr}</div>)}
          <div><b>Ek Not:</b> {note || "-"}</div>
        </div>
        <div className="my-6">
          <h3 className="font-bold text-lg text-yellow-700 mb-2">Fiyat Kalemleri</h3>
          <div className="flex flex-col gap-1">
            <span>Transfer Bedeli: <b>{totals.base}₺</b></span>
            <span>Ekstralar: <b>{totals.extraTotal}₺</b></span>
            <span>KDV (%20): <b>{totals.kdv}₺</b></span>
            {/* Gerekirse burada sigorta, hizmet bedeli vs. ekleyebilirsin */}
          </div>
          <div className="text-right mt-2 text-2xl text-green-700 font-bold">
            Toplam: {totals.toplam}₺
          </div>
        </div>
        <button
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-xl font-bold text-lg transition"
          onClick={() => { alert("Demo: Ödeme adımına geçilecek!"); }}
        >Ödeme Adımına Geç</button>
      </div>
    </div>
  );
}
