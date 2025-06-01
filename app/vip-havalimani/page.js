"use client";
import Image from "next/image";
import Link from "next/link";

export default function VIPHavalimani() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="border-4 border-gold rounded-[10px] bg-black/60 p-6 md:p-10 shadow-lg">
        <Image
          src="/vip-havalimani-banner.png"
          alt="VIP Havalimanı Transferi"
          width={900}
          height={320}
          className="w-full rounded-[6px] mb-6 object-cover"
          priority
        />
        <h1 className="text-3xl font-extrabold text-gold mb-4">VIP Havalimanı Transferi</h1>
        <p className="mb-6 text-gray-200">
          YolcuTransferi olarak Türkiye'nin tüm havalimanlarında, Mercedes Maybach, Vito, lüks minivan ve özel araçlarla profesyonel ve konforlu VIP transfer hizmeti sunuyoruz. 
          Her yolculuk sigortalı, zamanında ve eğitimli şoförler eşliğinde gerçekleşir.  
          Bagaj yardımı, özel karşılama, uçuş takip ve 7/24 müşteri desteği ile havalimanı ulaşımını stressiz ve ayrıcalıklı hale getiriyoruz.
        </p>
      </div>

      <p className="mt-10 mb-6 text-gray-300">
        <strong>Neden YolcuTransferi?</strong><br />
        - Rakiplerimizden farklı olarak, filomuzdaki tüm araçlar yeni model ve lüks segmenttir.<br />
        - Fiyatlarımız nettir, yolculuk sonrası ekstra ücret sürprizi yoktur.<br />
        - Havalimanı giriş kartları ve özel izinler ile hızlı, beklemesiz çıkış sağlar.<br />
        - Çocuk koltuğu ve özel talepler ücretsiz sunulur.
      </p>

      <Link href="https://yolcutransferi-halil-tayfurs-projects.vercel.app/rezervasyon">
        <button className="bg-gold hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-xl mt-6 w-full text-lg shadow">
          Rezervasyon Yap
        </button>
      </Link>
    </main>
  );
}
