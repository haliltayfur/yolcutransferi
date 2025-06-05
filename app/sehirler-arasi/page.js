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
          <strong>İş, tatil ya da özel anlar için konforlu ve güvenli şehirler arası yolculuklar…</strong><br /><br />
          YolcuTransferi, İstanbul’dan Bodrum’a, Antalya’dan İzmir’e ve Türkiye’nin dört bir yanına; size özel araç ve deneyimli sürücülerle zahmetsiz ulaşım sağlar. 
          Kalabalık otobüsleri, yorucu aktarmaları unutun. Dilediğiniz saatte, dilediğiniz adresten alınır, kapınıza kadar konforla ulaştırılırsınız.
        </p>
        <p className="mb-6 text-gray-200">
          Yolculuğunuzun her detayı sizin isteğinize göre şekillenir. Wi-fi, mini ikramlar, çocuk koltuğu, ek sigorta ve daha fazlası, rezervasyon sırasında tercihinize sunulur. 
          Tüm transferlerimiz sigortalı olup, yolculuk boyunca 7/24 destek hattımız ile her zaman yanınızdayız.
        </p>
        <p className="text-gray-300">
          <
