"use client";
import { useState, useEffect } from "react";
import HeroSlider from "../components/HeroSlider";
import ExtrasSelector from "../components/ExtrasSelector";
import RezSummaryPopup from "../components/RezSummaryPopup";

import { vehicles } from "../data/vehicleList";
import { advantages } from "../data/advantages";
import { extrasList } from "../data/extras";
import { rotarList } from "../data/rotarOptions";
import { fakeFirms } from "../data/fakeFirms";
import { testimonials } from "../data/testimonials";
import { whyUsCards } from "../data/whyUs";

// --- Yorumlar responsive için ---
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

export default function Home() {
  // --- Form State'leri ---
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0].value);
  const [personCount, setPersonCount] = useState(1);
  const [extras, setExtras] = useState([]);
  const [rotar, setRotar] = useState(rotarList[0].hours);

  // --- Rezervasyon Özeti ve popup ---
  const [showSummary, setShowSummary] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

  // --- Yorumlar için slider state ---
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex(idx => (isMobile ? (idx + 1) % testimonials.length : (idx + 3) % testimonials.length));
    }, 10000);
    return () => clearInterval(interval);
  }, [isMobile, testimonialIndex]);

  const selectedVehicleObj = vehicles.find(v => v.value === selectedVehicle) || vehicles[0];
  const maxPerson = selectedVehicleObj.max;

  // --- Yorumlar visible kısmı ---
  const getVisibleTestimonials = () => {
    if (isMobile) return [testimonials[testimonialIndex % testimonials.length]];
    return [
      testimonials[testimonialIndex % testimonials.length],
      testimonials[(testimonialIndex + 1) % testimonials.length],
      testimonials[(testimonialIndex + 2) % testimonials.length],
    ];
  };

  // --- Ekstra toggle ---
  const handleExtraToggle = (key) => {
    setExtras(extras.includes(key) ? extras.filter(e => e !== key) : [...extras, key]);
  };

  // --- Fiyat Hesaplama ve popup açma ---
  const showRezSummary = (e) => {
    e.preventDefault();
    // fake distance & süre (örn. 35km, 1 saat, sadece simülasyon)
    const distance = 35, hour = 1;
    const base = 1200 + (selectedVehicleObj.max * 100);
    const firmPrices = fakeFirms.map(firm => firm.fiyat(base, distance, hour));
    let avg = null, message = "";
    if (firmPrices.filter(Boolean).length >= 5) {
      avg = Math.round(firmPrices.reduce((a, b) => a + b, 0) / firmPrices.length);
      message = "Fiyatlarımız piyasanın güncel ortalaması baz alınarak %30 kar ve masraflar eklenerek hesaplanmıştır.";
    } else {
      avg = 0;
      message = "Seçtiğiniz özellikler için en az 5 firmadan fiyat alınamadı. Size özel fiyat çalışıp iletişim numaranızdan ulaşacağız.";
    }
    const masraflar = Math.round(avg * 0.18) + 150;
    const kar = Math.round(avg * 0.30);
    const ekstraFiyat = extrasList.filter(e => extras.includes(e.key)).reduce((t, e) => t + e.price, 0)
      + (rotar > 1 ? rotarList.find(r => r.hours === rotar)?.price || 0 : 0);
    const toplam = avg + masraflar + kar + ekstraFiyat;
    setSummaryData({
      from, to, date, time,
      vehicle: selectedVehicleObj.label,
      personCount, extras, rotar,
      fiyatlar: { avg, masraflar, kar, ekstraFiyat, toplam },
      message,
    });
    setShowSummary(true);
  };

  // --- Ekstraları özetten sil ---
  const removeExtra = (key) => setExtras(extras.filter(e => e !== key));

  return (
    <main className="bg-black text-white w-full overflow-x-hidden">
      {/* Slogan */}
      <div className="w-full flex flex-col items-center pt-7 pb-2 bg-black">
        <h1 className="text-xl md:text-3xl font-extrabold text-white text-center mb-2 w-full tracking-tight drop-shadow" style={{ fontSize: "2rem" }}>
          Türkiye'nin Lider <span className="text-gold">VIP Transfer Ağı</span>
        </h1>
      </div>

      {/* Hero Slider */}
      <HeroSlider />

      {/* VIP Transfer Formu */}
      <section className="w-full flex flex-col items-center py-10 px-3 bg-black">
        <div className="bg-[#161616] rounded-2xl shadow-2xl px-8 py-8 max-w-3xl w-full border border-gold/15">
          <h3 className="text-2xl font-bold text-gold mb-5 text-center">VIP Transferinizi Planlayın</h3>
          <form className="flex flex-wrap gap-4 w-full justify-center items-center" onSubmit={showRezSummary}>
            <input type="text" className="input flex-1 min-w-[110px]" placeholder="Nereden?" value={from} onChange={e => setFrom(e.target.value)} required />
            <input type="text" className="input flex-1 min-w-[110px]" placeholder="Nereye?" value={to} onChange={e => setTo(e.target.value)} required />
            <input type="date" className="input flex-1 min-w-[110px]" placeholder="Tarih" value={date} onChange={e => setDate(e.target.value)} required />
            <input type="time" className="input flex-1 min-w-[110px]" placeholder="Saat" value={time} onChange={e => setTime(e.target.value)} required />
            <select className="input flex-1 min-w-[130px]" value={selectedVehicle}
              onChange={e => { setSelectedVehicle(e.target.value); setPersonCount(1); }}>
              {vehicles.map(v => (
                <option key={v.value} value={v.value}>{v.label}</option>
              ))}
            </select>
            <select className="input flex-1 min-w-[90px]" value={personCount} onChange={e => setPersonCount(Number(e.target.value))}>
              {Array.from({ length: maxPerson }, (_, i) => (
                <option key={i+1} value={i+1}>{i+1} Kişi</option>
              ))}
            </select>
            <button type="submit" className="bg-gold hover:bg-yellow-400 text-black font-semibold rounded-xl px-8 py-2 whitespace-nowrap transition text-lg mt-2">
              Fiyatı Gör
            </button>
          </form>
          {/* Ekstralar sadece ikon ve isim */}
          <ExtrasSelector selectedExtras={extras} onToggle={handleExtraToggle} />
          {/* Rotar garantisi */}
          <div className="flex justify-center mt-4">
            <select className="input flex-1 min-w-[160px]" value={rotar} onChange={e => setRotar(Number(e.target.value))}>
              {rotarList.map(r => (
                <option key={r.hours} value={r.hours}>{r.label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Avantaj Kutuları */}
      <section className="w-full flex flex-col items-center mb-12 px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl w-full">
          {advantages.map((adv, i) => (
            <div key={i} className="flex items-center gap-3 bg-[#191919] border border-gold/30 rounded-xl py-4 px-4 shadow font-semibold text-base min-h-[65px]">
              <span className="text-gold">{adv.icon}</span>
              <span className="leading-tight">{adv.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Müşteri Yorumları */}
      <section className="w-full max-w-6xl mx-auto py-7 mb-3 px-2">
        <h2 className="text-2xl font-bold text-gold mb-7 text-center">Müşterilerimizin Yorumları</h2>
        <div className={`flex ${isMobile ? "flex-col items-center" : "flex-row"} gap-5 justify-center transition-all`}>
          {getVisibleTestimonials().map((item, idx) => (
            <div key={idx} className="bg-[#181818] border border-gold/18 rounded-2xl px-7 py-6 shadow flex flex-col justify-between min-h-[158px] max-w-sm w-full" style={{ minHeight: 158, maxHeight: 158, height: 158 }}>
              <p className="text-base font-medium mb-4" style={{ lineHeight: "1.35em", height: "3.7em", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
                {item.comment}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-9 h-9 rounded-full bg-gold text-black flex items-center justify-center text-lg font-bold">
                  {item.avatar}
                </div>
                <div>
                  <div className="text-gold font-bold">{item.name}</div>
                  <div className="text-xs text-gray-400">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Neden YolcuTransferi */}
      <section className="w-full max-w-6xl mx-auto py-12 px-3">
        <h2 className="text-2xl font-bold text-gold mb-7 text-center">Neden YolcuTransferi?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-7">
          {whyUsCards.map((card, idx) => (
            <div key={idx} className="bg-black/40 border border-gold/15 rounded-2xl p-6 text-center flex flex-col items-start shadow min-h-[170px]">
              <div className="w-full flex flex-col items-center">
                {card.icon}
                <div className="text-gold font-bold text-lg mb-2 mt-2" style={{ minHeight: "3rem", display: "flex", alignItems: "flex-start", justifyContent: "center", textAlign: "center" }}>{card.title}</div>
              </div>
              <div className="text-gray-300 text-base mt-2" style={{ minHeight: "3.5rem", display: "flex", alignItems: "flex-start", textAlign: "center" }}>{card.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Rezervasyon Özeti Pop-up */}
      <RezSummaryPopup
        show={showSummary}
        summaryData={{ ...summaryData, extras, rotar }}
        onRemoveExtra={removeExtra}
        onClose={() => setShowSummary(false)}
      />

      {/* Styles */}
      <style jsx global>{`
        .text-gold { color: #FFD700; }
        .bg-gold { background: #FFD700; }
        .input {
          background: #f7f7f7;
          color: #222;
          border-radius: 0.75rem;
          padding: 0.8rem 1rem;
          border: 1px solid #FFD70040;
          min-width: 0;
          flex: 1 1 0px;
        }
        .input:focus { outline: 2px solid #FFD700; }
      `}</style>
    </main>
  );
}
