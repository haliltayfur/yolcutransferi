"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { vehicles } from "../../data/vehicleList";
import { extrasListByCategory } from "../../data/extrasByCategory";

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
  const params = useSearchParams();

  // Varsayılan parametreler
  const paramFrom = params.get("from") || "";
  const paramTo = params.get("to") || "";
  const paramDate = params.get("date") || "";
  const paramTime = params.get("time") || "";
  const paramVehicle = params.get("vehicle") || "";
  const paramPeople = Number(params.get("people")) || 1;
  const paramSegment = params.get("segment") || "Ekonomik";
  const paramTransfer = params.get("transfer") || "";

  // Form state
  const [from, setFrom] = useState(paramFrom);
  const [to, setTo] = useState(paramTo);
  const [people, setPeople] = useState(paramPeople);
  const [segment, setSegment] = useState(paramSegment);
  const [transfer, setTransfer] = useState(paramTransfer);
  const [vehicle, setVehicle] = useState(paramVehicle);
  const [date, setDate] = useState(paramDate);
  const [time, setTime] = useState(paramTime);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [tc, setTc] = useState("");
  const [phone, setPhone] = useState("");
  const [pnr, setPnr] = useState("");
  const [note, setNote] = useState("");
  const [extras, setExtras] = useState([]);
  const [extrasQty, setExtrasQty] = useState({});
  const [mesafeliOk, setMesafeliOk] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showContract, setShowContract] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Segment ve transfer uyumlu araçlar
  const availableVehicles = vehicles.filter(v =>
    (!segment || normalize(v.segment) === normalize(segment)) &&
    (!transfer || (v.transferTypes || []).map(normalize).includes(normalize(transfer))) &&
    (!people || (v.max || 1) >= people)
  );
  const maxPeople = Math.max(...availableVehicles.map(v => v.max || 1), 10);

  useEffect(() => {
    const next = {};
    extras.forEach(key => {
      next[key] = extrasQty[key] || 1;
    });
    setExtrasQty(next);
  }, [extras]);

  const dateInputRef = useRef();

  function handleTcChange(val) {
    setTc(val.replace(/\D/g, "").slice(0, 11));
  }
  function handlePhoneChange(val) {
    let num = val.replace(/\D/g, "");
    if (num.length > 0 && num[0] !== "0") num = "0" + num;
    setPhone(num.slice(0, 11));
  }

  useEffect(() => {
    try {
      if (!name) {
        let isim = window.localStorage.getItem("rezv_ad");
        if (!isim) isim = window.sessionStorage.getItem("rezv_ad");
        if (!isim && window.navigator.userAgent.includes("Chrome")) {
          isim = window.localStorage.getItem("ad") || "";
        }
        if (isim) setName(isim);
      }
      if (!surname) {
        let soyad = window.localStorage.getItem("rezv_soyad");
        if (!soyad) soyad = window.sessionStorage.getItem("rezv_soyad");
        if (!soyad && window.navigator.userAgent.includes("Chrome")) {
          soyad = window.localStorage.getItem("soyad") || "";
        }
        if (soyad) setSurname(soyad);
      }
      if (!phone) {
        let tel = window.localStorage.getItem("rezv_tel") || window.sessionStorage.getItem("rezv_tel");
        if (!tel && window.navigator.userAgent.includes("Chrome")) {
          tel = window.localStorage.getItem("tel") || "";
        }
        if (tel) setPhone(tel);
      }
    } catch { }
  }, []);

  useEffect(() => {
    if (showSummary) {
      window.localStorage.setItem("rezv_ad", name);
      window.localStorage.setItem("rezv_soyad", surname);
      window.localStorage.setItem("rezv_tel", phone);
    }
  }, [showSummary, name, surname, phone]);

  const isAirport = str =>
    str && typeof str === "string" && (
      str.toLowerCase().includes("havaalan") ||
      str.toLowerCase().includes("havaliman") ||
      str.toLowerCase().includes("airport")
    );
  const showPnr =
    isAirport(from) || isAirport(to) || (transfer && transfer.toLowerCase().includes("hava"));

  function handleSubmit(e) {
    e.preventDefault();
    const errors = {};
    if (!from) errors.from = "Lütfen kalkış noktası girin!";
    if (!to) errors.to = "Lütfen varış noktası girin!";
    if (!people) errors.people = "Kişi sayısı seçin!";
    if (!segment) errors.segment = "Segment seçin!";
    if (!transfer) errors.transfer = "Transfer türü seçin!";
    if (!vehicle) errors.vehicle = "Araç seçin!";
    if (!date) errors.date = "Tarih seçin!";
    if (!time) errors.time = "Saat seçin!";
    if (!name) errors.name = "Adınızı girin!";
    if (!surname) errors.surname = "Soyadınızı girin!";
    if (tc.length !== 11) errors.tc = "TC Kimlik No 11 haneli olmalı!";
    if (phone.length !== 11) errors.phone = "Telefon 11 haneli olmalı!";
    if (!mesafeliOk) errors.mesafeliOk = "Mesafeli satış onayı zorunlu!";
    if (showPnr && !pnr) errors.pnr = "PNR/Uçuş kodu zorunlu!";
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      const first = Object.keys(errors)[0];
      const el = document.querySelector(`[name='${first}']`);
      if (el) el.focus();
      return;
    }
    setShowSummary(true);
  }

  // EKSTRALAR - kategoriye göre gruplanmış, fiyat yok!
  function EkstralarAccordion({ selectedExtras, setSelectedExtras }) {
    return (
      <div className="space-y-4">
        {extrasListByCategory.map(cat => (
          <div key={cat.category}>
            <div className="font-bold text-base text-[#bfa658] mb-1">{cat.category}</div>
            <div className="flex flex-wrap gap-3">
              {cat.items.map(extra => (
                <label key={extra.key} className="flex items-center gap-2 bg-[#19160a] border border-[#bfa658] rounded-xl px-4 py-2 cursor-pointer select-none text-[#ffeec2]">
                  <input
                    type="checkbox"
                    checked={selectedExtras.includes(extra.key)}
                    onChange={e => {
                      if (e.target.checked) setSelectedExtras([...selectedExtras, extra.key]);
                      else setSelectedExtras(selectedExtras.filter(k => k !== extra.key));
                    }}
                    className="accent-[#bfa658] w-4 h-4"
                  />
                  <span>{extra.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  function AdresAutoComplete({ value, onChange, placeholder }) {
    return (
      <input
        className="input w-full py-3 px-4 rounded-xl bg-black/80 text-lg text-white focus:outline-none"
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
      />
    );
  }

  // Mesafeli Satış Popup
  function MesafeliPopup({ onClose }) {
    const [content, setContent] = useState("Yükleniyor...");
    useEffect(() => {
      fetch("/mesafeli-satis")
        .then(r => r.text())
        .then(html => {
          const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
          setContent(main ? main[1] : html);
        });
    }, []);
    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
        <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl p-8 overflow-y-auto max-h-[90vh] relative">
          <button onClick={onClose} className="absolute top-3 right-5 text-2xl font-bold text-red-500 hover:text-red-700">×</button>
          <div className="text-gray-800 prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    );
  }

  // Rezervasyon Özeti Popup
  function SummaryPopup({
    from, to, people, segment, transfer, vehicle, date, time, name, surname, tc, phone, note, extras, extrasQty, setExtrasQty, setExtras, pnr, onClose, router
  }) {
    // Tüm ekstraları düzleştir
    const allExtras = extrasListByCategory.flatMap(cat => cat.items);
    const selectedExtras = allExtras.filter(e => extras.includes(e.key));
    const basePrice = 4000; // DİNAMİK yapacaksan burada değiştir
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
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
        <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl p-8 overflow-y-auto max-h-[90vh] relative">
          <button onClick={onClose} className="absolute top-3 right-5 text-2xl font-bold text-red-500 hover:text-red-700">×</button>
          <h2 className="text-2xl font-bold mb-5 text-[#bfa658] text-center">Rezervasyon Özeti</h2>
          <div className="space-y-2 mb-5 text-black text-lg">
            <div><b>Transfer:</b> {transfer || "-"}</div>
            <div><b>Araç:</b> {vehicle || "-"}</div>
            <div><b>Kişi:</b> {people}</div>
            <div><b>Nereden:</b> {from}</div>
            <div><b>Nereye:</b> {to}</div>
            <div><b>Tarih:</b> {date} {time}</div>
            <div><b>Ad Soyad:</b> {name} {surname} – T.C.: {tc}</div>
            <div><b>Telefon:</b> {phone}</div>
            {pnr && <div><b>PNR/Uçuş Kodu:</b> {pnr}</div>}
            {note && <div><b>Ek Not:</b> {note}</div>}
          </div>
          <div className="mb-5">
            <b className="block mb-2 text-[#bfa658]">Ekstralar:</b>
            {selectedExtras.length === 0 && <span className="text-gray-600">Ekstra yok</span>}
            {selectedExtras.map(extra =>
              <div key={extra.key} className="flex items-center gap-2 py-1">
                <span className="font-semibold">{extra.label}</span>
                <button type="button" className="px-2" onClick={() => changeQty(extra.key, -1)}>-</button>
                <span className="w-8 text-center">{extrasQty[extra.key] || 1}</span>
                <button type="button" className="px-2" onClick={() => changeQty(extra.key, +1)}>+</button>
                <span className="ml-2">{extra.price}₺</span>
                <button type="button" onClick={() => removeExtra(extra.key)} className="ml-2 text-red-500 font-bold hover:underline">Çıkar</button>
              </div>
            )}
          </div>
          <div className="mb-5 space-y-1 text-right text-lg">
            <div><b>Transfer Bedeli:</b> {basePrice.toLocaleString()} ₺</div>
            <div><b>Ekstralar:</b> {extrasTotal.toLocaleString()} ₺</div>
            <div><b>KDV (%20):</b> {kdv.toLocaleString(undefined, { maximumFractionDigits: 2 })} ₺</div>
            <div className="text-xl font-extrabold"><b>Toplam:</b> {toplam.toLocaleString()} ₺</div>
          </div>
          <button
            onClick={() => {
              router.push("/odeme?success=1");
            }}
            className="w-full py-3 rounded-xl bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition text-xl"
          >Onayla ve Öde</button>
        </div>
      </div>
    );
  }

  // ---- ANA FORM ----
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-[#19160a] to-[#302811]">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-2 sm:px-6 md:px-12 py-20 bg-gradient-to-br from-black via-[#19160a] to-[#302811] my-16">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-8 text-center font-quicksand">
          VIP Rezervasyon Formu
        </h1>
        <form onSubmit={handleSubmit} autoComplete="on" className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
            <select name="people" className="input w-full"
              value={people}
              onChange={e => setPeople(Number(e.target.value))}>
              {Array.from({ length: maxPeople }, (_, i) => i + 1).map(val =>
                <option key={val} value={val}>{val}</option>
              )}
            </select>
            {fieldErrors.people && <div className="text-red-400 text-xs mt-1">{fieldErrors.people}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
            <select name="segment" className="input w-full"
              value={segment}
              onChange={e => setSegment(e.target.value)}>
              {segmentOptions.map(opt =>
                <option key={opt.key} value={opt.label}>{opt.label}</option>
              )}
            </select>
            {fieldErrors.segment && <div className="text-red-400 text-xs mt-1">{fieldErrors.segment}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Transfer Türü</label>
            <select name="transfer" className="input w-full"
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
            <label className="font-bold text-[#bfa658] mb-1 block">Araç</label>
            <select name="vehicle" className="input w-full"
              value={vehicle}
              onChange={e => setVehicle(e.target.value)}>
              <option value="">Seçiniz</option>
              {availableVehicles.map(opt =>
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              )}
            </select>
            {fieldErrors.vehicle && <div className="text-red-400 text-xs mt-1">{fieldErrors.vehicle}</div>}
          </div>
          {showPnr && (
            <div className="md:col-span-2">
              <label className="font-bold text-[#bfa658] mb-1 block">PNR / Uçuş Kodu</label>
              <input
                name="pnr"
                type="text"
                className="input w-full"
                value={pnr}
                onChange={e => setPnr(e.target.value)}
                placeholder="Uçuş Rezervasyon Kodu (PNR)"
                style={{ fontFamily: "Quicksand,sans-serif" }}
              />
              {fieldErrors.pnr && <div className="text-red-400 text-xs mt-1">{fieldErrors.pnr}</div>}
            </div>
          )}
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Tarih</label>
            <input
              name="date"
              type="date"
              className="input w-full"
              value={typeof date === "string" ? date : ""}
              ref={dateInputRef}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              autoComplete="on"
              style={{ fontFamily: "Quicksand,sans-serif" }}
            />
            {fieldErrors.date && <div className="text-red-400 text-xs mt-1">{fieldErrors.date}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
            <select name="time" className="input w-full"
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
              className="input w-full"
              value={name}
              onChange={e => setName(e.target.value)}
              autoComplete="given-name"
              style={{ fontFamily: "Quicksand,sans-serif" }}
            />
            {fieldErrors.name && <div className="text-red-400 text-xs mt-1">{fieldErrors.name}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Soyad</label>
            <input
              name="surname"
              type="text"
              className="input w-full"
              value={surname}
              onChange={e => setSurname(e.target.value)}
              autoComplete="family-name"
              style={{ fontFamily: "Quicksand,sans-serif" }}
            />
            {fieldErrors.surname && <div className="text-red-400 text-xs mt-1">{fieldErrors.surname}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">T.C. Kimlik No</label>
            <input
              name="tc"
              type="text"
              className="input w-full"
              maxLength={11}
              pattern="[0-9]*"
              value={tc}
              onChange={e => handleTcChange(e.target.value)}
              autoComplete="off"
              style={{ fontFamily: "Quicksand,sans-serif" }}
            />
            {fieldErrors.tc && <div className="text-red-400 text-xs mt-1">{fieldErrors.tc}</div>}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Telefon</label>
            <input
              name="phone"
              type="text"
              className="input w-full"
              maxLength={11}
              pattern="[0-9]*"
              value={phone}
              onChange={e => handlePhoneChange(e.target.value)}
              autoComplete="tel"
              style={{ fontFamily: "Quicksand,sans-serif" }}
            />
            {fieldErrors.phone && <div className="text-red-400 text-xs mt-1">{fieldErrors.phone}</div>}
          </div>
          <div className="md:col-span-2">
            <label className="font-bold text-[#bfa658] mb-1 block">Ek Not</label>
            <textarea
              className="input w-full"
              rows={2}
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Eklemek istediğiniz bir not var mı?"
              style={{ fontFamily: "Quicksand,sans-serif" }}
            />
          </div>
          <div className="md:col-span-2">
            <label className="font-bold text-[#bfa658] mb-2 block text-lg">Ekstralar</label>
            <EkstralarAccordion selectedExtras={extras} setSelectedExtras={setExtras} />
          </div>
          <div className="md:col-span-2 flex items-center mt-3">
            <input
              name="mesafeliOk"
              type="checkbox"
              checked={mesafeliOk}
              onChange={e => setMesafeliOk(e.target.checked)}
              className="mr-2"
              id="mesafeliBox"
            />
            <label htmlFor="mesafeliBox" className="text-sm text-gray-200">
              <button type="button" className="underline text-[#bfa658]" onClick={e => { e.preventDefault(); setShowContract(true); }}>
                Mesafeli Satış Sözleşmesini
              </button> okudum ve onaylıyorum.
            </label>
            {fieldErrors.mesafeliOk && <div className="text-red-400 text-xs ml-4">{fieldErrors.mesafeliOk}</div>}
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit"
              className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-12 rounded-xl text-xl shadow hover:scale-105 transition">
              Rezervasyonu Tamamla
            </button>
          </div>
        </form>
        {showContract && <MesafeliPopup onClose={() => setShowContract(false)} />}
        {showSummary && (
          <SummaryPopup
            from={from}
            to={to}
            people={people}
            segment={segment}
            transfer={transfer}
            vehicle={vehicle}
            date={date}
            time={time}
            name={name}
            surname={surname}
            tc={tc}
            phone={phone}
            note={note}
            extras={extras}
            extrasQty={extrasQty}
            setExtrasQty={setExtrasQty}
            setExtras={setExtras}
            pnr={pnr}
            onClose={() => setShowSummary(false)}
            router={router}
          />
        )}
      </section>
    </div>
  );
}
