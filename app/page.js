"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState(1);

  return (
    <main className="flex flex-col items-center bg-black min-h-screen w-full">
      {/* HERO */}
      <section className="w-full flex flex-col items-center">
        <div className="relative w-full" style={{ background: "#000" }}>
          <img
            src="/hero-bg.jpg"
            alt="VIP Transfer Hero"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "contain",
              maxHeight: "650px", // Gerekirse artır
              margin: "0 auto",
            }}
          />
        </div>
        {/* Rezervasyon Kutusu */}
        <div className="w-full flex justify-center" style={{ marginTop: -30 }}>
          <div
            className="bg-white rounded-2xl px-4 py-5 max-w-4xl w-[98vw] flex flex-row flex-wrap items-end gap-3 border border-gray-300 shadow-lg z-30"
            style={{ boxShadow: "0 8px 32px 0 rgba(0,0,0,0.12)", minHeight: 80 }}
          >
            <div className="flex flex-col flex-1 min-w-[120px]">
              <label className="font-bold text-xs mb-1 text-gray-700">Nereden?</label>
              <input type="text" placeholder="Şehir / İlçe / Mahalle" className="rounded-md border border-gray-300 px-3 py-2 bg-white text-black" value={from} onChange={e => setFrom(e.target.value)} />
            </div>
            <div className="flex flex-col flex-1 min-w-[120px]">
              <label className="font-bold text-xs mb-1 text-gray-700">Nereye?</label>
              <input type="text" placeholder="Şehir / İlçe / Mahalle" className="rounded-md border border-gray-300 px-3 py-2 bg-white text-black" value={to} onChange={e => setTo(e.target.value)} />
            </div>
            <div className="flex flex-col flex-1 min-w-[90px]">
              <label className="font-bold text-xs mb-1 text-gray-700">Tarih</label>
              <input type="date" className="rounded-md border border-gray-300 px-3 py-2 bg-white text-black" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div className="flex flex-col flex-1 min-w-[80px]">
              <label className="font-bold text-xs mb-1 text-gray-700">Saat</label>
              <input type="time" className="rounded-md border border-gray-300 px-3 py-2 bg-white text-black" value={time} onChange={e => setTime(e.target.value)} />
            </div>
            <div className="flex flex-col w-20 min-w-[60px]">
              <label className="font-bold text-xs mb-1 text-gray-700">Kişi</label>
              <select className="rounded-md border border-gray-300 px-3 py-2 bg-white text-black" value={passengers} onChange={e => setPassengers(e.target.value)}>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
                <option value="other">Diğer</option>
              </select>
            </div>
            <button className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-yellow-500 transition mt-5 md:mt-0 md:self-end">
              Ara
            </button>
          </div>
        </div>
        {/* Araçlar Bölümü */}
        <div className="w-full flex justify-center mt-6 gap-7 pb-8">
          <img src="/arac-vito.png" alt="Vito" className="h-40 object-contain" />
          <img src="/arac-sedan.png" alt="Sedan" className="h-40 object-contain" />
          <img src="/arac-van.png" alt="Van" className="h-40 object-contain" />
        </div>
      </section>
    </main>
  );
}
