"use client";
import Image from "next/image";
import Link from "next/link";

export default function VIPHavalimani() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="border-4 border-[#6e5a1e] rounded-[10px] bg-black/60 p-6 md:p-10 shadow-lg">
        <Image
          src="/vip-havalimani-banner.png"
          alt="VIP Havalimanı Transferi"
          width={900}
          height={320}
          className="w-full rounded-[6px] mb-6 object-cover"
          priority
        />
        <h1 className="text-3xl font-extrabold text-[#6e5a1e] mb-4">VIP Havalimanı Transferi</h1>
        <p className="mb-6 text-gray-200">
          YolcuTransferi olarak Türkiye'nin tüm havalimanlarında güvenilir, konforlu ve esnek VIP transfer hizmetleri sunuyoruz. 
          Rezervasyon sırasında bütçenize ve ihtiyaçlarınıza uygun araç ve hizmet seçeneklerini kolayca belirleyebilirsiniz.
          Transfer talepleriniz, sektörde deneyimli iş ortaklarımız aracılığıyla karşılanır ve yolculuğunuz sigortalı, zamanında ve profesyonel sürücülerle gerçekleşir.
        </p>
        <p className="mb-6 text-gray-200">
          <strong className="text-white">Ekstra Hizmetler:</strong><br />
          Bagaj yardımı, özel karşılama, çocuk koltuğu, evcil hayvan taşıma kutusu gibi ek hizmetlerin tümü rezervasyon sırasında tercihinize sunulur.
        </p>
        <p className="text-gray-300">
          <strong className="text-white">Neden YolcuTransferi?</strong><br />
          - Fiyatlar nettir; rezervasyon öncesinde tüm seçenekler ve ek hizmetler açıkça belirtilir, yolculuk sonrası sürpriz ücret çıkmaz.<br />
          - Havalimanı giriş kartı ve özel izin gerektiren hizmetler, talebinize göre organize edilir.<br />
          - 7/24 müşteri desteği ve uçuş takibiyle her zaman yanınızdayız.<br />
        </p>
      </div>

      <Link href="https://yolcutransferi-halil-tayfurs-projects.vercel.app/rezervasyon">
        <button className="bg-[#6e5a1e] hover:bg-[#8c7327] text-white font-bold py-3 px-8 rounded-xl mt-10 w-full text-lg shadow">
          Rezervasyon Yap
        </button>
      </Link>
    </main>
  );
}
