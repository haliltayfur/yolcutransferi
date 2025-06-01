"use client";
import Image from "next/image";
import Link from "next/link";

export default function Kurumsal() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* Sarı kahverengi çerçeve */}
      <div className="border-4 border-[#6e5a1e] rounded-[10px] bg-black/60 p-6 md:p-10 shadow-lg">
        <Image
          src="/kurumsal-banner.png"
          alt="Kurumsal ve Toplu Transfer"
          width={900}
          height={320}
          className="w-full rounded-[6px] mb-6 object-cover"
          priority
        />
        <h1 className="text-3xl font-extrabold text-[#6e5a1e] mb-4">Kurumsal & Toplu Transfer</h1>
        <p className="mb-6 text-gray-200">
          Toplantı, seminer, fuar ve şirket organizasyonlarında kurumsal müşterilerimize filo ölçeğinde lüks ve dakik transfer çözümleri sunuyoruz.
          Kurumlara özel fiyat, gizlilik taahhüdü ve ayrıcalıklı sürücü ekibiyle, çalışan ve VIP misafirleriniz için profesyonel ulaşım desteği sağlıyoruz.
        </p>
        <p className="text-gray-300">
          Rakip firmaların ötesinde, dinamik araç planlama, last-minute destek ve 7/24 filo yönetimiyle kurumsal iş süreçlerinizi aksatmayız.
          Tüm taşımalar yasal, sigortalı ve gizlilik protokolleriyle güvence altındadır.
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
