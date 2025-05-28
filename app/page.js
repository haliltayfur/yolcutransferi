"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  // Rezervasyon formu state'leri
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState(1);

  return (
    <main className="flex flex-col min-h-screen bg-black">
      {/* HERO BANNER */}
      <div className="relative w-full h-[420px] md:h-[600px]">
        <Image
          src="/hero-bg.jpg"
          alt="YolcuTransferi VIP Transfer"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          quality={95}
        />
        {/* Üstte logo + menü */}
        <div className="absolute inset-x-0 top-0 flex flex-col md:flex-row items-center justify-between px-4 md:px-16 py-6 bg-black/60 backdrop-blur-md z-20">
          <div className="flex items-center gap-2">
            <Image src="/logo-vip.png" alt="Logo" width={40} height={40} />
            <span className="text-2xl md:text-3xl font-extrabold text-gold tracking-wide">YolcuTransferi.com</span>
          </div>
          <nav className="flex flex-wrap gap-5 items-center mt-4 md:mt-0 text-base font-medium">
            <Link href="/">Anasayfa</Link>
            <Link href="/hizmetler">Hizmetlerimiz</Link>
            <Link href="/araclar">Araçlar</Link>
            <Link href="/rezervasyon">Rezervasyon</Link>
            <Link href="/sss">SSS</Link>
            <Link href="/iletisim">İletişim</Link>
            <Link href="/hakkimizda">Hakkımızda</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/sozlesme">Sözleşmeler</Link>
            <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer">Whatsapp</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="#" target="_blank" rel="noopener noreferrer">X</a>
            <button className="ml-3 px-2 py-1 text-xs rounded bg-gold/10 text-gold hover:bg-gold/30">TR</button>
            <button className="px-2 py-1 text-xs rounded hover:bg-gold/10">EN</button>
            <button className="px-2 py-1 text-xs rounded hover:bg-gold/10">RU</button>
          </nav>
        </div>
   
        <div className="absolute
