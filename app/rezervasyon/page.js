"use client";
import { useState } from "react";

const sehirler = [
  "İstanbul", "Ankara", "İzmir", "Antalya", "Bodrum", "Trabzon",
  "Sabiha Gökçen Havalimanı", "İstanbul Havalimanı", "Esenboğa Havalimanı"
];

const aracTipleri = [
  "Ekonomik", "Standart", "Lüks", "Premium Elite", "Premium +++", "Dron Transferi", "Diğer"
];

const yolcuSayilari = Array.from({ length: 10 }, (_, i) => (i + 1).toString()).concat("Diğer");

export default function Rezervasyon() {
  const [nereden, setNereden] = useState("");
  const [nereye, setNereye] = useState("");
  const [tarih, setTarih] = useState("");
  const [saat, setSaat] = useState("");
  const [arac, setArac] = useState(aracTipleri[0]);
  const [kisi, setKisi] = useState("1");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [not, setNot] = useState("");

  // Filtreleme/autocomplete
  const filterLoc = (input) =>
    !input
      ? []
      : sehirler.filter((opt) => opt.toLowerCase().includes(input.toLowerCase()));

  const [neredenOpts, setNeredenOpts] = useState([]);
  const [nereyeOpts, setNereyeOpts] = useState([]);

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gold mb-6 text-center">Transfer Rezervasyon Formu</h1>
      <form className="bg-black/70 rounded-xl shadow-lg p-7 flex flex-col gap-5" onSubmit={e => e.preventDefault()}>
        {/* Nereden */}
        <div>
          <label className="text-gray-200 font-semibold">Nereden</label>
          <input
            className="mt-1 w-full p-3 rounded-lg bg-gray-900/90 text-gold border border-gold/30 focus:outline-none"
            placeholder="Şehir / Havalimanı yazın"
            value={nereden}
            onChange={e => {
              setNereden(e.target.value);
              setNeredenOpts(filterLoc(e.target.value));
            }}
            list="nereden-list"
            required
          />
          <datalist id="nereden-list">
            {neredenOpts.map(opt => <option key={opt}>{opt}</option>)}
          </datalist>
        </div>
        {/* Nereye */}
        <div>
          <label className="text-gray-200 font-semibold">Nereye</label>
          <input
            className="mt-1 w-full p-3 rounded-lg bg-gray-900/90 text-gold border border-gold/30 focus:outline-none"
            placeholder="Şehir / Havalimanı yazın"
            value={nereye}
            onChange={e => {
              setNereye(e.target.value);
              setNereyeOpts(filterLoc(e.target.value));
            }}
            list="nereye-list"
            required
          />
          <datalist id="nereye-list">
            {nereyeOpts.map(opt => <option key={opt}>{opt}</option>)}
          </datalist>
        </div>
        {/* Tarih - Saat */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-gray-200 font-semibold">Tarih</label>
            <input
              type="date"
              className="mt-1 w-full p-3 rounded-lg bg-gray-900/90 text-gold border border-gold/30 focus:outline-none"
              value={tarih}
              onChange={e => setTarih(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className="text-gray-200 font-semibold">Saat</label>
            <input
              type="time"
              className="mt-1 w-full p-3 rounded-lg bg-gray-900/90 text-gold border border-gold/30 focus:outline-none"
              value={saat}
              onChange={e => setSaat(e.target.value)}
              required
            />
          </div>
        </div>
        {/* Araç Tipi - Kişi */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-gray-200 font-semibold">Araç Tipi</label>
            <select
              className="mt-1 w-full p-3 rounded-lg bg-gray-900/90 text-gold border border-gold/30 focus:outline-none"
              value={arac}
              onChange={e => setArac(e.target.value)}
            >
              {aracTipleri.map(tip => (
                <option key={tip}>{tip}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="text-gray-200 font-semibold">Kişi Sayısı</label>
            <select
              className="mt-1 w-full p-3 rounded-lg bg-gray-900/90 text-gold border border-gold/30 focus:outline-none"
              value={kisi}
              onChange={e => setKisi(e.target.value)}
            >
              {yolcuSayilari.map(sayi => (
                <option key={sayi}>{sayi}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Email - Telefon */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-gray-200 font-semibold">E-Posta</label>
            <input
              type="email"
              className="mt-1 w-full p-3 rounded-lg bg-gray-900/90 text-gold border border-gold/30 focus:outline-none"
              placeholder="E-Posta adresiniz"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className="text-gray-200 font-semibold">Telefon</label>
            <input
              type="tel"
              className="mt-1 w-full p-3 rounded-lg bg-gray-900/90 text-gold border border-gold/30 focus:outline-none"
              placeholder="05xxxxxxxxx"
              value={telefon}
              onChange={e => setTelefon(e.target.value)}
              required
            />
          </div>
        </div>
        {/* Not */}
        <div>
          <label className="text-gray-200 font-semibold">Ekstra Not (isteğe bağlı)</label>
          <textarea
            className="mt-1 w-full p-3 rounded-lg bg-gray-900/90 text-gold border border-gold/30 focus:outline-none"
            rows={2}
            placeholder="Özel istek/ek bilgi"
            value={not}
            onChange={e => setNot(e.target.value)}
          />
        </div>
        <button className="mt-3 bg-gold text-black font-semibold py-3 rounded-xl text-lg shadow hover:bg-yellow-400 transition">
          Rezervasyon Yap
        </button>
      </form>
    </main>
  );
}
