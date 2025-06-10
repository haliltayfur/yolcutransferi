"use client";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex justify-center">
      {/* Sayfa genişliğini header altındaki çizgiye sabitlemek için container */}
      <div className="w-full max-w-[1100px] px-4">

        {/* HERO GÖRSELİ - HEADER ALT ÇİZGİSİ İLE HİZALI */}
       <div className="relative w-full h-[400px] mt-0">
          <Image
            src="/Orta.jpg"
            alt="YolcuTransferi VIP Transfer"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
        </div>

        {/* SLOGAN BLOKU - GÖRSELİN ALTINDA */}
        <section className="flex flex-col items-center mt-6 mb-0">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow text-center mb-2 w-full">
            Türkiye'nin Lider <span className="text-gold">VIP Transfer Ağı</span>
          </h1>
        </section>
<meta name="google-site-verification" content="084NNONOhJ2ry2BTv_uWZEF6Y_hEVbcQ0O99gtm1O5g" />
        {/* REZERVASYON FORMU */}
        <div className="flex justify-center z-10 relative mt-10">
          <div className="bg-white rounded-2xl shadow-2xl px-7 py-5 max-w-3xl w-full flex flex-col md:flex-row md:items-end gap-4 border border-gray-200">
            {/* Rezervasyon inputların */}
          </div>
        </div>
      </div>
    </main>
  );
}
