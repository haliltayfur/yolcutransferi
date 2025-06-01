"use client";
import Image from "next/image";
import Link from "next/link";

export default function TurGezi() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* Sarı kahve çerçeve içinde içerik */}
      <div className="border-4 border-[#6e5a1e] rounded-[10px] bg-black/60 p-6 md:p-10 shadow-lg">
        <Image
          src="/tur-gezi-banner.png"
          alt="Tur & Gezi Transferi"
          width={900}
          height={320}
          className="w-full rounded-[6px] mb-6 object-cover"
          priority
        />
        <h1 className="text-3xl font-extrabold text-[#6e5a1e] mb-4">Tur & Gezi Transferi</h1>
        <p className="mb-6 text-gray-200">
          Tatil, şehir turu ve özel gezi organizasyonlarınızda, profesyonel sürücülerimiz ve geniş araç filomuzla konforlu ve güvenli ulaşım sağlıyoruz.
          Tur programına uygun, saatlik veya tam gün transfer seçenekleriyle her an yanınızdayız.
        </p>
        <p className="text-gray-300">
          Diğer firmalardan farklı olarak; kişiye özel rehberlik, VIP minibüs ve lüks sedan seçenekleri, hızlı rezervasyon ve iptal kolaylığı sunuyoruz.
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
