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
    setFieldErrors(err);
    if (Object.keys(err).length > 0) return;
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
      }).toString();
      router.push(`/odeme?${params}`);
    }

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
              <div><b>Ad Soyad:</b> {name} {surname} <span className="block">T.C.: {tc}</span></div>
              <div><b>Telefon:</b> {phone}</div>
              <div><b>E-posta:</b> {email}</div>
              <div><b>Tarih/Saat:</b> {date} {time}</div>
              <div><b>Kişi:</b> {people}</div>
            </div>
            <div>
              <div><b>Transfer:</b> {transfer || "-"}</div>
              <div><b>Segment:</b> {segment}</div>
              <div>
                <b>Araç:</b>
                <span className="ml-1 text-yellow-400">Seçilen segmentteki uygun araçlardan biri atanacaktır.</span>
              </div>
              <div><b>Nereden:</b> {from}</div>
              <div><b>Nereye:</b> {to}</div>
              {pnr && <div><b>PNR/Uçuş Kodu:</b> {pnr}</div>}
            </div>
          </div>
          {/* Ekstralar Tablosu */}
          <div className="mb-5">
            <b className="block mb-2 text-[#bfa658] text-lg">Ekstralar:</b>
            {selectedExtras.length === 0 && <span className="text-gray-400">Ekstra yok</span>}
            {selectedExtras.length > 0 &&
              <table className="w-full text-base mb-3">
                <thead>
                  <tr className="text-[#ffeec2] border-b border-[#bfa658]/40">
                    <th className="text-left py-1 pl-1">Ürün</th>
                    <th className="w-28">Adet</th>
                    <th className="w-24">Birim Fiyat</th>
                    <th className="w-24">Toplam</th>
                    <th className="w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {selectedExtras.map(extra => (
                    <tr key={extra.key} className="border-b border-[#bfa658]/10">
                      <td className="py-1 pl-1">{extra.label}</td>
                      <td>
                        <div className="flex items-center gap-1">
                          <button type="button" className="px-2 text-lg font-bold text-gold" onClick={() => changeQty(extra.key, -1)}>-</button>
                          <span className="w-7 text-center">{extrasQty[extra.key] || 1}</span>
                          <button type="button" className="px-2 text-lg font-bold text-gold" onClick={() => changeQty(extra.key, +1)}>+</button>
                        </div>
                      </td>
                      <td>{extra.price}₺</td>
                      <td>{((extrasQty[extra.key] || 1) * extra.price).toLocaleString()}₺</td>
                      <td>
                        <button type="button" onClick={() => removeExtra(extra.key)} className="ml-1 text-red-400 font-bold hover:underline">🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
          </div>
          {/* Not ve fiyatlar */}
          <div className="mb-3 text-[#ffeec2] text-base">
            {note && <div className="mb-2"><b>Ek Not:</b> {note}</div>}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="text-right"><b>Transfer Bedeli:</b></div>
              <div>{basePrice.toLocaleString()} ₺</div>
              <div className="text-right"><b>Ekstralar:</b></div>
              <div>{extrasTotal.toLocaleString()} ₺</div>
              <div className="text-right"><b>KDV (%20):</b></div>
              <div>{kdv.toLocaleString(undefined, { maximumFractionDigits: 2 })} ₺</div>
              <div className="text-right text-xl font-bold"><b>Toplam:</b></div>
              <div className="text-xl font-bold">{toplam.toLocaleString()} ₺</div>
            </div>
          </div>
          <div className="bg-[#302811]/60 rounded-xl px-4 py-3 my-4 text-sm text-[#ffeec2]">
            <b>Not:</b> Transfer rezervasyonunuz alınmıştır. Seçtiğiniz segmentteki uygun araç(lar) ve şoförünüz en kısa sürede sizinle paylaşılacaktır.
          </div>
          <button
            onClick={handlePayment}
            className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold text-lg hover:scale-105 transition"
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
          {fieldErrors.segment && <div className="text-red-400 text-xs mt-1">{fieldErrors.segment}</div>}
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
          {fieldErrors.transfer && <div className="text-red-400 text-xs mt-1">{fieldErrors.transfer}</div>}
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
          <select name="time" className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            value={time}
            onChange={e => setTime(e.target.value)}>
            <option value="">Seçiniz</option>
            {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
          </select>
          {fieldErrors.time && <div className="text-red-400 text-xs mt-1">{fieldErrors.time}</div>}
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
          {fieldErrors.name && <div className="text-red-400 text-xs mt-1">{fieldErrors.name}</div>}
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
          {fieldErrors.surname && <div className="text-red-400 text-xs mt-1">{fieldErrors.surname}</div>}
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
          {fieldErrors.tc && <div className="text-red-400 text-xs mt-1">{fieldErrors.tc}</div>}
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
          {fieldErrors.phone && <div className="text-red-400 text-xs mt-1">{fieldErrors.phone}</div>}
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
          {fieldErrors.email && <div className="text-red-400 text-xs mt-1">{fieldErrors.email}</div>}
        </div>
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

// app/rezervasyon/RezervasyonForm.jsx
