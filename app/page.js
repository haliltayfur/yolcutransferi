"use client";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* SLOGAN BLOKU */}
      <section className="flex flex-col items-center mt-5 mb-0"> {/* mb-0 yaptım */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow text-center mb-2">
          Türkiye'nin Lider <span className="text-gold">VIP Transfer Ağı</span>
        </h1>
      </section>

      {/* HERO GÖRSELİ */}
      <div className="relative w-full h-[540px] md:h-[600px] mt-[-20px]"> {/* mb-[-80px] kaldırıp mt-[-20px] ekledim */}
        <Image
          src="/hero-bg.jpg"
          alt="YolcuTransferi VIP Transfer"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
      </div>

      {/* REZERVASYON FORMU */}
      <div className="flex justify-center z-10 relative mt-10">
        <div className="bg-white rounded-2xl shadow-2xl px-7 py-5 max-w-3xl w-full flex flex-col md:flex-row md:items-end gap-4 border border-gray-200">
          {/* ... rezervasyon inputların */}
        </div>
      </div>
    </main>
  );
}
