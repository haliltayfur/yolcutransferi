// PATH: /app/rezervasyon/RezervasyonForm.jsx

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

// Havalimanı keyword'leri
const airportKeywords = [
  "havalimanı", "istanbul havalimanı", "iga", "ist", "sabiha gökçen", "saw", "eskişehir havalimanı",
  "antalya havalimanı", "ankara esenboğa", "esenboğa", "milas bodrum", "izmir adnan", "trabzon havalimanı"
];
function isAirportRelated(text) {
  if (!text) return false;
  const t = text.toLocaleLowerCase("tr-TR");
  return airportKeywords.some(keyword => t.includes(keyword));
}

export default function RezervasyonForm() {
  const router = useRouter();
  // STATE
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

  // Validasyon fonksiyonları
  const isValidTC = t => /^[1-9]\d{9}[02468]$/.test(t) && t.length === 11;
  const isValidPhone = t => /^05\d{9}$/.test(t) && t.length === 11;
  const isValidEmail = t => /^\S+@\S+\.\S+$/.test(t);

  function handleTcChange(val) {
    setTc(val.replace(/\D/g, "").slice(0, 11));
  }
  function handlePhoneChange(val) {
    let num = val.replace(/\D/g, "");
    if (num.length > 0 && num[0] !== "0") num = "0" + num;
    setPhone(num.slice(0, 11));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Hata kontrol
    const err = {};
    if (!from) err.from = "Lütfen kalkış noktası giriniz.";
    if (!to) err.to = "Lütfen varış noktası giriniz.";
    if (!segment) err.segment = "Lütfen segment seçiniz.";
    if (!transfer) err.transfer = "Lütfen transfer tipi seçiniz.";
    if (!date) err.date = "Tarih zorunlu.";
    if (!time) err.time = "Saat zorunlu.";
    if (!name) err.name = "Ad zorunlu.";
    if (!surname) err.surname = "Soyad zorunlu.";
    if (!isValidTC(tc)) err.tc = "Geçerli bir TC Kimlik No giriniz.";
    if (!isValidPhone(phone)) err.phone = "Geçerli bir 05xx ile başlayan telefon giriniz.";
    if (!isValidEmail(email)) err.email = "Geçerli e-posta adresi giriniz.";
    if (!kvkkChecked) err.kvkk = "KVKK onayı zorunludur.";
    setFieldErrors(err);
    if (Object.keys(err).length > 0) return;
    setShowSummary(true);
  }

  // ===== ARAÇ FİLTRELEME MANTIĞI =====
  // Segment ve kişi seçilene kadar araç gelmez.
  const minPeople = Number(people) || 0;
  const filteredVehicles =
    !segment || !people
      ? []
      : vehicles.filter(
          v =>
            v.segment === segment &&
            minPeople >= 1 &&
            minPeople <= v.max &&
            minPeople > 0 &&
            v.max >= minPeople
        );

  // PNR gösterim mantığı
  const showPNR =
    transfer === "VIP Havalimanı Transferi" ||
    isAirportRelated(from) ||
    isAirportRelated(to);

  // --- REZERVASYON ÖZETİ POPUP ---
  function SummaryPopup({ onClose }) {
    const basePrice = 4000;
    const allExtras = require("../../data/extrasByCategory").extrasListByCategory.flatMap(cat => cat.items);
    const selectedExtras = allExtras.filter(e => extras.includes(e.key));
    const extrasTotal = selectedExtras.reduce((sum, e) => sum + (e.price * (extrasQty[e.key] || 1)), 0);
    const araToplam = basePrice + extrasTotal;
    const kdv = araToplam * KDV_ORAN;
    const toplam = araToplam + kdv;

    // Artır/azalt/sil
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

    function handlePayment() {
      const params = new URLSearchParams({
        from, to, people, segment, transfer, date, time, name, surname, tc, phone, email, pnr, note,
        extras: extras.join(","),
        extrasQty: JSON.stringify(extrasQty),
        kvkk: "true",
      }).toString();
      router.push(`/odeme?${params}`);
    }

    // SEÇİLEN SEGMENTTEKİ UYGUN ARAÇLAR
    const summaryVehicles =
      !segment || !people
        ? []
        : vehicles.filter(
            v =>
              v.segment === segment &&
              minPeople >= 1 &&
              minPeople <= v.max &&
              minPeople > 0 &&
              v.max >= minPeople
          );

    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
        <div className="bg-[#19160a] rounded-3xl border border-[#bfa658] max-w-3xl w-full shadow-2xl p-8 md:p-12 overflow-y-auto max-h-[92vh] relative">
          <button onClick={onClose} className="absolute top-3 right-5 text-3xl font-bold text-[#ffeec2] hover:text-yellow-400">×</button>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-[#bfa658] text-center font-quicksand">
            Rezervasyon Özeti
          </h2>
          {/* 2 sütunlu detay */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-[#ffeec2] text-base">
            <div>
              <div><b>Ad Soyad:</b> {name} {surname}</div>
              <div><b>T.C.:</b> {tc}</div>
              <div><b>Telefon:</b> {phone}</div>
              <div><b>E-posta:</b> {email}</div>
              <div><b>Kişi:</b> {people}</div>
              <div><b>Tarih:</b> {date}</div>
              <div><b>Saat:</b> {time}</div>
            </div>
            <div>
              <div><b>Transfer:</b> {transfer || "-"}</div>
              <div><b>Segment:</b> {segment}</div>
              <div><b>Nereden:</b> {from}</div>
              <div><b>Nereye:</b> {to}</div>
              {pnr && <div><b>PNR/Uçuş Kodu:</b> {pnr}</div>}
            </div>
          </div>
          {/* SEGMENTTEKİ UYGUN ARAÇLAR */}
          <div className="my-4 p-3 rounded-xl border-2 border-[#bfa658] bg-[#19160a]">
            <div className="mb-2 font-semibold text-[#bfa658]">Bu kriterlere uygun araçlar:</div>
            <ul className="space-y-1 text-base">
              {summaryVehicles.length > 0 ? summaryVehicles.map((v) => (
                <li key={v.value} className="text-[#ffeec2]">{v.label} <span className="text-xs text-[#bfa658]">({v.max} kişi)</span></li>
              )) : <li className="text-red-400">Uygun araç bulunamadı.</li>}
            </ul>
            <div className="mt-2 text-sm text-[#ffeec2] opacity-90">
              Seçtiğiniz segment ve kişi sayısına göre, size en uygun araç rezerve edilecektir.
            </div>
          </div>
          {/* ... (diğer kısımlar aynı) */}
          {/* Ekstralar Tablosu, Fiyatlar, Butonlar ... */}
          {/* --- KODUN DİĞER KISMI DEĞİŞMEDİ, YUKARIDAKİ KOPYALANACAK --- */}
        </div>
      </div>
    );
  }

  // --- ANA FORM ---
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
        {/* ... (alanlar aynı, yukarıdaki gibi) */}
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Kişi Sayısı</label>
          <select name="people" className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            value={people}
            onChange={e => setPeople(e.target.value)}>
            <option value="">Seçiniz</option>
            {Array.from({ length: 24 }, (_, i) => i + 1).map(val =>
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
          {fieldErrors.segment && <div className="text-red-400 text-xs mt-1">{fieldErrors.segment}</div>}
        </div>
        {/* ... (diğer form alanları aynı) */}

        {/* Araçlar kutusu */}
        <div className="md:col-span-2">
          <label className="font-bold text-[#bfa658] mb-2 block text-lg">Araçlar</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredVehicles.length > 0 ? filteredVehicles.map((v) => (
              <div key={v.value} className="border-2 border-[#bfa658] rounded-xl p-3 bg-black/70 flex flex-col items-center text-[#ffeec2]">
                <div className="font-bold text-base">{v.label}</div>
                <div className="text-xs text-[#bfa658] mb-1">{v.segment}</div>
                <div className="text-xs">{v.max} Kişi</div>
              </div>
            )) : (
              <div className="text-gray-400 col-span-3 text-center">
                Lütfen kişi sayısı ve segment seçiniz.
              </div>
            )}
          </div>
          <div className="mt-2 text-sm text-[#ffeec2] opacity-90">
            Seçtiğiniz segment ve kişi sayısına göre, size en uygun araç rezerve edilecektir.
          </div>
        </div>
        {/* ... (devamı aynı) */}
      </form>
      {showSummary && <SummaryPopup onClose={() => setShowSummary(false)} />}
    </section>
  );
}

// PATH: /app/rezervasyon/RezervasyonForm.jsx
