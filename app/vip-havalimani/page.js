"use client";
import Image from "next/image";
import Link from "next/link";

export default function VIPHavalimani() {
  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        <Image
          src="/vip-havalimani-banner.png"
          alt="VIP Havalimanı Transferi"
          width={900}
          height={320}
          className="w-full rounded-2xl mb-8 object-cover"
          priority
        />
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] mb-6 text-center tracking-tight">
          VIP Havalimanı Transferi
        </h1>
        <div className="text-base md:text-lg text-[#ecd9aa] font-normal leading-relaxed space-y-7">
          <p>
            YolcuTransferi.com olarak Türkiye'nin tüm havalimanlarında <span className="text-[#ffeec2] font-semibold">güvenilir, konforlu ve esnek VIP transfer</span> hizmetleri sunuyoruz.
            Rezervasyon sırasında bütçenize ve ihtiyaçlarınıza uygun araç ve hizmet seçeneklerini kolayca belirleyebilirsiniz.
            Transfer talepleriniz, sektörde deneyimli iş ortaklarımız aracılığıyla karşılanır ve yolculuğunuz <span className="text-[#ffeec2] font-semibold">sigortalı, zamanında ve profesyonel sürücülerle</span> gerçekleşir.
          </p>
          <p>
            <span className="font-bold text-[#ffd700]">Ekstra Hizmetler:</span><br />
            Bagaj yardımı, özel karşılama, çocuk koltuğu, evcil hayvan taşıma kutusu gibi ek hizmetlerin tümü rezervasyon sırasında tercihinize sunulur.
          </p>
          <p>
            <span className="font-bold text-[#ffd700]">Neden YolcuTransferi.com?</span><br />
            <span className="block ml-2">
              • Fiyatlar nettir; rezervasyon öncesinde tüm seçenekler ve ek hizmetler açıkça belirtilir, yolculuk sonrası sürpriz ücret çıkmaz.<br />
              • Havalimanı giriş kartı ve özel izin gerektiren hizmetler, talebinize göre organize edilir.<br />
              • 7/24 müşteri desteği ve uçuş takibiyle her zaman yanınızdayız.
            </span>
          </p>
        </div>

<Link href="/rezervasyon?transfer=VIP Havalimanı Transferi" className="block">
  <button className="bg-gradient-to-tr from-[#cbb26a] to-[#bfa658] text-black font-bold text-lg px-7 py-3 rounded-xl mt-10 w-full shadow-md border border-[#fff6ce] hover:scale-105 hover:from-[#e6d199] hover:to-[#c4ad5f] transition">
    Rezervasyon Yap
  </button>
</Link>

      </section>
    </main>
  );
}
