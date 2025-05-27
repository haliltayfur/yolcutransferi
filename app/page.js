@@ -1,96 +1,79 @@
"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaTwitter, FaLock } from "react-icons/fa";

export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState(1);
// Menü başlıkları için dizi (kolayca güncellenir)
const NAVS = [
  { label: "Anasayfa", href: "/" },
  { label: "Hizmetlerimiz", href: "/hizmetler" },
  { label: "Araçlar", href: "/araclar" },
  { label: "Rezervasyon", href: "/rezervasyon" },
  { label: "SSS", href: "/sss" },
  { label: "İletişim", href: "/iletisim" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Blog", href: "/blog" },
  { label: "Sözleşmeler", href: "/sozlesme" },
];

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-black">
      {/* HERO GÖRSELİ */}
      <div className="relative w-full h-[340px] md:h-[500px]">
    <main className="relative min-h-screen flex flex-col bg-black">
      {/* HERO ARKA PLAN */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/hero-bg.jpg"
          alt="YolcuTransferi VIP Transfer"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          className="object-cover object-center"
          quality={95}
          sizes="100vw"
        />
        {/* Hafif bir karanlık maske: İstersen kaldırabilirsin */}
        <div className="absolute inset-0 bg-black/35" />
      </div>
      {/* REZERVASYON FORMU */}
      <section className="flex justify-center -mt-16 z-10 relative px-2">
        <div className="w-full max-w-2xl bg-white/95 shadow-2xl rounded-2xl px-4 py-6 flex flex-col gap-4 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex flex-col flex-1 min-w-[120px]">
              <label className="font-bold text-xs mb-1 text-gray-700">Nereden?</label>
              <input
                type="text"
                placeholder="Şehir / İlçe / Mahalle"
                className="rounded-md border border-gray-300 px-3 py-2 bg-white/90 text-black"
                value={from}
                onChange={e => setFrom(e.target.value)}
              />
            </div>
            <div className="flex flex-col flex-1 min-w-[120px]">
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
          </div>
          <button className="bg-gold text-black font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-yellow-500 transition mt-3 md:mt-0 md:self-end">
            Ara
          </button>

      {/* ÜST MENÜ */}
      <header className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-5 bg-black/75 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <Image src="/logo-vip.png" alt="Logo" width={42} height={42} className="mr-2" />
          <span className="text-2xl md:text-3xl font-bold text-gold drop-shadow tracking-wide">YolcuTransferi.com</span>
        </div>
      </section>
      {/* SAYFA DEVAMI */}
      <section className="flex flex-col items-center justify-center pt-14 pb-8 px-2 md:px-0">
        <h2 className="text-2xl font-extrabold text-gold mb-4 text-center">Güvenilir Dijital VIP Transfer</h2>
        <p className="max-w-3xl text-lg text-gray-300 text-center mb-6">
          Türkiye'nin her yerinde VIP yolcu taşımacılığı ve dron transferde yeni çağ!
          Uygun fiyatlarla, 7/24 online rezervasyon ve premium hizmet deneyimi.
        <nav className="flex flex-wrap gap-5 mt-3 md:mt-0 items-center text-lg">
          {NAVS.map(item => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
          <FaWhatsapp className="w-6 h-6 hover:text-green-400 cursor-pointer" title="Whatsapp" />
          <FaInstagram className="w-6 h-6 hover:text-pink-500 cursor-pointer" title="Instagram" />
          <FaTwitter className="w-6 h-6 hover:text-blue-400 cursor-pointer" title="Twitter" />
        </nav>
      </header>

      {/* HERO ve SLOGAN */}
      <section className="flex flex-col items-center justify-center flex-1 pt-24 pb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gold drop-shadow-lg mb-6 text-center">
          Türkiye’nin Her Yerinde VIP Transfer & Dron Transfer
        </h1>
        <p className="max-w-2xl text-lg md:text-2xl text-gray-100 text-center mb-8 drop-shadow">
          İstanbul, Bodrum, Antalya, İzmir ve tüm havalimanları için lüks, güvenli ve hızlı ulaşım.<br />
          Hemen online rezervasyon yap, %100 sigortalı, premium deneyimle yolculuğunu başlat!
        </p>
        {/* ...avantajlar veya başka içerikler ekleyebilirsin */}
        <Link href="/rezervasyon">
          <button className="bg-gold text-black font-semibold py-3 px-8 rounded-xl text-lg shadow-lg hover:bg-white transition">
            Transfer Rezervasyonu Yap
          </button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="w-full px-8 py-6 bg-black/80 flex flex-col md:flex-row items-center justify-between gap-3 mt-auto z-10">
        <div className="flex items-center gap-3">
          <FaLock className="text-green-400" />
          <span className="text-sm text-gray-300">SSL ile korunuyor</span>
        </div>
        <div className="text-xs text-gray-400">&copy; 2025 YolcuTransferi.com</div>
      </footer>
    </main>
  );
}
