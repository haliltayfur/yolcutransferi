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
    <main className="flex flex-col min-h-screen bg-black">
      {/* HERO GÖRSELİ */}
      <div className="w-full h-[420px] md:h-[600px] relative">
        <Image
          src="/hero-bg.jpg"
          alt="YolcuTransferi VIP Transfer"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          quality={97}
        />
      </div>

      {/* REZERVASYON FORMU */}
      <div className="w-full flex justify-center mt-[-80px] z-10 relative">
        <div className="bg-white/95 shadow-2xl rounded-2xl px-6 py-7 max-w-3xl w-full flex flex-col md:flex-row md:items-end gap-4 border border-gray-200 backdrop-blur">
          <div className="flex flex-col flex-1 min-w-[150px]">
            <label className="font-bold text-xs mb-1 text-gray-700">Nereden?</label>
            <input
              type="text"
              placeholder="Şehir / İlçe / Mahalle"
              className="rounded-md border border-gray-300 px-3 py-2 bg-white/90 text-black"
              value={from}
              onChange={e => setFrom(e.target.value)}
            />
          </div>
          <div className="flex flex-col flex-1 min-w-[150px]">
            <label className="font-bold text-xs mb-1 text-gray-700">Nereye?</label>
            <input
              type="text"
              placeholder="Şehir / İlçe / Mahalle"
              className="rounded-md border border-gray-300 px-3 py-2 bg-white/90 text-black"
              value={to}
              onChange={e => setTo(e.target.value)}
            />
          </div>
          <div className="flex flex-col flex-1 min-w-[110px]">
            <label className="font-bold text-xs mb-1 text-gray-700">Tarih</label>
            <input
              type="date"
              className="rounded-md border border-gray-300 px-3 py-2 bg-white/90 text-black"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col flex-1 min-w-[90px]">
            <label className="font-bold text-xs mb-1 text-gray-700">Saat</label>
            <input
              type="time"
              className="rounded-md border border-gray-300 px-3 py-2 bg-white/90 text-black"
              value={time}
              onChange={e => setTime(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-20 min-w-[70px]">
            <label className="font-bold text-xs mb-1 text-gray-700">Kişi</label>
            <select
              className="rounded-md border border-gray-300 px-3 py-2 bg-white/90 text-black"
              value={passengers}
              onChange={e => setPassengers(e.target.value)}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
              <option value="other">Diğer</option>
            </select>
          </div>
          <button className="bg-gold text-black font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-yellow-500 transition mt-5 md:mt-0 md:self-end">
            Ara
          </button>
        </div>
      </div>

      {/* SAYFA DEVAMI */}
      <section className="flex flex-col items-center justify-center pt-14 pb-8 px-2 md:px-0">
        <h2 className="text-2xl font-extrabold text-gold mb-4 text-center">Güvenilir Dijital VIP Transfer</h2>
        <p className="max-w-3xl text-lg text-gray-300 text-center mb-6">
          Türkiye'nin her yerinde VIP yolcu taşımacılığı ve dron transferde yeni çağ!
          Uygun fiyatlarla, 7/24 online rezervasyon ve premium hizmet deneyimi.
        </p>
        {/* ...avantajlar veya başka içerikler ekleyebilirsin */}
      </section>
    </main>
  );
}
