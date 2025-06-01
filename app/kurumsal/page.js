// app/kurumsal/page.js
"use client";
import Image from "next/image";
import Link from "next/link";

export default function Kurumsal() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Image
        src="/kurumsal-banner.png"
        alt="Kurumsal ve Toplu Transfer"
        width={900}
        height={320}
        className="w-full rounded-2xl shadow mb-8 object-cover"
        priority
      />
      <h1 className="text-3xl font-extrabold text-gold mb-4">Kurumsal & Toplu Transfer</h1>
      <p className="mb-6 text-gray-200">
        Toplantı, seminer, fuar ve şirket organizasyonlarında kurumsal müşterilerimize filo ölçeğinde lüks ve dakik transfer çözümleri sunuyoruz.
        Kurumlara özel fiyat, gizlilik taahhüdü ve ayrıcalıklı sürücü ekibiyle, çalışan ve VIP misafirleriniz için profesyonel ulaşım desteği sağlıyoruz.
      </p>
      <p className="mb-6 text-gray-300">
        Rakip firmaların ötesinde, dinamik araç planlama, last-minute destek ve 7/24 filo yönetimiyle kurumsal iş süreçlerinizi aksatmayız.
        Tüm taşımalar yasal, sigortalı ve gizlilik protokolleriyle güvence altındadır.
      </p>
      <Link href="https://yolcutransferi-halil-tayfurs-projects.vercel.app/rezervasyon">
        <button className="bg-gold hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-xl mt-6 w-full text-lg shadow">
          Rezervasyon Yap
        </button>
      </Link>
    </main>
  );
}
