"use client";
import { useState, useMemo } from "react";
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
const saatler = [];
for (let h = 0; h < 24; ++h) for (let m of [0, 15, 30, 45]) saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
const havalimanlari = [
  "istanbul havalimanı", "sabiha gökçen", "antalya havalimanı", "esenboğa", "adnan menderes", "milas bodrum", "dalaman", "trabzon havalimanı", "erzurum havalimanı", "gaziantep havalimanı", "nevşehir kapadokya", "gazipaşa", "çorlu", "balıkesir", "teknofest", "tekirdağ", "diğer havalimanı"
];
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
function containsAirport(val) {
  const nval = normalize(val);
  return havalimanlari.some(h => nval.includes(normalize(h)));
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

  // PNR GÖSTERME LOGİĞİ
  const isAirport = useMemo(() => {
    return (
      containsAirport(from) ||
      containsAirport(to) ||
      (transfer && transfer.toLocaleLowerCase("tr-TR").includes("havalimanı"))
    );
  }, [from, to, transfer]);

  // Araç filtreleme - segment & kişi sayısı & transfer türü
  const filteredVehicles = useMemo(() => {
    if (!segment) return [];
    // Segment filtre
    let arr = vehicles.filter(v => v.segment === segment);
    // Kişi sayısı üstünde olanları getir (ve minimum mantıklı farkı uygula)
    if (people > 0) {
      // Otobüs ve çok büyük araçlar yalnızca 8+ kişi için gelsin
      if (people === 1) arr = arr.filter(v => v.max <= 6);
      else if (people <= 4) arr = arr.filter(v => v.max >= people && v.max <= 8);
      else if (people <= 8) arr = arr.filter(v => v.max >= people && v.max <= 16);
      else arr = arr.filter(v => v.max >= people); // 10+ ise 10 ve üzeri göster
    }
    // Transfer türü uygun olmayan araçları çıkar
    if (transfer) {
      arr = arr.filter(v =>
        !v.transferTypes || v.transferTypes.includes(transfer)
      );
    }
    return arr;
  }, [segment, people, transfer]);

  // HATA ve SUBMIT
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
    if (!isValidTC(tc)) err.tc = "Geçerli bir TC Kimlik No giriniz.";
    if (!isValidPhone(phone)) err.phone = "Geçerli bir 05xx ile başlayan telefon giriniz.";
    if (!isValidEmail(email)) err.email = "Geçerli e-posta adresi giriniz.";
    if (!kvkkChecked) err.kvkk = "KVKK onayı zorunludur.";
    if (isAirport && !pnr) err.pnr = "Havalimanı transferi için PNR/Uçuş Kodu zorunludur.";
    setFieldErrors(err);
    if (Object.keys(err).length > 0) return;
    setShowSummary(true);
  }

  // --- ÖZET POPUP ---
  function SummaryPopup({ onClose }) {
    const basePrice = 4000;
    const allExtras = require("../../data/extrasByCategory").extrasListByCategory.flatMap(cat => cat.items);
    const selectedExtras = allExtras.filter(e => extras.includes(e.key));
    const extrasTotal = selectedExtras.reduce((sum, e) => sum + (e.price * (extrasQty[e.key] || 1)), 0);
    const araToplam = basePrice + extrasTotal;
    const kdv = araToplam * 0.20;
    const toplam = araToplam + kdv;
    function handlePayment() {
      const params = new URLSearchParams({
        from, to, people, segment, transfer, date, time, name, surname, tc, phone, email, pnr, note,
        extras: extras.join(","),
        extrasQty: JSON.stringify(extrasQty),
        kvkk: "true",
      }).toString();
      router.push(`/odeme?${params}`);
    }
    const segmentVehicles = vehicles.filter(v => v.segment === segment);
    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
        <div className="bg-[#19160a] rounded-3xl border border-[#bfa658] max-w-3xl w-full shadow-2xl p-8 md:p-12 overflow-y-auto max-h-[92vh] relative">
          <button onClick={onClose} className="absolute top-3 right-5 text-3xl font-bold text-[#ffeec2] hover:text-yellow-400">×</button>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-[#bfa658] text-center font-quicksand">Rezervasyon Özeti</h2>
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
          <div className="my-4 p-3 rounded-xl border-2 border-[#bfa658] bg-[#19160a]">
            <div className="mb-2 font-semibold text-[#bfa658]">Bu segmentteki araçlar:</div>
            <ul className="space-y-1 text-base">
              {segmentVehicles.map((v) => (
                <li key={v.value} className="text-[#ffeec2]">{v.label} <span className="text-xs text-[#bfa658]">({v.max} kişi)</span></li>
              ))}
            </ul>
            <div className="mt-2 text-sm text-[#ffeec2] opacity-90">
              Seçtiğiniz segmentteki araçlardan biri size rezerve edilecektir.
            </div>
          </div>
          <div className="mb-5">
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
                          <button type="button" className="px-2 text-lg font-bold text-gold" onClick={() => setExtrasQty(q => ({ ...q, [extra.key]: Math.max(1, (q[extra.key] || 1) - 1) }))}>-</button>
                          <span className="w-7 text-center">{extrasQty[extra.key] || 1}</span>
                          <button type="button" className="px-2 text-lg font-bold text-gold" onClick={() => setExtrasQty(q => ({ ...q, [extra.key]: (q[extra.key] || 1) + 1 }))}>+</button>
                        </div>
                      </td>
                      <td className="text-right">{extra.price.toLocaleString()}₺</td>
                      <td className="text-right">{((extrasQty[extra.key] || 1) * extra.price).toLocaleString()}₺</td>
                      <td className="text-center">
                        <button type="button" onClick={() => {
                          setExtras(extras.filter(k => k !== extra.key));
                          setExtrasQty(q => { const { [extra.key]: _, ...rest } = q; return rest; });
                        }} className="text-red-400 font-bold hover:scale-125 transition-transform">🗑️</button>
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
            <div>KDV: <b>{kdv.toLocaleString(undefined, { maximumFractionDigits: 2 })} ₺</b></div>
            <div className="text-xl text-[#bfa658] font-bold">Toplam: {toplam.toLocaleString()} ₺</div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4 mt-9">
            <button
              className="w-full md:w-auto bg-[#bfa658] hover:bg-[#ffeec2] text-black font-bold py-3 px-8 rounded-xl shadow-lg transition-colors"
              onClick={handlePayment}
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

  return (
    <section className="w-full max-w-4xl mx-auto rounded-3xl shadow-2xl bg-[#19160a] border border-[#bfa658] px-3 md:px-12 py-8 md:py-14 my-6 md:my-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-7 md:mb-8 text-center font-quicksand">
        VIP Rezervasyon Formu
      </h1>
      <form
        onSubmit={handleSubmit}
        autoComplete="on"
        className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3 md:gap-y-5"
      >
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Nereden?</label>
          <AdresAutoComplete value={from} onChange={setFrom} placeholder="Nereden? İl / İlçe / Mahalle / Havalimanı" />
          {fieldErrors.from && <div className="text-red-400 text-xs mt-1">{fieldErrors.from}</div>}
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
          <AdresAutoComplete value={to} onChange={setTo} placeholder="Nereye? İl / İlçe / Mahalle / Havalimanı" />
          {fieldErrors.to && <div className="text-red-400 text-xs mt-1">{fieldErrors.to}</div>}
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Kişi Sayısı</label>
          <select name="people" className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            value={people} onChange={e => setPeople(Number(e.target.value))}>
            {Array.from({ length: 20 }, (_, i) => i + 1).map(val =>
              <option key={val} value={val}>{val}</option>
            )}
          </select>
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
          <select name="segment" className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            value={segment} onChange={e => setSegment(e.target.value)}>
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
            value={transfer} onChange={e => setTransfer(e.target.value)}>
            <option value="">Seçiniz</option>
            {allTransfers.map(opt =>
              <option key={opt} value={opt}>{opt}</option>
            )}
          </select>
          {fieldErrors.transfer && <div className="text-red-400 text-xs mt-1">{fieldErrors.transfer}</div>}
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Tarih</label>
          <input name="date" type="date" className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            value={date} onChange={e => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]} autoComplete="on"
          />
          {fieldErrors.date && <div className="text-red-400 text-xs mt-1">{fieldErrors.date}</div>}
        </div>
        <div>
          <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
          <select name="time" className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            value={time} onChange={e => setTime(e.target.value)}>
            <option value="">Seçiniz</option>
            {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
          </select>
          {fieldErrors.time && <div className="text-red-400 text-xs mt-1">{fieldErrors.time}</div>}
        </div>

        {/* ARAÇLAR ALANI */}
        {segment && (
          <div className="md:col-span-2">
            <label className="font-bold text-[#bfa658] mb-1 block">Araçlar</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filteredVehicles.length === 0 && (
                <div className="text-sm text-[#ffeec2]/80 p-3 bg-black/20 rounded-lg col-span-3">
                  Seçime uygun araç bulunamadı.
                </div>
              )}
              {filteredVehicles.map((v) => (
                <div key={v.value}
                  className="border border-[#bfa658] rounded-xl p-2 flex flex-col items-center justify-center text-center min-h-[74px] bg-black/50"
                  style={{ minWidth: 0 }}>
                  <span className="font-bold text-[#ffeec2] text-base">{v.label}</span>
                  <span className="text-xs text-[#bfa658]">{v.segment} • {v.max} Kişi</span>
                </div>
              ))}
            </div>
            <div className="mt-2 text-sm text-[#ffeec2] opacity-90">
              Seçtiğiniz segment ve kişi sayısına uygun araçlardan biri size rezerve edilecektir.
            </div>
          </div>
        )}

        {/* PNR (HAVALİMANI İÇİN) */}
        {isAirport && (
          <div className="md:col-span-2">
            <label className="font-bold text-[#bfa658] mb-1 block">PNR / Uçuş Kodu <span className="text-[#ffeec2] text-xs">(Havalimanı transferleri için zorunlu)</span></label>
            <input
              name="pnr"
              type="text"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={pnr}
              onChange={e => setPnr(e.target.value)}
              placeholder="Uçuş rezervasyon kodu"
            />
            {fieldErrors.pnr && <div className="text-red-400 text-xs mt-1">{fieldErrors.pnr}</div>}
          </div>
        )}

        {/* EK NOT */}
        <div className="md:col-span-2">
          <label className="font-bold text-[#bfa658] mb-1 block">Ek Not</label>
          <textarea className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            rows={2} value={note} onChange={e => setNote(e.target.value)} placeholder="Eklemek istediğiniz bir not var mı?" />
        </div>
        {/* EKSTRALAR */}
        <div className="md:col-span-2">
          <label className="font-bold text-[#bfa658] mb-2 block text-lg">Ekstralar</label>
          <EkstralarAccordion
            selectedExtras={extras}
            setSelectedExtras={setExtras}
            extrasQty={extrasQty}
            setExtrasQty={setExtrasQty}
          />
        </div>
        {/* KVKK */}
        <div className="md:col-span-2 flex items-center mt-6">
          <input
            type="checkbox"
            id="kvkk"
            required
            checked={kvkkChecked}
            onChange={e => setKvkkChecked(e.target.checked)}
            className="accent-[#bfa658] w-5 h-5"
          />
          <label htmlFor="kvkk" className="ml-2 text-[#ffeec2] text-sm">
            <span className="underline cursor-pointer">KVKK Aydınlatma Metni ve Politikası</span>'nı okudum, onaylıyorum.
          </label>
        </div>
        {fieldErrors.kvkk && <div className="text-red-400 text-xs mt-1 md:col-span-2">{fieldErrors.kvkk}</div>}

        <div className="md:col-span-2 flex justify-center md:justify-end mt-6">
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
