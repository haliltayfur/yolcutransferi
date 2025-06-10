"use client";
import { useState, useEffect } from "react";
import HeroSlider from "../components/HeroSlider";

import { vehicles } from "../data/vehicleList";
import { advantages } from "../data/advantages";
import { extrasList } from "../data/extras";
import { rotarList } from "../data/rotarOptions";
import { fakeFirms } from "../data/fakeFirms";
import { testimonials } from "../data/testimonials";
import { whyUsCards } from "../data/whyUs";

// Geri kalan UI fonksiyonları ve formlar aşağıdaki gibi olacak.
// (Burada sadece sade hali, kod uzunluğunu azaltmak için örnek olarak form ve slider'ı gösteriyorum.)

export default function Home() {
  // STATE'LERİN KISA HALİ
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0].value);
  const [personCount, setPersonCount] = useState(1);
  const [extras, setExtras] = useState([]);
  const [rotar, setRotar] = useState(rotarList[0].hours);

  // Diğer gerekli state'ler (örn. rezervasyon özeti, yorum slider indexi, responsive vs.)  
  // Buraya kopyalanabilir, veya ayrı hook/bileşen olarak yönetilebilir!

  const selectedVehicleObj = vehicles.find(v => v.value === selectedVehicle) || vehicles[0];
  const maxPerson = selectedVehicleObj.max;

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
          <form className="flex flex-wrap gap-4 w-full justify-center items-center">
            {/* ...Kısa örnek, diğer inputlar eklenebilir... */}
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
          </form>
          {/* Ekstralar */}
          <div className="flex flex-wrap gap-3 mt-6 justify-center">
            {extrasList.map(ex => (
              <button key={ex.key} type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition text-sm font-semibold shadow-sm ${extras.includes(ex.key) ? "bg-gold text-black border-yellow-400" : "bg-[#202020] text-gold border-gold/30 hover:bg-gold/30"}`}
                onClick={() => setExtras(extras.includes(ex.key) ? extras.filter(e => e !== ex.key) : [...extras, ex.key])}
              >
                {ex.icon} {ex.label} <span className="ml-1 text-xs text-gray-400">({ex.price}₺)</span>
              </button>
            ))}
            {/* Rotar garantisi */}
            <select className="input flex-1 min-w-[160px] mt-1" value={rotar} onChange={e => setRotar(Number(e.target.value))}>
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

      {/* Yorumlar */}
      <section className="w-full max-w-6xl mx-auto py-7 mb-3 px-2">
        <h2 className="text-2xl font-bold text-gold mb-7 text-center">Müşterilerimizin Yorumları</h2>
        {/* Slider logic import edilen testimonials ile burada kurulacak */}
        {/* ...Kısa örnek... */}
        <div className="flex flex-row gap-5 justify-center">
          {testimonials.slice(0,3).map((item, idx) => (
            <div key={idx} className="bg-[#181818] border border-gold/18 rounded-2xl px-7 py-6 shadow flex flex-col justify-between min-h-[158px] max-w-sm w-full">
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
            <div key={idx} className="bg-black/40 border border-gold/15 rounded-2xl p-6 text-center flex flex-col items-center shadow min-h-[170px]">
              {card.icon}
              <div className="text-gold font-bold text-lg mb-2 mt-2">{card.title}</div>
              <div className="text-gray-300 text-base mt-auto">{card.desc}</div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Style örneği */}
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
