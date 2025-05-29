"use client";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si"; // X yeni twitter logosu

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* SABİT ÜST BANNER */}
      <header className="flex items-center justify-between px-7 py-4 bg-black bg-opacity-95 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Image src="/logo-vip.png" alt="Logo" width={36} height={36} />
          <span className="font-bold text-2xl text-gold">YolcuTransferi.com</span>
        </div>
        <nav className="flex gap-6 items-center text-base font-medium">
          <Link href="/">Anasayfa</Link>
          <Link href="/hizmetler">Hizmetlerimiz</Link>
          <Link href="/araclar">Araçlar</Link>
          <Link href="/rezervasyon">Rezervasyon</Link>
          <Link href="/sss">SSS</Link>
          <Link href="/iletisim">İletişim</Link>
          {/* Sosyal Medya */}
          <a href="https://wa.me/905395267569" target="_blank" aria-label="Whatsapp">
            <FaWhatsapp className="w-5 h-5 text-green-400 hover:text-green-500" />
          </a>
          <a href="#" target="_blank" aria-label="Instagram">
            <FaInstagram className="w-5 h-5 text-pink-500 hover:text-pink-600" />
          </a>
          <a href="#" target="_blank" aria-label="X (Twitter)">
            <SiX className="w-5 h-5 text-white hover:text-gray-400" />
          </a>
        </nav>
      </header>

      {/* SLOGAN BLOKU */}
      <section className="flex flex-col items-center mt-5 mb-1">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow text-center mb-2">
          Türkiye'nin Lider <span className="text-gold">VIP Transfer Ağı</span>
        </h1>
        <p className="text-base md:text-xl text-gray-100 text-center max-w-2xl">
          Rakiplerine iş veren, her şehirde, 7/24 VIP transfer, drone taksi ve ultra lüks araçlar.<br />
          <span className="text-gold font-semibold">Şimdi Anında Fiyat Al!</span>
        </p>
      </section>

      {/* HERO GÖRSELİ */}
      <div className="relative w-full h-[540px] md:h-[600px] mb-[-80px]">
        <Image
          src="/hero-bg.jpg"
          alt="YolcuTransferi VIP Transfer"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
      </div>

      {/* REZERVASYON FORMU */}
      <div className="flex justify-center z-10 relative mb-10">
        <div className="bg-white rounded-2xl shadow-2xl px-7 py-5 max-w-3xl w-full flex flex-col md:flex-row md:items-end gap-4 border border-gray-200">
          {/* ... burada senin rezervasyon inputların */}
        </div>
      </div>
    </main>
  );
}
