// app/sehirler-arasi/page.js
"use client";
import Image from "next/image";
import Link from "next/link";

export default function SehirlerArasi() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Image
        src="/sehirler-arasi-banner.png"
        alt="Şehirler Arası Transfer"
        width={900}
        height={320}
        className="w-full rounded-2xl shadow mb-8 object-cover"
        priority
      />
      <h1 className="text-3xl font-extrabold text-gold mb-4">Şehirler Arası Transfer</h1>
      <p className="mb-6 text-gray-200">
        İstanbul, Bodrum, Antalya, İzmir ve Türkiye’nin dört bir yanında şehirler arası yolculuklarınızda, konforlu ve sigortalı taşımacılık sunuyoruz. 
        YolcuTransferi ile uzun mesafeler artık lüks ve güvenli!
      </p>
      <p className="mb-6 text-gray-300">
        Rakip firmaların aksine, araçlarımızda yüksek güvenlik, wi-fi, mini ikramlar ve dinamik fiyat avantajı standarttır.
        Uzun yolculuklarda sürücü değişimi, ek sigorta ve yolculuk boyunca canlı destekle yanınızdayız.
      </p>
      <Link href="https://yolcutransferi-halil-tayfurs-projects.vercel.app/rezervasyon">
        <button className="bg-gold hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-xl mt-6 w-full text-lg shadow">
          Rezervasyon Yap
        </button>
      </Link>
    </main>
  );
}
