"use client";
import Image from "next/image";
import Link from "next/link";

export default function KurumsalTransfer() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="border-4 border-[#6e5a1e] rounded-[10px] bg-black/60 p-6 md:p-10 shadow-lg">
        {/* 
          Eğer görselin public/ klasöründe ise src="/kurumsal-transfer-banner.png" 
          Eğer public/images/ klasöründeyse src="/images/kurumsal-transfer-banner.png" yaz
        */}
        <Image
          src="/kurumsal-banner.png"
          // src="/images/kurumsal-transfer-banner.png"
          alt="Kurumsal ve Toplu Transfer"
          width={900}
          height={320}
          className="w-full rounded-[6px] mb-6 object-cover"
          priority
        />
        <h1 className="text-3xl font-extrabold text-[#6e5a1e] mb-4">Kurumsal & Toplu Transfer</h1>
        <p className="mb-6 text-gray-200">
          Türkiye genelinde iş toplantıları, seminerler, fuarlar ve tüm kurumsal organizasyonlarınız için güvenilir ve esnek toplu transfer çözümleri sunuyoruz.
          Talebinize göre araç tipi ve hizmet seçeneklerini kolayca belirleyebilir, personeliniz ve misafirleriniz için konforlu ulaşım sağlayabilirsiniz.
        </p>
        <p className="mb-6 text-gray-200">
          Tüm transfer süreçleri, sektörde deneyimli iş ortaklarımız tarafından yasal mevzuata uygun, sigortalı ve gizlilik esaslı şekilde organize edilir.
          Zamanında ulaşım, rezervasyon sırasında seçilebilen ek hizmetler ve 7/24 destek ile, kurumsal ihtiyaçlarınıza en uygun çözümü üretiyoruz.
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
