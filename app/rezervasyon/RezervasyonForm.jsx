// PATH: /app/rezervasyon/RezervasyonForm.jsx

"use client";
import React, { useState, useEffect, useRef } from "react";
import EkstralarAccordion from "./EkstralarAccordion";
import { vehicles } from "../../data/vehicleList";
import { useRouter } from "next/navigation";

// 1. --- ADRES (JSON’dan dinamik çek) ---
function useAddressData() {
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    fetch("/dumps/adresler.json")
      .then(r => r.json())
      .then(setAddresses);
  }, []);
  return addresses;
}
function getSuggestions(q, addressList) {
  if (!q || q.length < 2) return [];
  const nq = q.toLocaleLowerCase("tr-TR");
  return addressList
    .filter(item =>
      (item.il && item.il.toLocaleLowerCase("tr-TR").includes(nq)) ||
      (item.ilce && item.ilce.toLocaleLowerCase("tr-TR").includes(nq)) ||
      (item.semt && item.semt.toLocaleLowerCase("tr-TR").includes(nq)) ||
      (item.mahalle && item.mahalle.toLocaleLowerCase("tr-TR").includes(nq)) ||
      (item.ad && item.ad.toLocaleLowerCase("tr-TR").includes(nq))
    )
    .slice(0, 16)
    .map(item => {
      if (item.tip === "il") return item.il;
      if (item.tip === "ilce") return `${item.il} / ${item.ilce}`;
      if (item.tip === "semt") return `${item.il} / ${item.ilce} / ${item.semt}`;
      if (item.tip === "mahalle") return `${item.il} / ${item.ilce} / ${item.semt ? item.semt + " / " : ""}${item.mahalle}`;
      if (item.tip === "havalimani") return item.ad;
      return "";
    });
}
// Adres input (autocomplete)
function AutoCompleteInput({ value, onChange, placeholder }) {
  const addressList = useAddressData();
  const [sug, setSug] = useState([]);
  useEffect(() => { setSug(getSuggestions(value, addressList)); }, [value, addressList]);
  return (
    <div className="relative">
      <input
        className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        onFocus={e => setSug(getSuggestions(e.target.value, addressList))}
        onBlur={() => setTimeout(() => setSug([]), 140)}
      />
      {sug.length > 0 && (
        <ul className="absolute z-20 bg-[#19160a] border border-[#bfa658] rounded-lg w-full mt-1 text-[#ffeec2] max-h-52 overflow-y-auto">
          {sug.map((t, i) => (
            <li key={i}
              className="px-3 py-1 hover:bg-[#bfa658] hover:text-black cursor-pointer"
              onClick={() => { onChange(t); setSug([]); }}>{t}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// 2. --- HARİTA ve MESAFE HESABI ---
function useMapRoute({ from, to, date, time }) {
  const [data, setData] = useState({ km: null, min: null, loading: false, error: null });
  useEffect(() => {
    if (!from || !to || from === to) { setData({ km: null, min: null, loading: false }); return; }
    setData(d => ({ ...d, loading: true }));
    // Basit Google/OSRM api ile: (gerçek sistemde kendi api’n ile entegre et!)
    fetch(`https://yolcutransferi.com/api/maps/route?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}&time=${time}`)
      .then(r => r.json())
      .then(json => setData({ km: json.distance_km, min: json.duration_min, loading: false }))
      .catch(() => setData({ km: null, min: null, loading: false, error: "Mesafe hesaplanamadı." }));
  }, [from, to, date, time]);
  return data;
}

// 3. --- ARAÇ KOMBO (En az araç ile maks yolcu taşıma, her olası kombinasyon!) ---
function getVehicleCombos(people, segment) {
  // Tüm araçlar, uygun segment ve yolcu kapasitesine göre büyükten küçüğe sırala
  if (!segment || !people) return [];
  const vList = vehicles.filter(v => v.segment === segment).sort((a, b) => b.max - a.max);
  // 1. Minimum araçla, maksimum yolcu taşıyan tüm kombinasyonları bul
  let combos = [];
  // Sadece tek araçla gidebilecekse:
  vList.forEach(v => {
    if (v.max >= people) combos.push([{ ...v, adet: 1 }]);
  });
  // Çoklu kombo (ör: 2xVito + 1xPassat)
  function findCombos(remain, acc, idx) {
    if (remain <= 0) { combos.push(acc.slice()); return; }
    for (let i = idx; i < vList.length; i++) {
      if (vList[i].max === 0) continue;
      let maxQty = Math.ceil(remain / vList[i].max);
      for (let q = 1; q <= maxQty; q++) {
        findCombos(remain - q * vList[i].max, [...acc, { ...vList[i], adet: q }], i + 1);
      }
    }
  }
  findCombos(people, [], 0);
  // Benzer komboları ve fazla aracı filtrele
  combos = combos.filter(combo => {
    const toplamKoltuk = combo.reduce((sum, c) => sum + c.max * c.adet, 0);
    return toplamKoltuk >= people;
  });
  // Aynı araç tipi ve sayılarını birleştir, tekrarları kaldır, sadeleştir
  const key = (combo) => combo.map(c => `${c.label}x${c.adet}`).join("-");
  let uniq = {};
  combos.forEach(c => uniq[key(c)] = c);
  return Object.values(uniq);
}

// 4. --- KVKK Popup Mantığı (harici içerik) ---
function KvkkPopup({ open, onClose }) {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch("https://yolcutransferi.com/mesafeli-satis")
      .then(r => r.text())
      .then(txt => {
        // <main> içeriğini çek
        const match = txt.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
        setHtml(match ? match[1] : "İçerik yüklenemedi.");
      })
      .catch(() => setHtml("İçerik alınamadı."))
      .finally(() => setLoading(false));
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative bg-[#19160a] border-2 border-[#bfa658] rounded-2xl shadow-2xl w-[96vw] max-w-4xl max-h-[92vh] overflow-y-auto px-10 py-10">
        {/* Kapat */}
        <button
          className="absolute -top-8 right-4 text-[#bfa658] text-4xl font-bold hover:text-yellow-400 z-50"
          style={{ boxShadow: "0 4px 16px #000a" }}
          onClick={onClose}
        >×</button>
        <div className="text-[#ffeec2] space-y-2" dangerouslySetInnerHTML={{ __html: loading ? "Yükleniyor..." : html }} />
      </div>
    </div>
  );
}

// 5. --- REZERVASYON ÖZETİ POPUP (Tam tablo + canlı ekstralar ekle/çıkar/qty vs) ---
function SummaryPopup({ onClose, values, extras, extrasQty, setExtras, setExtrasQty, routeData }) {
  // Hesap
  const basePrice = 4000; // Örnek!
  const KDV_ORAN = 0.20;
  // ... burada senin extrasListByCategory’den ekstraları çek
  // const allExtras = require("../../data/extrasByCategory").extrasListByCategory.flatMap(cat => cat.items);
  // ... veya örnek data
  const allExtras = [
    { key: "cocuk_koltugu", label: "Çocuk Koltuğu", price: 350 },
    { key: "su_ikram", label: "Su İkramı", price: 50 },
    { key: "wifi", label: "Wi-Fi", price: 190 }
  ];
  const selectedExtras = allExtras.filter(e => extras.includes(e.key));
  const extrasTotal = selectedExtras.reduce((sum, e) => sum + (extrasQty[e.key] || 1) * e.price, 0);
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
    setExtrasQty(q => { const { [key]: _, ...rest } = q; return rest; });
  }

  function handlePayment() {
    // Buradan ödeme ekranına yönlendir (örnek)
    alert("Ödeme ekranı (dummy). Tüm bilgiler kayıt edilecek/maillenecek.");
    onClose();
  }

  // -- Araç ve mesafe
  const km = routeData.km;
  const sure = routeData.min;
  // Tüm seçimleri detaylıca göster
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative bg-[#19160a] border-2 border-[#bfa658] rounded-3xl shadow-2xl max-w-3xl w-full px-10 py-10 overflow-y-auto max-h-[92vh]">
        <button onClick={onClose} className="absolute -top-8 right-4 text-[#ffeec2] text-3xl font-bold hover:text-yellow-400 z-50" style={{ boxShadow: "0 4px 16px #000a" }}>×</button>
        <h2 className="text-2xl font-extrabold mb-6 text-[#bfa658] text-center font-quicksand">Rezervasyon Özeti</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-[#ffeec2] text-base">
          <div>
            <div><b>Ad Soyad:</b> {values.name} {values.surname}</div>
            <div><b>T.C.:</b> {values.tc}</div>
            <div><b>Telefon:</b> {values.phone}</div>
            <div><b>E-posta:</b> {values.email}</div>
            <div><b>Kişi:</b> {values.people}</div>
            <div><b>Tarih:</b> {values.date}</div>
            <div><b>Saat:</b> {values.time}</div>
          </div>
          <div>
            <div><b>Transfer:</b> {values.transfer || "-"}</div>
            <div><b>Segment:</b> {values.segment}</div>
            <div><b>Nereden:</b> {values.from}</div>
            <div><b>Nereye:</b> {values.to}</div>
            {values.pnr && <div><b>PNR/Uçuş Kodu:</b> {values.pnr}</div>}
            {km && sure && (
              <div><b>Mesafe:</b> {km} km, <b>Tahmini Süre:</b> {sure} dk</div>
            )}
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
        {/* Fiyatlar */}
        <div className="w-full flex flex-col items-end gap-1 mt-2 text-base">
          <div>Transfer Bedeli: <b>{basePrice.toLocaleString()} ₺</b></div>
          <div>Ekstralar: <b>{extrasTotal.toLocaleString()} ₺</b></div>
          <div>KDV: <b>{kdv.toLocaleString(undefined, { maximumFractionDigits: 2 })} ₺</b></div>
          <div className="text-xl text-[#bfa658] font-bold">Toplam: {toplam.toLocaleString()} ₺</div>
        </div>
        {/* Butonlar */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mt-9">
          <button
            className="w-full md:w-auto bg-[#bfa658] hover:bg-[#ffeec2] text-black font-bold py-3 px-8 rounded-xl shadow-lg transition-colors"
            onClick={handlePayment}
          >Onayla ve Ödemeye Geç</button>
          <button
            className="w-full md:w-auto border border-[#bfa658] hover:bg-[#3b2c10] text-[#bfa658] font-semibold py-3 px-8 rounded-xl shadow-lg transition-colors"
            onClick={onClose}
            type="button"
          >Vazgeç</button>
        </div>
      </div>
    </div>
  );
}

// 6. --- ANA FORM ---
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
  const [showKvkkPopup, setShowKvkkPopup] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [kvkkChecked, setKvkkChecked] = useState(false);

  // Validasyon
  const isValidTC = t => /^[1-9]\d{9}[02468]$/.test(t) && t.length === 11;
  const isValidPhone = t => /^05\d{9}$/.test(t) && t.length === 11;
  const isValidEmail = t => /^\S+@\S+\.\S+$/.test(t);

  function handleTcChange(val) { setTc(val.replace(/\D/g, "").slice(0, 11)); }
  function handlePhoneChange(val) {
    let num = val.replace(/\D/g, "");
    if (num.length > 0 && num[0] !== "0") num = "0" + num;
    setPhone(num.slice(0, 11));
  }
  // Harita & Mesafe
  const routeData = useMapRoute({ from, to, date, time });

  // Araç kombinasyonları (tüm ihtimaller)
  const vehicleCombos = getVehicleCombos(Number(people), segment);

  // PNR
  const airportKeywords = [
    "havalimanı", "istanbul havalimanı", "iga", "ist", "sabiha gökçen", "saw",
    "eskişehir havalimanı", "antalya havalimanı", "ankara esenboğa", "esenboğa",
    "milas bodrum", "izmir adnan", "trabzon havalimanı"
  ];
  function isAirportRelated(val) {
    if (!val) return false;
    const t = val.toLocaleLowerCase("tr-TR");
    return airportKeywords.some(k => t.includes(k));
  }
  const showPNR = transfer === "VIP Havalimanı Transferi" || isAirportRelated(from) || isAirportRelated(to);

  // Submit
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

  // --- ANA FORM ---
  return (
    <section className="w-full max-w-3xl mx-auto rounded-3xl shadow-2xl bg-[#19160a] border border-[#bfa658] px-6 md:px-10 py-14 my-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-8 text-center font-quicksand">
        VIP Rezervasyon Formu
      </h1>
      <form onSubmit={handleSubmit} autoComplete="on" className="flex flex-col gap-2">
        {/* Nereden/Nereye */}
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
        {/* Harita/mesafe */}
        <div className="mb-4 flex flex-col gap-2">
          {from && to && from !== to && (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 text-[#ffeec2] text-base">
              <span>
                <b>Mesafe:</b> {routeData.km ? `${routeData.km} km` : "-"}
                {"  "} <b>Süre:</b> {routeData.min ? `${routeData.min} dk` : "-"}
                {routeData.loading && <span className="ml-3 text-yellow-400">Hesaplanıyor...</span>}
                {routeData.error && <span className="ml-3 text-red-400">{routeData.error}</span>}
              </span>
              {/* Burada harita embed veya görsel mini gösterimi eklenebilir */}
            </div>
          )}
        </div>
        {/* Kişi/segment/transfer yan yana */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Kişi Sayısı</label>
            <select className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={people} onChange={e => setPeople(e.target.value)}>
              <option value="">Seçiniz</option>
              {Array.from({ length: 24 }, (_, i) => i + 1).map(val =>
                <option key={val} value={val}>{val}</option>
              )}
            </select>
            {fieldErrors.people && <div className="text-red-400 text-xs mt-1">{fieldErrors.people}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
            <select className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={segment} onChange={e => setSegment(e.target.value)}>
              <option value="">Seçiniz</option>
              <option value="Ekonomik">Ekonomik</option>
              <option value="Lüks">Lüks</option>
              <option value="Prime+">Prime+</option>
            </select>
            {fieldErrors.segment && <div className="text-red-400 text-xs mt-1">{fieldErrors.segment}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Transfer Türü</label>
            <select className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
              value={transfer} onChange={e => setTransfer(e.target.value)}>
              <option value="">Seçiniz</option>
              <option value="VIP Havalimanı Transferi">VIP Havalimanı Transferi</option>
              <option value="Şehirler Arası Transfer">Şehirler Arası Transfer</option>
              <option value="Kurumsal Etkinlik">Kurumsal Etkinlik</option>
              <option value="Özel Etkinlik">Özel Etkinlik</option>
              <option value="Tur & Gezi">Tur & Gezi</option>
              <option value="Toplu Transfer">Toplu Transfer</option>
              <option value="Düğün vb Organizasyonlar">Düğün vb Organizasyonlar</option>
            </select>
            {fieldErrors.transfer && <div className="text-red-400 text-xs mt-1">{fieldErrors.transfer}</div>}
          </div>
        </div>
        {/* Araç kombinasyonları */}
        <div className="mb-3">
          <label className="font-bold text-[#bfa658] mb-2 block text-lg">Uygun Araç Kombinasyonları</label>
          {!segment || !people ? (
            <div className="text-[#ffeec2] text-base">Lütfen kişi sayısı ve segmenti seçiniz.</div>
          ) : vehicleCombos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {vehicleCombos.map((combo, idx) => (
                <div key={idx} className="border-2 border-[#bfa658] rounded-xl p-3 bg-black/70 flex flex-col items-center text-[#ffeec2] text-base">
                  <div className="font-bold mb-1">
                    {combo.map(c => (
                      <span key={c.label}>{c.label} <b>x{c.adet}</b>{" | "}</span>
                    ))}
                  </div>
                  <div className="text-xs text-[#bfa658] mb-1">
                    Toplam Kapasite: {combo.reduce((sum, c) => sum + c.max * c.adet, 0)} Kişi
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-red-400">Uygun araç kombinasyonu bulunamadı.</div>
          )}
          <div className="mt-2 text-sm text-[#ffeec2] opacity-90">
            Seçtiğiniz kişi ve segment için en uygun araçlar yukarıda listelenmiştir.
          </div>
        </div>
        {/* Diğer alanlar */}
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
              {Array.from({ length: 24 * 4 }, (_, i) => {
                const h = String(Math.floor(i / 4)).padStart(2, "0");
                const m = String((i % 4) * 15).padStart(2, "0");
                return `${h}:${m}`;
              }).map(saat => <option key={saat} value={saat}>{saat}</option>)}
            </select>
            {fieldErrors.time && <div className="text-red-400 text-xs mt-1">{fieldErrors.time}</div>}
          </div>
        </div>
        {/* Ad/Soyad */}
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
        {/* T.C./Telefon/E-mail */}
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
        {/* PNR */}
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
        {/* Ek Not */}
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
        {/* Ekstralar */}
        <div className="mb-2">
          <label className="font-bold text-[#bfa658] mb-2 block text-lg">Ekstralar</label>
          <EkstralarAccordion
            selectedExtras={extras}
            setSelectedExtras={setExtras}
            extrasQty={extrasQty}
            setExtrasQty={setExtrasQty}
          />
        </div>
        {/* KVKK Onay Kutusu */}
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
          >Rezervasyonu Tamamla</button>
        </div>
      </form>
      {/* KVKK POPUP */}
      <KvkkPopup open={showKvkkPopup} onClose={() => setShowKvkkPopup(false)} />
      {/* REZERVASYON ÖZETİ POPUP */}
      {showSummary &&
        <SummaryPopup
          onClose={() => setShowSummary(false)}
          values={{
            from, to, people, segment, transfer, date, time, name, surname, tc, phone, email, pnr, note
          }}
          extras={extras}
          extrasQty={extrasQty}
          setExtras={setExtras}
          setExtrasQty={setExtrasQty}
          routeData={routeData}
        />}
    </section>
  );
}

// PATH SONU: /app/rezervasyon/RezervasyonForm.jsx
