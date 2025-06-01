// app/dron/page.js
"use client";
import Image from "next/image";
import Link from "next/link";

export default function Dron() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Image
        src="/dron-banner.png"
        alt="Dron Yolcu Transferi"
        width={900}
        height={320}
        className="w-full rounded-2xl shadow mb-8 object-cover"
        priority
      />
      <h1 className="text-3xl font-extrabold text-gold mb-4">Dron Yolcu Transferi</h1>
      <p className="mb-6 text-gray-200">
        Türkiye’de bir ilk! Dron ile kısa mesafe VIP taşımacılık hizmetimiz, şehir içi ve çevresinde zaman kazandıran ayrıcalıklar sunuyor. 
        Elektrikli dron filomuz çevreci, sessiz ve tam güvenlikli.
      </p>
      <p className="mb-6 text-gray-300">
        Rakiplerden ayrıştığımız noktalar: Rezervasyon önceliği, hava trafik izinleri ve yolcu sigortası ile tam emniyet. 
        Modern ve yenilikçi transfer deneyimi arayanlar için mükemmel çözüm.
      </p>
      <Link href="https://yolcutransferi-halil-tayfurs-projects.vercel.app/rezervasyon">
        <button className="bg-gold hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-xl mt-6 w-full text-lg shadow">
          Rezervasyon Yap
        </button>
      </Link>
    </main>
  );
}
