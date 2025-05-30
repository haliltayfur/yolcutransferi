"use client";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
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
