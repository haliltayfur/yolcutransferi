// PATH: /app/rezervasyon/RezervasyonForm.jsx
"use client";
import React, { useState, useEffect } from "react";
import EkstralarAccordion from "../../data/EkstralarAccordion.jsx";
import { vehicles } from "../../data/vehicleList.js";
import { extrasListByCategory } from "../../data/extrasByCategory.js";
import { useRouter } from "next/navigation";

// ==== Türkçe karakter düzeltme & Özel isim formatı ====
function fixTurkish(str) { /* ... (kısaltıldı, yukarıdakiyle aynı) ... */ }
function titleCase(str) { /* ... (kısaltıldı, yukarıdakiyle aynı) ... */ }

// ==== Adres AutoComplete (il/ilçe/havalimanı) ====
function useFullLocationList() {
  // ... (kısaltıldı, yukarıdakiyle aynı)
}
function AutoCompleteInput({ value, onChange, placeholder }) {
  const addressList = useFullLocationList();
  const [suggestions, setSuggestions] = useState([]);
  const [showList, setShowList] = useState(false);
  useEffect(() => {
    if (!value || value.length < 2) setSuggestions([]);
    else {
      const val = value.toLocaleLowerCase("tr-TR");
      setSuggestions(addressList.filter(a => a.toLocaleLowerCase("tr-TR").includes(val)).slice(0, 15));
    }
  }, [value, addressList]);
  return (
    <div className="relative">
      <input
        className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
        value={value}
        onChange={e => { onChange(titleCase(e.target.value)); setShowList(true); }}
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
              onMouseDown={() => { onChange(s); setShowList(false); }}
            >{s}</li>
          ))}
        </ul>
      }
    </div>
  );
}

// === Mesafe & Süre (Gerçek API) ===
function useDistance(from, to) {
  const [data, setData] = useState({ km: "", min: "", error: "" });
  useEffect(() => {
    if (!from || !to) {
      setData({ km: "", min: "", error: "" });
      return;
    }
    let ignore = false;
    setData({ km: "Yükleniyor...", min: "Yükleniyor...", error: "" });
    fetch(`/api/distance?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)
      .then(res => res.json())
      .then(res => {
        if (ignore) return;
        if (res.km && res.min) setData({ km: res.km, min: res.min, error: "" });
        else setData({ km: "", min: "", error: res.error || "Mesafe hesaplanamadı." });
      })
      .catch(() => {
        if (!ignore) setData({ km: "", min: "", error: "Bağlantı hatası." });
      });
    return () => { ignore = true; };
  }, [from, to]);
  return data;
}

// === Araç Kombinasyonu ===
function getBestVehicleText(people, segment) {
  if (!people || !segment) return "";
  people = Number(people);
  let candidates = vehicles.filter(v => v.segment === segment && v.max >= people);
  candidates = candidates.sort((a, b) => a.max - b.max);
  let best = candidates[0];
  if (!best) return "";
  return `Sizin seçiminize en uygun araç: ${best.label} veya benzeri (${best.max} kişi kapasiteli) aracımızı sizin için hazırlıyoruz.`;
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

// === KVKK POPUP ===
function KvkkPopup({ open, onClose, onApprove }) {
  // ... (aynı)
}

// === SİPARİŞ ÖZETİ POPUP ===
function SummaryPopup({
  visible, onClose, form, extras, extrasQty, setExtras, setExtrasQty, vehicleText, kmInfo, minInfo, onPayment
}) {
  const basePrice = 4000;
  const KDV_ORAN = 0.20;
  const allExtras = extrasListByCategory.flatMap(cat => cat.items);
  const selectedExtras = allExtras.filter(e => extras.includes(e.key));
  const extrasTotal = selectedExtras.reduce((sum, e) => sum + (e.price * (extrasQty[e.key] || 1)), 0);
  const araToplam = basePrice + extrasTotal;
  const kdv = araToplam * KDV_ORAN;
  const toplam = araToplam + kdv;

  function changeQty(key, dir) {
    setExtrasQty(q => ({ ...q, [key]: Math.max(1, (q[key] || 1) + dir) }));
  }
  function removeExtra(key) {
    setExtras(es => es.filter(k => k !== key));
    setExtrasQty(q => { const { [key]: _, ...rest } = q; return rest; });
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/80">
      <div className="relative bg-[#19160a] border-2 border-[#bfa658] rounded-2xl w-full max-w-3xl max-h-[97vh] overflow-y-auto px-8 py-10">
        <button
          className="absolute top-4 right-4 bg-[#bfa658] text-black font-bold rounded-xl px-5 py-2 text-lg shadow hover:bg-yellow-400 transition"
          onClick={onClose}>Kapat</button>
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
            <b className="block mb-2 text-[#bfa658] text-lg">Araç:</b>
            <div className="border border-[#bfa658] rounded-xl p-2 mb-2 bg-black/70">
              {vehicleText || <span className="text-red-400">Uygun araç bulunamadı.</span>}
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
                  <th className="text-right w-28">KDV Dahil</th>
                  <th className="text-right w-28">Toplam</th>
                  <th className="text-center w-12"></th>
                </tr>
              </thead>
              <tbody>
                {selectedExtras.map(extra => {
                  const qty = extrasQty[extra.key] || 1;
                  const birim = extra.price;
                  const kdvli = birim * 1.20;
                  const toplam = kdvli * qty;
                  return (
                    <tr key={extra.key} className="border-b border-[#bfa658]/10">
                      <td className="py-1 pl-1">{extra.label}</td>
                      <td className="text-center">
                        <div className="flex items-center gap-1 justify-center">
                          <button type="button" className="px-2 text-lg font-bold text-gold" onClick={() => changeQty(extra.key, -1)}>-</button>
                          <span className="w-7 text-center">{qty}</span>
                          <button type="button" className="px-2 text-lg font-bold text-gold" onClick={() => changeQty(extra.key, +1)}>+</button>
                        </div>
                      </td>
                      <td className="text-right">{birim.toLocaleString()}₺</td>
                      <td className="text-right">{kdvli.toLocaleString(undefined, {maximumFractionDigits:2})}₺</td>
                      <td className="text-right">{toplam.toLocaleString(undefined, {maximumFractionDigits:2})}₺</td>
                      <td className="text-center">
                        <button type="button" onClick={() => removeExtra(extra.key)} className="text-red-400 font-bold hover:scale-125 transition-transform">🗑️</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          }
        </div>
        <div className="w-full flex flex-col items-end gap-1 mt-2 text-base">
          <div>Transfer Bedeli: <b>{basePrice.toLocaleString()} ₺</b></div>
          <div>Ekstralar: <b>{extrasTotal.toLocaleString()} ₺</b></div>
          <div>KDV (%20): <b>{kdv.toLocaleString(undefined, {maximumFractionDigits:2})} ₺</b></div>
          <div className="text-xl text-[#bfa658] font-bold">Toplam: {toplam.toLocaleString(undefined, {maximumFractionDigits:2})} ₺</div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-4 mt-9">
          <button
            className="w-full md:w-auto bg-[#bfa658] hover:bg-[#ffeec2] text-black font-bold py-3 px-8 rounded-xl shadow-lg transition-colors"
            onClick={onPayment}>Onayla ve Ödemeye Geç</button>
          <button
            className="w-full md:w-auto border border-[#bfa658] hover:bg-[#3b2c10] text-[#bfa658] font-semibold py-3 px-8 rounded-xl shadow-lg transition-colors"
            onClick={onClose} type="button">Vazgeç</button>
        </div>
      </div>
    </div>
  );
}

// === ÖDEME POPUP ===
function PaymentPopup({ open, onClose, summary, onPaid }) {
  const [card, setCard] = useState({ number: "", name: "", exp: "", cvc: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  if (!open) return null;
  function handlePay(e) {
    e.preventDefault();
    setLoading(true);
    // Burada kart ile ödeme entegrasyonunu (iyzico, stripe vs) bağlayabilirsin.
    setTimeout(() => { setLoading(false); onPaid(); }, 1600); // demo
  }
  return (
    <div className="fixed inset-0 z-[101] flex items-center justify-center bg-black/80">
      <div className="relative bg-[#19160a] border-2 border-[#bfa658] rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto px-8 py-10">
        <button
          className="absolute top-4 right-4 bg-[#bfa658] text-black font-bold rounded-xl px-5 py-2 text-lg shadow hover:bg-yellow-400 transition"
          onClick={onClose}>Kapat</button>
        <h2 className="text-2xl text-[#bfa658] font-extrabold mb-4 text-center">Kredi Kartı ile Ödeme</h2>
        <div className="text-[#ffeec2] mb-2">
          <div><b>Toplam Tutar:</b> <span className="text-xl text-[#FFD700]">{summary.toplam} ₺</span></div>
        </div>
        <form onSubmit={handlePay} className="space-y-3 mt-5">
          <input required className="input w-full" placeholder="Kart Numarası" maxLength={19} value={card.number} onChange={e => setCard(card => ({ ...card, number: e.target.value.replace(/[^\d ]/g, "").slice(0, 19) }))} />
          <input required className="input w-full" placeholder="Ad Soyad" value={card.name} onChange={e => setCard(card => ({ ...card, name: e.target.value.toUpperCase() }))} />
          <div className="flex gap-3">
            <input required className="input w-1/2" placeholder="AA/YY" maxLength={5} value={card.exp} onChange={e => setCard(card => ({ ...card, exp: e.target.value.replace(/[^\d/]/g, "").slice(0, 5) }))} />
            <input required className="input w-1/2" placeholder="CVC" maxLength={4} value={card.cvc} onChange={e => setCard(card => ({ ...card, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) }))} />
          </div>
          {err && <div className="text-red-500">{err}</div>}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-3 rounded-xl text-lg shadow hover:scale-105 transition"
          >{loading ? "Ödeme İşleniyor..." : "Ödemeyi Tamamla"}</button>
        </form>
      </div>
    </div>
  );
}

// === TEŞEKKÜR POPUP ===
function TesekkurPopup({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[102] flex items-center justify-center bg-black/80">
      <div className="relative bg-[#19160a] border-2 border-[#bfa658] rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto px-8 py-12 flex flex-col items-center">
        <button
          className="absolute top-4 right-4 bg-[#bfa658] text-black font-bold rounded-xl px-5 py-2 text-lg shadow hover:bg-yellow-400 transition"
          onClick={onClose}>Kapat</button>
        <div className="text-[#bfa658] text-2xl font-extrabold mb-6 text-center">Teşekkürler!</div>
        <div className="text-[#ffeec2] text-base text-center mb-6">
          Ödemeniz başarıyla alındı.<br />
          Transfer talebiniz ilgili ekiplerimize iletilmiştir.<br />
          <b>Mailinize rezervasyon özetinizi iletiyoruz.</b> Lütfen <b>info@yolcutransferi.com</b> ve <b>0539 526 7569</b> numaralarından gelecek bildirimleri takip ediniz.
        </div>
      </div>
    </div>
  );
}

// === FORM SEÇENEKLERİ ===
const segmentOptions = [
  { key: "Ekonomik", label: "Ekonomik" },
  { key: "Lüks", label: "Lüks" },
  { key: "Prime+", label: "Prime+" }
];
const allTransfers = [
  "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Kurumsal Etkinlik", "Özel Etkinlik", "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
];
const saatler = [];
for (let h = 0; h < 24; ++h)
  for (let m of [0, 15, 30, 45]) saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);

// === URLDEN TRANSFER TÜRÜ ÇEKME ===
function getTransferFromURL() {
  if (typeof window === "undefined") return "";
  const urlParams = new URLSearchParams(window.location.search);
  const t = urlParams.get("transfer");
  return t ? decodeURIComponent(t) : "";
}

export default function RezervasyonForm() {
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
  const [showKvkkPopup, setShowKvkkPopup] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [kvkkChecked, setKvkkChecked] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  // İlk girişte localstorage veya url parametre kontrolü
  useEffect(() => {
    let transferFromURL = "";
    if (typeof window !== "undefined") {
      transferFromURL = getTransferFromURL();
      setFrom("");
      setTo("");
      setPeople("");
      setSegment("");
      setTransfer(transferFromURL || "");
      setDate("");
      setTime("");
      setPnr("");
    }
  }, []);

  const { km, min, error: distErr } = useDistance(from, to);

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
  const vehicleText = getBestVehicleText(Number(people), segment);

  function handleSubmit(e) {
    e.preventDefault();
    const err = {};
    if (!from) err.from = "Lütfen kalkış noktası giriniz.";
    if (!to) err.to = "Lütfen varış noktası giriniz.";
    if (!people) err.people = "Kişi sayısı zorunlu.";
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

  const showVehicleCombos = segment && people;
  const showPNR = transfer === "VIP Havalimanı Transferi" || isAirportRelated(from) || isAirportRelated(to);

  function handleKvkkApprove() {
    setKvkkChecked(true);
  }
  function handlePayment() {
    setShowSummary(false);
    setShowPayment(true);
  }
  async function handlePaymentComplete() {
    setShowPayment(false);
    setShowThanks(true);
    // Kaydı DB ve Mail ile gönder:
    try {
      await fetch("/api/rezervasyon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from, to, people, segment, transfer, date, time, name, surname, tc, phone, email, pnr, note, extras, extrasQty
        }),
      });
    } catch (e) { }
  }

  return (
    <section className="w-full max-w-3xl mx-auto rounded-3xl shadow-2xl bg-[#19160a] border border-[#bfa658] px-6 md:px-10 py-12 my-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-8 text-center font-quicksand">
        VIP Rezervasyon Formu
      </h1>
      <form onSubmit={handleSubmit} autoComplete="on" className="flex flex-col gap-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereden?</label>
            <AutoCompleteInput value={from} onChange={setFrom} placeholder="Nereden? İl / İlçe / Mahalle / Havalimanı" />
            {fieldErrors.from && <div className="text-red-400 text-xs mt-1">{fieldErrors.from}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
            <AutoCompleteInput value={to} onChange={setTo} placeholder="Nereye? İl / İlçe / Mahalle / Havalimanı" />
            {fieldErrors.to && <div className="text-red-400 text-xs mt-1">{fieldErrors.to}</div>}
          </div>
        </div>
        {(from && to) && (
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
            {fieldErrors.people && <div className="text-red-400 text-xs mt-1">{fieldErrors.people}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
            <select className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={segment} onChange={e => setSegment(e.target.value)}>
              <option value="">Seçiniz</option>
              {segmentOptions.map(opt => <option key={opt.key} value={opt.label}>{opt.label}</option>)}
            </select>
            {fieldErrors.segment && <div className="text-red-400 text-xs mt-1">{fieldErrors.segment}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Transfer Türü</label>
            <select className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={transfer} onChange={e => setTransfer(e.target.value)}>
              <option value="">Seçiniz</option>
              {allTransfers.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            {fieldErrors.transfer && <div className="text-red-400 text-xs mt-1">{fieldErrors.transfer}</div>}
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
            {fieldErrors.date && <div className="text-red-400 text-xs mt-1">{fieldErrors.date}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
            <select className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={time}
              onChange={e => setTime(e.target.value)}>
              <option value="">Seçiniz</option>
              {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
            </select>
            {fieldErrors.time && <div className="text-red-400 text-xs mt-1">{fieldErrors.time}</div>}
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
            <label className="font-bold text-[#bfa658] mb-2 block text-lg">Araç</label>
            <div className="text-[#ffeec2] text-base mb-1">
              {vehicleText || <span className="text-red-400">Uygun araç bulunamadı.</span>}
            </div>
          </div>
        )}
        <div className="flex items-center mt-6 mb-3">
          <input
            type="checkbox"
            id="kvkk"
            required
            checked={kvkkChecked}
            onChange={e => setKvkkChecked(e.target.checked)}
            className="accent-[#bfa658] w-5 h-5"
          />
          <label htmlFor="kvkk" className="ml-2 text-[#ffeec2] text-sm">
            <button type="button"
              className="underline text-[#FFD700] hover:text-[#bfa658] cursor-pointer px-1"
              style={{ border: "none", background: "transparent" }}
              onClick={() => setShowKvkkPopup(true)}
            >
              KVKK Aydınlatma Metni ve Politikası
            </button>
            'nı okudum, onaylıyorum.
          </label>
        </div>
        {fieldErrors.kvkk && <div className="text-red-400 text-xs mt-1">{fieldErrors.kvkk}</div>}
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-12 rounded-xl text-xl shadow hover:scale-105 transition"
          >
            Rezervasyonu Tamamla
          </button>
        </div>
      </form>
      <KvkkPopup open={showKvkkPopup} onClose={() => setShowKvkkPopup(false)} onApprove={handleKvkkApprove} />
      <SummaryPopup
        visible={showSummary}
        onClose={() => setShowSummary(false)}
        form={{ from, to, people, segment, transfer, date, time, name, surname, tc, phone, email, pnr, note }}
        extras={extras}
        extrasQty={extrasQty}
        setExtras={setExtras}
        setExtrasQty={setExtrasQty}
        vehicleText={vehicleText}
        kmInfo={km}
        minInfo={min}
        onPayment={handlePayment}
      />
      <PaymentPopup
        open={showPayment}
        onClose={() => setShowPayment(false)}
        summary={{ toplam: 4000 + Object.values(extrasQty).reduce((sum, qty, idx) => sum + (extrasListByCategory.flatMap(cat => cat.items)[idx]?.price || 0) * qty, 0) }}
        onPaid={handlePaymentComplete}
      />
      <TesekkurPopup open={showThanks} onClose={() => { setShowThanks(false); router.push("/"); }} />
    </section>
  );
}
