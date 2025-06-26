// app/rezervasyon/RezervasyonForm.jsx
"use client";
import { useState } from "react";
import EkstralarAccordion from "./EkstralarAccordion";
import AdresAutoComplete from "./AdresAutoComplete";
import { vehicles } from "../../data/vehicleList";
import { useRouter } from "next/navigation";

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
const KDV_ORAN = 0.20;
const saatler = [];
for (let h = 0; h < 24; ++h)
  for (let m of [0, 15, 30, 45]) saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);

function normalize(str) {
  return (str || "")
    .toLocaleLowerCase("tr-TR")
    .replace(/&/g, "ve")
    .replace(/[çÇ]/g, "c")
    .replace(/[ğĞ]/g, "g")
    .replace(/[ıİ]/g, "i")
    .replace(/[öÖ]/g, "o")
    .replace(/[şŞ]/g, "s")
    .replace(/[üÜ]/g, "u")
    .replace(/[,\.]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function RezervasyonForm() {
  const router = useRouter();
  // STATE
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [people, setPeople] = useState(1);
  const [segment, setSegment] = useState("");
  const [transfer, setTransfer] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [tc, setTc] = useState("");
  const [phone, setPhone] = useState("");
  const [pnr, setPnr] = useState("");
  const [note, setNote] = useState("");
  const [extras, setExtras] = useState([]);
  const [extrasQty, setExtrasQty] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  function handleTcChange(val) {
    setTc(val.replace(/\D/g, "").slice(0, 11));
  }
  function handlePhoneChange(val) {
    let num = val.replace(/\D/g, "");
    if (num.length > 0 && num[0] !== "0") num = "0" + num;
    setPhone(num.slice(0, 11));
  }

  // FORM SUBMITTE POPUP AÇ
  function handleSubmit(e) {
    e.preventDefault();
    setShowSummary(true);
  }

  // --- REZERVASYON ÖZETİ POPUP ---
  function SummaryPopup({ onClose }) {
    const basePrice = 4000;
    const allExtras = require("../../data/extrasByCategory").extrasListByCategory.flatMap(cat => cat.items);
    const selectedExtras = allExtras.filter(e => extras.includes(e.key));
    const extrasTotal = selectedExtras.reduce((sum, e) => sum + (e.price * (extrasQty[e.key] || 1)), 0);
    const araToplam = basePrice + extrasTotal;
    const kdv = araToplam * KDV_ORAN;
    const toplam = araToplam + kdv;

    // Adet arttır/azalt & sil
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

    // Onayla ve Ödemeye Geç
    function handlePayment() {
      // Tüm bilgileri query string olarak gönder
      const params = new URLSearchParams({
        from, to, people, segment, transfer, vehicle, date, time, name, surname, tc, phone, pnr, note,
        extras: extras.join(","), // dizi olarak string gönder
        extrasQty: JSON.stringify(extrasQty), // obje olarak string
      }).toString();
      router.push(`/odeme?${params}`);
    }

    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
        <div className="bg-[#19160a] rounded-3xl border border-[#bfa658] max-w-2xl w-full shadow-2xl p-8 md:p-12 overflow-y-auto max-h-[92vh] relative">
          <button onClick={onClose} className="absolute top-3 right-5 text-3xl font-bold text-[#ffeec2] hover:text-yellow-400">×</button>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-[#bfa658] text-center font-quicksand">
            Rezervasyon Özeti
          </h2>
          <div className="mb-5 space-y-2 text-[#ffeec2] text-base">
            <div><b>Transfer:</b> {transfer || "-"}</div>
            <div><b>Araç:</b> {vehicle || "-"}</div>
            <div><b>Kişi:</b> {people}</div>
            <div><b>Nereden:</b> {from}</div>
            <div><b>Nereye:</b> {to}</div>
            <div><b>Tarih/Saat:</b> {date} {time}</div>
            <div><b>Ad Soyad:</b> {name} {surname} – T.C.: {tc}</div>
            <div><b>Telefon:</b> {phone}</div>
            {pnr && <div><b>PNR/Uçuş Kodu:</b> {pnr}</div>}
            {note && <div><b>Ek Not:</b> {note}</div>}
            <div className="pt-2"><b>Ekstralar:</b>
              {selectedExtras.length === 0 && <span className="text-gray-400 ml-2">Ekstra yok</span>}
              {selectedExtras.map(extra => (
                <div key={extra.key} className="flex items-center gap-2 text-sm mt-1">
                  <span>{extra.label}</span>
                  <button type="button" className="px-2 text-lg font-bold text-gold" onClick={() => changeQty(extra.key, -1)}>-</button>
                  <span className="w-8 text-center">{extrasQty[extra.key] || 1}</span>
                  <button type="button" className="px-2 text-lg font-bold text-gold" onClick={() => changeQty(extra.key, +1)}>+</button>
                  <span className="ml-2">{extra.price}₺</span>
                  <button type="button" onClick={() => removeExtra(extra.key)} className="ml-2 text-red-400 font-bold hover:underline">Sil</button>
                </div>
              ))}
            </div>
            <div className="pt-2 text-right text-base">
              <div><b>Transfer Bedeli:</b> {basePrice.toLocaleString()} ₺</div>
              <div><b>Ekstralar:</b> {extrasTotal.toLocaleString()} ₺</div>
              <div><b>KDV (%20):</b> {kdv.toLocaleString(undefined, { maximumFractionDigits: 2 })} ₺</div>
              <div className="text-lg font-extrabold"><b>Toplam:</b> {toplam.toLocaleString()} ₺</div>
            </div>
          </div>
          <button
            onClick={handlePayment}
            className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold text-lg hover:scale-105 transition"
          >
            Onayla ve Ödemeye Geç
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full max-w-4xl mx-auto rounded-3xl shadow-2xl bg-[#19160a] border border-[#bfa658] px-6 md:px-12 py-14 my-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-8 text-center font-quicksand">
        VIP Rezervasyon Formu
      </h1>
      <form
        onSubmit={handleSubmit}
        autoComplete="on"
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Nereden?</label>
          <AdresAutoComplete
            value={from}
            onChange={setFrom}
            placeholder="Nereden? İl / İlçe / Mahalle / Havalimanı"
          />
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
          <AdresAutoComplete
            value={to}
            onChange={setTo}
            placeholder="Nereye? İl / İlçe / Mahalle / Havalimanı"
          />
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Kişi Sayısı</label>
          <select name="people" className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            value={people}
            onChange={e => setPeople(Number(e.target.value))}>
            {Array.from({ length: 8 }, (_, i) => i + 1).map(val =>
              <option key={val} value={val}>{val}</option>
            )}
          </select>
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
          <select name="segment" className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            value={segment}
            onChange={e => setSegment(e.target.value)}>
            <option value="">Seçiniz</option>
            {segmentOptions.map(opt =>
              <option key={opt.key} value={opt.label}>{opt.label}</option>
            )}
          </select>
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Transfer Türü</label>
          <select name="transfer" className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            value={transfer}
            onChange={e => setTransfer(e.target.value)}>
            <option value="">Seçiniz</option>
            {allTransfers.map(opt =>
              <option key={opt} value={opt}>{opt}</option>
            )}
          </select>
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Araç</label>
          <select name="vehicle" className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            value={vehicle}
            onChange={e => setVehicle(e.target.value)}>
            <option value="">Seçiniz</option>
            {vehicles.map(opt =>
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            )}
          </select>
        </div>
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
          />
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
          <select name="time" className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            value={time}
            onChange={e => setTime(e.target.value)}>
            <option value="">Seçiniz</option>
            {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
          </select>
        </div>
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
        <div className="md:col-span-2">
          <label className="font-bold text-[#bfa658] mb-1 block">Ek Not</label>
          <textarea
            className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            rows={2}
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Eklemek istediğiniz bir not var mı?"
          />
        </div>
        <div className="md:col-span-2">
          <label className="font-bold text-[#bfa658] mb-2 block text-lg">Ekstralar</label>
          <EkstralarAccordion
            selectedExtras={extras}
            setSelectedExtras={setExtras}
            extrasQty={extrasQty}
            setExtrasQty={setExtrasQty}
          />
        </div>
        <div className="md:col-span-2 flex justify-end mt-6">
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-12 rounded-xl text-xl shadow hover:scale-105 transition"
          >
            Rezervasyonu Tamamla
          </button>
        </div>
      </form>
      {showSummary && <SummaryPopup onClose={() => setShowSummary(false)} />}
    </section>
  );
}
