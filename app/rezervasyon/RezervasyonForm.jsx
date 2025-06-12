"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { vehicles } from "../../data/vehicles";
import { extrasList } from "../../data/extras";

const segments = [
  { key: "ekonomik", label: "Ekonomik" },
  { key: "lux", label: "Lüks" },
  { key: "prime", label: "Prime+" }
];

const transferTypes = {
  ekonomik: [
    "Şehirlerarası Transfer",
    "Kurumsal & Toplu Transfer",
    "Tur & Gezi Transferi"
  ],
  lux: [
    "VIP Havalimanı Transferi",
    "Şehirlerarası Transfer",
    "Tur & Gezi Transferi",
    "Kurumsal & Toplu Transfer"
  ],
  prime: [
    "VIP Havalimanı Transferi",
    "Şehirlerarası Transfer",
    "Kurumsal & Toplu Transfer",
    "Tur & Gezi Transferi",
    "Düğün & Özel Etkinlik Transferi",
    "Drone Yolcu Transferi"
  ]
};

// Lokasyon verisi
const useLocationData = () => {
  const [airports, setAirports] = useState([]);
  const [iller, setIller] = useState([]);
  const [ilceler, setIlceler] = useState([]);
  const [mahalleler, setMahalleler] = useState([]);
  useEffect(() => {
    fetch("/dumps/airports.json").then(r => r.json()).then(setAirports);
    fetch("/dumps/iller.metadata.json").then(r => r.json()).then(setIller);
    fetch("/dumps/ilceler.metadata.json").then(r => r.json()).then(setIlceler);
    fetch("/dumps/mahalleler.metadata.json").then(r => r.json()).then(setMahalleler);
  }, []);
  return { airports, iller, ilceler, mahalleler };
};

// Havalimanı olup olmadığını kontrol et
function needsPnr(from, to) {
  const lower = [from, to].join(" ").toLocaleLowerCase("tr-TR");
  return lower.includes("havalimanı") || lower.includes("airport");
}

export default function RezervasyonForm() {
  // 1. URL parametrelerini oku
  const params = useSearchParams();
  const initialFrom = params.get("from") || "";
  const initialTo = params.get("to") || "";
  const initialDate = params.get("date") || "";
  const initialTime = params.get("time") || "";
  const initialVehicle = params.get("vehicle") || "";
  const initialPeople = Number(params.get("people")) || 1;

  // Lokasyon verisi
  const { airports, iller, ilceler, mahalleler } = useLocationData();

  // State'ler — başlangıç değerleri URL parametresinden
  const [segment, setSegment] = useState("ekonomik");
  const [transfer, setTransfer] = useState("");
  const [vehicle, setVehicle] = useState(initialVehicle);
  const [people, setPeople] = useState(initialPeople);
  const [extras, setExtras] = useState([]);
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [fromSug, setFromSug] = useState([]);
  const [toSug, setToSug] = useState([]);
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [tc, setTc] = useState("");
  const [phone, setPhone] = useState("");
  const [pnr, setPnr] = useState("");
  const [showSummary, setShowSummary] = useState(false);

  // Transfer ve araç seçenekleri zinciri
  const availableTransfers = transferTypes[segment] || [];

  // DÜZELTME: Araçları, segment seçilince getir, transfer tipi seçilirse ona göre daralt
  const availableVehicles = vehicles.filter(v => {
    if (transfer) {
      return v.segment?.toLowerCase() === segment && (v.transferTypes || []).includes(transfer);
    } else {
      return v.segment?.toLowerCase() === segment;
    }
  });

  // Kişi sayısı ve ekstralar
  const vehicleObj = availableVehicles.find(v => v.value === vehicle) || vehicles.find(v => v.value === vehicle);
  const maxPeople = vehicleObj?.max || 1;
  const availableExtras = vehicleObj?.extras || [];

  // Fiyat hesaplama
  const basePrice = vehicleObj?.price || 1500;
  const extrasPrice = extrasList.filter(e => extras.includes(e.key)).reduce((sum, e) => sum + (e.price || 0), 0);
  const totalPrice = basePrice + extrasPrice;

  // Autocomplete
  const allLocations = [
    ...(Array.isArray(airports) ? airports.map(a => a.name) : []),
    ...(Array.isArray(iller) ? iller.map(i => i.name) : []),
    ...(Array.isArray(ilceler) ? ilceler.map(i => i.name) : []),
    ...(Array.isArray(mahalleler) ? mahalleler.map(i => i.name) : [])
  ];
  const getSuggestions = v =>
    !v ? [] : allLocations.filter(l => l?.toLowerCase().includes(v.toLowerCase())).slice(0, 10);

  useEffect(() => { setFromSug(getSuggestions(from)); }, [from, airports, iller, ilceler, mahalleler]);
  useEffect(() => { setToSug(getSuggestions(to)); }, [to, airports, iller, ilceler, mahalleler]);

  // Zincir reset
  useEffect(() => { setTransfer(""); setVehicle(""); setPeople(1); setExtras([]); }, [segment]);
  useEffect(() => { setVehicle(""); setPeople(1); setExtras([]); }, [transfer]);
  useEffect(() => { setPeople(1); setExtras([]); }, [vehicle]);

  // Doğrulama
  const validate = () => {
    if (!from || !to || !date || !time || !name || !surname || !tc || !phone) return false;
    if (needsPnr(from, to) && !pnr) return false;
    if (!vehicle) return false;
    return true;
  };

  // Özet Pop-up
  const Summary = () => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 relative">
        <button onClick={() => setShowSummary(false)} className="absolute top-2 right-4 text-2xl font-bold text-red-500 hover:text-red-700">×</button>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Rezervasyon Özeti</h2>
        <div className="mb-2 space-y-1 text-black text-base">
          <div><b>Transfer:</b> {transfer}</div>
          <div><b>Araç:</b> {vehicleObj?.label}</div>
          <div><b>Kişi:</b> {people}</div>
          <div><b>Nereden:</b> {from}</div>
          <div><b>Nereye:</b> {to}</div>
          <div><b>Tarih:</b> {date} {time}</div>
          <div><b>Ad Soyad:</b> {name} {surname} – T.C.: {tc}</div>
          <div><b>Telefon:</b> {phone}</div>
          {needsPnr(from, to) && (
            <div><b>PNR/Uçuş No:</b> {pnr}</div>
          )}
          <div><b>Ekstralar:</b> {extrasList.filter(e => extras.includes(e.key)).map(e => e.label).join(", ") || "Yok"}</div>
        </div>
        <div className="text-xl font-bold text-right my-4">Toplam: <span className="text-green-700">{totalPrice}₺</span></div>
        <button
          onClick={() => alert("Demo: Ödeme sayfasına yönlendirme yapılacak! (Burada gerçek ödeme API'si bağlanır.)")}
          className="w-full py-3 rounded-xl bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition"
        >Onayla ve Öde</button>
      </div>
    </div>
  );

  // Submit
  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return alert("Lütfen eksiksiz doldurun!");
    setShowSummary(true);
    // Burada gerçek bir API çağrısı ile kaydı admin paneline POST edebilirsin.
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="w-full max-w-4xl p-6 md:p-10 rounded-3xl shadow-2xl bg-[#181818] border border-yellow-700">
        <h1 className="text-3xl font-bold mb-8 text-center text-yellow-400">VIP Rezervasyon Formu</h1>
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={handleSubmit}>
          {/* ... (formun geri kalanı olduğu gibi senin kodunla aynı) ... */}
          {/* KODUNUN BURADAN SONRASINI BİREBİR KOYABİLİRSİN */}
          {/* yukarıda tüm state'ler başlangıçta URL'den gelir */}
          {/* ... */}
          {/* (yukarıda kalan kısımları copy-paste ederek devam edebilirsin) */}
        </form>
        {showSummary && <Summary />}
      </div>
    </div>
  );
}
