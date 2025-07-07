// PATH: /components/VipTransferForm.jsx

"use client";
import React, { useState, useEffect } from "react";
import EkstralarAccordion from "../data/EkstralarAccordion.jsx";
import { vehicles } from "../data/vehicleList.js";
import { extrasListByCategory } from "../data/extrasByCategory.js";

// === Otomatik Adres ===
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
      sehir.forEach(s => out.push(`${s.sehir_adi}`));
      ilce.forEach(i => out.push(`${i.ilce_adi}`));
      mahalle.forEach(m => out.push(`${m.mahalle_adi}`));
      airport.forEach(a => out.push(`${a.name}`));
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
      const val = value.toLocaleLowerCase("tr-TR");
      setSuggestions(addressList.filter(a => a.toLocaleLowerCase("tr-TR").includes(val)).slice(0, 12));
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

// === Mesafe & Süre ===
function useDistance(from, to, time) {
  const [data, setData] = useState({ km: "", min: "", error: "" });
  useEffect(() => {
    if (!from || !to) return;
    async function fetchDist() {
      setData({ km: "...", min: "...", error: "" });
      setTimeout(() => setData({
        km: Math.floor(25 + Math.random() * 180) + " km",
        min: (time && +time.split(":")[0] >= 7 && +time.split(":")[0] <= 10) ? "Yoğun Saat: 90 dk" : (30 + Math.random() * 60 | 0) + " dk",
        error: ""
      }), 800);
    }
    fetchDist();
  }, [from, to, time]);
  return data;
}

// === Araç Kombinasyonu ===
function bestVehicleCombos(people, segment) {
  if (!people || !segment) return [];
  people = Number(people);
  let candidates = vehicles.filter(v => v.segment === segment && v.max >= people);
  if (people <= 5) candidates = candidates.filter(v => v.max <= 5);
  else if (people <= 9) candidates = candidates.filter(v => v.max <= 9);
  if (candidates.length === 0)
    candidates = vehicles.filter(v => v.segment === segment && v.max >= people);
  if (candidates.length === 0) return [];
  candidates = candidates.sort((a, b) => a.max - b.max);
  let combos = [];
  let best = candidates.find(v => v.max >= people);
  if (best) combos.push([{ ...best, count: 1 }]);
  return combos;
}

// === PNR GÖSTER ===
const airportKeywords = [
  "havalimanı", "istanbul havalimanı", "iga", "ist", "sabiha gökçen", "saw", "eskişehir havalimanı",
  "antalya havalimanı", "ankara esenboğa", "esenboğa", "milas bodrum", "izmir adnan", "trabzon havalimanı"
];
function isAirportRelated(val) {
  if (!val) return false;
  const t = val.toLocaleLowerCase("tr-TR");
  return airportKeywords.some(k => t.includes(k));
}

// === POPUP ===
function SummaryPopup({ visible, onClose, form, extras, extrasQty, setExtras, setExtrasQty, combos, kmInfo, minInfo }) {
  if (!visible) return null;
  const basePrice = 4000;
  const KDV_ORAN = 0.20;
  const allExtras = extrasListByCategory.flatMap(cat => cat.items);
  const selectedExtras = allExtras.filter(e => extras.includes(e.key));
  const extrasTotal = selectedExtras.reduce((sum, e) => sum + (e.price * (extrasQty[e.key] || 1)), 0);
  const araToplam = basePrice + extrasTotal;
  const kdv = araToplam * KDV_ORAN;
  const toplam = araToplam + kdv;

  function changeQty(key, dir) {
    setExtrasQty(q => ({
      ...q,
      [key]: Math.max(1, (q[key] || 1) + dir)
    }));
  }
  function removeExtra(key) {
    setExtras(es => es.filter(k => k !== key));
    setExtrasQty(q => {
      const { [key]: _, ...rest } = q;
      return rest;
    });
  }

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/80">
      <div className="relative bg-[#19160a] border-2 border-[#bfa658] rounded-2xl w-full max-w-3xl max-h-[97vh] overflow-y-auto px-8 py-10">
        <button
          className="absolute top-4 right-4 bg-[#bfa658] text-black font-bold rounded-xl px-5 py-2 text-lg shadow hover:bg-yellow-400 transition"
          onClick={onClose}
        >Kapat</button>
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-[#bfa658] text-center font-quicksand">
          Rezervasyon Özeti
        </h2>
        <div className="flex flex-col md:flex-row gap-8 mb-6">
          <div className="flex-1 space-y-1 text-[#ffeec2] text-base">
            <div><b>Nereden:</b> {form.from}</div>
            <div><b>Nereye:</b> {form.to}</div>
            <div><b>Mesafe:</b> {kmInfo}   <b>Süre:</b> {minInfo}</div>
            <div><b>Kişi:</b> {form.people}</div>
            <div><b>Tarih:</b> {form.date}</div>
            <div><b>Saat:</b> {form.time}</div>
            <div><b>Transfer:</b> {form.transfer}</div>
            <div><b>Segment:</b> {form.segment}</div>
            <div><b>Ad Soyad:</b> {form.name} {form.surname}</div>
            <div><b>T.C.:</b> {form.tc}</div>
            <div><b>Telefon:</b> {form.phone}</div>
            <div><b>E-posta:</b> {form.email}</div>
            {form.pnr && <div><b>PNR/Uçuş Kodu:</b> {form.pnr}</div>}
            <div><b>Ek Not:</b> {form.note}</div>
          </div>
          <div className="flex-1">
            <b className="block mb-2 text-[#bfa658] text-lg">Araç Kombinasyonları:</b>
            {combos.length === 0 && <div className="text-red-400">Uygun araç bulunamadı.</div>}
            {combos.map((combo, idx) => (
              <div key={idx} className="border border-[#bfa658] rounded-xl p-2 mb-2 flex flex-row items-center gap-2 bg-black/70">
                {combo.map((v, i) =>
                  <span key={v.label + i} className="px-2 py-1 rounded bg-[#bfa65833] text-[#ffeec2] font-semibold text-sm">
                    {v.label} <span className="text-[#bfa658]">x{v.count}</span>
                  </span>
                )}
              </div>
            ))}
            <div className="mt-2 text-sm text-[#ffeec2] opacity-90">
              Size en uygun ve kurumsal araç kombinasyonlarından biri rezerve edilecektir.
            </div>
          </div>
        </div>
        <div className="mb-6">
          <b className="block mb-2 text-[#bfa658] text-lg">Ekstralar:</b>
          {selectedExtras.length === 0 && <span className="text-gray-400">Ekstra yok</span>}
          {selectedExtras.length > 0 &&
            <table className="w-full text-base mb-3">
              <thead>
                <tr className="text-[#ffeec2] border-b border-[#bfa658]/40">
                  <th className="text-left py-1 pl-1">Ürün</th>
                  <th className="text-center w-20">Adet</th>
                  <th className="text-right w-28">Birim</th>
                  <th className="text-right w-28">Toplam</th>
                  <th className="text-center w-12"></th>
                </tr>
              </thead>
              <tbody>
                {selectedExtras.map(extra => (
                  <tr key={extra.key} className="border-b border-[#bfa658]/10">
                    <td className="py-1 pl-1">{extra.label}</td>
                    <td className="text-center">
                      <div className="flex items-center gap-1 justify-center">
                        <button type="button" className="px-2 text-lg font-bold text-gold" onClick={() => changeQty(extra.key, -1)}>-</button>
                        <span className="w-7 text-center">{extrasQty[extra.key] || 1}</span>
                        <button type="button" className="px-2 text-lg font-bold text-gold" onClick={() => changeQty(extra.key, +1)}>+</button>
                      </div>
                    </td>
                    <td className="text-right">{extra.price.toLocaleString()}₺</td>
                    <td className="text-right">{((extrasQty[extra.key] || 1) * extra.price).toLocaleString()}₺</td>
                    <td className="text-center">
                      <button type="button" onClick={() => removeExtra(extra.key)} className="text-red-400 font-bold hover:scale-125 transition-transform">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
        <div className="w-full flex flex-col items-end gap-1 mt-2 text-base">
          <div>Transfer Bedeli: <b>{basePrice.toLocaleString()} ₺</b></div>
          <div>Ekstralar: <b>{extrasTotal.toLocaleString()} ₺</b></div>
          <div>KDV (%20): <b>{kdv.toLocaleString(undefined, { maximumFractionDigits: 2 })} ₺</b></div>
          <div className="text-xl text-[#bfa658] font-bold">Toplam: {toplam.toLocaleString()} ₺</div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-4 mt-9">
          <button
            className="w-full md:w-auto bg-[#bfa658] hover:bg-[#ffeec2] text-black font-bold py-3 px-8 rounded-xl shadow-lg transition-colors"
            onClick={onClose}
          >
            Onayla ve Ödemeye Geç
          </button>
          <button
            className="w-full md:w-auto border border-[#bfa658] hover:bg-[#3b2c10] text-[#bfa658] font-semibold py-3 px-8 rounded-xl shadow-lg transition-colors"
            onClick={onClose}
            type="button"
          >
            Vazgeç
          </button>
        </div>
      </div>
    </div>
  );
}

// === ANA FORM ===
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

export default function VipTransferForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [people, setPeople] = useState("");
  const [segment, setSegment] = useState("");
  const [transfer, setTransfer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [tc, setTc] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pnr, setPnr] = useState("");
  const [note, setNote] = useState("");
  const [extras, setExtras] = useState([]);
  const [extrasQty, setExtrasQty] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  const { km, min, error: distErr } = useDistance(from, to, time);

  function handleTcChange(val) {
    setTc(val.replace(/\D/g, "").slice(0, 11));
  }
  function handlePhoneChange(val) {
    let num = val.replace(/\D/g, "");
    if (num.length > 0 && num[0] !== "0") num = "0" + num;
    setPhone(num.slice(0, 11));
  }
  const vehicleCombos = bestVehicleCombos(Number(people), segment);

  function handleSubmit(e) {
    e.preventDefault();
    setShowSummary(true);
  }

  const showVehicleCombos = segment && people;
  const showPNR = transfer === "VIP Havalimanı Transferi" || isAirportRelated(from) || isAirportRelated(to);

  return (
    <section className="w-full max-w-3xl mx-auto rounded-3xl shadow-2xl bg-[#19160a] border border-[#bfa658] px-6 md:px-10 py-12 my-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-8 text-center font-quicksand">
        VIP Transfer Formu
      </h1>
      <form onSubmit={handleSubmit} autoComplete="on" className="flex flex-col gap-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereden?</label>
            <AutoCompleteInput value={from} onChange={setFrom} placeholder="Nereden? İl / İlçe / Mahalle / Havalimanı" />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
            <AutoCompleteInput value={to} onChange={setTo} placeholder="Nereye? İl / İlçe / Mahalle / Havalimanı" />
          </div>
        </div>
        {from && to && (
          <div className="mb-3 text-[#ffeec2]">
            <span className="font-semibold">Tahmini mesafe:</span> {km}   |  
            <span className="font-semibold">Tahmini süre:</span> {min}
            {distErr && <span className="text-red-400 ml-3">{distErr}</span>}
            <span className="text-[#bfa658] ml-3 text-sm">(Trafik yoğunluğu ve saat bilgisine göre değişebilir)</span>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Kişi Sayısı</label>
            <select className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={people} onChange={e => setPeople(e.target.value)}>
              <option value="">Seçiniz</option>
              {Array.from({ length: 24 }, (_, i) => i + 1).map(val => <option key={val} value={val}>{val}</option>)}
            </select>
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
            <select className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={segment} onChange={e => setSegment(e.target.value)}>
              <option value="">Seçiniz</option>
              {segmentOptions.map(opt => <option key={opt.key} value={opt.label}>{opt.label}</option>)}
            </select>
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Transfer Türü</label>
            <select className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={transfer} onChange={e => setTransfer(e.target.value)}>
              <option value="">Seçiniz</option>
              {allTransfers.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Tarih</label>
            <input
              name="date"
              type="date"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={date}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              autoComplete="on"
              onClick={e => e.target.showPicker && e.target.showPicker()}
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
            <select className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={time}
              onChange={e => setTime(e.target.value)}>
              <option value="">Seçiniz</option>
              {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Ad</label>
            <input
              name="name"
              type="text"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={name}
              onChange={e => setName(e.target.value)}
              autoComplete="given-name"
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Soyad</label>
            <input
              name="surname"
              type="text"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={surname}
              onChange={e => setSurname(e.target.value)}
              autoComplete="family-name"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">T.C. Kimlik No</label>
            <input
              name="tc"
              type="text"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              maxLength={11}
              pattern="[0-9]*"
              value={tc}
              onChange={e => handleTcChange(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Telefon</label>
            <input
              name="phone"
              type="text"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              maxLength={11}
              pattern="[0-9]*"
              value={phone}
              onChange={e => handlePhoneChange(e.target.value)}
              autoComplete="tel"
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">E-posta</label>
            <input
              name="email"
              type="email"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="ornek@email.com"
            />
          </div>
        </div>
        {showPNR && (
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">PNR/Uçuş Kodu</label>
            <input
              name="pnr"
              type="text"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={pnr}
              onChange={e => setPnr(e.target.value)}
              placeholder="Uçuş rezervasyon kodu (varsa)"
            />
          </div>
        )}
        <div className="mb-3">
          <label className="font-bold text-[#bfa658] mb-1 block">Ek Not</label>
          <textarea
            className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            rows={2}
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Eklemek istediğiniz bir not var mı?"
          />
        </div>
        <div className="mb-2">
          <label className="font-bold text-[#bfa658] mb-2 block text-lg">Ekstralar</label>
          <EkstralarAccordion
            selectedExtras={extras}
            setSelectedExtras={setExtras}
            extrasQty={extrasQty}
            setExtrasQty={setExtrasQty}
          />
        </div>
        {showVehicleCombos && (
          <div className="mb-2">
            <label className="font-bold text-[#bfa658] mb-2 block text-lg">Araç Seçimi</label>
            <div className="text-[#ffeec2] text-base mb-1">
              Seçtiğiniz kişi sayısı ve araç segmentine göre uygun araçlar listelenmiştir.
            </div>
            {vehicleCombos.length > 0 ? (
              <div className="space-y-2">
                {vehicleCombos.map((combo, idx) => (
                  <div key={idx} className="border border-[#bfa658] rounded-xl p-2 flex flex-row items-center gap-2 bg-black/70">
                    {combo.map((v, i) =>
                      <span key={v.label + i} className="px-2 py-1 rounded bg-[#bfa65833] text-[#ffeec2] font-semibold text-sm">
                        {v.label} <span className="text-[#bfa658]">x{v.count}</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-red-400">Uygun araç bulunamadı.</div>
            )}
            <div className="mt-2 text-sm text-[#ffeec2] opacity-90">
              Size en uygun ve kurumsal araçlardan biri rezerve edilecektir.
            </div>
          </div>
        )}
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-12 rounded-xl text-xl shadow hover:scale-105 transition"
          >
            Rezervasyonu Tamamla
          </button>
        </div>
      </form>
      {/* REZERVASYON ÖZETİ */}
      <SummaryPopup
        visible={showSummary}
        onClose={() => setShowSummary(false)}
        form={{ from, to, people, segment, transfer, date, time, name, surname, tc, phone, email, pnr, note }}
        extras={extras}
        extrasQty={extrasQty}
        setExtras={setExtras}
        setExtrasQty={setExtrasQty}
        combos={vehicleCombos}
        kmInfo={km}
        minInfo={min}
      />
    </section>
  );
}
