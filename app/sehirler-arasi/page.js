"use client";
import Image from "next/image";
import Link from "next/link";

export default function SehirlerArasi() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* Sarı kahverengi çerçeve */}
      <div className="border-4 border-[#6e5a1e] rounded-[10px] bg-black/60 p-6 md:p-10 shadow-lg">
        <Image
          src="/sehirler-arasi-banner.png"
          alt="Şehirler Arası Transfer"
          width={900}
          height={320}
          className="w-full rounded-[6px] mb-6 object-cover"
          priority
        />
        <h1 className="text-3xl font-extrabold text-[#6e5a1e] mb-4">Şehirler Arası Transfer</h1>
        <p className="mb-6 text-gray-200">
          İstanbul, Bodrum, Antalya, İzmir ve Türkiye’nin dört bir yanında şehirler arası yolculuklarınızda, konforlu ve sigortalı taşımacılık sunuyoruz. 
          YolcuTransferi ile uzun mesafeler artık lüks ve güvenli!
        </p>
        <p className="text-gray-300">
          Rakip firmaların aksine, araçlarımızda yüksek güvenlik, wi-fi, mini ikramlar ve dinamik fiyat avantajı standarttır.
          Uzun yolculuklarda sürücü değişimi, ek sigorta ve yolculuk boyunca canlı destekle yanınızdayız.
        </p>
      </div>

      {/* Buton ayrı */}
      <Link href="https://yolcutransferi-halil-tayfurs-projects.vercel.app/rezervasyon">
        <button className="bg-[#6e5a1e] hover:bg-[#8c7327] text-white font-bold py-3 px-8 rounded-xl mt-10 w-full text-lg shadow">
          Rezervasyon Yap
        </button>
      </Link>
    </main>
  );
}
