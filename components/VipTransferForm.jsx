// PATH: /components/VipTransferForm.jsx

"use client";
import { useState, useEffect } from "react";
import EkstralarAccordion from "./EkstralarAccordion";
import AdresAutoComplete from "./AdresAutoComplete";
import { vehicles } from "../data/vehicleList";
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

export default function VipTransferForm() {
  const router = useRouter();
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
  const [fieldErrors, setFieldErrors] = useState({});
  const [kvkkChecked, setKvkkChecked] = useState(false);

  // Airports.json yükle (sadece 1 kere)
  const [airports, setAirports] = useState([]);
  useEffect(() => {
    fetch("/dumps/airports.json")
      .then(res => res.json())
      .then(setAirports)
      .catch(() => setAirports([]));
  }, []);

  // Havalimanı yakalandı mı?
  function includesAirport(val) {
    if (!val) return false;
    const input = normalize(val);
    return airports.some(ap =>
      input.includes(normalize(ap.name)) ||
      input.includes(normalize(ap.city)) ||
      input.includes(normalize(ap.code)) ||
      (ap.alt_names && ap.alt_names.some(alt => input.includes(normalize(alt))))
    );
  }
  // PNR alanı için kontrol: Nereden/Nereye'den biri havalimanı ya da transfer türü havalimanı ise
  const pnrZorunlu =
    transfer === "VIP Havalimanı Transferi" ||
    includesAirport(from) ||
    includesAirport(to);

  // Araçları segment ve kişi sayısına göre filtrele
  const filteredVehicles =
    segment && people
      ? vehicles.filter(
          v =>
            v.segment === segment &&
            v.max >= Number(people) &&
            v.transferTypes.includes(transfer)
        )
      : [];

  // Otomatik validasyonlar (diğerlerini aynen bırakabilirsin)
  function handleSubmit(e) {
    e.preventDefault();
    const err = {};
    if (!from) err.from = "Lütfen kalkış noktası giriniz.";
    if (!to) err.to = "Lütfen varış noktası giriniz.";
    if (!segment) err.segment = "Lütfen segment seçiniz.";
    if (!transfer) err.transfer = "Lütfen transfer tipi seçiniz.";
    if (!date) err.date = "Tarih zorunlu.";
    if (!time) err.time = "Saat zorunlu.";
    if (!name) err.name = "Ad zorunlu.";
    if (!surname) err.surname = "Soyad zorunlu.";
    if (!tc || !/^[1-9]\d{9}[02468]$/.test(tc) || tc.length !== 11)
      err.tc = "Geçerli bir TC Kimlik No giriniz.";
    if (!phone || !/^05\d{9}$/.test(phone) || phone.length !== 11)
      err.phone = "Geçerli bir 05xx ile başlayan telefon giriniz.";
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) err.email = "Geçerli e-posta adresi giriniz.";
    if (pnrZorunlu && !pnr) err.pnr = "Havalimanı transferlerinde PNR/Uçuş kodu zorunludur.";
    if (!kvkkChecked) err.kvkk = "KVKK onayı zorunludur.";
    setFieldErrors(err);
    if (Object.keys(err).length > 0) return;
    setShowSummary(true);
  }

  // Kişi sayısı değiştirme
  function handlePeopleChange(e) {
    setPeople(e.target.value);
    // Araç segmenti değişince araçlar resetleniyor gibi davran.
  }

  // Form
  return (
    <section
      className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl bg-[#19160a] border border-[#bfa658]
        px-2 md:px-8 py-8 md:py-12 my-6"
      style={{ boxSizing: "border-box" }}
    >
      <h1 className="text-2xl md:text-3xl font-extrabold text-[#bfa658] tracking-tight mb-7 text-center font-quicksand">
        VIP Rezervasyon Formu
      </h1>
      <form
        onSubmit={handleSubmit}
        autoComplete="on"
        className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4"
      >
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Nereden?</label>
          <AdresAutoComplete
            value={from}
            onChange={setFrom}
            placeholder="Nereden? İl / İlçe / Mahalle / Havalimanı"
          />
          {fieldErrors.from && <div className="text-red-400 text-xs mt-1">{fieldErrors.from}</div>}
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
          <AdresAutoComplete
            value={to}
            onChange={setTo}
            placeholder="Nereye? İl / İlçe / Mahalle / Havalimanı"
          />
          {fieldErrors.to && <div className="text-red-400 text-xs mt-1">{fieldErrors.to}</div>}
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Kişi Sayısı</label>
          <select
            name="people"
            className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            value={people}
            onChange={handlePeopleChange}
          >
            <option value="">Seçiniz</option>
            {Array.from({ length: 24 }, (_, i) => i + 1).map(val => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
          <select
            name="segment"
            className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            value={segment}
            onChange={e => setSegment(e.target.value)}
          >
            <option value="">Seçiniz</option>
            {segmentOptions.map(opt => (
              <option key={opt.key} value={opt.label}>{opt.label}</option>
            ))}
          </select>
          {fieldErrors.segment && <div className="text-red-400 text-xs mt-1">{fieldErrors.segment}</div>}
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Transfer Türü</label>
          <select
            name="transfer"
            className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            value={transfer}
            onChange={e => setTransfer(e.target.value)}
          >
            <option value="">Seçiniz</option>
            {allTransfers.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {fieldErrors.transfer && <div className="text-red-400 text-xs mt-1">{fieldErrors.transfer}</div>}
        </div>
        {/* Dinamik Araçlar */}
        <div className="md:col-span-2">
          {segment && people && transfer && (
            <div className="mb-2">
              <div className="flex flex-wrap gap-2 justify-start items-stretch">
                {filteredVehicles.length === 0 && (
                  <div className="text-gray-400 text-sm py-2">Uygun araç bulunamadı. Lütfen kişi sayısı ve segment seçimini kontrol edin.</div>
                )}
                {filteredVehicles.map(v => (
                  <div
                    key={v.value}
                    className="flex-1 min-w-[120px] max-w-[210px] border-2 border-[#bfa658] rounded-lg bg-[#181612] p-2 m-1 flex flex-col items-center justify-center"
                    style={{ fontSize: 15, margin: 2 }}
                  >
                    <div className="font-bold text-[#ffeec2]">{v.label}</div>
                    <div className="text-[#bfa658] text-xs">{v.segment}</div>
                    <div className="text-[#ffeec2] text-xs">{v.max} Kişi</div>
                  </div>
                ))}
              </div>
              <div className="text-xs mt-1 text-[#ffeec2]">
                Seçtiğiniz segment ve kişi sayısına uygun araçlardan biri size rezerve edilecektir.
              </div>
            </div>
          )}
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
          {fieldErrors.date && <div className="text-red-400 text-xs mt-1">{fieldErrors.date}</div>}
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
          <select
            name="time"
            className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            value={time}
            onChange={e => setTime(e.target.value)}
          >
            <option value="">Seçiniz</option>
            {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
          </select>
          {fieldErrors.time && <div className="text-red-400 text-xs mt-1">{fieldErrors.time}</div>}
        </div>
        {/* PNR: Yalnızca havalimanı transferlerinde gösterilir */}
        {pnrZorunlu && (
          <div className="md:col-span-2">
            <label className="font-bold text-[#bfa658] mb-1 block">PNR / Uçuş Kodu</label>
            <input
              name="pnr"
              type="text"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={pnr}
              onChange={e => setPnr(e.target.value)}
              placeholder="Uçuş rezervasyon kodu (varsa)"
            />
            {fieldErrors.pnr && <div className="text-red-400 text-xs mt-1">{fieldErrors.pnr}</div>}
          </div>
        )}
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
        {/* KVKK Onay Kutusu */}
        <div className="md:col-span-2 flex items-center mt-4">
          <input
            type="checkbox"
            id="kvkk"
            required
            checked={kvkkChecked}
            onChange={e => setKvkkChecked(e.target.checked)}
            className="accent-[#bfa658] w-5 h-5"
          />
          <label htmlFor="kvkk" className="ml-2 text-[#ffeec2] text-sm">
            <span className="underline cursor-pointer">
              KVKK Aydınlatma Metni ve Politikası
            </span>'nı okudum, onaylıyorum.
          </label>
        </div>
        {fieldErrors.kvkk && <div className="text-red-400 text-xs mt-1 md:col-span-2">{fieldErrors.kvkk}</div>}
        <div className="md:col-span-2 flex justify-end mt-6">
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-3 px-8 rounded-xl text-xl shadow hover:scale-105 transition"
          >
            Rezervasyonu Tamamla
          </button>
        </div>
      </form>
      {showSummary && (
        // ...Özet Popup aynı kalabilir
        <div>Rezervasyon Özeti Buraya...</div>
      )}
    </section>
  );
}

// PATH: /components/VipTransferForm.jsx
