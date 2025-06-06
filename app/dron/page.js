"use client";
import Image from "next/image";
import Link from "next/link";

export default function Dron() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="border-4 border-[#6e5a1e] rounded-[10px] bg-black/60 p-6 md:p-10 shadow-lg">
        <Image
          src="/dron-banner.png"
          alt="Dron Yolcu Transferi"
          width={900}
          height={320}
          className="w-full rounded-[6px] mb-6 object-cover"
          priority
        />
        <h1 className="text-3xl font-extrabold text-[#6e5a1e] mb-4 text-left">
          Dron Yolcu Transferi
        </h1>
        <p className="mb-5 text-white text-left">
          <b>Türkiye’de bir ilk!</b> Dron ile kısa mesafe VIP yolcu taşımacılığı hizmetine ihtiyacı olanlarla, bu alanda yetkili ve deneyimli operatörleri buluşturan bağımsız aracılık platformuyuz. 
        </p>
        <p className="mb-4 text-gray-200 text-left">
          Elektrikli, çevreci ve son teknoloji dron filolarına sahip çözüm ortaklarımızla; şehir içi ve çevresinde hızlı, modern ve güvenli transfer deneyimi için aracılık sağlıyoruz. Kendi filomuz, pilotumuz ya da araçlarımız yoktur; sektördeki tüm operatörleri tek noktadan erişilebilir kılıyoruz.
        </p>
        <p className="mb-4 text-gray-300 text-left">
          Tüm uçuşlarda; hava trafik izinleri, yolcu sigortası ve rezervasyon süreçleri sizin adınıza titizlikle yürütülür. Siz sadece talebinizi oluşturun, en iyi ve güvenilir dron taksi operatörlerinden teklif alın.
        </p>
        <p className="text-gray-400 text-left text-sm mt-2">
          YolcuTransferi.com, <b>aracılık platformudur</b>. Uçuşlar, lisanslı ve yetkili hava aracı operatörleri tarafından sağlanır.
        </p>
      </div>
      <Link href="https://yolcutransferi.com/rezervasyon">
        <button className="bg-[#6e5a1e] hover:bg-[#8c7327] text-white font-bold py-3 px-8 rounded-xl mt-10 w-full text-lg shadow">
          Rezervasyon Yap
        </button>
      </Link>
    </main>
  );
}
