// app/tur-gezi/page.js
"use client";
import Image from "next/image";
import Link from "next/link";

export default function TurGezi() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Image
        src="/tur-gezi-banner.png"
        alt="Tur & Gezi Transferi"
        width={900}
        height={320}
        className="w-full rounded-2xl shadow mb-8 object-cover"
        priority
      />
      <h1 className="text-3xl font-extrabold text-gold mb-4">Tur & Gezi Transferi</h1>
      <p className="mb-6 text-gray-200">
        Tatil, şehir turu ve özel gezi organizasyonlarınızda, profesyonel sürücülerimiz ve geniş araç filomuzla konforlu ve güvenli ulaşım sağlıyoruz.
        Tur programına uygun, saatlik veya tam gün transfer seçenekleriyle her an yanınızdayız.
      </p>
      <p className="mb-6 text-gray-300">
        Diğer firmalardan farklı olarak; kişiye özel rehberlik, VIP minibüs ve lüks sedan seçenekleri, hızlı rezervasyon ve iptal kolaylığı sunuyoruz.
      </p>
      <Link href="https://yolcutransferi-halil-tayfurs-projects.vercel.app/rezervasyon">
        <button className="bg-gold hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-xl mt-6 w-full text-lg shadow">
          Rezervasyon Yap
        </button>
      </Link>
    </main>
  );
}
