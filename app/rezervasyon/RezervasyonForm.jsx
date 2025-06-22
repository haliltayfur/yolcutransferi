"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { vehicles } from "../../data/vehicles";
import { extrasList } from "../../data/extras";

// Adres verisini çek
const useAddressData = () => {
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    fetch("/dumps/adresler.json")
      .then(r => r.json())
      .then(setAddresses);
  }, []);
  return addresses;
};

const normalize = s =>
  s
    .toLocaleLowerCase("tr-TR")
    .replace(/[çÇ]/g, "c")
    .replace(/[ğĞ]/g, "g")
    .replace(/[ıİ]/g, "i")
    .replace(/[öÖ]/g, "o")
    .replace(/[şŞ]/g, "s")
    .replace(/[üÜ]/g, "u")
    .replace(/[\s\-\.]/g, "");

// Sadece 20 öneri gelsin
function getSuggestions(q, addressList) {
  if (!q || q.length < 2) return [];
  const nq = normalize(q);
  return addressList
    .filter(item =>
      (item.il && normalize(item.il).includes(nq)) ||
      (item.ilce && normalize(item.ilce).includes(nq)) ||
      (item.semt && normalize(item.semt).includes(nq)) ||
      (item.mahalle && normalize(item.mahalle).includes(nq)) ||
      (item.ad && normalize(item.ad).includes(nq))
    )
    .slice(0, 20)
    .map(item => {
      if (item.tip === "il") return item.il;
      if (item.tip === "ilce") return `${item.il} / ${item.ilce}`;
      if (item.tip === "semt") return `${item.il} / ${item.ilce} / ${item.semt}`;
      if (item.tip === "mahalle")
        return `${item.il} / ${item.ilce} / ${item.semt ? item.semt + " / " : ""}${item.mahalle}`;
      if (item.tip === "havalimani") return item.ad;
      return "";
    });
}

// Saatler
const saatler = [];
for (let h = 0; h < 24; ++h)
  for (let m of [0, 15, 30, 45])
    saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);

export default function RezervasyonForm() {
  const params = useSearchParams();
  const paramFrom = params.get("from") || "";
  const paramTo = params.get("to") || "";
  const paramDate = params.get("date") || "";
  const paramTime = params.get("time") || "";
  const paramVehicle = params.get("vehicle") || "";
  const paramPeople = Number(params.get("people")) || 1;

  const addressList = useAddressData();

  const [from, setFrom] = useState(paramFrom);
  const [to, setTo] = useState(paramTo);
  const [fromSug, setFromSug] = useState([]);
  const [toSug, setToSug] = useState([]);
  const [fromFocused, setFromFocused] = useState(false);
  const [toFocused, setToFocused] = useState(false);
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

  // Autocomplete (dinamik)
  useEffect(() => { setFromSug(getSuggestions(from, addressList)); }, [from, addressList]);
  useEffect(() => { setToSug(getSuggestions(to, addressList)); }, [to, addressList]);

  const segmentOptions = [
    { key: "ekonomik", label: "Ekonomik" },
    { key: "lux", label: "Lüks" },
    { key: "prime", label: "Prime+" }
  ];
  const transferTypes = {
    ekonomik: ["Şehirlerarası Transfer", "Kurumsal & Toplu Transfer", "Tur & Gezi Transferi"],
    lux: ["VIP Havalimanı Transferi", "Şehirlerarası Transfer", "Tur & Gezi Transferi", "Kurumsal & Toplu Transfer"],
    prime: [
      "VIP Havalimanı Transferi", "Şehirlerarası Transfer", "Kurumsal & Toplu Transfer",
      "Tur & Gezi Transferi", "Düğün & Özel Etkinlik Transferi", "Drone Yolcu Transferi"
    ]
  };
  const availableTransfers = transferTypes[segment] || [];
  const availableVehicles = vehicles.filter(v =>
    (!transfer || v.transferTypes?.includes(transfer)) &&
    (!segment || v.segment?.toLowerCase() === segment) &&
    (!people || (v.max || 1) >= people)
  );
  const maxPeople = Math.max(...availableVehicles.map(v => v.max || 1), 10);

  const availableExtras = extrasList.map(e => ({
    ...e,
    disabled: vehicle && !vehicles.find(v => v.value === vehicle)?.extras?.includes(e.key)
  }));

  const dateInputRef = useRef();
  const openDate = () => dateInputRef.current && dateInputRef.current.showPicker();

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
          {/* Nereden */}
          <div className="relative">
            <label className="font-bold text-[#bfa658] mb-1 block">Nereden?</label>
            <input
              type="text"
              placeholder="İl / İlçe / Semt / Mahalle / Havalimanı"
              className="input w-full"
              value={from}
              onChange={e => setFrom(e.target.value)}
              onFocus={() => setFromFocused(true)}
              onBlur={() => setTimeout(() => setFromFocused(false), 150)}
              autoComplete="on"
              style={{ fontFamily: "Quicksand,sans-serif" }}
            />
            {fromFocused && fromSug.length > 0 && (
              <ul className="absolute left-0 right-0 mt-1 bg-white text-black rounded-xl shadow-lg z-50 max-h-60 overflow-auto border border-[#bfa658]">
                {fromSug.map((s, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 cursor-pointer hover:bg-yellow-100"
                    onMouseDown={() => { setFrom(s); setFromSug([]); }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Nereye */}
          <div className="relative">
            <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
            <input
              type="text"
              placeholder="İl / İlçe / Semt / Mahalle / Havalimanı"
              className="input w-full"
              value={to}
              onChange={e => setTo(e.target.value)}
              onFocus={() => setToFocused(true)}
              onBlur={() => setTimeout(() => setToFocused(false), 150)}
              autoComplete="on"
              style={{ fontFamily: "Quicksand,sans-serif" }}
            />
            {toFocused && toSug.length > 0 && (
              <ul className="absolute left-0 right-0 mt-1 bg-white text-black rounded-xl shadow-lg z-50 max-h-60 overflow-auto border border-[#bfa658]">
                {toSug.map((s, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 cursor-pointer hover:bg-yellow-100"
                    onMouseDown={() => { setTo(s); setToSug([]); }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Diğer alanlar aynı şekilde devam */}
          {/* Kişi, Segment, Transfer, Araç, Tarih, Saat, Ad, Soyad, TC, Tel, Ek Not, Ekstralar, Mesafeli Sözleşme, Butonlar */}
          {/* ... kodun kalanını yukarıdaki gibi ekleyebilirsin ... */}
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
