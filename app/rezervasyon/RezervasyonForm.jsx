"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { vehicles } from "../../data/vehicles";
import { extrasList } from "../../data/extras";

// Adres otomasyonu — il, ilçe, mahalle, sokak, havalimanı
const useAddressData = () => {
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    Promise.all([
      fetch("/dumps/adresler.json").then(r => r.json()),
      fetch("/dumps/airports.json").then(r => r.json())
    ]).then(([adresler, havalimanlari]) => {
      const adresList = adresler.map(obj =>
        [obj.il, obj.ilce, obj.mahalle, obj.sokak].filter(Boolean).join(" / ")
      );
      const airportList = havalimanlari.map(a => a.name);
      setAddresses([...new Set([...adresList, ...airportList])]);
    });
  }, []);
  return addresses;
};

const normalize = s =>
  s.toLocaleLowerCase("tr-TR").replace(/[çÇ]/g,"c").replace(/[ğĞ]/g,"g")
  .replace(/[ıİ]/g,"i").replace(/[öÖ]/g,"o").replace(/[şŞ]/g,"s")
  .replace(/[üÜ]/g,"u").replace(/[\s\-\.]/g,"");

function getSuggestions(q, addressList) {
  if (!q || q.length < 2) return [];
  const nq = normalize(q);
  return addressList.filter(item => normalize(item).includes(nq)).slice(0, 8);
}

// Saatler — sadece .00, .15, .30, .45
const saatler = [];
for (let h = 0; h < 24; ++h) for (let m of [0,15,30,45])
  saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);

export default function RezervasyonForm() {
  // Parametrelerden değer oku
  const params = useSearchParams();
  const paramFrom = params.get("from") || "";
  const paramTo = params.get("to") || "";
  const paramDate = params.get("date") || "";
  const paramTime = params.get("time") || "";
  const paramVehicle = params.get("vehicle") || "";
  const paramPeople = Number(params.get("people")) || 1;

  // State'ler
  const [from, setFrom] = useState(paramFrom);
  const [to, setTo] = useState(paramTo);
  const [fromSug, setFromSug] = useState([]);
  const [toSug, setToSug] = useState([]);
  const [people, setPeople] = useState(paramPeople);
  const [segment, setSegment] = useState("ekonomik");
  const [transfer, setTransfer] = useState("");
  const [vehicle, setVehicle] = useState(paramVehicle);
  const [date, setDate] = useState(paramDate);
  const [time, setTime] = useState(paramTime);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [tc, setTc] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [extras, setExtras] = useState([]);
  const [mesafeliOk, setMesafeliOk] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showContract, setShowContract] = useState(false);

  // Adres autocomplete
  const addressList = useAddressData();
  useEffect(() => { setFromSug(getSuggestions(from, addressList)); }, [from, addressList]);
  useEffect(() => { setToSug(getSuggestions(to, addressList)); }, [to, addressList]);

  // Segment ve transferler
  const segmentOptions = [
    { key: "ekonomik", label: "Ekonomik" },
    { key: "lux", label: "Lüks" },
    { key: "prime", label: "Prime+" }
  ];
  const transferTypes = {
    ekonomik: ["Şehirlerarası Transfer", "Kurumsal & Toplu Transfer", "Tur & Gezi Transferi"],
    lux: ["VIP Havalimanı Transferi", "Şehirlerarası Transfer", "Tur & Gezi Transferi", "Kurumsal & Toplu Transfer"],
    prime: ["VIP Havalimanı Transferi", "Şehirlerarası Transfer", "Kurumsal & Toplu Transfer", "Tur & Gezi Transferi", "Düğün & Özel Etkinlik Transferi", "Drone Yolcu Transferi"]
  };
  const availableTransfers = transferTypes[segment] || [];
  const availableVehicles = vehicles.filter(v =>
    (!transfer || v.transferTypes?.includes(transfer)) &&
    (!segment || v.segment?.toLowerCase() === segment) &&
    (!people || (v.max || 1) >= people)
  );
  const maxPeople = Math.max(...availableVehicles.map(v => v.max || 1), 10);

  // Ekstralar
  const availableExtras = extrasList.map(e => ({
    ...e,
    disabled: vehicle && !vehicles.find(v => v.value === vehicle)?.extras?.includes(e.key)
  }));

  // Date picker — tıklayınca açılır
  const dateInputRef = useRef();
  const openDate = () => dateInputRef.current && dateInputRef.current.showPicker();

  // TC/Telefon validation
  function handleTcChange(val) {
    setTc(val.replace(/\D/g, "").slice(0, 11));
  }
  function handlePhoneChange(val) {
    let num = val.replace(/\D/g, "");
    if (num.length > 0 && num[0] !== "0") num = "0" + num;
    setPhone(num.slice(0, 11));
  }

  // Otomatik ad/soyad/tel için browser autofill ve localstorage önerileri
  useEffect(() => {
    try {
      const s = window.localStorage.getItem("rezv_adsoyad");
      if (s) {
        const [n, sn] = s.split(" ");
        if (!name) setName(n || "");
        if (!surname) setSurname(sn || "");
      }
      const tel = window.localStorage.getItem("rezv_tel");
      if (tel && !phone) setPhone(tel);
    } catch {}
  }, []);

  useEffect(() => {
    if (showSummary) {
      window.localStorage.setItem("rezv_adsoyad", `${name} ${surname}`);
      window.localStorage.setItem("rezv_tel", phone);
    }
  }, [showSummary]);

  // Form gönder
  function handleSubmit(e) {
    e.preventDefault();
    if (!from || !to || !date || !time || !vehicle || !name || !surname || tc.length !== 11 || phone.length !== 11 || !mesafeliOk) {
      alert("Lütfen tüm alanları eksiksiz ve doğru doldurun!");
      return;
    }
    setShowSummary(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-[#19160a] to-[#302811]">
      <section className="w-full max-w-2xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] my-16">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-8 text-center font-quicksand">
          VIP Rezervasyon Formu
        </h1>
        <form onSubmit={handleSubmit} autoComplete="on" className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Nereden/Nereye */}
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereden?</label>
            <input
              type="text"
              placeholder="İl / İlçe / Mahalle / Havalimanı"
              className="input w-full"
              value={from}
              onChange={e => setFrom(e.target.value)}
              onFocus={() => setFromSug(getSuggestions(from, addressList))}
              autoComplete="on"
              style={{ fontFamily: "Quicksand,sans-serif" }}
            />
            {fromSug.length > 0 && (
              <ul className="bg-white border mt-1 rounded shadow absolute z-50 w-[97%] text-black max-h-60 overflow-auto">
                {fromSug.map((t, i) => (
                  <li key={i}
                      className="px-3 py-2 hover:bg-yellow-50 cursor-pointer"
                      onClick={() => { setFrom(t); setFromSug([]); }}>
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
            <input
              type="text"
              placeholder="İl / İlçe / Mahalle / Havalimanı"
              className="input w-full"
              value={to}
              onChange={e => setTo(e.target.value)}
              onFocus={() => setToSug(getSuggestions(to, addressList))}
              autoComplete="on"
              style={{ fontFamily: "Quicksand,sans-serif" }}
            />
            {toSug.length > 0 && (
              <ul className="bg-white border mt-1 rounded shadow absolute z-50 w-[97%] text-black max-h-60 overflow-auto">
                {toSug.map((t, i) => (
                  <li key={i}
                      className="px-3 py-2 hover:bg-yellow-50 cursor-pointer"
                      onClick={() => { setTo(t); setToSug([]); }}>
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Kişi ve Segment */}
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Kişi Sayısı</label>
            <select className="input w-full"
                    value={people}
                    onChange={e => setPeople(Number(e.target.value))}>
              {Array.from({length: maxPeople}, (_,i)=>i+1).map(val =>
                <option key={val} value={val}>{val}</option>
              )}
            </select>
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
            <select className="input w-full"
                    value={segment}
                    onChange={e => setSegment(e.target.value)}>
              {segmentOptions.map(opt =>
                <option key={opt.key} value={opt.key}>{opt.label}</option>
              )}
            </select>
          </div>
          {/* Transfer ve Araç */}
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Transfer Türü</label>
            <select className="input w-full"
                    value={transfer}
                    onChange={e => setTransfer(e.target.value)}>
              <option value="">Seçiniz</option>
              {availableTransfers.map(opt =>
                <option key={opt} value={opt}>{opt}</option>
              )}
            </select>
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Araç</label>
            <select className="input w-full"
                    value={vehicle}
                    onChange={e => setVehicle(e.target.value)}>
              <option value="">Seçiniz</option>
              {availableVehicles.map(opt =>
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              )}
            </select>
          </div>
          {/* Tarih ve Saat */}
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Tarih</label>
            <input
              type="date"
              className="input w-full"
              value={date}
              ref={dateInputRef}
              onFocus={openDate}
              onClick={openDate}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              autoComplete="on"
              style={{ fontFamily: "Quicksand,sans-serif" }}
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
            <select className="input w-full"
                    value={time}
                    onChange={e => setTime(e.target.value)}>
              <option value="">Seçiniz</option>
              {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
            </select>
          </div>
          {/* Ad Soyad */}
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Ad</label>
            <input
              type="text"
              className="input w-full"
              value={name}
              onChange={e => setName(e.target.value)}
              autoComplete="given-name"
              style={{ fontFamily: "Quicksand,sans-serif" }}
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Soyad</label>
            <input
              type="text"
              className="input w-full"
              value={surname}
              onChange={e => setSurname(e.target.value)}
              autoComplete="family-name"
              style={{ fontFamily: "Quicksand,sans-serif" }}
            />
          </div>
          {/* TC ve Telefon */}
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">T.C. Kimlik No</label>
            <input
              type="text"
              className="input w-full"
              maxLength={11}
              pattern="[0-9]*"
              value={tc}
              onChange={e => handleTcChange(e.target.value)}
              autoComplete="off"
              style={{ fontFamily: "Quicksand,sans-serif" }}
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Telefon</label>
            <input
              type="text"
              className="input w-full"
              maxLength={11}
              pattern="[0-9]*"
              value={phone}
              onChange={e => handlePhoneChange(e.target.value)}
              autoComplete="tel"
              style={{ fontFamily: "Quicksand,sans-serif" }}
            />
          </div>
          {/* Ek Not */}
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
          {/* Ekstralar */}
          <div className="md:col-span-2">
            <label className="font-bold text-[#bfa658] mb-1 block">Ekstralar</label>
            <div className="flex flex-wrap gap-3">
              {availableExtras.map(extra =>
                <label key={extra.key} className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-black/80 border ${extra.disabled ? "border-gray-500 text-gray-500" : "border-yellow-700"} cursor-pointer`}>
                  <input
                    type="checkbox"
                    disabled={extra.disabled}
                    checked={extras.includes(extra.key)}
                    onChange={e => {
                      if (e.target.checked)
                        setExtras([...extras, extra.key]);
                      else
                        setExtras(extras.filter(k => k !== extra.key));
                    }}
                  />
                  {extra.label} {extra.price ? `(+${extra.price}₺)` : ""}
                </label>
              )}
            </div>
          </div>
          {/* Mesafeli Satış */}
          <div className="md:col-span-2 flex items-center mt-3">
            <input
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
          </div>
          {/* Buton */}
          <div className="md:col-span-2 flex justify-end">
            <button type="submit"
                    className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-12 rounded-xl text-xl shadow hover:scale-105 transition">
              Rezervasyonu Tamamla
            </button>
          </div>
        </form>
        {/* Pop-up'lar */}
        {showContract && (
          <MesafeliPopup onClose={() => setShowContract(false)} />
        )}
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
            onClose={() => setShowSummary(false)}
          />
        )}
      </section>
    </div>
  );
}

// Mesafeli popup (canlıdan çeker, header/footer yok, modal)
function MesafeliPopup({ onClose }) {
  const [content, setContent] = useState("Yükleniyor...");
  useEffect(() => {
    fetch("/mesafeli-satis")
      .then(r => r.text())
      .then(html => {
        // Sadece içerik kısmını çek, header/footer'ı atla (örnek olarak <main> içini al)
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

// Sipariş Özeti Pop-up
function SummaryPopup({ from, to, people, segment, transfer, vehicle, date, time, name, surname, tc, phone, note, extras, onClose }) {
  // Burada fiyatlandırma/ekstra dinamiklerini ekleyebilirsin
  // Kişi isterse burada "Öde" adımına ilerler.
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl p-8 overflow-y-auto max-h-[90vh] relative">
        <button onClick={onClose} className="absolute top-3 right-5 text-2xl font-bold text-red-500 hover:text-red-700">×</button>
        <h2 className="text-2xl font-bold mb-5 text-[#bfa658] text-center">Rezervasyon Özeti</h2>
        <div className="text-black space-y-2">
          <div><b>Transfer:</b> {transfer || "-"}</div>
          <div><b>Araç:</b> {vehicle || "-"}</div>
          <div><b>Kişi:</b> {people}</div>
          <div><b>Nereden:</b> {from}</div>
          <div><b>Nereye:</b> {to}</div>
          <div><b>Tarih:</b> {date} {time}</div>
          <div><b>Ad Soyad:</b> {name} {surname} – T.C.: {tc}</div>
          <div><b>Telefon:</b> {phone}</div>
          {note && <div><b>Ek Not:</b> {note}</div>}
          <div><b>Ekstralar:</b> {extras.length > 0 ? extras.join(", ") : "Yok"}</div>
        </div>
        <button
          onClick={() => { alert("Demo: Ödeme sayfasına yönlendirme yapılacak!"); onClose(); }}
          className="w-full py-3 rounded-xl bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition mt-6"
        >Onayla ve Öde</button>
      </div>
    </div>
  );
}
