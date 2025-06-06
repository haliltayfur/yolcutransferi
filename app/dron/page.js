"use client";
import Image from "next/image";
import Link from "next/link";

export default function Dron() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* Sarı kahve çerçeve içinde tüm içerik */}
      <div className="border-4 border-[#6e5a1e] rounded-[10px] bg-black/60 p-6 md:p-10 shadow-lg">
        <Image
          src="/dron-banner.png"
          alt="Dron Yolcu Transferi"
          width={900}
          height={320}
          className="w-full rounded-[6px] mb-6 object-cover"
          priority
        />
        <h1 className="text-3xl font-extrabold text-[#6e5a1e] mb-4">Dron Yolcu Transferi</h1>
        <p className="mb-6 text-gray-200 text-left">
          Türkiye'de bir ilk: Dron ile kısa mesafe VIP taşımacılık hizmetimiz, şehir içi ve çevresinde zaman kazandıran ayrıcalıklar sunuyor. Elektrikli dron filomuz çevreci, sessiz ve tam güvenlikli.
        </p>
        <p className="text-gray-300 text-left">
          Hava trafik izinleri, yolcu sigortası ve öncelikli rezervasyon imkanlarıyla, modern ve yenilikçi bir transfer deneyimi arayanlar için mükemmel bir çözüm sunuyoruz. Bu hizmet, şehir içi ulaşımda devrim niteliğinde bir adım olarak öne çıkıyor.
        </p>
      </div>

      {/* Buton dışarıda */}
      <Link href="https://yolcutransferi-halil-tayfurs-projects.vercel.app/rezervasyon">
        <button className="bg-[#6e5a1e] hover:bg-[#8c7327] text-white font-bold py-3 px-8 rounded-xl mt-10 w-full text-lg shadow">
          Rezervasyon Yap
        </button>
      </Link>
    </main>
  );
}
