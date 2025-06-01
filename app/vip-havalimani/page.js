"use client";
import Image from "next/image";
import Link from "next/link";

export default function VIPHavalimani() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">

      {/* SARİ ÇERÇEVE BAŞLANGIÇ */}
      <div className="border-[3px] border-[#b8963e] rounded-[10px] bg-black/60 p-6 md:p-10 shadow-lg">
        <Image
          src="/vip-havalimani-banner.png"
          alt="VIP Havalimanı Transferi"
          width={900}
          height={320}
          className="w-full rounded-[6px] mb-6 object-cover"
          priority
        />
        <h1 className="text-3xl font-extrabold text-[#b8963e] mb-4">VIP Havalimanı Transferi</h1>
        <p className="mb-6 text-gray-200">
          YolcuTransferi olarak Türkiye'nin tüm havalimanlarında, Mercedes Maybach, Vito, lüks minivan ve özel araçlarla profesyonel ve konforlu VIP transfer hizmeti sunuyoruz. 
          Her yolculuk sigortalı, zamanında ve eğitimli şoförler eşliğinde gerçekleşir.  
          Bagaj yardımı, özel karşılama, uçuş takip ve 7/24 müşteri desteği ile havalimanı ulaşımını stressiz ve ayrıcalıklı hale getiriyoruz.
        </p>

        <p className="text-gray-300">
          <strong className="text-white">Neden YolcuTransferi?</strong><br />
          - Rakiplerimizden farklı olarak, filomuzdaki tüm araçlar yeni model ve lüks segmenttir.<br />
          - Fiyatlarımız nettir, yolculuk sonrası ekstra ücret sürprizi yoktur.<br />
          - Havalimanı giriş kartları ve özel izinler ile hızlı, beklemesiz çıkış sağlar.<br />
          - Çocuk koltuğu ve özel talepler ücretsiz sunulur.
        </p>
      </div>
      {/* SARİ ÇERÇEVE BİTİŞ */}

      {/* Buton dışarıda */}
      <Link href="https://yolcutransferi-halil-tayfurs-projects.vercel.app/rezervasyon">
        <button className="bg-gold hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-xl mt-10 w-full text-lg shadow">
          Rezervasyon Yap
        </button>
      </Link>
    </main>
  );
}
