// PATH: app/rezervasyon/RezervasyonForm.jsx

"use client";
import React, { useState, useEffect, useRef } from "react";
import EkstralarAccordion from "./EkstralarAccordion";
import { vehicles } from "../../data/vehicleList";
import { useRouter } from "next/navigation";

// --- ADRES AUTOCOMPLETE (json'dan) ---
const useAddressData = () => {
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    fetch("/dumps/adresler.json")
      .then(r => r.json())
      .then(setAddresses);
  }, []);
  return addresses;
};
function getAddressSuggestions(q, addressList) {
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
    .slice(0, 15)
    .map(item => {
      if (item.tip === "il") return item.il;
      if (item.tip === "ilce") return `${item.il} / ${item.ilce}`;
      if (item.tip === "semt") return `${item.il} / ${item.ilce} / ${item.semt}`;
      if (item.tip === "mahalle") return `${item.il} / ${item.ilce} / ${item.semt ? item.semt + " / " : ""}${item.mahalle}`;
      if (item.tip === "havalimani") return item.ad;
      return "";
    });
}
function AutoCompleteInput({ value, onChange, placeholder }) {
  const addressList = useAddressData();
  const [suggestions, setSuggestions] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    setSuggestions(getAddressSuggestions(value, addressList));
  }, [value, addressList]);

  return (
    <div className="relative">
      <input
        className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
        value={value}
        onChange={e => { onChange(e.target.value); setShowList(true); }}
        placeholder={placeholder}
        onFocus={() => setShowList(true)}
        onBlur={() => setTimeout(() => setShowList(false), 150)}
        autoComplete="off"
      />
      {showList && suggestions.length > 0 &&
        <ul className="absolute z-30 bg-[#19160a] border border-[#bfa658] rounded-lg w-full mt-1 text-[#ffeec2] max-h-40 overflow-y-auto">
          {suggestions.map((s, i) => (
            <li key={i}
              className="px-3 py-1 hover:bg-[#bfa658] hover:text-black cursor-pointer"
              onClick={() => { onChange(s); setShowList(false); }}
            >{s}</li>
          ))}
        </ul>
      }
    </div>
  );
}

// --- HARİTA VE MESAFE/SÜRE (Google Maps API veya open source ile) ---
function HaritaMesafe({ from, to, date, time }) {
  // Demo: Sabit süre ve mesafe, örnekte Google ile API ile hesaplanabilir
  const [mesafe, setMesafe] = useState(null);
  const [sure, setSure] = useState(null);

  useEffect(() => {
    if (from && to) {
      // Demo: Rastgele süre/mesafe, gerçek kullanımda API ile alınır
      setMesafe("56 km");
      setSure("1 saat 12 dk");
    } else {
      setMesafe(null);
      setSure(null);
    }
  }, [from, to, date, time]);

  return (
    <div className="w-full my-3 p-4 bg-black/70 border border-[#bfa658] rounded-xl flex flex-col md:flex-row items-center gap-5">
      {/* Harita burada render edilir */}
      <div className="w-full md:w-2/3 h-48 rounded-xl overflow-hidden bg-[#23201a] flex items-center justify-center text-[#bfa658] font-bold text-lg">
        {/* İleri seviye için Google Maps Embed veya OpenLayers/Leaflet */}
        Harita (Demo)
      </div>
      <div className="flex flex-col gap-2 text-[#ffeec2] text-base">
        {mesafe && sure ? (
          <>
            <span>Mesafe: <b>{mesafe}</b></span>
            <span>Tahmini Süre: <b>{sure}</b></span>
            <span className="text-xs text-gray-400">Trafik ve yol durumuna göre değişebilir.</span>
          </>
        ) : (
          <span>Lütfen güzergah seçin.</span>
        )}
      </div>
    </div>
  );
}

// --- ARAÇ KOMBO MANTIĞI ---
function getVehicleCombos(people, segment) {
  if (!people || !segment) return [];
  let psay = Number(people);

  // Filtreye uyan araçları bul
  const uygun = vehicles.filter(v => v.segment === segment).sort((a, b) => a.max - b.max);
  let combos = [];

  // En az araçla yolcuyu taşı (ör: 20 yolcu için 2x10 veya 1x12+1x8 gibi)
  for (let i = uygun.length - 1; i >= 0; i--) {
    let kalan = psay;
    let combo = [];
    for (let j = i; j >= 0; j--) {
      let adet = Math.floor(kalan / uygun[j].max);
      if (adet > 0) {
        combo.push({ ...uygun[j], count: adet });
        kalan -= adet * uygun[j].max;
      }
    }
    if (kalan > 0 && uygun[0]) {
      combo.push({ ...uygun[0], count: 1 });
      kalan = 0;
    }
    let toplam = combo.reduce((a, c) => a + c.max * c.count, 0);
    if (toplam >= psay) combos.push(combo);
    if (combos.length >= 3) break;
  }
  return combos;
}

// --- KVKK Popup ---
function KvkkPopup({ open, onClose }) {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch("https://yolcutransferi.com/mesafeli-satis")
      .then(r => r.text())
      .then(txt => {
        const match = txt.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
        setHtml(match ? match[1] : "İçerik yüklenemedi.");
      })
      .catch(() => setHtml("İçerik alınamadı."))
      .finally(() => setLoading(false));
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative bg-[#19160a] border-2 border-[#bfa658] rounded-2xl shadow-2xl w-[97vw] max-w-3xl max-h-[93vh] overflow-y-auto px-10 py-9">
        <button
          className="fixed right-[5vw] top-[4vh] text-[#bfa658] text-3xl font-bold hover:text-yellow-400 z-60"
          onClick={onClose}
        >×</button>
        <div className="text-[#ffeec2] space-y-2" dangerouslySetInnerHTML={{ __html: loading ? "Yükleniyor..." : html }} />
      </div>
    </div>
  );
}

// --- SİPARİŞ ÖZETİ POPUP ---
function OrderSummaryPopup({ open, data, onClose, onConfirm }) {
  if (!open) return null;
  const {
    from, to, date, time, people, segment, transfer, combos, extras, name, surname, tc, phone, email, pnr, note, mesafe, sure
  } = data || {};
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
      <div className="relative bg-[#19160a] border-2 border-[#bfa658] rounded-2xl shadow-2xl w-[97vw] max-w-2xl max-h-[92vh] overflow-y-auto px-10 py-7">
        <button
          className="fixed right-[6vw] top-[6vh] text-[#bfa658] text-3xl font-bold hover:text-yellow-400 z-60"
          onClick={onClose}
        >×</button>
        <div className="text-[#ffeec2]">
          <h2 className="text-2xl font-bold mb-3">Rezervasyon Özeti</h2>
          <div className="mb-2">Nereden: <b>{from}</b></div>
          <div className="mb-2">Nereye: <b>{to}</b></div>
          <div className="mb-2">Tarih: <b>{date}</b> Saat: <b>{time}</b></div>
          <div className="mb-2">Kişi Sayısı: <b>{people}</b> Segment: <b>{segment}</b> Tip: <b>{transfer}</b></div>
          {mesafe && sure &&
            <div className="mb-2">Mesafe: <b>{mesafe}</b> Süre: <b>{sure}</b></div>
          }
          <div className="mb-2">
            <b>Araç Kombinasyonu:</b>
            <ul>
              {combos && combos.length > 0 ? combos[0].map((v, idx) =>
                <li key={idx}> {v.count} x {v.label} ({v.max} kişilik) </li>
              ) : <li>Seçim bulunamadı</li>}
            </ul>
          </div>
          <div className="mb-2">Ekstralar: {extras && extras.length > 0 ? extras.join(", ") : "-"}</div>
          <div className="mb-2">Ad: <b>{name} {surname}</b></div>
          <div className="mb-2">Telefon: <b>{phone}</b> E-posta: <b>{email}</b></div>
          <div className="mb-2">T.C.: <b>{tc}</b></div>
          {pnr && <div className="mb-2">PNR: <b>{pnr}</b></div>}
          {note && <div className="mb-2">Ek Not: <b>{note}</b></div>}
          <div className="flex justify-end mt-5 gap-2">
            <button
              className="bg-[#bfa658] px-7 py-3 rounded-lg text-black font-bold text-xl hover:bg-yellow-400"
              onClick={onConfirm}
            >Ödeme Ekranına Geç</button>
            <button
              className="bg-[#363020] px-6 py-3 rounded-lg text-[#ffeec2] font-bold text-xl hover:bg-gray-800"
              onClick={onClose}
            >Vazgeç</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- ANA FORM ----
function RezervasyonForm() {
  const router = useRouter();
  // STATE
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState("");
  const [segment, setSegment] = useState("");
  const [transfer, setTransfer] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [tc, setTc] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pnr, setPnr] = useState("");
  const [note, setNote] = useState("");
  const [extras, setExtras] = useState([]);
  const [showKvkkPopup, setShowKvkkPopup] = useState(false);
  const [kvkkChecked, setKvkkChecked] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [mesafe, setMesafe] = useState("");
  const [sure, setSure] = useState("");
  const [combos, setCombos] = useState([]);

  // Otomatik kombo güncelle
  useEffect(() => {
    setCombos(getVehicleCombos(people, segment));
    // Demo mesafe/süre, burada API'den alınabilir
    if (from && to) {
      setMesafe("56 km");
      setSure("1 saat 12 dk");
    } else {
      setMesafe("");
      setSure("");
    }
  }, [from, to, people, segment]);

  // Validasyonlar
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

  // PNR
  const airportKeywords = [
    "havalimanı", "istanbul havalimanı", "iga", "ist", "sabiha gökçen", "saw", "eskişehir havalimanı",
    "antalya havalimanı", "ankara esenboğa", "esenboğa", "milas bodrum", "izmir adnan", "trabzon havalimanı"
  ];
  function isAirportRelated(val) {
    if (!val) return false;
    const t = val.toLocaleLowerCase("tr-TR");
    return airportKeywords.some(k => t.includes(k));
  }
  const showPNR = transfer === "VIP Havalimanı Transferi" || isAirportRelated(from) || isAirportRelated(to);

  // Saatler
  const saatler = [];
  for (let h = 0; h < 24; ++h)
    for (let m of [0, 15, 30, 45]) saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);

  // Form Submit
  function handleSubmit(e) {
    e.preventDefault();
    const err = {};
    if (!from) err.from = "Kalkış noktası zorunlu.";
    if (!to) err.to = "Varış noktası zorunlu.";
    if (!date) err.date = "Tarih zorunlu.";
    if (!time) err.time = "Saat zorunlu.";
    if (!people) err.people = "Kişi sayısı zorunlu.";
    if (!segment) err.segment = "Segment zorunlu.";
    if (!transfer) err.transfer = "Transfer tipi zorunlu.";
    if (!name) err.name = "Ad zorunlu.";
    if (!surname) err.surname = "Soyad zorunlu.";
    if (!isValidTC(tc)) err.tc = "Geçerli bir TC Kimlik No giriniz.";
    if (!isValidPhone(phone)) err.phone = "Geçerli bir 05xx ile başlayan telefon giriniz.";
    if (!isValidEmail(email)) err.email = "Geçerli e-posta adresi giriniz.";
    if (!kvkkChecked) err.kvkk = "KVKK onayı zorunludur.";
    setFieldErrors(err);
    if (Object.keys(err).length > 0) return;
    setShowOrderSummary(true);
  }

  // Siparişi Onayla (DB, mail, ödeme, yönlendirme vs)
  function handleOrderConfirm() {
    setShowOrderSummary(false);
    // TODO: Mail ve DB entegrasyonu
    alert("Rezervasyon kaydı başarılı! (Buraya ödeme yönlendirmesi/işlemi eklenecek.)");
    // Sonrasında router.push("/odeme") ile ödeme sayfasına yönlendirebilirsin.
  }

  // --- ANA FORM ---
  return (
    <section className="w-full max-w-3xl mx-auto rounded-3xl shadow-2xl bg-[#19160a] border border-[#bfa658] px-6 md:px-10 py-12 my-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-7 text-center font-quicksand">
        VIP Rezervasyon Formu
      </h1>

      <form onSubmit={handleSubmit} autoComplete="on" className="flex flex-col gap-2">
        {/* 1. Grup: Nereden/Nereye/Tarih/Saat */}
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

        {/* 2. Grup: Kişi/segment/transfer */}
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

        {/* HARİTA MESAFE SÜRE */}
        <HaritaMesafe from={from} to={to} date={date} time={time} />

        {/* 3. Grup: Araç Kombinasyonu */}
        <div className="mb-3">
          <label className="font-bold text-[#bfa658] mb-2 block text-lg">Araç Kombinasyonu</label>
          {combos.length > 0 ? combos.map((combo, idx) => (
            <div key={idx} className="flex flex-wrap gap-3 items-center mb-1">
              {combo.map((v, i) =>
                <div key={i} className="border-2 border-[#bfa658] rounded-xl p-2 bg-black/70 flex flex-col items-center text-[#ffeec2] text-base min-w-[110px]">
                  <span className="font-bold">{v.count} x {v.label}</span>
                  <span className="text-xs text-[#bfa658] mb-1">{v.segment}</span>
                  <span className="text-xs">{v.max} Kişilik</span>
                </div>
              )}
              <span className="ml-2 text-[#bfa658] text-xs">(Toplam: {combo.reduce((a, c) => a + c.max * c.count, 0)} kişilik)</span>
            </div>
          )) : (
            <div className="text-red-400">Uygun araç kombinasyonu bulunamadı. Size özel seçenek için bizi arayın.</div>
          )}
          <div className="mt-2 text-sm text-[#ffeec2] opacity-90">
            Seçtiğiniz kişi ve segment için uygun araç kombinasyonları önerilmiştir. Size en uygun ve kurumsal şekilde rezerve edilecektir.
          </div>
        </div>

        {/* 4. Grup: Ekstralar */}
        <div className="mb-2">
          <label className="font-bold text-[#bfa658] mb-2 block text-lg">Ekstralar</label>
          <EkstralarAccordion
            selectedExtras={extras}
            setSelectedExtras={setExtras}
          />
        </div>

        {/* 5. Grup: Kişisel Bilgiler */}
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

        {/* TAMAMLA */}
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-12 rounded-xl text-xl shadow hover:scale-105 transition"
          >
            Rezervasyonu Tamamla
          </button>
        </div>
      </form>

      {/* KVKK POPUP */}
      <KvkkPopup open={showKvkkPopup} onClose={() => setShowKvkkPopup(false)} />
      {/* SİPARİŞ ÖZETİ */}
      <OrderSummaryPopup
        open={showOrderSummary}
        data={{
          from, to, date, time, people, segment, transfer, combos, extras, name, surname, tc, phone, email, pnr, note, mesafe, sure
        }}
        onClose={() => setShowOrderSummary(false)}
        onConfirm={handleOrderConfirm}
      />
    </section>
  );
}

export default RezervasyonForm;
