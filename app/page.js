"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState(1);

  return (
    <main className="min-h-screen w-full bg-black text-white overflow-x-hidden flex flex-col">

      {/* ======= ÜST MENÜ (BANNER) ======= */}
      <header className="w-full flex items-center justify-between px-6 md:px-20 py-5 bg-black z-50">
        <div className="flex items-center gap-2">
          <Image src="/logo-vip.png" alt="Logo" width={42} height={42} />
          <span className="text-2xl md:text-3xl font-bold text-gold">YolcuTransferi.com</span>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-base">
          <Link href="/">Anasayfa</Link>
          <Link href="/hizmetler">Hizmetlerimiz</Link>
          <Link href="/araclar">Araçlar</Link>
          <Link href="/rezervasyon">Rezervasyon</Link>
          <Link href="/sss">SSS</Link>
          <Link href="/iletisim">İletişim</Link>
        </nav>
      </header>

      {/* ======= HERO RESMİ TAM BOY, HİÇBİR YERİ KESİLMEYECEK ======= */}
      <section className="relative w-full flex justify-center items-center bg-black"
        style={{ height: "calc(100vw * 0.42)", maxHeight: 650, minHeight: 380 }}
      >
        <Image
          src="/hero-bg.jpg"
          alt="YolcuTransferi VIP Transfer"
          fill
          className="object-contain object-center"
          priority
          quality={97}
          sizes="100vw"
          style={{
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </section>

      {/* ======= REZERVASYON KUTUSU ======= */}
      <section className="w-full flex justify-center mt-0 z-10">
        <div className="bg-white/95 shadow-2xl rounded-2xl px-6 py-7 max-w-3xl w-full flex flex-col md:flex-row md:items-end gap-4 border border-gray-200 backdrop-blur mx-3">
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
      </section>

      {/* ======= SLOGAN / AVANTAJ KUTULARI ======= */}
      <section className="flex flex-col items-center justify-center pt-10 pb-8 px-2 md:px-0">
        <h2 className="text-2xl font-extrabold text-gold mb-4 text-center">Güvenilir Dijital VIP Transfer</h2>
        <p className="max-w-3xl text-lg text-gray-300 text-center mb-6">
          Türkiye'nin her yerinde VIP yolcu taşımacılığı ve dron transferde yeni çağ! Uygun fiyatlarla, 7/24 online rezervasyon ve premium hizmet deneyimi.
        </p>
        {/* Avantaj kutuları istersek buraya eklenir */}
      </section>

      {/* ======= FOOTER ======= */}
      <footer className="w-full px-8 py-6 bg-black/90 flex flex-col md:flex-row items-center justify-between gap-3 mt-auto">
        <div className="text-xs text-gray-400">&copy; 2025 YolcuTransferi.com</div>
        <div className="flex gap-6 items-center">
          <Link href="/sozlesme" className="text-sm underline">Mesafeli Satış Sözleşmesi</Link>
          <Link href="/gizlilik" className="text-sm underline">Gizlilik</Link>
          <Link href="/iade" className="text-sm underline">İade Politikası</Link>
        </div>
      </footer>

    </main>
  );
}
